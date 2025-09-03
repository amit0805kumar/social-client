import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import { fetchFollowingsFailure, fetchFollowingsStart, fetchFollowingsSuccess } from "../store/userSlice";
import { fetchFollowingUsersService } from "../services/userService";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));
const ResponsiveAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;

  @media (max-width: 700px) {
    width: 28px;
    height: 28px;
  }
`;
export default function Rightbar() {

  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user?.followings) || [];
  const user = useSelector((state) => state.auth.user);
  const fetchFriends = async () => {
      try {
        if (user && user.following) {
          dispatch(fetchFollowingsStart());
          const followings = await fetchFollowingUsersService(
            user.following
          );
          
          dispatch(fetchFollowingsSuccess(followings));
        }
      } catch (error) {
        console.log(error);
        dispatch(fetchFollowingsFailure(error.message));
      }
    };

    useEffect(() => {
      fetchFriends();
    }, [user]);


  return (
    <div className="rightbar">
      <div className="birthdayWrapper">
        <img src="https://media.tenor.com/btmyl_V4L4gAAAAj/birthday-bday.gif" />
        <p>
          <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
        </p>
      </div>
      <div className="adWrapper">
        <img
          alt="ad"
         src="https://media.tenor.com/oylzydvTDV4AAAAM/kusuriya-no-hitorigoto-maomao.gif"
        />
      </div>
      <div className="friendsWrapper">
        <h3>Friends online</h3>
        {friends && friends.map((user) => {
          return (
            <Link key={user._id} to={`/profile/${user._id}`} style={{ textDecoration: "none" }}>
            <div className="list" >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <ResponsiveAvatar alt={user.username} src={user.profilePicture} />
              </StyledBadge>
              <p>{user.username}</p>
            </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
