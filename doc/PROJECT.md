# PROJECT — Farmer-to-Scheme Eligibility Matcher

## Problem

India runs dozens of central- and state-level agricultural subsidy and welfare schemes (PM-KISAN, PMFBY, KCC, Soil Health Card, PM-KUSUM, RKVY, PKVY, e-NAM, plus state-level programs like Rythu Bandhu). Small farmers rarely know which ones they qualify for, and fragmented state/category/land-size rules across ministries make self-discovery hard. The result: schemes go under-claimed by exactly the demographics they target.

## Solution (one paragraph)

A web tool where a farmer fills a short profile (state, land size in hectares — toggleable to acres in the form — a crop picked from a ~15–20-entry controlled dropdown of major Indian crops, and social category — SC/ST/OBC/General/Minority) and the tool ranks every relevant government scheme against that profile. Relevance scoring is **TF-IDF + cosine similarity** between profile-keyword text (state + crop slug + category, with land size deliberately kept out of the TF-IDF query because it fragments vocabulary) and scheme description text — explicitly the only ranking signal the problem statement calls for, with no embeddings/transformers/LLM calls. We add one extension beyond the stated spec: a **hard-rule filter layer** (state membership, crop membership, land-size bounds, category eligibility) that runs *before* TF-IDF. Schemes that fail a hard rule are excluded with a human-readable reason, and the UI surfaces both the matched list (top 10 by final score with a "show all" toggle) and the excluded list so the farmer sees what they qualify for and what they almost qualify for. Each result links to a separate Scheme Status Page with the full description and the official `application_url`.

## Target User

Primary: small and marginal Indian farmers (land holding ≤ 2 hectares) with low digital literacy, accessing the tool on a phone or shared device. Profile form is short (4 fields), text is plain language, exclusion reasons are concrete ("wrong state — you entered Maharashtra, scheme applies to Punjab only") rather than legalistic.

Secondary: a project admin who pastes scheme description text into the tool and verifies it parsed reasonably. Admin is technical for the hackathon; in a real deployment this would be a government data operator.

## "Done" for the hackathon demo

1. **Data layer**: a populated SQLite database with the full Kaggle corpus filtered to agriculture/rural, backfilled with 15–25 hand-curated real schemes (description text from official scheme pages or rules.myscheme.gov.in). Every scheme carries an `application_url` pointing at the official apply page.
2. **Matching engine**: a FastAPI endpoint that takes a farmer profile and returns every scheme ranked by combined score: `{passed_filter: bool, exclusion_reason: str | null, tfidf_similarity: float, final_score: float, matched_keywords: [...], missing_keywords: [...]}`.
3. **Farmer Dashboard**: a React form (4 fields) → results page split into two sections: **matched** (ranked by final score, descending) and **excluded** (with reason chips). Each card links to a Scheme Status Page.
4. **Scheme Status Page**: a separate page per scheme showing the full description, an "Apply now" button linking out to `application_url`, and a recap of which eligibility keywords from the scheme matched the farmer's profile.
5. **Admin**: paste/upload plain-text description → persistence in the DB → instantly re-matchable. No structured parsing required on input.
6. **Stretch** (only after 1–5 ship): auto-generated required-document checklist per scheme, voice input via Web Speech API, Hindi language toggle for form + summaries, admin-facing aggregate insight dashboard, manual bookmark/save button on each scheme card (problem statement OPTIONAL).

## Non-Goals (explicitly not building)

- **No embeddings, transformers, or LLM calls in scoring/ranking.** Out of scope per the problem statement ("no embeddings/transformers needed") and judging criteria. TF-IDF is the ranker.
- **No production-grade auth.** This is a demo — admin endpoints are open in dev.
- **No multilingual scheme retrieval at launch.** Hindi toggle for the UI chrome is a stretch; we do not translate scheme descriptions themselves.
- **No scraping pipeline that needs to run continuously.** We scrape the Kaggle dataset once and curate 15–25 real schemes by hand. Updating schemes is a manual admin action.
- **No mobile app.** Responsive web only.
- **No production deploy / hosting setup.** Runs locally for the demo.
- **No scheme-list personalization between sessions.** No user accounts, no saved profiles, no analytics beyond what the admin dashboard surfaces.

---

See `ARCHITECTURE.md` for system shape, `DATA_SCHEMA.md` for the exact data model, `MATCHING_LOGIC.md` for the matching spec, `ROADMAP.md` for the build sequence, `OPEN_QUESTIONS.md` for assumptions that still need confirmation.
