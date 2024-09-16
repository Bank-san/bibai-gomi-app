const express = require("express");
const bodyParser = require("body-parser");
const webpush = require("web-push");

const app = express();
app.use(bodyParser.json());

const publicVapidKey =
  "BOe6KExlj-i9SSyliCJacV58-r1oGmCi8esW9GgoeRQFubLHV33ZPMioZtKjhyfio8Q2q0nLRbpTvKdt3DtNlXw";
const privateVapidKey = "6hDFzy_PJYSijWTUqbb54tHylpymQX778Ub55Qf7n5Q";

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
