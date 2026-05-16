import React, { memo, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { useLanguage } from "../../../i18n/LanguageContext";
import { TRANSLATIONS } from "../../../i18n/translations";
import GlowDivider from "./GlowDivider";

function FAQSection() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";

  const items = useMemo(() => {
    const list = TRANSLATIONS[lang]?.aboutFaq?.items;
    return Array.isArray(list) ? list : [];
  }, [lang]);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "about-faq-schema";
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
    return () => {
      document.getElementById("about-faq-schema")?.remove();
    };
  }, [items]);

  const headingClass = isHi ? "font-deva leading-snug" : "font-serif";

  return (
    <section
      id="about-faq"
      className="relative scroll-mt-28 bg-[#070605] py-24 lg:scroll-mt-32 lg:py-32"
      aria-labelledby="about-faq-heading"
    >
      <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className={isHi ? "font-deva text-sm tracking-[0.2em] text-amber-300/90" : "font-cinzel text-xs tracking-[0.5em] text-amber-300/90"}>
            {t("aboutFaq.label")}
          </p>
          <h2 id="about-faq-heading" className={`mt-5 text-4xl text-white sm:text-5xl ${headingClass}`}>
            {t("aboutFaq.headingBefore")}{" "}
            <span className="text-gold-shimmer italic">{t("aboutFaq.headingAccent")}</span>
          </h2>
          <p className={`mt-5 text-white/65 ${isHi ? "font-deva" : ""}`}>{t("aboutFaq.intro")}</p>
          <GlowDivider className="mx-auto mt-10" />
        </motion.div>

        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {items.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`faq-${i}`}
              className="overflow-hidden rounded-xl border border-amber-500/25 bg-black/30 px-4 backdrop-blur-md data-[state=open]:shadow-[0_0_40px_-12px_rgba(245,158,11,0.3)] sm:px-5"
            >
              <AccordionTrigger
                className={`py-5 text-left text-base text-amber-50/95 hover:no-underline sm:text-lg ${
                  isHi ? "font-deva leading-snug" : "font-serif"
                }`}
              >
                {item.q}
              </AccordionTrigger>
              <AccordionContent className={`pb-5 text-sm leading-relaxed text-white/70 sm:text-base ${isHi ? "font-deva" : ""}`}>
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default memo(FAQSection);
