// Register service worker for offline caching (requires serving over http/https)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
