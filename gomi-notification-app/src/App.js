import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    // 通知許可をリクエスト
    document
      .getElementById("enableNotifications")
      .addEventListener("click", () => {
        OneSignal.push(function () {
          OneSignal.showNativePrompt();
        });
      });

    // テスト通知を送信
    document
      .getElementById("testNotification")
      .addEventListener("click", () => {
        OneSignal.push(function () {
          OneSignal.sendSelfNotification(
            "テスト通知",
            "これはテスト通知です。",
            "/images/icon-192x192.png",
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
      showInstallPromotion(deferredPrompt);
    });
  }, []);

  const showInstallPromotion = (deferredPrompt) => {
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
  };

  return (
    <div className="App">
      <header>
        <h1>ゴミ収集通知アプリ</h1>
      </header>
      <main>
        <section id="calendar">
          <h2>ゴミ収集カレンダー</h2>
          <p>お住まいの地域に応じて収集日を確認できます。</p>
          <table className="calendar-table">
            <thead>
              <tr>
                <th>日</th>
                <th>月</th>
                <th>火</th>
                <th>水</th>
                <th>木</th>
                <th>金</th>
                <th>土</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td className="burnable">燃やせるゴミ</td>
                <td></td>
                <td className="recyclable">リサイクル</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </section>
        <section id="notification">
          <h2>通知設定</h2>
          <p>
            ゴミ収集日の前日に通知を受け取るには、以下のボタンを押してください。
          </p>
          <button id="enableNotifications">通知を有効にする</button>
          <button id="testNotification">テスト通知を送信</button>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 ゴミ収集通知アプリ</p>
      </footer>
    </div>
  );
}

export default App;
