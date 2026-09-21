import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LanguageOption, TranslationDictionary } from '../i18n/types';
import { LANGUAGES, translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('oplast_garden_lang') as Language | null;
      if (saved && (saved === 'pl' || saved === 'en' || saved === 'de')) {
        return saved;
      }
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'de') return 'de';
      if (browserLang === 'en') return 'en';
      return 'pl';
    } catch {
      return 'pl';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('oplast_garden_lang', lang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language] || translations.pl,
    languages: LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
