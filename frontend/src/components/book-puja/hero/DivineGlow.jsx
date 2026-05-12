import React from "react";
import { motion, useTransform } from "framer-motion";

export function DivineLens({ lensRef }) {
  return (
    <div
      ref={lensRef}
      className="pointer-events-none absolute left-[54%] top-[30%] z-[11] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/18 blur-[72px] opacity-35 will-change-[opacity]"
      aria-hidden
    />
  );
}

/** Soft golden spotlight that follows the pointer (subtle, no extra listeners). */
export function CursorDivineGlow({ smoothX, smoothY }) {
  const x = useTransform(smoothX, [-0.5, 0.5], ["22%", "78%"]);
  const y = useTransform(smoothY, [-0.5, 0.5], ["24%", "76%"]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[12] overflow-hidden" aria-hidden>
      <motion.div
        className="absolute h-[min(65vw,480px)] w-[min(65vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(254,243,199,0.35)_0%,rgba(245,158,11,0.1)_42%,transparent_72%)] blur-3xl mix-blend-screen opacity-[0.14] will-change-transform md:opacity-[0.18]"
        style={{ left: x, top: y }}
      />
    </div>
  );
}
