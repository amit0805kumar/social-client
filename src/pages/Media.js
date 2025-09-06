import React, { useEffect, useRef, useState } from "react";
import Topbar from "../layouts/Topbar";
import { useSelector } from "react-redux";
import { fetchAllPosts } from "../services/postService";
import { Content } from "../components/Content";
import Loader from "../components/Loader";
import { shuffleArray } from "../helpers/Helpers";
import MediaPlayMode from "../layouts/MediaPlayMode";

export default function Media() {
  const playMode = useSelector((state) => state.feature.playMode);
  const [posts, setPosts] = useState([]);
  const [movingPosts, setMovingPosts] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showTopbar, setShowTopbar] = useState(true);

  const loaderRef = useRef(null);
  const observerRef = useRef(null); // Keep a single observer instance

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetchAllPosts(1, -1);
      if (res) {
        setPosts(shuffleArray(res.posts));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPosts(page);
  }, []);

  useEffect(() => {
    setMovingPosts(posts.slice(0, 10));
  }, [posts]);

  // Admin check
  useEffect(() => {
    setIsAdmin(user?.isAdmin || false);
  }, [user]);

  // Fetch more when page changes
  useEffect(() => {
    if (page > 1) {
      setMovingPosts((prevPost) => [
        ...prevPost,
        ...posts.slice((page - 1) * 10, page * 10),
      ]);
    }
  }, [page]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!loaderRef.current || !scrollRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: scrollRef.current, // ✅ observe inside scrollable div, not window
        rootMargin: "100px", // ✅ preload before reaching loader
        threshold: 0.1, // ✅ trigger when 10% visible
      }
    );

    observerRef.current.observe(loaderRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loading, hasMore, movingPosts]);

  const scrollRef = useRef(null);

  // Show/hide topbar on scroll
  useEffect(() => {
    if (!scrollRef.current) return;

    let lastScrollY = scrollRef.current.scrollTop;

    const handleScroll = () => {
      setShowTopbar((prev) => {
        const scrollingUp = el.scrollTop < lastScrollY;
        lastScrollY = el.scrollTop;
        return scrollingUp ? true : false;
      });
    };

    const el = scrollRef.current;
    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [posts]);

  if (isAdmin && playMode && posts.length > 0) {
    return (
      <>
        <Topbar showPlayBtn={true} showTopbar={showTopbar} />
        <MediaPlayMode posts={posts} />
      </>
    );
  }

  return (
    <>
      <Topbar showPlayBtn={true} showTopbar={showTopbar} />
      {isAdmin ? (
        <div className="mediaWrapper" ref={scrollRef}>
          <div className="mediaContainer">
            {movingPosts.length > 0 ? (
              movingPosts.map((post) => <Content data={post} key={post._id} />)
            ) : (
              <Loader visible={true} />
            )}
          </div>

          {/* Loader at bottom */}
          <div ref={loaderRef} style={{ height: "50px" }}>
            {loading && <Loader visible={true} />}
          </div>
        </div>
      ) : (
        <h1 className="mediaError">Media not available</h1>
      )}
    </>
  );
}
