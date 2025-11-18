export type Language = "pt" | "en";

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
];

export function getLanguage(): Language {
  if (typeof window === "undefined") return "pt";
  const stored = localStorage.getItem("language");
  return (stored as Language) || "pt";
}

export function setLanguage(lang: Language): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", lang);
  }
}

