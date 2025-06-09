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
  const user = useSelector((state) => state.auth.user);
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
      let res = await callApi("PUT", `users/${profileUser._id}/follow`,token, {
        userId: user._id,
      });
      console.log(res);
      let updatedUser = user;
      updatedUser.followings.push(profileUser._id);
      // setUser(updatedUser);
      setFriended(friends);
    } else {
      let res = await callApi("PUT", `users/${profileUser._id}/unfollow`,token, {
        userId: user._id,
      });
      let updatedUser = user;
      updatedUser.followings = user.followings.filter((id) => id != profileUser._id);
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

      {user ? (
        <div className="basic">
          <h3>{currentUserProfile ? "Your" : "User"} Information</h3>
          <div className="row">
            <h4>City</h4> <p>{user.city ? user.city : "-"}</p>
          </div>
          <div className="row">
            <h4>From</h4> <p>{user.from ? user.from : "-"}</p>
          </div>
          <div className="row">
            <h4>Relationship</h4>{" "}
            <p>
              {user.relationship == 1
                ? "Single"
                : user.relationship == 2
                ? "Married"
                : "-"}
            </p>
          </div>
        </div>
      ) : null}
      <div className="friends">
        <h3>{currentUserProfile ? "Your" : "User"} friends</h3>
        <div className="friends_list">
          {followings &&
            followings.map((user) => {
              return (
                <Link to={`/profile/${user.username}`}>
                  <Friends key={user._id} data={user} />
                </Link>
              );
            })}
        </div>
      </div>
      {currentUserProfile ? (
       <EditProfile />
      ) : null}
    </div>
  );
}
