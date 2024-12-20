import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJackets = createAsyncThunk('jackets/fetch',async() =>{
    const response = await axios("https://p1-backend.vercel.app/jacket")
    console.log(response.data.data)
    return response.data.data
})

export const jacketSlice = createSlice({
    name:"jacket",
    initialState:{
        jackets:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(fetchJackets.pending,(state) =>{
            state.status = "loading"
        })
        builder.addCase(fetchJackets.fulfilled,(state,action) =>{
            state.jackets = action.payload
            state.status = "success"
        })
        builder.addCase(fetchJackets.rejected,(state,action) =>{
            state.error = action.error.message
        })
    }
})

export default jacketSlice.reducer