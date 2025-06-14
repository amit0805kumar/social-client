import React from "react";
import Friends from "../components/Friends";
import { MyContext } from "../MyContext";
import Button from "@mui/material/Button";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Link } from "react-router-dom";
import { callApi } from "../helpers/Helpers";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
export default function ProfileRightBar(props) {
  // const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const {
    profileUser,
    followings,
    currentUserProfile,
    isAFriend,
    setFriended,
  } = props;

  const handleFriends = async (friends) => {
    if (friends) {
      let res = await callApi("PUT", `users/${profileUser._id}/follow`, token, {
        userId: profileUser._id,
      });
      let updatedUser = profileUser;
      updatedUser.followings.push(profileUser._id);
      setFriended(friends);
    } else {
      let res = await callApi(
        "PUT",
        `users/${profileUser._id}/unfollow`,
        token,
        {
          userId: profileUser._id,
        }
      );
      let updatedUser = profileUser;
      updatedUser.followings = profileUser.followings.filter(
        (id) => id != profileUser._id
      );
      // setUser(updatedUser);
      console.log(res);
      setFriended(friends);
    }
  };

  return (
    <div className="userInfoWrapper">
      {!currentUserProfile ? (
        <div className="profileFollow">
          {!isAFriend ? (
            <Button
              startIcon={<GroupAddIcon />}
              variant="outlined"
              onClick={() => handleFriends(true)}
            >
              Follow
            </Button>
          ) : (
            <Button
              startIcon={<GroupIcon />}
              variant="contained"
              onClick={() => handleFriends(false)}
            >
              Unfollow
            </Button>
          )}
        </div>
      ) : null}

      {profileUser ? (
        <div className="basic">
          <h3>{currentUserProfile ? "Your" : "User"} Information</h3>
          <div className="row">
            <h4>Name</h4>{" "}
            <p>{(profileUser.firstName || "")} {profileUser.lastName || ""}</p>
          </div>
          <div className="row">
            <h4>City</h4> <p>{profileUser.city ? profileUser.city : "-"}</p>
          </div>
          <div className="row">
            <h4>Relationship</h4>{" "}
            <p>
              {profileUser.relationshipStatus == 1
                ? "Single"
                : profileUser.relationshipStatus == 2
                ? "Married"
                : "-"}
            </p>
          </div>
        </div>
      ) : null}
      <div className="friends">
        <h3>{currentUserProfile ? "Your" : "User"} friends</h3>
        <div className="friends_list">
          {followings && followings.length  ?
            followings.map((user) => {
              return (
                <Link to={`/profile/${user.username}`}>
                  <Friends key={user._id} data={user} />
                </Link>
              );
            }) : <p>No friends found</p>}
        </div>
      </div>
      {currentUserProfile ? <EditProfile /> : null}
    </div>
  );
}
