import { useEffect } from "react";
import { initWelcomeMantra } from "../../lib/mantraAudio";

/** Starts mantra automatically when the website opens (see lib/mantraAudio.js). */
export default function WelcomeMantraAudio() {
  useEffect(() => {
    initWelcomeMantra();
  }, []);

  return null;
}
