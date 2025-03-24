import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: localStorage.getItem("username") || null,
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  },
  reducers: {
    register(state = initialState, action) {
      localStorage.setItem("username", action.payload);
      return {
        ...state,
        username: action.payload,
      };
    },
    logIn(state = initialState, action) {
      if (action.payload === state.username) {
        localStorage.setItem("isLoggedIn", "true");
        return {
          ...state,
          isLoggedIn: true,
        };
      } else {
        return {
          ...state,
        };
      }
    },
    logOut(state = initialState, action) {
      localStorage.setItem("isLoggedIn", "false");
      return {
        ...state,
        isLoggedIn: false,
      };
    },
  },
});

export const { register, logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
