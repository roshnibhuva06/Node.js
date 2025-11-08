 // wap to use fs module, and create basic webpage of html.

 const fs = require('fs')
 fs.writeFileSync("index.html", "<html><head><title>My Web Page</title></head><body><h1>Welcome to My Web Page</h1></body></html>")

 const data = fs.readFileSync("index.html", "utf8")
 console.log(data)

 fs.appendFileSync("index.html", "<p>This is a paragraph.</p>")
