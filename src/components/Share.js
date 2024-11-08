import { Avatar } from "@mui/material";
import React from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Post from "./Post";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function Share(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    console.log("clicked open");
    setOpen(true);
  };
  const handleClose = () => {
    console.log("clicked close");
    setOpen(false);
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
              src="https://i.pinimg.com/564x/ac/36/64/ac3664428f99e65dd7c1020a5bbbaee9.jpg"
            />
            <textarea placeholder="What's in you mind?" />
          </div>
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
                  <div
                    className="main_modal"
                  >
                    <p className="heading">Enter the img/gif URL below</p>
                    <input placeholder="Paste the url here" />
                    <Button variant="contained" endIcon={<CloudUploadIcon />}>
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
            <button className="shareBtn">Share</button>
          </div>
        </div>
        <div className="shareBottom ">
          {posts && posts.map((post) => (
            <Post data={post} key={post._id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
