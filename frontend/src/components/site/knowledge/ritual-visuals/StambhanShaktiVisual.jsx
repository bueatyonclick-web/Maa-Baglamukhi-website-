import React, { memo } from "react";
import { motion } from "framer-motion";

/** Stambhan — stilling waves / frozen hostile energy (animated, no image). */
function StambhanShaktiVisual() {
  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-[min(100%,300px)] items-center justify-center"
      aria-hidden
    >
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.28)_0%,transparent_65%)] blur-2xl" />
      <svg viewBox="0 0 200 200" className="relative h-full w-full">
        <motion.g
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.path
              key={i}
              d={`M20 ${120 + i * 18} Q100 ${100 + i * 8} 180 ${120 + i * 18}`}
              fill="none"
              stroke="rgba(251,191,36,0.45)"
              strokeWidth="2"
              animate={{ d: [`M20 ${120 + i * 18} Q100 ${95 + i * 8} 180 ${120 + i * 18}`, `M20 ${120 + i * 18} Q100 ${118 + i * 8} 180 ${120 + i * 18}`] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
          ))}
        </motion.g>
        <motion.rect
          x="88"
          y="48"
          width="24"
          height="72"
          rx="4"
          fill="url(#stambhan-gada)"
          animate={{ y: [48, 44, 48] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="stambhan-gada" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="100"
          cy="100"
          r="52"
          fill="none"
          stroke="rgba(245,158,11,0.25)"
          strokeWidth="2"
          strokeDasharray="8 12"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />
        {[0, 1, 2].map((i) => (
          <motion.line
            key={i}
            x1="100"
            y1="100"
            x2="100"
            y2="42"
            stroke="rgba(251,191,36,0.5)"
            strokeWidth="1.5"
            transform={`rotate(${i * 120} 100 100)`}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.8, delay: i * 0.4, repeat: Infinity }}
          />
        ))}
      </svg>
    </div>
  );
}

export default memo(StambhanShaktiVisual);
