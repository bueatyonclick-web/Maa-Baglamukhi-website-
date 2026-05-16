import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../../i18n/LanguageContext";
import { TRANSLATIONS } from "../../../i18n/translations";
import GlowDivider from "./GlowDivider";

function TimelineSection() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";

  const items = useMemo(() => {
    const list = TRANSLATIONS[lang]?.aboutTimeline?.items;
    return Array.isArray(list) ? list : [];
  }, [lang]);

  const headingClass = isHi ? "font-deva leading-snug" : "font-serif";

  return (
    <section
      id="about-timeline"
      className="relative scroll-mt-28 overflow-hidden bg-[#0a0a0a] py-24 lg:scroll-mt-32 lg:py-32"
      aria-labelledby="about-timeline-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,158,11,0.1),transparent_55%)]" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className={isHi ? "font-deva text-sm tracking-[0.2em] text-amber-300/90" : "font-cinzel text-xs tracking-[0.5em] text-amber-300/90"}>
            {t("aboutTimeline.label")}
          </p>
          <h2 id="about-timeline-heading" className={`mt-5 text-4xl text-white sm:text-5xl ${headingClass}`}>
            {t("aboutTimeline.headingBefore")}{" "}
            <span className="text-gold-shimmer italic">{t("aboutTimeline.headingAccent")}</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl text-white/65 ${isHi ? "font-deva" : ""}`}>{t("aboutTimeline.intro")}</p>
          <GlowDivider className="mx-auto mt-10" />
        </motion.div>

        <ol className="relative mt-14 border-l border-amber-500/25 pl-8 sm:pl-10">
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-amber-400/70 via-amber-500/25 to-transparent" aria-hidden />
          {items.map((item, i) => (
            <motion.li
              key={item.era}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative pb-12 last:pb-0"
            >
              <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-amber-400/60 bg-[#0f0f0f] shadow-[0_0_18px_rgba(245,158,11,0.45)]">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
              </span>
              <p className="font-cinzel text-xs tracking-[0.35em] text-amber-400/90">{item.era}</p>
              <h3 className={`mt-2 text-xl text-white sm:text-2xl ${headingClass}`}>{item.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed text-white/65 sm:text-base ${isHi ? "font-deva" : ""}`}>
                {item.text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default memo(TimelineSection);
