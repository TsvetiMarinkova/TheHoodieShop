import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    total: Number(localStorage.getItem("total")) || 0,
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  },
  reducers: {
    setTotal(state = initialState, action) {
      state.total += action.payload;
      localStorage.setItem("total", state.total);
    },
    addToCart(state = initialState, action) {
      state.cartItems = Array.isArray(state.cartItems) ? state.cartItems : [];
      state.cartItems.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.total = state.cartItems.reduce((sum, item) => sum + item.price, 0);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { setTotal, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
