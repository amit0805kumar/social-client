import React, { useEffect, useState, useRef, useCallback } from "react";
import Topbar from "../layouts/Topbar";
import Sidebar from "../layouts/Sidebar";
import Feed from "../layouts/Feed";
import Rightbar from "../layouts/Rightbar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsFailure,
  fetchPostsStart,
  fetchPostsSuccess,
} from "../store/postSlice";
import { fetchTimelinePosts } from "../services/postService";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.auth.user);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef(null);
  const loaderRef = useRef(null); // This will be our "sentinel" element
const feedContainerRef = useRef(null); 
  const fetchPosts = useCallback(
    async (userId, pageNum = 1) => {
      if (loading || !hasMore) return;
      try {
        setLoading(true);
        dispatch(fetchPostsStart());
        const res = await fetchTimelinePosts(userId, pageNum, 10);

        if (res.data.length === 0) {
          setHasMore(false);
        } else {
          dispatch(fetchPostsSuccess([...posts, ...res.data]));
        }
      } catch (error) {
        dispatch(fetchPostsFailure(error.message));
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, loading, hasMore, posts]
  );

  // Initial fetch
  useEffect(() => {
    if (user && user._id) {
      fetchPosts(user._id, page);
    }
  }, [page,user]);

  // Observer for infinite scroll
 useEffect(() => {
  if (!loaderRef.current) return;

  if (observer.current) observer.current.disconnect();

  observer.current = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    },
    {
      root: feedContainerRef.current, // scrollable element
      rootMargin: "200px",
      threshold: 0.1,
    }
  );

  observer.current.observe(loaderRef.current);

  return () => observer.current.disconnect();
}, [posts, hasMore, loading]);


  return (
    <React.Fragment>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed posts={posts} shareTopVisible={true} loaderRef={loaderRef}  feedRef={feedContainerRef}  />
        <Rightbar />
      </div>     
    </React.Fragment>
  );
}
