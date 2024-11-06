import { Avatar } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RecommendIcon from "@mui/icons-material/Recommend";
import { Users } from "../dummyData";
export default function Post(props) {
  const { data } = props;
  return (
    <div className="postWrapper" key={data.id}>
      <div className="header">
        <div className="col">
          <div className="profilepic_container">
            <Avatar alt="profilepic" src={data.photo} />
          </div>
          <p className="name">
            {Users.filter((u) => u.id === data?.userId)[0].username}
          </p>
          <span className="time">{data.date}</span>
        </div>
        <div className="col">
          <div className="post_options">
            <MoreVertIcon />
          </div>
        </div>
      </div>
      <div className="postText">
        <p>{data.desc}</p>
      </div>
      <div className="media">
        <img src={data.photo} />
      </div>
      <div className="footer">
        <div className="actions">
          <div className="likeBtn">
            <RecommendIcon />
          </div>
          <span className="likes"> {data.like} Likes</span>
        </div>
        <div className="comments">{data.comment} comments</div>
      </div>
    </div>
  );
}
