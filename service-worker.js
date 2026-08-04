// MisoNIE Service Worker — macht die App offline nutzbar und installierbar.
// Bei Änderungen die CACHE-Version erhöhen, damit Nutzer:innen das Update bekommen.
const CACHE = 'misonie-v5';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './js/app.js',
  './js/ui.js',
  './js/icons.js',
  './js/data.js',
  './js/path.js',
  './js/ai.js',
  './js/chat.js',
  './js/store.js',
  './js/onboarding.js',
  './js/home.js',
  './js/sos.js',
  './js/learn.js',
  './js/prepare.js',
  './js/journal.js',
  './js/settings.js',
  './js/help.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Nur eigene Inhalte bedienen; nichts Fremdes abfangen.
  if (url.origin !== self.location.origin) return;

  // App-Navigationen: erst Netz, sonst Cache (index.html als Fallback).
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Assets: erst Cache, dann Netz (und nachladen).
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() => cached))
  );
});
