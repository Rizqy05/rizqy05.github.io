var cacheName = "Rizqy Mulya Saputra";
var filesToCache = [
  "/",
  "index.html",
  "style.css",
  "manifest.json",
  "main.js",
  "firebase-messaging-sw.js",
  "images/profile.jpg",
  "images/Logo_CV_128.png",
  "images/Logo_CV_144.png",
  "images/Logo_CV_152.png",
  "images/Logo_CV_192.png",
  "images/Logo_CV_256.png",
  "images/Logo_CV_512.png",
  "images/Logo_CV.png",
  "images/Lonceng.png",
  "js/main.js",
  "js/indexdb.js",
];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
