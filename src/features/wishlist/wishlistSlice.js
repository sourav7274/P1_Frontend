import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name:"wishlist",
    initialState:{
        wishlist:[],
    },
    reducers:{
        addToWishlist: (state,action) =>{
            const check = state.wishlist.some((obj) => obj._id === action.payload._id)
            if(check === false)
            {
                state.wishlist.push(action.payload)
            }
        },
        removeFromWishList: (state,action) =>{
            state.wishlist = state.wishlist.filter((item) => item._id != action.payload)
        }
    }
})

export const {addToWishlist} = wishListSlice.actions
export const {removeFromWishList} = wishListSlice.actions
export default wishListSlice.reducer