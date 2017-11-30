


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       'index.html',
       'main_script.js',
       'main_style.js',
     ]);
   })
 );
});