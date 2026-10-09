/**
 * Audio helpers.
 *
 * Speech: uses the browser's Web Speech API with a Japanese voice. This is
 * synthetic text-to-speech for the prototype — it is NOT equivalent to native
 * speaker recordings. Curated recordings can be added later by mapping a text
 * id to an audio file in `RECORDED` (checked first).
 *
 * SFX: tiny chiptune blips generated with WebAudio (no asset files needed).
 */

export const RECORDED: Record<string, string> = {};

let jaVoice: SpeechSynthesisVoice | null = null;

function pickVoice(pref?: 'f' | 'm') {
  if (typeof speechSynthesis === 'undefined') return null;
  const voices = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('ja'));
  if (!voices.length) return null;
  if (pref) {
    const female = /kyoko|haruka|nanami|ayumi|female|女性|o-ren|mizuki/i;
    const male = /otoya|ichiro|keita|male|男性|hattori/i;
    const re = pref === 'f' ? female : male;
    const v = voices.find((x) => re.test(x.name));
    if (v) return v;
  }
  return jaVoice ?? (jaVoice = voices.find((v) => /google/i.test(v.name)) ?? voices[0]);
}

export function ttsAvailable(): boolean {
  return typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined';
}

export function hasJapaneseVoice(): boolean {
  return ttsAvailable() && speechSynthesis.getVoices().some((v) => v.lang.toLowerCase().startsWith('ja'));
}

if (ttsAvailable()) {
  speechSynthesis.onvoiceschanged = () => {
    jaVoice = null;
  };
}

/** Speaks lines sequentially. Resolves when finished (or immediately if TTS unavailable). */
export function speak(lines: { text: string; voice?: 'f' | 'm' }[], rate = 1): Promise<void> {
  if (!ttsAvailable()) return Promise.resolve();
  // keep spoken Japanese clearly audible over the music
  const prevDuck = duck;
  duckMusic(Math.min(prevDuck, 0.2));
  return speakInner(lines, rate).finally(() => duckMusic(prevDuck));
}

function speakInner(lines: { text: string; voice?: 'f' | 'm' }[], rate: number): Promise<void> {
  speechSynthesis.cancel();
  return new Promise((resolve) => {
    let i = 0;
    const next = () => {
      if (i >= lines.length) return resolve();
      const l = lines[i++];
      const u = new SpeechSynthesisUtterance(l.text);
      u.lang = 'ja-JP';
      const v = pickVoice(l.voice);
      if (v) u.voice = v;
      u.rate = rate;
      u.pitch = l.voice === 'm' ? 0.85 : l.voice === 'f' ? 1.15 : 1;
      u.onend = () => setTimeout(next, 250);
      u.onerror = () => setTimeout(next, 50);
      speechSynthesis.speak(u);
    };
    next();
  });
}

export function stopSpeech() {
  if (ttsAvailable()) speechSynthesis.cancel();
}

let ctx: AudioContext | null = null;
let sfxOn = true;
export function setSfx(on: boolean) {
  sfxOn = on;
}

export function sfx(kind: 'blip' | 'ok' | 'bad' | 'hit' | 'level' | 'open') {
  if (!sfxOn) return;
  try {
    ctx ??= new AudioContext();
    const seq: Record<string, [number, number][]> = {
      blip: [[880, 0.04]],
      open: [[660, 0.05], [990, 0.05]],
      ok: [[784, 0.07], [1175, 0.1]],
      bad: [[300, 0.1], [220, 0.14]],
      hit: [[200, 0.05], [120, 0.08]],
      level: [[523, 0.08], [659, 0.08], [784, 0.08], [1047, 0.16]],
    };
    let t = ctx.currentTime;
    for (const [f, d] of seq[kind]) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = kind === 'hit' ? 'sawtooth' : 'square';
      o.frequency.value = f;
      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + d);
      t += d;
    }
  } catch {
    /* audio not available */
  }
}

// ------------------------------------------------------------------ music
/**
 * Background music. Each map names a track; tracks that don't exist yet fall
 * back to the town theme. Files live in public/audio/<key>.mp3.
 * Browsers only allow audio after a user interaction, so a blocked start is
 * retried on the next key press or tap.
 */
export const TRACKS: Record<string, string> = {
  town: 'audio/town.mp3',
  forest: 'audio/forest.mp3',
  cafe: 'audio/cafe.mp3',
  home: 'audio/home.mp3',
  boss: 'audio/boss.mp3',
};

export const MAP_MUSIC: Record<string, string> = {
  town: 'town', apartment: 'home', cafe: 'cafe', konbini: 'town', library: 'home', station: 'town', forest: 'forest',
};

let music: HTMLAudioElement | null = null;
let musicSrc = '';
let musicVolume = 0.5;
let duck = 1;
let fadeTimer: ReturnType<typeof setInterval> | null = null;

function target() {
  return musicVolume * duck;
}

function fadeTo(el: HTMLAudioElement, to: number, ms: number, done?: () => void) {
  const from = el.volume;
  const start = performance.now();
  const t = setInterval(() => {
    const k = Math.min(1, (performance.now() - start) / ms);
    el.volume = Math.max(0, Math.min(1, from + (to - from) * k));
    if (k >= 1) {
      clearInterval(t);
      done?.();
    }
  }, 40);
  return t;
}

let pendingRetry = false;
function tryPlay(el: HTMLAudioElement) {
  el.play().catch(() => {
    if (pendingRetry) return;
    pendingRetry = true;
    const retry = () => {
      pendingRetry = false;
      window.removeEventListener('keydown', retry);
      window.removeEventListener('pointerdown', retry);
      if (music === el) el.play().catch(() => undefined);
    };
    window.addEventListener('keydown', retry);
    window.addEventListener('pointerdown', retry);
  });
}

let musicKey = '';
export function currentMusic() {
  return musicKey;
}

export function playMusic(key: string) {
  musicKey = key;
  const src = TRACKS[key] ?? TRACKS.town;
  if (!src || src === musicSrc) return;
  const old = music;
  if (old) fadeTo(old, 0, 800, () => old.pause());
  musicSrc = src;
  const el = new Audio(src);
  el.loop = true;
  el.volume = 0;
  music = el;
  tryPlay(el);
  if (fadeTimer) clearInterval(fadeTimer);
  fadeTimer = fadeTo(el, target(), 1200);
}

/** short one-shot jingle (e.g. victory); the music dips underneath it */
export function playJingle(key: string) {
  const el = new Audio(`audio/${key}.mp3`);
  el.volume = Math.min(1, musicVolume * 1.4 + 0.1);
  const prev = duck;
  duckMusic(0.1);
  el.onended = () => duckMusic(prev);
  el.play().catch(() => duckMusic(prev));
}

export function stopMusic() {
  if (music) {
    const el = music;
    fadeTo(el, 0, 600, () => el.pause());
  }
  music = null;
  musicSrc = '';
}

export function setMusicVolume(v: number) {
  musicVolume = v;
  if (music) music.volume = target();
}

/** lower the music (e.g. during battles or listening exercises); 1 = normal */
export function duckMusic(factor: number) {
  duck = factor;
  if (music) {
    if (fadeTimer) clearInterval(fadeTimer);
    fadeTimer = fadeTo(music, target(), 500);
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (!music) return;
    if (document.visibilityState === 'hidden') music.pause();
    else tryPlay(music);
  });
}
