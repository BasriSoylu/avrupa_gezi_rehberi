const CACHE_NAME = 'gezi-cache-v1';
const URLS_TO_CACHE = [
  '/avrupa_gezi_rehberi/',
  '/avrupa_gezi_rehberi/index.html',
  '/avrupa_gezi_rehberi/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Önbellekte varsa onu döndür (çevrimdışı çalışma)
        if (response) {
          return response;
        }
        // Yoksa internetten çek
        return fetch(event.request);
      })
  );
});