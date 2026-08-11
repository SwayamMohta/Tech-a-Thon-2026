from matching.hard_filter import check_hard_filter
from matching.tfidf_rank import tfidf_rank
from models import FarmerProfile, MatchResult, Scheme


def match_all(schemes: list[Scheme], profile: FarmerProfile) -> list[MatchResult]:
    similarities, matched_kw, missing_kw = tfidf_rank(schemes, profile)

    results = []
    for scheme, sim, matched, missing in zip(schemes, similarities, matched_kw, missing_kw):
        filter_result = check_hard_filter(scheme, profile)
        final_score = (1.0 if filter_result.passed else 0.0) + sim
        results.append(MatchResult(
            scheme=scheme,
            passed_filter=filter_result.passed,
            exclusion_reasons=filter_result.reasons,
            tfidf_similarity=sim,
            final_score=final_score,
            matched_keywords=matched,
            missing_keywords=missing,
        ))

    # Stable sort: ties keep the schemes' input order, same as
    # matchingEngine.ts's `results.sort((a, b) => b.final_score - a.final_score)`.
    results.sort(key=lambda r: r.final_score, reverse=True)
    return results
