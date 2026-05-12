import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export default function AboutSacredRituals() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const rituals = useMemo(
    () =>
      [0, 1, 2, 3, 4, 5].map((i) => ({
        name: t(`aboutRituals.r${i}n`),
        meaning: t(`aboutRituals.r${i}m`),
        duration: t(`aboutRituals.r${i}d`),
        benefits: t(`aboutRituals.r${i}b`),
      })),
    [t],
  );

  return (
    <section className="relative py-24 lg:py-36" aria-labelledby="sacred-rituals-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(245,158,11,0.08),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center" data-about-reveal>
          <p className={`text-saffron-300/90 ${isHi ? "font-deva text-sm tracking-[0.2em] md:text-base" : "font-cinzel text-xs tracking-[0.5em]"}`}>
            {t("aboutRituals.label")}
          </p>
          <h2 id="sacred-rituals-heading" className={`mt-4 text-4xl text-white sm:text-5xl lg:text-6xl ${isHi ? "font-deva leading-snug" : "font-serif"}`}>
            {t("aboutRituals.titleBefore")} <span className="text-gold-shimmer italic">{t("aboutRituals.titleAccent")}</span>
          </h2>
          <p className={`mt-4 text-lg text-white/65 ${isHi ? "font-deva leading-relaxed" : ""}`}>{t("aboutRituals.sub")}</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {rituals.map((r, i) => (
            <motion.article
              key={`ritual-${i}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-saffron-500/20 bg-ink-800/40 p-8 backdrop-blur-xl transition-all duration-500 hover:border-saffron-400/40 hover:shadow-[0_0_45px_rgba(245,158,11,0.15)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-saffron-500/10 blur-3xl" />
              </div>
              <h3 className={`relative text-2xl text-white md:text-3xl ${isHi ? "font-deva leading-snug" : "font-serif"}`}>{r.name}</h3>
              <p className={`relative mt-3 text-white/70 ${isHi ? "font-deva leading-relaxed" : ""}`}>{r.meaning}</p>
              <div className={`relative mt-5 flex flex-wrap gap-4 text-sm text-white/55 ${isHi ? "font-deva" : ""}`}>
                <span className="inline-flex items-center gap-2 rounded-full border border-saffron-500/20 bg-ink-900/50 px-3 py-1">
                  <Clock className="h-3.5 w-3.5 text-saffron-400" />
                  {r.duration}
                </span>
              </div>
              <p className="relative mt-4 text-sm leading-relaxed text-white/60">{r.benefits}</p>
              <Link
                to="/book-puja"
                className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-saffron-300 transition-colors hover:text-saffron-200"
              >
                {t("aboutRituals.enquire")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
