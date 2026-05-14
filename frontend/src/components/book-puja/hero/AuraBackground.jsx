import React from "react";

/** Radial halos, rotating light rays, mandala watermark, vignette. */
export function AuraBackground({ raysRef }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-b from-black/80 via-transparent to-black/90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_50%_32%,rgba(251,191,36,0.18),transparent_55%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-1/2 top-[30%] z-[6] h-[min(95vw,920px)] w-[min(95vw,920px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.055] bg-[repeating-conic-gradient(from_0deg,rgba(251,191,36,0.35)_0deg_3deg,transparent_3deg_6deg)] will-change-transform"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-1/2 top-[28%] z-[7] h-[140svh] w-[140svh] -translate-x-1/2 -translate-y-1/2 opacity-[0.14]"
        aria-hidden
      >
        <div
          ref={raysRef}
          className="h-full w-full will-change-transform"
          style={{
            background:
              "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg 12deg, rgba(251,191,36,0.1) 12deg 14deg)",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-[38%] z-[9] h-[min(110vw,980px)] w-[min(110vw,980px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.38)_0%,rgba(245,158,11,0.1)_40%,transparent_68%)] blur-3xl animate-glow-pulse"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-[16] bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_38%,rgba(10,5,5,0.55)_78%,#050303_100%)]"
        aria-hidden
      />
    </>
  );
}
