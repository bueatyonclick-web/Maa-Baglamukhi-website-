import React, { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { subscribeMantra, toggleMantraMute } from "../../lib/mantraAudio";
import { useLanguage } from "../../i18n/LanguageContext";
import { cn } from "../../lib/utils";

/** Mute / unmute — shown in navbar (left of menu on mobile). */
export default function MantraMuteButton({ className = "" }) {
  const { t } = useLanguage();
  const [{ muted, playing }, setSnap] = useState({ muted: false, playing: false });

  useEffect(() => subscribeMantra(setSnap), []);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMantraMute();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-saffron-500/20 bg-ink-700/60 p-2 text-saffron-300 transition touch-manipulation hover:border-amber-400/45 hover:bg-ink-700/90 hover:text-amber-100",
        className,
      )}
      aria-pressed={muted}
      aria-label={muted ? t("welcomeMantra.unmute") : t("welcomeMantra.mute")}
      data-testid="nav-mantra-mute"
    >
      {muted ? (
        <VolumeX className="h-5 w-5" aria-hidden />
      ) : (
        <Volume2 className={`h-5 w-5 ${playing ? "animate-pulse" : ""}`} aria-hidden />
      )}
    </button>
  );
}
