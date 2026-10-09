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
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => undefined);
  });
}

createRoot(document.getElementById('root')!).render(<App />);
