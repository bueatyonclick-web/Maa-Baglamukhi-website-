import React from "react";
import { motion } from "framer-motion";
import { BOOK_PUJA_THALI_IMAGE } from "./constants";

const circleX = (r) => [r, r * 0.707, 0, -r * 0.707, -r, -r * 0.707, 0, r * 0.707, r];
const circleY = (r) => [0, r * 0.707, r, r * 0.707, 0, -r * 0.707, -r, -r * 0.707, 0];

/** Orbit radius (px) — gentle aarti-sized circle on all breakpoints */
const ORBIT_R = 30;

/**
 * Puja thali PNG — slow circular path (aarti-style), thali stays upright.
 */
export default function FloatingPujaThali() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-[10%] z-[30] flex justify-center md:bottom-[12%]"
      aria-hidden
    >
      <motion.div
        className="relative flex min-h-[200px] w-full max-w-[min(92vw,480px)] items-center justify-center md:min-h-[240px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-40 w-40 rounded-full bg-amber-400/18 blur-3xl md:h-52 md:w-52" />
        </div>

        <motion.div
          className="relative z-[1] w-[min(50vw,240px)] max-w-[min(90vw,320px)] will-change-transform sm:w-[min(44vw,280px)] md:w-[min(32vw,300px)]"
          initial={{ x: ORBIT_R, y: 0 }}
          animate={{
            x: circleX(ORBIT_R),
            y: circleY(ORBIT_R),
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <img
            src={BOOK_PUJA_THALI_IMAGE}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="relative w-full object-contain drop-shadow-[0_22px_56px_rgba(0,0,0,0.7)]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
