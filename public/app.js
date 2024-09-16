// OneSignalの初期化
window.OneSignal = window.OneSignal || [];
OneSignal.push(function () {
  OneSignal.init({
    appId: "08203396-5e64-4caa-a388-a37fcc7d4f1a", // ここに取得したApp IDを設定
  });
});

// 通知許可をリクエスト
document.getElementById("enableNotifications").addEventListener("click", () => {
  OneSignal.push(function () {
    OneSignal.showNativePrompt();
  });
});

// テスト通知を送信
document.getElementById("testNotification").addEventListener("click", () => {
  OneSignal.push(function () {
    OneSignal.sendSelfNotification(
      "テスト通知",
      "これはテスト通知です。",
      "/icons/192.png",
      {
        notificationType: "test",
      }
    );
  });
});

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
