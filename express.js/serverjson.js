const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json({ message: 'Hello, JSON data!' });
});

app.listen(3000, () => {
  console.log('JSON server running on port 3000');
});