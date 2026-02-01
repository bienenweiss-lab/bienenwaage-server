const fetch = require("node-fetch");
const express = require("express");
const app = express();

app.get("/upload", async (req, res) => {
    console.log("Bienenwaage Upload:", req.query);

    const googleUrl = "DEINE_GOOGLE_SCRIPT_URL_HIER";

    const params = new URLSearchParams(req.query).toString();
    const finalUrl = googleUrl + "?" + params;

    try {
        const response = await fetch(finalUrl);
        const text = await response.text();
        res.send(text);  // gibt "OK" zurück
    } catch (err) {
        console.error("Fehler beim Google Upload:", err);
        res.status(500).send("ERROR");
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server läuft auf Port", port));
