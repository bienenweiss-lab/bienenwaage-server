const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.enable("trust proxy");
app.use(express.json({ limit: "1mb" }));

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyLmDp_FINxuACikM8Y0FFwpG0UM77vrPXHXnybzlQPKlfhzj4EcVFPfNjgsZCHvTnZMQ/exec";

// Test-Route
app.get("/", (req, res) => {
    console.log("Root wurde aufgerufen");
    res.send("OK ROOT");
});

// POST-Upload vom SIM800
app.post("/upload", async (req, res) => {
    console.log("POST Upload:", req.body);

    const params = new URLSearchParams(req.body).toString();
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
