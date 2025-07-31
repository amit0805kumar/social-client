import React, { useEffect } from "react";
import Topbar from "../layouts/Topbar";
import Sidebar from "../layouts/Sidebar";
import Feed from "../layouts/Feed";
import Rightbar from "../layouts/Rightbar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchPostsFailure, fetchPostsStart, fetchPostsSuccess } from "../store/postSlice";
import { fetchTimelinePosts } from "../services/postService";
export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const fetchPosts = async (userId) => {
    try {
       dispatch(fetchPostsStart());
      const res = await fetchTimelinePosts(userId,token);      
      dispatch(fetchPostsSuccess(res))
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchPosts(user._id);
    }
  }, [user]);

  return (
    <React.Fragment>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        {<Feed posts={posts} shareTopVisible={true} />}
        <Rightbar />
      </div>
    </React.Fragment>
  );
}
