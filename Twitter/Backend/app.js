const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const filePath = path.resolve("tweets.json");

// READ
const readTweets = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

// SAVE
const saveTweets = (tweets) => {
  fs.writeFileSync(filePath, JSON.stringify(tweets, null, 2));
};

// GET ALL
app.get("/tweets", (req, res) => {
  res.json(readTweets());
});

// CREATE
app.post("/tweets", (req, res) => {
  const tweets = readTweets();
  const newTweet = {
    id: Date.now(),
    username: req.body.username || "Guest",
    tweet: req.body.tweet.trim(),
    createdAt: new Date().toISOString(),
  };
  tweets.push(newTweet);
  saveTweets(tweets);
  res.status(201).json(newTweet);
});

// UPDATE
app.put("/tweets/:id", (req, res) => {
  const tweets = readTweets();
  const id = Number(req.params.id);
  const idx = tweets.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "Tweet not found" });
  tweets[idx].tweet = req.body.tweet.trim();
  saveTweets(tweets);
  res.json(tweets[idx]);
});

// DELETE
app.delete("/tweets/:id", (req, res) => {
  let tweets = readTweets();
  const id = Number(req.params.id);
  tweets = tweets.filter((t) => t.id !== id);
  saveTweets(tweets);
  res.sendStatus(204);
});

app.listen(5000, () => console.log("Server running at http://localhost:5000"));
