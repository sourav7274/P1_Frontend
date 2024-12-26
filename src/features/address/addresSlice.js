import { createSlice } from "@reduxjs/toolkit";


const addressSlice = createSlice({
    name:"address",
    initialState:{
        address:[]
    },
    reducers:{
        addAddress:(state,action) => {
            const check = state.address.find((add) => add == action.payload)
            if(!check)
            {
                state.address.push(action.payload)
            }
        },
        removeAddress:(state,action)=>{
            state.action = state.action.filter((add) => add != action)
        }
    }

})

export default addressSlice.reducer
export const {addAddress,removeAddress} = addressSlice.actions
