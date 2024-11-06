import { Avatar } from "@mui/material";
import React from "react";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Post from "./Post";

export default function Share(props) {
    const {posts} = props;
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <div className="shareTop_input">
            <Avatar  sx={{ width: 45, height: 45 }}
              alt="profilePic"
              src="https://i.pinimg.com/564x/ac/36/64/ac3664428f99e65dd7c1020a5bbbaee9.jpg"
            />
            <textarea  placeholder="What's in you mind?" />
          </div>
          <hr />
          <div className="shareTop_actions">
            <ul className="actions">
                <li>
                    <PermMediaIcon sx={{ color: "#E64A19" }} />
                    <p>Photo or video</p>
                </li>
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
            {posts.map(post=>(<Post data={post} />))}
        </div>
      </div>
    </div>
  );
}
