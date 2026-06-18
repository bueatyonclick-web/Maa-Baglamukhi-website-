import { useEffect } from "react";
import { destroySmoothScroll, initSmoothScroll } from "../lib/smoothScroll";

/** Mount site-wide smooth scrolling once per app shell. */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);
}
