import { useDispatch, useSelector } from "react-redux";
import { deleteTweet } from "../Features/tweetSlice";

export default function TweetList({ startEdit }) {
  const tweets = useSelector((state) => state.tweets.list);
  const dispatch = useDispatch();

  return (
    <div>
      {tweets.map((t) => (
        <div key={t.id} className="tweet-card">
          <strong>@{t.username || "Guest"}</strong>
          <p>{t.tweet}</p>
          <small>{new Date(t.createdAt).toLocaleString()}</small>

          <div className="btn-area">
            <button onClick={() => startEdit(t)}>Edit</button>
            <button onClick={() => dispatch(deleteTweet(t.id))}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
