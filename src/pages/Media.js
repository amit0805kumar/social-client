import React, { useEffect, useState } from "react";
import Topbar from "../layouts/Topbar";
import Sidebar from "../layouts/Sidebar";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { startLoader, endLoader } from "../store/authSlice";
import { fetchAllPosts } from "../services/postService";
import Post from "../components/Post";
import { Content } from "../components/Content";
import { Modal } from "@mui/material";

export default function Media() {
  const loading = useSelector((state) => state.auth.loading);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetchAllPosts(1, -1);
      if (res) {
        setPosts(res.posts);
      }
    };
    fetchPosts();
  }, []);

  return (
    !loading && (
      <React.Fragment>
        <Topbar />
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="mediaModal">
            {selectedPost ? (
              <Content data={selectedPost} />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </Modal>
        <div class="mediaWrapper">
          <div class="scrollTrack">
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
                <p>No media posts available.</p>
              )}
            </div>
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
                <p>No media posts available.</p>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  );
}
