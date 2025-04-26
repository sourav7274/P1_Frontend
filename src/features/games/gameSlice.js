import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGames = createAsyncThunk("games/fetch", async () => {
  const response = await axios.get(`http://localhost:5000/products/games`);
  return response.data.data;
});

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    games: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.games = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchGames.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default gameSlice.reducer;
