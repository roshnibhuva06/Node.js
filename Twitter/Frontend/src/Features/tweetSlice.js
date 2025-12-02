import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTweetsAPI, addTweetAPI, updateTweetAPI, deleteTweetAPI } from "./tweetApi";

// FETCH ALL
export const fetchTweets = createAsyncThunk("tweets/fetch", async () => {
  return await fetchTweetsAPI();
});

// ADD
export const addTweet = createAsyncThunk("tweets/add", async (data) => {
  return await addTweetAPI(data);
});

// UPDATE
export const updateTweet = createAsyncThunk(
  "tweets/update",
  async ({ id, data }) => {
    return await updateTweetAPI(id, data);
  }
);

// DELETE
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
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addTweet.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTweet.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      });
  },
});

export default tweetSlice.reducer;
