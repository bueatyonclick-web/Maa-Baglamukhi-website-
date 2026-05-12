import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Ban,
  BookOpen,
  Brain,
  Flame,
  Gavel,
  Heart,
  Landmark,
  Scroll,
  Shield,
  Sparkles,
  Sun,
  Swords,
  AlertTriangle,
} from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { ABOUT_PAGE_MAA_IMAGE } from "../../data/content";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
};

function SacredAmbient() {
  const orbs = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${(i * 19 + 7) % 94}%`,
        top: `${(i * 13) % 85}%`,
        s: 100 + (i % 4) * 55,
        d: 9 + (i % 5),
        del: (i % 6) * 0.35,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#070403]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(212,160,23,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(180,83,9,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_100%_30%,rgba(244,208,111,0.06),transparent_50%)]" />
      {orbs.map((o) => (
        <motion.div
          key={o.id}
          className="absolute rounded-full bg-[#D4A017]/[0.035] blur-3xl"
          style={{
            left: o.left,
            top: o.top,
            width: o.s,
            height: o.s,
            marginLeft: -o.s / 2,
            marginTop: -o.s / 2,
          }}
          animate={{ opacity: [0.2, 0.5, 0.25], scale: [1, 1.12, 1] }}
          transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut", delay: o.del }}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,4,3,0)_0%,#070403_45%,#120905_100%)]" />
    </div>
  );
}

function FloatingAsh({ count = 28 }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 6.9) % 100}%`,
        delay: `${(i % 11) * 0.28}s`,
        duration: `${16 + (i % 9)}s`,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70" aria-hidden>
      {sparks.map((s) => (
        <span
          key={s.id}
          className="absolute top-full h-0.5 w-0.5 rounded-full bg-[#F4D06F]/60 shadow-[0_0_10px_rgba(244,208,111,0.8)] animate-float-up"
          style={{ left: s.left, animationDelay: s.delay, animationDuration: s.duration }}
        />
      ))}
    </div>
  );
}

function YantraMist() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 4 L76 40 L40 76 L4 40 Z' fill='none' stroke='%23D4A017' stroke-width='0.5'/%3E%3Ccircle cx='40' cy='40' r='8' fill='none' stroke='%23F4D06F' stroke-width='0.35'/%3E%3C/svg%3E")`,
        backgroundSize: "80px 80px",
      }}
      aria-hidden
    />
  );
}

function SmokeDrift() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-screen animate-smoke-drift bg-[radial-gradient(ellipse_at_30%_80%,rgba(244,208,111,0.25),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light animate-smoke-drift bg-[radial-gradient(ellipse_at_70%_60%,rgba(212,160,23,0.2),transparent_50%)]"
        style={{ animationDelay: "-5s" }}
        aria-hidden
      />
    </>
  );
}

function GoldenDivider({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden>
      <span className="h-px flex-1 max-w-[6rem] bg-gradient-to-r from-transparent to-[#D4A017]/70" />
      <span className="font-cinzel text-[10px] text-[#F4D06F]/80">✦</span>
      <span className="h-px flex-1 max-w-[6rem] bg-gradient-to-l from-transparent to-[#D4A017]/70" />
    </div>
  );
}

function DiyaPulse({ className }) {
  return (
    <motion.div
      className={className}
      animate={{ opacity: [0.35, 0.75, 0.4], scale: [1, 1.08, 1] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    />
  );
}

const TIMELINE_ICONS = [Scroll, Sun, Users, Landmark, Sparkles];

const WHY_ICONS = [Shield, Gavel, Ban, Sparkles, Brain, Heart, Swords, AlertTriangle];

export default function AboutHistoryDivineLegacy() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const imgWrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgWrapRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [48, -48]);

  const timeline = useMemo(
    () =>
      [1, 2, 3, 4, 5].map((n, i) => ({
        Icon: TIMELINE_ICONS[i],
        title: t(`historyLegacy.tl${n}t`),
        desc: t(`historyLegacy.tl${n}d`),
      })),
    [t]
  );

  const rishiFeats = useMemo(() => [1, 2, 3, 4, 5].map((n) => t(`historyLegacy.s3f${n}`)), [t]);

  const why = useMemo(
    () =>
      [1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => ({
        Icon: WHY_ICONS[i],
        label: t(`historyLegacy.w${n}`),
      })),
    [t]
  );

  const headingFont = isHi ? "font-deva" : "font-playfair";
  const bodyFont = isHi ? "font-deva" : "font-inter";

  return (
    <section
      id="history-divine-legacy"
      className="relative scroll-mt-28 overflow-hidden border-y border-[#D4A017]/12 bg-[#070403] py-20 md:scroll-mt-32 md:py-28 lg:py-32"
      aria-labelledby="history-legacy-heading"
      data-testid="about-history-divine-legacy"
    >
      <SacredAmbient />
      <YantraMist />
      <SmokeDrift />
      <FloatingAsh />

      <div className="pointer-events-none absolute left-1/2 top-24 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,160,23,0.08)_0%,transparent_68%)] blur-3xl" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.header className="mx-auto max-w-3xl text-center" {...fadeUp}>
          <p className="font-cinzel text-[11px] tracking-[0.42em] text-[#F4D06F]/85 md:text-xs">{t("historyLegacy.label")}</p>
          <h2
            id="history-legacy-heading"
            className={`mt-5 text-3xl text-[#FFF6E5] sm:text-4xl md:text-5xl lg:text-[3.1rem] lg:leading-[1.12] ${headingFont}`}
          >
            {t("historyLegacy.title")}
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#FFF6E5]/68 md:text-lg ${bodyFont}`}>
            {t("historyLegacy.subtitle")}
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <GoldenDivider />
          </div>
        </motion.header>

        {/* Section 1 — Trishakti split */}
        <div className="mt-16 grid items-center gap-10 lg:mt-24 lg:grid-cols-2 lg:gap-14" data-about-reveal>
          <motion.div
            ref={imgWrapRef}
            style={{ y: imgY }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#D4A017]/25 via-transparent to-[#B45309]/20 opacity-80 blur-2xl" aria-hidden />
            <DiyaPulse className="absolute -right-6 top-1/4 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(244,208,111,0.35)_0%,transparent_70%)] blur-xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#D4A017]/35 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95),0_0_0_1px_rgba(244,208,111,0.08),inset_0_0_60px_rgba(212,160,23,0.06)]">
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: "linear-gradient(120deg, transparent 30%, rgba(244,208,111,0.25) 50%, transparent 70%)",
                  backgroundSize: "200% 200%",
                }}
              />
              <img
                src={ABOUT_PAGE_MAA_IMAGE}
                alt="Maa Baglamukhi Trishakti divine form at Nalkheda Siddha Peeth"
                className="relative z-[1] h-full w-full object-cover object-[center_22%]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#070403]/90 via-transparent to-[#070403]/30" />
              <div className="absolute bottom-4 left-4 right-4 z-[3] rounded-xl border border-[#D4A017]/25 bg-[#120905]/75 px-4 py-3 text-center backdrop-blur-md">
                <p className="font-cinzel text-[10px] tracking-[0.35em] text-[#F4D06F]/90">त्रिशक्ति · नलखेड़ा</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
            className="relative overflow-hidden rounded-[1.75rem] border border-[#D4A017]/25 bg-[#120905]/65 p-8 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,246,229,0.06)] backdrop-blur-xl md:p-10"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D4A017]/10 blur-3xl" />
            <h3 className={`text-2xl text-[#F4D06F] md:text-3xl ${headingFont}`}>{t("historyLegacy.s1h")}</h3>
            <GoldenDivider className="my-6" />
            <p className={`text-[15px] leading-relaxed text-[#FFF6E5]/75 md:text-base ${bodyFont}`}>{t("historyLegacy.s1p1")}</p>
            <p className={`mt-5 text-sm font-medium tracking-wide text-[#F4D06F]/90 ${isHi ? "font-deva" : "font-cinzel"}`}>
              {t("historyLegacy.s1p2")}
            </p>
            <ul className="mt-4 space-y-3">
              {["s1li1", "s1li2", "s1li3"].map((key) => (
                <li key={key} className="flex gap-3 text-[#FFF6E5]/85">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#F4D06F] to-[#B45309] shadow-[0_0_10px_rgba(244,208,111,0.5)]" />
                  <span className={`text-sm leading-relaxed md:text-[15px] ${bodyFont}`}>{t(`historyLegacy.${key}`)}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-6 border-t border-[#D4A017]/15 pt-6 text-[15px] leading-relaxed text-[#FFF6E5]/68 ${bodyFont}`}>
              {t("historyLegacy.s1p3")}
            </p>
          </motion.div>
        </div>

        {/* Section 2 — Mahabharata */}
        <div className="mt-20 md:mt-28" data-about-reveal>
          <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp}>
            <h3 className={`text-2xl text-[#FFF6E5] md:text-4xl ${headingFont}`}>{t("historyLegacy.s2h")}</h3>
            <GoldenDivider className="mx-auto mt-6 max-w-xs" />
            <p className={`mt-6 text-left text-[15px] leading-relaxed text-[#FFF6E5]/72 sm:text-center md:text-base ${bodyFont}`}>
              {t("historyLegacy.s2p1")}
            </p>
            <p className={`mt-4 text-left text-[15px] leading-relaxed text-[#FFF6E5]/65 sm:text-center md:text-base ${bodyFont}`}>
              {t("historyLegacy.s2p2")}
            </p>
            <p className={`mt-6 text-sm font-medium text-[#F4D06F]/90 ${isHi ? "font-deva" : "font-cinzel tracking-wide"}`}>{t("historyLegacy.s2p3")}</p>
            <div className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-3">
              {["s2w1", "s2w2", "s2w3", "s2w4"].map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-[#D4A017]/30 bg-[#070403]/80 px-4 py-2 text-xs text-[#FFF6E5]/88 shadow-[inset_0_1px_0_rgba(244,208,111,0.06)] backdrop-blur-sm md:text-sm"
                >
                  {t(`historyLegacy.${k}`)}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="relative mx-auto mt-14 max-w-3xl lg:mt-20">
            <div className="absolute left-[1.25rem] top-4 bottom-4 w-px bg-gradient-to-b from-[#D4A017]/50 via-[#D4A017]/20 to-transparent md:left-8" aria-hidden />
            <ul className="space-y-6 md:space-y-8">
              {timeline.map(({ Icon, title, desc }, i) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-5 pl-1 md:gap-8 md:pl-2"
                >
                  <div className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4A017]/45 bg-gradient-to-br from-[#120905] to-[#070403] shadow-[0_0_22px_rgba(212,160,23,0.25)] md:h-14 md:w-14">
                    <Icon className="h-4 w-4 text-[#F4D06F] md:h-5 md:w-5" strokeWidth={1.35} />
                  </div>
                  <motion.article
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                    className="group relative flex-1 overflow-hidden rounded-2xl border border-[#D4A017]/22 bg-[#120905]/70 p-6 shadow-[0_20px_60px_-34px_rgba(0,0,0,0.95)] backdrop-blur-lg md:p-7"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: "radial-gradient(500px circle at 50% 0%, rgba(212,160,23,0.12), transparent 45%)",
                      }}
                    />
                    <h4 className={`relative text-lg text-[#F4D06F] md:text-xl ${headingFont}`}>{title}</h4>
                    <p className={`relative mt-2 text-sm leading-relaxed text-[#FFF6E5]/65 md:text-[15px] ${bodyFont}`}>{desc}</p>
                  </motion.article>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3 — Rishi-Muni */}
        <div className="relative mt-20 md:mt-28" data-about-reveal>
          <div className="absolute inset-0 -mx-4 rounded-3xl bg-[#120905]/40 blur-xl md:-mx-8" aria-hidden />
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-[#D4A017]/20 bg-gradient-to-b from-[#120905]/90 to-[#070403]/95 px-6 py-12 shadow-[inset_0_1px_0_rgba(255,246,229,0.05)] md:px-12 md:py-16"
            {...fadeUp}
          >
            <Flame className="absolute right-8 top-8 h-24 w-24 text-[#D4A017]/[0.07]" aria-hidden />
            <BookOpen className="absolute bottom-10 left-6 h-20 w-20 text-[#F4D06F]/[0.06]" aria-hidden />
            <h3 className={`text-center text-2xl text-[#FFF6E5] md:text-4xl ${headingFont}`}>{t("historyLegacy.s3h")}</h3>
            <GoldenDivider className="mx-auto mt-6 max-w-xs" />
            <p className={`mx-auto mt-6 max-w-3xl text-center text-[15px] leading-relaxed text-[#FFF6E5]/70 md:text-base ${bodyFont}`}>
              {t("historyLegacy.s3p1")}
            </p>
            <p className={`mt-4 text-center text-sm font-medium text-[#F4D06F]/85 ${isHi ? "font-deva" : "font-cinzel tracking-[0.2em]"}`}>
              {t("historyLegacy.s3p2")}
            </p>
            <div className="mt-10 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-5 md:overflow-visible [&::-webkit-scrollbar]:hidden">
              {rishiFeats.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="min-w-[200px] shrink-0 rounded-2xl border border-[#D4A017]/25 bg-[#070403]/70 p-5 text-center shadow-[0_16px_48px_-28px_rgba(0,0,0,0.9)] backdrop-blur-md md:min-w-0"
                >
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4A017]/35 bg-gradient-to-br from-[#D4A017]/20 to-transparent text-[#F4D06F]">
                    <Sparkles className="h-5 w-5" strokeWidth={1.25} />
                  </div>
                  <p className={`text-sm font-medium text-[#FFF6E5]/92 md:text-[15px] ${bodyFont}`}>{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 4 — Why worship */}
        <div className="mt-20 md:mt-28" data-about-reveal>
          <motion.h3
            className={`text-center text-2xl text-[#FFF6E5] md:text-3xl ${headingFont}`}
            {...fadeUp}
          >
            {t("historyLegacy.s4h")}
          </motion.h3>
          <GoldenDivider className="mx-auto mt-6 max-w-xs" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(({ Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-[#D4A017]/22 bg-[#120905]/75 p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,246,229,0.04)] backdrop-blur-xl"
              >
                <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4A017]/35 bg-gradient-to-br from-[#D4A017]/25 to-[#070403] text-[#F4D06F] shadow-[0_0_24px_rgba(212,160,23,0.2)] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" strokeWidth={1.25} />
                </div>
                <p className={`relative text-sm font-medium leading-snug text-[#FFF6E5]/92 md:text-[15px] ${bodyFont}`}>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 5 — Quote */}
        <motion.div
          className="relative mx-auto mt-20 max-w-4xl md:mt-28"
          data-about-reveal
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[#D4A017]/40 via-[#F4D06F]/25 to-[#D4A017]/40 p-px opacity-60 blur-[1px]" />
          <div className="relative overflow-hidden rounded-3xl border border-[#D4A017]/30 bg-[#120905]/85 px-6 py-14 text-center shadow-[0_32px_90px_-40px_rgba(212,160,23,0.35)] backdrop-blur-xl md:px-14 md:py-16">
            <p className="pointer-events-none absolute left-6 top-6 font-serif text-6xl text-[#D4A017]/[0.12] md:text-8xl">{t("historyLegacy.quoteMark")}</p>
            <p className="pointer-events-none absolute bottom-6 right-8 font-serif text-6xl text-[#D4A017]/[0.12] md:text-8xl">{t("historyLegacy.quoteMark")}</p>
            <blockquote className={`relative mx-auto max-w-3xl font-playfair text-xl italic leading-relaxed text-[#FFF6E5]/92 md:text-2xl lg:text-[1.65rem] ${isHi ? "font-deva not-italic" : ""}`}>
              “{t("historyLegacy.quote")}”
            </blockquote>
            <div className="relative mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#F4D06F]/70 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
