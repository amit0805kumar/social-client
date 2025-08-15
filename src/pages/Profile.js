import React, { useState, useEffect } from "react";
import Topbar from "../layouts/Topbar";
import Feed from "../layouts/Feed";
import ProfileRightBar from "../layouts/ProfileRightBar";
import Sidebar from "../layouts/Sidebar";
import ProfileHeader from "../layouts/ProfileHeader";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { startLoader, endLoader } from "../store/authSlice";
import {
  fetchFollowingUsersService,
  fetchUserByIdService,
} from "../services/userService";
import { fetchUserPosts } from "../services/postService";
import Loader from "../components/Loader";

export default function Profile() {
  const [profileUser, setProfileUser] = useState({});
  const [friended, setFriended] = useState(false);
  const loading = useSelector((state) => state.auth.loading);

  const user = useSelector((state) => state.auth.user);

  const [followings, setFollowings] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const [isCurrentUser, setCurrentUserProfile] = useState(false);

  const userId = useParams()._id;

  const fetchUserById = async () => {
    try {
      const res = await fetchUserByIdService(userId);
      setProfileUser(res);

      //Check whether user is a friend or not
      if (user && user._id) {
        if (user._id !== res._id) {
          setCurrentUserProfile(false);
        } else {
          setCurrentUserProfile(true);
        }
        if (user?.following?.includes(res._id)) {
          setFriended(true);
        } else {
          setFriended(false);
        }
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async (userId) => {
    startLoader();
    const res = await fetchUserById(userId);
    await fetchPosts(res);
    await fetchFriends(res);
    endLoader();
  };

  useEffect(() => {
    fetchUserData(userId);
  }, [userId, user]);

  const fetchPosts = async (profileUser) => {
    try {
      if (!profileUser || !profileUser._id) {
        throw new Error("Profile user not found");
      }
      const userposts = await fetchUserPosts(profileUser._id);
      if (!userposts || userposts.length === 0) {
        throw new Error("No posts found for this user");
      }
      setProfilePosts(userposts);
    } catch (error) {
      console.log(error);
      setProfilePosts([]);
    }
  };

  const fetchFriends = async (profileUser) => {
    try {
      if (profileUser && profileUser.following) {
        const followings = await fetchFollowingUsersService(
          profileUser.following
        );
        setFollowings(followings);
      }
    } catch (error) {
      console.log(error);
      setFollowings([]);
    }
  };

  return profileUser && !loading ? (
    <React.Fragment>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profile_right">
          <ProfileHeader user={profileUser} />
          <div className="share">
            {profilePosts && profilePosts.length > 0 && (
              <Feed shareTopVisible={false} posts={profilePosts} />
            )}

            <ProfileRightBar
              followings={followings}
              currentUserProfile={isCurrentUser}
              isAFriend={friended}
              setFriended={setFriended}
              profileUser={profileUser}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : <Loader visible={true} />;
}
