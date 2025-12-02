import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "../Features/tweetSlice";
import TweetForm from "./TweetForm";
import TweetList from "./TweetList";

export default function Home() {

  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.tweets.list);

  const [editTweetData, setEditTweetData] = useState(null);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  const clearEdit = () => setEditTweetData(null);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      
      <div style={{ flex: 1 }}>
        <TweetForm editTweetData={editTweetData} clearEdit={clearEdit} />
        <TweetList tweets={tweets} startEdit={setEditTweetData} />
      </div>

    </div>
  );
}
