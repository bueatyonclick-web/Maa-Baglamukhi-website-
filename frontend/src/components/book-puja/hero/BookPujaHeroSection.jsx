import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { BOOK_PUJA_MAA_FALLBACK } from "../../../data/content";
import { BOOK_PUJA_HERO_IMAGE } from "./constants";
import { AuraBackground } from "./AuraBackground";
import { FloatingParticles } from "./FloatingParticles";
import { TempleSmoke } from "./TempleSmoke";
import { DivineLens, CursorDivineGlow } from "./DivineGlow";
import { ScrollIndicator } from "./ScrollIndicator";
import FloatingPujaThali from "./FloatingPujaThali";

export default function BookPujaHeroSection() {
  const sectionRef = useRef(null);
  const raysRef = useRef(null);
  const lensRef = useRef(null);
  const [maaSrc, setMaaSrc] = useState(BOOK_PUJA_HERO_IMAGE);
  const [lightParticles, setLightParticles] = useState(false);
  const [finePointer, setFinePointer] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [narrowViewport, setNarrowViewport] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setLightParticles(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqNarrow = window.matchMedia("(max-width: 768px)");
    const apply = () => {
      setFinePointer(mqFine.matches);
      setReduceMotion(mqReduce.matches);
      setNarrowViewport(mqNarrow.matches);
    };
    apply();
    mqFine.addEventListener("change", apply);
    mqReduce.addEventListener("change", apply);
    mqNarrow.addEventListener("change", apply);
    return () => {
      mqFine.removeEventListener("change", apply);
      mqReduce.removeEventListener("change", apply);
      mqNarrow.removeEventListener("change", apply);
    };
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 28, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 28, damping: 22 });

  const onPointerMove = (e) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToBooking = useCallback((e) => {
    e.preventDefault();
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (reduceMotion || narrowViewport) return;

    const ctx = gsap.context(() => {
      if (raysRef.current) {
        gsap.to(raysRef.current, {
          rotation: 360,
          duration: 200,
          repeat: -1,
          ease: "none",
        });
      }
      if (lensRef.current) {
        gsap.fromTo(
          lensRef.current,
          { opacity: 0.2 },
          {
            opacity: 0.5,
            duration: 6.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          }
        );
      }
    }, root);
    return () => ctx.revert();
  }, [narrowViewport, reduceMotion]);

  /* `overflow-hidden` can promote this block to a scroll container (with wheel traps on some
   * browsers when combined with min-height viewport). `overflow-clip` clips paint without that. */
  const heroMinH =
    "relative min-h-[max(100svh,100dvh)] touch-pan-y overflow-clip bg-black";

  return (
    <section
      ref={sectionRef}
      id="book-puja-hero"
      className={heroMinH}
      onPointerMove={finePointer ? onPointerMove : undefined}
      onPointerLeave={finePointer ? onPointerLeave : undefined}
    >
      {/* Full-bleed goddess — static (no rotation / no parallax on image) */}
      <div className="absolute inset-0 z-[1]">
        <img
          src={maaSrc}
          alt="Śrī Maa Bagalamukhī — sacred puja"
          className="h-full min-h-[max(100svh,100dvh)] w-full object-cover object-[center_26%] md:object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onError={() => {
            if (maaSrc !== BOOK_PUJA_MAA_FALLBACK) setMaaSrc(BOOK_PUJA_MAA_FALLBACK);
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/70 via-black/20 to-black/88"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[3] mix-blend-soft-light bg-gradient-to-t from-amber-900/25 via-transparent to-amber-500/10"
        aria-hidden
      />

      {!narrowViewport && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[18] bg-[length:200%_100%] bg-gradient-to-r from-transparent via-amber-200/25 to-transparent opacity-[0.08] mix-blend-overlay animate-shimmer"
          aria-hidden
        />
      )}

      <AuraBackground raysRef={raysRef} />
      <TempleSmoke />
      <DivineLens lensRef={lensRef} />
      {finePointer && <CursorDivineGlow smoothX={smoothX} smoothY={smoothY} />}
      <FloatingParticles light={lightParticles} />

      <FloatingPujaThali />

      <div
        className="pointer-events-none absolute inset-0 z-[19] bg-gradient-to-t from-black/55 via-transparent to-transparent"
        aria-hidden
      />

      {/* Minimal scroll hint — booking CTAs live in navbar + section below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[40] flex justify-center pb-8 pt-24 md:pb-10">
        <div className="pointer-events-auto">
          <ScrollIndicator onActivate={scrollToBooking} />
        </div>
      </div>
    </section>
  );
}
