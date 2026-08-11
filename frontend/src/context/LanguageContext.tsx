import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LanguageCode, TranslationSchema } from '../i18n/translations';
import { translations, SUPPORTED_LANGUAGES } from '../i18n/translations';

const STORAGE_KEY = 'krishi_match_language';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
        return saved as LanguageCode;
      }
    } catch (e) {
      console.warn('Failed to read language preference from localStorage:', e);
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.warn('Failed to save language preference to localStorage:', e);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const currentTranslations = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
