import type { LanguageCode } from './translations';
import { getLocalizedStateName } from './stateTranslations';

export const DOCUMENT_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  'Aadhaar Card': {
    en: 'Aadhaar Card',
    hi: 'आधार कार्ड',
    te: 'ఆధార్ కార్డ్',
    pa: 'ਆਧਾਰ ਕਾਰਡ'
  },
  'Land Ownership Record / Passbook': {
    en: 'Land Ownership Record / Passbook',
    hi: 'भूमि स्वामित्व रिकॉर्ड / 7-12 खतौनी पासबुक',
    te: 'భూమి యాజమాన్య రికార్డు / పాస్‌బుక్',
    pa: 'ਜ਼ਮੀਨ ਦੀ ਮਲਕੀਅਤ ਦਾ ਰਿਕਾਰਡ / ਪਾਸਬੁੱਕ'
  },
  'Bank Passbook': {
    en: 'Bank Passbook (Aadhaar Seeded)',
    hi: 'बैंक पासबुक (आधार से लिंक)',
    te: 'బ్యాంక్ పాస్‌బుక్',
    pa: 'ਬੈਂਕ ਪਾਸਬੁੱਕ'
  },
  'BPL Certificate': {
    en: 'BPL Certificate',
    hi: 'बीपीएल राशन कार्ड / प्रमाण पत्र',
    te: 'BPL సర్టిఫికేట్',
    pa: 'BPL ਸਰਟੀਫਿਕੇਟ'
  },
  'Soil Health Card': {
    en: 'Soil Health Card',
    hi: 'मृदा स्वास्थ्य कार्ड',
    te: 'నేల ఆరోగ్య కార్డ్',
    pa: 'ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਕਾਰਡ'
  },
  'Caste Certificate': {
    en: 'Caste Certificate (SC/ST/OBC)',
    hi: 'जाति प्रमाण पत्र (SC/ST/OBC)',
    te: 'కులం సర్టిఫికేట్',
    pa: 'ਜਾਤੀ ਸਰਟੀਫਿਕੇਟ'
  }
};

export function getLocalizedDocument(doc: string, lang: LanguageCode): string {
  if (!doc) return doc;
  const match = DOCUMENT_TRANSLATIONS[doc];
  if (match && match[lang]) {
    return match[lang];
  }
  return doc;
}

export function formatLocalizedExclusionReason(reason: string, lang: LanguageCode): string {
  if (lang === 'en' || !reason) return reason;

  if (lang === 'hi') {
    // 1. State mismatch
    let match = reason.match(/Wrong state — you selected (.+?), but this scheme applies to (.+?) only\./i);
    if (match) {
      const selected = getLocalizedStateName(match[1], 'hi') || match[1];
      const states = match[2].split(', ').map(s => getLocalizedStateName(s, 'hi') || s).join(', ');
      return `गलत राज्य — आपने ${selected} चुना है, लेकिन यह योजना केवल ${states} के लिए लागू है।`;
    }

    // 2. Crop mismatch
    match = reason.match(/Crop mismatch — you listed (.+?), but scheme is targeted for (.+?)\./i);
    if (match) {
      return `फसल बेमेल — आपने ${match[1]} चुनी है, लेकिन यह योजना केवल ${match[2]} के लिए लक्षित है।`;
    }

    // 3. Min land
    match = reason.match(/Land size below minimum limit of (.+?) ha \(you have (.+?) ha\)\./i);
    if (match) {
      return `भूमि का आकार न्यूनतम सीमा ${match[1]} हेक्टेयर से कम है (आपके पास ${match[2]} हेक्टेयर है)।`;
    }

    // 4. Max land
    match = reason.match(/Land size exceeds maximum limit of (.+?) ha \(you have (.+?) ha \/ (.+?) acres\)\./i);
    if (match) {
      return `भूमि का आकार अधिकतम सीमा ${match[1]} हेक्टेयर से अधिक है (आपके पास ${match[2]} हेक्टेयर / ${match[3]} एकड़ है)।`;
    }

    // 5. Category mismatch
    match = reason.match(/Category mismatch — your category is (.+?), but scheme eligible categories are (.+?)\./i);
    if (match) {
      return `श्रेणी बेमेल — आपकी श्रेणी ${match[1]} है, लेकिन पात्र श्रेणियां ${match[2]} हैं।`;
    }
  }

  return reason;
}
