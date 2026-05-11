import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, PlayCircle, Heart, Calendar } from "lucide-react";
import BokehParticles from "./BokehParticles";
import { HERO_IMAGE, BOKEH_IMAGE, MANTRA } from "../../data/content";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden" data-testid="hero-section">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Temple at golden hour" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/70 to-ink-900" />
        <img src={BOKEH_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-30" />
      </div>

      <BokehParticles count={32} />

      {/* Animated mandala */}
      <div className="absolute -right-40 top-1/4 w-[700px] h-[700px] opacity-15 pointer-events-none animate-spin-slow">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <g fill="none" stroke="rgba(245,158,11,0.7)" strokeWidth="0.3">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="70" />
            <circle cx="100" cy="100" r="50" />
            <circle cx="100" cy="100" r="30" />
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={i} x1="100" y1="10" x2="100" y2="190" transform={`rotate(${(i * 360) / 16} 100 100)`} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <path
                key={`p${i}`}
                d="M100 30 C 120 60, 120 60, 100 100 C 80 60, 80 60, 100 30 Z"
                transform={`rotate(${(i * 360) / 8} 100 100)`}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-24 lg:pt-48 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-3xl"
        >
          <p className="font-cinzel text-saffron-300 text-xs lg:text-sm tracking-[0.5em] mb-6">
            ✦ SIDDHA PEETH · NALKHEDA · MADHYA PRADESH ✦
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-white">
            Shree Maa <br />
            <span className="text-gold-shimmer italic">Baglamukhi</span> <br />
            <span className="text-white/90">Siddha Peeth</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg text-white/75 leading-relaxed">
            Experience the ancient power of the 8th Mahavidya — where centuries of mantra,
            tantra and devotion converge under one sacred dome.
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="font-deva text-saffron-200/90 text-base lg:text-lg mt-6 leading-relaxed"
          >
            {MANTRA.sanskrit}
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#booking" className="btn-primary-sacred" data-testid="hero-book-puja">
              <Calendar className="w-4 h-4" /> Book Puja Online
            </a>
            <a href="#darshan" className="btn-ghost-sacred" data-testid="hero-live-darshan">
              <PlayCircle className="w-4 h-4" /> Live Darshan
            </a>
            <a href="#donate" className="btn-ghost-sacred" data-testid="hero-donate">
              <Heart className="w-4 h-4" /> Donate Now
            </a>
          </div>

          <div className="mt-14 flex items-center gap-8 text-white/60 text-sm">
            <div>
              <p className="font-serif text-3xl text-saffron-300">11+</p>
              <p className="text-xs tracking-widest">CENTURIES OLD</p>
            </div>
            <div className="w-px h-10 bg-saffron-500/20" />
            <div>
              <p className="font-serif text-3xl text-saffron-300">3 of 3</p>
              <p className="text-xs tracking-widest">SIDDHA PEETHS</p>
            </div>
            <div className="w-px h-10 bg-saffron-500/20" />
            <div>
              <p className="font-serif text-3xl text-saffron-300">1.2M+</p>
              <p className="text-xs tracking-widest">DEVOTEES / YEAR</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-saffron-300/80 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.4em] font-cinzel">SCROLL</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
