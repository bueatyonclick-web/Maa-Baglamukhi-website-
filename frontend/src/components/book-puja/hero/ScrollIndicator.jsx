import React from "react";
import { ChevronsDown } from "lucide-react";

export function ScrollIndicator({ onActivate }) {
  return (
    <a
      href="#booking"
      onClick={onActivate}
      className="group mt-10 flex flex-col items-center gap-1 text-saffron-300/75 transition-colors hover:text-saffron-100"
      aria-label="Scroll to book puja"
    >
      <div className="motion-safe:animate-bounce motion-reduce:animate-none drop-shadow-[0_0_14px_rgba(245,158,11,0.5)]">
        <ChevronsDown className="h-9 w-9" strokeWidth={1.2} />
      </div>
      <span className="font-cinzel text-[10px] tracking-[0.45em] text-white/40">scroll</span>
    </a>
  );
}
