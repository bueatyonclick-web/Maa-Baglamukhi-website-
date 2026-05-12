import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ABOUT_IMAGE, FLOWER_IMAGE } from "../../data/content";
import { useLanguage } from "../../i18n/LanguageContext";

export default function AboutTempleSection() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const timeline = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => ({
        year: t(`aboutTemple.t${i}y`),
        title: t(`aboutTemple.t${i}t`),
        text: t(`aboutTemple.t${i}x`),
      })),
    [t],
  );

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[560px]"
          >
            <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(245,158,11,0.25)] border border-saffron-500/20">
              <img src={ABOUT_IMAGE} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-2xl overflow-hidden border border-saffron-500/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
              <img src={FLOWER_IMAGE} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full border border-saffron-500/30 animate-spin-slow" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full border border-saffron-500/20 animate-spin-slow" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p
              className={`mb-5 text-saffron-300 ${
                isHi ? "font-deva text-sm leading-relaxed tracking-[0.18em] md:text-base" : "font-cinzel text-xs tracking-[0.5em]"
              }`}
            >
              {t("aboutTemple.label")}
            </p>
            <h2
              className={`text-4xl text-white sm:text-5xl lg:text-6xl ${isHi ? "font-deva leading-snug" : "font-serif leading-tight"}`}
            >
              {t("aboutTemple.titleBefore")} <span className="text-gold-shimmer italic">{t("aboutTemple.titleAccent")}</span>
            </h2>
            <p className={`mt-6 text-lg leading-relaxed text-white/70 ${isHi ? "font-deva" : ""}`}>{t("aboutTemple.p1")}</p>
            <p className={`mt-4 leading-relaxed text-white/60 ${isHi ? "font-deva text-base" : ""}`}>{t("aboutTemple.p2")}</p>

            <div className="mt-10 space-y-5">
              {timeline.map((row, i) => (
                <motion.div
                  key={row.year}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-5"
                  data-testid={`timeline-item-${i}`}
                >
                  <div className="w-20 shrink-0 text-right">
                    <p
                      className={`text-saffron-400 ${isHi ? "font-deva text-sm leading-snug tracking-wide" : "font-cinzel text-sm tracking-wider"}`}
                    >
                      {row.year}
                    </p>
                  </div>
                  <div className="w-px bg-gradient-to-b from-saffron-500/50 to-transparent" />
                  <div>
                    <p className={`text-xl text-white ${isHi ? "font-deva leading-snug" : "font-serif"}`}>{row.title}</p>
                    <p className={`mt-1 text-sm leading-relaxed text-white/60 ${isHi ? "font-deva" : ""}`}>{row.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
