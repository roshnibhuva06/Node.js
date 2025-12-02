import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTweet, updateTweet } from "../Features/tweetSlice";

export default function TweetForm({ editTweetData, clearEdit }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    tweet: "",
    profile: "",
  });

  useEffect(() => {
    if (editTweetData) {
      setForm({
        username: editTweetData.username,
        tweet: editTweetData.tweet,
        profile: editTweetData.profile || "",
      });
    }
  }, [editTweetData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username || !form.tweet) {
      alert("Username & Tweet required!");
      return;
    }

    if (editTweetData) {
      dispatch(updateTweet({ id: editTweetData.id, data: form }));
      clearEdit();
    } else {
      dispatch(addTweet(form));
    }

    setForm({ username: "", tweet: "", profile: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="tweet-form">
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <textarea
        placeholder="Write a tweet..."
        value={form.tweet}
        onChange={(e) => setForm({ ...form, tweet: e.target.value })}
      />

      <button type="submit" className="tweet-button">
        {editTweetData ? "Update Tweet" : "Add Tweet"}
      </button>
    </form>
  );
}
