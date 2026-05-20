import React from "react";

const KUND_IMAGE = `${process.env.PUBLIC_URL || ""}/havan-kund.png`;

export default function AnimatedHavanKund() {
  return (
    <div className="relative w-full lg:mr-auto" data-testid="animated-havan-kund">
      <img
        src={KUND_IMAGE}
        alt="Sacred Baglamukhi havan kund"
        loading="lazy"
        decoding="async"
        draggable={false}
        className="block h-auto w-full select-none"
      />
    </div>
  );
}
