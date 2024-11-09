import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RecommendIcon from "@mui/icons-material/Recommend";
import { callApi } from "../helpers/Helpers";
export default function Post(props) {
  const [user, setUser] = useState({});
  const { data } = props;

  const fetchUser = async () => {
    try {
      const res = await callApi("GET",`users?userId=${data.userId}`);
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      fetchUser();
    } catch (error) {
      console.log("User not found");
    }
  }, [data.userId]);
  return (
    <div className="postWrapper" key={data.id}>
      <div className="header">
        <div className="col">
          <div className="profilepic_container">
            <Avatar alt="profilepic" src={user.profilePicture} />
          </div>
          <p className="name">{user.username}</p>
          <span className="time">5 days ago</span>
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
        <img src={data.img} />
      </div>
      <div className="footer">
        <div className="actions">
          <div className="likeBtn">
            <RecommendIcon />
          </div>
          <span className="likes"> {data.likes.length} Likes</span>
        </div>
        <div className="comments">9 comments</div>
      </div>
    </div>
  );
}
