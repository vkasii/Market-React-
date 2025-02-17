import { configureStore } from "@reduxjs/toolkit";
import darkMode from '../redux/themeModeSlice'
import cartReducer from '../redux/cartProductsSlice/cartProductsSlice'
import productsReducer from '../redux/productsSlice/productsSlice'

export const store = configureStore({
  reducer: {
    darkMode,
    cart: cartReducer,
    products: productsReducer
  }
})