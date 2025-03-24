import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  //setting up the user slice and initiating the username store and the isLoggedIn tracker
  name: "user",
  initialState: {
    username: localStorage.getItem("username") || null,
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  },
  reducers: {
    //handling the username storing when the user registers
    register(state = initialState, action) {
      localStorage.setItem("username", action.payload);
      return {
        ...state,
        username: action.payload,
      };
    },
    //handling the login, accessing the registered username
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
    //handling the log out
    logOut(state = initialState, action) {
      localStorage.setItem("isLoggedIn", "false");
      return {
        ...state,
        isLoggedIn: false,
      };
    },
  },
});

//exporting the different reducer functions
export const { register, logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
