import { use, useEffect, useState } from "react";
import { Content } from "../components/Content";
import { togglePlayMode } from "../store/featureSlice";
import { useDispatch } from "react-redux";



export default function MediaPlayMode({posts}) {

const [currentIndex, setCurrentIndex] = useState(0);
const [currentPost, setCurrentPost] = useState(posts[0]);
  const dispatch = useDispatch();

useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        // Next
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
      } else if (e.key === "ArrowLeft") {
        // Previous
        setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
      }
      else {
        dispatch(togglePlayMode());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [posts.length]);

useEffect(()=>{
    if(posts[currentIndex].mediaType === 'video'){
      setCurrentPost(posts[currentIndex]);
    }else{
      // Skip to next if not video
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }
},[currentIndex, posts])

  return (
    <div className="playmodeWrapper">
        <Content
          data={currentPost}
          loop={false}
          muted={false}
          controls={true}
          onComplete={()=>{
            setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
          }}
          fullScreen={true}
        />
    </div>
  );
}
