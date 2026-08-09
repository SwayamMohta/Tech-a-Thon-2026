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
  };
  browse: {
    browseTitle: string;
    searchPlaceholder: string;
    allStates: string;
    allCrops: string;
    clearFilters: string;
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
  exclusionReason: 'Why Not Eligible'
};

const defaultEnBrowse: TranslationSchema['browse'] = {
  browseTitle: 'Browse Indian Agriculture Welfare Schemes',
  searchPlaceholder: 'Search scheme, subsidy, crop, or ministry…',
  allStates: 'All States / UTs',
  allCrops: 'All Crops',
  clearFilters: 'Clear Filters'
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
        findSchemes: 'पात्र योजनाएं खोजें',
        searching: '45+ योजनाएं खोजी जा रही हैं...'
      }
    },
    results: defaultEnResults,
    browse: defaultEnBrowse,
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
        findSchemes: 'पात्र योजना शोधा',
        searching: 'योजना शोधत आहे...'
      }
    },
    results: defaultEnResults,
    browse: defaultEnBrowse,
    footer: {
      tagline: 'शेतकरी-योजना पात्रता मॅचर • टेक-अ-थॉन 2026 साठी तयार केले.',
      meta: 'TF-IDF + हार्ड-फिल्टर प्युअर पायथन/टीएस इंजिन'
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
        findSchemes: 'సబ్సిడీలు కనుగొనండి',
        searching: 'పథకాలు శోధిస్తోంది...'
      }
    },
    results: defaultEnResults,
    browse: defaultEnBrowse,
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
    results: defaultEnResults,
    browse: defaultEnBrowse,
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
    results: defaultEnResults,
    browse: defaultEnBrowse,
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
    results: defaultEnResults,
    browse: defaultEnBrowse,
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
    results: defaultEnResults,
    browse: defaultEnBrowse,
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
    results: defaultEnResults,
    browse: defaultEnBrowse,
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
    results: defaultEnResults,
    browse: defaultEnBrowse,
    footer: {
      tagline: 'ਕਿਸਾਨ-ਸਕੀਮ ਯੋਗਤਾ ਮੈਚਰ • ਟੈਕ-ਏ-ਥੌਨ 2026 ਲਈ ਬਣਾਇਆ ਗਿਆ।',
      meta: 'TF-IDF + ਹਾਰਡ-ਫਿਲਟਰ ਪਿਓਰ ਪਾਈਥਨ/TS ਇੰਜਣ'
    }
  }
};
