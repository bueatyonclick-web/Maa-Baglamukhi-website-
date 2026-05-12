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
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-about-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 56, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
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
