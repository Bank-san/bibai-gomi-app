const express = require("express");
const bodyParser = require("body-parser");
const webpush = require("web-push");

const app = express();
app.use(bodyParser.json());

const publicVapidKey =
  "BEkVHEB82B5bp48U8f512znlLHJBQthWkC9T7RwrBCBX9J3FDDuqF6_O3USFtnDlcUpS5zHJg5BPtukxON5p2a8";
const privateVapidKey = "nzPiEhyiWwmCPp04H9rl5gBDQZ7wU3ysjHxTRR7Rh2Y";

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});

  const payload = JSON.stringify({
    title: "ゴミ収集日のお知らせ",
    body: "明日は燃えるゴミの日です。忘れずに出しましょう！",
  });

  webpush
    .sendNotification(subscription, payload)
    .catch((error) => console.error(error));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
