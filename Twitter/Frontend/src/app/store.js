import { configureStore } from "@reduxjs/toolkit";
import tweetReducer from "../Features/tweetSlice";

export const store = configureStore({
  reducer: {
    tweets: tweetReducer,
  },
});
