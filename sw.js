var CACHE_NAME = 'v1-dpse';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/js/script.js',
  '/js/easyResponsiveTabs.js',
  '/css/style.css',
  '/css/easy-responsive-tabs.css',
  '/css/loading_style.css'
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

//checks for user requests that are present in the cache
//caches requests that the user does dynamically 
//so no need to add all the routes above
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

//instantly does a fast refresh to give control to the sw

self.onactivate = function(event) {
  if (self.clients && clients.claim) {
    clients.claim();
  }
