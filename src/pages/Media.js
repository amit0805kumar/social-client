import React, { useEffect, useRef, useState } from "react";
import Topbar from "../layouts/Topbar";
import { useSelector } from "react-redux";
import { fetchAllPosts } from "../services/postService";
import { Content } from "../components/Content";
import { Modal } from "@mui/material";
import Loader from "../components/Loader";
import { shuffleArray } from "../helpers/Helpers";
import MediaPlayMode from "../layouts/MediaPlayMode";

export default function Media() {
  const playMode = useSelector((state) => state.feature.playMode);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);
  const observerRef = useRef(null); // Keep a single observer instance

  const fetchPosts = async (pageNumber) => {
    try {
      setLoading(true);

      const res = await fetchAllPosts(pageNumber, 10);
      if (res) {
        if (!res.posts || res.posts.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...shuffleArray(res.posts)]);
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPosts(1);
  }, []);

  // Admin check
  useEffect(() => {
    setIsAdmin(user?.isAdmin || false);
  }, [user]);

  // Fetch more when page changes
  useEffect(() => {
    if (page > 1) fetchPosts(page);
  }, [page]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect(); // Clear previous observer
    }

    observerRef.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    observerRef.current.observe(loaderRef.current);

    return () => observerRef.current.disconnect();
  }, [loading, hasMore]);

  if (isAdmin && playMode && posts.length > 0) {
    return (
      <>
        <Topbar />
        <MediaPlayMode posts={posts} />
      </>
    );
  }

  return (
    <>
      <Topbar />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="mediaModal">
          {selectedPost ? (
            <Content
              controls={true}
              onClick={() => setModalOpen(false)}
              data={selectedPost}
            />
          ) : (
            <Loader visible={true} />
          )}
        </div>
      </Modal>

      {isAdmin ? (
        <div className="mediaWrapper">
          <div
            className="scrollTrack"
          >
            <div className="mediaContainer">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Content
                    onClick={() => {
                      setSelectedPost(post);
                      setModalOpen(true);
                    }}
                    data={post}
                    key={post._id}
                  />
                ))
              ) : (
                <Loader visible={true} />
              )}
            </div>

            {/* Loader at bottom */}
            <div ref={loaderRef} style={{ height: "50px" }}>
              {loading && <Loader visible={true} />}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="mediaError">Media not available</h1>
      )}
    </>
  );
}
