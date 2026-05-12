import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  Ban,
  BookMarked,
  Brain,
  Flame,
  Landmark,
  Scale,
  ScrollText,
  Shield,
  ShieldAlert,
  ShieldHalf,
  Sparkles,
  Users,
} from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

const IMG = `${process.env.PUBLIC_URL || ""}/about-maa-baglamukhi-peeth.png`;

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
};

function AmbientLayer() {
  const orbs = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${(i * 19 + 8) % 90}%`,
        top: `${(i * 27) % 85}%`,
        s: 100 + (i % 4) * 55,
        d: 9 + (i % 6),
        del: (i % 7) * 0.35,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#070403]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(212,160,23,0.12),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(120,53,15,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_100%_30%,rgba(244,208,111,0.06),transparent_48%)]" />
      {orbs.map((o) => (
        <motion.div
          key={o.id}
          className="absolute rounded-full bg-amber-500/[0.035] blur-3xl"
          style={{
            left: o.left,
            top: o.top,
            width: o.s,
            height: o.s,
            marginLeft: -o.s / 2,
            marginTop: -o.s / 2,
          }}
          animate={{ opacity: [0.2, 0.5, 0.25], scale: [1, 1.06, 1] }}
          transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut", delay: o.del }}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,4,3,0.2)_0%,#0a0505_45%,#120905_100%)]" />
    </div>
  );
}

function FloatingParticles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 6.9) % 100}%`,
        delay: `${(i % 11) * 0.32}s`,
        dur: `${16 + (i % 9)}s`,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute top-full h-0.5 w-0.5 rounded-full bg-amber-200/80 shadow-[0_0_10px_rgba(251,191,36,0.9)] animate-float-up"
          style={{ left: d.left, animationDelay: d.delay, animationDuration: d.dur }}
        />
      ))}
    </div>
  );
}

function YantraMandala({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="200" cy="200" r="180" stroke="url(#yl)" strokeWidth="0.5" opacity="0.35" />
      <circle cx="200" cy="200" r="140" stroke="url(#yl)" strokeWidth="0.4" opacity="0.28" />
      <circle cx="200" cy="200" r="100" stroke="url(#yl)" strokeWidth="0.35" opacity="0.22" />
      <circle cx="200" cy="200" r="60" stroke="url(#yl)" strokeWidth="0.3" opacity="0.18" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1="200"
          y1="40"
          x2="200"
          y2="360"
          stroke="url(#yl)"
          strokeWidth="0.35"
          opacity="0.2"
          transform={`rotate(${i * 45} 200 200)`}
        />
      ))}
      <defs>
        <linearGradient id="yl" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4D06F" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D4A017" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const MAHA_ICONS = [BookMarked, Sparkles, Users, Landmark, ScrollText];

const WHY_ICONS = [ShieldHalf, Scale, Ban, Sparkles, Brain, Shield, Award, ShieldAlert];

export default function AboutDivineLegacy() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const mahaSteps = useMemo(
    () =>
      [1, 2, 3, 4, 5].map((n, i) => ({
        Icon: MAHA_ICONS[i],
        title: t(`divineLegacy.mT${n}t`),
        desc: t(`divineLegacy.mT${n}d`),
      })),
    [t]
  );

  const rishiCards = useMemo(
    () =>
      [1, 2, 3, 4, 5].map((n) => ({
        title: t(`divineLegacy.rC${n}t`),
        desc: t(`divineLegacy.rC${n}d`),
      })),
    [t]
  );

  const whyItems = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ text: t(`divineLegacy.w${n}`), Icon: WHY_ICONS[n - 1] })), [t]);

  const labelClass = isHi ? "font-deva text-sm tracking-[0.2em] text-amber-300/90 md:text-base" : "font-cinzel text-xs tracking-[0.42em] text-amber-300/90 md:text-sm";
  const headingClass = isHi
    ? "font-deva text-3xl leading-snug text-[#FFF8E7] sm:text-4xl md:text-5xl lg:text-[3.1rem]"
    : "font-playfair text-3xl text-[#FFF8E7] sm:text-4xl md:text-5xl lg:text-[3.1rem] lg:leading-tight";
  const bodyClass = `font-inter text-[15px] leading-relaxed text-white/72 md:text-base ${isHi ? "font-deva" : ""}`;
  const cardTitle = isHi ? "font-deva text-lg text-amber-200/95 md:text-xl" : "font-serif text-lg text-amber-200/95 md:text-xl";

  return (
    <section
      id="divine-legacy"
      className="relative overflow-hidden border-y border-amber-500/15 bg-[#070403] py-20 md:py-28 lg:py-32"
      aria-labelledby="divine-legacy-heading"
    >
      <AmbientLayer />
      <FloatingParticles />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-soft-light animate-smoke-drift bg-[radial-gradient(ellipse_at_40%_60%,rgba(251,191,36,0.25),transparent_55%)]"
        aria-hidden
      />
      <YantraMandala className="pointer-events-none absolute -right-20 top-1/4 h-[min(90vw,520px)] w-[min(90vw,520px)] opacity-[0.12] md:right-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.header className="mx-auto max-w-3xl text-center" {...fadeUp}>
          <p className={labelClass}>{t("divineLegacy.label")}</p>
          <h2 id="divine-legacy-heading" className={`mt-5 ${headingClass}`}>
            {t("divineLegacy.heading")}
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl ${bodyClass}`}>{t("divineLegacy.subtitle")}</p>
          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/60" />
            <span className="text-amber-400/80">ॐ</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/60" />
          </div>
        </motion.header>

        {/* Section 1 — Trishakti split */}
        <motion.div className="mt-20 grid items-center gap-12 lg:mt-28 lg:grid-cols-2 lg:gap-16" {...fadeUp}>
          <div ref={parallaxRef} className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-amber-500/25 via-amber-600/10 to-transparent opacity-70 blur-2xl" aria-hidden />
            <motion.div style={{ y: imgY }} className="relative overflow-hidden rounded-3xl border border-amber-500/25 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(251,191,36,0.08)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#070403]/90 via-transparent to-[#070403]/30" />
              <img
                src={IMG}
                alt={lang === "hi" ? "माँ बगलामुखी त्रिशक्ति मूर्ति, नलखेड़ा सिद्ध पीठ" : "Maa Baglamukhi Trishakti murti at Nalkheda Siddha Peeth"}
                className="aspect-[4/5] w-full object-cover object-center md:aspect-[3/4]"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,rgba(255,246,229,0.04)_50%,transparent_60%)] bg-[length:200%_100%] animate-havan-border-shine opacity-40" />
            </motion.div>
            <motion.div
              className="absolute -bottom-6 left-8 right-8 h-16 rounded-full bg-amber-500/15 blur-2xl"
              animate={{ opacity: [0.35, 0.6, 0.35], scaleX: [0.92, 1, 0.92] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          </div>

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-[#120905]/75 p-8 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,246,229,0.06)] backdrop-blur-2xl md:p-10"
          >
            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" aria-hidden />
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            <h3 className={`font-playfair text-2xl text-[#F4D06F] md:text-3xl ${isHi ? "font-deva" : ""}`}>{t("divineLegacy.triHeading")}</h3>
            <p className={`mt-5 ${bodyClass}`}>{t("divineLegacy.triP1")}</p>
            <p className={`mt-4 text-sm font-medium uppercase tracking-[0.2em] text-amber-400/80 ${isHi ? "font-deva normal-case tracking-wide" : "font-cinzel"}`}>
              {t("divineLegacy.triP2")}
            </p>
            <ul className="mt-4 space-y-3 border-l border-amber-500/30 pl-5">
              {[1, 2, 3].map((n) => (
                <li key={n} className={`flex items-start gap-2 ${bodyClass}`}>
                  <Flame className="mt-1 h-4 w-4 shrink-0 text-amber-400" aria-hidden />
                  <span>{t(`divineLegacy.triB${n}`)}</span>
                </li>
              ))}
            </ul>
            <div className="my-8 h-px bg-gradient-to-r from-transparent via-amber-500/35 to-transparent" />
            <p className={bodyClass}>{t("divineLegacy.triP3")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["॥", "ॐ", "॥"].map((s, i) => (
                <span key={i} className="rounded-full border border-amber-500/25 bg-black/30 px-3 py-1 font-cinzel text-xs text-amber-200/80">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Section 2 — Mahabharata */}
        <motion.div className="relative mt-24 md:mt-32" {...fadeUp}>
          <div className="absolute left-1/2 top-0 h-px w-[min(90%,720px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" aria-hidden />
          <div className="mx-auto max-w-3xl text-center">
            <h3 className={`mt-16 font-playfair text-2xl text-[#FFF8E7] sm:text-3xl md:text-4xl ${isHi ? "font-deva" : ""}`}>{t("divineLegacy.mahaHeading")}</h3>
            <p className={`mt-5 ${bodyClass}`}>{t("divineLegacy.mahaIntro1")}</p>
            <p className={`mt-4 ${bodyClass}`}>{t("divineLegacy.mahaIntro2")}</p>
            <p className={`mt-6 text-sm font-medium text-amber-300/90 ${isHi ? "font-deva text-base" : "font-cinzel tracking-[0.2em]"}`}>{t("divineLegacy.mahaListLead")}</p>
            <ul className="mx-auto mt-4 flex max-w-xl flex-col gap-2 text-left sm:mx-auto sm:max-w-lg">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className={`flex items-center gap-3 rounded-xl border border-amber-500/15 bg-black/25 px-4 py-2.5 ${bodyClass}`}>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-500/15 text-amber-300">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  {t(`divineLegacy.mahaL${n}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute left-[22px] top-0 bottom-8 w-px bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent md:left-8" aria-hidden />
            <ul className="space-y-8 md:space-y-10">
              {mahaSteps.map(({ Icon, title, desc }, i) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ delay: i * 0.06, duration: 0.55 }}
                  className="relative flex gap-5 md:gap-8"
                >
                  <div className="relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-500/40 bg-gradient-to-br from-[#1a0f0c] to-[#070403] shadow-[0_0_28px_rgba(245,158,11,0.2)] md:h-16 md:w-16 md:rounded-2xl">
                    <Icon className="h-5 w-5 text-amber-300 md:h-6 md:w-6" strokeWidth={1.25} />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.01, y: -3 }}
                    className="flex-1 rounded-2xl border border-amber-500/18 bg-[#120905]/70 p-6 shadow-[inset_0_1px_0_rgba(255,246,229,0.05)] backdrop-blur-md md:p-7"
                  >
                    <p className={cardTitle}>{title}</p>
                    <p className={`mt-2 text-sm leading-relaxed text-white/65 md:text-[15px] ${isHi ? "font-deva" : "font-inter"}`}>{desc}</p>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Section 3 — Rishi-Muni */}
        <motion.div className="relative mt-24 overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-b from-[#120905]/90 to-[#070403]/95 p-8 shadow-[0_32px_100px_-36px_rgba(0,0,0,0.9)] backdrop-blur-xl md:mt-32 md:p-12" {...fadeUp}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-screen animate-smoke-drift bg-[radial-gradient(ellipse_at_30%_80%,rgba(251,191,36,0.35),transparent_50%)]" aria-hidden />
          <YantraMandala className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 opacity-20 md:h-80 md:w-80" />
          <div className="relative z-10">
            <h3 className={`text-center font-playfair text-2xl text-[#F4D06F] sm:text-3xl md:text-4xl ${isHi ? "font-deva" : ""}`}>{t("divineLegacy.rishiHeading")}</h3>
            <p className={`mx-auto mt-5 max-w-3xl text-center ${bodyClass}`}>{t("divineLegacy.rishiP1")}</p>
            <p className={`mt-4 text-center text-sm font-medium text-amber-400/85 ${isHi ? "font-deva text-base" : "font-cinzel tracking-[0.22em]"}`}>{t("divineLegacy.rishiP2")}</p>

            <div className="mt-10 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
              {rishiCards.map(({ title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="min-w-[220px] flex-1 rounded-2xl border border-amber-500/20 bg-black/35 p-5 shadow-[0_16px_48px_-24px_rgba(0,0,0,0.85)] md:min-w-0"
                >
                  <div className="mb-3 inline-flex rounded-lg border border-amber-500/25 bg-amber-500/10 p-2 text-amber-300">
                    <Flame className="h-4 w-4" />
                  </div>
                  <p className={`font-serif text-base text-amber-100 ${isHi ? "font-deva text-lg" : ""}`}>{title}</p>
                  <p className={`mt-2 text-xs leading-relaxed text-white/58 md:text-sm ${isHi ? "font-deva" : "font-inter"}`}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 4 — Why worship */}
        <motion.div className="mt-24 md:mt-32" {...fadeUp}>
          <h3 className={`text-center font-playfair text-2xl text-[#FFF8E7] sm:text-3xl md:text-4xl ${isHi ? "font-deva" : ""}`}>{t("divineLegacy.whyHeading")}</h3>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyItems.map(({ text, Icon }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -5, boxShadow: "0 24px 50px -20px rgba(245,158,11,0.25)" }}
                className="group relative overflow-hidden rounded-2xl border border-amber-500/20 bg-[#120905]/75 p-5 backdrop-blur-md"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(212,160,23,0.12), transparent 45%)" }} />
                <div className="relative flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-500/35 bg-gradient-to-br from-amber-500/25 to-amber-800/20 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                    <Icon className="h-5 w-5" strokeWidth={1.35} />
                  </span>
                  <p className={`pt-1.5 font-inter text-sm font-medium leading-snug text-white/88 md:text-[15px] ${isHi ? "font-deva" : ""}`}>{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section 5 — Quote */}
        <motion.figure
          className="relative mx-auto mt-24 max-w-3xl md:mt-32"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(212,160,23,0.18),transparent_65%)] blur-2xl" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-[clamp(6rem,22vw,14rem)] font-serif leading-none text-amber-500/[0.06] select-none">
            ॐ
          </div>
          <blockquote className="relative rounded-3xl border border-amber-500/25 bg-[#0c0807]/85 px-8 py-12 text-center shadow-[0_0_0_1px_rgba(251,191,36,0.06),0_40px_100px_-40px_rgba(0,0,0,0.75)] backdrop-blur-xl md:px-14 md:py-14">
            <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
            <p className={`font-playfair text-xl italic leading-relaxed text-[#FFF8E7]/95 md:text-2xl lg:text-[1.65rem] ${isHi ? "font-deva not-italic" : ""}`}>&ldquo;{t("divineLegacy.quote")}&rdquo;</p>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
            <figcaption className="mt-4 font-cinzel text-[10px] tracking-[0.35em] text-amber-500/60">॥ श्री माँ बगलामुखी नमः ॥</figcaption>
          </blockquote>
        </motion.figure>
      </div>
    </section>
  );
}
