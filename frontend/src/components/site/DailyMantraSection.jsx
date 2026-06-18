import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";

export default function DailyMantraSection() {
  const { t } = useLanguage();

  return (
    <section
      id="daily-mantra"
      className="relative scroll-mt-28 overflow-hidden py-24 mandala-bg lg:scroll-mt-32 lg:py-32"
      data-testid="daily-mantra-section"
    >
      <div className="absolute inset-0">
        <div className="absolute -left-32 top-12 w-[500px] h-[500px] rounded-full bg-saffron-500/8 blur-3xl" />
        <div className="absolute -right-20 bottom-12 w-[400px] h-[400px] rounded-full bg-crimson-700/10 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-cinzel text-saffron-300 text-xs tracking-[0.5em] mb-5"
        >
          {t("mantra.label")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-deva text-2xl sm:text-3xl lg:text-5xl text-saffron-100 leading-[1.5] max-w-4xl mx-auto"
          data-testid="mantra-sanskrit"
        >
          {t("mantra.sanskrit")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 text-white/70 italic max-w-2xl mx-auto text-base lg:text-lg"
        >
          &ldquo;{t("mantra.meaning")}&rdquo;
        </motion.p>

        <div className="divider-sacred mt-12 mx-auto max-w-md" />
      </div>
    </section>
  );
}
