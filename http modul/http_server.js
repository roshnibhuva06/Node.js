const fs = require("fs")
const path = require("path")
const http = require("http")

const server = http.createServer((req, res) => {
    let filePath;

    console.log(`${req.url} - ${new Date().toISOString()}`)

    //json data 
    if (req.url === "/") {
        filePath = path.join(__dirname, "index.html");

    } 
    else if (req.url === "/about") {
        filePath = path.join(__dirname, "about.html");

    }
     else if (req.url === "/contact") {
        filePath = path.join(__dirname, "contact.html");
    }
     else if (req.url === "/data") {

        const data = {
            name: "Roshni Bhuva",
            project: "Node.js HTTP Server",
            status: "Running Successfully",
        };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
        return;

    } 
    else {
        filePath = path.join(__dirname, "404.html");
    }
//read file
     fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("server Error");
    } else {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    }
  });


});

server.listen(5000, () => {
  console.log("http://localhost:5000");
});