require("dotenv").config();
const express = require("express");
const app = express();

// Enable CORS
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files (optionnel, si vous avez un dossier public)
app.use(express.static("public"));

// Route principale (optionnel)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html"); // Assurez-vous que ce fichier existe
});

// Test endpoint
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

// Route pour les en-têtes
app.get("/api/whoami", (req, res) => {
  // IP : Prendre la première adresse de x-forwarded-for ou socket.remoteAddress
  const ipaddress = (
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    ""
  )
    .split(",")[0]
    .trim();

  // Langue : Gérer les cas où l'en-tête est absent
  const language = req.headers["accept-language"]
    ? req.headers["accept-language"].split(",")[0]
    : "unknown";

  // User-Agent : Gérer les cas où l'en-tête est absent
  const software = req.headers["user-agent"] || "unknown";

  // Réponse JSON
  res.json({ ipaddress, language, software });
});

// Lancer le serveur
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
