import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from matching import match_all  # noqa: E402
from matching.hard_filter import check_hard_filter  # noqa: E402
from matching.tfidf_rank import profile_to_query, tokenize  # noqa: E402
from models import FarmerProfile, FilterRule, Scheme  # noqa: E402


def make_scheme(**overrides) -> Scheme:
    base = dict(
        id="test-scheme",
        title="Test Scheme",
        short_name="TS",
        ministry="Ministry of Testing",
        description="A scheme for wheat and rice farmers with irrigation support.",
        application_url="https://example.com",
        benefits="Cash subsidy for irrigation equipment.",
        documents_required=["Aadhaar Card"],
        category_tag="Direct Benefit",
        filter_rule=FilterRule(),
    )
    base.update(overrides)
    return Scheme(**base)


def make_profile(**overrides) -> FarmerProfile:
    base = dict(state="Punjab", land_size_ha=1.5, crop="wheat", category="General", unit="ha")
    base.update(overrides)
    return FarmerProfile(**base)


def test_tokenize_drops_stopwords_and_short_tokens():
    tokens = tokenize("The Farmer's Scheme, in Punjab! a b wheat-growing")
    assert "the" not in tokens
    assert "scheme" not in tokens  # domain stopword
    assert "a" not in tokens and "b" not in tokens  # length <= 1
    assert "punjab" in tokens
    assert "wheat" in tokens and "growing" in tokens


def test_profile_to_query_excludes_land_size():
    profile = make_profile()
    query = profile_to_query(profile)
    assert query == "punjab wheat general"
    assert "1.5" not in query


def test_state_filter_excludes_with_reason():
    scheme = make_scheme(filter_rule=FilterRule(states=["Maharashtra"]))
    result = check_hard_filter(scheme, make_profile(state="Punjab"))
    assert not result.passed
    assert any("Wrong state" in r for r in result.reasons)


def test_state_filter_passes_when_national():
    scheme = make_scheme(filter_rule=FilterRule())  # no states = national
    result = check_hard_filter(scheme, make_profile())
    assert result.passed
    assert result.reasons == []


def test_land_bounds_both_directions():
    scheme = make_scheme(filter_rule=FilterRule(land_min_ha=2.0, land_max_ha=5.0))
    below = check_hard_filter(scheme, make_profile(land_size_ha=1.0))
    above = check_hard_filter(scheme, make_profile(land_size_ha=6.0))
    within = check_hard_filter(scheme, make_profile(land_size_ha=3.0))
    assert not below.passed and "below minimum" in below.reasons[0]
    assert not above.passed and "exceeds maximum" in above.reasons[0]
    assert within.passed


def test_land_unit_conversion_acres_to_hectares():
    # 5 acres ~= 2.02 ha, should pass a 2.0 ha minimum
    scheme = make_scheme(filter_rule=FilterRule(land_min_ha=2.0))
    result = check_hard_filter(scheme, make_profile(land_size_ha=5.0, unit="acre"))
    assert result.passed


def test_category_mismatch_reason():
    scheme = make_scheme(filter_rule=FilterRule(eligible_categories=["SC", "ST"]))
    result = check_hard_filter(scheme, make_profile(category="General"))
    assert not result.passed
    assert any("Category mismatch" in r for r in result.reasons)


def test_combine_formula_is_additive():
    passing_scheme = make_scheme(id="a", filter_rule=FilterRule())
    failing_scheme = make_scheme(id="b", filter_rule=FilterRule(states=["Kerala"]))
    results = match_all([passing_scheme, failing_scheme], make_profile(state="Punjab"))
    by_id = {r.scheme.id: r for r in results}
    assert by_id["a"].final_score == 1.0 + by_id["a"].tfidf_similarity
    assert by_id["b"].final_score == 0.0 + by_id["b"].tfidf_similarity


def test_match_all_sorts_by_final_score_descending():
    high = make_scheme(id="high", description="wheat wheat wheat irrigation punjab general subsidy")
    low = make_scheme(id="low", description="completely unrelated topic about fisheries")
    results = match_all([low, high], make_profile())
    assert [r.scheme.id for r in results][0] == "high"


def test_missing_keywords_capped_at_four():
    scheme = make_scheme(
        description="alpha beta gamma delta epsilon zeta eta theta unrelated terms galore extra padding words here"
    )
    results = match_all([scheme], make_profile(state="Zeta", crop="wheat", category="General"))
    assert len(results[0].missing_keywords) <= 4
    assert len(results[0].matched_keywords) + len(results[0].missing_keywords) <= 8
