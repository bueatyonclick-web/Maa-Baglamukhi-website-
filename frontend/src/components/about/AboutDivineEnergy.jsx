import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Flame, Scale, Shield, Sparkles, Heart, Sun } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

const ICONS = [Flame, Scale, Shield, Sparkles, Heart, Sun];

export default function AboutDivineEnergy() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const cards = useMemo(
    () =>
      [0, 1, 2, 3, 4, 5].map((i) => ({
        icon: ICONS[i],
        title: t(`aboutEnergy.c${i}t`),
        text: t(`aboutEnergy.c${i}x`),
      })),
    [t],
  );

  return (
    <section className="relative py-24 lg:py-36" aria-labelledby="divine-energy-heading">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink-800/40 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center" data-about-reveal>
          <p className={`text-saffron-300/90 ${isHi ? "font-deva text-sm tracking-[0.2em] md:text-base" : "font-cinzel text-xs tracking-[0.5em]"}`}>
            {t("aboutEnergy.label")}
          </p>
          <h2 id="divine-energy-heading" className={`mt-5 text-4xl text-white sm:text-5xl lg:text-6xl ${isHi ? "font-deva leading-snug" : "font-serif"}`}>
            {t("aboutEnergy.titleBefore")} <span className="text-gold-shimmer italic">{t("aboutEnergy.titleAccent")}</span>
          </h2>
          <p className={`mt-5 text-lg text-white/70 ${isHi ? "font-deva leading-relaxed" : ""}`}>{t("aboutEnergy.intro")}</p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.06, duration: 0.75 }}
              whileHover={{ y: -6, transition: { duration: 0.35 } }}
              className="group relative overflow-hidden rounded-2xl glass-card p-7 transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(245,158,11,0.18)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-saffron-500/10 blur-3xl" />
              </div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-saffron-500/30 bg-saffron-500/10 text-saffron-300 transition-all duration-500 group-hover:border-saffron-400/60 group-hover:text-saffron-200">
                <c.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className={`relative mt-5 text-2xl text-white ${isHi ? "font-deva leading-snug" : "font-serif"}`}>{c.title}</h3>
              <p className={`relative mt-3 text-sm leading-relaxed text-white/65 ${isHi ? "font-deva" : ""}`}>{c.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
