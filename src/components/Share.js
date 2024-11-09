import { Avatar } from "@mui/material";
import React, { useContext, useState } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Post from "./Post";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { MyContext } from "../MyContext";
import { callApi } from "../helpers/Helpers";

export default function Share(props) {
  const [open, setOpen] = React.useState(false);
  const { user, setLoading } = useContext(MyContext);

  const [postDesc, setDesc] = useState("");
  const [imgUrl, setUrl] = useState("");

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
    setLoading(true);
    try {
      if (imgUrl == "" || !user._id) {
        alert("Invalid Media");
      } else {
        await callApi("POST", "posts", {
          userId: user._id,
          desc: postDesc,
          img: imgUrl,
        });
      }
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const { posts } = props;
  return (
    <div className="share">
      <div className="shareWrapper">
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
          <img className="postImage" src={imgUrl}/>
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
                  <input
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
            <button className="shareBtn" onClick={createPost}>Share</button>
          </div>
        </div>
        <div className="shareBottom ">
          {posts && posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => <Post data={post} key={post._id} />)}
        </div>
      </div>
    </div>
  );
}
