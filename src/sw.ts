/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

// PWA service worker
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});
