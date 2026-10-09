/* Offline support. On install the whole game (listed in precache.json, written at build time)
 * is cached so it runs without a connection. Pages are network-first so updates arrive
 * as soon as you are online; everything else is cache-first. */
const PREFIX = 'kotodama-';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const res = await fetch('precache.json', { cache: 'no-store' });
      const { version, files } = await res.json();
      const cache = await caches.open(PREFIX + version);
      // add in small batches so one slow file doesn't fail everything
      for (let i = 0; i < files.length; i += 20) {
        await Promise.all(files.slice(i, i + 20).map((f) => cache.add(f).catch(() => undefined)));
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
      for (const key of await caches.keys()) if (keep && key.startsWith(PREFIX) && key !== keep) await caches.delete(key);
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(async () => (await caches.match(req)) || (await caches.match('./')) || (await caches.match('index.html'))));
    return;
  }
  // audio uses range requests; let the network handle it when online, cache otherwise
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok && res.status === 200) {
            const copy = res.clone();
            caches.keys().then((keys) => {
              const k = keys.filter((x) => x.startsWith(PREFIX)).pop();
              if (k) caches.open(k).then((c) => c.put(req, copy));
            });
          }
          return res;
        }),
    ),
  );
});
