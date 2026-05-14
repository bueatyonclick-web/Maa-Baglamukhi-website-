import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarClock,
  Check,
  Crown,
  Flame,
  Gift,
  Landmark,
  MessageCircle,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Wifi,
} from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -48px 0px", amount: 0.12 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

function AmbientField({ compact }) {
  const orbs = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 11) % 92}%`,
        top: `${(i * 23) % 88}%`,
        size: 120 + (i % 5) * 40,
        delay: (i % 8) * 0.4,
        dur: 10 + (i % 5),
      })),
    []
  );
  const visible = compact ? orbs.filter((_, i) => i % 2 === 0) : orbs;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#070403]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(212,160,23,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_60%,rgba(244,208,111,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_0%_80%,rgba(180,83,9,0.08),transparent_45%)]" />
      {visible.map((o) => (
        <motion.div
          key={o.id}
          className="absolute rounded-full bg-[#D4A017]/[0.04] blur-2xl md:blur-3xl"
          style={{ left: o.left, top: o.top, width: o.size, height: o.size, marginLeft: -o.size / 2, marginTop: -o.size / 2 }}
          animate={{ opacity: [0.25, 0.55, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut", delay: o.delay }}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,4,3,0)_0%,#070403_38%,#120905_100%)]" />
    </div>
  );
}

function FloatingEmbers() {
  const sparks = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: `${(i * 7.7) % 100}%`,
        delay: `${(i % 12) * 0.35}s`,
        duration: `${14 + (i % 8)}s`,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {sparks.map((s) => (
        <span
          key={s.id}
          className="absolute top-full h-1 w-1 rounded-full bg-[#F4D06F]/70 shadow-[0_0_12px_rgba(244,208,111,0.9)] animate-float-up"
          style={{ left: s.left, animationDelay: s.delay, animationDuration: s.duration }}
        />
      ))}
    </div>
  );
}

function DiyaGlow() {
  return (
    <motion.div
      className="pointer-events-none absolute -top-24 right-[8%] z-[1] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(244,208,111,0.35)_0%,rgba(212,160,23,0.12)_40%,transparent_70%)] blur-2xl md:h-64 md:w-64"
      animate={{ opacity: [0.45, 0.85, 0.5], scale: [1, 1.06, 1] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    />
  );
}

const STEP_ICONS = [ScrollText, CalendarClock, Video, Sparkles, Users, Gift];

const OFFLINE_ICONS = [Landmark, Users, ScrollText, Gift, Crown, Flame];

export default function HavanBookingExperience() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const [mode, setMode] = useState("online");
  const [compactAmbient, setCompactAmbient] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setCompactAmbient(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const steps = useMemo(
    () =>
      [1, 2, 3, 4, 5, 6].map((n, i) => ({
        Icon: STEP_ICONS[i],
        title: t(`bookHavan.s${n}t`),
        desc: t(`bookHavan.s${n}d`),
      })),
    [t]
  );

  const features = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8].map((n) => t(`bookHavan.f${n}`)), [t]);

  const trust = useMemo(
    () => [
      { n: t("bookHavan.t1n"), l: t("bookHavan.t1l") },
      { n: t("bookHavan.t2n"), l: t("bookHavan.t2l") },
      { n: t("bookHavan.t3n"), l: t("bookHavan.t3l") },
      { n: t("bookHavan.t4n"), l: t("bookHavan.t4l") },
    ],
    [t]
  );

  const offlineCards = useMemo(
    () =>
      [1, 2, 3, 4, 5, 6].map((n, i) => ({
        Icon: OFFLINE_ICONS[i],
        title: t(`bookHavan.o${n}t`),
        desc: t(`bookHavan.o${n}d`),
      })),
    [t]
  );

  const openPanditChat = () => {
    window.dispatchEvent(new CustomEvent("mbp:open-pandit-chat"));
  };

  const scrollBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="havan-experience"
      className="relative overflow-hidden border-y border-[#D4A017]/15 bg-[#070403] py-20 md:py-28 lg:py-32"
      data-testid="havan-booking-experience"
    >
      <AmbientField compact={compactAmbient} />
      <FloatingEmbers />
      <DiyaGlow />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* 1 — Hero heading */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className={`font-cinzel text-[11px] tracking-[0.42em] text-[#F4D06F]/85 md:text-xs ${isHi ? "font-deva tracking-[0.22em]" : ""}`}
          >
            {t("bookHavan.kicker")}
          </p>
          <h2
            className={
              isHi
                ? "mt-5 font-deva text-3xl leading-snug text-[#FFF6E5] drop-shadow-[0_0_40px_rgba(212,160,23,0.35)] sm:text-4xl md:text-5xl lg:text-[3.15rem]"
                : "mt-5 bg-gradient-to-b from-[#FFF6E5] via-[#F4D06F] to-[#D4A017] bg-clip-text font-playfair text-3xl text-transparent sm:text-4xl md:text-5xl lg:text-[3.15rem] lg:leading-tight"
            }
          >
            {t("bookHavan.heroTitle")}
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl font-inter text-base leading-relaxed text-[#FFF6E5]/72 md:text-lg ${isHi ? "font-deva" : ""}`}>
            {t("bookHavan.heroSub")}
          </p>
        </motion.div>

        {/* 2 — Premium segmented toggle */}
        <motion.div
          className="mx-auto mt-12 flex max-w-xl justify-center md:mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <div className="relative p-[1px]">
            <div
              className="absolute inset-0 rounded-full opacity-80 blur-sm"
              style={{
                background: "linear-gradient(90deg, rgba(212,160,23,0.5), rgba(244,208,111,0.35), rgba(212,160,23,0.5))",
                backgroundSize: "200% 100%",
                animation: "havan-border-shine 4s linear infinite",
              }}
            />
            <div className="relative flex h-[52px] items-stretch rounded-full border border-[#D4A017]/35 bg-[#120905]/90 p-1.5 shadow-[inset_0_1px_0_rgba(255,246,229,0.06)] backdrop-blur-none md:backdrop-blur-xl md:h-[56px]">
              <motion.div
                className="absolute top-1.5 bottom-1.5 w-[calc(50%-10px)] rounded-full bg-gradient-to-br from-[#F4D06F] via-[#D4A017] to-[#B45309] shadow-[0_0_28px_rgba(212,160,23,0.4)]"
                initial={false}
                animate={{ left: mode === "online" ? 6 : "calc(50% + 2px)" }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                aria-hidden
              />
              {(["online", "offline"]).map((m) => {
                const active = mode === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`relative z-10 min-h-0 flex-1 rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-300 md:px-8 md:text-[15px] ${
                      active ? "text-[#120905]" : "text-[#FFF6E5]/75 hover:text-[#FFF6E5]"
                    } ${isHi ? "font-deva" : "font-inter"}`}
                  >
                    {m === "online" ? t("bookHavan.toggleOnline") : t("bookHavan.toggleOffline")}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === "online" ? (
            <motion.div
              key="online"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 md:mt-16"
            >
              {/* 3 — Online intro */}
              <div className="mx-auto max-w-3xl text-center">
                <h3 className={`font-playfair text-2xl text-[#FFF6E5] sm:text-3xl md:text-4xl ${isHi ? "font-deva" : ""}`}>{t("bookHavan.onlineHead")}</h3>
                <p className={`mx-auto mt-4 font-inter text-[15px] leading-relaxed text-[#FFF6E5]/68 md:text-lg ${isHi ? "font-deva" : ""}`}>
                  {t("bookHavan.onlineSub")}
                </p>
              </div>

              {/* 4 — Timeline */}
              <div className="relative mx-auto mt-16 max-w-4xl">
                <div className="absolute left-[1.125rem] top-6 bottom-6 w-px bg-gradient-to-b from-[#D4A017]/60 via-[#D4A017]/25 to-transparent md:left-8" aria-hidden />
                <ul className="space-y-6 md:space-y-8">
                  {steps.map(({ Icon, title, desc }, i) => (
                    <motion.li
                      key={title}
                      {...fadeUp}
                      transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                      className="group relative flex gap-5 md:gap-8"
                    >
                      <div className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D4A017]/50 bg-gradient-to-br from-[#120905] to-[#070403] shadow-[0_0_22px_rgba(212,160,23,0.25)] md:h-16 md:w-16">
                        <Icon className="h-4 w-4 text-[#F4D06F] md:h-6 md:w-6" strokeWidth={1.35} aria-hidden />
                        <span className="absolute inset-0 rounded-full border border-[#F4D06F]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.015, y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        className="group flex-1 rounded-2xl border border-[#D4A017]/20 bg-[#120905]/55 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,246,229,0.06)] backdrop-blur-none md:backdrop-blur-xl md:p-8"
                      >
                        <div
                          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{
                            background: "radial-gradient(600px circle at var(--x,50%) var(--y,0%), rgba(212,160,23,0.12), transparent 40%)",
                          }}
                        />
                        <p className={`font-playfair text-lg text-[#F4D06F] md:text-xl ${isHi ? "font-deva" : ""}`}>{title}</p>
                        <p className={`mt-2 font-inter text-sm leading-relaxed text-[#FFF6E5]/65 md:text-[15px] ${isHi ? "font-deva" : ""}`}>{desc}</p>
                      </motion.div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* 5 — Features */}
              <motion.div className="mt-20 md:mt-24" {...fadeUp}>
                <h4 className={`text-center font-cinzel text-xs tracking-[0.35em] text-[#D4A017]/90`}>{t("bookHavan.featHead")}</h4>
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {features.map((label, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "0px 0px -32px 0px", amount: 0.12 }}
                      transition={{ delay: i * 0.04, duration: 0.45 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group relative overflow-hidden rounded-2xl border border-[#D4A017]/20 bg-[#120905]/70 p-5 shadow-[0_16px_48px_-24px_rgba(0,0,0,0.9)] backdrop-blur-none md:backdrop-blur-md"
                    >
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#D4A017]/10 blur-2xl transition-all duration-500 group-hover:bg-[#D4A017]/18" />
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#D4A017]/35 bg-[#070403]/80 text-[#F4D06F]">
                          <Check className="h-4 w-4" strokeWidth={2.5} />
                        </span>
                        <p className={`font-inter text-sm font-medium leading-snug text-[#FFF6E5]/90 md:text-[15px] ${isHi ? "font-deva" : ""}`}>{label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="offline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 md:mt-16"
            >
              <div className="mx-auto max-w-3xl text-center">
                <h3 className={`font-playfair text-2xl text-[#FFF6E5] sm:text-3xl md:text-4xl ${isHi ? "font-deva" : ""}`}>{t("bookHavan.offHead")}</h3>
                <p className={`mx-auto mt-4 font-inter text-[15px] leading-relaxed text-[#FFF6E5]/68 md:text-lg ${isHi ? "font-deva" : ""}`}>
                  {t("bookHavan.offSub")}
                </p>
              </div>

              <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {offlineCards.map(({ Icon, title, desc }, i) => (
                  <motion.article
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -40px 0px", amount: 0.12 }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-2xl border border-[#D4A017]/25 bg-gradient-to-b from-[#120905]/95 to-[#070403]/95 p-7 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.95),inset_0_0_0_1px_rgba(244,208,111,0.06)] backdrop-blur-none md:backdrop-blur-xl"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F4D06F]/50 to-transparent opacity-60" />
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4A017]/30 bg-[#070403]/80 text-[#F4D06F] shadow-[0_0_24px_rgba(212,160,23,0.2)]">
                      <Icon className="h-6 w-6" strokeWidth={1.25} />
                    </div>
                    <h4 className={`font-playfair text-lg text-[#F4D06F] md:text-xl ${isHi ? "font-deva" : ""}`}>{title}</h4>
                    <p className={`mt-2 font-inter text-sm leading-relaxed text-[#FFF6E5]/62 ${isHi ? "font-deva" : ""}`}>{desc}</p>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6 — Trust (both modes) */}
        <motion.div className="mt-20 border-t border-[#D4A017]/15 pt-16 md:mt-24 md:pt-20" {...fadeUp}>
          <p className={`text-center font-cinzel text-xs tracking-[0.35em] text-[#D4A017]/85`}>{t("bookHavan.trustHead")}</p>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {trust.map((row, i) => (
              <motion.div
                key={row.l}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-[#D4A017]/20 bg-[#120905]/80 p-6 text-center shadow-[inset_0_1px_0_rgba(255,246,229,0.05)] backdrop-blur-none md:backdrop-blur-md"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,208,111,0.12),transparent_55%)]" />
                <p className="font-playfair text-2xl font-semibold text-[#F4D06F] md:text-3xl">{row.n}</p>
                <p className={`mt-1 font-inter text-xs text-[#FFF6E5]/55 md:text-sm ${isHi ? "font-deva" : ""}`}>{row.l}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 7 — CTA */}
        <motion.div
          className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl md:mt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0c08] via-[#120905] to-[#070403]" />
          <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#D4A017]/20 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-[#F4D06F]/10 blur-3xl" />
          <div className="absolute inset-0 rounded-3xl border border-[#D4A017]/30 shadow-[0_0_0_1px_rgba(244,208,111,0.08),0_32px_100px_-24px_rgba(212,160,23,0.25)]" />
          <motion.div
            className="pointer-events-none absolute inset-0 hidden opacity-[0.15] md:block"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: "linear-gradient(105deg, transparent 40%, rgba(244,208,111,0.4) 50%, transparent 60%)",
              backgroundSize: "200% 200%",
            }}
          />

          <div className="relative z-10 px-6 py-12 text-center md:px-12 md:py-14">
            <div className="mx-auto mb-4 flex justify-center">
              {compactAmbient ? (
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#D4A017]/40 bg-[#070403]/80 text-[#F4D06F] shadow-[0_0_28px_rgba(212,160,23,0.3)]">
                  <Flame className="h-7 w-7" />
                </span>
              ) : (
                <motion.span
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#D4A017]/40 bg-[#070403]/80 text-[#F4D06F] shadow-[0_0_32px_rgba(212,160,23,0.35)]"
                  animate={{
                    boxShadow: [
                      "0 0 24px rgba(212,160,23,0.25)",
                      "0 0 48px rgba(244,208,111,0.45)",
                      "0 0 24px rgba(212,160,23,0.25)",
                    ],
                  }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Flame className="h-7 w-7" />
                </motion.span>
              )}
            </div>
            <h3 className={`font-playfair text-2xl text-[#FFF6E5] sm:text-3xl md:text-4xl ${isHi ? "font-deva" : ""}`}>{t("bookHavan.ctaHead")}</h3>
            <p className={`mx-auto mt-3 max-w-xl font-inter text-sm text-[#FFF6E5]/65 md:text-base ${isHi ? "font-deva" : ""}`}>{t("bookHavan.ctaSub")}</p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={scrollBooking}
                className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F4D06F] via-[#D4A017] to-[#B45309] px-8 py-3.5 text-sm font-semibold text-[#120905] shadow-[0_12px_40px_rgba(212,160,23,0.45)] transition-transform hover:scale-[1.03] md:text-[15px] ${isHi ? "font-deva" : "font-inter"}`}
              >
                <Wifi className="h-4 w-4" />
                {mode === "online" ? t("bookHavan.ctaOnline") : t("bookHavan.ctaOffline")}
              </button>
              <button
                type="button"
                onClick={openPanditChat}
                className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#D4A017]/50 bg-[#070403]/60 px-8 py-3.5 text-sm font-semibold text-[#FFF6E5] shadow-[inset_0_0_0_1px_rgba(244,208,111,0.12)] backdrop-blur-none transition-all hover:border-[#F4D06F]/70 hover:bg-[#120905]/80 md:backdrop-blur-sm md:text-[15px] ${isHi ? "font-deva" : "font-inter"}`}
              >
                <MessageCircle className="h-4 w-4 text-[#F4D06F]" />
                {t("bookHavan.ctaPandit")}
              </button>
            </div>
            <p className="mt-6 font-inter text-xs text-[#FFF6E5]/40">
              <ShieldCheck className="mr-1 inline-block h-3.5 w-3.5 text-[#D4A017]/80" aria-hidden />
              {lang === "hi" ? "सुरक्षित बुकिंग · पारदर्शी संचार" : "Secure booking · Transparent communication"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
