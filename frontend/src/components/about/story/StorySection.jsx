import React, { memo } from "react";
import { motion } from "framer-motion";
import FormattedStoryContent from "./FormattedStoryContent";
import GlowDivider from "./GlowDivider";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
};

function StoryImage({ src, alt }) {
  return (
    <motion.div {...fadeUp} className="group relative mx-auto w-full max-w-md lg:max-w-none">
      <motion.div
        className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-amber-500/25 shadow-[0_24px_80px_-20px_rgba(245,158,11,0.35)]"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform" }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <motion.div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" aria-hidden />
        <motion.div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-amber-400/15" aria-hidden />
      </motion.div>
    </motion.div>
  );
}

function StorySection({ index, article, imageSrc, isHi, imageFirstOnDesktop }) {
  const headingClass = isHi
    ? "font-deva text-3xl leading-snug text-white sm:text-4xl lg:text-5xl"
    : "font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl";
  const labelClass = isHi
    ? "font-deva text-sm tracking-[0.2em] text-amber-300/95 md:text-base"
    : "font-cinzel text-xs tracking-[0.45em] text-amber-300/95";

  const imageBlock = <StoryImage src={imageSrc} alt={article.imageAlt} />;
  const contentBlock = (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
      <p className={labelClass}>{article.subtitle}</p>
      <h2 className={`mt-4 ${headingClass}`}>{article.heading}</h2>
      <GlowDivider className="mx-0 mt-8" />
      <FormattedStoryContent
        paragraphs={article.paragraphs}
        quote={article.quote}
        points={article.points}
        isHi={isHi}
      />
    </motion.div>
  );

  const columns = imageFirstOnDesktop ? (
    <>
      {imageBlock}
      {contentBlock}
    </>
  ) : (
    <>
      {contentBlock}
      {imageBlock}
    </>
  );

  return (
    <section
      id={`about-story-${index}`}
      className="relative scroll-mt-28 py-20 lg:scroll-mt-32 lg:py-28"
      aria-labelledby={`about-story-heading-${index}`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-1/4 top-1/3 h-96 w-96 rounded-full bg-amber-600/[0.04] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <h2 id={`about-story-heading-${index}`} className="sr-only">
          {article.heading}
        </h2>

        <div className="flex flex-col gap-12 lg:hidden">
          {imageBlock}
          {contentBlock}
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-24">{columns}</div>
      </div>
    </section>
  );
}

export default memo(StorySection);
