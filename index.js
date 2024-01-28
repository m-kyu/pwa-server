const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const webpush = require('web-push')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
  'mailto:yicha7@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.get('/', function (req, res) {
  res.send([vapidKeys.publicKey, vapidKeys.privateKey])
})

app.get('/noti', function (req, res) {
  res.send(vapidKeys.publicKey)
})

app.post('/sendNotification', function (req, res) {

  setTimeout(function () {
    webpush
      .sendNotification(req.body.subscription)
      .then(function () {
        res.sendStatus(201);
      })
      .catch(function (error) {
        res.sendStatus(500);
        console.log(error);
      });
  }, 3000);
})

app.listen(3000)