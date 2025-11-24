import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTweetsAPI, addTweetAPI, updateTweetAPI, deleteTweetAPI } from "./tweetApi";

// FETCH ALL
export const fetchTweets = createAsyncThunk("tweets/fetch", async () => {
  return await fetchTweetsAPI();
});

// ADD TWEET
export const addTweet = createAsyncThunk("tweets/add", async (data) => {
  return await addTweetAPI(data);
});

// UPDATE TWEET
export const updateTweet = createAsyncThunk("tweets/update", async ({ id, tweet }) => {
  return await updateTweetAPI(id, { tweet });
});

// DELETE TWEET
export const deleteTweet = createAsyncThunk("tweets/delete", async (id) => {
  await deleteTweetAPI(id);
  return id;
});

const tweetSlice = createSlice({
  name: "tweets",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.fulfilled, (state, action) => { state.list = action.payload; })
      .addCase(addTweet.fulfilled, (state, action) => { state.list.push(action.payload); })
      .addCase(updateTweet.fulfilled, (state, action) => {
        const idx = state.list.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.list = state.list.filter(t => t.id !== action.payload);
      });
  },
});

export default tweetSlice.reducer;
