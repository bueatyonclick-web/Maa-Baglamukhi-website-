import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/40 px-4 py-2 shadow-[0_0_34px_rgba(212,160,23,0.24)] backdrop-blur-md">
      <span className="hidden text-[12px] font-cinzel tracking-[0.3em] text-white/75 lg:inline">{t("lang.label")}</span>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-5 py-2.5 text-sm leading-normal font-cinzel tracking-[0.22em] transition-colors min-h-[44px] ${
          lang === "en"
            ? "bg-gradient-to-br from-amber-300/40 to-amber-600/30 text-amber-100 border border-amber-300/45 shadow-[0_0_24px_rgba(244,208,111,0.32)]"
            : "text-white/75 hover:text-white"
        }`}
        aria-label="Switch to English"
      >
        {t("lang.en")}
      </button>
      <button
        type="button"
        onClick={() => setLanguage("hi")}
        className={`rounded-full px-5 py-2.5 text-sm leading-normal font-deva tracking-wide transition-colors min-h-[44px] ${
          lang === "hi"
            ? "bg-gradient-to-br from-amber-300/40 to-amber-600/30 text-amber-100 border border-amber-300/45 shadow-[0_0_24px_rgba(244,208,111,0.32)]"
            : "text-white/75 hover:text-white"
        }`}
        aria-label="Switch to Hindi"
      >
        {t("lang.hi")}
      </button>
    </div>
  );
}
