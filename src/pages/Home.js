import React, { useEffect } from "react";
import Topbar from "../layouts/Topbar";
import Sidebar from "../layouts/Sidebar";
import Feed from "../layouts/Feed";
import Rightbar from "../layouts/Rightbar";
import { callApi } from "../helpers/Helpers";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchPostsFailure, fetchPostsStart, fetchPostsSuccess } from "../store/postSlice";
export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const fetchPosts = async (userId) => {
    try {
       dispatch(fetchPostsStart());
      const res = await callApi("GET", `posts/all/${userId}`,token);      
      dispatch(fetchPostsSuccess(res.data))
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
