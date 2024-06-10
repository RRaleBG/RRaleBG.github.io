// On install - the application shell cached

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("sw-cache").then(function (cache) {
      // Static files that make up the application shell are stored in cache
      return cache.addAll([
        "./",
        "./index.html",
        "./resume.html",
        "./assets/css/risen.css",
        "./assets/docs/CV-RajcicRados.pdf",
        "./google67e1fbaf762040e4.html",
        "./assets/images/*.png",
        "/assets/favicons/*.png",
        "./assets/fontawesome/js/*.js",
        "./favicon.ico",
      ]);
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

// Register the service worker

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(function () {
    console.log("Service Worker Registered");
  });
}
