import { createRoot } from 'react-dom/client';
import { App } from './ui/App';
import { store } from './core/store';
import { bus } from './core/events';
import { input } from './game/input';
import './styles.css';

// `?debug` exposes internals for automated play-testing
if (new URLSearchParams(location.search).has('debug')) (window as any).__kc = { store, bus, input };

// installable app + offline play (only on a real https site, not inside embedded previews)
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost') && window.self === window.top) {
  // a new release took over: reload once so images with unchanged names are fetched fresh
  // (progress is autosaved; skipped on the very first install)
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hadController) location.reload();
  });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).catch(() => undefined);
  });
}

createRoot(document.getElementById('root')!).render(<App />);
