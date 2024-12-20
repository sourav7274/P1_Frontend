import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name:"wishlist",
    initialState:{
        wishlist:[],
    },
    reducers:{
        addToWishlist: (state,action) =>{
            const check = state.wishlist.find((obj) => obj._id === action.payload._id)
            if(check)
            {
                check.quantity +=1
            }
            else
            {
                state.wishlist.push({...action.payload,quantity: 1})
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