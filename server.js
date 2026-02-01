const express = require("express");
const app = express();

app.get("/upload", (req, res) => {
    console.log("Bienenwaage Upload:", req.query);
    res.send("OK");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server läuft auf Port", port));
