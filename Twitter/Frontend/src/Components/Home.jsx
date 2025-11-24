import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTweets } from "../Features/tweetSlice";
import TweetForm from "../Components/TweetForm";
import TweetList from "../Components/TweetList";

export default function Home() {
  const dispatch = useDispatch();
  const [editTweetData, setEditTweetData] = useState(null);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  return (
    <>
      <TweetForm
        editTweetData={editTweetData}
        clearEdit={() => setEditTweetData(null)}
      />
      <TweetList startEdit={(t) => setEditTweetData(t)} />
    </>
  );
}
