import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[]
    },
    reducers:{
        addToCart: (state,action) =>{
            console.log(action.payload)
            const check  = state.cart.find((obj) => obj._id === action.payload._id)
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
                    action.payload.quantity ? state.cart.push({...action.payload,quantity: action.payload.quantity}) :
                    state.cart.push({...action.payload,quantity: 1})
                    
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