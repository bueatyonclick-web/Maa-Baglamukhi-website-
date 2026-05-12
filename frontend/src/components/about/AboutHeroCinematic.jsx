import React, { useCallback, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { ABOUT_IMAGE, BOKEH_IMAGE } from "../../data/content";
import { useLanguage } from "../../i18n/LanguageContext";

const VIDEO_SRC =
  "https://assets.mixkit.co/videos/preview/mixkit-candles-burning-in-front-of-a-religious-image-40976-large.mp4";

function GoldParticles() {
  const particles = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    left: `${(i * 7.3) % 100}%`,
    delay: `${(i % 12) * 0.8}s`,
    duration: `${14 + (i % 9)}s`,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-full h-1 w-1 rounded-full bg-saffron-400/70 shadow-[0_0_12px_rgba(245,158,11,0.8)] animate-float-up"
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
        />
      ))}
    </div>
  );
}

export default function AboutHeroCinematic() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const wrapRef = useRef(null);
  const [videoOk, setVideoOk] = useState(true);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 40, damping: 24 });
  const sy = useSpring(my, { stiffness: 40, damping: 24 });
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${sx} ${sy}, rgba(245,158,11,0.18), transparent 55%)`;

  const onMove = useCallback(
    (e) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    },
    [mx, my],
  );

  return (
    <section
      ref={wrapRef}
      onPointerMove={onMove}
      className="relative min-h-[100svh] w-full overflow-hidden pt-20"
      aria-label="About hero"
    >
      {/* Background layer */}
      <div className="absolute inset-0 bg-ink-900">
        {videoOk ? (
          <div className="absolute inset-0 overflow-hidden">
            <video
              className="h-full w-full scale-110 object-cover opacity-55 animate-ken-burns"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={ABOUT_IMAGE}
              onError={() => setVideoOk(false)}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
        ) : (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="h-full w-full scale-110 bg-cover bg-center animate-ken-burns"
              style={{ backgroundImage: `url(${BOKEH_IMAGE})` }}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/80 to-ink-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-transparent to-ink-900/90" />
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
        <div className="pointer-events-none absolute inset-0 mandala-bg opacity-80" />
        <GoldParticles />
        <div
          className="pointer-events-none absolute -left-1/4 top-1/4 h-[120%] w-1/2 bg-gradient-to-r from-saffron-500/10 via-transparent to-transparent blur-3xl animate-ray-sweep"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-screen animate-smoke-drift bg-[radial-gradient(ellipse_at_30%_80%,rgba(245,158,11,0.35),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light animate-smoke-drift bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,255,255,0.2),transparent_50%)]"
          style={{ animationDelay: "4s" }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-5xl flex-col justify-center px-6 pb-20 pt-10 text-center lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <p className="font-deva text-saffron-300/90 text-base leading-relaxed tracking-[0.2em] md:text-lg md:tracking-[0.28em]">
            {t("aboutHero.kicker")}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-6 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl ${
              isHi ? "font-deva leading-snug" : "font-serif leading-[1.08]"
            }`}
          >
            {t("aboutHero.titleBefore")} <span className="text-gold-shimmer italic">{t("aboutHero.titleAccent")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 1 }}
            className={`mt-5 text-saffron-200/80 ${isHi ? "font-deva text-sm tracking-[0.2em] md:text-base" : "font-cinzel text-xs tracking-[0.55em] md:text-sm"}`}
          >
            {t("aboutHero.subline")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.1 }}
            className={`mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg ${isHi ? "font-deva" : ""}`}
          >
            {t("aboutHero.body")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#about-legend" className="btn-primary-sacred inline-flex gap-2 px-8 py-3 text-sm md:text-base">
              <Sparkles className="h-4 w-4" />
              {t("aboutHero.exploreHistory")}
            </a>
            <Link
              to="/live-darshan"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-saffron-500/35 bg-ink-900/40 px-8 py-3 text-sm text-white/90 backdrop-blur-md transition-all hover:border-saffron-400/60 hover:bg-ink-800/60 md:text-base"
            >
              {t("aboutHero.watchDarshan")}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
