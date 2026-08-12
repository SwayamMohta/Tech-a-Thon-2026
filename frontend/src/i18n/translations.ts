export type LanguageCode = 'en' | 'hi' | 'te' | 'pa';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
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
    selectCategoryToViewMatched: string;
    selectCategoryToViewExcluded: string;
    viewAllSchemesBtn: string;
    exploreCategoryPrefix: string;
    backToCategoriesBtn: string;
    showMoreSchemesBtn: string;
    profileModalTitle: string;
    profileModalSubtitle: string;
    stateLabel: string;
    districtLabel: string;
    landSizeLabel: string;
    cropLabel: string;
    categoryLabel: string;
    waterSourceLabel: string;
    editProfileBtn: string;
    closeBtn: string;
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
  showAll: 'Show All Schemes',
  selectCategoryToViewMatched: 'Select a Scheme Category to View Eligible Schemes',
  selectCategoryToViewExcluded: 'Select a Scheme Category to View Excluded Schemes',
  viewAllSchemesBtn: 'View All Schemes',
  exploreCategoryPrefix: 'Explore',
  backToCategoriesBtn: 'Back to Categories',
  showMoreSchemesBtn: 'Show More Schemes',
  profileModalTitle: 'Farmer Profile Details',
  profileModalSubtitle: 'Your active parameters for scheme matching',
  stateLabel: 'State',
  districtLabel: 'District',
  landSizeLabel: 'Land Size',
  cropLabel: 'Primary Crop',
  categoryLabel: 'Social Category',
  waterSourceLabel: 'Water Source / Irrigation',
  editProfileBtn: 'Edit Profile',
  closeBtn: 'Close'
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
      matchingSchemesTitle: 'पात्र योजनाएं व सब्सिडी मैच',
      matchedSubsidiesFound: 'आपकी प्रोफाइल के लिए मिलीं सरकारी सब्सिडी',
      allCategories: 'सभी श्रेणियां',
      eligibleOnly: 'पात्र योजनाएं',
      matchScore: 'पात्रता स्कोर',
      viewDetails: 'विवरण देखें',
      applyNow: 'आवेदन करें',
      exclusionReason: 'अपात्रता का कारण',
      noMatchesTitle: 'कोई सटीक मैच नहीं मिला',
      noMatchesDesc: 'आपकी राज्य व भूमि के आकार के अनुसार कोई योजना नहीं मिली। कृपया अपनी प्रोफाइल बदलें!',
      adjustProfile: 'किसान प्रोफाइल बदलें',
      transparencyTitle: 'पारदर्शिता गारंटी:',
      transparencyDesc: 'ये योजनाएं एक या अधिक हार्ड नियमों को पूरा नहीं करती हैं। वे टीएफ-आईडीएफ समानता द्वारा क्रमबद्ध हैं।',
      relevance: 'प्रासंगिकता:',
      viewDetailsApply: 'विवरण देखें व आवेदन करें',
      whyExcluded: 'अपात्रता का कारण (हार्ड नियम विफल):',
      profileKeywordsMatched: 'मैच हुए प्रोफाइल कीवर्ड:',
      additionalKeywords: 'अतिरिक्त योजना कीवर्ड:',
      showTop10: 'केवल शीर्ष 10 देखें',
      showAll: 'सभी योजनाएं देखें',
      selectCategoryToViewMatched: 'पात्र योजनाएं देखने के लिए एक श्रेणी चुनें',
      selectCategoryToViewExcluded: 'अपात्र योजनाएं देखने के लिए एक श्रेणी चुनें',
      viewAllSchemesBtn: 'सभी योजनाएं देखें',
      exploreCategoryPrefix: 'देखें',
      backToCategoriesBtn: 'श्रेणियों पर वापस जाएं',
      showMoreSchemesBtn: 'और योजनाएं देखें',
      profileModalTitle: 'किसान प्रोफाइल विवरण',
      profileModalSubtitle: 'योजना मिलान के लिए आपके सक्रिय मानदंड',
      stateLabel: 'राज्य',
      districtLabel: 'ज़िला',
      landSizeLabel: 'भूमि का आकार',
      cropLabel: 'मुख्य फसल',
      categoryLabel: 'सामाजिक श्रेणी',
      waterSourceLabel: 'सिंचाई / जल स्रोत',
      editProfileBtn: 'प्रोफाइल बदलें',
      closeBtn: 'बंद करें'
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
