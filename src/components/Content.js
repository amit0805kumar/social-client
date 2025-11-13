import React, { useEffect, useRef, useState } from "react";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import Loader from "./Loader";
import { deleteProfilePostService, getRandomAudio } from "../services/postService";

export function Content(props) {
  const {
    data,
    onClick,
    onComplete,
    showDelete = true,
    muted = true,
    controls = false,
    fullScreen = false,
    muteBgAudio,
    loop = true
  } = props;

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const sampleAudioRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasAudio, setHasAudio] = useState(false);
  const [sampleAudio, setSampleAudio] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // ✅ Auto play/pause based on visibility
  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ Completion handler
  useEffect(() => {
    if (onComplete) {
      if (data.mediaType === "image") {
        const timer = setTimeout(onComplete, 5000);
        return () => clearTimeout(timer);
      } else if (data.mediaType === "video" && videoRef.current) {
        const videoEl = videoRef.current;
        const handleEnded = () => onComplete && onComplete();
        videoEl.addEventListener("ended", handleEnded);
        return () => videoEl.removeEventListener("ended", handleEnded);
      }
    }
  }, [data.mediaType, data.img]);

  // ✅ Check if video has audio
  const checkAudio = async () => {
    const video = videoRef.current;
    if (!video) return;

    const hasSound =
      video.mozHasAudio ||
      video.webkitAudioDecodedByteCount > 0 ||
      (video.audioTracks && video.audioTracks.length > 0);

    if (hasSound) {
     if(muteBgAudio) muteBgAudio(true);
      setHasAudio(true);
    } else {
      if(muteBgAudio) muteBgAudio(false);
      const randomAudio = await getRandomAudio();
      setSampleAudio(randomAudio);
      setHasAudio(false);
    }

    video.muted = muted;
    setIsMuted(muted);
  };

  // ✅ Called when metadata or playback starts
  const handleMetadata = () => checkAudio();
  const handlePlaying = () => checkAudio();

  // ✅ Mute/unmute video and sample audio together
  const toggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);

    // If there’s a sample audio
    if (sampleAudioRef.current) {
      if (!video.muted) {
        try {
          await sampleAudioRef.current.play();
        } catch (err) {
          console.warn("Sample audio play blocked:", err.message);
        }
      } else {
        sampleAudioRef.current.pause();
      }
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const handleDelete = () => setOpenConfirm(true);
  const handleConfirmClose = () => setOpenConfirm(false);

  const deletePost = async () => {
    setDeleteLoader(true);
    const res = await deleteProfilePostService(data.userId, data._id);
    if (res) setDeleted(true);
    setDeleteLoader(false);
  };

  const handleError = () => setMediaError(true);

  return deleted ? null : (
    <div className="content" onClick={onClick} ref={containerRef}>
      {mediaError ? (
        <div className="fallback-ui">
          <Loader visible={deleteLoader} />
          <p>Media failed to load</p>
          <p className="url">{data.img}</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : data.mediaType === "image" ? (
        <img src={data.img} alt="Media" onError={handleError} />
      ) : (
        <>
          <video
            ref={videoRef}
            className="postVideo"
            src={data.img}
            muted
            loop={loop}
            playsInline
            autoPlay
            controls={controls}
            onError={handleError}
            onLoadedMetadata={handleMetadata}
            onPlaying={handlePlaying}
          />
          {/* ✅ sample audio element (lazy-loaded) */}
          {sampleAudio && (
           <audio ref={sampleAudioRef} preload="auto">
  <source src={sampleAudio} type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
          )}
          {hasAudio || sampleAudio ? (
            <button className="mute-button" onClick={toggleMute}>
              {isMuted ? <VolumeOffIcon /> : <VolumeMuteIcon />}
            </button>
          ) : null}
          <button className="fullscreen-button" onClick={toggleFullscreen}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </button>
          {showDelete && (
            <button className="delete-button" onClick={handleDelete}>
              <DeleteIcon />
            </button>
          )}
        </>
      )}

      {/* Confirmation dialog */}
      <Dialog
        open={openConfirm}
        onClose={handleConfirmClose}
        aria-labelledby="delete-confirm-title"
        PaperProps={{
          sx: {
            backgroundColor: "#1e1e1e",
            color: "#fff",
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle id="delete-confirm-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this post? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deletePost}
            color="error"
            variant="contained"
            disabled={deleteLoader}
          >
            {deleteLoader ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
