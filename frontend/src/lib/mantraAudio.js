/**
 * Welcome mantra — plays automatically when the user opens the website.
 *
 * FLOW:
 * 1. App loads → WelcomeMantraAudio calls initWelcomeMantra()
 * 2. MP3 loads from /public/ytmp3free.cc_800k-views-baglamukhimantra-youtubemp3free.org.mp3
 * 3. We try audio.play() immediately (and retry a few times)
 * 4. If the browser blocks autoplay, the FIRST tap/click anywhere starts the mantra
 * 5. When one play finishes → starts again until 3 full plays (unless user muted)
 * 6. Navbar speaker icon = mute (stop) / unmute (restart 3 plays)
 */

const MANTRA_FILE = "ytmp3free.cc_800k-views-baglamukhimantra-youtubemp3free.org.mp3";
const PLAY_COUNT = 3;

function mantraUrl() {
  const base = process.env.PUBLIC_URL || "";
  return `${base}/${MANTRA_FILE}`;
}

const state = {
  audio: null,
  muted: false,
  playing: false,
  playIndex: 0,
  playsCompleted: 0,
  sequenceActive: false,
  autoPlayTried: false,
  gestureHooked: false,
  listeners: new Set(),
};

function emit() {
  state.listeners.forEach((fn) =>
    fn({
      muted: state.muted,
      playing: state.playing,
      playIndex: state.playIndex,
    }),
  );
}

export function subscribeMantra(listener) {
  state.listeners.add(listener);
  listener({ muted: state.muted, playing: state.playing, playIndex: state.playIndex });
  return () => state.listeners.delete(listener);
}

function getAudio() {
  if (!state.audio) {
    state.audio = new Audio(mantraUrl());
    state.audio.preload = "auto";
    state.audio.volume = 0.6;

    state.audio.addEventListener("play", () => {
      state.playing = true;
      emit();
    });

    state.audio.addEventListener("pause", () => {
      state.playing = false;
      emit();
    });

    state.audio.addEventListener("ended", () => {
      if (state.muted || !state.sequenceActive) {
        state.playing = false;
        emit();
        return;
      }

      state.playsCompleted += 1;
      state.playIndex = state.playsCompleted;

      if (state.playsCompleted < PLAY_COUNT) {
        emit();
        state.audio.currentTime = 0;
        void playOnce();
      } else {
        state.sequenceActive = false;
        state.playing = false;
        emit();
      }
    });
  }
  return state.audio;
}

function waitForReady(audio) {
  if (audio.readyState >= 3) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const onReady = () => {
      cleanup();
      resolve();
    };
    const onErr = () => {
      cleanup();
      reject(new Error("load failed"));
    };
    const cleanup = () => {
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("error", onErr);
    };
    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("error", onErr);
    if (audio.readyState === 0) audio.load();
  });
}

function isSequenceRunning() {
  const audio = state.audio;
  return state.sequenceActive && audio && !audio.paused && !audio.ended;
}

async function playOnce() {
  if (state.muted || !state.sequenceActive) return false;
  const audio = getAudio();
  try {
    await waitForReady(audio);
    audio.muted = false;
    await audio.play();
    return true;
  } catch {
    state.playing = false;
    emit();
    return false;
  }
}

/** Start (or restart) full 3-play sequence from the beginning. */
export async function restartMantraPlayback() {
  if (state.muted) return false;

  const audio = getAudio();
  state.sequenceActive = true;
  state.playsCompleted = 0;
  state.playIndex = 0;
  state.playing = false;
  audio.muted = false;
  audio.pause();
  audio.currentTime = 0;
  emit();

  return playOnce();
}

/** Auto-play on website open — does not run if user already muted or already playing. */
export async function autoPlayOnWebsiteOpen() {
  if (state.muted || isSequenceRunning()) return true;
  if (state.sequenceActive && state.playsCompleted > 0 && state.playsCompleted < PLAY_COUNT) {
    return true;
  }

  return restartMantraPlayback();
}

export function stopMantraPlayback() {
  const audio = getAudio();
  state.sequenceActive = false;
  state.playing = false;
  audio.pause();
  try {
    audio.currentTime = 0;
  } catch {
    /* ignore */
  }
  emit();
}

export function toggleMantraMute() {
  getAudio();

  if (!state.muted) {
    state.muted = true;
    stopMantraPlayback();
    if (state.audio) state.audio.muted = true;
    emit();
    return true;
  }

  state.muted = false;
  if (state.audio) state.audio.muted = false;
  void restartMantraPlayback();
  emit();
  return false;
}

function hookSilentGestureStart() {
  if (state.gestureHooked) return;
  state.gestureHooked = true;

  const onInteract = () => {
    if (state.muted) return;
    if (isSequenceRunning()) return;
    void restartMantraPlayback();
  };

  document.addEventListener("pointerdown", onInteract, { capture: true, passive: true });
  document.addEventListener("keydown", onInteract, { capture: true });
  document.addEventListener("touchstart", onInteract, { capture: true, passive: true });
}

export function initWelcomeMantra() {
  if (state.autoPlayTried) return;
  state.autoPlayTried = true;

  const audio = getAudio();
  audio.load();

  const tryAuto = () =>
    autoPlayOnWebsiteOpen().then((ok) => {
      if (!ok && !state.muted) hookSilentGestureStart();
    });

  hookSilentGestureStart();

  void tryAuto();
  const delays = [400, 900, 1800, 3000];
  delays.forEach((ms) => window.setTimeout(tryAuto, ms));
  window.addEventListener("load", tryAuto, { once: true });

  audio.addEventListener(
    "canplaythrough",
    () => {
      if (!state.muted && !isSequenceRunning()) void tryAuto();
    },
    { once: true },
  );
}
