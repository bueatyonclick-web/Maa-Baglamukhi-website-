import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Plane, Train, Bus, MapPin, Clock, Car } from "lucide-react";
import { MOUNTAIN_IMAGE } from "../../data/content";
import { useLanguage } from "../../i18n/LanguageContext";

const ICONS = [Plane, Train, Bus, Car];

export default function HowToReachSection() {
  const { t } = useLanguage();
  const routes = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => ({
        icon: ICONS[i],
        mode: t(`reach.r${i}m`),
        primary: t(`reach.r${i}p`),
        details: t(`reach.r${i}d`),
      })),
    [t],
  );

  return (
    <section id="reach" className="relative py-24 lg:py-32 overflow-hidden" data-testid="reach-section">
      <div className="absolute inset-0">
        <img src={MOUNTAIN_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/85 to-ink-900" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="font-cinzel text-saffron-300 text-xs tracking-[0.5em] mb-5">{t("reach.label")}</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            {t("reach.titleBefore")} <span className="text-gold-shimmer italic">{t("reach.titleAccent")}</span>
            {t("reach.titlePlace") ? ` ${t("reach.titlePlace")}` : ""}
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-saffron-300" /> {t("reach.address")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((r, i) => (
            <motion.div
              key={r.mode}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl glass-card p-7 hover:border-saffron-400 transition-all"
              data-testid={`route-${i}`}
            >
              <div className="w-14 h-14 rounded-full grid place-items-center bg-saffron-500/15 border border-saffron-500/30 text-saffron-300 mb-5">
                <r.icon className="w-6 h-6" />
              </div>
              <p className="font-cinzel text-saffron-300/80 text-[10px] tracking-[0.3em]">{r.mode}</p>
              <h3 className="font-serif text-xl text-white mt-2">{r.primary}</h3>
              <p className="text-white/65 text-sm mt-3 leading-relaxed">{r.details}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl overflow-hidden border border-saffron-500/20" data-testid="map-embed">
          <iframe
            title={t("reach.mapTitle")}
            src="https://www.google.com/maps?q=Nalkheda+Baglamukhi+Temple&output=embed"
            className="w-full h-80 grayscale"
            loading="lazy"
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/65 text-sm">
          <Badge icon={Clock} label={t("reach.badge1")} />
          <Badge icon={Car} label={t("reach.badge2")} />
          <Badge icon={MapPin} label={t("reach.badge3")} />
        </div>
      </div>
    </section>
  );
}

const Badge = ({ icon: Icon, label }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
    <Icon className="w-4 h-4 text-saffron-300" /> {label}
  </div>
);
