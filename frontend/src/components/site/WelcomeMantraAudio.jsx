import { useEffect } from "react";
import { initWelcomeMantra } from "../../lib/mantraAudio";

/** Boots 3× mantra playback on site open; mute control lives in Navbar. */
export default function WelcomeMantraAudio() {
  useEffect(() => {
    initWelcomeMantra();
  }, []);

  return null;
}
