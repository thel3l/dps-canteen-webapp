var CACHE_NAME = 'v1-dpse';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/js/script.js',
  '/js/easyResponsiveTabs.js',
  '/css/style.css',
  '/css/easy-responsive-tabs.css',
  '/css/loading_style.css
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
