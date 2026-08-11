"""Controlled vocabularies. Kept byte-for-byte in sync with the frontend:
frontend/src/App.tsx (INDIA_STATES) and frontend/src/data/schemes.ts (INDIA_CROPS, SOCIAL_CATEGORIES).
If you add/remove an entry here, mirror the change on the frontend side too.
"""

INDIA_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu & Kashmir", "Ladakh",
]

# (slug, label) — slug is the canonical token used in FarmerProfile.crop and FilterRule.crops
INDIA_CROPS = [
    {"slug": "wheat", "label": "Wheat (गेहूँ)"},
    {"slug": "paddy", "label": "Paddy / Rice (धान)"},
    {"slug": "cotton", "label": "Cotton (कपास)"},
    {"slug": "sugarcane", "label": "Sugarcane (गन्ना)"},
    {"slug": "pulses", "label": "Pulses / Gram (दालें / चना)"},
    {"slug": "mustard", "label": "Mustard / Oilseeds (सरसों)"},
    {"slug": "maize", "label": "Maize / Corn (मक्का)"},
    {"slug": "spices", "label": "Spices / Turmeric / Chili (मसाले)"},
    {"slug": "vegetables", "label": "Vegetables / Tomato / Potato (सब्जियां)"},
    {"slug": "fruits", "label": "Fruits / Mango / Banana (फल)"},
    {"slug": "soybean", "label": "Soybean (सोयाबीन)"},
    {"slug": "tea", "label": "Tea / Plantation Crops (चाय)"},
]
INDIA_CROP_SLUGS = [c["slug"] for c in INDIA_CROPS]

SOCIAL_CATEGORIES = ["General", "OBC", "SC", "ST", "Minority"]

CATEGORY_TAGS = [
    "Direct Benefit", "Insurance", "Crop Insurance", "Credit & Loan",
    "Infrastructure", "Input Subsidy", "Organic & Tech", "Irrigation",
    "Irrigation & Solar", "Equipment Subsidy", "Climate Resilience",
]

ACRE_TO_HECTARE = 0.404686
