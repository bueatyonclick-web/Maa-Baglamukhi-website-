import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { TRANSLATIONS } from "../../i18n/translations";
import RitualVisual from "./knowledge/RitualVisual";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -48px 0px", amount: 0.12 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

function parseBodyLines(body) {
  if (!body || typeof body !== "string") return { paragraphs: [], bullets: [] };
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  const bullets = lines.filter((l) => l.startsWith("•"));
  const paragraphs = lines.filter((l) => !l.startsWith("•"));
  return { paragraphs, bullets };
}

function SevenPointCard({ index, heading, body, isHi, delay }) {
  const { paragraphs, bullets } = parseBodyLines(body);

  return (
    <motion.article
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay }}
      className="group rounded-xl border border-amber-500/20 bg-[rgba(12,6,5,0.72)] p-5 shadow-[inset_0_1px_0_rgba(255,246,229,0.04)] backdrop-blur-lg transition-[border-color,box-shadow] duration-300 hover:border-amber-400/35 hover:shadow-[0_0_36px_rgba(245,158,11,0.1)] sm:p-6"
    >
      <div className="flex gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-500/45 bg-gradient-to-br from-amber-500/20 to-amber-700/10 font-cinzel text-sm text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className={`text-lg text-amber-50 sm:text-xl ${isHi ? "font-deva leading-snug" : "font-serif"}`}>
            {heading}
          </h3>
          {paragraphs.map((p) => (
            <p
              key={p.slice(0, 24)}
              className={`mt-3 text-base leading-relaxed text-white/75 sm:text-[17px] ${isHi ? "font-deva" : ""}`}
            >
              {p}
            </p>
          ))}
          {bullets.length > 0 && (
            <ul className={`mt-3 space-y-2 ${isHi ? "font-deva" : ""}`}>
              {bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-white/70 sm:text-base">
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-amber-400/85" aria-hidden />
                  <span>{b.replace(/^•\s*/, "")}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function MaaBaglamukhiKnowledgeSection() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";

  const sevenPoints = useMemo(() => {
    const list = TRANSLATIONS[lang]?.aboutTemple?.sections;
    return Array.isArray(list) ? list : [];
  }, [lang]);

  const practices = useMemo(() => {
    const list = TRANSLATIONS[lang]?.maaKnowledge?.practices;
    return Array.isArray(list) ? list : [];
  }, [lang]);

  return (
    <section
      id="maa-knowledge"
      className="relative scroll-mt-28 overflow-hidden border-y border-saffron-500/10 bg-gradient-to-b from-[#070605] via-[#0a0505] to-[#070605] py-16 sm:py-20 md:py-24 lg:scroll-mt-32 lg:py-28"
      data-testid="maa-knowledge-section"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(180,83,9,0.12)_0%,transparent_55%)]" aria-hidden />

      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8 xl:px-10">
        <motion.div {...fadeUp} className="mb-12 text-center lg:mb-14 lg:text-left">
          <p
            className={`mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/15 to-amber-600/5 px-4 py-2 shadow-[0_0_24px_rgba(245,158,11,0.12)] ${
              isHi ? "font-deva text-base tracking-wide text-amber-200" : "font-cinzel text-xs tracking-[0.42em] text-saffron-300"
            }`}
          >
            <BookOpen className="h-4 w-4 shrink-0 text-amber-400" aria-hidden />
            {t("maaKnowledge.badge")}
          </p>
          <h2 className={`text-2xl leading-snug text-white sm:text-3xl lg:text-4xl ${isHi ? "font-deva" : "font-serif"}`}>
            <span className="text-gold-shimmer">{t("maaKnowledge.title")}</span>
          </h2>
          <p className={`mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0 ${isHi ? "font-deva leading-loose" : ""}`}>
            {t("maaKnowledge.subtitle")}
          </p>
          <p className={`mx-auto mt-4 max-w-3xl text-base leading-relaxed text-amber-100/70 sm:text-lg lg:mx-0 ${isHi ? "font-deva leading-loose" : ""}`}>
            {t("aboutTemple.p1")}
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.06 }}>
          <p
            className={`mb-6 text-center text-sm tracking-wide text-amber-300/85 lg:text-left ${isHi ? "font-deva text-base" : "font-cinzel uppercase tracking-[0.35em]"}`}
          >
            {t("maaKnowledge.sevenPointsLabel")}
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
            {sevenPoints.map((item, i) => (
              <SevenPointCard
                key={item.heading}
                index={i}
                heading={item.heading}
                body={item.body}
                isHi={isHi}
                delay={0.08 + i * 0.04}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.12 }}
          className="mt-16 lg:mt-20"
        >
          <p
            className={`mb-8 text-center text-sm tracking-wide text-amber-300/85 lg:text-left ${isHi ? "font-deva text-base" : "font-cinzel uppercase tracking-[0.35em]"}`}
          >
            {t("maaKnowledge.practicesLabel")}
          </p>
          <div className="space-y-12 lg:space-y-16">
            {practices.map((practice, i) => {
              const { paragraphs, bullets } = parseBodyLines(practice.body);
              const imageFirst = i % 2 === 0;

              return (
                <motion.div
                  key={practice.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                    imageFirst ? "" : "lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1"
                  }`}
                >
                  <div className="flex justify-center lg:justify-start">
                    <RitualVisual type={practice.visual} />
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-xl text-amber-50 sm:text-2xl ${isHi ? "font-deva leading-snug" : "font-serif"}`}>
                      {practice.title}
                    </h3>
                    {practice.summary && (
                      <p className={`mt-3 text-base text-amber-200/80 sm:text-lg ${isHi ? "font-deva" : ""}`}>
                        {practice.summary}
                      </p>
                    )}
                    {paragraphs.map((p) => (
                      <p
                        key={p.slice(0, 20)}
                        className={`mt-4 text-base leading-relaxed text-white/75 sm:text-[17px] ${isHi ? "font-deva leading-loose" : ""}`}
                      >
                        {p}
                      </p>
                    ))}
                    {bullets.length > 0 && (
                      <ul className={`mt-4 space-y-2.5 ${isHi ? "font-deva" : ""}`}>
                        {bullets.map((b) => (
                          <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-white/70 sm:text-base">
                            <Sparkles className="mt-1 h-4 w-4 shrink-0 text-amber-400/85" aria-hidden />
                            <span>{b.replace(/^•\s*/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
