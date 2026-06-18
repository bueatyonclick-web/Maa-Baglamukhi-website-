import React, { memo, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Compass, Flame, Globe2, Sparkles, UserCheck } from "lucide-react";
import { fetchAdminJson, getAdminApiOrigin, resolveAdminAssetUrl } from "../../../lib/adminApi";
import { openWhatsApp } from "../../../lib/whatsapp";
import { useLanguage } from "../../../i18n/LanguageContext";
import { TRANSLATIONS } from "../../../i18n/translations";

const DEFAULT_PANDIT_IMAGE = `${process.env.PUBLIC_URL || ""}/pandit-ankit-sharma.webp`;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -48px 0px", amount: 0.12 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const TRUST_ICONS = [Globe2, Sparkles, UserCheck, Compass];

function GoldenParticles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 13.7) % 100}%`,
        top: `${(i * 17.3) % 100}%`,
        delay: (i % 6) * 0.35,
        dur: 4 + (i % 4),
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute h-1 w-1 rounded-full bg-amber-400/70 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
          style={{ left: d.left, top: d.top }}
          animate={{ opacity: [0.15, 0.65, 0.15], scale: [0.7, 1.15, 0.7] }}
          transition={{ duration: d.dur, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
        />
      ))}
    </div>
  );
}

function openPanditChat(message) {
  openWhatsApp(message);
}

function MeetPanditJiSection() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const [panditImage, setPanditImage] = useState(DEFAULT_PANDIT_IMAGE);

  useEffect(() => {
    const origin = getAdminApiOrigin();
    if (!origin) return;

    let cancelled = false;
    (async () => {
      const data = await fetchAdminJson("/api/settings/website");
      if (cancelled) return;
      const url = data?.website?.panditProfileImage;
      if (url) setPanditImage(resolveAdminAssetUrl(url) || DEFAULT_PANDIT_IMAGE);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const trustCards = useMemo(() => {
    const list = TRANSLATIONS[lang]?.aboutPandit?.trustCards;
    return Array.isArray(list) ? list : [];
  }, [lang]);

  const chips = useMemo(() => {
    const list = TRANSLATIONS[lang]?.aboutPandit?.chips;
    return Array.isArray(list) ? list : [];
  }, [lang]);

  const headingClass = isHi ? "font-deva leading-snug" : "font-serif";

  return (
    <section
      id="about-pandit"
      className="relative scroll-mt-28 overflow-hidden border-y border-amber-500/10 bg-gradient-to-br from-[#050302] via-[#0a0505] to-[#140a06] py-20 sm:py-24 lg:scroll-mt-32 lg:py-32"
      aria-labelledby="about-pandit-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_20%_50%,rgba(180,83,9,0.12)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_85%_40%,rgba(212,160,23,0.06)_0%,transparent_50%)]" />
      <GoldenParticles />

      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8 xl:px-10">
        <motion.div {...fadeUp} className="mb-12 text-center lg:mb-14">
          <p
            className={`mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/15 to-amber-600/5 px-4 py-2 shadow-[0_0_24px_rgba(245,158,11,0.12)] ${
              isHi ? "font-deva text-base tracking-wide text-amber-200" : "font-cinzel text-xs tracking-[0.42em] text-saffron-300"
            }`}
          >
            {t("aboutPandit.badge")}
          </p>
          <h2
            id="about-pandit-heading"
            className={`text-3xl text-white sm:text-4xl lg:text-5xl ${headingClass}`}
          >
            <span className="text-gold-shimmer">{t("aboutPandit.heading")}</span>
          </h2>
          <p
            className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed text-amber-100/80 sm:text-lg ${isHi ? "font-deva leading-loose" : ""}`}
          >
            {t("aboutPandit.subheading")}
          </p>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(300px,44%)_1fr] lg:gap-14 xl:gap-16">
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.06 }}
            className="order-1 flex justify-center lg:order-1 lg:justify-start"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative w-full max-w-[min(100%,560px)] lg:max-w-none"
            >
              <div
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-amber-500/25 via-amber-600/10 to-transparent opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-amber-500/35 bg-gradient-to-br from-[#1a0f08] to-black p-1.5 shadow-[0_0_60px_rgba(245,158,11,0.18),inset_0_1px_0_rgba(255,246,229,0.08)] transition-[border-color,box-shadow] duration-500 group-hover:border-amber-400/55 group-hover:shadow-[0_0_80px_rgba(245,158,11,0.28),inset_0_1px_0_rgba(255,246,229,0.12)]">
                <div className="overflow-hidden rounded-[1.5rem] bg-black/40">
                  <img
                    src={panditImage}
                    alt={t("aboutPandit.imageAlt")}
                    className="aspect-[4/5] w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                    width={640}
                    height={800}
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-2 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" aria-hidden />
            </motion.div>
          </motion.div>

          <div className="order-2 min-w-0 lg:order-2">
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
              <h3 className={`text-2xl text-amber-100 sm:text-3xl ${isHi ? "font-deva" : "font-serif"}`}>
                {t("aboutPandit.name")}
              </h3>
              <p
                className={`mt-5 text-base leading-relaxed text-white/75 sm:text-lg ${isHi ? "font-deva leading-loose" : ""}`}
              >
                {t("aboutPandit.description")}
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.14 }}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {trustCards.map((card, i) => {
                const Icon = TRUST_ICONS[i] || Flame;
                return (
                  <motion.div
                    key={card.title}
                    whileHover={{ y: -3, borderColor: "rgba(251, 191, 36, 0.45)" }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl border border-amber-500/20 bg-black/35 p-4 backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(245,158,11,0.12)] sm:p-5"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                      <Icon className="h-5 w-5 text-amber-300" aria-hidden />
                    </div>
                    <p className={`text-sm font-medium text-amber-50/95 sm:text-base ${isHi ? "font-deva leading-snug" : "font-serif"}`}>
                      {card.title}
                    </p>
                    {card.desc ? (
                      <p className={`mt-1.5 text-xs leading-relaxed text-white/55 sm:text-sm ${isHi ? "font-deva" : ""}`}>
                        {card.desc}
                      </p>
                    ) : null}
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.18 }} className="mt-8">
              <p
                className={`mb-3 text-sm tracking-wide text-amber-300/80 ${isHi ? "font-deva" : "font-cinzel uppercase tracking-[0.3em]"}`}
              >
                {t("aboutPandit.expertiseLabel")}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className={`inline-flex items-center rounded-full border border-amber-500/35 bg-gradient-to-r from-amber-500/12 to-amber-600/5 px-3.5 py-1.5 text-sm text-amber-100/90 shadow-[0_0_16px_rgba(245,158,11,0.08)] transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_24px_rgba(245,158,11,0.18)] ${isHi ? "font-deva" : "font-sans"}`}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.22 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <button
                type="button"
                onClick={() => openPanditChat(t("whatsapp.messagePandit"))}
                className="btn-primary-sacred w-full px-8 py-3.5 text-sm sm:w-auto sm:min-w-[220px] md:text-base"
              >
                {t("aboutPandit.ctaContact")}
              </button>
              <Link
                to="/book-puja"
                className="inline-flex w-full items-center justify-center rounded-full border border-amber-500/35 bg-black/40 px-8 py-3.5 text-sm text-white/90 backdrop-blur-md transition-all hover:border-amber-400/55 hover:bg-amber-500/5 sm:w-auto sm:min-w-[200px] md:text-base"
              >
                {t("aboutPandit.ctaBook")}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(MeetPanditJiSection);
