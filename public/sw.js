const CACHE_NAME = "control_payment"

self.addEventListener('install', function (event) {

});

self.addEventListener("fetch", function (event) {
});

// Delete files cached when new service worker is installed
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    return caches.delete(key);

                }));
            })
    );
    return self.clients.claim();
});
