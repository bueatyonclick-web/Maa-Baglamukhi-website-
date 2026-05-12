import React, { useMemo } from "react";

function GoldenEmbers({ count }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        k: i,
        left: `${(i * 7.3) % 100}%`,
        delay: `${(i % 11) * 0.45}s`,
        dur: `${11 + (i % 7)}s`,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-[14] overflow-hidden" aria-hidden>
      {embers.map((e) => (
        <span
          key={e.k}
          className="absolute top-full h-0.5 w-0.5 rounded-full bg-amber-200/85 shadow-[0_0_12px_rgba(251,191,36,0.95)] animate-float-up will-change-transform"
          style={{ left: e.left, animationDelay: e.delay, animationDuration: e.dur }}
        />
      ))}
    </div>
  );
}

function DustMotes({ count }) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        k: i,
        left: `${(i * 13.17) % 100}%`,
        top: `${(i * 17.9) % 100}%`,
        delay: `${(i % 8) * 0.7}s`,
        dur: `${12 + (i % 9)}s`,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-[14] overflow-hidden" aria-hidden>
      {motes.map((m) => (
        <span
          key={m.k}
          className="absolute h-px w-px rounded-full bg-amber-100/55 shadow-[0_0_6px_rgba(254,243,199,0.85)] animate-book-puja-dust will-change-transform"
          style={{
            left: m.left,
            top: m.top,
            animationDelay: m.delay,
            animationDuration: m.dur,
          }}
        />
      ))}
    </div>
  );
}

function Petals({ count }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        k: i,
        left: `${(i * 19.7) % 100}%`,
        delay: `${(i % 6) * 1.1}s`,
        dur: `${14 + (i % 5)}s`,
        w: 6 + (i % 3) * 2,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-[13] overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.k}
          className="absolute top-[85%] rounded-full bg-gradient-to-br from-amber-300/70 to-orange-600/50 opacity-60 shadow-[0_0_8px_rgba(251,191,36,0.4)] animate-float-slow will-change-transform"
          style={{
            left: p.left,
            width: p.w,
            height: p.w * 1.4,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
    </div>
  );
}

/** Lightweight GPU-friendly particles — set `light` on small viewports. */
export function FloatingParticles({ light = false }) {
  const em = light ? 14 : 24;
  const dust = light ? 16 : 32;
  const pet = light ? 4 : 8;
  return (
    <>
      <GoldenEmbers count={em} />
      <DustMotes count={dust} />
      <Petals count={pet} />
    </>
  );
}
