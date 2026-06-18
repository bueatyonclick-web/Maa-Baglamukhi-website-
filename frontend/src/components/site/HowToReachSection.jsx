import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Plane, Train, Bus, Car, MapPin } from "lucide-react";
import { MOUNTAIN_IMAGE, TEMPLE_MAP_EMBED_URL } from "../../data/content";
import { useLanguage } from "../../i18n/LanguageContext";
import { TRANSLATIONS } from "../../i18n/translations";

const ROUTE_CONFIG = [
  { key: 0, icon: Plane, type: "simple" },
  { key: 1, icon: Train, type: "train" },
  { key: 2, icon: Bus, type: "simple" },
  { key: 3, icon: Car, type: "simple" },
];

function RouteCard({ route, index, isHi }) {
  const { icon: Icon, mode, type, stations, primary, details } = route;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl glass-card p-7 transition-all hover:border-saffron-400"
      data-testid={`route-${index}`}
    >
      <div className="mb-5 grid h-14 w-14 place-items-center rounded-full border border-saffron-500/30 bg-saffron-500/15 text-saffron-300">
        <Icon className="h-6 w-6" />
      </div>
      <p className="font-cinzel text-[10px] tracking-[0.3em] text-saffron-300/80">{mode}</p>

      {type === "train" && stations?.length > 0 ? (
        <div className="mt-3 space-y-4">
          {stations.map((station, si) => (
            <div
              key={station.title}
              className={`${si > 0 ? "border-t border-saffron-500/15 pt-4" : ""}`}
            >
              <h3 className={`text-lg text-white sm:text-xl ${isHi ? "font-deva leading-snug" : "font-serif"}`}>
                {station.title}
              </h3>
              {station.detail?.trim() ? (
                <p className={`mt-2 text-sm leading-relaxed text-white/65 sm:text-[15px] ${isHi ? "font-deva" : ""}`}>
                  {station.detail}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <>
          <h3 className={`mt-2 text-xl text-white ${isHi ? "font-deva" : "font-serif"}`}>{primary}</h3>
          <p className={`mt-3 text-sm leading-relaxed text-white/65 ${isHi ? "font-deva" : ""}`}>{details}</p>
        </>
      )}
    </motion.div>
  );
}

export default function HowToReachSection() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";

  const routes = useMemo(() => {
    const reach = TRANSLATIONS[lang]?.reach || TRANSLATIONS.en.reach;
    return ROUTE_CONFIG.map(({ key, icon, type }) => ({
      icon,
      type,
      mode: t(`reach.r${key}m`),
      primary: type === "simple" ? t(`reach.r${key}p`) : undefined,
      details: type === "simple" ? t(`reach.r${key}d`) : undefined,
      stations: type === "train" && Array.isArray(reach.r1stations) ? reach.r1stations : [],
    }));
  }, [lang, t]);

  return (
    <section id="reach" className="relative overflow-hidden pt-10 pb-24 lg:pt-12 lg:pb-32" data-testid="reach-section">
      <div className="absolute inset-0">
        <img src={MOUNTAIN_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/85 to-ink-900" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 text-center lg:mb-12">
          <p className="mb-5 font-cinzel text-xs tracking-[0.5em] text-saffron-300">{t("reach.label")}</p>
          <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            {t("reach.titleBefore")} <span className="text-gold-shimmer italic">{t("reach.titleAccent")}</span>
            {t("reach.titlePlace") ? ` ${t("reach.titlePlace")}` : ""}
          </h2>
          <p className="mx-auto mt-4 flex max-w-2xl items-center justify-center gap-2 text-white/70">
            <MapPin className="h-4 w-4 text-saffron-300" /> {t("reach.address")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {routes.map((route, i) => (
            <RouteCard key={route.mode} route={route} index={i} isHi={isHi} />
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-saffron-500/20" data-testid="map-embed">
          <iframe
            title={t("reach.mapTitle")}
            src={TEMPLE_MAP_EMBED_URL}
            className="h-80 w-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
