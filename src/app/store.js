import { configureStore } from "@reduxjs/toolkit";
import bookReducer from '../features/books/bookSlice'
import gameReducer from '../features/games/gameSlice'
import jacketReducer from '../features/jackets/jacketSLice'
import phoneReducer from '../features/phones/phoneSlice'
import wishListRecuder from '../features/wishlist/wishlistSlice'
import cartReducer from '../features/cart/cart'

export default configureStore({
    reducer:{
        books: bookReducer,
        games:gameReducer,
        jackets:jacketReducer,
        phone:phoneReducer,
        wishlist:wishListRecuder,
        cart:cartReducer
    }
})