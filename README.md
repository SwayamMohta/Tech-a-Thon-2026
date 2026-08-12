# Krishi Match - Farmer-to-Scheme Eligibility Matcher

> Built for **Tech-a-Thon 2026**
Demo Video Link : [https://drive.google.com/file/d/1qewxrrh28DaJoOzPVyt3OAaottgGHyTR/view?usp=sharing ](https://drive.google.com/file/d/1qewxrrh28DaJoOzPVyt3OAaottgGHyTR/view?usp=sharing)


Krishi Match helps Indian farmers discover government welfare schemes they are actually eligible for. A farmer fills in their location, land size, crop, and social category. The system runs a two-stage pipeline - hard eligibility rules first, then TF-IDF cosine similarity ranking - and returns a ranked list of schemes with explicit pass/fail explanations.

---

## Problem

India runs hundreds of central and state agricultural welfare schemes (PM-KISAN, PMFBY, KCC, PKVY, SMAM, state-specific programs, etc.). Awareness and discoverability are the bottlenecks. A farmer in Telangana growing cotton on 1.5 ha qualifies for a different set of schemes than a wheat farmer in Punjab on 3 ha. No single portal tells a specific farmer what they personally qualify for, and why they don't qualify for the rest.

---

## What It Does

1. **Farmer profile form** - 4-step form collecting state, district, land size (ha / acre / bigha), crop, irrigation type, ownership status, social category, and special category (women farmer, SC/ST, ex-serviceman, etc.).

2. **Hard filtering** - Deterministic gate: state match, crop match, land size bounds, and social category constraints. Any scheme that fails a hard rule is excluded from the eligible set with a human-readable reason ("Wrong state - you selected Punjab, but this scheme applies to Telangana only.").

3. **TF-IDF ranking** - Remaining schemes (and excluded ones, separately) are ranked by cosine similarity between the farmer's profile string and each scheme's document (title + description + benefits + category tag). Uses scikit-learn `TfidfVectorizer` with `ngram_range=(1, 2)`, `smooth_idf=True`, `norm="l2"`. Bigrams let multi-word concepts ("solar pump", "crop insurance") match as a unit.

4. **Final score** - `1.0 (if hard filter passed) + tfidf_similarity`. Eligible schemes always outrank ineligible ones regardless of similarity score.

5. **Results page** - Shows matched keywords, missing keywords, exclusion reasons, document checklist, and a direct link to the official application portal for every scheme.

6. **Browse directory** - Full scheme catalog filterable by state, crop, and category. Paginated in sets of 12.

7. **Admin panel** (JWT-protected, role=`admin`) - Paste plain-text scheme descriptions to add new schemes to the corpus. Schemes are persisted to SQLite and immediately reflected in match results.

---

## Dataset

| Source | Count |
|--------|-------|
| Hand-curated schemes (PM-KISAN, PMFBY, KCC, PKVY, SMAM, Rythu Bandhu, PMKSY, e-NAM, Punjab crop residue, Maharashtra solar/drip, NFSM, SC/ST Hub, UP Sugarcane, Soil Health Card) | 14 |
| Scraped from myscheme.gov.in via `build_dataset.py` | 845 |
| **Total in corpus** | **859** |

Coverage: 31 states and union territories, 12 crop categories (wheat, paddy, cotton, sugarcane, pulses, mustard, maize, spices, vegetables, fruits, soybean, tea/plantation), 5 social categories (General, OBC, SC, ST, Minority), 11 scheme category tags.

---

## Architecture

```
frontend/                        # React 19 + Vite 8 + TypeScript 6
├── src/
│   ├── engine/matchingEngine.ts  # Client-side TF fallback (no IDF weighting)
│   ├── data/
│   │   ├── schemes.ts            # 14 hand-curated schemes (typed, with filter rules)
│   │   └── scrapedSchemes.ts     # 845 scraped schemes (877 KB)
│   ├── components/               # 17 components
│   ├── i18n/translations.ts      # Full UI translation: English, Hindi, Telugu, Punjabi
│   └── api/client.ts             # Fetch wrapper; backend-first with client fallback

backend/                         # FastAPI + Python 3.10+
├── matching/
│   ├── hard_filter.py            # State / crop / land bounds / category checks
│   └── tfidf_rank.py             # scikit-learn TfidfVectorizer, ngram (1,2), L2 norm
├── models.py                     # Pydantic v2 models
├── db.py                         # SQLite via stdlib sqlite3 (no ORM)
├── routes/
│   ├── match.py                  # POST /api/match
│   ├── schemes.py                # GET /api/schemes
│   └── admin.py                  # POST/GET /api/admin/schemes
├── data/
│   ├── schema.sql                # Single-table schema; filter_rule fields as JSON columns
│   ├── curated_schemes.json      # 859-scheme seed file (1.5 MB)
│   └── schemes.db                # SQLite database (auto-created on first startup)
└── tests/test_matching.py        # 9 unit tests
```

---

## Matching Pipeline Detail

### Hard Filter (`hard_filter.py`)

Four checks applied in order. All failures are collected (not short-circuited) so every exclusion reason is surfaced to the farmer.

| Check | Logic |
|-------|-------|
| State | If `filter_rule.states` is non-empty, farmer state must be in the list (case-insensitive). Empty = national scheme, all states pass. |
| Crop | If `filter_rule.crops` is non-empty, farmer crop slug must match exactly. |
| Land min | If `land_min_ha` is set, converted land area must be >= min. Conversion: 1 acre = 0.404686 ha, 1 bigha = 0.2529 ha. |
| Land max | If `land_max_ha` is set, converted land area must be <= max. |
| Category | If `eligible_categories` is non-empty, farmer social category must be in the list. |

### TF-IDF Ranking (`tfidf_rank.py`)

```python
# Scheme document
doc = f"{scheme.title} {scheme.description} {scheme.benefits} {scheme.category_tag}"

# Farmer profile query string
query = " ".join([state, district, crop, category, irrigation_type,
                  farming_type, ownership_status, special_category])

# Vectorizer
TfidfVectorizer(
    tokenizer=tokenize,   # strips non-alphanum, drops stopwords, min length 2
    ngram_range=(1, 2),   # unigrams + bigrams
    norm="l2",            # L2-normalized rows
    smooth_idf=True       # +1 to doc freq to avoid zero division
)

# Similarity: dot product of L2-normalized vectors == cosine similarity
similarity = (scheme_matrix @ query_vector.T).toarray().ravel()
similarity = np.clip(similarity, 0.0, 1.0)
```

The stop word list is identical byte-for-byte between `tfidf_rank.py` and `matchingEngine.ts`.

### Final Score

```
final_score = (1.0 if hard_filter_passed else 0.0) + tfidf_similarity
```

Sorted descending. Eligible schemes (score >= 1.0) always rank above ineligible ones (score < 1.0).

### Client-Side Fallback

If the Python backend is unreachable, `matchingEngine.ts` runs a TF-only (no IDF) similarity approximation in the browser. Hard-filter logic is identical to the Python implementation. Similarity scores will differ from the backend but the eligible/ineligible split is the same.

---

## Offline / Online Modes

| Condition | Matching source |
|-----------|----------------|
| Backend running on `localhost:8000` | Python TF-IDF (sklearn, accurate) |
| Backend unreachable / not started | TypeScript TF-only fallback in browser |

The app is fully functional without the backend. The fallback is silent to the user.

---

## Localization

Full UI translation for 4 languages in `translations.ts`:

- **English** (default)
- **Hindi** (हिंदी)
- **Telugu** (తెలుగు)
- **Punjabi** (ਪੰਜਾਬੀ)

All form labels, results text, error messages, and nav items are translated. Language selector is in the navbar; selection persists in React context for the session.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend framework | React 19.2, Vite 8.2 |
| Language | TypeScript 6 |
| Styling | Vanilla CSS |
| Icons | Lucide React |
| India map | @svg-maps/india |
| Backend framework | FastAPI 0.115 |
| ASGI server | Uvicorn 0.30 |
| Validation | Pydantic v2 |
| Ranking | scikit-learn 1.5.2, NumPy 2.1 |
| Database | SQLite (stdlib sqlite3, no ORM) |
| Testing | pytest 8.3 |

---

## Running Locally

### Prerequisites

| Requirement | Minimum version | Check |
|-------------|----------------|-------|
| Python | 3.10 | `python --version` |
| Node.js | 18 | `node --version` |
| npm | 9 | `npm --version` |

---

### 1. Clone the repo

```bash
git clone <repo-url>
cd TaT
```

---

### 2. Backend

> **All commands run from the `backend/` directory.**

#### 2a. Create and activate a virtual environment

**Windows (PowerShell):**
```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
cd backend
python -m venv .venv
.venv\Scripts\activate.bat
```

**Linux / macOS:**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
```

Your prompt should show `(.venv)` when the environment is active.

#### 2b. Install dependencies

```bash
pip install -r requirements.txt
```

This installs: `fastapi`, `uvicorn`, `pydantic`, `scikit-learn`, `numpy`, `pytest`.

#### 2c. Seed the database

```bash
python scripts/seed_db.py
```

This reads `data/curated_schemes.json` (859 schemes, 1.5 MB) and `data/hand_curated_schemes.json`, creates `data/schemes.db`, and inserts all schemes. Expected output:

```
Seeded 859 schemes into backend/data/schemes.db
```

> **Only run this once.** Re-running it wipes and recreates the database, losing any schemes added through the admin panel.

#### 2d. Start the server

```bash
uvicorn main:app --reload --port 8000
```

The API is now live at `http://localhost:8000`.  
Interactive OpenAPI docs: `http://localhost:8000/docs`  
Liveness check: `http://localhost:8000/health` → `{"ok": true}`

---

### 3. Frontend

> **All commands run from the `frontend/` directory.**

#### 3a. Install dependencies

```bash
cd frontend
npm install
```

#### 3b. Start the dev server

```bash
npm run dev
```

Vite will print the local URL, typically:

```
  VITE v8.x.x  ready in Xms

  ➜  Local:   http://localhost:5173/
```

Open that URL. The frontend automatically hits `http://localhost:8000` for matching. If the backend is not running, the client-side TypeScript matching engine activates silently.

---

### 4. Running both at once (two terminals)

**Terminal 1 - backend:**
```bash
cd backend
.venv\Scripts\Activate.ps1   # or source .venv/bin/activate
uvicorn main:app --reload --port 8000
```

**Terminal 2 - frontend:**
```bash
cd frontend
npm run dev
```

---

### 5. Backend environment variable

If you want the frontend to point to a different backend URL, create `frontend/.env.local`:

```
VITE_API_URL=http://localhost:8000
```

Default is already `http://localhost:8000`, so this is only needed if you change the port.

---

### 6. Run the test suite

```bash
cd backend
pytest tests/ -v
```

Expected output: 9 tests, all passing in under 2 seconds.

---

### Common errors

| Error | Cause | Fix |
|-------|-------|-----|
| `ModuleNotFoundError: No module named 'fastapi'` | Virtual env not activated | Run the activate command for your shell (step 2a) |
| `SystemExit: ...curated_schemes.json not found` | Running seed from wrong directory | `cd backend` first, then `python scripts/seed_db.py` |
| `sqlite3.OperationalError: no such table: schemes` | seed_db.py never ran | Run `python scripts/seed_db.py` from `backend/` |
| Frontend shows 0 schemes from backend | Backend not running | Start `uvicorn` in a separate terminal; frontend falls back to client-side matching |
| Port 8000 already in use | Another process | Use `--port 8001` and set `VITE_API_URL=http://localhost:8001` in `frontend/.env.local` |
| `Activate.ps1 cannot be loaded` (Windows) | PowerShell execution policy | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once |

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/match` | Body: `FarmerProfile` JSON. Returns `list[MatchResult]` sorted by `final_score` desc. |
| `GET` | `/api/schemes` | All schemes in the database. |
| `POST` | `/api/admin/schemes` | Add a new scheme. 409 if ID exists. |
| `GET` | `/api/admin/schemes` | List all schemes (admin). |
| `GET` | `/api/admin/schemes/{id}` | Single scheme. 404 if not found. |
| `GET` | `/health` | `{"ok": true}` liveness check. |

---

## Tests

```bash
cd backend
pytest tests/ -v
```

9 tests cover:

- Tokenizer: stopword removal, short token filtering
- `profile_to_query`: land size excluded, optional signals (district, irrigation, farming type) included
- Hard filter: state mismatch, national pass, land min/max both directions, unit conversion (5 acres = 2.02 ha, passes 2.0 ha minimum), category mismatch
- Scoring formula: `1.0 + sim` for passing vs `0.0 + sim` for failing schemes
- Sort order: higher `final_score` ranked first
- `missing_keywords` capped at 4

---

## Known Limitations

- **Auth is frontend-only.** JWTs are issued and verified entirely in the browser using a hardcoded secret in `credentials.ts`. The FastAPI backend has no auth middleware; `/api/admin/schemes` accepts unauthenticated POST requests directly.
- **Client-side fallback ranking is approximate.** The browser engine uses TF (not TF-IDF) and a heuristic similarity formula. Score values and relative rankings will differ from the Python backend.
- **Scraped scheme data quality is variable.** The 845 scraped schemes from myscheme.gov.in have inconsistent benefit descriptions and document lists.
- **No persistent user sessions.** Profile data is held in React state. Refreshing the page resets the form.

---

## Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Farmer | `farmer` | `farmer123` |

Admin login unlocks the scheme ingestion panel at `/admin`.
