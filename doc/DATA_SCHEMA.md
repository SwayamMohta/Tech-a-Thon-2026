# DATA_SCHEMA

Three artifacts get a schema here: the `Scheme` record (DB row), the `FarmerProfile` (request body), and the structured `FilterRule` (embedded in the scheme record). All three are also defined as pydantic models in `backend/models.py` so the matching engine and the FastAPI layer share types.

---

## 1. Scheme (DB row)

Stored in two tables — `schemes` (descriptive content) and `scheme_filter_rules` (structured filter criteria). One-to-one, joined by `scheme_id`. Splitting them out makes filter evaluation cheap (no need to load description blob) and lets us re-derive filter rules from description text later if we want to.

### Table `schemes`

| Column | Type | Nullable | Notes |
|---|---|---|---|
| `id` | TEXT (UUID) | NOT NULL | PK |
| `slug` | TEXT | NOT NULL | UNIQUE. URL-safe identifier, e.g. `pm-kisan`. Used as the canonical "scheme key". |
| `name` | TEXT | NOT NULL | Display name, e.g. "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)". |
| `ministry` | TEXT | NULLABLE | e.g. "Ministry of Agriculture & Farmers Welfare". |
| `description` | TEXT | NOT NULL | Plain text. This is what TF-IDF operates on. Free-form, no markup. |
| `tags` | TEXT | NULLABLE | Comma-separated, e.g. `subsidy,income-support,central`. Used for admin filtering/listing, not for matching. |
| `source_url` | TEXT | NULLABLE | e.g. a rules.myscheme.gov.in link. For admin reference / scheme provenance. |
| `application_url` | TEXT | NULLABLE | **The official "apply" link.** Surfaced on the Scheme Status Page as a primary call-to-action button. Required for the demo per the problem statement. Nullable only for legacy Kaggle rows where we cannot find the canonical application URL — the UI falls back to showing "apply link unavailable" in that case. |
| `created_at` | TEXT (ISO 8601) | NOT NULL | `datetime.utcnow().isoformat()` at insert. |

### Table `scheme_filter_rules` (one-to-one via `scheme_id`, FK to `schemes.id`)

| Column | Type | Nullable | Notes |
|---|---|---|---|
| `scheme_id` | TEXT | NOT NULL | PK + FK to `schemes.id`. |
| `states` | TEXT | NULLABLE | JSON array of state names, e.g. `["Punjab","Haryana"]`. **Empty array `[]` or `NULL` = national (all states pass).** |
| `crops` | TEXT | NULLABLE | JSON array of crop slugs, e.g. `["wheat","rice","maize"]`. **Empty `[]`/`NULL` = crop-agnostic (all crops pass).** |
| `land_min_ha` | REAL | NULLABLE | Inclusive lower bound. `NULL` = no minimum. |
| `land_max_ha` | REAL | NULLABLE | Inclusive upper bound. `NULL` = no maximum. |
| `eligible_categories` | TEXT | NULLABLE | JSON array, e.g. `["SC","ST","OBC","General","Minority"]`. `[]`/`NULL` = all categories eligible. |

### Why we split filter rules into their own table

- Filter evaluation becomes a single small `SELECT scheme_id, states, crops, ... FROM scheme_filter_rules` (no `description` column loaded into Python memory). For ~200 schemes this is irrelevant; for the 100k+ schemes the Kaggle scrape could become later, it's a meaningful win.
- We can later add metadata columns to `schemes` without touching filter logic.
- The split makes the data shape self-documenting in SQL: anyone reading `scheme_filter_rules` understands "these are the columns the hard filter checks."

### Pydantic mirror (in `backend/models.py`)

```python
class Scheme(BaseModel):
    id: str                          # UUID, generated on insert
    slug: str                        # unique
    name: str
    ministry: str | None = None
    description: str
    tags: list[str] | None = None
    source_url: str | None = None
    application_url: str | None = None    # "Apply now" link on the Scheme Status Page
    created_at: str                  # ISO 8601

    filter_rule: FilterRule

    model_config = ConfigDict(from_attributes=True)


class FilterRule(BaseModel):
    states: list[str] = []           # [] = national
    crops: list[str] = []            # [] = crop-agnostic
    land_min_ha: float | None = None
    land_max_ha: float | None = None
    eligible_categories: list[Literal["SC","ST","OBC","General","Minority"]] = []
```

---

## 2. Farmer Profile (request body)

```python
class FarmerProfile(BaseModel):
    state: str                        # exact match against schemes.states[i]; one of 28 states/UTs
    land_size_ha: float               # ALWAYS stored in hectares; UI converts from acres if the user toggled that
    crop: str                         # MUST be one of backend.constants.INDIA_CROPS slugs (controlled dropdown, not free text)
    category: Literal["SC","ST","OBC","General","Minority"]
```

### Validation rules

- `state`: required, must be one of the 28 Indian states/UT names in `backend/constants.py:INDIAN_STATES`.
- `land_size_ha`: required, must be `> 0` and `< 1000`. Always stored in hectares in the request body regardless of UI units. The frontend form has a unit toggle (hectares / acres); the toggle only affects the input field display. Conversion: `ha = acres × 0.404686` rounded to 2 decimals.
- `crop`: required, **must be one of the slugs in `backend/constants.py:INDIA_CROPS`** — approximately 15–20 major Indian crops. Controlled-vocabulary decision prevents TF-IDF vocabulary fragmentation (e.g. "paddy" vs "rice" vs "Wheat crop" all collapsing into a single poor signal). Admin schema for `crops` lists must use the same slugs.
- `category`: required, must be one of the five literals.

### The canonical crop list (reference)

```python
# backend/constants.py
INDIA_CROPS = [
    "rice", "wheat", "maize", "sugarcane", "cotton",
    "soybean", "groundnut", "mustard", "pulses", "millets",
    "jowar", "bajra", "barley", "jute", "tea",
    "coffee", "rubber", "spices", "fruits", "vegetables",
]
```

Final list to be confirmed during Phase 4 (frontend); if any of these don't appear in the 15–25 curated schemes, prune before shipping. The point is consistency between profile input and admin filter-rule input, not exhaustive coverage.

### Missing-field behavior (per project decision)

A missing profile field is a **fail** with reason `"field not provided: <name>"`. The API never returns 400 for an empty required field — instead, every scheme that requires that field will be excluded with that reason. The UI will surface this in the excluded list so the farmer knows what to add.

(This is why every field above is non-optional in the pydantic model. Client-side validation is the right place to enforce presence; the server treats any empty/None value as "absent.")

---

## 3. MatchResult (response item)

The shape the `/api/match` endpoint returns, one per scheme in the DB:

```python
class MatchResult(BaseModel):
    scheme: Scheme                    # full scheme object, fetched once
    passed_filter: bool
    exclusion_reasons: list[str]      # [] iff passed
    tfidf_similarity: float           # 0.0 to 1.0; populated for all schemes (we rank even excluded ones for transparency)
    final_score: float                # see MATCHING_LOGIC.md §5
    matched_keywords: list[str]       # top-N terms from scheme description present in profile query
    missing_keywords: list[str]       # top-N terms from scheme description absent from profile query
```

### Keyword extraction spec

`matched_keywords` and `missing_keywords` are top-5 TF-IDF-weighted terms (by `vocabulary_` index) from the scheme's description, sorted by absolute weight descending. `matched` if the term appears in the profile query string, `missing` otherwise. Equal-weight ties broken alphabetically. This is the user-facing "why this scheme matches" explainer.

(Implementation note: this happens after the vectorizer is fit. We use the `TfidfVectorizer.get_feature_names_out()` + `transform([scheme_description]).toarray()[0]` per scheme to get weights.)

---

## 4. Database initialization

`backend/main.py` startup hook:

```python
SCHEMA_SQL = Path(__file__).parent.parent / "data" / "schema.sql"

def init_db():
    db_path = Path(__file__).parent.parent / "data" / "schemes.db"
    if db_path.exists():
        return  # never overwrite; production-style for a demo
    conn = sqlite3.connect(db_path)
    conn.executescript(SCHEMA_SQL.read_text())
    conn.close()
```

`data/schema.sql` is the canonical source. The python startup hook just runs it.

---

## 5. Canonical `data/schema.sql`

```sql
CREATE TABLE schemes (
    id              TEXT PRIMARY KEY,
    slug            TEXT NOT NULL UNIQUE,
    name            TEXT NOT NULL,
    ministry        TEXT,
    description     TEXT NOT NULL,
    tags            TEXT,
    source_url      TEXT,
    application_url TEXT,             -- official apply link, surfaced on Scheme Status Page
    created_at      TEXT NOT NULL
);

CREATE TABLE scheme_filter_rules (
    scheme_id           TEXT PRIMARY KEY REFERENCES schemes(id) ON DELETE CASCADE,
    states              TEXT,  -- JSON array of strings
    crops               TEXT,  -- JSON array of strings
    land_min_ha         REAL,
    land_max_ha         REAL,
    eligible_categories TEXT   -- JSON array of strings
);

CREATE INDEX idx_schemes_slug ON schemes(slug);
CREATE INDEX idx_filter_rules_scheme_id ON scheme_filter_rules(scheme_id);
```

No full-text search index — TF-IDF is computed in-memory by the matching engine at request time. For a few hundred schemes this is plenty fast.
