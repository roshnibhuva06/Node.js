import fs from "fs";
import path from "path";

const filePath = path.resolve("data/tweets.json");

export const readTweets = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

export const saveTweets = (tweets) => {
  fs.writeFileSync(filePath, JSON.stringify(tweets, null, 2));
};
