import React, { useEffect, useRef, useState } from "react";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { deleteProfilePostService } from "../services/postService";
import Loader from "./Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export function Content(props) {
  const { data, onClick, onComplete, showDelete = true } = props;
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // ✅ Play video only when visible
  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {}); // avoid play() promise error
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 } // play only when 50% of the video is visible
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (onComplete) {
      if (data.mediaType === "image") {
        const timer = setTimeout(() => {
          onComplete && onComplete(); // Trigger after 5 sec for image
        }, 5000);

        return () => clearTimeout(timer); // Cleanup on unmount/change
      } else if (data.mediaType === "video" && videoRef.current) {
        const videoEl = videoRef.current;
        const handleEnded = () => {
          console.log("Video ended");
          onComplete && onComplete(); // Trigger when video ends
        };

        videoEl.addEventListener("ended", handleEnded);

        return () => {
          videoEl.removeEventListener("ended", handleEnded); // Cleanup
        };
      }
    }
  }, [data.mediaType, data.img]);

  const [isMuted, setIsMuted] = useState(true);
  const [hasAudio, setHasAudio] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const handleMetadata = () => {
    checkAudio();
  };

  const handlePlaying = () => {
    checkAudio();
  };

  const handleDelete = () => {
    setOpenConfirm(true);
  };

  const handleConfirmClose = () => setOpenConfirm(false);

  const deletePost = async () => {
    setDeleteLoader(true);
    const res = await deleteProfilePostService(data.userId, data._id);
    if (res) {
      setDeleted(true);
    }
    setDeleteLoader(false);
  };

  const checkAudio = () => {
    const video = videoRef.current;
    if (video) {
      if (
        video.mozHasAudio ||
        video.webkitAudioDecodedByteCount > 0 ||
        (video.audioTracks && video.audioTracks.length > 0)
      ) {
        setHasAudio(true);
      } else {
        setHasAudio(false);
      }
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        video.requestFullscreen();
      }
    }
  };

  const [mediaError, setMediaError] = useState(false);

  const handleError = () => {
    setMediaError(true);
  };

  return deleted ? null : (
    <div className="content" onClick={onClick} ref={containerRef}>
      {mediaError ? (
        <div className="fallback-ui">
          <Loader visible={deleteLoader} />
          <p>Media failed to load</p>
          <p className="url">{data.img}</p>
          <button onClick={handleDelete} className={deleted ? "deleted" : ""}>
            {deleted ? "Deleted" : "Delete"}
          </button>
        </div>
      ) : data.mediaType === "image" && data.img !== "" ? (
        <img src={data.img} alt="Media" onError={handleError} />
      ) : (
        <React.Fragment>
          <video
            ref={videoRef}
            className="postVideo"
            src={data.img}
            muted
            loop
            playsInline
            onError={handleError}
            onLoadedMetadata={handleMetadata}
            onPlaying={handlePlaying}
          ></video>
          {hasAudio && (
            <button className="mute-button" onClick={toggleMute}>
              {isMuted ? <VolumeOffIcon /> : <VolumeMuteIcon />}
            </button>
          )}
          <button className="fullscreen-button" onClick={toggleFullscreen}>
            {document.fullscreenElement ? (
              <FullscreenExitIcon />
            ) : (
              <FullscreenIcon />
            )}
          </button>
         { showDelete && <button className="delete-button" onClick={handleDelete}>
            <DeleteIcon />
          </button>}
        </React.Fragment>
      )}

      {/* ✅ Dialog placed outside conditional */}
      <Dialog
        open={openConfirm}
        onClose={handleConfirmClose}
        aria-labelledby="delete-confirm-title"
        className="delete-dialog"
        PaperProps={{
          sx: {
            backgroundColor: "#1e1e1e", // Dark background
            color: "#fff", // White text
            borderRadius: 2, // Optional rounded corners
          },
        }}
      >
        <DialogTitle id="delete-confirm-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this post? This action cannot be
            undone.
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
