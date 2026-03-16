import { createSlice } from "@reduxjs/toolkit";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserFromStorage(),
  },
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    logoutAction: (state) => {
      state.user = null;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;