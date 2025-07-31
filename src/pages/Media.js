import React, { useEffect, useState } from "react";
import Topbar from "../layouts/Topbar";
import { useSelector } from "react-redux";
import { fetchAllPosts } from "../services/postService";
import { Content } from "../components/Content";
import { Modal } from "@mui/material";
import Loader from "../components/Loader";
import { shuffleArray } from "../helpers/Helpers";

export default function Media() {
  const loading = useSelector((state) => state.auth.loading);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetchAllPosts(1, -1);
      if (res) {
        setPosts(shuffleArray(res.posts));
      }
    };
    fetchPosts();
  }, []);


  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    !loading  && (
      <React.Fragment>
        <Topbar />
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="mediaModal">
            {selectedPost ? (
              <Content onClick={()=>setModalOpen(false)} data={selectedPost} />
            ) : (
              <Loader visible={true} />
            )}
          </div>
        </Modal>
        
        { isAdmin ? <div className="mediaWrapper">
          <div className="scrollTrack">
            <div className="mediaContainer">
              {posts && posts.length > 0 ? (
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
          </div>
        </div> : <h1 className="mediaError">Media not available</h1>}
      </React.Fragment>
    )
  )
}
