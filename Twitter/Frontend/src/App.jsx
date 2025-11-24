import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTweets } from "./Features/tweetSlice";
import TweetForm from "./Components/TweetForm";
import TweetList from "./Components/TweetList";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const [editTweetData, setEditTweetData] = useState(null);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  return (
    <div className="layout">
      {/* LEFT SIDEBAR */}
    <aside className="sidebar">
        {/* Cardinal Bird Icon - Placeholder */}
        <h3 className="nav-item active">🏠 Home</h3>
        <p className="nav-item">🔎 Explore</p>
        <p className="nav-item">🔔 Notifications</p>
        <p className="nav-item">✉️ Messages</p>
        <p className="nav-item">🔖 Bookmarks</p>
        <p className="nav-item">🗒️ Lists</p>
        <p className="nav-item">👤 Profile</p>
        <button className="tweet-button-sidebar">Tweet</button>
      </aside>
{/* MIDDLE FEED */}
      <div className="main">
        <h2 className="main-header">Home</h2>
        <TweetForm editTweetData={editTweetData} clearEdit={() => setEditTweetData(null)} />
        <TweetList startEdit={(t) => setEditTweetData(t)} />
      </div>

     {/* RIGHT SIDEBAR */}
      <aside className="sidebar right-sidebar">
        <input type="search" placeholder="Search Twitter" className="search-input" />
        <div className="trends-container">
          <h4>Trends for you</h4>
          <p className="trend-item">enjoying the sunshine</p>
          <p className="trend-item hashtag">#summer2024</p>
          <p className="trend-item">5,432 people are Tweeting this</p>
          <hr />
          <p className="trend-item">space exploration</p>
          <p className="trend-item hashtag">#funtime</p>
          <p className="trend-item">10,094 people are Tweeting this</p>
          {/* Image Placeholder */}
          <div className="lunar-image-container">
            {/* You'd replace this with an actual img tag or a background image in CSS */}
              
          </div>
          <button className="show-more-button">Show more</button>
        </div>
      </aside>
    </div>
  );
}
