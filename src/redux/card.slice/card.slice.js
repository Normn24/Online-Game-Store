import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      const isOnBasket = state.some((item) => item.article === productToAdd.article);
      if (!isOnBasket) {
        state.push(productToAdd);
        localStorage.setItem("cartItems", JSON.stringify(state));
      }
    },
    removeFromCart: (state, action) => {
      const productToRemove = action.payload;
      const updatedCart = state.filter((product) => product.article !== productToRemove.article);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    },
    loadCartFromLocalStorage: () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      return cartItems;
    },
  },
});
export const { addToCart, removeFromCart, loadCartFromLocalStorage } = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;