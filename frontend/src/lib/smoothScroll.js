import Lenis from "lenis";

/** Fixed navbar clearance for anchor / programmatic scroll. */
export const SCROLL_OFFSET = 88;

let lenisInstance = null;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Site-wide Lenis instance — smooth wheel on desktop, synced touch inertia on mobile.
 */
export function initSmoothScroll() {
  if (prefersReducedMotion() || lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    autoRaf: true,
    lerp: 0.09,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.05,
    syncTouch: true,
    syncTouchLerp: 0.12,
    touchInertiaExponent: 1.55,
    allowNestedScroll: true,
    stopInertiaOnNavigate: true,
    anchors: {
      offset: -SCROLL_OFFSET,
    },
  });

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function destroySmoothScroll() {
  lenisInstance?.destroy();
  lenisInstance = null;
}

export function scrollToTop({ immediate = true } = {}) {
  if (lenisInstance) {
    lenisInstance.resize();
    lenisInstance.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: immediate ? "auto" : "smooth" });
}

export function scrollToElement(target, options = {}) {
  const el =
    typeof target === "string"
      ? document.querySelector(target)
      : target instanceof HTMLElement
        ? target
        : document.getElementById(target);

  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, {
      offset: -SCROLL_OFFSET,
      ...options,
    });
    return;
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Subscribe to Lenis scroll — returns unsubscribe. */
export function onLenisScroll(callback) {
  if (!lenisInstance) return () => {};
  return lenisInstance.on("scroll", callback);
}

export function setSmoothScrollPaused(paused) {
  if (!lenisInstance) return;
  if (paused) lenisInstance.stop();
  else lenisInstance.start();
}
