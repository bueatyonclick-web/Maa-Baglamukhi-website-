import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";

function LanguageToggle() {
  const { lang, setLanguage, t } = useLanguage();

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-amber-400/35 bg-black/45 px-1.5 py-1 text-xs shadow-[0_0_20px_rgba(212,160,23,0.18)] backdrop-blur-md sm:text-[13px]"
      role="group"
      aria-label={t("lang.label")}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-2.5 py-1 font-cinzel tracking-[0.14em] transition-colors min-h-[32px] sm:min-h-[34px] sm:px-3 ${
          lang === "en"
            ? "bg-gradient-to-br from-amber-300/40 to-amber-600/30 text-amber-100 border border-amber-300/45 shadow-[0_0_14px_rgba(244,208,111,0.22)]"
            : "text-white/70 hover:text-white"
        }`}
        aria-pressed={lang === "en"}
        aria-label="Switch to English"
      >
        {t("lang.en")}
      </button>
      <span className="select-none px-0.5 text-white/35" aria-hidden>
        -
      </span>
      <button
        type="button"
        onClick={() => setLanguage("hi")}
        className={`rounded-full px-2.5 py-1 font-deva tracking-wide transition-colors min-h-[32px] sm:min-h-[34px] sm:px-3 ${
          lang === "hi"
            ? "bg-gradient-to-br from-amber-300/40 to-amber-600/30 text-amber-100 border border-amber-300/45 shadow-[0_0_14px_rgba(244,208,111,0.22)]"
            : "text-white/70 hover:text-white"
        }`}
        aria-pressed={lang === "hi"}
        aria-label="Switch to Hindi"
      >
        {t("lang.hi")}
      </button>
    </div>
  );
}

export default React.memo(LanguageToggle);
