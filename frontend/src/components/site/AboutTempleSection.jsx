import React from "react";
import { motion } from "framer-motion";
import { ABOUT_IMAGE, FLOWER_IMAGE } from "../../data/content";

const timeline = [
  { year: "11th c.", title: "Discovery", text: "The swayambhu Baglamukhi idol is unearthed by a saint in dense forests of Nalkheda." },
  { year: "1546 CE", title: "Royal Patronage", text: "Maharaja Naidev establishes daily worship & grand annual festivals." },
  { year: "1815", title: "Tantra Renaissance", text: "Nalkheda becomes the central peeth for Mahavidya tantric practices in central India." },
  { year: "Today", title: "Global Pilgrimage", text: "Over 1.2 million devotees from 28 countries seek darshan every year." },
];

export default function AboutTempleSection() {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[560px]"
          >
            <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(245,158,11,0.25)] border border-saffron-500/20">
              <img src={ABOUT_IMAGE} alt="Priest performing rituals" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-2xl overflow-hidden border border-saffron-500/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
              <img src={FLOWER_IMAGE} alt="Marigold offerings" className="w-full h-full object-cover" />
            </div>
            {/* gold ring decor */}
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full border border-saffron-500/30 animate-spin-slow" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full border border-saffron-500/20 animate-spin-slow" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-cinzel text-saffron-300 text-xs tracking-[0.5em] mb-5">✦ THE SACRED LEGEND ✦</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              A temple older than <span className="text-gold-shimmer italic">memory itself.</span>
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed text-lg">
              Nestled in the heart of Malwa, Shree Maa Baglamukhi Siddha Peeth is one of only three
              ancient temples in India dedicated to the eighth Mahavidya. The swayambhu (self-manifested)
              idol radiates a frequency that pilgrims describe as "the silence that ends all chaos."
            </p>
            <p className="mt-4 text-white/60 leading-relaxed">
              For over a millennium, sages, kings and warriors have come here to seek protection,
              dissolve enemies and reclaim their voice. Today, the temple remains a living, breathing
              monument to the unbroken tantric tradition of Sanatana Dharma.
            </p>

            {/* Timeline */}
            <div className="mt-10 space-y-5">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-5"
                  data-testid={`timeline-item-${i}`}
                >
                  <div className="w-20 shrink-0 text-right">
                    <p className="font-cinzel text-saffron-400 text-sm tracking-wider">{t.year}</p>
                  </div>
                  <div className="w-px bg-gradient-to-b from-saffron-500/50 to-transparent" />
                  <div>
                    <p className="font-serif text-xl text-white">{t.title}</p>
                    <p className="text-white/60 text-sm leading-relaxed mt-1">{t.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
