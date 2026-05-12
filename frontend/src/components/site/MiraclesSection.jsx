import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export default function MiraclesSection() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const stories = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => ({
        text: t(`miracles.m${i}`),
        name: t(`miracles.n${i}`),
        city: t(`miracles.c${i}`),
      })),
    [t],
  );

  return (
    <section className="relative py-24 lg:py-32 mandala-bg" data-testid="miracles-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <p className={`mb-5 text-saffron-300 ${isHi ? "font-deva text-sm tracking-[0.2em] md:text-base" : "font-cinzel text-xs tracking-[0.5em]"}`}>
              {t("miracles.label")}
            </p>
            <h2 className={`text-4xl text-white lg:text-5xl ${isHi ? "font-deva leading-snug" : "font-serif leading-tight"}`}>
              {t("miracles.titleBefore")} <span className="text-gold-shimmer italic">{t("miracles.titleAccent")}</span>{" "}
              {t("miracles.titleAfter")}
            </h2>
            <p className={`mt-5 text-white/70 leading-relaxed ${isHi ? "font-deva text-base" : ""}`}>{t("miracles.blurb")}</p>
            <a href="#contact" className="btn-ghost-sacred mt-7 inline-flex" data-testid="share-story-btn">
              {t("miracles.shareStory")}
            </a>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {stories.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 glass-card hover:border-saffron-400 transition-all ${i % 2 === 0 ? "sm:mt-10" : ""}`}
                data-testid={`miracle-card-${i}`}
              >
                <Quote className="w-7 h-7 text-saffron-400/70 mb-3" />
                <p className={`text-white/85 italic leading-relaxed ${isHi ? "font-deva text-[15px] md:text-base" : "text-sm"}`}>
                  &ldquo;{m.text}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-saffron-500/15">
                  <p className={isHi ? "font-deva text-base text-saffron-200" : "font-serif text-base text-saffron-200"}>
                    {m.name}
                  </p>
                  <p className={`text-white/50 tracking-wide ${isHi ? "font-deva text-sm leading-snug" : "text-xs"}`}>{m.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
