import { useRef, useEffect, useState } from "react";
import { Content } from "../components/Content";
import { togglePlayMode } from "../store/featureSlice";
import { useDispatch } from "react-redux";

export default function MediaPlayMode({ posts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPost, setCurrentPost] = useState(posts[0]);
  const youtubeRef = useRef(null);
  const playerRef = useRef(null); // ✅ store player instance
  const [mute, setMute] = useState(false);
  const dispatch = useDispatch();

  // ⌨️ Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
      } else {
        dispatch(togglePlayMode());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [posts.length, dispatch]);

  // 🎥 Update current post
  useEffect(() => {
    if (posts[currentIndex].mediaType === "video") {
      setCurrentPost(posts[currentIndex]);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }
  }, [currentIndex, posts]);

  // 🎬 Load YouTube API once
  useEffect(() => {
    if (window.YT && window.YT.Player) return; // already loaded
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }, []);

  // 🧩 Initialize player once
  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(youtubeRef.current, {
        videoId: "z8hMnXeTcLw", // your video ID
        playerVars: {
          autoplay: 1,
          mute: 1, // start muted (so autoplay works)
          controls: 0,
          rel: 0,
          playsinline: 1,
          loop: 1,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();

            if (event.target.isMuted()) {
                event.target.unMute();
                console.log("🔊 Unmuted");
              }
          },
        },
      });
    };
  }, []);

  // 🔄 Reactively toggle mute/unmute when `mute` state changes
  useEffect(() => {
    const player = playerRef.current;
    if (!player || typeof player.mute !== "function") return;

    if (mute) {
      player.mute();
      console.log("🔇 Background video muted");
    } else {
      player.unMute();
      console.log("🔊 Background video unmuted");
    }
  }, [mute]);

  return (
    <div className="playmodeWrapper">
      {/* ✅ Hidden YouTube background audio */}
      <div
        ref={youtubeRef}
        style={{
          width: "0px",
          height: "0px",
          margin: "0",
        }}
      ></div>

      {/* ✅ Your main content */}
      <Content
        data={currentPost}
        loop={false}
        muted={false}
        controls={true}
        onComplete={() =>
          setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length)
        }
        fullScreen={true}
        muteBgAudio={setMute} // toggle background YouTube audio
      />
    </div>
  );
}
