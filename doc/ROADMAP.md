# ROADMAP

Build order is fixed by dependency. Stretch features come **after** the core demo runs end-to-end on real data. Each phase has concrete tasks with explicit dependencies on prior phases. Estimate is for a hackathon weekend; treat as a guide, not a contract.

---

## Phase 0 — Repo scaffolding (½ day)

Not in the brief but it has to happen first.

- [ ] Create repo with `backend/` and `frontend/` per `ARCHITECTURE.md`.
- [ ] Pin Python (`requirements.txt`) and Node versions in a `.python-version` / `.nvmrc`.
- [ ] Add `data/.gitkeep`, commit `data/schema.sql` and `data/curated_schemes.json` stubs (empty).
- [ ] Add `README.md` with the one-liner: "run `python scripts/seed_db.py`, then `uvicorn backend.main:app`, then `npm run dev` in `frontend/`."

**Depends on:** nothing.

---

## Phase 1 — Data prep (1 day)

The data layer is the foundation; everything downstream tests against it.

### Tasks

- [ ] **1.1** Check the Kaggle myscheme.gov.in dataset's license and usage terms **before any code depends on it**. Confirm re-distribution is allowed. If the license is unclear, restrictive (e.g. `CC-BY-NC` non-redistribution), or absent, **do not commit the CSV to the repo** and treat the Kaggle set purely as research reference. The seed script falls back to the hand-curated JSON only — this is acceptable because Phase 1.2 ships 15–25 real schemes which fully supports the demo. **Decision recorded in `docs/data_sources.md` (Phase 0 deliverable).**
- [ ] **1.2** Hand-curate `data/curated_schemes.json` with 15–25 real schemes. Each entry is a full `Scheme` object per `DATA_SCHEMA.md` §1 — description text and `application_url` from official scheme pages or rules.myscheme.gov.in. Required schemes per the brief: PM-KISAN, PMFBY, KCC, Soil Health Card, PM-KUSUM, RKVY, PKVY, e-NAM. Plus 2–3 state schemes (e.g. Rythu Bandhu — Telangana; Mukhyamantri Krishi Ashirwad Yojana — Jharkhand if relevant). **`application_url` is required for the demo per the problem statement** (Scheme Status Page); null it only as a last resort, and document any null with a source note.
- [ ] **1.3** Author `data/schema.sql` exactly as in `DATA_SCHEMA.md` §5.
- [ ] **1.4** Write `scripts/seed_db.py` — reads both sources, generates UUIDs and `created_at` for any row that lacks them, applies `schema.sql` to a fresh `data/schemes.db`, inserts all rows. Idempotency: if `schemes.db` exists, delete it and recreate.
- [ ] **1.5** Write `scripts/eval_smoke.py` — 5 hand-picked profiles (one per Indian region, with mixed categories and land sizes) — runs `/api/match` against them once the endpoint exists (this gets wired into Phase 3) and prints the top-5 matched and top-5 excluded schemes per profile. Sanity check that PM-KISAN appears for a Punjab small farmer; etc.

**Depends on:** Phase 0.

**Acceptance:** `python scripts/seed_db.py` produces a populated `schemes.db` with N_curated + N_kaggle rows. `sqlite3 data/schemes.db "SELECT COUNT(*) FROM schemes"` returns the expected count.

---

## Phase 2 — Backend skeleton (½ day)

Just the API surface; no matching logic yet. Returns dummy data.

### Tasks

- [ ] **2.1** `backend/main.py` — FastAPI app factory, CORS open in dev, `init_db()` startup hook (runs `schema.sql`), `GET /health` returns `{"ok": true}`.
- [ ] **2.2** `backend/db.py` — `get_connection()` context manager using `sqlite3.connect()`, sets `row_factory = sqlite3.Row`.
- [ ] **2.3** `backend/models.py` — pydantic `Scheme`, `FilterRule`, `FarmerProfile`, `MatchResult` exactly as in `DATA_SCHEMA.md`. `LANGUAGE=python` typing for the `Literal["SC",…]` category.
- [ ] **2.4** `backend/constants.py` — `INDIAN_STATES = [...]` (28 entries with canonical names).
- [ ] **2.5** `backend/routes/match.py` — `POST /api/match` accepts `FarmerProfile`, returns `{ "results": [] }` placeholder. Verify with curl.
- [ ] **2.6** `backend/routes/admin.py` — `POST /api/admin/schemes` and `GET /api/admin/schemes/{id}`. Insert + read-back only (no update/delete in v1).

**Depends on:** Phase 1 (for the DB to exist with seed data).

**Acceptance:** `curl localhost:8000/health` → 200; `curl -X POST localhost:8000/api/match -d '{...}'` → 200 with empty results.

---

## Phase 3 — Matching engine (1 day)

The algorithmic core. Implement strictly to `MATCHING_LOGIC.md`.

### Tasks

- [ ] **3.1** `backend/matching/hard_filter.py` — `hard_filter(scheme, profile) -> HardFilterResult` plus the four `check_*` helpers. Return shape: `{passed: bool, reasons: list[str]}`. **Implement to the exact reason strings** in `MATCHING_LOGIC.md` §2 so the UI tests can assert on them.
- [ ] **3.2** `backend/matching/tfidf_rank.py` — `tfidf_rank(schemes, query_str) -> dict[id, float]`, plus `extract_keywords(scheme, query_str, vectorizer, k=5)`. Vectorizer settings per `MATCHING_LOGIC.md` §3.
- [ ] **3.3** `backend/matching/__init__.py` — `match_all(schemes, profile) -> list[MatchResult]` orchestrating hard-filter + tfidf + combine + keyword extraction, sorted by `final_score` desc with the tie-breakers from `MATCHING_LOGIC.md` §6.
- [ ] **3.4** Wire `routes/match.py` to `match_all`: load schemes from DB (joined with filter rules), pass profile, return serialized `MatchResult`s.
- [ ] **3.5** Unit tests — `backend/tests/test_matching.py`. Cover: (a) PM-KISAN passes for a 1-ha Punjab SC farmer and is excluded for a 3-ha Maharashtra farmer with reason "land size above maximum"; (b) the `combine()` arithmetic returns 1.0 + sim exactly; (c) missing `land_size_ha` excludes every land-bounded scheme.
- [ ] **3.6** Run `scripts/eval_smoke.py` end-to-end. Eyeball the output.

**Depends on:** Phase 2.

**Acceptance:** Unit tests pass. Smoke-script output shows expected matches for hand-picked profiles.

---

## Phase 4 — Frontend (1 day)

The form + results page. The admin screen is separate (Phase 4.5).

### Tasks

- [ ] **4.1** Scaffold Vite + React + TypeScript (`npm create vite@latest frontend -- --template react-ts`).
- [ ] **4.2** `src/api/client.ts` — typed `fetch` wrappers for `POST /api/match`, `GET /api/schemes`, etc.
- [ ] **4.3** `src/screens/ProfileForm.tsx` — 4 fields with inline validation. **Crop is a controlled dropdown** of ~15–20 slugs from `backend/constants.INDIA_CROPS` (NOT free text). **Land input has a unit toggle (hectares/acres)** — the value sent to the backend is always hectares, converted on submit (`acres × 0.404686`). State dropdown from `INDIAN_STATES`. Category dropdown of five literals. Submit triggers `match()` and routes to Results.
- [ ] **4.4** `src/screens/Results.tsx` — two sections: **Matched** (top 10 by `final_score` desc with a "show all" toggle that unhides the remainder if present) and **Excluded** (read-only list of `ExcludedSchemeCard`s with reason chips). The 10-row cap is the default; the toggle exists so a farmer who qualifies for 30 schemes doesn't lose signal just because the cap is in place.
- [ ] **4.5** `src/components/SchemeCard.tsx` — scheme name, description (truncated to 2 lines), score breakdown (`{passed_badge, similarity, final_score}`), matched-keyword chips (green), missing-keyword chips (amber).
- [ ] **4.6** `src/components/ExcludedSchemeCard.tsx` — scheme name, reason chips (red), still shows keyword chips for transparency.
- [ ] **4.7** `src/components/ReasonChip.tsx` — small styled component for reasons.
- [ ] **4.8** `src/screens/SchemeStatus.tsx` — **required by problem statement.** Full description, "Apply now" button linking to `application_url` (falls back to "apply link unavailable" if null), ministry + source_url footer, and a recap of which eligibility keywords from the scheme matched the farmer's profile. Reached by clicking any card on the Results page.
- [ ] **4.9** `src/App.tsx` — minimal router (Form ↔ Results ↔ SchemeStatus ↔ Admin).

**Depends on:** Phase 3 (need real MatchResult data).

**Acceptance:** Profile → Results end-to-end works in dev. The PM-KISAN case (Punjab 1-ha SC farmer) lands PM-KISAN at the top.

---

## Phase 4.5 — Admin screen (½ day)

Separate from the user-facing flow. Same repo, same backend.

- [ ] **4.5.1** `src/screens/Admin.tsx` — list of schemes (read from `GET /api/admin/schemes`) + form for new scheme paste-in.
- [ ] **4.5.2** Form fields: name, ministry, description textarea (large), source_url, tags, plus the structured `FilterRule` sub-form (states multi-select, crops multi-select, land min/max, eligible_categories multi-select).
- [ ] **4.5.3** POST on submit → refetch list → toast "added".
- [ ] **4.5.4** Manual end-to-end test: paste a new scheme → switch to user flow → fill profile → confirm new scheme appears.

**Depends on:** Phase 4.1–4.4.

**Acceptance:** Admin can add a scheme and the matching endpoint ranks it without a server restart.

---

## Phase 5 — Demo polish (½ day)

Not in the brief but mandatory for hackathon judging.

- [ ] **5.1** Three "demo profiles" hardcoded as one-click buttons on the form (e.g. "Punjab SC marginal farmer", "Maharashtra OBC medium farmer", "Telangana General small farmer"). Each is a fully-filled profile — judges don't type.
- [ ] **5.2** A single landing/about page (one paragraph) explaining what the tool does. Honest scope statement.
- [ ] **5.3** README with screenshots/GIF of the three demo profiles' results.
- [ ] **5.4** Sample-output table on the README showing matched/excluded reasons for one demo profile.
- [ ] **5.5** Kill switch on any debug logging; check no PII leakage in error responses.

**Depends on:** Phase 4.5.

**Acceptance:** Three demo profiles produce three visibly-distinct, sensible result lists.

---

## Phase 6 — Stretch features (in priority order, after judging prep is done)

Each is independent; build whichever the timeline allows.

### 6.1 — Auto-generated required-document checklist (highest priority stretch)

- Add an optional `documents_regex` field to `Scheme`: a list of `(label, regex)` pairs, e.g. `("Aadhaar", r"\b[aA]adhaar\b")`, `("Land Record", r"land[\s-]?record")`.
- New endpoint `GET /api/schemes/{id}/documents` runs each regex against `scheme.description`; returns the labels that matched.
- UI: a "Documents you'll likely need" checklist below the description on each Matched card.

### 6.2 — Hindi language toggle for form + summaries

- Add an `i18n` string table for the form labels, button text, and result-section headings (Hindi + English).
- Scheme summaries stay in English (out of scope: Hindi scheme-text translation).
- A stopword list extension to `TfidfVectorizer` is **not** required for v1 of this stretch.

### 6.3 — Voice input on profile form

- Web Speech API (`webkitSpeechRecognition`) bound to the crop text field.
- Language: `en-IN` default.
- ~30 lines of frontend code; no backend changes.

### 6.4 — Admin-facing aggregate insight dashboard

- New route `GET /api/admin/analytics/state-coverage` returning, per state, `% of synthetic profiles that don't qualify for any irrigation scheme` etc.
- Frontend: a small bar-chart panel on the admin screen.
- "Synthetic profiles" = we permute over a fixed grid of values, no real farmer data.

### 6.5 — Bookmark/save button on each scheme card (problem statement OPTIONAL)

- "Manual bookmark/save button for farmers" — per problem statement OPTIONAL add-on.
- localStorage-based, no user accounts. Per-scheme star icon in card top-right.
- "Saved schemes" tab on the Results page lists them.
- ~50 lines of frontend code; no backend changes.

---

## Dependency graph (visual)

```
Phase 0 (scaffold)
   │
   ▼
Phase 1 (data prep)
   │
   ▼
Phase 2 (backend skeleton)
   │
   ▼
Phase 3 (matching engine)
   │
   ▼
Phase 4 (frontend) ──────┐
   │                     │
   ▼                     │
Phase 4.5 (admin)        │
   │                     │
   ▼                     │
Phase 5 (demo polish)    │
                         │
                         ▼
                  Phase 6 (stretches, parallel)
```

If a phase overruns, the cheapest cuts are: Phase 5 demo polish (skip 5.3–5.4 screenshots), Phase 4.5 admin polish (the form can be a curl-able endpoint + the README), and any of the Phase 6 stretches. Phase 3 (matching engine) and Phase 1 (data prep) are not cuttable — they're the substance.
