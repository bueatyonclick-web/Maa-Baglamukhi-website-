import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic scroll reveals for About page only.
 * Keeps animations slow, premium, and non-intrusive.
 */
export function useAboutGsap() {
  useLayoutEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-about-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
              fastScrollEnd: true,
            },
          },
        );
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);
}
