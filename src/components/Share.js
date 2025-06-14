import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Post from "./Post";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { createPostService } from "../services/postService";

export default function Share(props) {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [postDesc, setDesc] = useState("");
  const [imgUrl, setUrl] = useState("");

  useEffect(() => {
    // Reset fields on component mount
    if(!user) {
      Navigate("/login");
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "postDesc":
        setDesc(e.target.value);
        break;
      case "imgUrl":
        setUrl(e.target.value);
        break;
    }
  };

  const createPost = async () => {
    try {
      if (imgUrl == "" || !user._id) {
        alert("Invalid Media");
      } else {
        await createPostService({
          userId: user._id,
          desc: postDesc,
          img: imgUrl,
          username: user.username,
          profilePicture: user.profilePicture,
        }, token)
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { posts, shareTopVisible } = props;
  return (
    <div className="share">
      <div className="shareWrapper">
        {shareTopVisible ? (
          <div className="shareTop">
            <div className="shareTop_input">
              <Avatar
                sx={{ width: 45, height: 45 }}
                alt="profilePic"
                src={user.profilePicture}
              />
              <textarea
                name="postDesc"
                value={postDesc}
                onChange={(e) => handleChange(e)}
                placeholder="What's in you mind?"
              />
            </div>
            <img className="postImage" src={imgUrl} />
            <hr />
            <div className="shareTop_actions">
              <ul className="actions">
                <li onClick={handleOpen}>
                  <PermMediaIcon sx={{ color: "#E64A19" }} />
                  <p>Photo or video</p>
                </li>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  closeAfterTransition
                >
                  <div className="main_modal">
                    <p className="heading">Enter the img/gif URL below</p>
                    <input className="urlInput"
                      name="imgUrl"
                      value={imgUrl}
                      onChange={(e) => handleChange(e)}
                      placeholder="Paste the url here"
                    />
                    <Button
                      variant="contained"
                      endIcon={<CloudUploadIcon />}
                      onClick={handleClose}
                    >
                      Upload
                    </Button>
                  </div>
                </Modal>
                <li>
                  <LocalOfferIcon sx={{ color: "blue" }} />
                  <p>Tag</p>
                </li>
                <li>
                  <LocationOnIcon sx={{ color: "green" }} />
                  <p>Location</p>
                </li>
                <li>
                  <InsertEmoticonIcon sx={{ color: "orange" }} />
                  <p>Feelings</p>
                </li>
              </ul>
              <button className="shareBtn" onClick={createPost}>
                Share
              </button>
            </div>
          </div>
        ) : null}
        <div className="shareBottom ">
          {posts &&
            posts.map((post) => <Post data={post} key={post._id} />)}
        </div>
      </div>
    </div>
  );
}
