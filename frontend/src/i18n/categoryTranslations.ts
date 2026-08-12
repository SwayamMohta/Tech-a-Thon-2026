import type { LanguageCode } from './translations';

export const CATEGORY_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  'Direct Benefit': {
    en: 'Direct Benefit',
    hi: 'प्रत्यक्ष लाभ (DBT)',
    te: 'నేరుగా లబ్ధి (DBT)',
    pa: 'ਸਿੱਧਾ ਲਾਭ (DBT)'
  },
  'Crop Insurance': {
    en: 'Crop Insurance',
    hi: 'फसल बीमा',
    te: 'పంట భీమా',
    pa: 'ਫਸਲ ਬੀਮਾ'
  },
  'Insurance': {
    en: 'Crop Insurance',
    hi: 'फसल बीमा',
    te: 'పంట భీమా',
    pa: 'ਫਸਲ ਬੀਮਾ'
  },
  'Credit & Loan': {
    en: 'Credit & Loan',
    hi: 'ऋण व क्रेडिट',
    te: 'రుణం & క్రెడిట్',
    pa: 'ਕਰਜ਼ਾ ਅਤੇ ਕ੍ਰੈਡਿਟ'
  },
  'Input Subsidy': {
    en: 'Input Subsidy',
    hi: 'कृषि इनपुट सब्सिडी',
    te: 'ఇన్‌పుట్ సబ్సిడీ',
    pa: 'ਇਨਪੁਟ ਸਬਸਿਡੀ'
  },
  'Equipment Subsidy': {
    en: 'Equipment Subsidy',
    hi: 'उपकरण सब्सिडी',
    te: 'పరికరాల సబ్సిడీ',
    pa: 'ਉਪਕਰਣ ਸਬਸਿਡੀ'
  },
  'Infrastructure': {
    en: 'Infrastructure',
    hi: 'अवसंरचना व सिंचाई',
    te: 'మౌలిక సదుపాయాలు',
    pa: 'ਬੁਨਿਆਦੀ ਢਾਂਚਾ'
  },
  'Irrigation': {
    en: 'Irrigation & Solar',
    hi: 'सिंचाई व सोलर',
    te: 'సాగునీరు & సోలార్',
    pa: 'ਸਿੰਚਾਈ ਅਤੇ ਸੋਲਰ'
  },
  'Irrigation & Solar': {
    en: 'Irrigation & Solar',
    hi: 'सिंचाई व सोलर',
    te: 'సాగునీరు & సోలార్',
    pa: 'ਸਿੰਚਾਈ ਅਤੇ ਸੋਲਰ'
  },
  'Organic & Tech': {
    en: 'Organic & Tech',
    hi: 'जैविक व तकनीक',
    te: 'సేంద్రీయ & సాంకేతికత',
    pa: 'ਜੈਵਿਕ ਅਤੇ ਤਕਨਾਲੋਜੀ'
  },
  'Climate Resilience': {
    en: 'Climate Resilience',
    hi: 'जलवायु सहनशीलता',
    te: 'వాతావరణ స్థితిస్థాపకత',
    pa: 'ਜਲਵਾਯੂ ਅਨੁਕੂਲਤਾ'
  },
  'All': {
    en: 'All Categories',
    hi: 'सभी श्रेणियां',
    te: 'అన్ని వర్గాలు',
    pa: 'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ'
  }
};

export const CATEGORY_DESC_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  'Direct Benefit': {
    en: 'Direct cash transfers & income support deposited straight to farmer bank accounts.',
    hi: 'किसानों के बैंक खातों में सीधे जमा की जाने वाली प्रत्यक्ष नकद सहायता और आय प्रोत्साहन।',
    te: 'రైతుల బ్యాంక్ ఖాతాల్లో నేరుగా జమ అయ్యే నగదు రవాణా & ఆదాయ మద్దతు.',
    pa: 'ਕਿਸਾਨਾਂ ਦੇ ਬੈਂਕ ਖਾਤਿਆਂ ਵਿੱਚ ਸਿੱਧੇ ਜਮ੍ਹਾਂ ਹੋਣ ਵਾਲੀ ਨਕਦ ਸਹਾਇਤਾ ਅਤੇ ਆਮਦਨ ਸਹਾਇਤਾ।'
  },
  'Crop Insurance': {
    en: 'Financial protection against crop failure, drought, flood, pests & post-harvest loss.',
    hi: 'फसल नुकसान, सूखा, बाढ़, कीटों और कटाई के बाद के नुकसान के खिलाफ वित्तीय सुरक्षा।',
    te: 'పంట నష్టం, కరువు, వరదలు, పురుగులు మరియు కోత అనంతర నష్టాలకు ఆర్థిక రక్షణ.',
    pa: 'ਫਸਲ ਦੇ ਨੁਕਸਾਨ, ਸੋਕੇ, ਹੜ੍ਹ, ਕੀੜਿਆਂ ਅਤੇ ਕਟਾਈ ਤੋਂ ਬਾਅਦ ਦੇ ਨੁਕਸਾਨ ਤੋਂ ਵਿੱਤੀ ਸੁਰੱਖਿਆ।'
  },
  'Insurance': {
    en: 'Financial protection against crop failure, drought, flood, pests & post-harvest loss.',
    hi: 'फसल नुकसान, सूखा, बाढ़, कीटों और कटाई के बाद के नुकसान के खिलाफ वित्तीय सुरक्षा।',
    te: 'పంట నష్టం, కరువు, వరదలు, పురుగులు మరియు కోత అనంతర నష్టాలకు ఆర్థిక రక్షణ.',
    pa: 'ਫਸਲ ਦੇ ਨੁਕਸਾਨ, ਸੋਕੇ, ਹੜ੍ਹ, ਕੀੜਿਆਂ ਅਤੇ ਕਟਾਈ ਤੋਂ ਬਾਅਦ ਦੇ ਨੁਕਸਾਨ ਤੋਂ ਵਿੱਤੀ ਸੁਰੱਖਿਆ।'
  },
  'Credit & Loan': {
    en: 'Kisan Credit Cards (KCC), low-interest loans, collateral-free credit & interest subvention.',
    hi: 'किसान क्रेडिट कार्ड (KCC), कम ब्याज वाले ऋण, बिना गारंटी के क्रेडिट और ब्याज छूट।',
    te: 'కిసాన్ క్రెడిట్ కార్డ్‌లు (KCC), తక్కువ వడ్డీ రుణాలు మరియు వడ్డీ రాయితీ.',
    pa: 'ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ (KCC), ਘੱਟ ਵਿਆਜ ਵਾਲੇ ਕਰਜ਼ੇ ਅਤੇ ਵਿਆਜ ਵਿੱਚ ਛੋਟ।'
  },
  'Input Subsidy': {
    en: 'Subsidies for certified seeds, fertilizers, farm machinery & equipment purchasing.',
    hi: 'प्रमाणित बीज, उर्वरक, कृषि मशीनरी और उपकरण खरीद पर सब्सिडी।',
    te: 'ధృవీకరించబడిన విత్తనాలు, ఎరువులు మరియు వ్యవసాయ యంత్రాల కొనుగోలుపై సబ్సిడీలు.',
    pa: 'ਪ੍ਰਮਾਣਿਤ ਬੀਜਾਂ, ਖਾਦਾਂ ਅਤੇ ਖੇਤੀਬਾੜੀ ਮਸ਼ੀਨਰੀ ਦੀ ਖਰੀਦ \'ਤੇ ਸਬਸਿਡੀ।'
  },
  'Equipment Subsidy': {
    en: 'Financial aid for buying modern tractors, power tillers, rotavators & implements.',
    hi: 'आधुनिक ट्रैक्टर, पावर टिलर, रोटावेटर और कृषि यंत्र खरीदने के लिए वित्तीय सहायता।',
    te: 'ఆధునిక ట్రాక్టర్లు, పవర్ టిల్లర్లు మరియు పరికరాల కొనుగోలుకు ఆర్థిక సాయం.',
    pa: 'ਆਧੁਨਿਕ ਟਰੈਕਟਰ, ਪਾਵਰ ਟਿਲਰ ਅਤੇ ਖੇਤੀ ਸੰਦ ਖਰੀਦਣ ਲਈ ਵਿੱਤੀ ਸਹਾਇਤਾ।'
  },
  'Infrastructure': {
    en: 'Grants for cold chains, warehouses, post-harvest processing & farm gate infrastructure.',
    hi: 'कोल्ड चेन, गोदाम, कटाई के बाद के प्रसंस्करण और कृषि इंफ्रास्ट्रक्चर के लिए अनुदान।',
    te: 'కోల్డ్ చైన్‌లు, గిడ్డంగులు మరియు వ్యవసాయ మౌలిక సదుపాయాల కొనుగోలు సాయం.',
    pa: 'ਕੋਲਡ ਚੇਨਾਂ, ਗੋਦਾਮਾਂ ਅਤੇ ਖੇਤੀਬਾੜੀ ਬੁਨਿਆਦੀ ਢਾਂਚੇ ਲਈ ਗ੍ਰਾਂਟਾਂ।'
  },
  'Irrigation': {
    en: 'Subsidies for drip/sprinkler micro-irrigation systems & PM-KUSUM solar water pumps.',
    hi: 'ड्रिप/स्प्रिंकलर सूक्ष्म सिंचाई प्रणालियों और पीएम-कुसुम सोलर पंपों पर सब्सिडी।',
    te: 'డ్రిప్/స్ప్రింక్లర్ సూక్ష్మ సేద్యం మరియు పీఎం-కుసుమ్ సోలార్ పంపులపై సబ్సిడీ.',
    pa: 'ਡ੍ਰਿਪ/ਸਪ੍ਰਿੰਕਲਰ ਸਿੰਚਾਈ ਅਤੇ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕੁਸੁਮ ਸੋਲਰ ਪੰਪਾਂ \'ਤੇ ਸਬਸਿਡੀ।'
  },
  'Irrigation & Solar': {
    en: 'Subsidies for drip/sprinkler micro-irrigation systems & PM-KUSUM solar water pumps.',
    hi: 'ड्रिप/स्प्रिंकलर सूक्ष्म सिंचाई प्रणालियों और पीएम-कुसुम सोलर पंपों पर सब्सिडी।',
    te: 'డ్రిప్/స్ప్రింక్లర్ సూక్ష్మ సేద్యం మరియు పీఎం-కుసుమ్ సోలార్ పంపులపై సబ్సిడీ.',
    pa: 'ਡ੍ਰਿਪ/ਸਪ੍ਰਿੰਕਲਰ ਸਿੰਚਾਈ ਅਤੇ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕੁਸੁਮ ਸੋਲਰ ਪੰਪਾਂ \'ਤੇ ਸਬਸਿਡੀ।'
  },
  'Organic & Tech': {
    en: 'Support for certified organic farming, bio-inputs, drones & precision agritech.',
    hi: 'प्रमाणित जैविक खेती, जैव-इनपुट, ड्रोन और सटीक कृषि तकनीक के लिए सहायता।',
    te: 'సేంద్రీయ వ్యవసాయం, బయో-ఇన్‌పుట్‌లు మరియు డ్రోన్ సాంకేతికతకు మద్దతు.',
    pa: 'ਜੈਵਿਕ ਖੇਤੀ, ਜੈਵਿਕ ਖਾਦਾਂ ਅਤੇ ਡਰੋਨ ਤਕਨਾਲੋਜੀ ਲਈ ਸਹਾਇਤਾ।'
  },
  'Climate Resilience': {
    en: 'Climate-resilient crop varieties, soil health conservation & watershed management.',
    hi: 'जलवायु-अनुकूल फसल किस्में, मृदा स्वास्थ्य संरक्षण और जलसम्भर प्रबंधन।',
    te: 'వాతావరణ అనుకూల పంట రకాలు మరియు నేల ఆరోగ్య పరిరక్షణ.',
    pa: 'ਜਲਵਾਯੂ ਅਨੁਕੂਲ ਫਸਲਾਂ ਦੀਆਂ ਕਿਸਮਾਂ ਅਤੇ ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਸੰਭਾਲ।'
  }
};

export function getLocalizedCategory(cat: string, lang: LanguageCode): string {
  if (!cat) return cat;
  const match = CATEGORY_TRANSLATIONS[cat];
  if (match && match[lang]) {
    return match[lang];
  }
  return cat;
}

export function getLocalizedCategoryDesc(cat: string, lang: LanguageCode): string {
  if (!cat) return '';
  const match = CATEGORY_DESC_TRANSLATIONS[cat];
  if (match && match[lang]) {
    return match[lang];
  }
  return CATEGORY_DESC_TRANSLATIONS[cat]?.en || '';
}
