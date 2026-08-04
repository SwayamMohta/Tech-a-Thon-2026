# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Indian farmers, agricultural advisors, and extension workers seeking state and central government welfare schemes tailored to their specific farm profile (land size in hectares/acres, crop type, state, and social category).

## Product Purpose

Krishi Match simplifies and democratizes access to agricultural welfare schemes by rapidly matching farmers with eligible government programs, providing direct application links, document checklists, and transparent eligibility explanations.

## Positioning

A hybrid scheme matching engine combining strict hard-filtering rules (state, land bounds, crop matching, social category) with TF-IDF similarity scoring and clear, human-readable exclusion feedback explaining why a farmer passes or fails each scheme.

## Operating Context

Web application used across desktop and mobile devices by farmers, rural kiosk operators, and agricultural extension workers in various lighting and network conditions. Requires rapid profile matching and high readability.

## Capabilities and Constraints

- **Deterministic Hard Filtering**: Filters out ineligible schemes by state, crop type, land size limits, and category constraints.
- **TF-IDF Vector Similarity**: Ranks eligible schemes by relevance using TF-IDF term weighting and L2 normalization.
- **Explainable Match Results**: Displays explicit exclusion reasons, matched terms, and missing keywords for full transparency.
- **Admin Management Portal**: Enables adding new agricultural schemes with custom eligibility rules dynamically.

## Brand Commitments

- **Name**: Krishi Match Agriculture
- **Typography**: Plus Jakarta Sans
- **Color Palette**: Vibrant Agricultural Green (`#22C55E`), Soft Warm Gold (`#F59E0B`), Clean Off-white (`#FCFCF9`), and Dark Slate text (`#111827`).

## Evidence on Hand

- **Curated Dataset**: `src/data/schemes.ts` containing major Indian central & state agricultural schemes (PM-KISAN, PMFBY, KCC, PM-KUSUM, etc.).
- **Engine Implementation**: `src/engine/matchingEngine.ts` implementing tokenization, stop-word removal, hard-filter checking, and cosine similarity.

## Product Principles

1. **Total Transparency**: Always provide clear, non-jargon reasons when a scheme fails eligibility criteria.
2. **Frictionless Discovery**: Enable rapid state-based lookup and instant profile recalculation without login walls.
3. **Official Actionability**: Ensure every scheme lists official application URLs, required documents, and ministry info.
