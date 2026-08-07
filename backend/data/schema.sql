-- Schema mirrors frontend/src/types/scheme.ts's Scheme shape directly (not the
-- older doc/DATA_SCHEMA.md draft, which predates the real dataset and used
-- different field names). filter_rule sub-fields and documents_required are
-- stored as JSON text columns since sqlite has no native array/object type.

CREATE TABLE schemes (
    id                  TEXT PRIMARY KEY,
    title               TEXT NOT NULL,
    short_name          TEXT NOT NULL,
    ministry            TEXT NOT NULL,
    description         TEXT NOT NULL,
    application_url     TEXT NOT NULL,
    benefits            TEXT NOT NULL,
    documents_required  TEXT NOT NULL,   -- JSON array of strings
    category_tag        TEXT NOT NULL,
    states              TEXT,            -- JSON array; NULL/[] = national
    crops               TEXT,            -- JSON array; NULL/[] = all crops
    land_min_ha         REAL,
    land_max_ha         REAL,
    eligible_categories TEXT             -- JSON array; NULL/[] = all categories
);

CREATE INDEX idx_schemes_title ON schemes(title);
