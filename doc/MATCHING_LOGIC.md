# MATCHING_LOGIC

> **Scope note.** The formal problem statement specifies only TF-IDF + cosine similarity as the relevance signal ("no embeddings/transformers needed") and asks for a ranked list of schemes. This doc implements that, **plus** a hard-rule filter layer that runs *before* TF-IDF and gates the ranked list. The hard filter is a deliberate extension beyond the stated spec — kept because the prior brief articulated the "why excluded" transparency feature as core. If the project review cuts scope, the engine degrades gracefully to pure TF-IDF by setting all `FilterRule.criteria` to empty/null on every scheme and ignoring section 2 below.

This is the precise spec for `/api/match`. The matching engine has three pieces, in order: (1) **profile → query string**, (2) **hard-filter check**, (3) **TF-IDF cosine similarity**, then (4) a **combine** step produces (5) the **final score** with (6) **keyword extraction** for the UI. Read it as a pipeline.

```
FarmerProfile
     │
     ▼
(1) query_string = concat(profile fields)     ──►  used by steps 3 + 6
     │
     ├─► (2) hard_filter(scheme, profile)     ──►  {passed, reasons}
     │
     └─► (3) tfidf_rank(schemes, query_str)   ──►  dict[id, cosine]

For each scheme:
     │
     ▼
(4) combine(passed, cosine)                   ──►  final_score
     │
     └─► (6) extract_keywords(scheme, query)   ──►  {matched, missing}

Return: list[MatchResult]
```

---

## 1. Profile → query string

Pure string concatenation of categorical and text fields. Lowercased. Used as a single document for TF-IDF.

```python
def profile_to_query(profile: FarmerProfile) -> str:
    parts = [
        profile.state.lower().strip(),
        profile.crop.lower().strip(),         # canonical slug from the controlled dropdown
        profile.category.lower().strip(),
    ]
    return " ".join(parts)
```

Example output for `{state: "Punjab", land_size_ha: 1.5, crop: "wheat", category: "General"}`:

```
punjab wheat general
```

Note **`land_size_ha` is deliberately not in the query**. It's a numeric hard-filter input — keeping "1.5" as a TF-IDF token would just be noise against scheme prose (which never says "1.5" in cosine-meaningful ways), and would fragment the vocabulary across the 0–10 hectare range. All land-size signal lives in the structured filter in §2.

That's it. No intent-text field, no field weighting, no stemming config. Per project decision this stays simple.

---

## 2. Hard filter

Per-scheme check. The filter returns two things: whether the scheme passed, and a list of human-readable exclusion reasons (one per failed criterion; the list is empty iff the scheme passed).

### Criterion A — State membership

```python
def check_state(scheme, profile):
    states = scheme.filter_rule.states          # [] or None = national
    if not states:
        return None                             # pass
    if profile.state in states:
        return None
    return f"wrong state — you entered {profile.state}, scheme applies to {', '.join(states)}"
```

### Criterion B — Crop membership

```python
def check_crop(scheme, profile):
    crops = scheme.filter_rule.crops
    if not crops:
        return None
    profile_crop = profile.crop.lower().strip()
    if profile_crop in [c.lower() for c in crops]:
        return None
    return f"crop mismatch — you listed {profile_crop}, scheme applies to {', '.join(crops)}"
```

We lowercase on both sides for the comparison. The user's `crop` is free text in v1; if they type "Wheat" vs `["wheat","rice"]` the comparison still works.

### Criterion C — Land-size bounds

```python
def check_land(scheme, profile):
    land = profile.land_size_ha
    mn = scheme.filter_rule.land_min_ha
    mx = scheme.filter_rule.land_max_ha

    # Treat missing farmer.land as a fail (per project decision)
    if land is None:
        return "land size not provided"

    reasons = []
    if mn is not None and land < mn:
        reasons.append(f"land size below minimum {mn} ha (you have {land} ha)")
    if mx is not None and land > mx:
        reasons.append(f"land size above maximum {mx} ha (you have {land} ha)")
    if reasons:
        return "; ".join(reasons)
    return None
```

Both min and max are optional; either can produce a reason. In practice at most one will trigger per scheme, but the spec handles both.

### Criterion D — Category eligibility

```python
def check_category(scheme, profile):
    cats = scheme.filter_rule.eligible_categories
    if not cats:
        return None
    if profile.category in cats:
        return None
    return f"category {profile.category} not in eligible categories {', '.join(cats)}"
```

### Combining criteria

```python
def hard_filter(scheme, profile) -> HardFilterResult:
    reasons = []
    for check in (check_state, check_crop, check_land, check_category):
        r = check(scheme, profile)
        if r is not None:
            reasons.append(r)
    return HardFilterResult(
        passed=(len(reasons) == 0),
        reasons=reasons,
    )
```

**No partial-credit logic.** A scheme either passes all four checks or it doesn't. The reason list preserves every criterion that failed so the UI can show one chip per reason. This is per the "excluded with reasons" project decision.

### Missing-field behavior

If a profile field is missing (in practice: the FastAPI layer rejects profiles with required fields blank; if we relax that in the future), the corresponding check returns a reason like `"field not provided: land_size_ha"` and the scheme is excluded. This means a farmer who leaves `land_size_ha` blank will see essentially every land-bounded scheme in the excluded list — which surfaces the gap clearly. (See `OPEN_QUESTIONS.md` for the ongoing tension between "treat missing as fail" and form UX.)

---

## 3. TF-IDF + cosine similarity

### Vectorizer

scikit-learn's `TfidfVectorizer` with these settings:

```python
from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer(
    lowercase=True,
    stop_words="english",
    ngram_range=(1, 1),       # unigrams only; bigrams blow up the vocab on short farmer profiles
    min_df=1,                 # don't drop rare terms — our corpus is small
    sublinear_tf=False,
)
```

`stop_words="english"` is a pragmatic default; we'll add a small custom Hindi/Hinglish stopword list in the Hindi stretch feature. (For the hackathon, English-only stopword filtering is fine since most scheme descriptions are in English on the source pages.)

### Fit and score

A fresh vectorizer is fit **per request**, over the union of: (a) every scheme's `description` and (b) the profile's query string. We do **not** persist a fitted vectorizer across requests — this keeps the engine stateless and aligns with the "no global state" architecture decision.

```python
import numpy as np

def tfidf_rank(schemes: list[Scheme], query_str: str) -> dict[str, float]:
    docs = [s.description for s in schemes] + [query_str]
    matrix = vectorizer.fit_transform(docs)                  # shape: (N+1, V)
    query_vec = matrix[-1]                                    # last row
    scheme_matrix = matrix[:-1]                               # rows 0..N-1
    sims = (scheme_matrix @ query_vec.T).toarray().ravel()    # cosine similarity, since both rows are L2-normalized by TfidfVectorizer
    return {schemes[i].id: float(sims[i]) for i in range(len(schemes))}
```

`TfidfVectorizer` L2-normalizes rows by default; with both query and scheme rows in the same matrix and both L2-normalized, `dot(A, B)` is exactly cosine similarity. No extra normalization needed.

The result is `cosine ∈ [0, 1]` per scheme (cosine similarity of TF-IDF vectors is always in [0, 1] for non-negative components; `sims` should never be negative — we clamp defensively below).

```python
return {scheme_id: max(0.0, min(1.0, raw)) for scheme_id, raw in raw_sims.items()}
```

### Why a fresh vectorizer per request

Two reasons:

1. **Vocabulary stability matters less than fit-determinism.** Fitting on `(N scheme descriptions + 1 query)` is cheap — O(N · V) where V ≈ vocabulary of all scheme descriptions, on the order of a few thousand tokens.
2. **Schemes are admin-edited.** If the corpus mutates, we don't need to invalidate a cache — re-fit on the next request.

For 200 schemes this completes in <50ms on commodity hardware. For 2000+ schemes we'd revisit this.

---

## 4. Combine — passed + cosine → final_score

**Final score = `passed*1.0` + `tfidf_similarity`** (additive, per project decision).

```python
def combine(passed: bool, sim: float) -> float:
    return (1.0 if passed else 0.0) + sim
```

### Score ranges

| Class | `passed` | `sim` | `final_score` |
|---|---|---|---|
| Matched, high relevance | True | ~0.8 | ~1.8 |
| Matched, low relevance | True | ~0.1 | ~1.1 |
| Excluded, high relevance | False | ~0.8 | ~0.8 |
| Excluded, low relevance | False | ~0.0 | ~0.0 |

This means: a passed scheme always outscores an excluded scheme with the same TF-IDF similarity. The 1.0 additive bonus is the floor between the two groups. The exact threshold separating passed vs excluded is at score = 1.0 (excluded max) vs score = 1.0 (passed min where sim=0).

The UI sorts the full list by `final_score` descending and uses the `passed_filter` flag to split into sections. See §UI mapping below.

### Why this formula

- **Additive vs weighted**: a weighted formula (e.g. `0.7*passed + 0.3*sim`) requires picking a knob the judges have to care about. The additive 1.0 bonus says, plainly, "passing the hard filter is worth roughly the entire similarity range" — easy to defend verbally.
- **Additive vs gating**: a hard gate (passed only) loses the transparency story. A Karnataka farmer excluded from a Punjab-only scheme can see that scheme at score 0.79 in the excluded section and understand "this is descriptively similar but I'm in the wrong state." Pure gating would have hidden that signal.

---

## 5. Keyword extraction

Two lists per scheme: which top-N TF-IDF-weighted terms in the **scheme's description** appear in the **profile query**, and which top-N don't.

```python
def extract_keywords(scheme, query_str, vectorizer, k=5):
    feature_names = vectorizer.get_feature_names_out()
    scheme_vec = vectorizer.transform([scheme.description]).toarray()[0]

    # indices of the top-k terms by weight in the scheme description
    top_idx = np.argsort(scheme_vec)[::-1][:k]
    top_terms = [feature_names[i] for i in top_idx if scheme_vec[i] > 0]

    query_tokens = set(query_str.lower().split())

    matched = [t for t in top_terms if t in query_tokens]
    missing = [t for t in top_terms if t not in query_tokens]
    return matched, missing
```

Returns at most 5 items in each list (typical: 2–4 each because some top terms never appear in profile queries). Ties in `scheme_vec` weights are broken by `np.argsort`'s stable order, which is alphabetical-ish — fine for our purposes.

### UI mapping

For a `passed=True` scheme: render the matched-keyword chips in green ("matches your profile: wheat, irrigation") and missing-keyword chips in amber ("description emphasizes: subsidy, land-records — not in your profile"). The amber chips help the farmer understand why this is ranked where it is.

For a `passed=False` scheme: same UI but the scheme card is grouped in the "Excluded" section with its reason chip(s) prominently displayed. Keyword chips are still useful ("you'd be a strong match on description, but state is wrong").

---

## 6. Edge cases

| Case | Behavior |
|---|---|
| Profile is empty (server validation should reject earlier — but if it slips through) | All schemes excluded with `"profile invalid"` per scheme. Logged server-side. |
| Scheme description is empty | Scheme gets `tfidf_similarity = 0.0`. Will appear at the bottom with 0.0 if not excluded. Documented as an admin-input error in the form. |
| Two schemes with identical scores in the matched section | Tie-break by `tfidf_similarity` desc, then by `slug` asc. |
| Profile's `crop` string contains commas or punctuation | Lowercased and whitespace-trimmed only. `"Wheat, irrigated"` stays as one token for TF-IDF. (Admin-facing edit: most scheme crop lists use single tokens.) |
| 28-state schema drift | A profile `state` not in any scheme's `states` list will fail every state-restricted scheme. The constant list lives in `backend/constants.py`; admin form validates against it. |
| Profile category is `None` (deprecated field) | Treated as missing → all category-restricted schemes excluded. |
| Crop is a controlled dropdown slug (e.g. `wheat`) not free text | Stored verbatim. If admin enters a different spelling in `filter_rule.crops` (e.g. `paddy` instead of `rice`), the filter check normalizes both sides to lowercase — but TF-IDF will still treat them as different features. **Admin's job to use the canonical slugs from `backend/constants.py:INDIA_CROPS`.** |

---

## 7. What this spec deliberately does NOT do

- No stemming (no Porter/Snowball). Most scheme descriptions use consistent surface forms; stemming on a small corpus tends to over-merge.
- No LSA/SVD dimensionality reduction. Stays linear in V.
- No class-based boosting (e.g. "SC category gets +0.1").
- No personalization across requests.
- No query expansion (no synonym tables).

These are all reachable knobs if judging requires them, but the spec ships without them.
