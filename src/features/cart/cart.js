import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[]
    },
    reducers:{
        addToCart: (state,action) =>{
            const check  = state.cart.some((obj) => obj._id === action.payload._id)
            if(check === false)
            {
                state.cart.push(action.payload)
            }
        },
        removeFromCart: (state,action) =>{
            state.cart = state.cart.filter((obj) => obj._id != action.payload)
        }
    }
})

export const {addToCart} = cartSlice.actions
export const {removeFromCart} = cartSlice.actions
export default cartSlice.reducer