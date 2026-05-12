import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { TRANSLATIONS } from "./translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "mbp_lang";

function interpolate(str, vars) {
  if (str == null || typeof str !== "string") return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) => (vars && vars[k] != null ? String(vars[k]) : ""));
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    return stored === "hi" || stored === "en" ? stored : "en";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang === "hi" ? "hi" : "en";
    root.classList.toggle("lang-hi", lang === "hi");
    root.classList.toggle("lang-en", lang === "en");
    document.title = TRANSLATIONS[lang]?.seo?.title || TRANSLATIONS.en?.seo?.title || document.title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", TRANSLATIONS[lang]?.seo?.description || TRANSLATIONS.en?.seo?.description || "");
  }, [lang]);

  const setLanguage = useCallback((next) => {
    const safe = next === "hi" ? "hi" : "en";
    setLang(safe);
    try {
      window.localStorage.setItem(STORAGE_KEY, safe);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key, vars) => {
      const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
      const raw = key.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), dict);
      if (raw == null) {
        const fallback = key.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), TRANSLATIONS.en);
        return interpolate(fallback ?? key, vars);
      }
      return interpolate(raw, vars);
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLanguage, t }), [lang, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
