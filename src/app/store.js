import { configureStore } from "@reduxjs/toolkit";
import bookReducer from '../features/books/bookSlice'
import gameReducer from '../features/games/gameSlice'
import jacketReducer from '../features/jackets/jacketSLice'
import phoneReducer from '../features/phones/phoneSlice'
import wishListReducer from '../features/wishlist/wishlistSlice'
import cartReducer from '../features/cart/cart'
import addressReducer from '../features/address/addresSlice'
import userReducer from '../features/user/userSlice'

export default configureStore({
    reducer:{
        books: bookReducer,
        games:gameReducer,
        jackets:jacketReducer,
        phone:phoneReducer,
        wishlist:wishListReducer,
        cart:cartReducer,
        address: addressReducer,
        user:userReducer
    }
})