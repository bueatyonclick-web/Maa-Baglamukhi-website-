import React, { memo, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Bell, Flame } from "lucide-react";
import { BOKEH_IMAGE } from "../../../data/content";
import { useLanguage } from "../../../i18n/LanguageContext";

function SacredFireParticles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${(i * 8.7) % 100}%`,
        bottom: `${(i * 11) % 40}%`,
        delay: (i % 8) * 0.4,
        dur: 3 + (i % 5),
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute h-1 w-1 rounded-full bg-amber-400/90 shadow-[0_0_12px_rgba(251,191,36,0.9)]"
          style={{ left: d.left, bottom: d.bottom }}
          animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -28, -56], scale: [0.8, 1.2, 0.6] }}
          transition={{ duration: d.dur, repeat: Infinity, ease: "easeOut", delay: d.delay }}
        />
      ))}
    </div>
  );
}

function ExperienceDivineEnergy() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      id="about-experience"
      ref={ref}
      className="relative scroll-mt-28 overflow-hidden py-28 lg:scroll-mt-32 lg:py-40"
      aria-labelledby="about-experience-heading"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <img src={BOKEH_IMAGE} alt="" className="h-full w-full object-cover opacity-25" loading="lazy" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0f0f0f]/95 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(245,158,11,0.15),transparent_60%)]" />
      <SacredFireParticles />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={isHi ? "font-deva text-sm tracking-[0.2em] text-amber-300/90" : "font-cinzel text-xs tracking-[0.5em] text-amber-300/90"}>
            {t("aboutExperience.label")}
          </p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-4">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10 shadow-[0_0_40px_rgba(245,158,11,0.35)]"
              title={t("aboutExperience.bellsLabel")}
            >
              <Bell className="h-7 w-7 text-amber-300" aria-hidden />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/40 bg-gradient-to-br from-amber-600/30 to-amber-900/20 shadow-[0_0_50px_rgba(245,158,11,0.4)]"
            >
              <Flame className="h-7 w-7 text-amber-200" aria-hidden />
            </motion.div>
          </div>

          <h2
            id="about-experience-heading"
            className={`mt-8 text-4xl text-white sm:text-5xl lg:text-6xl ${isHi ? "font-deva leading-snug" : "font-serif"}`}
          >
            <span className="text-gold-shimmer">{t("aboutExperience.heading")}</span>
          </h2>

          <p className={`mx-auto mt-6 max-w-2xl font-deva text-lg leading-relaxed text-amber-100/85 sm:text-xl`}>
            {t("aboutExperience.mantra")}
          </p>
          <p className={`mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 ${isHi ? "font-deva" : ""}`}>
            {t("aboutExperience.body")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/book-puja" className="btn-primary-sacred px-8 py-3 text-sm md:text-base">
              {t("aboutExperience.ctaBook")}
            </Link>
            <Link
              to="/live-darshan"
              className="inline-flex items-center justify-center rounded-full border border-amber-500/35 bg-black/40 px-8 py-3 text-sm text-white/90 backdrop-blur-md transition-all hover:border-amber-400/55 md:text-base"
            >
              {t("aboutExperience.ctaDarshan")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ExperienceDivineEnergy);
