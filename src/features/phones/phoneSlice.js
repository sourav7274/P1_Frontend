import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPhones = createAsyncThunk("phones/fetch", async () => {
  const response = await axios(
    "https://p1-backend-pqsg.onrender.com/products/phones"
  );
  // console.log(response.data.data)
  return response.data.data;
});

export const phoneSlice = createSlice({
  name: "phone",
  initialState: {
    phones: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhones.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPhones.fulfilled, (state, action) => {
      state.phones = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPhones.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default phoneSlice.reducer;
