import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Flame } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { TRANSLATIONS } from "../../i18n/translations";
import AnimatedHavanKund from "./havan/AnimatedHavanKund";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -48px 0px", amount: 0.12 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

function SectionAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_30%_50%,rgba(180,83,9,0.1)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(212,160,23,0.05)_0%,transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-saffron-500/20 to-transparent" />
    </div>
  );
}

export default function BaglamukhiHavanSection() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";

  const items = useMemo(() => {
    const list = TRANSLATIONS[lang]?.havanInfo?.items;
    return Array.isArray(list) ? list : [];
  }, [lang]);

  return (
    <section
      id="havan-info"
      className="relative scroll-mt-28 overflow-hidden border-y border-saffron-500/10 bg-gradient-to-br from-[#050302] via-[#0A0505] to-[#140a06] py-16 sm:py-20 md:py-24 lg:scroll-mt-32 lg:py-28"
      data-testid="baglamukhi-havan-section"
    >
      <SectionAtmosphere />

      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section header — full width */}
        <motion.div {...fadeUp} className="mb-10 text-center lg:mb-12 lg:text-left">
          <p
            className={`mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/15 to-amber-600/5 px-4 py-2 shadow-[0_0_24px_rgba(245,158,11,0.12)] ${
              isHi ? "font-deva text-base tracking-wide text-amber-200" : "font-cinzel text-xs tracking-[0.42em] text-saffron-300"
            }`}
          >
            <Flame className="h-4 w-4 shrink-0 text-amber-400" aria-hidden />
            {t("havanInfo.badge")}
          </p>
          <h2
            className={`text-2xl leading-snug text-white sm:text-3xl lg:text-4xl xl:text-[2.75rem] ${isHi ? "font-deva" : "font-serif"}`}
          >
            <span className="text-gold-shimmer">{t("havanInfo.title")}</span>
          </h2>
          <p
            className={`mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0 ${isHi ? "font-deva leading-loose" : ""}`}
          >
            {t("havanInfo.subtitle")}
          </p>
        </motion.div>

        {/* Image + details — vertically centered on desktop */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(300px,42%)_1fr] lg:gap-12 xl:grid-cols-[minmax(340px,44%)_1fr] xl:gap-14">
          {/* Left — larger havan image, vertically centered */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.06 }}
            className="order-1 flex flex-col items-center justify-center lg:order-1 lg:items-start lg:self-center"
          >
            <div className="relative w-full max-w-[min(100%,620px)] sm:max-w-[580px] lg:max-w-none xl:max-w-[720px]">
              <AnimatedHavanKund />
            </div>
            <p
              className={`mt-5 max-w-[720px] text-center text-sm leading-relaxed text-amber-200/50 sm:text-base lg:text-left ${isHi ? "font-deva leading-loose" : "font-sans italic"}`}
            >
              {t("havanInfo.visualCaption")}
            </p>
          </motion.div>

          {/* Right — accordion + note */}
          <div className="order-2 min-w-0 lg:order-2">
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
              <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
                {items.map((item, i) => (
                  <AccordionItem
                    key={item.title}
                    value={`item-${i}`}
                    className="group overflow-hidden rounded-xl border border-amber-500/20 border-b border-b-amber-500/20 bg-[rgba(12,6,5,0.72)] shadow-[inset_0_1px_0_rgba(255,246,229,0.04)] backdrop-blur-lg transition-[border-color,box-shadow,background-color] duration-300 hover:border-amber-400/40 hover:shadow-[0_0_36px_rgba(245,158,11,0.1)] data-[state=open]:border-amber-400/45 data-[state=open]:bg-[rgba(245,158,11,0.06)] data-[state=open]:shadow-[0_0_48px_rgba(245,158,11,0.16),inset_0_1px_0_rgba(255,246,229,0.08)]"
                  >
                    <AccordionTrigger
                      className={`gap-4 px-5 py-4 text-left hover:no-underline sm:px-6 sm:py-5 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:shrink-0 [&>svg]:text-amber-400/80 ${
                        isHi ? "font-deva text-lg sm:text-xl" : "font-serif text-lg sm:text-xl"
                      }`}
                    >
                      <span className="flex min-w-0 flex-1 items-start gap-4 text-left">
                        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-500/45 bg-gradient-to-br from-amber-500/20 to-amber-700/10 text-sm font-cinzel text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)] sm:h-9 sm:w-9">
                          {i + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-amber-50">{item.title}</span>
                          {item.summary && (
                            <span className={`mt-1.5 block text-base font-normal leading-relaxed text-white/60 sm:text-[17px] ${isHi ? "font-deva" : ""}`}>
                              {item.summary}
                            </span>
                          )}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className={`px-5 pb-5 sm:px-6 sm:pb-6 ${isHi ? "font-deva" : ""}`}>
                      <div className="ml-12 whitespace-pre-line border-l-2 border-amber-500/30 pl-5 text-base leading-[1.85] text-white/85 sm:ml-[2.75rem] sm:text-[17px] sm:leading-[1.9] md:text-lg">
                        {item.body}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.16 }}
              className="mt-8 overflow-hidden rounded-xl border border-amber-500/25 border-l-[3px] border-l-amber-400 bg-[rgba(12,6,5,0.8)] p-5 shadow-[0_0_40px_rgba(245,158,11,0.08),inset_0_1px_0_rgba(255,246,229,0.05)] backdrop-blur-lg sm:p-6"
              data-testid="havan-info-note"
            >
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.3)] sm:h-11 sm:w-11">
                  <AlertCircle className="h-5 w-5 text-amber-300" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className={`text-base font-medium text-amber-200/95 sm:text-lg ${isHi ? "font-deva" : "font-serif"}`}>
                    {t("havanInfo.noteTitle")}
                  </p>
                  <p className={`mt-2 text-base leading-relaxed text-white/75 sm:text-[17px] sm:leading-loose ${isHi ? "font-deva" : ""}`}>
                    {t("havanInfo.noteBody")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
