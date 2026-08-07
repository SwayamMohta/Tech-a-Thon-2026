from fastapi import APIRouter, HTTPException

from db import fetch_all_schemes, fetch_scheme
from models import Scheme

router = APIRouter()


@router.get("/api/schemes", response_model=list[Scheme])
def list_schemes() -> list[Scheme]:
    return fetch_all_schemes()


@router.get("/api/schemes/{scheme_id}", response_model=Scheme)
def get_scheme(scheme_id: str) -> Scheme:
    scheme = fetch_scheme(scheme_id)
    if scheme is None:
        raise HTTPException(status_code=404, detail=f"scheme not found: {scheme_id}")
    return scheme
