/* Service worker: keeps a copy of the app on the phone.
   Your notes are NOT stored here. They live in the browser's storage,
   so updating or clearing this cache never touches them. */

// Change this number whenever you want to force a fresh copy for everyone.
const CACHE = "text-locker-v2";

// The files that make up the app. "./" is the main page.
const FILES = ["./", "./manifest.webmanifest",
               "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

// 1. When first installed, save all the files.
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

// 2. When a new version takes over, delete old saved copies.
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

// 3. Every time the app asks for a file: try the internet first (so updates arrive).
//    Save a fresh copy only if it is a normal, successful answer (not a redirect).
//    If offline, use the saved copy; for the main page, fall back to "./".
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(res => {
        if (res.ok && res.type === "basic" && !res.redirected) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(event.request, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(event.request, { ignoreSearch: true })
          .then(hit => hit || (event.request.mode === "navigate" ? caches.match("./") : undefined))
      )
  );
});
