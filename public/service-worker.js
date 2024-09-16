self.addEventListener("install", (event) => {
  console.log("Service worker installed.");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

importScripts("https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js");

const firebaseConfig = {
  apiKey: "AIzaSyD-P6rwb41ngLYyJfxm48FCtoGLBhkfD0I",
  authDomain: "bibai-gomi-notification.firebaseapp.com",
  projectId: "bibai-gomi-notification",
  storageBucket: "bibai-gomi-notification.appspot.com",
  messagingSenderId: "684613510185",
  appId: "1:684613510185:web:b5247d2fa1a095ade0e838",
  measurementId: "G-T3SY1FVF5C",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/images/icon-192x192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
