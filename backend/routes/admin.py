import sqlite3

from fastapi import APIRouter, HTTPException

from db import fetch_all_schemes, fetch_scheme, insert_scheme
from models import Scheme

router = APIRouter()


@router.post("/api/admin/schemes", response_model=Scheme, status_code=201)
def add_scheme(scheme: Scheme) -> Scheme:
    try:
        insert_scheme(scheme)
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=409, detail=f"scheme id already exists: {scheme.id}")
    return scheme


@router.get("/api/admin/schemes", response_model=list[Scheme])
def list_schemes_admin() -> list[Scheme]:
    return fetch_all_schemes()


@router.get("/api/admin/schemes/{scheme_id}", response_model=Scheme)
def get_scheme_admin(scheme_id: str) -> Scheme:
    scheme = fetch_scheme(scheme_id)
    if scheme is None:
        raise HTTPException(status_code=404, detail=f"scheme not found: {scheme_id}")
    return scheme
