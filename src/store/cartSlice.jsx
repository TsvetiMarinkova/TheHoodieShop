import { createSlice } from "@reduxjs/toolkit";

//setting up the cart slice and initialising the total and the cart items storing
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    total: Number(localStorage.getItem("total")) || 0,
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  },
  //setting up the different reducer actions
  reducers: {
    //setting up the total handling
    setTotal(state = initialState, action) {
      state.total += action.payload;
      localStorage.setItem("total", state.total);
    },
    //handling when an item is added to the cart
    addToCart(state = initialState, action) {
      state.cartItems = Array.isArray(state.cartItems) ? state.cartItems : [];
      state.cartItems.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    //handling when an item is removed from the cart
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.total = state.cartItems.reduce((sum, item) => sum + item.price, 0);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

//exporting the reducer functions
export const { setTotal, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
