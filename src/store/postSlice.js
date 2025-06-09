import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  posts: [],
  loading: false,
  error: null,
};
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action) {
      state.posts = action.payload;
      state.loading = false;
    },
    fetchPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addPost(state, action) {
      state.posts.unshift(action.payload);
    },
    updatePost(state, action) {
      const index = state.posts.findIndex(post => post._id === action.payload._id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(post => post._id !== action.payload);
    },
  },
});
export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost,
  updatePost,
  deletePost,
} = postSlice.actions;
export default postSlice.reducer;
