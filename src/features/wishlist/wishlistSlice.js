import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name:"wishlist",
    initialState:{
        wishlist:[],
    },
    reducers:{
        addToWishlist: (state,action) =>{
            console.log(action.payload)
            const check = state.wishlist.find((obj) => obj._id === action.payload._id)
            if(check)
            {
                if(action.payload.quantity>1)
                {
                    check.quantity += action.payload.quantity
                }
                else
                {
                    check.quantity += 1
                } 
            }
            else
            {
                action.payload.quantity ? state.wishlist.push({...action.payload,quantity: action.payload.quantity}) :
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