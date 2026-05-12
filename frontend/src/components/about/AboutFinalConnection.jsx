import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export default function AboutFinalConnection() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const planVisit = (e) => {
    e.preventDefault();
    navigate("/");
    window.setTimeout(() => {
      document.getElementById("reach")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
  };

  return (
    <section className="relative overflow-hidden pb-28 pt-8 lg:pb-36" aria-labelledby="final-connection-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,158,11,0.12),transparent_55%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10" data-about-reveal>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-saffron-400 to-saffron-700 shadow-[0_0_40px_rgba(245,158,11,0.45)] animate-diya-float"
          aria-hidden
        >
          <Flame className="h-8 w-8 text-ink-900" />
        </motion.div>
        <h2 id="final-connection-heading" className="font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
          {t("aboutFinal.titleBefore")} <span className="text-gold-shimmer italic">{t("aboutFinal.titleAccent")}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{t("aboutFinal.body")}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/book-puja" className="btn-primary-sacred px-8 py-3 text-sm md:text-base">
            {t("aboutFinal.bookPuja")}
          </Link>
          <button
            type="button"
            onClick={planVisit}
            className="inline-flex items-center justify-center rounded-full border border-saffron-500/35 bg-ink-900/50 px-8 py-3 text-sm text-white/90 backdrop-blur-md transition-all hover:border-saffron-400/55 hover:bg-ink-800/60 md:text-base"
          >
            {t("aboutFinal.planVisit")}
          </button>
        </div>
      </div>
    </section>
  );
}
