export type LanguageCode = 'en' | 'hi' | 'mr' | 'te' | 'ta' | 'kn' | 'ml' | 'gu' | 'bn' | 'pa';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
];

export interface TranslationSchema {
  nav: {
    browseSchemes: string;
    checkEligibility: string;
    myResults?: string;
    signIn: string;
    admin: string;
    signOut: string;
  };
  hero: {
    headingPart1: string;
    headingHighlight: string;
    description: string;
    selectState: string;
    searchSchemes: string;
    modalTitle: string;
    searchStatePlaceholder: string;
    noStateFound: string;
    clickMapToSelect: string;
    clickAnyStateHint: string;
  };
  form: {
    steps: {
      step1: string;
      step2: string;
      step3: string;
      step4: string;
      stepOf: string;
    };
    banners: {
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      step4Title: string;
      step4Desc: string;
    };
    labels: {
      state: string;
      selectStatePlaceholder: string;
      district: string;
      districtPlaceholder: string;
      taluka: string;
      talukaPlaceholder: string;
      pincode: string;
      pincodePlaceholder: string;
      khasra: string;
      khasraPlaceholder: string;
      khasraHint: string;

      landArea: string;
      ha: string;
      acres: string;
      bigha: string;
      equivalent: string;
      smallMarginalEligible: string;
      largeEligible: string;
      landHint: string;

      ownershipType: string;
      ownerFarmer: string;
      tenantFarmer: string;
      leasedLand: string;
      forestLand: string;

      waterSource: string;
      rainfed: string;
      canal: string;
      drip: string;
      solar: string;

      primaryCrop: string;
      selectCropPlaceholder: string;
      annualIncome: string;
      incomeBelow1L: string;
      income1to25L: string;
      income25to5L: string;
      incomeAbove5L: string;

      farmingSeason: string;
      kharif: string;
      rabi: string;
      zaid: string;
      wholeYear: string;

      farmingMethod: string;
      conventional: string;
      organic: string;
      natural: string;
      polyhouse: string;

      farmerName: string;
      farmerNamePlaceholder: string;
      mobile: string;
      mobilePlaceholder: string;
      aadhaar: string;
      aadhaarPlaceholder: string;
      socialCategory: string;
      selectCategoryPlaceholder: string;
      categoryHint: string;

      specialCategory: string;
      smallMarginal: string;
      womenFarmer: string;
      divyang: string;
      exServiceman: string;
    };
    buttons: {
      prevStep: string;
      nextStep: string;
      resetForm: string;
      autoFill: string;
      autofilledSuccess: string;
      findSchemes: string;
      searching: string;
    };
  };
  results: {
    matchingSchemesTitle: string;
    matchedSubsidiesFound: string;
    allCategories: string;
    eligibleOnly: string;
    matchScore: string;
    viewDetails: string;
    applyNow: string;
    exclusionReason: string;
    noMatchesTitle: string;
    noMatchesDesc: string;
    adjustProfile: string;
    transparencyTitle: string;
    transparencyDesc: string;
    relevance: string;
    viewDetailsApply: string;
    whyExcluded: string;
    profileKeywordsMatched: string;
    additionalKeywords: string;
    showTop10: string;
    showAll: string;
  };
  browse: {
    browseTitle: string;
    searchPlaceholder: string;
    allStates: string;
    allCategories: string;
    allCrops: string;
    clearFilters: string;
    selectCategoryBegin: string;
    backToCategories: string;
    allSchemes: string;
    schemesAvailable: string;
    showingSchemes: string;
    of: string;
    resetFilters: string;
    checkEligibility: string;
    viewDetails: string;
    keyBenefit: string;
    show12More: string;
    displayedSchemes: string;
    remaining: string;
    noMatchingTitle: string;
    noMatchingDesc: string;
    resetAndShowAll: string;
    categories: {
      dbtTag: string;
      dbtTitle: string;
      dbtDesc: string;
      insuranceTag: string;
      insuranceTitle: string;
      insuranceDesc: string;
      loansTag: string;
      loansTitle: string;
      loansDesc: string;
      inputsTag: string;
      inputsTitle: string;
      inputsDesc: string;
      infrastructureTag: string;
      infrastructureTitle: string;
      infrastructureDesc: string;
      organicTag: string;
      organicTitle: string;
      organicDesc: string;
      allTag: string;
      allTitle: string;
      allDesc: string;
      viewSchemes: string;
      schemesCount: string;
    };
  };
  modal: {
    profileEligible: string;
    hardFilterPassed: string;
    profileExcluded: string;
    failedRules: string;
    finalScore: string;
    reasonForExclusion: string;
    descriptionAndGuidelines: string;
    financialBenefit: string;
    documentChecklist: string;
    keywordAnalysis: string;
    matchedKeywords: string;
    schemeKeywords: string;
    noKeywordOverlap: string;
    close: string;
    applyOfficial: string;
  };
  auth: {
    titleSignIn: string;
    titleRegister: string;
    subtitle: string;
    username: string;
    usernamePlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    fullName: string;
    fullNamePlaceholder: string;
    accountRole: string;
    farmerUser: string;
    administrator: string;
    btnSignIn: string;
    btnRegister: string;
    dontHaveAccount: string;
    createAccountLink: string;
    alreadyHaveAccount: string;
    signInLink: string;
    hidePassword: string;
    showPassword: string;
  };
  admin: {
    consoleTitle: string;
    headerTitle: string;
    headerDesc: string;
    successIngested: string;
    fullTitleLabel: string;
    fullTitlePlaceholder: string;
    ministryLabel: string;
    ministryPlaceholder: string;
    rawDescLabel: string;
    rawDescPlaceholder: string;
    benefitSummaryLabel: string;
    benefitSummaryPlaceholder: string;
    urlLabel: string;
    rulesHeader: string;
    statesLabel: string;
    cropsLabel: string;
    minLandLabel: string;
    maxLandLabel: string;
    minLandPlaceholder: string;
    maxLandPlaceholder: string;
    submitBtn: string;
    sessionTitle: string;
    sessionSub: string;
    bearerToken: string;
  };
  notFound: {
    badge: string;
    title: string;
    desc: string;
    returnHome: string;
    checkEligible: string;
  };
  footer: {
    tagline: string;
    meta: string;
  };
}

const defaultEnForm: TranslationSchema['form'] = {
  steps: {
    step1: 'Location & Records',
    step2: 'Land & Water',
    step3: 'Crops & Farming',
    step4: 'Farmer Profile',
    stepOf: 'of 4'
  },
  banners: {
    step1Title: 'Farm Location & Land Record',
    step1Desc: 'Required for state Bhulekh land title verification.',
    step2Title: 'Land Area & Irrigation Source',
    step2Desc: 'Used to calculate Small & Marginal Farmer subsidy quotas.',
    step3Title: 'Crops & Farming Season',
    step3Desc: 'Matches crop insurance and seed input grants.',
    step4Title: 'Farmer Profile & Quota Benefits',
    step4Desc: 'Unlocks 10-25% bonus subsidy allocations for eligible categories.'
  },
  labels: {
    state: 'State / Union Territory *',
    selectStatePlaceholder: 'Select State...',
    district: 'District *',
    districtPlaceholder: 'e.g. Nashik, Ludhiana, Pune, Guntur',
    taluka: 'Tehsil / Taluka / Block (Optional)',
    talukaPlaceholder: 'e.g. Niphad, Jagraon, Haveli',
    pincode: 'PIN Code (6 Digits) *',
    pincodePlaceholder: 'e.g. 422303',
    khasra: 'Khasra / 7-12 / Survey / Dag Number *',
    khasraPlaceholder: 'e.g. Survey 108/A, Khasra 402, 7/12 Khatauni',
    khasraHint: 'Found on your land passbook or state Bhulekh portal.',

    landArea: 'Total Cultivated Land Area *',
    ha: 'Hectares (ha)',
    acres: 'Acres',
    bigha: 'Bigha',
    equivalent: 'Equivalent:',
    smallMarginalEligible: 'Qualifies for Small & Marginal Subsidy (Up to 2.0 Ha)',
    largeEligible: 'Qualifies for Infrastructure Grant (> 2.0 Ha)',
    landHint: 'Small & Marginal farmers (under 2.0 Ha / ~4.9 Acres) get highest subsidy priority.',

    ownershipType: 'Land Ownership Type',
    ownerFarmer: 'Owner / Self-Titled (7/12)',
    tenantFarmer: 'Bataidar / Sharecropper',
    leasedLand: 'Leased Farmland',
    forestLand: 'Forest Rights (FRA) Patta',

    waterSource: 'Primary Irrigation Source',
    rainfed: 'Rainfed (Monsoon)',
    canal: 'Canal / Borewell',
    drip: 'Drip / Micro-Irrigation',
    solar: 'Solar Pump (KUSUM)',

    primaryCrop: 'Primary Cultivation Crop *',
    selectCropPlaceholder: 'Select Crop...',
    annualIncome: 'Annual Family Income',
    incomeBelow1L: 'Below ₹1 Lakh (Highest Priority)',
    income1to25L: '₹1 Lakh - ₹2.5 Lakhs',
    income25to5L: '₹2.5 Lakhs - ₹5 Lakhs',
    incomeAbove5L: 'Above ₹5 Lakhs',

    farmingSeason: 'Primary Season',
    kharif: 'Kharif (Monsoon: Jun–Oct)',
    rabi: 'Rabi (Winter: Nov–Apr)',
    zaid: 'Zaid (Summer: Apr–Jun)',
    wholeYear: 'Year-Round / Perennial',

    farmingMethod: 'Farming Practice',
    conventional: 'Conventional Farming',
    organic: 'Certified Organic (PKVY)',
    natural: 'Natural Farming (ZBNF)',
    polyhouse: 'Protected / Polyhouse',

    farmerName: 'Farmer Full Name (as per Land Record)',
    farmerNamePlaceholder: 'e.g. Ramesh Kumar Patil',
    mobile: 'Mobile Number (for SMS updates)',
    mobilePlaceholder: 'e.g. 9876543210',
    aadhaar: 'Aadhaar (Last 4 Digits - Optional)',
    aadhaarPlaceholder: 'e.g. 8492',
    socialCategory: 'Social Category *',
    selectCategoryPlaceholder: 'Select Category...',
    categoryHint: 'Used for reserved subsidy quotas.',

    specialCategory: 'Special Beneficiary Quota',
    smallMarginal: 'Small & Marginal Farmer (Up to 2 Ha)',
    womenFarmer: 'Women Farmer',
    divyang: 'Differently Abled (Divyang)',
    exServiceman: 'Ex-Serviceman / Defense'
  },
  buttons: {
    prevStep: 'Back',
    nextStep: 'Next Step',
    resetForm: 'Reset Form',
    autoFill: 'Autofill Form',
    autofilledSuccess: 'Form Filled! ✨',
    findSchemes: 'Find Eligible Subsidies & Schemes',
    searching: 'Searching 45+ Govt Schemes...'
  }
};

const defaultEnResults: TranslationSchema['results'] = {
  matchingSchemesTitle: 'Eligible Schemes & Subsidies Matched',
  matchedSubsidiesFound: 'Government Subsidies Found for Your Profile',
  allCategories: 'All Categories',
  eligibleOnly: 'Eligible Schemes Only',
  matchScore: 'Match Confidence',
  viewDetails: 'View Details',
  applyNow: 'Apply Now',
  exclusionReason: 'Why Excluded',
  noMatchesTitle: 'No Exact Matches Found Yet',
  noMatchesDesc: 'No schemes matched your exact criteria for state and land size. Try adjusting your profile or explore national schemes!',
  adjustProfile: 'Adjust Farmer Profile',
  transparencyTitle: 'Transparency Guarantee:',
  transparencyDesc: 'These schemes failed one or more hard eligibility rules (state, crop, land size, or category). They are ranked by TF-IDF similarity so you can see schemes you almost qualify for.',
  relevance: 'Relevance:',
  viewDetailsApply: 'View Details & Apply',
  whyExcluded: 'Why Excluded (Hard Rule Criteria Failed):',
  profileKeywordsMatched: 'Profile Keywords Matched:',
  additionalKeywords: 'Additional Scheme Keywords:',
  showTop10: 'Show Top 10 Only',
  showAll: 'Show All Schemes'
};

const defaultEnBrowse: TranslationSchema['browse'] = {
  browseTitle: 'Browse Government Schemes & Subsidies',
  searchPlaceholder: 'Search schemes by keyword, crop, or ministry…',
  allStates: 'All States',
  allCategories: 'All Categories',
  allCrops: 'All Crops',
  clearFilters: 'Clear Filters',
  selectCategoryBegin: 'Select a Scheme Category to Begin',
  backToCategories: 'Back to Categories',
  allSchemes: 'All Schemes',
  schemesAvailable: 'Schemes Available',
  showingSchemes: 'Showing',
  of: 'of',
  resetFilters: 'Reset filters',
  checkEligibility: 'Check Eligibility',
  viewDetails: 'View Details',
  keyBenefit: 'Key Benefit:',
  show12More: 'Show 12 More Schemes',
  displayedSchemes: 'Displayed',
  remaining: 'remaining',
  noMatchingTitle: 'No Matching Schemes Found',
  noMatchingDesc: 'No schemes match your current filters. Try broadening the state, crop, or category search.',
  resetAndShowAll: 'Reset Filters & Show All',
  categories: {
    dbtTag: 'Direct Benefit',
    dbtTitle: 'Direct Benefit Transfer (DBT)',
    dbtDesc: 'Direct cash assistance transferred straight into your bank account (e.g. PM-KISAN, Rythu Bandhu).',
    insuranceTag: 'Crop Insurance',
    insuranceTitle: 'Crop Insurance & Loss Claims',
    insuranceDesc: 'Financial compensation for crop damage caused by drought, heavy rainfall, flood, or pests.',
    loansTag: 'Credit & Loan',
    loansTitle: 'Kisan Credit Card & Farm Loans',
    loansDesc: 'Low-interest bank loans, short-term crop credit, interest subvention, and debt relief.',
    inputsTag: 'Input Subsidy',
    inputsTitle: 'Tractor, Tools & Input Subsidies',
    inputsDesc: 'Subsidies for purchasing tractors, implements, power tillers, seeds & fertilizers.',
    infrastructureTag: 'Infrastructure',
    infrastructureTitle: 'Solar Pumps & Irrigation',
    infrastructureDesc: 'Subsidies for PM-KUSUM solar pumps, tube-well electrification, drip and sprinkler setups.',
    organicTag: 'Organic & Tech',
    organicTitle: 'Organic Farming & Soil Health',
    organicDesc: 'Free soil testing health cards, organic farming certification incentives, and modern bio-inputs.',
    allTag: 'All',
    allTitle: 'All Government Schemes',
    allDesc: 'Browse the entire directory of national and state agricultural support programs with search and filters.',
    viewSchemes: 'View Schemes',
    schemesCount: 'Schemes'
  }
};

const defaultEnModal: TranslationSchema['modal'] = {
  profileEligible: 'Profile Eligible for Scheme',
  hardFilterPassed: 'Hard-rule filters passed. TF-IDF Cosine Similarity:',
  profileExcluded: 'Profile Excluded from Scheme',
  failedRules: 'Failed hard filter rule(s).',
  finalScore: 'Final Score',
  reasonForExclusion: 'Reason for Exclusion:',
  descriptionAndGuidelines: 'Scheme Description & Guidelines',
  financialBenefit: 'Financial Benefit & Subsidy Package',
  documentChecklist: 'Required Document Checklist',
  keywordAnalysis: 'Relevance Keyword Analysis',
  matchedKeywords: 'Matched Profile Keywords',
  schemeKeywords: 'Top Scheme Feature Keywords',
  noKeywordOverlap: 'No direct keyword overlap',
  close: 'Close',
  applyOfficial: 'Apply on Official Portal'
};

const defaultEnAuth: TranslationSchema['auth'] = {
  titleSignIn: 'Sign in',
  titleRegister: 'Create account',
  subtitle: 'to continue to Krishi Match Platform',
  username: 'Username',
  usernamePlaceholder: 'e.g. admin or farmer',
  password: 'Password',
  passwordPlaceholder: 'Enter your password',
  fullName: 'Full name',
  fullNamePlaceholder: 'Rajesh Kumar',
  accountRole: 'Account role',
  farmerUser: 'Farmer User',
  administrator: 'Administrator',
  btnSignIn: 'Sign in',
  btnRegister: 'Create account',
  dontHaveAccount: "Don't have an account?",
  createAccountLink: 'Create account',
  alreadyHaveAccount: 'Already have an account?',
  signInLink: 'Sign in',
  hidePassword: 'Hide password',
  showPassword: 'Show password'
};

const defaultEnAdmin: TranslationSchema['admin'] = {
  consoleTitle: 'Admin Data Operator Console',
  headerTitle: 'Paste Plain Text Scheme Ingestion',
  headerDesc: 'Paste official government scheme description text below. The system automatically creates TF-IDF unigram indices and links structured hard-filter criteria into the scheme corpus.',
  successIngested: 'Scheme successfully ingested into Corpus! Real-time TF-IDF vectors updated.',
  fullTitleLabel: 'Scheme Full Title *',
  fullTitlePlaceholder: 'e.g. Chief Minister Krishi Solar Pump Subsidy Scheme',
  ministryLabel: 'Ministry / Department',
  ministryPlaceholder: 'e.g. Ministry of Agriculture & Farmers Welfare',
  rawDescLabel: 'Raw Scheme Description Text (TF-IDF Vector Corpus) *',
  rawDescPlaceholder: 'Paste plain text scheme description from official notification...',
  benefitSummaryLabel: 'Key Benefit Summary',
  benefitSummaryPlaceholder: 'e.g. ₹50,000 subsidy per hectare over 3 years',
  urlLabel: 'Official Application Portal URL',
  rulesHeader: 'Structured Hard-Rule Eligibility Constraints',
  statesLabel: 'Applicable States (Leave empty for All India / National):',
  cropsLabel: 'Target Crops (Leave empty for All Crops):',
  minLandLabel: 'Min Land Size (ha):',
  maxLandLabel: 'Max Land Size (ha):',
  minLandPlaceholder: 'e.g. 0.5',
  maxLandPlaceholder: 'e.g. 2.0',
  submitBtn: 'Persist Scheme & Re-Index TF-IDF Corpus',
  sessionTitle: 'Verified JWT Admin Session',
  sessionSub: 'Signed in as',
  bearerToken: 'Bearer Token:'
};

const defaultEnNotFound: TranslationSchema['notFound'] = {
  badge: 'Error 404 — Page Not Found',
  title: 'Wandered Off the Farm Road?',
  desc: "The page or section you are looking for doesn't exist or has moved. Let's get you back on track to finding your eligible government schemes!",
  returnHome: 'Return Home',
  checkEligible: 'Check Eligible Schemes'
};

export const translations: Record<LanguageCode, TranslationSchema> = {
  en: {
    nav: {
      browseSchemes: 'Browse Schemes',
      checkEligibility: 'Check Eligibility',
      signIn: 'Sign In',
      admin: 'Admin',
      signOut: 'Sign out'
    },
    hero: {
      headingPart1: 'Get the government support ',
      headingHighlight: 'your farm deserves.',
      description: 'Discover and claim state & central subsidies for seeds, machinery, solar pumps, and crop insurance.',
      selectState: 'Select state...',
      searchSchemes: 'Search Schemes',
      modalTitle: 'Select State',
      searchStatePlaceholder: 'Search state...',
      noStateFound: 'No state matching',
      clickMapToSelect: '(Click map to select)',
      clickAnyStateHint: 'Click any state on the map to select'
    },
    form: defaultEnForm,
    results: defaultEnResults,
    browse: defaultEnBrowse,
    modal: defaultEnModal,
    auth: defaultEnAuth,
    admin: defaultEnAdmin,
    notFound: defaultEnNotFound,
    footer: {
      tagline: 'Farmer-to-Scheme Eligibility Matcher • Built for Tech-a-Thon 2026. Empowering small & marginal Indian farmers with transparent scheme matching.',
      meta: 'TF-IDF + Hard-Filter Pure Python/TS Engine'
    }
  },

  hi: {
    nav: {
      browseSchemes: 'योजनाएं देखें',
      checkEligibility: 'पात्रता जांचें',
      signIn: 'साइन इन करें',
      admin: 'एडमिन',
      signOut: 'साइन आउट'
    },
    hero: {
      headingPart1: 'अपने खेत के लिए मिलने वाली ',
      headingHighlight: 'सरकारी सहायता प्राप्त करें।',
      description: 'बीज, मशीनरी, सोलर पंप और फसल बीमा के लिए सब्सिडी प्राप्त करें।',
      selectState: 'राज्य चुनें...',
      searchSchemes: 'योजनाएं खोजें',
      modalTitle: 'राज्य चुनें',
      searchStatePlaceholder: 'राज्य खोजें...',
      noStateFound: 'कोई राज्य नहीं मिला',
      clickMapToSelect: '(चुनाने के लिए मानचित्र पर क्लिक करें)',
      clickAnyStateHint: 'मानचित्र पर किसी भी राज्य पर क्लिक करें'
    },
    form: {
      steps: {
        step1: 'स्थान व भूमि रिकॉर्ड',
        step2: 'भूमि व सिंचाई',
        step3: 'फसल व मौसम',
        step4: 'किसान प्रोफ़ाइल',
        stepOf: 'का'
      },
      banners: {
        step1Title: 'खेत का स्थान व भू-अभिलेख',
        step1Desc: 'भूलेख रिकॉर्ड सत्यापन हेतु आवश्यक।',
        step2Title: 'भूमि क्षेत्रफल व जल स्रोत',
        step2Desc: 'लघु किसान सब्सिडी कोटा निर्धारित करने हेतु।',
        step3Title: 'फसल व कृषि मौसम',
        step3Desc: 'फसल बीमा व बीज अनुदान हेतु।',
        step4Title: 'किसान वर्ग व बोनस कोटा',
        step4Desc: 'महिला, लघु किसान व एससी/एसटी हेतु 10-25% अतिरिक्त सब्सिडी।'
      },
      labels: {
        state: 'राज्य / केंद्र शासित प्रदेश *',
        selectStatePlaceholder: 'राज्य चुनें...',
        district: 'जिला *',
        districtPlaceholder: 'उदा. नासिक, लुधियाना, पुणे',
        taluka: 'तहसील / ब्लॉक (वैकल्पिक)',
        talukaPlaceholder: 'उदा. निफाड़, जगरांव',
        pincode: 'पिन कोड (6 अंक) *',
        pincodePlaceholder: 'उदा. 422303',
        khasra: 'खसरा / 7-12 / खतौनी नंबर *',
        khasraPlaceholder: 'उदा. खसरा 402, 7/12 खाता',
        khasraHint: 'भू-अभिलेख या पासबुक पर उपलब्ध।',

        landArea: 'कुल कृषि भूमि क्षेत्रफल *',
        ha: 'हेक्टेयर (ha)',
        acres: 'एकड़',
        bigha: 'बीघा',
        equivalent: 'बराबर:',
        smallMarginalEligible: 'लघु व सीमांत किसान सब्सिडी हेतु पात्र (2.0 हेक्टेयर तक)',
        largeEligible: 'व्यावसायिक कृषि अनुदान हेतु पात्र (> 2.0 हेक्टेयर)',
        landHint: 'लघु व सीमांत किसानों को सर्वोच्च सब्सिडी प्राथमिकता।',

        ownershipType: 'भूमि स्वामित्व प्रकार',
        ownerFarmer: 'खुद की जमीन (7-12 / खतौनी)',
        tenantFarmer: 'बटाईदार / शेयरक्रॉपर',
        leasedLand: 'लीज पर ली जमीन',
        forestLand: 'वन अधिकार (FRA) पट्टा',

        waterSource: 'सिंचाई का मुख्य स्रोत',
        rainfed: 'असिंचित (बारिश पर निर्भर)',
        canal: 'नहर / बोरवेल',
        drip: 'ड्रिप / स्प्रिंकलर',
        solar: 'सोलर पंप (कुसुम)',

        primaryCrop: 'मुख्य फसल *',
        selectCropPlaceholder: 'फसल चुनें...',
        annualIncome: 'वार्षिक पारिवारिक आय',
        incomeBelow1L: '₹1 लाख से कम (सर्वोच्च प्राथमिकता)',
        income1to25L: '₹1 लाख - ₹2.5 लाख',
        income25to5L: '₹2.5 लाख - ₹5 लाख',
        incomeAbove5L: '₹5 लाख से अधिक',

        farmingSeason: 'मुख्य मौसम',
        kharif: 'खरीफ (मानसून: जून-अक्टूबर)',
        rabi: 'रबी (सर्दियां: नवंबर-अप्रैल)',
        zaid: 'जायद (गर्मी: अप्रैल-जून)',
        wholeYear: 'बारहमासी / पूरे वर्ष',

        farmingMethod: 'कृषि पद्धति',
        conventional: 'पारंपरिक खेती',
        organic: 'जैविक खेती (PKVY)',
        natural: 'प्राकृतिक खेती (ZBNF)',
        polyhouse: 'पॉलीहाउस / ग्रीनहाउस',

        farmerName: 'किसान का नाम (भूमि दस्तावेज अनुसार)',
        farmerNamePlaceholder: 'उदा. रमेश कुमार',
        mobile: 'मोबाइल नंबर',
        mobilePlaceholder: 'उदा. 9876543210',
        aadhaar: 'आधार नंबर (अंतिम 4 अंक)',
        aadhaarPlaceholder: 'उदा. 8492',
        socialCategory: 'सामाजिक वर्ग *',
        selectCategoryPlaceholder: 'वर्ग चुनें...',
        categoryHint: 'आरक्षित सब्सिडी कोटा हेतु।',

        specialCategory: 'विशेष सब्सिडी कोटा',
        smallMarginal: 'लघु एवं सीमांत किसान (2 हेक्टेयर तक)',
        womenFarmer: 'महिला किसान',
        divyang: 'दिव्यांग किसान',
        exServiceman: 'पूर्व सैनिक कोटा'
      },
      buttons: {
        prevStep: 'पीछे',
        nextStep: 'आगे बढ़ें',
        resetForm: 'रीसेट करें',
        autoFill: 'ऑटो-फिल फॉर्म',
        autofilledSuccess: 'फॉर्म भरा गया! ✨',
        findSchemes: 'पात्र योजनाएं खोजें',
        searching: '45+ योजनाएं खोजी जा रही हैं...'
      }
    },
    results: {
      ...defaultEnResults,
      matchingSchemesTitle: 'पात्र योजनाएं व सब्सिडी मैच',
      matchedSubsidiesFound: 'आपकी प्रोफाइल के लिए मिलीं सरकारी सब्सिडी',
      eligibleOnly: 'केवल पात्र योजनाएं',
      exclusionReason: 'अपात्रता का कारण',
      viewDetails: 'विवरण देखें',
      applyNow: 'आवेदन करें',
      relevance: 'प्रासंगिकता:',
      viewDetailsApply: 'विवरण देखें व आवेदन करें',
      whyExcluded: 'अपात्रता का कारण (नियम विफल):',
      profileKeywordsMatched: 'मैच हुए कीवर्ड:',
      additionalKeywords: 'अतिरिक्त योजना कीवर्ड:',
      showTop10: 'केवल शीर्ष 10 देखें',
      showAll: 'सभी योजनाएं देखें'
    },
    browse: {
      ...defaultEnBrowse,
      browseTitle: 'सरकारी कृषि योजनाएं व सब्सिडी देखें',
      searchPlaceholder: 'कीवर्ड, फसल या मंत्रालय द्वारा योजनाएं खोजें…',
      allStates: 'सभी राज्य',
      allCategories: 'सभी श्रेणियां',
      selectCategoryBegin: 'शुरू करने के लिए एक योजना श्रेणी चुनें',
      backToCategories: 'श्रेणियों पर वापस जाएं',
      allSchemes: 'सभी योजनाएं',
      schemesAvailable: 'उपलब्ध योजनाएं',
      showingSchemes: 'दिखाया जा रहा है',
      of: 'का',
      resetFilters: 'फ़िल्टर रीसेट करें',
      checkEligibility: 'पात्रता जांचें',
      viewDetails: 'विवरण देखें',
      keyBenefit: 'मुख्य लाभ:',
      show12More: '12 और योजनाएं देखें',
      displayedSchemes: 'प्रदर्शित',
      noMatchingTitle: 'कोई मेल खाती योजना नहीं मिली',
      resetAndShowAll: 'फ़िल्टर रीसेट करें व सभी देखें',
      categories: {
        ...defaultEnBrowse.categories,
        dbtTag: 'प्रत्यक्ष लाभ',
        dbtTitle: 'प्रत्यक्ष लाभ अंतरण (DBT)',
        dbtDesc: 'सीधे आपके बैंक खाते में नकद सहायता (जैसे पीएम-किसान, रायथु बंधु)।',
        insuranceTag: 'फसल बीमा',
        insuranceTitle: 'फसल बीमा व क्षति दावा',
        insuranceDesc: 'सूखा, भारी बारिश या बाढ़ से हुई फसल क्षति का मुआवजा।',
        loansTag: 'ऋण व क्रेडिट',
        loansTitle: 'किसान क्रेडिट कार्ड व कृषि ऋण',
        loansDesc: 'कम ब्याज दर पर बैंक ऋण, अल्पकालिक फसल ऋण और ब्याज छूट।',
        inputsTag: 'इनपुट सब्सिडी',
        inputsTitle: 'ट्रैक्टर, उपकरण व इनपुट सब्सिडी',
        inputsDesc: 'ट्रैक्टर, बीज और उर्वरक खरीदने पर मिलने वाली सब्सिडी।',
        infrastructureTag: 'अवसंरचना',
        infrastructureTitle: 'सोलर पंप व सिंचाई',
        infrastructureDesc: 'पीएम-कुसुम सोलर पंप और ड्रिप-स्प्रिंकलर के लिए अनुदान।',
        organicTag: 'जैविक व तकनीक',
        organicTitle: 'जैविक खेती व मृदा स्वास्थ्य',
        organicDesc: 'मुफ्त मृदा स्वास्थ्य कार्ड और जैविक खेती प्रोत्साहन।',
        allTag: 'सभी',
        allTitle: 'सभी सरकारी योजनाएं',
        allDesc: 'खोज और फ़िल्टर के साथ राष्ट्रीय और राज्य कृषि योजनाओं की निर्देशिका।',
        viewSchemes: 'योजनाएं देखें',
        schemesCount: 'योजनाएं'
      }
    },
    modal: {
      ...defaultEnModal,
      profileEligible: 'प्रोफाइल योजना हेतु पात्र है',
      hardFilterPassed: 'पात्रता नियम पास। TF-IDF समानता:',
      profileExcluded: 'प्रोफाइल योजना से अपात्र है',
      failedRules: 'नियम विफल।',
      finalScore: 'अंतिम स्कोर',
      reasonForExclusion: 'अपात्रता का कारण:',
      descriptionAndGuidelines: 'योजना विवरण व दिशा-निर्देश',
      financialBenefit: 'वित्तीय लाभ व सब्सिडी पैकेज',
      documentChecklist: 'आवश्यक दस्तावेज सूची',
      keywordAnalysis: 'कीवर्ड विश्लेषण',
      matchedKeywords: 'मैच हुए प्रोफाइल कीवर्ड',
      schemeKeywords: 'योजना के मुख्य कीवर्ड',
      close: 'बंद करें',
      applyOfficial: 'आधिकारिक पोर्टल पर आवेदन करें'
    },
    auth: {
      ...defaultEnAuth,
      titleSignIn: 'साइन इन करें',
      titleRegister: 'खाता बनाएं',
      subtitle: 'कृषि मैच प्लेटफॉर्म पर जारी रखने के लिए',
      username: 'उपयोगकर्ता नाम',
      password: 'पासवर्ड',
      fullName: 'पूरा नाम',
      accountRole: 'खाता भूमिका',
      farmerUser: 'किसान उपयोगकर्ता',
      administrator: 'प्रशासक',
      btnSignIn: 'साइन इन करें',
      btnRegister: 'खाता बनाएं',
      dontHaveAccount: 'खाता नहीं है?',
      createAccountLink: 'खाता बनाएं',
      alreadyHaveAccount: 'पहले से खाता है?',
      signInLink: 'साइन इन करें'
    },
    admin: {
      ...defaultEnAdmin,
      consoleTitle: 'एडमिन डेटा ऑपरेटर कंसोल',
      headerTitle: 'योजना विवरण प्रविष्ट करें',
      submitBtn: 'योजना सहेजें व टीएफ-आईडीएफ इंडेक्स अपडेट करें'
    },
    notFound: {
      ...defaultEnNotFound,
      badge: 'त्रुटि 404 — पृष्ठ नहीं मिला',
      title: 'मार्ग भटक गए?',
      desc: 'आप जिस पृष्ठ की तलाश कर रहे हैं वह मौजूद नहीं है। चलिए आपको वापस मुख्य धारा पर लाते हैं!',
      returnHome: 'होम पर लौटें',
      checkEligible: 'पात्र योजनाएं जांचें'
    },
    footer: {
      tagline: 'किसान-योजना पात्रता मैचर • टेक-अ-थॉन 2026 के लिए निर्मित।',
      meta: 'TF-IDF + हार्ड-फ़िल्टर प्यूर पायथन/टीएस इंजन'
    }
  },

  mr: {
    nav: {
      browseSchemes: 'योजना पहा',
      checkEligibility: 'पात्रता तपासा',
      signIn: 'साइन इन करा',
      admin: 'ॲडमिन',
      signOut: 'साइन आउट'
    },
    hero: {
      headingPart1: 'तुमच्या शेतासाठी मिळणारी ',
      headingHighlight: 'सरकारी मदत मिळवा.',
      description: 'बियाणे, यंत्रसामग्री, सौर पंप आणि पीक विमा योजना शोधा.',
      selectState: 'राज्य निवडा...',
      searchSchemes: 'योजना शोधा',
      modalTitle: 'राज्य निवडा',
      searchStatePlaceholder: 'राज्य शोधा...',
      noStateFound: 'कोणतेही राज्य सापडले नाही',
      clickMapToSelect: '(निवडण्यासाठी नकाशावर क्लिक करा)',
      clickAnyStateHint: 'नकाशावरील कोणत्याही राज्यावर क्लिक करा'
    },
    form: {
      steps: {
        step1: 'स्थान व 7/12 नोंदी',
        step2: 'जमीन व पाणी',
        step3: 'पिके व हंगाम',
        step4: 'शेतकरी प्रोफाइल',
        stepOf: 'पैकी'
      },
      banners: {
        step1Title: 'शेताचे स्थान व 7/12 नोंद',
        step1Desc: 'महाभूलेख नोंदी तपासण्यासाठी आवश्यक.',
        step2Title: 'शेतजमीन व सिंचन',
        step2Desc: 'अल्पभूधारक अनुदान कोटा तपासण्यासाठी.',
        step3Title: 'मुख्य पिके व हंगाम',
        step3Desc: 'पीक विमा व बियाणे अनुदान तपासण्यासाठी.',
        step4Title: 'शेतकरी वर्ग व सवलती',
        step4Desc: 'महिला व अल्पभूधारकांसाठी 10-25% अतिरिक्त अनुदान.'
      },
      labels: {
        state: 'राज्य / केंद्रशासित प्रदेश *',
        selectStatePlaceholder: 'राज्य निवडा...',
        district: 'जिल्हा *',
        districtPlaceholder: 'उदा. नाशिक, पुणे, कोल्हापूर',
        taluka: 'तालुका (ऐच्छिक)',
        talukaPlaceholder: 'उदा. निफाड, हवेली',
        pincode: 'पिन कोड (6 अंक) *',
        pincodePlaceholder: 'उदा. 422303',
        khasra: '7/12 / गट नंबर *',
        khasraPlaceholder: 'उदा. गट नंबर 108/अ, 7/12 नोंद',
        khasraHint: '7/12 उताऱ्यावर उपलब्ध.',

        landArea: 'एकूण शेतजमीन क्षेत्र *',
        ha: 'हेक्टर (ha)',
        acres: 'एकर',
        bigha: 'बिघा',
        equivalent: 'समान:',
        smallMarginalEligible: 'अल्पभूधारक अनुदानास पात्र (2 हेक्टरपर्यंत)',
        largeEligible: 'पायाभूत सुविधा अनुदानास पात्र (> 2 हेक्टर)',
        landHint: 'अल्पभूधारक शेतकऱ्यांना (2 हेक्टरपेक्षा कमी) प्रथम प्राधान्य.',

        ownershipType: 'मालकीचा प्रकार',
        ownerFarmer: 'स्वतःची जमीन (7/12 मालक)',
        tenantFarmer: 'बटईदार / कसतकरी',
        leasedLand: 'भाडेतत्त्वावरील जमीन',
        forestLand: 'वनहक्क (FRA) पट्टा',

        waterSource: 'सिंचन स्त्रोत',
        rainfed: 'जिरायती (पावसावर आधारित)',
        canal: 'कालवा / विहीर / कूपनलिका',
        drip: 'ठिबक / तुषार सिंचन',
        solar: 'सौर पंप (कुसुम)',

        primaryCrop: 'मुख्य पीक *',
        selectCropPlaceholder: 'पीक निवडा...',
        annualIncome: 'वार्षिक उत्पन्न',
        incomeBelow1L: '₹1 लाखापेक्षा कमी (प्रथम प्राधान्य)',
        income1to25L: '₹1 लाख - ₹2.5 लाख',
        income25to5L: '₹2.5 लाख - ₹5 लाख',
        incomeAbove5L: '₹5 लाखापेक्षा जास्त',

        farmingSeason: 'मुख्य हंगाम',
        kharif: 'खरीप (मानसून: जून-ऑक्टोबर)',
        rabi: 'रब्बी (हिवाळा: नोव्हेंबर-एप्रिल)',
        zaid: 'उन्हाळी (झायद: एप्रिल-जून)',
        wholeYear: 'बारमाही / वर्षभर',

        farmingMethod: 'शेती पद्धत',
        conventional: 'पारंपरिक शेती',
        organic: 'सेंद्रिय शेती (PKVY)',
        natural: 'नैसर्गिक शेती (ZBNF)',
        polyhouse: 'संरक्षित शेती / पॉलीहाउस',

        farmerName: 'शेतकऱ्याचे नाव (7/12 उताऱ्यानुसार)',
        farmerNamePlaceholder: 'उदा. रमेश पाटील',
        mobile: 'मोबाईल नंबर',
        mobilePlaceholder: 'उदा. 9876543210',
        aadhaar: 'आधार नंबर (शेवटचे 4 अंक)',
        aadhaarPlaceholder: 'उदा. 8492',
        socialCategory: 'सामाजिक वर्ग *',
        selectCategoryPlaceholder: 'वर्ग निवडा...',
        categoryHint: 'आरक्षित अनुदानासाठी.',

        specialCategory: 'विशेष सवलत वर्ग',
        smallMarginal: 'अल्पभूधारक शेतकरी (2 हेक्टरपर्यंत)',
        womenFarmer: 'महिला शेतकरी',
        divyang: 'दिव्यांग शेतकरी',
        exServiceman: 'माजी सैनिक कोटा'
      },
      buttons: {
        prevStep: 'मागे',
        nextStep: 'पुढे',
        resetForm: 'रीसेट',
        autoFill: 'ऑटो-फिल करा',
        autofilledSuccess: 'फॉर्म भरला! ✨',
        findSchemes: 'पात्र योजना शोधा',
        searching: 'योजना शोधत आहे...'
      }
    },
    results: {
      ...defaultEnResults,
      matchingSchemesTitle: 'पात्र योजना व अनुदान जुळणी',
      eligibleOnly: 'फक्त पात्र योजना',
      exclusionReason: 'अपात्रतेचे कारण',
      viewDetails: 'तपशील पहा',
      applyNow: 'अर्ज करा',
      relevance: 'प्रासंगिकता:',
      viewDetailsApply: 'तपशील पहा व अर्ज करा',
      whyExcluded: 'अपात्रतेचे कारण (अटी पूर्ण झाल्या नाहीत):',
      showTop10: 'फक्त पहिले 10 पहा',
      showAll: 'सर्व योजना पहा'
    },
    browse: {
      ...defaultEnBrowse,
      browseTitle: 'सरकारी कृषी योजना व अनुदान पहा',
      searchPlaceholder: 'योजना, पीक किंवा मंत्रालयानुसार शोधा…',
      allStates: 'सर्व राज्ये',
      allCategories: 'सर्व वर्ग',
      selectCategoryBegin: 'शुरू करण्यासाठी योजना वर्ग निवडा',
      backToCategories: 'मागे जा',
      allSchemes: 'सर्व योजना',
      schemesAvailable: 'उपलब्ध योजना',
      showingSchemes: 'दाखवत आहे',
      of: 'पैकी',
      resetFilters: 'फिल्टर रीसेट करा',
      checkEligibility: 'पात्रता तपासा',
      viewDetails: 'तपशील पहा',
      keyBenefit: 'मुख्य लाभ:',
      show12More: 'अजून 12 योजना पहा',
      resetAndShowAll: 'रीसेट करा व सर्व पहा',
      categories: {
        ...defaultEnBrowse.categories,
        dbtTag: 'प्रत्यक्ष लाभ',
        dbtTitle: 'प्रत्यक्ष लाभ हस्तांतरण (DBT)',
        dbtDesc: 'थेट तुमच्या बँक खात्यात रोख मदत (उदा. पीएम-किसान).',
        insuranceTag: 'पीक विमा',
        insuranceTitle: 'पीक विमा व नुकसान भरपाई',
        insuranceDesc: 'अतिवृष्टी किंवा दुष्काळामुळे झालेल्या पिकाच्या नुकसानीची भरपाई.',
        loansTag: 'कर्ज व क्रेडिट',
        loansTitle: 'किसान क्रेडिट कार्ड व शेती कर्ज',
        loansDesc: 'कमी व्याजाचे कर्ज आणि पीक कर्ज सवलत.',
        inputsTag: 'इनपुट अनुदान',
        inputsTitle: 'ट्रॅक्टर व यंत्रसामग्री अनुदान',
        inputsDesc: 'ट्रॅक्टर, औजारे आणि बियाणे खरेदीवर मिळणारे अनुदान.',
        infrastructureTag: 'पायाभूत सुविधा',
        infrastructureTitle: 'सौर पंप व सिंचन',
        infrastructureDesc: 'पीएम-कुसुम सौर पंप आणि ठिबक सिंचनासाठी अनुदान.',
        organicTag: 'सेंद्रिय व तंत्रज्ञान',
        organicTitle: 'सेंद्रिय शेती व माती आरोग्य',
        organicDesc: 'मोफत मृदा आरोग्य पत्रिका आणि सेंद्रिय शेती प्रोत्साहन.',
        allTag: 'सर्व',
        allTitle: 'सर्व सरकारी योजना',
        allDesc: 'शोध व फिल्टरसह राष्ट्रीय आणि राज्य कृषी योजनांची यादी.',
        viewSchemes: 'योजना पहा',
        schemesCount: 'योजना'
      }
    },
    modal: {
      ...defaultEnModal,
      profileEligible: 'प्रोफाईल या योजनेसाठी पात्र आहे',
      profileExcluded: 'प्रोफाईल योजनेसाठी अपात्र आहे',
      reasonForExclusion: 'अपात्रतेचे कारण:',
      descriptionAndGuidelines: 'योजनेचा तपशील व मार्गदर्शक तत्त्वे',
      financialBenefit: 'आर्थिक लाभ व अनुदान',
      documentChecklist: 'आवश्यक कागदपत्रे',
      close: 'बंद करा',
      applyOfficial: 'अधिकृत पोर्टलवर अर्ज करा'
    },
    auth: {
      ...defaultEnAuth,
      titleSignIn: 'साइन इन करा',
      titleRegister: 'खाते तयार करा',
      btnSignIn: 'साइन इन करा',
      btnRegister: 'खाते तयार करा'
    },
    admin: {
      ...defaultEnAdmin,
      consoleTitle: 'ॲडमिन डेटा ऑपरेटर कंसोल',
      submitBtn: 'योजना जतन करा'
    },
    notFound: {
      ...defaultEnNotFound,
      title: 'रस्ता चुकला का?',
      desc: 'तुम्ही शोधत असलेले पृष्ठ सापडले नाही. चला तुम्हाला मुख्य पानावर घेऊन जाऊया!',
      returnHome: 'मुख्य पानावर जा',
      checkEligible: 'पात्र योजना तपासा'
    },
    footer: {
      tagline: 'शेतकरी-योजना पात्रता मॅचर • टेक-अ-थॉन 2026 साठी तयार केले.',
      meta: 'TF-IDF + hard-filter pure python/TS इंजिन'
    }
  },

  te: {
    nav: {
      browseSchemes: 'పథకాలను చూడండి',
      checkEligibility: 'అర్హతను తనిఖీ చేయండి',
      signIn: 'సైన్ ఇన్ చేయండి',
      admin: 'అడ్మిన్',
      signOut: 'సైన్ అవుట్'
    },
    hero: {
      headingPart1: 'మీ పొలానికి తగిన ',
      headingHighlight: 'ప్రభుత్వ సాయం పొందండి.',
      description: 'విత్తనాలు, యంత్రాలు, సోలార్ పంపులు మరియు పంట భీమా పథకాలను కనుగొనండి.',
      selectState: 'రాష్ట్రాన్ని ఎంచుకోండి...',
      searchSchemes: 'పథకాలను శోధించండి',
      modalTitle: 'రాష్ట్రాన్ని ఎంచుకోండి',
      searchStatePlaceholder: 'రాష్ట్రాన్ని శోధించండి...',
      noStateFound: 'ఏ రాష్ట్రమూ కనుగొనబడలేదు',
      clickMapToSelect: '(ఎంచుకోవడానికి మ్యాప్‌పై క్లిక్ చేయండి)',
      clickAnyStateHint: 'మ్యాప్‌లోని ఏదైనా రాష్ట్రాన్ని క్లిక్ చేయండి'
    },
    form: {
      steps: {
        step1: 'ప్రాంతం & భూ రికార్డులు',
        step2: 'భూమి & నీరు',
        step3: 'పంటలు & కాలం',
        step4: 'రైతు ప్రొఫైల్',
        stepOf: 'లో'
      },
      banners: {
        step1Title: 'భూమి వివరాలు & పట్టా నంబర్',
        step1Desc: 'భూ రికార్డుల తనిఖీ కోసం आवश्यकం.',
        step2Title: 'భూమి విస్తీర్ణం & సాగునీరు',
        step2Desc: 'చిన్నకారు రైతు సబ్సిడీ కేటాయింపు తనిఖీకి.',
        step3Title: 'పంటలు & సాగు కాలం',
        step3Desc: 'పంట భీమా మరియు విత్తన రాయితీల కోసం.',
        step4Title: 'రైతు వర్గం & రాయితీలు',
        step4Desc: 'మహిళలు, చిన్న రైతులకు 10-25% అదనపు సబ్సిడీ.'
      },
      labels: {
        state: 'రాష్ట్రం *',
        selectStatePlaceholder: 'రాష్ట్రాన్ని ఎంచుకోండి...',
        district: 'జిల్లా *',
        districtPlaceholder: 'ఉదా. గుంటూరు, కృష్ణా',
        taluka: 'మండలం (ఐచ్ఛికం)',
        talukaPlaceholder: 'ఉదా. తెనాలి, గుడ్లవల్లేరు',
        pincode: 'పిన్ కోడ్ (6 అంకెలు) *',
        pincodePlaceholder: 'ఉదా. 522002',
        khasra: 'ఖస్రా / సర్వే నంబర్ / పహాణీ *',
        khasraPlaceholder: 'ఉదా. సర్వే నం. 108/A',
        khasraHint: 'మీ భూమి పట్టాదారు పాస్‌బుక్ లో ఉంటుంది.',

        landArea: 'మొత్తం సాగు భూమి విస్తీర్ణం *',
        ha: 'హెక్టార్లు (ha)',
        acres: 'ఎకరాలు',
        bigha: 'బిగా',
        equivalent: 'సమానం:',
        smallMarginalEligible: 'చిన్నకారు రైతు సబ్సిడీకి అర్హులు (2.0 హెక్టార్ల వరకు)',
        largeEligible: 'సాగు పరికరాల సబ్సిడీకి అర్హులు (> 2.0 హెక్టార్లు)',
        landHint: 'చిన్నకారు రైతులకు (2 హెక్టార్ల కంటే తక్కువ) మొదటి ప్రాధాన్యత.',

        ownershipType: 'భూమి యాజమాన్యం',
        ownerFarmer: 'సొంత భూమి (పట్టాదారు)',
        tenantFarmer: 'కౌలు రైతు / బటాయిదార్',
        leasedLand: 'లీజు భూమి',
        forestLand: 'అటవీ హక్కుల (FRA) పట్టా',

        waterSource: 'సాగునీటి వనరు',
        rainfed: 'వర్షాధారం (వానాకాలం)',
        canal: 'కాలువ / బోరు బావి',
        drip: 'బిందు / తుంపర సేద్యం',
        solar: 'సోలార్ పంప్ (కుసుమ్)',

        primaryCrop: 'ప్రధాన పంట *',
        selectCropPlaceholder: 'పంటను ఎంచుకోండి...',
        annualIncome: 'వార్షిక ఆదాయం',
        incomeBelow1L: '₹1 లక్ష కంటే తక్కువ (మొదటి ప్రాధాన్యత)',
        income1to25L: '₹1 లక్ష - ₹2.5 లక్షలు',
        income25to5L: '₹2.5 లక్షలు - ₹5 లక్షలు',
        incomeAbove5L: '₹5 లక్షల కంటే ఎక్కువ',

        farmingSeason: 'ప్రధాన కాలం',
        kharif: 'ఖరీఫ్ (జూన్–అక్టోబర్)',
        rabi: 'రబీ (నవంబర్–ఏప్రిల్)',
        zaid: 'జాయెద్ (ఏప్రిల్–జూన్)',
        wholeYear: 'సంవత్సరం పొడవునా',

        farmingMethod: 'సాగు పద్ధతి',
        conventional: 'సాధారణ సాగు',
        organic: 'సేంద్రీయ సాగు (PKVY)',
        natural: 'ప్రకృతి వ్యవసాయం (ZBNF)',
        polyhouse: 'పాలిహౌస్ / రక్షిత సాగు',

        farmerName: 'రైతు పేరు (పట్టాదార్ పుస్తకం ప్రకారం)',
        farmerNamePlaceholder: 'ఉదా. వెంకటేశ్వర్లు',
        mobile: 'మొబైల్ నంబర్',
        mobilePlaceholder: 'ఉదా. 9876543210',
        aadhaar: 'ఆధార్ నంబర్ (చివరి 4 అంకెలు)',
        aadhaarPlaceholder: 'ఉదా. 8492',
        socialCategory: 'సామాజిక వర్గం *',
        selectCategoryPlaceholder: 'వర్గం ఎంచుకోండి...',
        categoryHint: 'కేటాయించిన సబ్సిడీల కోసం.',

        specialCategory: 'ప్రత్యేక సబ్సిడీ వర్గం',
        smallMarginal: 'చిన్నకారు రైతు (2 హెక్టార్ల వరకు)',
        womenFarmer: 'మహిళా రైతు',
        divyang: 'దివ్యాంగులు',
        exServiceman: 'మాజీ సైనికుల కోటా'
      },
      buttons: {
        prevStep: 'వెనుకకు',
        nextStep: 'తరువాతి దశ',
        resetForm: 'రీసెట్',
        autoFill: 'ఆటోఫిల్ ఫారమ్',
        autofilledSuccess: 'ఫారమ్ పూర్తయింది! ✨',
        findSchemes: 'సబ్సిడీలు కనుగొనండి',
        searching: 'పథకాలు శోధిస్తోంది...'
      }
    },
    results: {
      ...defaultEnResults,
      matchingSchemesTitle: 'అర్హతగల పథకాలు & రాయితీలు',
      eligibleOnly: 'అర్హత ఉన్న పథకాలు మాత్రమే',
      exclusionReason: 'అనర్హతకు కారణం',
      viewDetails: 'వివరాలు చూడండి',
      applyNow: 'అప్లై చేయండి',
      viewDetailsApply: 'వివరాలు చూసి అప్లై చేయండి'
    },
    browse: {
      ...defaultEnBrowse,
      browseTitle: 'ప్రభుత్వ వ్యవసాయ పథకాలను చూడండి',
      searchPlaceholder: 'పథకం పేరు లేదా పంట ద్వారా శోధించండి…',
      allStates: 'అన్ని రాష్ట్రాలు',
      allCategories: 'అన్ని వర్గాలు',
      selectCategoryBegin: 'ప్రారంభించడానికి పథక వర్గాన్ని ఎంచుకోండి',
      backToCategories: 'వెనుకకు',
      allSchemes: 'అన్ని పథకాలు',
      resetFilters: 'ఫిల్టర్లు రీసెట్ చేయండి',
      checkEligibility: 'అర్హత తనిఖీ చేయండి',
      viewDetails: 'వివరాలు చూడండి',
      show12More: 'మరో 12 పథకాలు చూడండి'
    },
    modal: defaultEnModal,
    auth: defaultEnAuth,
    admin: defaultEnAdmin,
    notFound: defaultEnNotFound,
    footer: {
      tagline: 'రైతు-పథకం అర్హత మ్యాచర్ • టెక్-ఎ-థాన్ 2026 కోసం నిర్మించబడింది.',
      meta: 'TF-IDF + హార్డ్-ఫిల్టర్ ప్యూర్ పైథాన్/TS ఇంజిన్'
    }
  },

  ta: {
    nav: {
      browseSchemes: 'திட்டங்களை உலாவுக',
      checkEligibility: 'தகுதியைச் சரிபார்க்கவும்',
      signIn: 'உள்நுழைக',
      admin: 'நிர்வாகி',
      signOut: 'வெளியேறு'
    },
    hero: {
      headingPart1: 'உங்கள் பண்ணைக்கு தேவையான ',
      headingHighlight: 'அரசு உதவியைப் பெறுங்கள்.',
      description: 'விதை, இயந்திரங்கள் மற்றும் விவசாய மானியங்களைக் கண்டறிந்து பெறுங்கள்.',
      selectState: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்...',
      searchSchemes: 'திட்டங்களைத் தேடுங்கள்',
      modalTitle: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
      searchStatePlaceholder: 'மாநிலங்களைத் தேடுங்கள்...',
      noStateFound: 'எந்த மாநிலமும் கிடைக்கவில்லை',
      clickMapToSelect: '(தேர்ந்தெடுக்க வரைபடத்தில் கிளிக் செய்யவும்)',
      clickAnyStateHint: 'வரைபடத்தில் ஏதேனும் ஒரு மாநிலத்தைக் கிளிக் செய்யவும்'
    },
    form: defaultEnForm,
    results: {
      ...defaultEnResults,
      matchingSchemesTitle: 'தகுதியான திட்டங்கள் & மானியங்கள்',
      eligibleOnly: 'தகுதியான திட்டங்கள் மட்டும்',
      viewDetails: 'விவரங்களைப் பார்க்கவும்',
      applyNow: 'விண்ணப்பிக்கவும்'
    },
    browse: {
      ...defaultEnBrowse,
      browseTitle: 'அரசு விவசாய திட்டங்களைப் பார்க்கவும்',
      searchPlaceholder: 'திட்டங்களைத் தேடுங்கள்…',
      allStates: 'அனைத்து மாநிலங்கள்',
      allCategories: 'அனைத்து பிரிவுகள்',
      checkEligibility: 'தகுதியைச் சரிபார்க்கவும்',
      viewDetails: 'விவரங்களைப் பார்க்கவும்'
    },
    modal: defaultEnModal,
    auth: defaultEnAuth,
    admin: defaultEnAdmin,
    notFound: defaultEnNotFound,
    footer: {
      tagline: 'விவசாயி-திட்ட தகுதி மேச்சர் • டெக்-ஏ-தான் 2026 க்காக உருவாக்கப்பட்டது.',
      meta: 'TF-IDF + ஹார்ட்-ஃபில்டர் பியூர் பைதான்/டிஎஸ் என்ஜின்'
    }
  },

  kn: {
    nav: {
      browseSchemes: 'ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      checkEligibility: 'ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ',
      signIn: 'ಸೈನ್ ಇನ್',
      admin: 'ಅಡ್ಮಿನ್',
      signOut: 'ಸೈನ್ ಔಟ್'
    },
    hero: {
      headingPart1: 'ನಿಮ್ಮ ಜಮೀನಿಗೆ ಸಿಗಬೇಕಾದ ',
      headingHighlight: 'ಸರ್ಕಾರಿ ನೆರವು ಪಡೆಯಿರಿ.',
      description: 'ಬೀಜಗಳು, ಯಂತ್ರೋಪಕರಣಗಳು ಮತ್ತು ಕೃಷಿ ಸಬ್ಸಿಡಿಗಳನ್ನು ಹುಡುಕಿ.',
      selectState: 'ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ...',
      searchSchemes: 'ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ',
      modalTitle: 'ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      searchStatePlaceholder: 'ರಾಜ್ಯವನ್ನು ಹುಡುಕಿ...',
      noStateFound: 'ಯಾವ ರಾಜ್ಯವೂ ಕಂಡುಬಂದಿಲ್ಲ',
      clickMapToSelect: '(ಆಯ್ಕೆ ಮಾಡಲು ನಕ್ಷೆಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ)',
      clickAnyStateHint: 'ನಕ್ಷೆಯಲ್ಲಿನ ಯಾವುದೇ ರಾಜ್ಯವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ'
    },
    form: defaultEnForm,
    results: {
      ...defaultEnResults,
      matchingSchemesTitle: 'ಅರ್ಹ ಯೋಜನೆಗಳು ಮತ್ತು ಸಬ್ಸಿಡಿಗಳು',
      eligibleOnly: 'ಅರ್ಹ ಯೋಜನೆಗಳು ಮಾತ್ರ',
      viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      applyNow: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ'
    },
    browse: {
      ...defaultEnBrowse,
      browseTitle: 'ಸರ್ಕಾರಿ ಕೃಷಿ ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      searchPlaceholder: 'ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ…',
      allStates: 'ಎಲ್ಲಾ ರಾಜ್ಯಗಳು',
      allCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
      checkEligibility: 'ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ',
      viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ'
    },
    modal: defaultEnModal,
    auth: defaultEnAuth,
    admin: defaultEnAdmin,
    notFound: defaultEnNotFound,
    footer: {
      tagline: 'ರೈತ-ಯೋಜನೆ ಅರ್ಹತೆ ಮ್ಯಾಚರ್ • ಟೆಕ್-ಎ-ಥಾನ್ 2026 ಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.',
      meta: 'TF-IDF + ಹಾರ್ಡ್-ಫಿಲ್ಟರ್ ಪ್ಯೂರ್ ಪೈಥಾನ್/TS ಇಂಜಿನ್'
    }
  },

  ml: {
    nav: {
      browseSchemes: 'പദ്ധതികൾ കാണുക',
      checkEligibility: 'അർഹത പരിശോധിക്കുക',
      signIn: 'സൈൻ ഇൻ ചെയ്യുക',
      admin: 'അഡ്മിൻ',
      signOut: 'സൈൻ ഔട്ട്'
    },
    hero: {
      headingPart1: 'നിങ്ങളുടെ കൃഷിയിടത്തിന് അർഹമായ ',
      headingHighlight: 'സർക്കാർ സഹായം നേടുക.',
      description: 'വിത്തുകൾ, യന്ത്രങ്ങൾ എന്നിവയ്ക്കുള്ള സംസ്ഥാന-കേന്ദ്ര സബ്‌സിഡികൾ കണ്ടെത്തുകയും നേടുകയും ചെയ്യുക.',
      selectState: 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക...',
      searchSchemes: 'പദ്ധതികൾ തിരയുക',
      modalTitle: 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക',
      searchStatePlaceholder: 'സംസ്ഥാനം തിരയുക...',
      noStateFound: 'സംസ്ഥാനം കണ്ടെത്താനായില്ല',
      clickMapToSelect: '(തിരഞ്ഞെടുക്കാൻ മാപ്പിൽ ക്ലിക്ക് ചെയ്യുക)',
      clickAnyStateHint: 'മാപ്പിലെ ഏതെങ്കിലും സംസ്ഥാനത്ത് ക്ലിക്ക് ചെയ്യുക'
    },
    form: defaultEnForm,
    results: {
      ...defaultEnResults,
      matchingSchemesTitle: 'അർഹമായ പദ്ധതികളും സബ്‌സിഡികളും',
      eligibleOnly: 'അർഹമായ പദ്ധതികൾ മാത്രം',
      viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
      applyNow: 'അപേക്ഷിക്കുക'
    },
    browse: {
      ...defaultEnBrowse,
      browseTitle: 'സർക്കാർ കാർഷിക പദ്ധതികൾ കാണുക',
      searchPlaceholder: 'പദ്ധതികൾ തിരയുക…',
      allStates: 'എല്ലാ സംസ്ഥാനങ്ങളും',
      allCategories: 'എല്ലാ വിഭാഗങ്ങളും',
      checkEligibility: 'അർഹത പരിശോധിക്കുക',
      viewDetails: 'വിശദാംശങ്ങൾ കാണുക'
    },
    modal: defaultEnModal,
    auth: defaultEnAuth,
    admin: defaultEnAdmin,
    notFound: defaultEnNotFound,
    footer: {
      tagline: 'കർഷക-പദ്ധതി യോഗ്യത മാച്ചർ • ടെക്-എ-ഥോൺ 2026 നായി നിർമ്മിച്ചത്.',
      meta: 'TF-IDF + ഹാർഡ്-ഫിൽട്ടർ പ്യുവർ പൈഥൺ/TS എഞ്ചിൻ'
    }
  },

  gu: {
    nav: {
      browseSchemes: 'યોજનાઓ જુઓ',
      checkEligibility: 'પાત્રતા ચકાસો',
      signIn: 'સાઇન ઇન કરો',
      admin: 'એડમિન',
      signOut: 'સાઇન આઉટ'
    },
    hero: {
      headingPart1: 'તમારા ખેતર માટે મળવાપાત્ર ',
      headingHighlight: 'સરકારી સહાય મેળવો.',
      description: 'બીજ, મશીનરી અને અન્ય સુવિધાઓ માટે રાજ્ય અને કેન્દ્ર સરકારની સબસિડી શોધો.',
      selectState: 'રાજ્ય પસંદ કરો...',
      searchSchemes: 'યોજનાઓ શોધો',
      modalTitle: 'રાજ્ય પસંદ કરો',
      searchStatePlaceholder: 'રાજ્ય શોધો...',
      noStateFound: 'કોઈ રાજ્ય મળ્યું નથી',
      clickMapToSelect: '(પસંદ કરવા માટે નકશા પર ક્લિક કરો)',
      clickAnyStateHint: 'નકશા પરના કોઈપણ રાજ્ય પર ક્લિક કરો'
    },
    form: defaultEnForm,
    results: {
      ...defaultEnResults,
      matchingSchemesTitle: 'પાત્ર યોજનાઓ અને સબસિડી',
      eligibleOnly: 'માત્ર પાત્ર યોજનાઓ',
      viewDetails: 'વિગતો જુઓ',
      applyNow: 'અરજી કરો'
    },
    browse: {
      ...defaultEnBrowse,
      browseTitle: 'સરકારી કૃષિ યોજનાઓ જુઓ',
      searchPlaceholder: 'યોજનાઓ શોધો…',
      allStates: 'તમામ રાજ્યો',
      allCategories: 'તમામ શ્રેણીઓ',
      checkEligibility: 'પાત્રતા ચકાસો',
      viewDetails: 'વિગતો જુઓ'
    },
    modal: defaultEnModal,
    auth: defaultEnAuth,
    admin: defaultEnAdmin,
    notFound: defaultEnNotFound,
    footer: {
      tagline: 'ખેડૂત-યોજના પાત્રતા મેચર • ટેક-એ-થોન 2026 માટે બનાવેલ.',
      meta: 'TF-IDF + હાર્ડ-ફિલ્ટર પ્યોર પાયથન/TS એન્જિન'
    }
  },

  bn: {
    nav: {
      browseSchemes: 'প্রকল্পগুলি দেখুন',
      checkEligibility: 'যোগ্যতা পরীক্ষা করুন',
      signIn: 'সাইন ইন করুন',
      admin: 'অ্যাডমিন',
      signOut: 'সাইন আউট'
    },
    hero: {
      headingPart1: 'আপনার খামারের জন্য প্রাপ্য ',
      headingHighlight: 'সরকারি সহায়তা পান।',
      description: 'বীজ, যন্ত্রপাতি এবং অন্যান্য সুবিধার জন্য রাজ্য ও কেন্দ্র সরকারের ভর্তুকি খুঁজুন।',
      selectState: 'রাজ্য নির্বাচন করুন...',
      searchSchemes: 'প্রকল্প খুঁজুন',
      modalTitle: 'রাজ্য নির্বাচন করুন',
      searchStatePlaceholder: 'রাজ্য খুঁজুন...',
      noStateFound: 'কোনো রাজ্য পাওয়া যায়নি',
      clickMapToSelect: '(নির্বাচন করতে মানচিত্রে ক্লিক করুন)',
      clickAnyStateHint: 'মানচিত্রের যেকোনো রাজ্যে ক্লিক করুন'
    },
    form: defaultEnForm,
    results: {
      ...defaultEnResults,
      matchingSchemesTitle: 'যোগ্য প্রকল্প ও ভর্তুকি',
      eligibleOnly: 'কেবলমাত্র যোগ্য প্রকল্প',
      viewDetails: 'বিস্তারিত দেখুন',
      applyNow: 'আবেদন করুন'
    },
    browse: {
      ...defaultEnBrowse,
      browseTitle: 'সরকারি কৃষি প্রকল্পগুলি দেখুন',
      searchPlaceholder: 'প্রকল্প খুঁজুন…',
      allStates: 'সকল রাজ্য',
      allCategories: 'সকল বিভাগ',
      checkEligibility: 'যোগ্যতা পরীক্ষা করুন',
      viewDetails: 'বিস্তারিত দেখুন'
    },
    modal: defaultEnModal,
    auth: defaultEnAuth,
    admin: defaultEnAdmin,
    notFound: defaultEnNotFound,
    footer: {
      tagline: 'কৃষক-প্রকল্প যোগ্যতা ম্যাচার • টেক-এ-থন ২০২৬-এর জন্য তৈরি।',
      meta: 'TF-IDF + হার্ড-ফিল্টার পিওর পাইথন/টিএস ইঞ্জিন'
    }
  },

  pa: {
    nav: {
      browseSchemes: 'ਸਕੀਮਾਂ ਵੇਖੋ',
      checkEligibility: 'ਯੋਗਤਾ ਦੀ ਜਾਂਚ ਕਰੋ',
      signIn: 'ਸਾਈਨ ਇਨ ਕਰੋ',
      admin: 'ਐਡਮਿਨ',
      signOut: 'ਸਾਈਨ ਆਊਟ'
    },
    hero: {
      headingPart1: 'ਆਪਣੇ ਖੇਤ ਲਈ ਮਿਲਣ ਵਾਲੀ ',
      headingHighlight: 'ਸਰਕਾਰੀ ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਕਰੋ।',
      description: 'ਬੀਜਾਂ, ਮਸ਼ੀਨਰੀ ਅਤੇ ਹੋਰ ਸਹੂਲਤਾਂ ਲਈ ਰਾਜ ਅਤੇ ਕੇਂਦਰ ਸਰਕਾਰ ਦੀਆਂ ਸਬਸਿਡੀਆਂ ਖੋਜੋ।',
      selectState: 'ਰਾਜ ਚੁਣੋ...',
      searchSchemes: 'ਸਕੀਮਾਂ ਖੋਜੋ',
      modalTitle: 'ਰਾਜ ਚੁਣੋ',
      searchStatePlaceholder: 'ਰਾਜ ਖੋਜੋ...',
      noStateFound: 'ਕੋਈ ਰਾਜ ਨਹੀਂ ਮਿਲਿਆ',
      clickMapToSelect: "(ਚੁਣਨ ਲਈ ਨਕਸ਼ੇ 'ਤੇ ਕਲਿੱਕ ਕਰੋ)",
      clickAnyStateHint: "ਨਕਸ਼ੇ 'ਤੇ ਕਿਸੇ ਵੀ ਰਾਜ 'ਤੇ ਕਲਿੱਕ ਕਰੋ"
    },
    form: defaultEnForm,
    results: {
      ...defaultEnResults,
      matchingSchemesTitle: 'ਯੋਗ ਸਕੀਮਾਂ ਅਤੇ ਸਬਸਿਡੀਆਂ',
      eligibleOnly: 'ਸਿਰਫ਼ ਯੋਗ ਸਕੀਮਾਂ',
      viewDetails: 'ਵੇਰਵੇ ਵੇਖੋ',
      applyNow: 'ਅਪਲਾਈ ਕਰੋ'
    },
    browse: {
      ...defaultEnBrowse,
      browseTitle: 'ਸਰਕਾਰੀ ਖੇਤੀਬਾੜੀ ਸਕੀਮਾਂ ਵੇਖੋ',
      searchPlaceholder: 'ਸਕੀਮਾਂ ਖੋਜੋ…',
      allStates: 'ਸਾਰੇ ਰਾਜ',
      allCategories: 'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ',
      checkEligibility: 'ਯੋਗਤਾ ਦੀ ਜਾਂਚ ਕਰੋ',
      viewDetails: 'ਵੇਰਵੇ ਵੇਖੋ'
    },
    modal: defaultEnModal,
    auth: defaultEnAuth,
    admin: defaultEnAdmin,
    notFound: defaultEnNotFound,
    footer: {
      tagline: 'ਕਿਸਾਨ-ਸਕੀਮ ਯੋਗਤਾ ਮੈਚਰ • ਟੈਕ-ਏ-ਥੌਨ 2026 ਲਈ ਬਣਾਇਆ ਗਿਆ।',
      meta: 'TF-IDF + ਹਾਰਡ-ਫਿਲਟਰ ਪਿਓਰ ਪਾਈਥਨ/TS ਇੰਜਣ'
    }
  }
};
