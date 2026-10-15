/* Offline support. The small files (code, data, icons) are cached at install from precache.json
 * (written at build time). The big files (painted maps, sprites, music) are cached the first time
 * they are used, in a cache that survives updates, so a new release never re-downloads the whole game.
 * Pages are network-first so updates arrive as soon as you are online. */
const PREFIX = 'kotodama-';
const MEDIA = PREFIX + 'media';
const BUILD = '__BUILD__'; // replaced at build time (vite.config.ts), so every release installs fresh
const isMedia = (path) => /\/(assets|audio)\//.test(path);

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const res = await fetch('precache.json', { cache: 'no-store' });
      const { version, files } = await res.json();
      const cache = await caches.open(PREFIX + version);
      const small = files.filter((f) => !isMedia('/' + f));
      for (let i = 0; i < small.length; i += 20) {
        await Promise.all(small.slice(i, i + 20).map((f) => cache.add(new Request(f, { cache: 'reload' })).catch(() => undefined)));
      }
      await cache.add('./').catch(() => undefined);
      self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const res = await fetch('precache.json', { cache: 'no-store' }).catch(() => null);
      const keep = res ? PREFIX + (await res.json()).version : null;
      for (const key of await caches.keys()) if (keep && key.startsWith(PREFIX) && key !== keep && key !== MEDIA) await caches.delete(key);
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(async () => (await caches.match(req)) || (await caches.match('./')) || (await caches.match('index.html'))));
    return;
  }
  if (isMedia(url.pathname)) {
    // show what we have at once and refresh it quietly, so edited pictures still arrive
    event.respondWith(
      (async () => {
        const cache = await caches.open(MEDIA);
        const hit = await cache.match(req, { ignoreSearch: true });
        const fresh = fetch(req)
          .then((res) => {
            if (res.ok && res.status === 200) cache.put(req, res.clone());
            return res;
          })
          .catch(() => undefined);
        if (hit) {
          event.waitUntil(fresh);
          return hit;
        }
        return (await fresh) || Response.error();
      })(),
    );
    return;
  }
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok && res.status === 200) {
            const copy = res.clone();
            caches.keys().then((keys) => {
              const k = keys.filter((x) => x.startsWith(PREFIX) && x !== MEDIA).pop();
              if (k) caches.open(k).then((c) => c.put(req, copy));
            });
          }
          return res;
        }),
    ),
  );
});
