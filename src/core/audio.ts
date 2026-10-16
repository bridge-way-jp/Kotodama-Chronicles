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
  battle: 'audio/battle.mp3',
  onsen: 'audio/onsen.mp3',
  memory: 'audio/memory.mp3',
  valley: 'audio/valley.mp3',
  title: 'audio/title.mp3',
  snow: 'audio/snow.mp3',
  festival: 'audio/festival.mp3',
  harbor: 'audio/harbor.mp3',
  lighthouse: 'audio/lighthouse.mp3',
  kyoto: 'audio/kyoto.mp3',
  gion: 'audio/gion.mp3',
  osaka: 'audio/osaka.mp3',
  dotonbori: 'audio/dotonbori.mp3',
  tokyo: 'audio/tokyo.mp3',
  tokyo_night: 'audio/tokyo_night.mp3',
  ending: 'audio/ending.mp3',
  bus_ride: 'audio/bus_ride.mp3',
};

export const MAP_MUSIC: Record<string, string> = {
  town: 'town', apartment: 'home', cafe: 'cafe', konbini: 'town', library: 'home', station: 'town', o_station_hall: 'town', t_station_hall: 'tokyo', forest: 'forest', valley: 'valley', mountain: 'snow', harbor: 'harbor',
  ryokan: 'onsen', werkstatt: 'valley', tsuru: 'snow', klinik: 'snow', kneipe: 'harbor', leuchtturm: 'lighthouse',
  k_station: 'kyoto', k_nishiki: 'kyoto', k_kamo: 'kyoto', k_gion: 'gion', k_fushimi: 'gion',
  machiya: 'gion', teehaus: 'gion', kimono: 'kyoto', izakaya: 'kyoto', bahnhofinfo: 'kyoto', nishikiladen: 'kyoto',
  o_umeda: 'osaka', o_nakanoshima: 'osaka', o_dotonbori: 'dotonbori', o_shinsekai: 'dotonbori', o_castle: 'osaka',
  t_station: 'tokyo', t_asakusa: 'tokyo_night', t_shibuya: 'tokyo', t_shinjuku: 'tokyo', t_sumida: 'tokyo_night', kissaten: 'cafe', sento: 'onsen', gamecenter: 'tokyo', yokocho: 'tokyo_night', kuyakusho: 'tokyo', radio: 'tokyo_night',
  buero: 'osaka', empfang: 'osaka', takoladen: 'dotonbori', okonomi: 'dotonbori', konbini2: 'osaka', kushikatsu: 'dotonbori',
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

// ------------------------------------------------------------------ bus sounds
/**
 * Bus noises. If public/audio/sfx_bus_<kind>.mp3 exists it is played; otherwise a
 * small synthesised version (engine rumble, air brake, door chime) stands in.
 */
export type BusSound = 'arrive' | 'ride' | 'leave';

function noiseBuffer(c: AudioContext, seconds: number) {
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * seconds), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function synthBus(kind: BusSound, seconds: number) {
  const c = (ctx ??= new AudioContext());
  const t0 = c.currentTime;
  const out = c.createGain();
  out.connect(c.destination);
  const env = (g: GainNode, peak: number, attack: number, hold: number, release: number) => {
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + attack);
    g.gain.setValueAtTime(peak, t0 + attack + hold);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + hold + release);
  };
  const engine = (len: number, pitch: number, peak: number) => {
    const g = c.createGain();
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 260;
    env(g, peak, 0.4, Math.max(0.1, len - 1.2), 0.8);
    for (const f of [pitch, pitch * 1.5, pitch * 2.02]) {
      const o = c.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(f * 0.8, t0);
      o.frequency.linearRampToValueAtTime(f, t0 + len * 0.6);
      o.connect(lp);
      o.start(t0);
      o.stop(t0 + len + 0.3);
    }
    // idle shudder
    const lfo = c.createOscillator();
    const lg = c.createGain();
    lfo.frequency.value = 11;
    lg.gain.value = 0.02;
    lfo.connect(lg).connect(g.gain);
    lfo.start(t0);
    lfo.stop(t0 + len + 0.3);
    lp.connect(g).connect(out);
  };
  const noise = (len: number, type: BiquadFilterType, freq: number, peak: number, delay = 0) => {
    const s = c.createBufferSource();
    s.buffer = noiseBuffer(c, len + 0.1);
    const f = c.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0 + delay);
    g.gain.exponentialRampToValueAtTime(peak, t0 + delay + Math.min(0.3, len / 3));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + delay + len);
    s.connect(f).connect(g).connect(out);
    s.start(t0 + delay);
  };
  const chime = (delay: number) => {
    [[880, 0], [660, 0.32]].forEach(([f, d]) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0 + delay + d);
      g.gain.exponentialRampToValueAtTime(0.12, t0 + delay + d + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + delay + d + 0.7);
      o.connect(g).connect(out);
      o.start(t0 + delay + d);
      o.stop(t0 + delay + d + 0.8);
    });
  };
  if (kind === 'arrive') {
    engine(1.9, 48, 0.05); // rolls in
    noise(0.9, 'highpass', 3500, 0.12, 1.5); // air brake
    chime(2.2); // doors
  } else if (kind === 'ride') {
    engine(seconds, 62, 0.06);
    noise(seconds, 'lowpass', 500, 0.05); // road and wind
    noise(0.6, 'highpass', 3000, 0.07, seconds - 0.7);
  } else {
    engine(2.4, 55, 0.05);
    noise(0.5, 'highpass', 3500, 0.1, 0);
  }
}

let busAudio: HTMLAudioElement | null = null;
export function busSound(kind: BusSound, seconds = 5) {
  if (!sfxOn) return;
  const fallback = () => {
    try {
      synthBus(kind, seconds);
    } catch {
      /* audio not available */
    }
  };
  try {
    const a = new Audio(`audio/sfx_bus_${kind}.mp3`);
    a.volume = 0.7;
    a.onerror = fallback;
    a.play().catch(fallback);
    if (kind === 'ride') busAudio = a;
  } catch {
    fallback();
  }
}
export function stopBusSound() {
  busAudio?.pause();
  busAudio = null;
}

// ------------------------------------------------------------------ train sounds
export type TrainKind = 'local' | 'shinkansen';

/** a rhythmic clatter over a low rumble; real files public/audio/sfx_train_<kind>.mp3 are used when present */
function synthTrain(kind: TrainKind, seconds: number) {
  const c = (ctx ??= new AudioContext());
  const t0 = c.currentTime;
  const out = c.createGain();
  out.gain.value = 1;
  out.connect(c.destination);
  const fast = kind === 'shinkansen';
  // rumble
  const r = c.createOscillator();
  const rg = c.createGain();
  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = fast ? 220 : 160;
  r.type = 'sawtooth';
  r.frequency.value = fast ? 42 : 34;
  rg.gain.setValueAtTime(0.0001, t0);
  rg.gain.exponentialRampToValueAtTime(0.05, t0 + 0.6);
  rg.gain.setValueAtTime(0.05, t0 + seconds - 0.8);
  rg.gain.exponentialRampToValueAtTime(0.0001, t0 + seconds);
  r.connect(lp).connect(rg).connect(out);
  r.start(t0);
  r.stop(t0 + seconds + 0.1);
  // wheel clatter: two short ticks per joint
  const step = fast ? 0.11 : 0.34;
  for (let t = 0.4; t < seconds - 0.5; t += step) {
    for (const d of [0, step * 0.28]) {
      const s = c.createBufferSource();
      s.buffer = noiseBuffer(c, 0.05);
      const f = c.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = fast ? 1800 : 1200;
      const g = c.createGain();
      g.gain.setValueAtTime(fast ? 0.05 : 0.09, t0 + t + d);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + t + d + 0.05);
      s.connect(f).connect(g).connect(out);
      s.start(t0 + t + d);
    }
  }
  // departure chime and arrival chime
  for (const at of [0.05, seconds - 0.9]) {
    [660, 880, 660].forEach((fq, i) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = 'sine';
      o.frequency.value = fq;
      g.gain.setValueAtTime(0.0001, t0 + at + i * 0.25);
      g.gain.exponentialRampToValueAtTime(0.1, t0 + at + i * 0.25 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + i * 0.25 + 0.6);
      o.connect(g).connect(out);
      o.start(t0 + at + i * 0.25);
      o.stop(t0 + at + i * 0.25 + 0.7);
    });
  }
}

let trainAudio: HTMLAudioElement | null = null;
export function trainSound(kind: TrainKind, seconds = 5.6) {
  if (!sfxOn) return;
  const fallback = () => {
    try {
      synthTrain(kind, seconds);
    } catch {
      /* audio not available */
    }
  };
  try {
    const a = new Audio(`audio/sfx_train_${kind}.mp3`);
    a.volume = 0.7;
    a.onerror = fallback;
    a.play().catch(fallback);
    trainAudio = a;
  } catch {
    fallback();
  }
}
export function stopTrainSound() {
  trainAudio?.pause();
  trainAudio = null;
}
