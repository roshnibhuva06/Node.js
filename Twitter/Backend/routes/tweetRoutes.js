import { Router } from "express";
import { readTweets, saveTweets } from "../services/tweetService.js";
import { validateTweet } from "../middleware/validateTweet.js";

const router = Router();

// GET all tweets
router.get("/", (req, res) => {
  const tweets = readTweets();
  res.json(tweets);
});

// POST create tweet
router.post("/", validateTweet, (req, res) => {
  const tweets = readTweets();

  const newTweet = {
    id: Date.now(),
    username: req.body.username.trim(),
    tweet: req.body.tweet.trim(),
    createdAt: new Date().toISOString(),
  };

  tweets.push(newTweet);
  saveTweets(tweets);

  res.status(201).json(newTweet);
});

// PUT update tweet
router.put("/:id", validateTweet, (req, res) => {
  let tweets = readTweets();
  const id = Number(req.params.id);

  const index = tweets.findIndex((t) => t.id === id);
  if (index === -1)
    return res.status(404).json({ error: "Tweet not found" });

  tweets[index].tweet = req.body.tweet.trim();
  saveTweets(tweets);

  res.json(tweets[index]);
});

// DELETE tweet
router.delete("/:id", (req, res) => {
  let tweets = readTweets();
  const id = Number(req.params.id);

  tweets = tweets.filter((t) => t.id !== id);
  saveTweets(tweets);

  res.sendStatus(204);
});

export default router;
