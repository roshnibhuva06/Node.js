import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets, addTweet, updateTweet, deleteTweet } from "../Features/tweetSlice";

export default function Home() {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.tweets.list);

  const [editTweetData, setEditTweetData] = useState(null);
  const [username, setUsername] = useState("");
  const [tweet, setTweet] = useState("");

  // Fetch tweets
  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  // When editing, update form values
  useEffect(() => {
    if (editTweetData) {
      setUsername(editTweetData.username);
      setTweet(editTweetData.tweet);
    }
  }, [editTweetData]);

  // Submit Tweet or Update Tweet
  const handleSubmit = () => {
    if (!tweet.trim()) return;

    if (editTweetData) {
      dispatch(updateTweet({ id: editTweetData.id, tweet }));
      setEditTweetData(null);
    } else {
      dispatch(addTweet({ username, tweet }));
    }

    setTweet("");
    setUsername("");
  };

  return (
    <div style={{ display: "flex", gap: "6px" }}>

      {/* MAIN SECTION */}
      <div style={{ flex: 1 }}>
        
        {/* TWEET FORM */}
        <div className="tweet-box">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <textarea
            placeholder="What's happening?"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />

          <button onClick={handleSubmit}>
            {editTweetData ? "Update Tweet" : "Tweet"}
          </button>
        </div>

        {/* TWEET LIST */}
        <div>
          {tweets.map((t) => (
            <div className="tweet-card" key={t.id}>
              <strong>@{t.username}</strong>
              <p>{t.tweet}</p>
              <small>{new Date(t.createdAt).toLocaleString()}</small>

              <div className="btn-area">
                <button onClick={() => setEditTweetData(t)}>✏️</button>
                <button onClick={() => dispatch(deleteTweet(t.id))}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  
  );
}
