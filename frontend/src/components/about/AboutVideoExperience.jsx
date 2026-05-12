import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bell, Flame, Flower2, Play, Sparkles, X } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

const VIDEOS = [
  { id: "WveRE9VVYms", slug: "havan", icon: Flame },
  { id: "TaKWdtMeARA", slug: "darshan", icon: Bell },
  { id: "CYBnMeymSfE", slug: "rituals", icon: Sparkles },
  { id: "NLTcwp2BewM", slug: "journey", icon: Flower2 },
];

function embedSrc(videoId, { autoplay = false, mute = true } = {}) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    ...(autoplay ? { autoplay: "1", mute: mute ? "1" : "0" } : {}),
  });
  if (!autoplay) params.set("mute", "1");
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function thumbUrl(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function EmberField() {
  const embers = Array.from({ length: 16 }, (_, i) => ({
    k: i,
    left: `${(i * 6.7) % 100}%`,
    delay: `${(i % 9) * 0.5}s`,
    dur: `${12 + (i % 6)}s`,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {embers.map((e) => (
        <span
          key={e.k}
          className="absolute top-full h-1 w-1 rounded-full bg-amber-300/70 shadow-[0_0_14px_rgba(251,191,36,0.9)] animate-float-up"
          style={{ left: e.left, animationDelay: e.delay, animationDuration: e.dur }}
        />
      ))}
    </div>
  );
}

function SanskritDivider({ text }) {
  return (
    <div className="mx-auto mb-14 flex max-w-3xl items-center gap-4 px-6" aria-hidden>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-saffron-500/50 to-saffron-400/30" />
      <p className="font-deva shrink-0 text-sm tracking-[0.35em] text-saffron-300/80">{text}</p>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-saffron-500/50 to-saffron-400/30" />
    </div>
  );
}

function VideoCard({
  video,
  index,
  stacked,
  hoverPreviewId,
  setHoverPreviewId,
  activeModalId,
  setActiveModalId,
  t,
}) {
  const [iframeReady, setIframeReady] = useState(false);
  const showPreview = hoverPreviewId === video.id && activeModalId == null;
  const Icon = video.icon;
  const videoTitle = t(`aboutVideo.${video.slug}Title`);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-3, 3]);
  const springRx = useSpring(rotateX, { stiffness: 140, damping: 20 });
  const springRy = useSpring(rotateY, { stiffness: 140, damping: 20 });

  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setHoverPreviewId(null);
    setIframeReady(false);
  };

  /* Shorts-style portrait tiles: 9:16 media, copy below. Slightly narrower on desktop keeps height reasonable. */
  const widthClass = stacked
    ? "w-full max-w-sm mx-auto sm:max-w-md"
    : "w-[min(88vw,18.5rem)] sm:w-[min(80vw,20rem)] md:w-[min(30vw,340px)]";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 100px 0px", amount: 0.12 }}
      transition={{ duration: 0.85, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: springRx, rotateY: springRy, transformPerspective: 1200 }}
      className={`group relative shrink-0 snap-center ${widthClass}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerEnter={() => setHoverPreviewId(video.id)}
    >
      <div className="golden-border-glow relative overflow-hidden rounded-3xl border border-saffron-500/25 bg-ink-800/50 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-[box-shadow,transform] duration-500 group-hover:border-saffron-400/45 group-hover:shadow-[0_0_60px_rgba(245,158,11,0.22)]">
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-saffron-500/10" />
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-saffron-500/15 via-transparent to-saffron-600/10 opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70" />

        <div className="relative aspect-[9/16] w-full overflow-hidden bg-ink-900">
          <img
            src={thumbUrl(video.id)}
            alt=""
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
              showPreview && iframeReady ? "scale-105 opacity-0" : "scale-100 opacity-100 group-hover:scale-105"
            }`}
          />

          {showPreview && (
            <>
              {!iframeReady && (
                <div className="absolute inset-0 z-[1] animate-pulse bg-gradient-to-br from-ink-800 via-ink-900 to-ink-800" />
              )}
              <iframe
                title={videoTitle}
                className="absolute inset-0 z-[2] h-full w-full scale-105 border-0"
                style={{ opacity: iframeReady ? 1 : 0, transition: "opacity 0.55s ease" }}
                src={embedSrc(video.id, { autoplay: true, mute: true })}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIframeReady(true)}
              />
            </>
          )}

          <div
            className={`absolute inset-0 z-[3] bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/20 transition-opacity duration-500 ${
              showPreview && iframeReady ? "opacity-30 group-hover:opacity-20" : "opacity-80 group-hover:opacity-55"
            }`}
          />

          <div className="absolute left-5 top-5 z-[4] flex h-12 w-12 items-center justify-center rounded-full border border-saffron-500/35 bg-ink-900/60 text-saffron-200 shadow-[0_0_24px_rgba(245,158,11,0.35)] backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
            {video.icon === Bell ? (
              <motion.span
                animate={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 1.15, repeat: Infinity, repeatDelay: 3.5 }}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </motion.span>
            ) : (
              <Icon className="h-5 w-5" aria-hidden />
            )}
          </div>

          <motion.button
            type="button"
            aria-label={`Open cinematic player: ${videoTitle}`}
            className="absolute inset-0 z-[5] flex cursor-pointer items-center justify-center"
            onClick={() => setActiveModalId(video.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-saffron-400/50 bg-ink-900/70 text-saffron-100 shadow-[0_0_40px_rgba(245,158,11,0.45)] backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-saffron-300/70 group-hover:shadow-[0_0_55px_rgba(245,158,11,0.65)]">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </motion.button>

          <div className="pointer-events-none absolute inset-0 z-[4] rounded-3xl shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]" />
        </div>

        {/* User requested: show only shorts tiles (no copy below) */}
      </div>
    </motion.article>
  );
}

function CinematicModal({ videoId, onClose }) {
  const { t } = useLanguage();
  const v = VIDEOS.find((x) => x.id === videoId);
  if (!v) return null;
  const title = t(`aboutVideo.${v.slug}Title`);
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.button
        type="button"
        aria-label={t("aboutVideo.close")}
        className="absolute inset-0 bg-ink-900/90 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        className="relative z-[1] w-full max-w-lg overflow-hidden rounded-3xl border border-saffron-500/30 bg-ink-900 shadow-[0_0_90px_rgba(245,158,11,0.28)] sm:max-w-xl md:max-w-2xl"
        initial={{ scale: 0.94, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 16, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_50%_15%,rgba(245,158,11,0.22),transparent_55%)]" />
        <div className="flex items-center justify-between border-b border-saffron-500/15 px-5 py-4 md:px-7">
          <p className="font-serif text-lg text-white md:text-xl">{title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("aboutVideo.close")}
            className="grid h-10 w-10 place-items-center rounded-full border border-saffron-500/25 text-white/80 transition-colors hover:border-saffron-400/50 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex w-full justify-center bg-black px-2 py-3 sm:px-4 sm:py-5">
          <div className="relative aspect-[9/16] h-[min(82vh,880px)] w-auto max-w-full overflow-hidden rounded-2xl bg-black ring-1 ring-saffron-500/15">
            <iframe
              key={videoId}
              title={title}
              className="absolute inset-0 h-full w-full border-0"
              src={embedSrc(videoId, { autoplay: true, mute: true })}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            />
            <p className="pointer-events-none absolute bottom-3 left-1/2 z-[2] -translate-x-1/2 rounded-full border border-saffron-500/20 bg-ink-900/70 px-4 py-1 text-[11px] tracking-widest text-white/55 backdrop-blur-sm">
              {t("aboutVideo.modalHint")}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AboutVideoExperience() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const scrollerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoverPreviewId, setHoverPreviewId] = useState(null);
  const [activeModalId, setActiveModalId] = useState(null);

  const onWheel = useCallback((e) => {
    const el = scrollerRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  const updateProgress = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) {
      setScrollProgress(0);
      return;
    }
    const p = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setScrollProgress(Math.min(1, Math.max(0, p)));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    return () => el.removeEventListener("scroll", updateProgress);
  }, [updateProgress]);

  const onPointerDown = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    setDragging(true);
    startX.current = e.clientX;
    scrollLeftStart.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = scrollLeftStart.current - (e.clientX - startX.current);
  };
  const onPointerUp = (e) => {
    setDragging(false);
    scrollerRef.current?.releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    if (!activeModalId) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActiveModalId(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [activeModalId]);

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-36"
      aria-labelledby="temple-video-experience-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,158,11,0.1),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen animate-smoke-drift bg-[radial-gradient(ellipse_at_30%_70%,rgba(245,158,11,0.35),transparent_50%)]"
        aria-hidden
      />
      <EmberField />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SanskritDivider text={t("aboutVideo.divider")} />

        <div className="mx-auto max-w-4xl text-center" data-about-reveal>
          <p className={`text-saffron-300/90 ${isHi ? "font-deva text-sm tracking-[0.2em] md:text-base" : "font-cinzel text-xs tracking-[0.5em]"}`}>
            {t("aboutVideo.label")}
          </p>
          <h2
            id="temple-video-experience-heading"
            className={`mt-5 text-4xl text-white sm:text-5xl lg:text-6xl ${isHi ? "font-deva leading-snug" : "font-serif leading-tight"}`}
          >
            {t("aboutVideo.titleBefore")}{" "}
            <span className="text-gold-shimmer italic">{t("aboutVideo.titleAccent")}</span>
          </h2>
          <p className={`mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70 ${isHi ? "font-deva" : ""}`}>{t("aboutVideo.subtitle")}</p>
        </div>

        <div className="relative mt-16 hidden md:block">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-20 bg-gradient-to-r from-ink-900 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-20 bg-gradient-to-l from-ink-900 to-transparent"
            aria-hidden
          />

          <div
            ref={scrollerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={() => setDragging(false)}
            className={`relative z-[1] flex gap-8 overflow-x-auto scroll-smooth px-6 pb-6 pt-4 [scrollbar-width:thin] snap-x snap-mandatory ${
              dragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ scrollbarColor: "rgba(245,158,11,0.45) #0A0505" }}
          >
            {VIDEOS.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                stacked={false}
                hoverPreviewId={hoverPreviewId}
                setHoverPreviewId={setHoverPreviewId}
                activeModalId={activeModalId}
                setActiveModalId={setActiveModalId}
                t={t}
              />
            ))}
          </div>

          <div className="mx-auto mt-4 h-1 max-w-md overflow-hidden rounded-full bg-ink-700/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-saffron-700 via-saffron-400 to-saffron-600 transition-[width] duration-300 ease-out"
              style={{ width: `${Math.max(6, scrollProgress * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-center text-xs tracking-widest text-white/40">{t("aboutVideo.scrollHint")}</p>
        </div>

        <div className="relative z-[1] mt-14 flex flex-col gap-12 md:hidden">
          {VIDEOS.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              stacked
              hoverPreviewId={hoverPreviewId}
              setHoverPreviewId={setHoverPreviewId}
              activeModalId={activeModalId}
              setActiveModalId={setActiveModalId}
              t={t}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeModalId && (
          <CinematicModal videoId={activeModalId} onClose={() => setActiveModalId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
