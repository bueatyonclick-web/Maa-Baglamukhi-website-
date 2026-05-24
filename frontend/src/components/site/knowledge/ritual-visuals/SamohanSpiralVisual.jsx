import React, { memo } from "react";
import { motion } from "framer-motion";

const SAMOHAN_IMAGE = `${process.env.PUBLIC_URL || ""}/samohan-dhyana.png`;

const RINGS = [
  { size: "100%", delay: 0, duration: 4 },
  { size: "82%", delay: 0.5, duration: 4.5 },
  { size: "64%", delay: 1, duration: 5 },
  { size: "46%", delay: 1.5, duration: 5.5 },
];

/** Samohan / dhyana — meditating figure with pulsing sacred rings behind. */
function SamohanSpiralVisual() {
  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-[min(100%,320px)] items-center justify-center"
      aria-hidden
    >
      {/* Ambient glow */}
      <div className="absolute inset-[5%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.22)_0%,rgba(245,158,11,0.08)_40%,transparent_70%)] blur-2xl" />

      {/* Animated rings behind figure */}
      <div className="absolute inset-0 flex items-center justify-center">
        {RINGS.map((ring) => (
          <motion.span
            key={ring.size}
            className="absolute rounded-full border border-amber-400/25 shadow-[0_0_20px_rgba(245,158,11,0.12)]"
            style={{ width: ring.size, height: ring.size }}
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.25, 0.55, 0.25],
              borderColor: [
                "rgba(251, 191, 36, 0.2)",
                "rgba(251, 191, 36, 0.45)",
                "rgba(168, 85, 247, 0.35)",
                "rgba(251, 191, 36, 0.2)",
              ],
            }}
            transition={{
              duration: ring.duration,
              delay: ring.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.span
          className="absolute h-[88%] w-[88%] rounded-full border border-dashed border-violet-400/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="absolute h-[72%] w-[72%] rounded-full border border-amber-300/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Figure — third-eye glow pulse */}
      <motion.div
        className="relative z-[1] w-[78%] max-w-[260px]"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[18%] z-[2] h-8 w-8 -translate-x-1/2 rounded-full bg-amber-200/40 blur-md"
          animate={{ opacity: [0.35, 0.85, 0.35], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <img
          src={SAMOHAN_IMAGE}
          alt=""
          className="relative z-[1] w-full object-contain drop-shadow-[0_0_48px_rgba(168,85,247,0.35),0_12px_40px_rgba(0,0,0,0.5)]"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

export default memo(SamohanSpiralVisual);
