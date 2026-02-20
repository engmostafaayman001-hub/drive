'use client';

import { dictionaries, Language } from '@/lib/i18n';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  direction: 'ltr' | 'rtl';
  t: typeof dictionaries.en.labels;
};

const LANGUAGE_STORAGE_KEY = 'language';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }): JSX.Element {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'en' || stored === 'ar') {
      setLanguageState(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.dir = dictionaries[language].direction;
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageState,
      direction: dictionaries[language].direction,
      t: dictionaries[language].labels
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
