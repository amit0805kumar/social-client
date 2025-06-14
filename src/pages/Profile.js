import React, { useState, useEffect } from "react";
import Topbar from "../layouts/Topbar";
import Feed from "../layouts/Feed";
import ProfileRightBar from "../layouts/ProfileRightBar";
import Sidebar from "../layouts/Sidebar";
import ProfileHeader from "../layouts/ProfileHeader";
import { useParams } from "react-router";
import { callApi } from "../helpers/Helpers";
import { useSelector } from "react-redux";
import { fetchUserById } from "../services/userService";
import { fetchUserPosts } from "../services/postService";
import { set } from "date-fns";
export default function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [followings, setFollowings] = useState([]);
  const [currentUserProfile, setCurrentUserProfile] = useState(true);
  const [friended, setFriended] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const userId = useParams()._id;

  const fetchUserByUsername = async () => {
    try {
      const res = await fetchUserById(userId, token);
      setProfileUser(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProfileUser(user);
  }, [user]);

  useEffect(() => {
    fetchUserByUsername();
  }, [userId]);

  const fetchPosts = async () => {
    try {
      const userposts = await fetchUserPosts(profileUser._id, token);
      setUserPosts(userposts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFriends = async () => {
    try {
      let followings = [];
      await Promise.all(
        profileUser &&
          profileUser.followings.map(async (userId) => {
            let res = await callApi("GET", `users/${userId}`, token);
            followings.push(res.data.user);
          })
      );
      setFollowings(followings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (profileUser && profileUser._id) {
      if (user && user._id) {
        if (user._id !== profileUser._id) {
          setCurrentUserProfile(false);
        } else {
          setCurrentUserProfile(true);
        }
        if (user?.followings?.includes(profileUser._id)) {
          setFriended(true);
        } else {
          setFriended(false);
        }
      }
      fetchPosts();
      // fetchFriends();
    }
  }, [profileUser, user]);

  return profileUser ? (
    <React.Fragment>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profile_right">
          <ProfileHeader user={profileUser} />
          <div className="share">
            {userPosts && userPosts.length > 0 && (
              <Feed shareTopVisible={currentUserProfile} posts={userPosts} />
            )}
            {followings && (
              <ProfileRightBar
                followings={followings}
                currentUserProfile={currentUserProfile}
                isAFriend={friended}
                setFriended={setFriended}
                profileUser={profileUser}
              />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : null;
}
