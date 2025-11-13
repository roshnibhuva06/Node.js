const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
  const now = new Date().toLocaleString();
  
  fs.appendFile('requests.txt', `Request received: ${now}\n`, (err) => {
    if (err) {
      console.error('Error writ to file:', err);
      return res.status(500).send('Error logging request');
    }
    res.send('Date and time logged!');
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});