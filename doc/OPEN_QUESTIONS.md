# OPEN_QUESTIONS

Status log: assumption surfaced, decision requested, decision recorded. O1–O7 are RESOLVED. O8–O13 remain open and predate the latest short brief. O14 (assumed-without-asking items) stays as-is for visibility. O15–O17 are post-problem-statement-reconcile. **O18 is the newest entry** (Phase 0 deliverable spawned by O7's resolution).

Resolutions for O1–O7 are inline below. Each `RESOLVED ✅` block records the decision and the file/phase where it now lives.

---

## O1 — RESOLVED ✅

- **Resolution:** cap Results section at top 10 by `final_score` desc with a "show all" expand toggle that unhides anything past the cap.
- **Where:** `ROADMAP.md` Phase 4.4.

## O2 — RESOLVED ✅

- **Resolution:** no 5th required field. Profile stays at 4 fields. Category system covers whatever discrimination the curated schemes need; the missing-field exclusion system handles gaps. (Category, income, gender remain possible for O18+ future work.)
- **Where:** no doc change required — schema was already 4 fields.

## O3 — RESOLVED ✅

- **Resolution:** `land_size_ha` is canonical in the schema (always). The form has a unit toggle (hectares / acres) that affects display only; conversion happens client-side before submit (`ha = acres × 0.404686` rounded to 2 decimals).
- **Where:** `ROADMAP.md` Phase 4.3, `DATA_SCHEMA.md` §2 "Validation rules".

## O4 — RESOLVED ✅ (already locked, no change)

- **Resolution:** missing required field → fail with reason "field not provided: <name>" in the excluded list. Status Page split doesn't change this; only the display routing.
- **Where:** `MATCHING_LOGIC.md` §2 last sub-section.

## O5 — RESOLVED ✅

- **Resolution:** **`land_size_ha` is excluded from the TF-IDF query string entirely**. Numeric land size is a hard-filter-only signal. The query becomes `"{state} {crop} {category}"` only — three tokens.
- **Why:** numeric tokens fragment the TF-IDF vocabulary, never match scheme prose in a cosine-meaningful way, and add noise. All land signal lives in §2's structured land check.
- **Where:** `MATCHING_LOGIC.md` §1 — `profile_to_query` function rewritten; example updated. Edge-cases table extended with the controlled-crop note.

## O6 — RESOLVED ✅

- **Resolution:** crop is a **controlled dropdown** of ~15–20 major Indian crop slugs, not free text. Same slugs are used in `FilterRule.crops` (admin-controlled). Free-text crop input fragments the vocabulary ("paddy" vs "rice" vs "Wheat crop") and tanks match quality on the one field that's supposed to drive relevance.
- **Where:** `DATA_SCHEMA.md` §2 — new "Validation rules" entry; new "The canonical crop list" reference block citing `backend/constants.INDIA_CROPS`. `MATCHING_LOGIC.md` §1 also reflects this.

## O7 — RESOLVED ✅

- **Resolution:** **before writing `seed_db.py`, verify the Kaggle dataset's license/usage terms.** If clear and re-distributable: commit a filtered CSV in `data/`. If unclear, restrictive, or non-redistribution: **fall back to fully hand-curated scheme records only**, document the Kaggle set as research reference, and do not commit any CSV.
- **Why:** legal risk on a hackathon project is not worth a marginal scheme-set expansion when the 15–25 hand-curated schemes already cover the demo.
- **Where:** `ROADMAP.md` Phase 1.1 — rewritten as a license gate. **New deliverable: `docs/data_sources.md` records the decision permanently.**

---

## O8 — Hindi stopwords (only matters if Phase 6.2 lands)

`TfidfVectorizer(stop_words="english")` filters English stopwords. Hindi scheme descriptions don't exist in v1 of the corpus — most official scheme text on the source pages is English. If Phase 6.2 is built, we add a small custom Hindi stopword list. **Confirm:** we can defer this until Phase 6.2.

---

## O9 — "Reason" string format and i18n

Reasons are human-readable English strings inside `MatchResult.exclusion_reasons` (e.g. `"wrong state — you entered Maharashtra, scheme applies to Punjab, Haryana"`). If we ever ship Hindi, do we:

- **A** server-side localize (English-only strings from engine, server translates on the way out)?
- **B** client-side localize (engine returns machine-friendly codes, frontend renders the string in user's locale)?

I lean B for v1 (out of scope) and a future client-side hook for Hindi. Confirming we don't need to thread this through the engine now.

---

## O10 — Admin re-runs and version drift

If an admin edits a scheme and 30 seconds later a farmer queries, the new scheme appears immediately (DB read each request, vectorizer re-fit each request). I take this as a feature, not a bug — but it does mean a paste error in the admin goes live fast. **Confirm** we don't need a "draft" status for admin edits in v1.

---

## O11 — Performance with the real corpus

`tfidf_rank` recomputes per-request. For 200 schemes with descriptions averaging 500 words, this is <50ms. For 2000 schemes (the Kaggle dataset after filtering, possibly), still under a second on commodity hardware but noticeable. **Confirm** that the per-request re-fit is acceptable; if not, we move to a persisted vectorizer and accept the staleness it introduces. My default is per-request — keep things simple until we measure.

---

## O12 — Multiple-language profile support

`FarmerProfile.crop` is free text. A Hindi-speaking farmer typing "गेहूं" (Hindi for wheat) will not match a scheme whose `crops` list says `"wheat"`. I assume v1 accepts English-only crop names. Confirming — this is the same answer as O8, but specifically about the profile input side.

---

## O13 — "In the demo but not specified" small things

- **No dark mode** in v1 (light theme only; faster to ship).
- **No mobile-first** design — desktop-first with responsive at small scale. Confirm this is fine for the demo.
- **No "share my results" link** — judge-side only viewing.
- **No save/export to PDF** — copy/paste from screen is the answer for v1.

---

## O14 — Things I assumed without asking, please correct if wrong

- The **judges will see at least one full match + one full exclude** for a demo profile. I've built the UI around both halves of the screen mattering.
- The **Kaggle dataset is a CSV** at the file level — not a JSON-lines or parquet format I need a special loader for. (If it's actually a Kaggle notebook, the seed script changes.)
- **Single-tab concurrent access** is enough — no request queuing, rate limiting, or worker isolation in the FastAPI app.
- **The dev environment is local**; no Docker / docker-compose in v1.
- **No CI / pre-commit / code-review automation** in v1 — manual testing per the ROADMAP `Acceptance` lines.

---

**If you sign off on all 14, we proceed.** If any need to change, I'll regenerate the affected docs before any code is written.

---

## Reconciliation note (added after problem statement cross-check)

The formal problem statement (*"Build a farmer-to-government-scheme eligibility matching tool… TF-IDF + cosine similarity… no embeddings/transformers needed"*) is more conservative than the prior brief. Two real differences emerged and both have been resolved per your follow-up answers:

| Brief-vs-statement gap | Resolution |
|---|---|
| Problem statement asks only for TF-IDF ranking; our docs add a hard-rule filter layer before TF-IDF. | **Keep the hard filter as a deliberate extension.** Documented as a scope note at the top of `MATCHING_LOGIC.md` so reviewers/judges can see it is intentional. If the cut is needed mid-hackathon, the engine degrades gracefully to pure TF-IDF by clearing `FilterRule` per scheme. |
| Problem statement explicitly mentions a **Scheme Status Page** with application links. The prior brief never mentioned it, and our v1 docs omitted it. | **Added as core.** New `application_url` field in `DATA_SCHEMA.md`, new public route `GET /api/schemes/{id}`, new screen `SchemeStatus.tsx` referenced from Results cards. |

---

## O15 — "Hard filter as extension" wording

The scope note at the top of `MATCHING_LOGIC.md` calls the hard filter "a deliberate extension beyond the stated spec." If you want a softer framing for the demo (e.g. "we layered structural eligibility on top because it improves ranking robustness for state-specific schemes" instead of "this is extra scope"), tell me and I'll reword. The implementation is unchanged either way.

## O16 — Bookmark/save semantics

Promoted to Phase 6.5 stretch per problem statement's optional-add-on call-out. Two implementation choices for when you build it:

- **A**: localStorage-only. No backend, no user accounts, no cross-device sync. Ship-fast.
- **B**: backend table `bookmarks(profile_hash, scheme_id, created_at)` keyed on a `profile_hash` derived from the four profile fields. Adds cross-device persistence but requires a profile_hash cookie or localStorage ID to be stable.

I lean A for the hackathon. Confirm.

## O17 — `application_url` for legacy Kaggle rows

The 15–25 hand-curated schemes will all have canonical `application_url`s. The Kaggle corpus' URLs may be missing or stale. Confirm: a scheme with `application_url=null` shows an "apply link unavailable" disabled button on the Status Page — not a 404 / not a 400 from the API. This is the v1 behavior and matches the schema's `NULLABLE` semantics.

## O18 — NEW from O7's resolution: `docs/data_sources.md` deliverable in Phase 0

O7's resolution spawns a new Phase-0 deliverable that did not exist before. `docs/data_sources.md` is a short decision-record file capturing:

- The Kaggle dataset's URL or a fingerprint of what was checked.
- Its license (verbatim quote) and the re-distribution status.
- A concrete decision: *commit CSV / reference-only / do-not-use*, with the date checked.
- The fallback chosen if the decision is anything other than "commit CSV".
- An attribution line for the hand-curated schemes (which sources we consulted: official scheme pages, rules.myscheme.gov.in).

This file exists in Phase 0 alongside the empty docs stubs. It's required before Phase 1's `seed_db.py` is written.
