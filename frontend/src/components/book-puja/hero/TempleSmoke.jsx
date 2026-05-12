import React from "react";

export function TempleSmoke() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-[8] opacity-[0.16] mix-blend-screen animate-smoke-drift bg-[radial-gradient(ellipse_at_40%_85%,rgba(251,191,36,0.4),transparent_55%)] will-change-transform"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[8] opacity-[0.1] mix-blend-screen animate-smoke-drift bg-[radial-gradient(ellipse_at_72%_55%,rgba(245,158,11,0.28),transparent_48%)] will-change-transform"
        style={{ animationDelay: "-9s" }}
        aria-hidden
      />
    </>
  );
}
