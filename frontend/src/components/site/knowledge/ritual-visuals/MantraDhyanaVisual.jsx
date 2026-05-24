import React, { memo } from "react";
import { motion } from "framer-motion";

/** Guru-led dhyana — swinging focus point (pocket-watch metaphor, CSS animation). */
function MantraDhyanaVisual() {
  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-[min(100%,300px)] items-center justify-center"
      aria-hidden
    >
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.2)_0%,transparent_70%)] blur-2xl" />
      <div className="relative h-[min(72%,240px)] w-2 origin-top bg-gradient-to-b from-amber-600/80 to-amber-900/40 rounded-full" style={{ top: "8%" }}>
        <motion.div
          className="absolute left-1/2 top-0 w-[min(52vw,140px)] -translate-x-1/2"
          style={{ transformOrigin: "50% 0" }}
          animate={{ rotate: [-22, 22, -22] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="mx-auto h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.9)]" />
          <div className="mx-auto mt-1 h-px w-24 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
          <div className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-300/70 bg-gradient-to-br from-amber-100 to-amber-500 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_2px_8px_rgba(255,255,255,0.4)] sm:h-20 sm:w-20">
            <span className="font-serif text-lg text-amber-900 sm:text-xl">ॐ</span>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-[18%] left-1/2 h-14 w-28 -translate-x-1/2 rounded-t-[2rem] bg-gradient-to-b from-indigo-950/90 to-black/80 border border-amber-500/20"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.p
        className="absolute bottom-[8%] font-deva text-xs tracking-widest text-amber-300/60"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        ध्यान
      </motion.p>
    </div>
  );
}

export default memo(MantraDhyanaVisual);
