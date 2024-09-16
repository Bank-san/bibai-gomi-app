// 通知許可をリクエスト
document.getElementById("enableNotifications").addEventListener("click", () => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              "YOUR_PUBLIC_VAPID_KEY"
            ),
          })
          .then((subscription) => {
            fetch("/subscribe", {
              method: "POST",
              body: JSON.stringify(subscription),
              headers: {
                "Content-Type": "application/json",
              },
            });
          });
      });
    } else {
      alert("通知が拒否されました。");
    }
  });
});

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
