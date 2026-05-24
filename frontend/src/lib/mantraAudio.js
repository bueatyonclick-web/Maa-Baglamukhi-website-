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
  initialAutoDone: false,
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
    audio.load();
  });
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

export async function startMantraSequence() {
  if (state.muted || state.initialAutoDone) return false;
  if (state.sequenceActive && state.playing) return true;

  const ok = await restartMantraPlayback();
  if (ok) state.initialAutoDone = true;
  return ok;
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

export function hookSilentGestureStart() {
  if (state.gestureHooked) return;
  state.gestureHooked = true;

  const onInteract = () => {
    document.removeEventListener("pointerdown", onInteract, true);
    document.removeEventListener("keydown", onInteract, true);
    if (!state.muted && !state.initialAutoDone) void startMantraSequence();
  };

  document.addEventListener("pointerdown", onInteract, { capture: true, passive: true });
  document.addEventListener("keydown", onInteract, { capture: true });
}

export function initWelcomeMantra() {
  if (state.autoPlayTried) return;
  state.autoPlayTried = true;

  getAudio().load();

  const attempt = () =>
    startMantraSequence().then((ok) => {
      if (!ok) hookSilentGestureStart();
    });

  void attempt();
  window.setTimeout(attempt, 600);
  window.addEventListener("load", attempt, { once: true });
  hookSilentGestureStart();
}
