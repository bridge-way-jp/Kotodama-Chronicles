import type { Settings } from './types';

const SCALE = { normal: 100, large: 115, xlarge: 130 } as const;

/** applies interface text size and contrast to the whole page */
export function applyDisplaySettings(st: Settings | undefined) {
  if (typeof document === 'undefined') return;
  const el = document.documentElement;
  el.style.fontSize = `${SCALE[st?.uiScale ?? 'normal']}%`;
  el.classList.toggle('hc', !!st?.highContrast);
}
