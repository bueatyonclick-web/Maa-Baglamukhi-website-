import { useEffect, useRef, useState } from "react";

/**
 * Activates once when the element intersects the viewport (lazy iframe/video/embeds).
 * @param {string} [rootMargin] — passed to IntersectionObserver
 */
export function useInViewActivation(rootMargin = "160px 0px") {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || active) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.02 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [active, rootMargin]);

  return [ref, active];
}
