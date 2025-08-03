const cacheName = 'fudanagashi-cache-v1';
const assetsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  // 以下に必要な画像（全部）をキャッシュに追加
  ...Array.from({ length: 100 }, (_, i) => `./cards/card${i + 1}.png`)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
