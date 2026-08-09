export interface FilterRule {
  states?: string[];            // empty or undefined = National (all states)
  crops?: string[];             // empty or undefined = All crops
  land_min_ha?: number;         // min land in hectares
  land_max_ha?: number;         // max land in hectares
  eligible_categories?: string[]; // SC, ST, OBC, General, Minority
}

export interface Scheme {
  id: string;
  title: string;
  short_name: string;
  ministry: string;
  description: string;
  application_url: string;
  benefits: string;
  documents_required: string[];
  filter_rule: FilterRule;
  category_tag: 'Direct Benefit' | 'Insurance' | 'Crop Insurance' | 'Credit & Loan' | 'Infrastructure' | 'Input Subsidy' | 'Organic & Tech' | 'Irrigation' | 'Irrigation & Solar' | 'Equipment Subsidy' | 'Climate Resilience';
}

export interface FarmerProfile {
  // Step 1: Location & Address
  state: string;
  district?: string;
  taluka?: string;
  pincode?: string;
  khasra_no?: string;

  // Step 2: Land Holding & Assets
  land_size_ha: number;
  unit?: 'ha' | 'acre' | 'bigha';
  ownership_status?: 'Owner Farmer' | 'Tenant / Sharecropper' | 'Leased Land' | 'Forest / Community Land';
  irrigation_type?: 'Rainfed / Un-irrigated' | 'Canal / Borewell Irrigated' | 'Drip / Micro-Irrigated' | 'Solar Pumped';

  // Step 3: Farming Operations
  crop: string;
  farming_season?: 'Kharif (Monsoon)' | 'Rabi (Winter)' | 'Zaid (Summer)' | 'Whole Year';
  annual_income?: 'Below ₹1 Lakh' | '₹1 Lakh - ₹2.5 Lakhs' | '₹2.5 Lakhs - ₹5 Lakhs' | 'Above ₹5 Lakhs';
  farming_type?: 'Conventional Farming' | 'Certified Organic Farming' | 'Natural Farming (ZBNF)' | 'Polyhouse / Protected';

  // Step 4: Demographics & Identity
  farmer_name?: string;
  mobile_number?: string;
  aadhaar_last4?: string;
  gender?: 'Male' | 'Female' | 'Other';
  category: string;
  special_category?: 'Small & Marginal Farmer' | 'Women Farmer' | 'Differently Abled (Divyang)' | 'Ex-Serviceman' | 'None';
}

export interface HardFilterResult {
  passed: boolean;
  reasons: string[];
}

export interface MatchResult {
  scheme: Scheme;
  passed_filter: boolean;
  exclusion_reasons: string[];
  tfidf_similarity: number;
  final_score: number;
  matched_keywords: string[];
  missing_keywords: string[];
}
