// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Route pour récupérer les en-têtes
app.get("/api/whoami", (req, res) => {
  // Adresse IP
  const ipaddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Langue préférée (on prend la première langue de la liste)
  const language = req.headers["accept-language"].split(",")[0];

  // User-Agent
  const software = req.headers["user-agent"];

  // Réponse JSON
  res.json({ ipaddress, language, software });
});
// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
