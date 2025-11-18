"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { languages } from "@/lib/i18n";

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const currentIndex = languages.findIndex((l) => l.code === language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex].code);
  };

  const currentLang = languages.find((l) => l.code === language);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="w-10 h-10 transition-transform hover:scale-110"
      aria-label="Toggle language"
      title={`Current: ${currentLang?.label}`}
    >
      <Globe className="h-5 w-5" />
    </Button>
  );
}

