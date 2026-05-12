import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";

function QuoteParticles() {
  const dots = Array.from({ length: 32 }, (_, i) => ({
    id: i,
    left: `${(i * 9.7) % 100}%`,
    delay: `${(i % 10) * 0.7}s`,
    duration: `${16 + (i % 7)}s`,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute top-full h-1 w-1 rounded-full bg-saffron-400/50 shadow-[0_0_10px_rgba(245,158,11,0.7)] animate-float-up"
          style={{ left: d.left, animationDelay: d.delay, animationDuration: d.duration }}
        />
      ))}
    </div>
  );
}

export default function AboutSpiritualQuote() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  return (
    <section className="relative overflow-hidden py-28 lg:py-36" aria-label={t("aboutQuote.label")}>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800/80 to-ink-900" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div
          className="absolute bottom-0 left-1/2 h-[55%] w-[90%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.5),transparent_70%)] blur-3xl"
          aria-hidden
        />
      </div>
      <QuoteParticles />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen animate-smoke-drift bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,255,255,0.25),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-10" data-about-reveal>
        <p className={`text-saffron-300/85 ${isHi ? "font-deva text-sm tracking-[0.2em] md:text-base" : "font-cinzel text-xs tracking-[0.55em]"}`}>
          {t("aboutQuote.label")}
        </p>
        <blockquote className="mt-8 font-deva text-2xl leading-[1.55] text-white/95 sm:text-3xl md:text-4xl lg:text-[2.35rem]">
          या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता
        </blockquote>
        <p className="mx-auto mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-white/75 md:text-2xl">{t("aboutQuote.translation")}</p>
        <p className="mt-4 text-sm text-white/45">{t("aboutQuote.note")}</p>
      </div>
    </section>
  );
}
