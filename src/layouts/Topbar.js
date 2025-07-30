import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useEffect, useState } from "react";

export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return user ? (
    <div className="topbar_container">
      <Link to="/">
        <h1 className="topbar_title">Social</h1>
      </Link>
      <div className="topbar_searchbar">
        <SearchIcon color="#000" />
        <input placeholder="Search a friend, post or video" />
      </div>
      <div className="topbar_links">
        <div className="link">Homepage</div>
        <div className="link">Timeline</div>
      </div>
      <div className="topbar_icons">
        {isAdmin && (
          <Link to="/media" className="icon">
            <PersonIcon />
          </Link>
        )}
        <div className="icon">
          <NotificationsIcon />
        </div>
        <div className="icon">
          <ChatIcon />
        </div>
        <div className="icon" onClick={handleLogout}>
          <LogoutIcon />
        </div>
      </div>
      <div className="topbar_profile">
        <Link to={`/profile/${user._id}`}>
          <Avatar alt="Profile pic" src={user.profilePicture} />
        </Link>
      </div>
    </div>
  ) : null;
}
