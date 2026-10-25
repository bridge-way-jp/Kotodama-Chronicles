import { createRoot } from 'react-dom/client';
import { App } from './ui/App';
import { ErrorBoundary } from './ui/ErrorBoundary';
import { store } from './core/store';
import { bus } from './core/events';
import { input } from './game/input';
import { MAPS } from './content/maps';
import { SCRIPTS } from './content/scripts';
import { QUESTS } from './content/quests';
import { guideFor } from './core/guide';
import { localizeContent } from './core/localize';
import { setDomLanguage } from './ui/domTranslate';
import './styles.css';

// `?debug` exposes internals for automated play-testing
if (new URLSearchParams(location.search).has('debug')) (window as any).__kc = { store, bus, input, maps: MAPS, scripts: SCRIPTS, quests: QUESTS, guideFor };

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

// the story and menu texts follow the meaning language (German unless the player picked English)
const applyLang = () => {
  const lang = store.state?.settings.meaningLang ?? 'de';
  localizeContent(lang);
  setDomLanguage(lang);
};
applyLang();
store.subscribe(applyLang);

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
