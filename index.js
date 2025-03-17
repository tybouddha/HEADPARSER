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
  // IP : Prioriser x-forwarded-for, nettoyer la valeur
  const ipaddress = req.headers["x-forwarded-for"]
    ? req.headers["x-forwarded-for"].split(",")[0].trim()
    : req.ip || req.socket.remoteAddress || "unknown";

  // Langue : Première valeur de Accept-Language
  const language = req.headers["accept-language"]
    ? req.headers["accept-language"].split(",")[0].trim()
    : "en-US"; // Valeur par défaut raisonnable

  // Software : User-Agent complet
  const software = req.headers["user-agent"] || "unknown";

  // Logs pour déboguer
  console.log("Request headers:", req.headers);
  console.log("Response:", { ipaddress, language, software });

  // Réponse JSON
  res.json({ ipaddress, language, software });
});

// Lancer le serveur
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
