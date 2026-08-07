"""Reads dataset/scraped_schemes.jsonl (904 raw myscheme.gov.in scrapes), keeps the
Agriculture/Rural-tagged ones, and produces backend/data/curated_schemes.json —
a list of Scheme records shaped exactly like frontend/src/types/scheme.ts.

Land size / crop / eligible-category filter rules are not present as structured
fields in the source data, so they're extracted with conservative regex
heuristics over the eligibility text. When nothing restrictive is found, the
field is left empty, which per FilterRule's own semantics means "open to
everyone" — the safe default. Run this before seed_db.py.

    python -m backend.scripts.build_dataset
"""
import html
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
RAW_PATH = REPO_ROOT / "dataset" / "scraped_schemes.jsonl"
OUT_PATH = REPO_ROOT / "backend" / "data" / "curated_schemes.json"

sys.path.insert(0, str(REPO_ROOT / "backend"))
from constants import INDIA_CROP_SLUGS, ACRE_TO_HECTARE  # noqa: E402

STATE_NORMALIZE = {
    "Jammu and Kashmir": "Jammu & Kashmir",
}

CROP_SYNONYMS = {
    "wheat": ["wheat"],
    "paddy": ["paddy", "rice"],
    "cotton": ["cotton"],
    "sugarcane": ["sugarcane", "sugar cane"],
    "pulses": ["pulses", "gram", "tur", "urad", "moong", "arhar", "lentil", "dal"],
    "mustard": ["mustard", "oilseed", "oilseeds", "rapeseed"],
    "maize": ["maize", "corn"],
    "spices": ["spices", "turmeric", "chilli", "chili", "pepper", "cardamom"],
    "vegetables": ["vegetable", "vegetables", "tomato", "potato", "onion"],
    "fruits": ["fruit", "fruits", "mango", "banana", "horticulture", "orchard"],
    "soybean": ["soybean", "soya bean", "soya"],
    "tea": ["tea garden", "tea plantation"],
}
assert set(CROP_SYNONYMS) == set(INDIA_CROP_SLUGS)

RESTRICTIVE_WORDS = r"(?:only|exclusively|restricted to|specifically for|available only to|meant only for)"
CATEGORY_RESTRICTIVE_WORDS = RESTRICTIVE_WORDS + r"|(?:should|must) belong to|belonging to the"

DOC_KEYWORDS = [
    (r"\baadhaar\b", "Aadhaar Card"),
    (r"caste certificate|scheduled caste certificate|scheduled tribe certificate", "Caste Certificate"),
    (r"income certificate", "Income Certificate"),
    (r"land record|khatauni|\bkhata\b|7/12|revenue record|land ownership|\bpatta\b|land document", "Land Ownership Record"),
    (r"bank (?:account )?passbook|bank account", "Bank Account Passbook"),
    (r"ration card", "Ration Card"),
    (r"\bbpl\b|below poverty line", "BPL Certificate"),
    (r"residence certificate|domicile certificate", "Residence Certificate"),
    (r"voter id", "Voter ID Card"),
]
DEFAULT_DOCS = ["Aadhaar Card", "Land/Identity Verification", "Bank Account Passbook"]

CATEGORY_TAG_RULES = [
    (r"crop insurance|fasal bima|yield.{0,20}insurance", "Crop Insurance"),
    (r"\binsurance\b", "Insurance"),
    (r"\bloan\b|\bcredit\b|kisan credit card|interest subvention", "Credit & Loan"),
    (r"solar.{0,20}(pump|irrigation)|irrigation.{0,20}solar", "Irrigation & Solar"),
    (r"irrigation|drip irrigation|sprinkler|micro.?irrigation", "Irrigation"),
    (r"organic farming|natural farming|bio.?fertilizer|vermicompost", "Organic & Tech"),
    (r"machinery|farm equipment|mechani[sz]ation|\bimplements?\b|\btractor\b|\btools\b", "Equipment Subsidy"),
    (r"infrastructure|godown|warehouse|cold storage|market yard|processing unit", "Infrastructure"),
    (r"climate.{0,15}resilien|drought.?resistant|flood.?resistant|climate change", "Climate Resilience"),
    (r"subsidy|\binput\b|\bseed\b|fertili[sz]er", "Input Subsidy"),
]


def clean_text(text: str | None) -> str:
    if not text:
        return ""
    t = text
    for _ in range(3):
        t = html.unescape(t)
    t = re.sub(r"<br\s*/?>", " ", t, flags=re.I)
    t = re.sub(r"<[^>]+>", " ", t)
    t = re.sub(r"[*_>#]+", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def truncate(text: str, limit: int) -> str:
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0]
    return cut + "…"


def is_agri(scheme_category: list[dict]) -> bool:
    return any(re.search(r"agri|rural", c.get("label", ""), re.I) for c in scheme_category)


def extract_states(bd: dict) -> list[str]:
    level = (bd.get("level") or {}).get("label", "")
    if level == "Central":
        return []
    state = bd.get("state") or {}
    label = state.get("label")
    if not label:
        return []
    return [STATE_NORMALIZE.get(label, label)]


def extract_crops(eligibility_text: str) -> list[str]:
    text = eligibility_text.lower()
    found = []
    for slug, synonyms in CROP_SYNONYMS.items():
        for syn in synonyms:
            for m in re.finditer(re.escape(syn), text):
                window = text[max(0, m.start() - 100):m.start()]
                if re.search(RESTRICTIVE_WORDS, window) or re.search(r"cultivat\w*", window):
                    found.append(slug)
                    break
            else:
                continue
            break
    return sorted(set(found))


def extract_land_bounds(eligibility_text: str) -> tuple[float | None, float | None]:
    text = eligibility_text.lower()
    land_min = land_max = None

    def to_ha(val: float, unit: str) -> float:
        return round(val * ACRE_TO_HECTARE, 2) if unit.startswith("acre") else round(val, 2)

    for m in re.finditer(r"(?:up to|maximum of|not exceeding|not more than)\s*(\d+(?:\.\d+)?)\s*(hectares?|ha\b|acres?)", text):
        land_max = to_ha(float(m.group(1)), m.group(2))
    for m in re.finditer(r"(?:minimum of|at least|not less than)\s*(\d+(?:\.\d+)?)\s*(hectares?|ha\b|acres?)", text):
        land_min = to_ha(float(m.group(1)), m.group(2))
    return land_min, land_max


def extract_categories(eligibility_text: str) -> list[str]:
    text = eligibility_text.lower()
    cat_patterns = {
        "SC": r"scheduled caste|\bsc\b",
        "ST": r"scheduled tribe|\bst\b",
        "OBC": r"other backward class|\bobc\b",
        "Minority": r"minorit\w*",
    }
    found = []
    for code, pat in cat_patterns.items():
        for m in re.finditer(pat, text):
            window = text[max(0, m.start() - 60):m.start()]
            if re.search(CATEGORY_RESTRICTIVE_WORDS, window):
                found.append(code)
                break
    return sorted(set(found))


def derive_category_tag(text: str) -> str:
    lower = text.lower()
    for pattern, tag in CATEGORY_TAG_RULES:
        if re.search(pattern, lower):
            return tag
    return "Direct Benefit"


def derive_documents(text: str) -> list[str]:
    lower = text.lower()
    found = [label for pattern, label in DOC_KEYWORDS if re.search(pattern, lower)]
    seen, deduped = set(), []
    for d in found:
        if d not in seen:
            seen.add(d)
            deduped.append(d)
    return deduped or DEFAULT_DOCS


def pick_application_url(rec: dict) -> str:
    for proc in rec["details"].get("applicationProcess") or []:
        url = proc.get("url")
        if url and url.startswith("http"):
            return url
    return rec["url"]


def convert(rec: dict) -> dict | None:
    details = rec["details"]
    bd = details["basicDetails"]
    if not is_agri(bd.get("schemeCategory") or []):
        return None

    content = details.get("schemeContent") or {}
    elig = details.get("eligibilityCriteria") or {}

    brief = clean_text(content.get("briefDescription"))
    eligibility_text = clean_text(elig.get("eligibilityDescription_md"))
    benefits_text = clean_text(content.get("benefits_md")) or "Financial and welfare support as per scheme guidelines."

    description = f"{brief} Eligibility: {eligibility_text}".strip()
    description = truncate(description, 2200)
    benefits_text = truncate(benefits_text, 900)

    title = bd.get("schemeName") or rec["slug"]
    ministry = bd.get("implementingAgency") or (bd.get("nodalDepartmentName") or {}).get("label") or "Government of India"

    full_text_for_tagging = " ".join([title, description, benefits_text])

    land_min, land_max = extract_land_bounds(eligibility_text)

    return {
        "id": f"scraped-{rec['slug']}",
        "title": title,
        "short_name": bd.get("schemeShortTitle") or title[:24],
        "ministry": ministry,
        "description": description,
        "application_url": pick_application_url(rec),
        "benefits": benefits_text,
        "documents_required": derive_documents(eligibility_text + " " + description),
        "category_tag": derive_category_tag(full_text_for_tagging),
        "filter_rule": {
            "states": extract_states(bd),
            "crops": extract_crops(eligibility_text),
            "land_min_ha": land_min,
            "land_max_ha": land_max,
            "eligible_categories": extract_categories(eligibility_text),
        },
    }


def main() -> None:
    records = [json.loads(line) for line in RAW_PATH.read_text(encoding="utf-8").splitlines() if line.strip()]
    schemes = [s for s in (convert(r) for r in records) if s is not None]

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(schemes, indent=2, ensure_ascii=False), encoding="utf-8")

    n = len(schemes)
    with_state = sum(1 for s in schemes if s["filter_rule"]["states"])
    with_crop = sum(1 for s in schemes if s["filter_rule"]["crops"])
    with_land = sum(1 for s in schemes if s["filter_rule"]["land_min_ha"] or s["filter_rule"]["land_max_ha"])
    with_cat = sum(1 for s in schemes if s["filter_rule"]["eligible_categories"])
    tag_counts: dict[str, int] = {}
    for s in schemes:
        tag_counts[s["category_tag"]] = tag_counts.get(s["category_tag"], 0) + 1

    print(f"Converted {n} agriculture/rural schemes -> {OUT_PATH.relative_to(REPO_ROOT)}")
    print(f"  state-restricted: {with_state} ({with_state/n:.0%})")
    print(f"  crop-restricted:  {with_crop} ({with_crop/n:.0%})")
    print(f"  land-bounded:     {with_land} ({with_land/n:.0%})")
    print(f"  category-gated:   {with_cat} ({with_cat/n:.0%})")
    print(f"  category_tag distribution: {tag_counts}")


if __name__ == "__main__":
    main()
