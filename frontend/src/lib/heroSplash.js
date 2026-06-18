/**
 * Removes the static hero image painted from index.html (used for instant LCP).
 * Safe to call multiple times and on any route.
 */
let removed = false;

export function removeHeroSplash() {
  if (removed) return;
  const el = typeof document !== "undefined" && document.getElementById("hero-splash");
  if (!el) {
    removed = true;
    return;
  }
  removed = true;
  el.style.opacity = "0";
  window.setTimeout(() => {
    el.parentNode && el.parentNode.removeChild(el);
  }, 500);
}
