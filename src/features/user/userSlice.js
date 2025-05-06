import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const savedUser = sessionStorage.getItem("user");
export const localUser =
  savedUser && savedUser != "undefined" ? JSON.parse(savedUser) : null;

export const getUser = createAsyncThunk("get/user", async (data) => {
  const response = await axios.post(
    `http://localhost:5000/login`,
    data
  );
  const result = await response.data;
  localStorage.setItem("token", result.token);
  sessionStorage.setItem("user", JSON.stringify(result.user));
  return response.data.user;
});
export const getUserByID = createAsyncThunk("get/userId", async (id) => {
  const response = await axios.get(
    `http://localhost:5000/userId/${id}`
  );
  return response.data.user[0];
});
export const makeOrder = createAsyncThunk("/post/order", async (data) => {
  const response = await axios.post(
    `http://localhost:5000/order`,
    data
  );
  // console.log(response.data);
  return response.data.user;
});

// export const getOrders = createAsyncThunk("get/orders", async (id) => {
//   const response = await axios.get(`http://localhost:5000/orderHistory/${id}`);
//   // console.log(response.data);
// });

export const addtoCartFWish = createAsyncThunk(
  "cart/wish",
  async ({ id, data }) => {
    console.log(data);
    const response = await axios.put(
      `http://localhost:5000/${id}/cartFWish`,
      data
    );
    return response.data.user;
  }
);

export const deleteItemFCart = createAsyncThunk(
  "delete/cart",
  async ({ id, data }) => {
    const response = await axios.put(
      `http://localhost:5000/${id}/cart`,
      data
    );
    // console.log(response.data);
    return response.data.user;
  }
);

export const deleteItemFWishlist = createAsyncThunk(
  "delete/wish",
  async ({ id, data }) => {
    console.log(data);
    const response = await axios.put(
      `http://localhost:5000/${id}/wishlist`,
      data
    );
    return response.data.user;
  }
);

export const postUser = createAsyncThunk("post/user", async (data) => {
  const response = await axios.post(
    "http://localhost:5000/user",
    data
  );
  const result = await response.data;
  console.log(result.message);
  return result.newUser;
});

export const updateUser = createAsyncThunk(
  "update/user",
  async ({ id, data }) => {
    const response = await axios.put(
      `http://localhost:5000/user/${id}`,
      data
    );
    const result = await response.data;
    // console.log(result.user)
    return result.user;
  }
);

export const addToWishlist = createAsyncThunk(
  "add/wish",
  async ({ id, data }) => {
    const response = await axios.post(
      `http://localhost:5000/user/${id}/wishlist`,
      data
    );
    // console.log(response.data.user)
    return response.data.user;
  }
);

export const addToCart = createAsyncThunk("add/cart", async ({ id, data }) => {
  const response = await axios.post(
    `http://localhost:5000/user/${id}/cart`,
    data
  );
  return response.data.user;
});

export const deleteAddress = createAsyncThunk(
  "delete/address",
  async ({ id, addId }) => {
    // console.log(id, addId);
    const response = await axios.put(
      `http://localhost:5000/deleteAddress/${id}`,
      { addId }
    );
    // console.log(response.data.message);
    return response.data.user;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localUser || null,
    loading: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = null;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = null;
      state.error = action.error.message;
    });
    builder.addCase(postUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUserByID.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(makeOrder.fulfilled, (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(deleteItemFCart.fulfilled, (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(deleteItemFWishlist.fulfilled, (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(addtoCartFWish.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        sessionStorage.setItem("user", JSON.stringify(action.payload));
      }
    });
  },
});

export default userSlice.reducer;
