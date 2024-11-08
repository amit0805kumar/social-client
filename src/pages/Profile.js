import React, { useState, useEffect, useContext } from "react";
import Topbar from "../components/Topbar";
import Feed from "../components/Feed";
import UserInfo from "../components/UserInfo";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import axios from "axios";
import { MyContext } from "../MyContext";
export default function Profile() {
  const {user} = useContext(MyContext);
  const [userPosts, setUserPosts] = useState([]);
  const fetchUserData = async () => {
    const userposts = await axios.get(`posts/profile/${user._id}`);
    setUserPosts(userposts.data.data);
  };
  useEffect(() => {
    user && fetchUserData();
  }, []);
  return (
    <React.Fragment>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profile_right">
          <ProfileHeader user={user} />
          <div className="share">
            <Feed posts={userPosts} />
            {user && <UserInfo user={user} />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
