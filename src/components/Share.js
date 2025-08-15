import {
  Avatar,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
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
  const { posts, shareTopVisible } = props;

  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.auth.user);

  const [postDesc, setDesc] = useState("");
  const [imgUrl, setUrl] = useState("");
  const [mediaType, setMediaType] = useState("image");

  useEffect(() => {
    // Reset fields on component mount
    if (!user) {
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
      case "mediaType":
        setMediaType(e.target.value);
        break;
      default:
        break;
    }
  };

  const createPost = async () => {
    try {
      if (imgUrl === "" || !user._id) {
        alert("Invalid Media");
      } else {
        await createPostService(
          {
            userId: user._id,
            desc: postDesc,
            img: imgUrl,
            username: user.username,
            profilePicture: user.profilePicture,
            mediaType: mediaType,
          }
        );
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            {mediaType === "image" ? (
              <img className="postImage" src={imgUrl} />
            ) : (
              <video className="postImage" src={imgUrl} autoPlay loop></video>
            )}
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
                    <p className="heading">Enter the media URL here</p>
                    <div className="form">
                      <div className="row">
                        <TextField
                          className="input"
                          name="imgUrl"
                          value={imgUrl}
                          variant="standard"
                          id="standard-basic"
                          placeholder="https://example.com/image.jpg"
                          fullWidth
                          style={{ width: "100%" }}
                          onChange={(e) => handleChange(e)}
                          label="Paste the url here"
                        />
                      </div>
                      <div className="row">
                        <FormControl>
                          <FormLabel id="radio-btn-label">Media Type</FormLabel>
                          <RadioGroup
                            aria-labelledby="radio-btn-label"
                            name="mediaType"
                            defaultValue="image"
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value="image"
                              control={<Radio />}
                              label="Image"
                            />
                            <FormControlLabel
                              value="video"
                              control={<Radio />}
                              label="Video"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>

                      <Button
                        variant="contained"
                        endIcon={<CloudUploadIcon />}
                        onClick={handleClose}
                      >
                        Upload
                      </Button>
                    </div>
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
          {posts && posts.map((post) => <Post data={post} key={post._id} />)}
        </div>
      </div>
    </div>
  );
}
