import json
import sqlite3
from contextlib import contextmanager
from pathlib import Path

from models import FilterRule, Scheme

DATA_DIR = Path(__file__).resolve().parent / "data"
DB_PATH = DATA_DIR / "schemes.db"
SCHEMA_PATH = DATA_DIR / "schema.sql"


def init_db() -> None:
    if DB_PATH.exists():
        return
    conn = sqlite3.connect(DB_PATH)
    try:
        conn.executescript(SCHEMA_PATH.read_text(encoding="utf-8"))
        conn.commit()
    finally:
        conn.close()


@contextmanager
def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()


def row_to_scheme(row: sqlite3.Row) -> Scheme:
    return Scheme(
        id=row["id"],
        title=row["title"],
        short_name=row["short_name"],
        ministry=row["ministry"],
        description=row["description"],
        application_url=row["application_url"],
        benefits=row["benefits"],
        documents_required=json.loads(row["documents_required"]),
        category_tag=row["category_tag"],
        filter_rule=FilterRule(
            states=json.loads(row["states"]) if row["states"] else [],
            crops=json.loads(row["crops"]) if row["crops"] else [],
            land_min_ha=row["land_min_ha"],
            land_max_ha=row["land_max_ha"],
            eligible_categories=json.loads(row["eligible_categories"]) if row["eligible_categories"] else [],
        ),
    )


def scheme_to_row(scheme: Scheme) -> dict:
    fr = scheme.filter_rule
    return {
        "id": scheme.id,
        "title": scheme.title,
        "short_name": scheme.short_name,
        "ministry": scheme.ministry,
        "description": scheme.description,
        "application_url": scheme.application_url,
        "benefits": scheme.benefits,
        "documents_required": json.dumps(scheme.documents_required),
        "category_tag": scheme.category_tag,
        "states": json.dumps(fr.states or []),
        "crops": json.dumps(fr.crops or []),
        "land_min_ha": fr.land_min_ha,
        "land_max_ha": fr.land_max_ha,
        "eligible_categories": json.dumps(fr.eligible_categories or []),
    }


def fetch_all_schemes() -> list[Scheme]:
    with get_connection() as conn:
        rows = conn.execute("SELECT * FROM schemes").fetchall()
        return [row_to_scheme(r) for r in rows]


def fetch_scheme(scheme_id: str) -> Scheme | None:
    with get_connection() as conn:
        row = conn.execute("SELECT * FROM schemes WHERE id = ?", (scheme_id,)).fetchone()
        return row_to_scheme(row) if row else None


def insert_scheme(scheme: Scheme) -> None:
    row = scheme_to_row(scheme)
    with get_connection() as conn:
        conn.execute(
            """INSERT INTO schemes
               (id, title, short_name, ministry, description, application_url, benefits,
                documents_required, category_tag, states, crops, land_min_ha, land_max_ha, eligible_categories)
               VALUES (:id, :title, :short_name, :ministry, :description, :application_url, :benefits,
                       :documents_required, :category_tag, :states, :crops, :land_min_ha, :land_max_ha, :eligible_categories)""",
            row,
        )
        conn.commit()
