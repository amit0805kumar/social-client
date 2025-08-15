import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoader(state) {
      state.loading = true;
    },
    endLoader(state) {
      state.loading = false;
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.loading = false;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  startLoader,
  endLoader,
} = authSlice.actions;

export default authSlice.reducer;
