"use client";

import { useState, useEffect } from "react";
import { Language, getLanguage, setLanguage as setLang } from "@/lib/i18n";
import { pt } from "@/content/copy.pt";
import { en } from "@/content/copy.en";

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>("pt");

  useEffect(() => {
    setLanguageState(getLanguage());
  }, []);

  const setLanguage = (lang: Language) => {
    setLang(lang);
    setLanguageState(lang);
    window.location.reload(); // Refresh to apply language change
  };

  const t = language === "pt" ? pt : en;

  return { language, setLanguage, t };
}

