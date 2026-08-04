# ARCHITECTURE

## System Overview

Three runtime components. Strict separation: the frontend never touches the database directly, the matching engine is a pure function over (schemes, profile), the data store is dumb persistence.

```
┌─────────────┐       HTTP/JSON       ┌──────────────┐      sqlite3       ┌────────────┐
│  React UI   │ ────────────────────► │  FastAPI     │ ────────────────►  │  SQLite    │
│  (Vite)     │ ◄──────────────────── │  backend     │ ◄────────────────  │  schemes   │
└─────────────┘                       └──────────────┘                    └────────────┘
                                              │
                                              ▼
                                     ┌─────────────────┐
                                     │ Matching engine │
                                     │  (pure Python)  │
                                     └─────────────────┘
```

The matching engine reads from the database but is otherwise a pure function: given a list of schemes and a profile, it returns results. No side effects, no global state, no caching layer at the engine. This makes it trivial to unit-test and to swap out for a different ranker later (we won't, per scope, but the seam exists).

## Components

### 1. Frontend — React + Vite + TypeScript

Single-page app. Three user-facing screens (form, results, scheme status) plus an admin screen.

- **Profile form**: state dropdown (28 states/UTs), land size numeric input (in hectares), crop text input or dropdown (free text for v1), category dropdown (SC/ST/OBC/General/Minority).
- **Results page**: two sections — Matched (top 10 by final score with a "show all" toggle that unhides anything past the cap) and Excluded (read-only list with reason chips). Each card is clickable and routes to the Scheme Status Page.
- **Scheme Status Page** (per problem statement): a separate route per scheme showing full description, an "Apply now" link to `application_url`, and a recap of matched/missing eligibility keywords for the farmer's profile.
- **Admin screen**: textarea for pasting scheme description text, schema-aligned fields for structured metadata (state list, crop list, land min/max, category list, application URL). Submitting persists to DB and the new scheme is immediately matchable.

Served by Vite in dev. No SSR. State-based screen switching for v1 (results ↔ status is a simple route into the Scheme Status Page).

### 2. Backend — FastAPI + sqlite3 (stdlib, no ORM)

Four route groups:

- `POST /api/match` — body is a `FarmerProfile` JSON. Returns a list of `MatchResult` (one per scheme in the DB). See `MATCHING_LOGIC.md` for semantics.
- `GET /api/schemes/{id}` — public, farmer-facing. Returns the full `Scheme` (description, application_url, filter_rule) for the Scheme Status Page.
- `POST /api/admin/schemes` — body is a full `Scheme` JSON. Inserts a row.
- `GET /api/admin/schemes` and `GET /api/admin/schemes/{id}` — read-back for the admin UI.

No auth on the admin endpoints for v1 (demo). CORS open to `localhost:*` in dev.

DB access is via `sqlite3.connect()` from the Python stdlib (no SQLAlchemy, no ORM, no Alembic). Schema lives in `data/schema.sql`, applied once on backend startup if the DB file doesn't exist. All queries use parameterized statements. Migrations are not a concern for v1 — if the schema changes we delete the DB file and re-seed.

### 3. Matching engine — pure Python, scikit-learn

A single module with two top-level functions:

- `hard_filter(scheme: Scheme, profile: FarmerProfile) -> HardFilterResult` — returns `{passed: bool, reasons: list[str]}`.
- `tfidf_rank(schemes: list[Scheme], profile: FarmerProfile) -> dict[id, float]` — returns a map of `scheme_id -> cosine_similarity ∈ [0, 1]`.

The `/api/match` route orchestrates: load schemes → hard-filter all → TF-IDF rank the survivors → combine → sort by final score → return.

A single in-memory `TfidfVectorizer` is fit once per request, over the union of all scheme descriptions + the profile query string. See `MATCHING_LOGIC.md` for the exact scoring formula and edge cases.

### 4. Data store — SQLite file

One file: `data/schemes.db`. Two tables: `schemes` (the corpus) and `scheme_filter_rules` (one-to-one with schemes, contains the structured filter fields — see `DATA_SCHEMA.md` for the rationale on splitting vs. embedding). 

A seed script (`scripts/seed_db.py`) loads (a) the Kaggle CSV — **only if its license permits redistribution; see `docs/data_sources.md` for the recorded decision** — and (b) the hand-curated 15–25 schemes JSON, into a fresh DB on first setup. If the Kaggle license is unclear or restrictive, the seed script loads (b) only, and the demo runs entirely on the curated set. Re-running the seed on a populated DB is destructive; we always delete the file before re-seeding.

## How they talk

| Edge | Protocol | Format |
|---|---|---|
| React → FastAPI | HTTP POST/GET | JSON request/response |
| FastAPI → SQLite | `sqlite3` stdlib, parameterized SQL | Rows via `sqlite3.Row` |
| Matching engine ↔ FastAPI | Direct function call in-process | Python dicts |

No message queues, no background workers, no event bus. Everything is synchronous request-response.

## Folder structure

```
farmer-scheme-matcher/
├── README.md
├── docs/                          ← this file lives here once repo is set up
│   ├── PROJECT.md
│   ├── ARCHITECTURE.md
│   ├── DATA_SCHEMA.md
│   ├── MATCHING_LOGIC.md
│   ├── ROADMAP.md
│   ├── OPEN_QUESTIONS.md
│   └── data_sources.md             ← new (Phase 0): records Kaggle license decision (O7)
├── data/
│   ├── schema.sql                 ← canonical DB schema
│   ├── schemes.db                 ← created at runtime by backend (gitignored)
│   ├── kaggle_raw.csv             ← downloaded Kaggle dataset (gitignored)
│   └── curated_schemes.json       ← 15-25 hand-curated real schemes
├── scripts/
│   ├── seed_db.py                 ← reads curated_schemes.json + Kaggle CSV, writes DB
│   └── eval_smoke.py              ← sanity-check matching on a handful of profiles
├── backend/
│   ├── main.py                    ← FastAPI app, route definitions
│   ├── db.py                      ← sqlite3 connection helpers
│   ├── models.py                  ← pydantic models for request/response
│   ├── matching/
│   │   ├── __init__.py
│   │   ├── hard_filter.py
│   │   └── tfidf_rank.py
│   ├── routes/
│   │   ├── match.py
│   │   └── admin.py
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── src/
    │   ├── main.tsx
    │   ├── App.tsx
    │   ├── screens/
    │   │   ├── ProfileForm.tsx
    │   │   ├── Results.tsx
    │   │   ├── SchemeStatus.tsx        ← new, per problem statement
    │   │   └── Admin.tsx
    │   ├── components/
    │   │   ├── SchemeCard.tsx
    │   │   ├── ExcludedSchemeCard.tsx
    │   │   └── ReasonChip.tsx
    │   └── api/
    │       └── client.ts          ← typed fetch wrappers
    ├── package.json
    └── tsconfig.json
```

## Constraints carried by the architecture

- **SQLite + no ORM** = no migrations, fastest possible local dev, no async DB layer needed. The trade-off: every request opens/closes a connection, no connection pooling. Fine for a demo.
- **No embeddings** = the matching engine can run on CPU in <100ms per request for a few hundred schemes. No GPU, no model download.
- **Filtering and ranking are separate stages** = we can debug each independently and explain results to judges by reading the matching output.
