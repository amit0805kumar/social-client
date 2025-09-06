import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followings: [],
  loading: false,
  error: null,
  followers: [],
  profilePics: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchFollowingsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFollowingsSuccess(state, action) {
      state.followings = action.payload;
      state.loading = false;
    },
    fetchFollowingsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateFollowings(state, action) {
      const { user, actionType } = action.payload;
      if (actionType === "add") {
        state.followings.push(user);
      } else if (actionType === "remove") {
        state.followings = state.followings.filter(following => following._id !== user._id);
      } else {
        console.error("Invalid action type for updateFollowings");
      }
    },
    setProfilePics(state, action) {
      state.profilePics = action.payload;
      state.loading = false;
    },
    resetUserState(state) {
      state.followings = [];
      state.loading = false;
      state.error = null;
      state.followers = [];
      state.profilePics = [];
    }
  },
});

export const {
  fetchFollowingsStart,
  fetchFollowingsSuccess,
  fetchFollowingsFailure,
  updateFollowings,
  resetUserState,
  setProfilePics
} = userSlice.actions;


export default userSlice.reducer;
