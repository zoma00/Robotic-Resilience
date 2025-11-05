// Cache Busting Utility
// This script helps with cache invalidation issues

(function() {
  'use strict';
  
  // Force reload CSS if it's cached
  function forceCSSReload() {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
      const href = link.href;
      const url = new URL(href);
      
      // Only process local CSS files
      if (url.origin === window.location.origin) {
        // Add timestamp to force reload
        url.searchParams.set('_t', Date.now());
        link.href = url.toString();
      }
    });
  }
  
  // Check if this is the first visit after an update
  function checkForUpdates() {
    const currentVersion = '29';
    const lastVersion = localStorage.getItem('site-version');
    
    if (lastVersion !== currentVersion) {
      console.log('Site updated! Clearing caches...');
      
      // Clear localStorage cache indicators
      localStorage.setItem('site-version', currentVersion);
      
      // Force CSS reload on update
      forceCSSReload();
      
      // Clear service worker caches
      if ('serviceWorker' in navigator && 'caches' in window) {
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.filter(cacheName => 
              cacheName.startsWith('rob-resilience-')
            ).map(cacheName => caches.delete(cacheName))
          );
        }).then(() => {
          console.log('Old caches cleared');
        });
      }
    }
  }
  
  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkForUpdates);
  } else {
    checkForUpdates();
  }
  
  // Service Worker update handling
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      // Check for updates every 30 seconds
      setInterval(() => {
        registration.update();
      }, 30000);
      
      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New version available! Reloading...');
            window.location.reload();
          }
        });
      });
    });
  }
})();