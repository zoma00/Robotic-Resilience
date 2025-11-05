const CACHE_NAME = 'rob-resilience-v29-' + Date.now();
const CORE_ASSETS = [
  './',
  './index.html',
  './survival-kit.html',
  './navigation.html',
  './egypt.html',
  './pdf-viewer.html',
  './how-to-download-zip.html',
  './discussion.html',
  './checklist.html',
  './seasonal.html',
  './medical-emergencies.html',
  './infrastructure-failure.html',
  './spring-preparedness.html',
  './summer-preparedness.html',
  './fall-preparedness.html',
  './winter-preparedness.html',
  './styles.css',
  './assets/css/mobile-backgrounds.css',
  './assets/js/accessibility.js',
  './assets/js/lang-switcher.js',
  './assets/js/download-all-pdfs.js',
  './assets/js/hamburger-menu.js',
  './assets/js/slideshow.js',
  './assets/js/vendor/html2pdf.bundle.min.js',
  './assets/favicon.svg',
  './manifest.webmanifest',
  './B170249XQ_Lensatic_Compass.pdf',
  './assets/kit-images/navigation.svg',
  './assets/kit-images/water.svg',
  './assets/kit-images/shelter.svg',
  './assets/kit-images/first-aid.svg',
  './assets/kit-images/documents.svg',
  './assets/kit-images/map-wheel.svg',
  './assets/icons/snake.svg',
  './assets/icons/scorpion.svg',
  './assets/icons/insect.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => k === CACHE_NAME ? null : caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  
  // Force fresh CSS and JS files
  const url = new URL(request.url);
  const isCSSOrJS = url.pathname.endsWith('.css') || url.pathname.endsWith('.js');
  
  if (isCSSOrJS) {
    // Always fetch fresh CSS/JS files
    event.respondWith(
      fetch(request).then((resp) => {
        const respClone = resp.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, respClone);
        });
        return resp;
      }).catch(() => {
        // Fallback to cache if offline
        return caches.match(request);
      })
    );
    return;
  }
  
  // Regular caching strategy for other assets
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((resp) => {
        const respClone = resp.clone();
        caches.open(CACHE_NAME).then((cache) => {
          // Cache same-origin only
          try {
            if (url.origin === location.origin) {
              cache.put(request, respClone);
            }
          } catch (_) {}
        });
        return resp;
      }).catch(() => {
        // Offline fallback: serve index.html for navigations
        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
