import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  userInfo: {},
  success: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.userInfo = payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuth = false;
    },
  },
});
export const { login, logout } = UserSlice.actions;
export const selectUser = (state) => state.user.isAuth;
export default UserSlice.reducer;
