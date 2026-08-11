"""Structural eligibility gate: four hard checks (state, crop, land size
bounds, category) that a scheme's filter_rule applies before TF-IDF ranking."""

from constants import ACRE_TO_HECTARE, BIGHA_TO_HECTARE
from models import FarmerProfile, HardFilterResult, Scheme


def _land_size_ha(profile: FarmerProfile) -> float:
    if profile.unit == "acre":
        return profile.land_size_ha * ACRE_TO_HECTARE
    if profile.unit == "bigha":
        return profile.land_size_ha * BIGHA_TO_HECTARE
    return profile.land_size_ha


def check_hard_filter(scheme: Scheme, profile: FarmerProfile) -> HardFilterResult:
    rule = scheme.filter_rule
    reasons: list[str] = []

    # 1. State
    if rule.states:
        matched_state = any(s.lower() == profile.state.lower() for s in rule.states)
        if not matched_state:
            reasons.append(
                f"Wrong state — you selected {profile.state}, but this scheme "
                f"applies to {', '.join(rule.states)} only."
            )

    # 2. Crop
    if rule.crops:
        profile_crop = profile.crop.lower().strip()
        matched_crop = any(c.lower().strip() == profile_crop for c in rule.crops)
        if not matched_crop:
            reasons.append(
                f"Crop mismatch — you listed {profile.crop}, but scheme is "
                f"targeted for {', '.join(rule.crops)}."
            )

    # 3. Land size bounds
    land_ha = _land_size_ha(profile)
    if land_ha is None:
        reasons.append("Land size not provided.")
    else:
        if rule.land_min_ha is not None and land_ha < rule.land_min_ha:
            reasons.append(
                f"Land size below minimum limit of {rule.land_min_ha} ha "
                f"(you have {land_ha:.2f} ha)."
            )
        if rule.land_max_ha is not None and land_ha > rule.land_max_ha:
            reasons.append(
                f"Land size exceeds maximum limit of {rule.land_max_ha} ha "
                f"(you have {land_ha:.2f} ha / {land_ha / ACRE_TO_HECTARE:.2f} acres)."
            )

    # 4. Category
    if rule.eligible_categories:
        matched_cat = any(c.lower() == profile.category.lower() for c in rule.eligible_categories)
        if not matched_cat:
            reasons.append(
                f"Category mismatch — your category is {profile.category}, but "
                f"scheme eligible categories are {', '.join(rule.eligible_categories)}."
            )

    return HardFilterResult(passed=len(reasons) == 0, reasons=reasons)
