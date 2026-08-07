"""Loads backend/data/curated_schemes.json into a fresh backend/data/schemes.db.
Destructive by design: always deletes the existing DB file first (schemes are
admin-edited state, not something we migrate). Run build_dataset.py first.

    python -m backend.scripts.seed_db
"""
import json
import sqlite3
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BACKEND_DIR))

from db import DB_PATH, SCHEMA_PATH, scheme_to_row  # noqa: E402
from models import Scheme  # noqa: E402

CURATED_PATH = BACKEND_DIR / "data" / "curated_schemes.json"


def main() -> None:
    if not CURATED_PATH.exists():
        raise SystemExit(f"{CURATED_PATH} not found — run build_dataset.py first")

    if DB_PATH.exists():
        DB_PATH.unlink()

    conn = sqlite3.connect(DB_PATH)
    conn.executescript(SCHEMA_PATH.read_text(encoding="utf-8"))

    raw = json.loads(CURATED_PATH.read_text(encoding="utf-8"))
    schemes = [Scheme(**s) for s in raw]

    rows = [scheme_to_row(s) for s in schemes]
    conn.executemany(
        """INSERT INTO schemes
           (id, title, short_name, ministry, description, application_url, benefits,
            documents_required, category_tag, states, crops, land_min_ha, land_max_ha, eligible_categories)
           VALUES (:id, :title, :short_name, :ministry, :description, :application_url, :benefits,
                   :documents_required, :category_tag, :states, :crops, :land_min_ha, :land_max_ha, :eligible_categories)""",
        rows,
    )
    conn.commit()

    count = conn.execute("SELECT COUNT(*) FROM schemes").fetchone()[0]
    conn.close()
    print(f"Seeded {count} schemes into {DB_PATH.relative_to(BACKEND_DIR.parent)}")


if __name__ == "__main__":
    main()
