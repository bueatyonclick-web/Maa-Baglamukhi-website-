import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { TRANSLATIONS } from "./translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "mbp_lang";

function interpolate(str, vars) {
  if (str == null || typeof str !== "string") return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) => (vars && vars[k] != null ? String(vars[k]) : ""));
}

function setOrCreateMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
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

    const title = TRANSLATIONS[lang]?.seo?.title || TRANSLATIONS.en?.seo?.title || document.title;
    const desc =
      TRANSLATIONS[lang]?.seo?.description || TRANSLATIONS.en?.seo?.description || "";
    document.title = title;

    setOrCreateMeta("name", "description", desc);
    setOrCreateMeta("property", "og:title", title);
    setOrCreateMeta("property", "og:description", desc);
    setOrCreateMeta("property", "og:locale", lang === "hi" ? "hi_IN" : "en_IN");
    setOrCreateMeta("name", "twitter:title", title);
    setOrCreateMeta("name", "twitter:description", desc);
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
