import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Flame, Landmark, Sparkles, Users, BookOpen } from "lucide-react";
import { ABOUT_PAGE_MAA_IMAGE, BOOK_PUJA_MAA_FALLBACK } from "../../data/content";
import { useLanguage } from "../../i18n/LanguageContext";

export default function AboutMainSection() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const [imgSrc, setImgSrc] = useState(ABOUT_PAGE_MAA_IMAGE);

  const stats = [
    { Icon: Users, value: "100K+", label: t("aboutMain.statDevotees") },
    { Icon: Flame, value: "25K+", label: t("aboutMain.statPujas") },
    { Icon: BookOpen, value: "50+", label: t("aboutMain.statPandits") },
    { Icon: Award, value: "20+", label: t("aboutMain.statSeva") },
  ];

  const highlights = [
    { Icon: Landmark, title: t("aboutMain.h1Title"), text: t("aboutMain.h1Text") },
    { Icon: Flame, title: t("aboutMain.h2Title"), text: t("aboutMain.h2Text") },
    { Icon: Sparkles, title: t("aboutMain.h3Title"), text: t("aboutMain.h3Text") },
  ];

  return (
    <section
      id="about-legend"
      className="relative scroll-mt-28 overflow-hidden bg-[#070605] py-20 lg:scroll-mt-32 lg:py-28"
      aria-labelledby="about-legend-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(245,158,11,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(180,83,9,0.06),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(135deg,rgba(251,191,36,0.15)_0%,transparent_40%,transparent_60%,rgba(251,191,36,0.08)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10" data-about-reveal>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
          {/* Left: label, copy, stats */}
          <div className="flex flex-col lg:col-span-4">
            <p
              className={`flex items-center gap-3 text-saffron-400/90 ${
                isHi
                  ? "font-deva text-sm tracking-[0.2em] leading-relaxed md:text-[0.95rem]"
                  : "font-cinzel text-[11px] tracking-[0.45em] md:text-xs"
              }`}
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-saffron-500/50" aria-hidden />
              {t("aboutMain.aboutUs")}
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-saffron-500/50" aria-hidden />
            </p>

            <h2
              id="about-legend-heading"
              className={`mt-6 text-3xl sm:text-4xl lg:text-[2.35rem] leading-snug ${
                isHi
                  ? "font-deva text-amber-100 [text-shadow:0_1px_0_rgba(180,83,9,0.5),0_0_36px_rgba(251,191,36,0.2)]"
                  : "font-serif text-transparent bg-gradient-to-b from-amber-100 via-amber-200 to-amber-700/95 bg-clip-text"
              }`}
            >
              {t("aboutMain.heading")}
            </h2>

            <div
              className={`mt-6 space-y-4 text-[15px] leading-relaxed text-white/78 md:text-base ${isHi ? "font-deva" : ""}`}
            >
              <p>{t("aboutMain.p1")}</p>
              <p>{t("aboutMain.p2")}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-8">
              {stats.map(({ Icon, value, label }) => (
                <div key={label} className="text-left">
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-saffron-500/25 bg-saffron-500/10 text-saffron-300">
                    <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  </div>
                  <p className="font-serif text-2xl text-amber-200/95 md:text-3xl">{value}</p>
                  <p className={`mt-1 tracking-wide text-white/50 ${isHi ? "font-deva text-sm leading-snug" : "text-xs"}`}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Maa Baglamukhi */}
          <motion.div
            className="relative lg:col-span-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative mx-auto aspect-[3/4] max-h-[min(72vh,560px)] w-full max-w-md overflow-hidden rounded-2xl border border-saffron-500/25 bg-ink-800/40 shadow-[0_40px_120px_-40px_rgba(245,158,11,0.25)] lg:max-h-none lg:max-w-none">
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-saffron-400/15" />
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-saffron-500/10 via-transparent to-transparent opacity-60" />
              <img
                src={imgSrc}
                alt="Śrī Maa Bagalamukhī — divine presence at the Peeth"
                className="h-full w-full object-cover object-[center_15%]"
                loading="lazy"
                decoding="async"
                onError={() => {
                  if (imgSrc !== BOOK_PUJA_MAA_FALLBACK) setImgSrc(BOOK_PUJA_MAA_FALLBACK);
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070605]/90 via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>

          {/* Right: highlights */}
          <div className="flex flex-col gap-8 lg:col-span-4">
            {highlights.map(({ Icon, title, text }, i) => (
              <motion.div
                key={title}
                className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-colors hover:border-saffron-500/20 hover:bg-white/[0.04] md:p-6"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-saffron-500/30 bg-gradient-to-br from-saffron-500/20 to-transparent text-saffron-300">
                  <Icon className="h-5 w-5" strokeWidth={1.35} aria-hidden />
                </div>
                <div>
                  <h3 className={`text-xl text-amber-200/95 md:text-2xl ${isHi ? "font-deva leading-snug" : "font-serif"}`}>{title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed text-white/65 md:text-[15px] ${isHi ? "font-deva" : ""}`}>{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
