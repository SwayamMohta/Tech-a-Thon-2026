# Backend

FastAPI + sqlite3 (stdlib) + scikit-learn TF-IDF, standalone for now (not wired
into `frontend/`, which keeps using its own client-side engine). Data model,
matching formula, and hard-filter reason strings are a deliberate 1:1 port of
`frontend/src/types/scheme.ts` and `frontend/src/engine/matchingEngine.ts` —
see the module docstrings in `matching/` for what's mirrored and why.

## Setup

```bash
cd backend
python -m venv .venv
.venv/Scripts/activate        # .venv/bin/activate on macOS/Linux
pip install -r requirements.txt
```

## Build the data (run once, or whenever dataset/scraped_schemes.jsonl changes)

```bash
cd ..                                        # repo root
python -m backend.scripts.build_dataset      # dataset/scraped_schemes.jsonl -> backend/data/curated_schemes.json
python -m backend.scripts.seed_db            # curated_schemes.json -> backend/data/schemes.db (destructive reseed)
```

## Run

```bash
cd backend
uvicorn main:app --reload --port 8000
```

- `GET  /health`
- `POST /api/match` — body: `FarmerProfile` (`state`, `land_size_ha`, `crop`, `category`, `unit?`) → `list[MatchResult]`
- `GET  /api/schemes` / `GET /api/schemes/{id}`
- `POST /api/admin/schemes` (body: full `Scheme`) / `GET /api/admin/schemes` / `GET /api/admin/schemes/{id}`

## Test

```bash
cd backend
pytest tests/ -q
```

## Data notes

`build_dataset.py` keeps the 859 (of 904) scraped myscheme.gov.in records tagged
Agriculture/Rural, and extracts `filter_rule` (states/crops/land bounds/eligible
categories) from free-text eligibility criteria via conservative regex
heuristics — most real schemes don't state a numeric land bound or restrict to
a specific crop, so most schemes correctly end up unrestricted on those axes
(empty = open to everyone, per `FilterRule`'s own semantics) and TF-IDF
similarity on the description text carries most of the ranking signal. Extraction
coverage printed at the end of a `build_dataset` run: ~89% state-scoped, ~4%
crop-restricted, ~6% land-bounded, ~10% category-gated.
