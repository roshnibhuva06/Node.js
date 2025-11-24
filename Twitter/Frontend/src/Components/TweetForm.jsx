import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTweet, updateTweet } from "../Features/tweetSlice";

export default function TweetForm({ editTweetData, clearEdit }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(editTweetData?.username || "");
  const [tweet, setTweet] = useState(editTweetData?.tweet || "");

  const handleSubmit = () => {
    if (!tweet.trim()) return;

    if (editTweetData) {
      dispatch(updateTweet({ id: editTweetData.id, tweet }));
      clearEdit();
    } else {
      dispatch(addTweet({ username, tweet }));
    }

    setTweet("");
    setUsername("");
  };

  return (
    <div className="tweet-box">
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <textarea
        placeholder="What's happening?"
        value={tweet}
        onChange={e => setTweet(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {editTweetData ? "Update Tweet" : "Tweet"}
      </button>
    </div>
  );
}
