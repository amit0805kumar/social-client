import React, { useEffect, useRef, useState } from "react";
import Topbar from "../layouts/Topbar";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { shuffleArray } from "../helpers/Helpers";
import MediaPlayMode from "../layouts/MediaPlayMode";
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

  const loaderRef = useRef(null);
  const observerRef = useRef(null); // Keep a single observer instance

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetchGifs();
      if (res) {
        setGifs(res.data);
    }
    } catch (error) {
      console.error("Error fetching gifs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, []);



  // Admin check
  useEffect(() => {
    setIsAdmin(user?.isAdmin || false);
  }, [user]);

  // Fetch more when page changes
  useEffect(() => {
    if (page > 1) {
     
    }
  }, [page]);

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
  }, [gifs]);


  return (
    <>
      <Topbar showPlayBtn={true} showTopbar={showTopbar} />
      {isAdmin ? (
        <div className="mediaWrapper" ref={scrollRef}>
          <div className="mediaContainer">
            { gifs.length > 0 ? gifs.map(gif=> <GifPlayer code={gif.gifCode} key={gif._id} />) : <p>No GIFs available</p> }
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
