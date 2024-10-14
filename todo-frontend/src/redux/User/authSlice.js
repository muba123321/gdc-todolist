import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("access_token") || null,
    username: Cookies.get("username") || null,
  },
  reducers: {
    signin: (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
      // Store token and username in cookies
      Cookies.set("access_token", token, { expires: 1 });
      Cookies.set("username", username, { expires: 1 });
    },
    signout: (state) => {
      console.log("nnnnnnnnnn");
      console.log(state.token);
      state.token = null;
      state.username = null;

      // Remove cookies on signout
      Cookies.remove("access_token");
      Cookies.remove("username");
    },
  },
});

export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;
