import { useEffect, useRef } from "react";

export function Content(props) {
  const { data, onClick, controls = false, muted = true, loop = true, onComplete } = props;
  const videoRef = useRef(null);

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

  return (
    <div className="content" onClick={onClick}>
      {data.mediaType === "image" && data.img !== "" ? (
        <img src={data.img} alt={data.img} />
      ) : (
        <video
          ref={videoRef}
          className="postVideo"
          src={data.img}
          autoPlay
          controls={controls}
          muted={muted}
          loop={loop}
        ></video>
      )}
    </div>
  );
}
