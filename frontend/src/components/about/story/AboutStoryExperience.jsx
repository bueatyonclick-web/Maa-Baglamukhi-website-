import React, { memo, useMemo } from "react";
import AboutHeroCinematic from "../AboutHeroCinematic";
import AboutFinalConnection from "../AboutFinalConnection";
import StorySection from "./StorySection";
import TimelineSection from "./TimelineSection";
import ExperienceDivineEnergy from "./ExperienceDivineEnergy";
import FAQSection from "./FAQSection";
import { ABOUT_STORY_IMAGES } from "../../../data/content";
import { useLanguage } from "../../../i18n/LanguageContext";
import { TRANSLATIONS } from "../../../i18n/translations";
import { useAboutPageSeo } from "./useAboutPageSeo";

function AboutStoryExperience() {
  useAboutPageSeo();
  const { lang } = useLanguage();

  const articles = useMemo(() => {
    const list = TRANSLATIONS[lang]?.aboutStories?.articles;
    return Array.isArray(list) ? list : [];
  }, [lang]);

  const isHi = lang === "hi";

  return (
    <article className="relative overflow-x-hidden bg-black" itemScope itemType="https://schema.org/PlaceOfWorship">
      <meta itemProp="name" content="Shree Maa Baglamukhi Siddha Peeth Nalkheda" />
      <AboutHeroCinematic />

      <div className="relative bg-gradient-to-b from-[#0a0505] via-black to-[#0a0505]">
        {articles.map((article, index) => (
          <StorySection
            key={article.heading}
            index={index}
            article={article}
            imageSrc={ABOUT_STORY_IMAGES[index] || ABOUT_STORY_IMAGES[0]}
            isHi={isHi}
            imageFirstOnDesktop={index % 2 === 0}
          />
        ))}
      </div>

      <TimelineSection />
      <ExperienceDivineEnergy />
      <FAQSection />
      <AboutFinalConnection />
    </article>
  );
}

export default memo(AboutStoryExperience);
