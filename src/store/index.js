import { configureStore } from "@reduxjs/toolkit";
import authReducer from  "./authSlice";
import postReducer from "./postSlice";
import userReducer from "./userSlice";
import featureReducer from "./featureSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    user: userReducer,
    feature: featureReducer
  },
});
export default store;