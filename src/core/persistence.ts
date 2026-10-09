import { SaveManager, idbBackend } from './save';
import { store } from './store';
import { bus } from './events';
import { flushPush, schedulePush } from './cloud';

/**
 * Autosave policy:
 *  - important events (map change, quest/script/battle results, learning,
 *    practice, settings) save within ~0.4 s
 *  - frequent minor changes (steps, facing) are debounced to ~4 s
 *  - play time is accumulated every 15 s
 *  - a best-effort save also runs when the tab is hidden or closed
 */

export const saves = new SaveManager(idbBackend());

export const saveStatus = { last: 0, state: 'idle' as 'idle' | 'saving' | 'error', error: '' };

const URGENT = new Set(['map', 'script', 'battle', 'learn', 'practice', 'settings', 'shop', 'item', 'new', 'import']);

let timer: ReturnType<typeof setTimeout> | null = null;
let saving: Promise<void> | null = null;
let pending = false;

export async function saveNow(): Promise<void> {
  if (!store.state) return;
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (saving) {
    pending = true;
    return saving;
  }
  saveStatus.state = 'saving';
  bus.emit('save-status');
  saving = (async () => {
    try {
      schedulePush(await saves.save(store.s));
      saveStatus.last = Date.now();
      saveStatus.state = 'idle';
      saveStatus.error = '';
    } catch (e) {
      saveStatus.state = 'error';
      saveStatus.error = (e as Error).message;
    } finally {
      saving = null;
      bus.emit('save-status');
      if (pending) {
        pending = false;
        void saveNow();
      }
    }
  })();
  return saving;
}

function schedule(ms: number) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    void saveNow();
  }, ms);
}

export function startAutosave(): () => void {
  let lastTick = Date.now();
  const unsub = store.subscribe((reason) => {
    if (!store.state || reason === 'load' || reason === 'tick') return;
    schedule(URGENT.has(reason) ? 400 : 4000);
  });
  const tick = setInterval(() => {
    const now = Date.now();
    if (store.state && document.visibilityState === 'visible') {
      store.state.stats.playMs += now - lastTick;
    }
    lastTick = now;
  }, 15000);
  const onHide = () => {
    if (document.visibilityState === 'hidden') void saveNow().then(flushPush);
  };
  const onPageHide = () => void saveNow().then(flushPush);
  document.addEventListener('visibilitychange', onHide);
  window.addEventListener('pagehide', onPageHide);
  return () => {
    unsub();
    clearInterval(tick);
    document.removeEventListener('visibilitychange', onHide);
    window.removeEventListener('pagehide', onPageHide);
  };
}
