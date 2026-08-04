import type { Scheme } from '../types/scheme';
import { SCRAPED_SCHEMES } from './scrapedSchemes';

export const INDIA_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh'
];

export const INDIA_CROPS = [
  { slug: 'wheat', label: 'Wheat (गेहूँ)' },
  { slug: 'paddy', label: 'Paddy / Rice (धान)' },
  { slug: 'cotton', label: 'Cotton (कपास)' },
  { slug: 'sugarcane', label: 'Sugarcane (गन्ना)' },
  { slug: 'pulses', label: 'Pulses / Gram (दालें / चना)' },
  { slug: 'mustard', label: 'Mustard / Oilseeds (सरसों)' },
  { slug: 'maize', label: 'Maize / Corn (मक्का)' },
  { slug: 'spices', label: 'Spices / Turmeric / Chili (मसाले)' },
  { slug: 'vegetables', label: 'Vegetables / Tomato / Potato (सब्जियां)' },
  { slug: 'fruits', label: 'Fruits / Mango / Banana (फल)' },
  { slug: 'soybean', label: 'Soybean (सोयाबीन)' },
  { slug: 'tea', label: 'Tea / Plantation Crops (चाय)' }
];

export const SOCIAL_CATEGORIES = ['General', 'OBC', 'SC', 'ST', 'Minority'];

const BASE_CURATED_SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan-01',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    short_name: 'PM-KISAN',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category_tag: 'Direct Benefit',
    description: 'Central sector scheme offering income support of Rs 6,000 per year in three equal installments to small and marginal farmer landholder families across India. Aims to supplement financial needs of farmers in procuring inputs for agriculture and domestic needs.',
    benefits: '₹6,000 direct bank transfer per year in 3 equal installments of ₹2,000 each.',
    application_url: 'https://pmkisan.gov.in',
    documents_required: ['Aadhaar Card', 'Land holding ownership record (7/12 or Khatian)', 'Active Bank Account linked with Aadhaar'],
    filter_rule: {
      land_max_ha: 2.0,
    }
  },
  {
    id: 'pmfby-02',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    short_name: 'PMFBY Crop Insurance',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category_tag: 'Crop Insurance',
    description: 'Yield-based crop insurance scheme providing comprehensive financial coverage to farmers against non-preventable natural risks (floods, drought, dry spells, pests, diseases) from pre-sowing to post-harvest.',
    benefits: 'Comprehensive crop loss financial compensation with minimal premium rate (1.5% for Rabi, 2.0% for Kharif).',
    application_url: 'https://pmfby.gov.in',
    documents_required: ['Aadhaar Card', 'Land Sowing Certificate / Revenue Record', 'Bank Account Passbook'],
    filter_rule: {
      crops: ['wheat', 'paddy', 'cotton', 'pulses', 'mustard', 'maize', 'soybean', 'sugarcane']
    }
  },
  {
    id: 'kcc-03',
    title: 'Kisan Credit Card (KCC) Scheme',
    short_name: 'Kisan Credit Card',
    ministry: 'Reserve Bank of India & NABARD',
    category_tag: 'Credit & Loan',
    description: 'Revolving credit facility providing farmers with timely and adequate credit support for cultivation requirements, post-harvest expenses, produce marketing, and maintenance of farm assets.',
    benefits: 'Low-interest credit up to ₹3 Lakhs at effective interest rate of 4% per annum with prompt repayment incentive.',
    application_url: 'https://myscheme.gov.in/schemes/kcc',
    documents_required: ['Land document with clear title', 'Aadhaar Card', 'Electricity bill (if grid connected)', 'Bank account details'],
    filter_rule: {
      land_min_ha: 0.5,
      land_max_ha: 10.0
    }
  },
  {
    id: 'pkvy-05',
    title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    short_name: 'PKVY Organic Farming',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category_tag: 'Organic & Tech',
    description: 'Promotes cluster-based organic farming, vermicomposting, soil fertility enhancement, and PGS organic certification. Financial assistance of Rs 50,000 per hectare is provided over 3 years, of which Rs 31,000 is directly transferred for organic inputs like bio-fertilizers and seeds.',
    benefits: '₹50,000 per hectare grant for organic inputs, soil health, certification, and marketing clusters.',
    application_url: 'https://pgsindia-ncof.gov.in',
    documents_required: ['Farmer group / cluster registration', 'Land ownership details', 'Aadhaar Card', 'Bank account details'],
    filter_rule: {
      crops: ['wheat', 'paddy', 'pulses', 'spices', 'vegetables', 'fruits', 'mustard']
    }
  },
  {
    id: 'soil-health-card-06',
    title: 'Soil Health Card Scheme',
    short_name: 'Soil Health Card',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category_tag: 'Input Subsidy',
    description: 'Issues customized soil health cards containing crop-wise recommendations of nutrients and fertilizers required for individual farm plots. Helps farmers optimize fertilizer usage, improve crop yield, and reduce input costs.',
    benefits: 'Free soil testing & tailored fertilizer recommendation card every 2 years.',
    application_url: 'https://soilhealth.dac.gov.in',
    documents_required: ['Land Khasra/Khatauni number', 'Aadhaar Card', 'Mobile number'],
    filter_rule: {}
  },
  {
    id: 'smam-07',
    title: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    short_name: 'Agricultural Machinery Subsidy',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category_tag: 'Infrastructure',
    description: 'Offers 40% to 50% capital subsidy on farm machinery and equipment including tractors, rotavators, power tillers, seed drills, and harvesters. Special 50% subsidy rate for SC, ST, women farmers, and small/marginal landholders.',
    benefits: '40% - 50% subsidy on purchase of tractors and modern agricultural machinery.',
    application_url: 'https://agrimachinery.nic.in',
    documents_required: ['Aadhaar Card', 'Land ownership 7/12 extract', 'Category Certificate (for SC/ST benefit)', 'Bank Passbook'],
    filter_rule: {
      eligible_categories: ['SC', 'ST', 'OBC', 'General', 'Minority']
    }
  },
  {
    id: 'rythu-bandhu-08',
    title: 'Rythu Bandhu Scheme (Telangana State)',
    short_name: 'Rythu Bandhu Investment Support',
    ministry: 'Department of Agriculture, Govt of Telangana',
    category_tag: 'Direct Benefit',
    description: 'State investment support scheme giving ₹10,000 per acre per year (₹5,000 per crop season) directly to title-holder farmers in Telangana to purchase seed, fertilizer, pesticide, and field labor.',
    benefits: '₹10,000 per acre per year direct deposit.',
    application_url: 'https://rythubandhu.telangana.gov.in',
    documents_required: ['Pattadar Passbook', 'Aadhaar Card', 'Telangana Bank Account'],
    filter_rule: {
      states: ['Telangana']
    }
  },
  {
    id: 'pm-ksy-09',
    title: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY - Micro Irrigation)',
    short_name: 'PMKSY Drip & Sprinkler',
    ministry: 'Ministry of Agriculture & Jal Shakti',
    category_tag: 'Infrastructure',
    description: 'Financial assistance of 45% to 55% for installing drip and sprinkler micro-irrigation systems. Focuses on "Per Drop More Crop" to maximize water use efficiency, save ground water, and boost crop productivity.',
    benefits: '45% to 55% subsidy on drip and sprinkler irrigation installations.',
    application_url: 'https://pmksy.gov.in',
    documents_required: ['Land documents', 'Aadhaar Card', 'Water source availability certificate', 'Bank passbook'],
    filter_rule: {
      crops: ['sugarcane', 'cotton', 'fruits', 'vegetables', 'spices', 'pulses', 'maize']
    }
  },
  {
    id: 'enam-10',
    title: 'e-NAM (National Agriculture Market) Portal',
    short_name: 'e-NAM Trading Platform',
    ministry: 'Small Farmers Agribusiness Consortium (SFAC)',
    category_tag: 'Organic & Tech',
    description: 'Pan-India electronic trading portal networking existing APMC mandis to create a unified national market for agricultural commodities. Enables farmers to get transparent price discovery, competitive bids from buyers nationwide, and online payment directly to bank accounts.',
    benefits: 'Direct access to buyers across India, eliminating middlemen commission fees.',
    application_url: 'https://enam.gov.in',
    documents_required: ['Aadhaar Card', 'Bank Account details', 'APMC Mandi registration (if any)'],
    filter_rule: {}
  },
  {
    id: 'punjab-wheat-subsidy-11',
    title: 'Punjab Wheat Seed & Straw Management Subsidy',
    short_name: 'Punjab Crop Residue Scheme',
    ministry: 'Department of Agriculture, Govt of Punjab',
    category_tag: 'Input Subsidy',
    description: 'State initiative for Punjab wheat and paddy growers providing 50% to 80% subsidy on Happy Seeder, Super Seeder, and Paddy Straw Choppers for stubble-free in-situ crop residue management.',
    benefits: '50% to 80% direct subsidy on crop residue management machines and certified wheat seeds.',
    application_url: 'https://agri.punjab.gov.in',
    documents_required: ['Punjab Land Records (Jamabandi)', 'Aadhaar Card', 'Bank Passbook'],
    filter_rule: {
      states: ['Punjab'],
      crops: ['wheat', 'paddy']
    }
  },
  {
    id: 'maharashtra-drip-subsidy-12',
    title: 'Maharashtra Chief Minister Agriculture Solar & Drip Scheme',
    short_name: 'Maharashtra Agri Solar & Drip',
    ministry: 'Department of Agriculture, Maharashtra',
    category_tag: 'Infrastructure',
    description: 'Special scheme for Maharashtra cotton, sugarcane, and fruit growers offering 80% subsidy on micro-irrigation drip sets and priority solar agricultural pump allocation.',
    benefits: 'Up to 80% subsidy on drip irrigation and solar power connections.',
    application_url: 'https://krishi.maharashtra.gov.in',
    documents_required: ['7/12 Extract & 8A Extract', 'Aadhaar Card', 'Caste Certificate (for SC/ST extra 10% subsidy)'],
    filter_rule: {
      states: ['Maharashtra'],
      crops: ['cotton', 'sugarcane', 'fruits', 'soybean', 'pulses', 'vegetables']
    }
  },
  {
    id: 'sc-st-kisan-empowerment-13',
    title: 'National SC/ST Hub Agricultural Input & Mechanization Support',
    short_name: 'SC/ST Kisan Support',
    ministry: 'Ministry of Social Justice & Agriculture',
    category_tag: 'Input Subsidy',
    description: 'Special financial assistance and 70% input subsidy for SC and ST smallholder farmers purchasing high-yielding certified seeds, organic bio-fertilizers, solar lanterns, and small farm implements.',
    benefits: '70% subsidy on seed kits, organic fertilizers, and small agricultural implements.',
    application_url: 'https://myscheme.gov.in/schemes/sc-st-kisan',
    documents_required: ['SC / ST Caste Certificate', 'Aadhaar Card', 'Land document / Revenue Record'],
    filter_rule: {
      eligible_categories: ['SC', 'ST']
    }
  },
  {
    id: 'up-sugarcane-development-14',
    title: 'Uttar Pradesh Sugarcane & Paddy Yield Booster Scheme',
    short_name: 'UP Sugarcane & Rice Scheme',
    ministry: 'Cane Development Department, Govt of Uttar Pradesh',
    category_tag: 'Input Subsidy',
    description: 'State financial incentive for Uttar Pradesh sugarcane and paddy farmers offering subsidized tissue culture plantlets, micro-nutrients, and assured mill procurement tokens.',
    benefits: 'Subsidized seed plantlets, micro-nutrient kits, and priority mill supply slips.',
    application_url: 'https://upcane.gov.in',
    documents_required: ['UP Cane Ganna Identity Card', 'Aadhaar Card', 'Land Khatauni'],
    filter_rule: {
      states: ['Uttar Pradesh'],
      crops: ['sugarcane', 'paddy']
    }
  },
  {
    id: 'nfsm-pulses-15',
    title: 'National Food Security Mission (NFSM - Pulses & Oilseeds)',
    short_name: 'NFSM Pulses & Oilseeds',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category_tag: 'Input Subsidy',
    description: 'Centrally sponsored scheme focused on boosting production of pulses (gram, tur, urad) and oilseeds (mustard, soybean). Provides free minikits of high-yielding seed varieties, plant protection chemicals, and rhizobium culture.',
    benefits: 'Free seed minikits and 50% subsidy on plant protection chemicals and bio-pesticides.',
    application_url: 'https://nfsm.gov.in',
    documents_required: ['Aadhaar Card', 'Land detail', 'Bank passbook'],
    filter_rule: {
      crops: ['pulses', 'mustard', 'soybean']
    }
  }
];

export const CURATED_SCHEMES: Scheme[] = [
  ...BASE_CURATED_SCHEMES,
  ...SCRAPED_SCHEMES
];
