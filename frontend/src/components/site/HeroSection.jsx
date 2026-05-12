import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Check,
  ChevronDown,
  PlayCircle,
} from "lucide-react";
import FloatingPujaThali from "../book-puja/hero/FloatingPujaThali";
import { HERO_IMAGE, HOME_HERO_IMAGE } from "../../data/content";
import { useLanguage } from "../../i18n/LanguageContext";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
};

function GoldSparkles() {
  const sparks = React.useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        k: i,
        left: `${(i * 11.3) % 100}%`,
        top: `${42 + (i % 9) * 4}%`,
        d: `${12 + (i % 9)}s`,
        del: `${(i % 10) * 0.35}s`,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-[14] overflow-hidden" aria-hidden>
      {sparks.map((s) => (
        <span
          key={s.k}
          className="absolute h-0.5 w-0.5 rounded-full bg-amber-100 shadow-[0_0_10px_rgba(253,230,138,0.95)] animate-float-up will-change-transform"
          style={{ left: s.left, top: s.top, animationDuration: s.d, animationDelay: s.del }}
        />
      ))}
    </div>
  );
}

function BellSvg({ flip }) {
  const gid = flip ? "hb-r" : "hb-l";
  return (
    <svg viewBox="0 0 80 200" className={`h-full w-full overflow-visible ${flip ? "scale-x-[-1]" : ""}`} aria-hidden>
      <defs>
        <linearGradient id={`${gid}-rope`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
        <linearGradient id={`${gid}-bell`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
      <path
        d="M40 0 Q38 50 40 100 Q42 150 40 165"
        fill="none"
        stroke={`url(#${gid}-rope)`}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g
        className="origin-[40px_165px] animate-book-puja-bell"
        style={flip ? { animationDelay: "-1.2s" } : undefined}
      >
        <path
          d="M40 162 L22 170 Q18 192 40 200 Q62 192 58 170 Z"
          fill={`url(#${gid}-bell)`}
          stroke="#fcd34d"
          strokeWidth="0.5"
        />
      </g>
    </svg>
  );
}

function TempleBellsCorner() {
  return (
    <>
      <div className="pointer-events-none absolute left-[4%] top-[6%] z-[22] h-[min(18vh,160px)] w-14 opacity-90 md:left-[6%] md:w-20">
        <BellSvg />
      </div>
      <div className="pointer-events-none absolute right-[4%] top-[6%] z-[22] h-[min(18vh,160px)] w-14 opacity-90 md:right-[6%] md:w-20">
        <BellSvg flip />
      </div>
    </>
  );
}

const trustBadgeKeys = ["hero.trust1", "hero.trust2", "hero.trust3", "hero.trust4"];

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const [heroSrc, setHeroSrc] = useState(HOME_HERO_IMAGE);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden bg-[#040201]"
      data-testid="hero-section"
    >
      <div className="flex min-h-[100dvh] flex-col lg:flex-row">
        {/* ——— LEFT: copy + CTAs (premium contrast, no yellow wash) ——— */}
        <div className="relative z-30 order-2 flex w-full flex-col justify-center px-5 pb-14 pt-8 sm:px-8 lg:order-1 lg:flex-[0_0_42%] lg:max-w-[560px] lg:px-10 lg:pb-24 lg:pl-12 lg:pt-32 xl:pl-16 xl:pr-8 xl:max-w-[600px]">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(5,3,1,0.96) 0%, rgba(15,7,2,0.92) 40%, rgba(0,0,0,0.35) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute -left-20 top-1/2 -z-10 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,160,23,0.18)_0%,transparent_60%)] blur-3xl"
            aria-hidden
          />

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-deva text-base tracking-wide text-amber-300/95 md:text-lg leading-relaxed"
          >
            {t("hero.tagline")}
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.85, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5"
          >
            <h1 className="font-deva tracking-tight leading-none">
              <span className="block text-[clamp(2.85rem,8.8vw,5.35rem)] leading-none text-amber-50 [text-shadow:0_2px_40px_rgba(251,191,36,0.42),0_1px_0_rgba(217,119,6,0.35)]">
                {t("hero.titleLine1")}
              </span>
              <span className="block text-[clamp(2.2rem,6.4vw,4.15rem)] leading-[1.05] text-amber-200 [text-shadow:0_2px_48px_rgba(245,158,11,0.45),0_1px_0_rgba(146,64,14,0.4)]">
                {t("hero.titleLine2")}
              </span>
            </h1>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-px flex-1 max-w-[4rem] bg-gradient-to-r from-transparent to-amber-500/70" />
              <span className="text-[10px] text-amber-400/90 md:text-xs">◆</span>
              <span className="h-px flex-1 max-w-[4rem] bg-gradient-to-l from-transparent to-amber-500/70" />
            </div>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-6 max-w-md leading-relaxed text-white/88 ${isHi ? "font-deva text-[17px] md:text-xl lg:text-[1.35rem]" : "font-sans text-[15px] md:text-lg"}`}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/book-puja"
              className="btn-primary-sacred inline-flex items-center gap-2 px-8 py-3.5 text-sm shadow-[0_0_28px_rgba(245,158,11,0.35)] transition-shadow hover:shadow-[0_0_40px_rgba(251,191,36,0.5)]"
              data-testid="hero-book-puja"
            >
              <Calendar className="h-4 w-4" />
              {t("hero.ctaBook")}
            </Link>
            <Link
              to="/live-darshan"
              className="group inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-black/40 px-8 py-3.5 text-sm text-amber-50 backdrop-blur-sm transition-all hover:border-amber-300/80 hover:bg-black/55 hover:shadow-[inset_0_0_0_1px_rgba(251,191,36,0.35)]"
              data-testid="hero-live-darshan"
            >
              <PlayCircle className="h-4 w-4 text-amber-300/90" />
              {t("hero.ctaDarshan")}
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {trustBadgeKeys.map((k) => (
                <div
                  key={k}
                  className="flex items-center gap-3 rounded-2xl border border-amber-400/15 bg-white/[0.03] px-4 py-3 backdrop-blur-md"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-amber-400/25 bg-amber-400/10 text-amber-200">
                    <Check className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <p
                    className={`text-white/80 ${isHi ? "font-deva text-[15px] leading-relaxed md:text-base" : "text-sm leading-relaxed"}`}
                  >
                    {t(k)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ——— RIGHT: goddess — sharp focal, golden drama (no full-screen yellow fog) ——— */}
        <div className="relative order-1 min-h-[min(52vh,560px)] w-full min-w-0 flex-1 lg:order-2 lg:min-h-[100dvh] lg:flex-1">
          <div className="absolute inset-0 overflow-hidden bg-[#080604]">
            <motion.img
              src={heroSrc}
              alt="Śrī Maa Bagalamukhī — Siddha Peeth"
              className="h-full w-full min-h-full min-w-full object-cover object-center contrast-[1.12] saturate-[1.02] brightness-[0.92] sm:object-[center_22%] lg:object-[center_18%]"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              onError={() => {
                if (heroSrc !== HERO_IMAGE) setHeroSrc(HERO_IMAGE);
              }}
            />

            {/* Blend into left column on desktop only — on mobile this read as grey pillar bars */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-[9] hidden w-[32%] max-w-[280px] bg-gradient-to-r from-[#040201] via-[#040201]/85 to-transparent lg:block" />

            {/* Focused aura + mandala (right side only) */}
            <motion.div
              className="pointer-events-none absolute right-[8%] top-[12%] z-[11] h-[min(85vw,560px)] w-[min(85vw,560px)] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.42)_0%,rgba(245,158,11,0.12)_38%,transparent_68%)] blur-3xl md:right-[10%]"
              animate={{ opacity: [0.55, 0.85, 0.6, 0.85, 0.55], scale: [1, 1.04, 1, 1.03, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-[12%] top-[18%] z-[10] h-[min(90vw,640px)] w-[min(90vw,640px)] opacity-[0.14] animate-spin-slow"
              aria-hidden
            >
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <g fill="none" stroke="rgba(251,191,36,0.75)" strokeWidth="0.35">
                  <circle cx="100" cy="100" r="88" />
                  <circle cx="100" cy="100" r="68" />
                  <circle cx="100" cy="100" r="48" />
                  {Array.from({ length: 24 }).map((_, i) => (
                    <line
                      key={i}
                      x1="100"
                      y1="12"
                      x2="100"
                      y2="188"
                      transform={`rotate(${(i * 360) / 24} 100 100)`}
                    />
                  ))}
                </g>
              </svg>
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-[12] opacity-[0.12] mix-blend-soft-light animate-smoke-drift bg-[radial-gradient(ellipse_at_70%_65%,rgba(251,191,36,0.25),transparent_55%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[12] opacity-[0.08] mix-blend-screen animate-smoke-drift bg-[radial-gradient(ellipse_at_45%_90%,rgba(254,243,199,0.2),transparent_50%)]"
              style={{ animationDelay: "-6s" }}
              aria-hidden
            />

            <GoldSparkles />
            <TempleBellsCorner />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%] z-[25]">
              <FloatingPujaThali />
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-[8] bg-gradient-to-t from-[#040201]/90 via-transparent to-transparent opacity-90"
              aria-hidden
            />
          </div>
        </div>
      </div>

      {/* Scroll — reference: circular cue on right */}
      <motion.a
        href="#daily-mantra"
        className="absolute bottom-8 right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-amber-500/35 bg-black/50 text-amber-300/90 shadow-[0_0_24px_rgba(245,158,11,0.25)] backdrop-blur-md transition-colors hover:border-amber-400/60 hover:text-amber-100 lg:flex"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to next section"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.a>
      <motion.a
        href="#daily-mantra"
        className="absolute bottom-8 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-1 text-amber-400/75 lg:hidden"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-cinzel text-[9px] tracking-[0.45em] text-white/45">SCROLL</span>
        <ChevronDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
