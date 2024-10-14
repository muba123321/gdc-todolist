import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("access_token") || null,
  },
  reducers: {
    signin: (state, action) => {
      state.token = action.payload.token;
      Cookies.set("access_token", action.payload.token, { expires: 1 });
    },
    signout: (state) => {
      state.token = null;
      Cookies.remove("access_token");
    },
  },
});

export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;
