import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useLanguage } from "../../i18n/LanguageContext";

const FAQ_COUNT = 5;

export default function FAQSection() {
  const { t } = useLanguage();
  return (
    <section className="py-24 lg:py-32" data-testid="faq-section">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <p className="font-cinzel text-saffron-300 text-xs tracking-[0.5em] mb-5">{t("faq.label")}</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white">
            {t("faq.titleBefore")} <span className="text-gold-shimmer italic">{t("faq.titleAccent")}</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {Array.from({ length: FAQ_COUNT }, (_, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl glass-card border border-saffron-500/15 px-6 data-[state=open]:border-saffron-400/40 transition-all"
              data-testid={`faq-${i}`}
            >
              <AccordionTrigger className="font-serif text-lg text-white hover:no-underline hover:text-saffron-300 text-left">
                {t(`faq.q${i}`)}
              </AccordionTrigger>
              <AccordionContent className="text-white/70 leading-relaxed">{t(`faq.a${i}`)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
