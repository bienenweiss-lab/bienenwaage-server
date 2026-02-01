const express = require("express");
const fetch = require("node-fetch");
const app = express();

// WICHTIG: erst jetzt existiert 'app'
app.enable("trust proxy");

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwcZo9e-uUUpYPfFedizuy9bdKdNQ-UpidLpTYA-KQQdfuFdtE/exec";

// Test-Route für SIM800: zeigt, ob der Node-Server erreicht wird
app.get("/", (req, res) => {
    console.log("Root wurde aufgerufen");
    res.send("OK ROOT");
});

// Haupt-Upload-Route
app.get("/upload", async (req, res) => {
    console.log("Bienenwaage Upload:", req.query);

    const params = new URLSearchParams(req.query).toString();
    const finalUrl = GOOGLE_SCRIPT_URL + "?" + params;

    try {
        const response = await fetch(finalUrl);
        const text = await response.text();
        console.log("Antwort von Google:", text);
        res.send(text);
    } catch (err) {
        console.error("Fehler beim Google Upload:", err);
        res.status(500).send("ERROR");
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server läuft auf Port", port));
