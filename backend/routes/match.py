from fastapi import APIRouter

from db import fetch_all_schemes
from matching import match_all
from models import FarmerProfile, MatchResult

router = APIRouter()


@router.post("/api/match", response_model=list[MatchResult])
def match(profile: FarmerProfile) -> list[MatchResult]:
    schemes = fetch_all_schemes()
    return match_all(schemes, profile)
