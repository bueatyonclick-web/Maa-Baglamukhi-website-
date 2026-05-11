import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";
import { MANTRA } from "../../data/content";

export default function DailyMantraSection() {
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying(!playing);
  };

  return (
    <section className="relative py-24 lg:py-32 mandala-bg overflow-hidden" data-testid="daily-mantra-section">
      <div className="absolute inset-0">
        <div className="absolute -left-32 top-12 w-[500px] h-[500px] rounded-full bg-saffron-500/8 blur-3xl" />
        <div className="absolute -right-20 bottom-12 w-[400px] h-[400px] rounded-full bg-crimson-700/10 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-cinzel text-saffron-300 text-xs tracking-[0.5em] mb-5"
        >
          ✦ DAILY MANTRA ✦
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-deva text-2xl sm:text-3xl lg:text-5xl text-saffron-100 leading-[1.5] max-w-4xl mx-auto"
          data-testid="mantra-sanskrit"
        >
          {MANTRA.sanskrit}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 text-white/70 italic max-w-2xl mx-auto text-base lg:text-lg"
        >
          "{MANTRA.meaning}"
        </motion.p>

        <motion.button
          onClick={toggle}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-12 inline-flex items-center gap-3 px-7 py-3.5 rounded-full glass-card text-saffron-200 hover:text-white hover:border-saffron-400 transition-all animate-glow-pulse"
          data-testid="mantra-play-button"
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          <span className="font-serif text-lg">{playing ? "Pause Chant" : "Play Sacred Chant"}</span>
          <Volume2 className="w-4 h-4 opacity-60" />
        </motion.button>

        <div className="divider-sacred mt-16 mx-auto max-w-md" />
      </div>
    </section>
  );
}
