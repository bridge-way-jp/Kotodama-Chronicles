import type { Dir } from '../core/types';

/**
 * Unified input state for keyboard and touch controls. The React UI sets
 * `locked` while an overlay (dialogue, menu, battle) is open so the world
 * ignores movement and interaction.
 */
class InputState {
  locked = false;
  private held = new Map<Dir, number>();
  private pressed = new Set<'a' | 'menu'>();
  private counter = 0;

  press(dir: Dir) {
    this.held.set(dir, ++this.counter);
  }
  release(dir: Dir) {
    this.held.delete(dir);
  }
  releaseAll() {
    this.held.clear();
  }
  tap(btn: 'a' | 'menu') {
    if (btn === 'a' && this.locked) return;
    this.pressed.add(btn);
  }
  consume(btn: 'a' | 'menu'): boolean {
    const had = this.pressed.has(btn);
    this.pressed.delete(btn);
    return had;
  }
  /** most recently pressed direction that is still held */
  direction(): Dir | null {
    let best: Dir | null = null;
    let t = -1;
    for (const [d, n] of this.held) if (n > t) [best, t] = [d, n];
    return best;
  }
}

export const input = new InputState();

const KEYMAP: Record<string, Dir> = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  KeyW: 'up', KeyS: 'down', KeyA: 'left', KeyD: 'right',
};

let installed = false;
export function installKeyboard() {
  if (installed) return;
  installed = true;
  window.addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement | null;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    const d = KEYMAP[e.code];
    if (d) {
      if (!input.locked) e.preventDefault();
      if (!e.repeat) input.press(d);
      return;
    }
    if (e.repeat) return;
    if (e.code === 'Space' || e.code === 'Enter' || e.code === 'KeyZ' || e.code === 'KeyE') {
      if (!input.locked) {
        e.preventDefault();
        input.tap('a');
      }
    } else if (e.code === 'Escape' || e.code === 'KeyM') {
      input.tap('menu');
    }
  });
  window.addEventListener('keyup', (e) => {
    const d = KEYMAP[e.code];
    if (d) input.release(d);
  });
  window.addEventListener('blur', () => input.releaseAll());
}
