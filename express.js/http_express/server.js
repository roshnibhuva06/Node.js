const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  const log = `${req.url} - ${new Date().toISOString()}\n`;
  console.log(log.trim());

  fs.appendFileSync(path.join(__dirname, "server.log"), log);

  next();
});

// Serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// JSON data route
app.get("/data", (req, res) => {
  const data = {
    name: "Roshni Bhuva",
    project: "Node.js Express Server",
    status: "Running Successfully",
  };
  res.json(data);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
