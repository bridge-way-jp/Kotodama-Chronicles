"""
Music and jingles from the originals in art/audio (*.flac) to public/audio/*.mp3.

Loops get their last LOOP_XFADE seconds faded into their beginning, so the seam is inaudible
when the browser repeats the file. Tracks that already fade in and out, and jingles, are converted as they are.

Run: python3 tools/build_audio.py
"""
import os
import subprocess
import tempfile
import wave

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'art', 'audio')
OUT = os.path.join(ROOT, 'public', 'audio')
LOOPS = ['onsen', 'memory', 'valley']
PLAIN_LOOPS = ['title']  # already fade in and out, loop as they are
JINGLES = ['evolve', 'newfriend']
LOOP_XFADE = 1.5


def read(path):
    with tempfile.TemporaryDirectory() as d:
        wav = os.path.join(d, 'a.wav')
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', path, wav], check=True)
        with wave.open(wav) as w:
            sr, ch = w.getframerate(), w.getnchannels()
            a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).reshape(-1, ch).astype(np.float32)
    return a, sr


def write_mp3(a, sr, name):
    with tempfile.TemporaryDirectory() as d:
        wav = os.path.join(d, 'a.wav')
        with wave.open(wav, 'wb') as w:
            w.setnchannels(a.shape[1])
            w.setsampwidth(2)
            w.setframerate(sr)
            w.writeframes(np.clip(a, -32768, 32767).astype(np.int16).tobytes())
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', wav, '-ar', '44100', '-b:a', '128k', os.path.join(OUT, name + '.mp3')], check=True)


def seamless(a, sr):
    n = int(LOOP_XFADE * sr)
    head, tail = a[:n], a[-n:]
    t = np.linspace(0, 1, n, dtype=np.float32)[:, None]
    # equal-power crossfade: the tail fades out while the head fades in
    blended = tail * np.cos(t * np.pi / 2) + head * np.sin(t * np.pi / 2)
    return np.concatenate([blended, a[n:-n]])


if __name__ == '__main__':
    for name in LOOPS:
        a, sr = read(os.path.join(SRC, name + '.flac'))
        write_mp3(seamless(a, sr), sr, name)
    for name in PLAIN_LOOPS + JINGLES:
        a, sr = read(os.path.join(SRC, name + '.flac'))
        write_mp3(a, sr, name)
    print('ok')
