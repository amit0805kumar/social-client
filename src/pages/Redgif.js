import React, { useEffect, useRef, useState } from "react";
import Topbar from "../layouts/Topbar";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import GifPlayer from "../layouts/GifPlayer";
import { fetchGifs } from "../services/gifservice";

export default function Redgif() {
  const [gifs, setGifs] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showTopbar, setShowTopbar] = useState(true);

  const scrollRef = useRef(null);

  // Fetch GIFs for a specific page
  const fetchData = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await fetchGifs(5);
      if (res?.data?.length > 0) {
        setGifs(res.data);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching gifs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchData(1);
  }, []);

  // Admin check
  useEffect(() => {
    setIsAdmin(user?.isAdmin || false);
  }, [user]);

  // Fetch when page changes
  useEffect(() => {
    if (page >= 1) {
      fetchData(page);
    }
  }, [page]);

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (loading) return;

      if (e.key === "ArrowRight") {
        if (hasMore) setPage((prev) => prev + 1);
      } else if (e.key === "ArrowLeft") {
        setPage((prev) => (prev > 1 ? prev - 1 : 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading, hasMore]);

  // Show/hide topbar on scroll
  useEffect(() => {
    if (!scrollRef.current) return;
    let lastScrollY = scrollRef.current.scrollTop;

    const handleScroll = () => {
      const el = scrollRef.current;
      const scrollingUp = el.scrollTop < lastScrollY;
      setShowTopbar(scrollingUp);
      lastScrollY = el.scrollTop;
    };

    const el = scrollRef.current;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Topbar showPlayBtn={true} showTopbar={showTopbar} />
      {isAdmin ? (
        <div className="mediaWrapper" ref={scrollRef}>
          <div className="mediaContainer">
            {loading ? (
              <Loader visible={true} />
            ) : gifs.length > 0 ? (
              gifs.map((gif) => <GifPlayer code={gif.gifCode} key={gif._id} />)
            ) : (
              <p>No GIFs available</p>
            )}
          </div>
          <div style={{ textAlign: "center", marginTop: "10px", color: "#777" }}>
            <p>Page {page}</p>
            <p>Use ← and → arrow keys to navigate</p>
          </div>
        </div>
      ) : (
        <h1 className="mediaError">Media not available</h1>
      )}
    </>
  );
}
