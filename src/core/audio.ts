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
