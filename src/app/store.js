import { configureStore } from "@reduxjs/toolkit";
import bookReducer from '../features/books/bookSlice'
import gameReducer from '../features/games/gameSlice'
import jacketReducer from '../features/jackets/jacketSLice'
import phoneReducer from '../features/phones/phoneSlice'

export default configureStore({
    reducer:{
        books: bookReducer,
        games:gameReducer,
        jackets:jacketReducer,
        phone:phoneReducer
    }
})