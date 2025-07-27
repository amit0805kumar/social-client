import {createSlice} from '@reduxjs/toolkit';
import { add, set } from 'date-fns';
const initialState = {
  posts: [],
  profilePosts: [],
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
      state.posts = [];
    },
    addPost(state, action) {
      state.posts.unshift(action.payload);
    },
    updatePostStart(state) {
      state.loading = true;
      state.error = null;
    },
    updatePost(state, action) {
      const index = state.posts.findIndex(post => post._id === action.payload._id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      state.loading = false;
    },
    uddatePostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // This action is used to delete a post from the state
    // It filters out the post with the matching id
    deletePost(state, action) {
      state.posts = state.posts.filter(post => post._id !== action.payload);
    },

    setProfilePostStart(state) {
      state.loading = true;
      state.error = null;
    },
    setProfilePosts(state, action) {
      state.profilePosts = action.payload;
      state.loading = false;
    },
    setProfilePostsFailure(state, action) {
      state.profilePosts = [];
      state.loading = false;
      state.error = action.payload;
    },
    updateProfilePost(state, action) {
      const index = state.profilePosts.findIndex(post => post._id === action.payload._id);
      if (index !== -1) {
        state.profilePosts[index] = action.payload;
      }
    },
    deleteProfilePost(state, action) {
      state.profilePosts = state.profilePosts.filter(post => post._id !== action.payload);
    },
    addProfilePost(state, action) {
      state.profilePosts.unshift(action.payload);
    },
    likeAndUnlikePost(state,action){
      state.loading = false;
      const index = state.posts.findIndex(post => post._id === action.payload._id);
      
      if (index !== -1) {
        const post = state.posts[index];
        if (post.likes.includes(action.payload.userId)) {
          post.likes = post.likes.filter(id => id !== action.payload.userId);
        } else {
          post.likes.push(action.payload.userId);
        }
        state.posts[index] = post;
      }
      state.loading = false;
    }

  },
});
export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost,
  updatePostStart,
  updatePost,
  updatePostFailure,
  deletePost,
  setProfilePostStart,
  setProfilePosts,
  setProfilePostsFailure,
  updateProfilePost,
  deleteProfilePost,
  addProfilePost,
  likeAndUnlikePost
} = postSlice.actions;
export default postSlice.reducer;
