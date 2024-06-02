// On install - the application shell cached

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("sw-cache").then(function (cache) {
      // Static files that make up the application shell are stored in cache
      return cache.addAll("/index.html");
    })
  );
});

// with requested network

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // return it if there is a response, or else fetch it again
      return response || fetch(event.request);
    })
  );
});
