"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Language, LANGUAGE_STORAGE_KEY, dictionary } from "@/lib/i18n";

type LanguageContextValue = {
  language: Language;
  dir: "ltr" | "rtl";
  toggleLanguage: () => void;
  t: typeof dictionary.en;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }): JSX.Element {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "en" || saved === "ar") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      dir: language === "ar" ? "rtl" : "ltr",
      toggleLanguage: () => setLanguage((prev) => (prev === "en" ? "ar" : "en")),
      t: dictionary[language]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
