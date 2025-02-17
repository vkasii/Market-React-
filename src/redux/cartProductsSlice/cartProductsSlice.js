import { createSlice } from "@reduxjs/toolkit";
import { addProductAction, clearCartAction, initCartAction, removeProductAction, setCartItemAmountAction, toggleCartAction } from "./cartProductsActions";

const initialState = {
  cartProducts: [],
  isCartOpen: false,
  productInCart: false
}

export const createProductsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initCart(state) {
      state.cartProducts = initCartAction();
    },
    addProduct(state, action) {
      state.cartProducts = addProductAction(state.cartProducts, action.payload)
    },
    removeProduct(state, action) {
      state.cartProducts = removeProductAction(state.cartProducts, action.payload)
    },
    toggleCart(state) {
      state.isCartOpen = toggleCartAction(state.isCartOpen)
    },
    setCartItemAmount(state, action) {
      state.cartProducts = setCartItemAmountAction(state.cartProducts, action.payload)
    },
    clearCart(state) {
      state.cartProducts = clearCartAction(state.cartProducts);
    }
  }
})

export const { addProduct, removeProduct, toggleCart, initCart, setCartItemAmount, clearCart } = createProductsSlice.actions

export default createProductsSlice.reducer