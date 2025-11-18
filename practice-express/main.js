const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

const logFolder = path.join(__dirname, "logs");
if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder);
}

function logRequest(req) {
    const logPath = path.join(__dirname, "logs", "server.log");
    const time = new Date().toLocaleString();
    const logData = `${time} - ${req.url}\n`;

    fs.appendFile(logPath, logData, (err) => {
        if (err) console.log("Log Error:", err);
    });
}

function servePage(res, pageName) {
    const filePath = path.join(__dirname, "pages", pageName);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.status(404).send("Error loading page...");
        } else {
            res.send(data);
        }
    });
}

app.use((req, res, next) => {
    logRequest(req);
    next();
});

app.get("/", (req, res) => servePage(res, "index.html"));

app.get("/about", (req, res) => servePage(res, "about.html"));

app.get("/contact", (req, res) => servePage(res, "contact.html"));

app.get("/data", (req, res) => {
    res.json({
        user: "roshni bhuva",
        status: "success",
        message: "This is JSON data!",
    });
});

app.use((req, res) => {
    servePage(res, "404.html");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});