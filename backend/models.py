"""Pydantic models. Field-for-field mirror of frontend/src/types/scheme.ts —
keep the two in sync; this file is the backend's copy of that contract."""

from typing import Literal, Optional
from pydantic import BaseModel

CategoryTag = Literal[
    "Direct Benefit", "Insurance", "Crop Insurance", "Credit & Loan",
    "Infrastructure", "Input Subsidy", "Organic & Tech", "Irrigation",
    "Irrigation & Solar", "Equipment Subsidy", "Climate Resilience",
]


class FilterRule(BaseModel):
    states: Optional[list[str]] = None            # None/[] = national
    crops: Optional[list[str]] = None              # None/[] = all crops
    land_min_ha: Optional[float] = None
    land_max_ha: Optional[float] = None
    eligible_categories: Optional[list[str]] = None  # None/[] = all categories


class Scheme(BaseModel):
    id: str
    title: str
    short_name: str
    ministry: str
    description: str
    application_url: str
    benefits: str
    documents_required: list[str] = []
    filter_rule: FilterRule = FilterRule()
    category_tag: CategoryTag


class FarmerProfile(BaseModel):
    state: str
    land_size_ha: float
    crop: str
    category: str
    unit: Optional[Literal["ha", "acre", "bigha"]] = "ha"
    district: Optional[str] = None
    irrigation_type: Optional[str] = None
    farming_type: Optional[str] = None
    ownership_status: Optional[str] = None
    special_category: Optional[str] = None


class HardFilterResult(BaseModel):
    passed: bool
    reasons: list[str]


class MatchResult(BaseModel):
    scheme: Scheme
    passed_filter: bool
    exclusion_reasons: list[str]
    tfidf_similarity: float
    final_score: float
    matched_keywords: list[str]
    missing_keywords: list[str]
