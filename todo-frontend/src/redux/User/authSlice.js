import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("access_token") || null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      Cookies.set("access_token", action.payload.token, { expires: 1 });
    },
    logout: (state) => {
      state.token = null;
      Cookies.remove("access_token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
