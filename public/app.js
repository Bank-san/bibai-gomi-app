// 通知許可をリクエスト
document.getElementById("enableNotifications").addEventListener("click", () => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              "BOe6KExlj-i9SSyliCJacV58-r1oGmCi8esW9GgoeRQFubLHV33ZPMioZtKjhyfio8Q2q0nLRbpTvKdt3DtNlXw"
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

// テスト通知を送信
document.getElementById("testNotification").addEventListener("click", () => {
  randomNotification();
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

// ランダム通知を送信
const games = [
  { name: "Game 1", author: "Author 1", slug: "game1" },
  { name: "Game 2", author: "Author 2", slug: "game2" },
  { name: "Game 3", author: "Author 3", slug: "game3" },
];

function randomNotification() {
  var randomItem = Math.floor(Math.random() * games.length);
  var notifTitle = games[randomItem].name;
  var notifBody = "Created by " + games[randomItem].author + ".";
  var notifImg = "data/img/" + games[randomItem].slug + ".jpg";
  var options = {
    body: notifBody,
    icon: notifImg,
  };
  var notif = new Notification(notifTitle, options);
  setTimeout(randomNotification, 30000);
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
});

function showInstallPromotion() {
  const installButton = document.createElement("button");
  installButton.textContent = "ホーム画面に追加";
  installButton.style.position = "fixed";
  installButton.style.bottom = "10px";
  installButton.style.right = "10px";
  installButton.style.padding = "10px";
  installButton.style.backgroundColor = "#4caf50";
  installButton.style.color = "white";
  installButton.style.border = "none";
  installButton.style.borderRadius = "5px";
  installButton.style.cursor = "pointer";
  document.body.appendChild(installButton);

  installButton.addEventListener("click", () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      // Clear the deferredPrompt so it can be garbage collected
      deferredPrompt = null;
      // Remove the install button
      document.body.removeChild(installButton);
    });
  });
}
