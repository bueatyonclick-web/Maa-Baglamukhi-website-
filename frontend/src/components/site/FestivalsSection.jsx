import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { apiGet } from "../../lib/api";
import { useLanguage } from "../../i18n/LanguageContext";

function useCountdown(target) {
  const [diff, setDiff] = useState(null);
  useEffect(() => {
    const tick = () => {
      const targetMs = new Date(target).getTime() - Date.now();
      if (targetMs <= 0) return setDiff({ d: 0, h: 0, m: 0, s: 0 });
      setDiff({
        d: Math.floor(targetMs / (1000 * 60 * 60 * 24)),
        h: Math.floor((targetMs / (1000 * 60 * 60)) % 24),
        m: Math.floor((targetMs / (1000 * 60)) % 60),
        s: Math.floor((targetMs / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return diff;
}

const FestivalCard = ({ festival, idx, t, locale, isHi }) => {
  const c = useCountdown(festival.date);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="rounded-2xl glass-card p-7 hover:border-saffron-400 transition-all"
      data-testid={`festival-card-${festival.id}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={`text-saffron-300 ${isHi ? "font-deva text-sm leading-snug tracking-wide md:text-base" : "font-cinzel text-[10px] tracking-[0.3em]"}`}
          >
            {t("festivals.cardLabel")}
          </p>
          <h3 className={`mt-2 text-2xl text-white ${isHi ? "font-deva leading-snug" : "font-serif"}`}>{festival.name}</h3>
          <p className={`mt-1 flex items-center gap-1.5 text-white/55 ${isHi ? "font-deva text-sm leading-snug" : "text-xs"}`}>
            <Calendar className="w-3.5 h-3.5" />
            {new Date(festival.date).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
      <p className={`mt-3 text-sm leading-relaxed text-white/65 ${isHi ? "font-deva text-[15px]" : ""}`}>{festival.description}</p>

      {c && (
        <div className="mt-5 grid grid-cols-4 gap-2 text-center">
          {[
            { v: c.d, l: t("festivals.days") },
            { v: c.h, l: t("festivals.hrs") },
            { v: c.m, l: t("festivals.min") },
            { v: c.s, l: t("festivals.sec") },
          ].map((u) => (
            <div key={u.l} className="bg-ink-800/80 border border-saffron-500/15 rounded-lg px-1 py-2.5 sm:py-3">
              <p className="font-serif text-2xl text-saffron-300 leading-none tabular-nums">{String(u.v).padStart(2, "0")}</p>
              <p
                className={`mt-1.5 text-center text-white/55 ${isHi ? "font-deva text-xs leading-snug sm:text-[13px]" : "text-[10px] tracking-wider"}`}
              >
                {u.l}
              </p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function FestivalsSection() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const locale = lang === "hi" ? "hi-IN" : "en-IN";
  const [festivals, setFestivals] = useState([]);
  useEffect(() => {
    apiGet("/festivals").then((d) => setFestivals(d.festivals || [])).catch(() => {});
  }, []);

  return (
    <section id="festivals" className="py-24 lg:py-32" data-testid="festivals-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className={`mb-5 text-saffron-300 ${isHi ? "font-deva text-sm tracking-[0.2em] md:text-base" : "font-cinzel text-xs tracking-[0.5em]"}`}>
            {t("festivals.label")}
          </p>
          <h2 className={`text-4xl text-white sm:text-5xl lg:text-6xl ${isHi ? "font-deva leading-snug" : "font-serif"}`}>
            {t("festivals.titleBefore")} <span className="text-gold-shimmer italic">{t("festivals.titleAccent")}</span>
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto text-white/70 ${isHi ? "font-deva text-base leading-relaxed md:text-lg" : ""}`}>{t("festivals.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {festivals.map((f, i) => (
            <FestivalCard key={f.id} festival={f} idx={i} t={t} locale={locale} isHi={isHi} />
          ))}
        </div>
      </div>
    </section>
  );
}
