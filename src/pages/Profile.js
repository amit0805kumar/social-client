import React, { useState, useEffect, useContext } from "react";
import Topbar from "../components/Topbar";
import Feed from "../components/Feed";
import UserInfo from "../components/UserInfo";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import { Navigate, useParams } from "react-router";
import { MyContext } from "../MyContext";
import { callApi } from "../helpers/Helpers";
export default function Profile() {
  const { setLoading } = useContext(MyContext);
  const [userPosts, setUserPosts] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [followings, setFollowings] = useState([]);

  const username = useParams().username;


  useEffect(() => {
    const fetchUserByUsername = async () => {
      try {
        setLoading(true);
        const res = await callApi("GET", `users?username=${username}`);
        setProfileUser(res.data.user);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    //Initial function
    fetchUserByUsername();
  }, [username, setLoading]);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const userposts = await callApi(
        "GET",
        `posts/profile/${profileUser._id}`
      );
      setUserPosts(userposts.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  const fetchFriends = async () => {
    try {
      setLoading(true);
      let followings = [];
      await Promise.all(
        profileUser &&
          profileUser.followings.map(async (userId) => {
            let res = await callApi("GET", `users?userId=${userId}`);
            followings.push(res.data.user);
          })
      );
      setFollowings(followings);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (profileUser && profileUser._id) {
      fetchPosts();
      fetchFriends();
    }
  }, [profileUser]);

  return profileUser ? (
    <React.Fragment>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profile_right">
          <ProfileHeader user={profileUser} />
          <div className="share">
            {userPosts && userPosts.length > 0 && <Feed posts={userPosts} />}
            {followings && followings.length > 0 && (
              <UserInfo followings={followings} />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : null;
}
