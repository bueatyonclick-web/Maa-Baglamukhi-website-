import React from "react";
import { useAboutGsap } from "./useAboutGsap";
import AboutHeroCinematic from "./AboutHeroCinematic";
import AboutMainSection from "./AboutMainSection";
import AboutDivineLegacy from "./AboutDivineLegacy";
import AboutDivineEnergy from "./AboutDivineEnergy";
import AboutVideoExperience from "./AboutVideoExperience";
import AboutSacredRituals from "./AboutSacredRituals";
import AboutSpiritualQuote from "./AboutSpiritualQuote";
import AboutFinalConnection from "./AboutFinalConnection";

/**
 * Full cinematic About page: hero, main about block, divine legacy history, energy, video experience, rituals, quote, CTA.
 * Theme matches existing ink/saffron luxury UI.
 */
export default function AboutCinematicExperience() {
  useAboutGsap();

  return (
    <article className="relative overflow-x-hidden bg-ink-900" itemScope itemType="https://schema.org/PlaceOfWorship">
      <meta itemProp="name" content="Shree Maa Baglamukhi Siddha Peeth Nalkheda" />
      <AboutHeroCinematic />
      <AboutMainSection />
      <AboutDivineLegacy />
      <AboutDivineEnergy />
      <AboutVideoExperience />
      <AboutSacredRituals />
      <AboutSpiritualQuote />
      <AboutFinalConnection />
    </article>
  );
}
