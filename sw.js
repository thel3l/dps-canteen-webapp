
this.addEventListener('install', function(event) {
   self.skipWaiting();
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
       '/',
  '/js/script.js',
  '/js/easyResponsiveTabs.js',
  '/css/style.css',
  '/css/easy-responsive-tabs.css',
  '/css/loading_style.css',
  '/js/loading_script.js'
 
      ]);
    })
  );
});


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


            var responseToCache = response.clone();

            caches.open('v1')
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
}
