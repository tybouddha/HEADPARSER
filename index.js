require("dotenv").config();
const express = require("express");
const app = express();

// Enable CORS
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

// Route racine temporaire (sans fichier statique pour tester)
app.get("/", (req, res) => {
  res.send("Request Header Parser Microservice - Use /api/whoami");
});

// Route /api/whoami
app.get("/api/whoami", (req, res) => {
  try {
    const ipaddress = req.headers["x-forwarded-for"]
      ? req.headers["x-forwarded-for"].split(",")[0].trim()
      : req.ip || "unknown";
    const language = req.headers["accept-language"]
      ? req.headers["accept-language"].split(",")[0].trim()
      : "en-US";
    const software = req.headers["user-agent"] || "unknown";

    console.log("Request headers:", req.headers);
    console.log("Response:", { ipaddress, language, software });

    res.json({ ipaddress, language, software });
  } catch (err) {
    console.error("Error in /api/whoami:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
