import { useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { MyContext } from '../MyContext';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const navigate = useNavigate();
  const {user,setUser,setLoggedIn} = useContext(MyContext);
  const handleLogout = ()=>{
    setLoggedIn(false);
    setUser({});
    navigate("/login");
  }
  return (
    <div className="topbar_container">
      <Link to="/"><h1 className="topbar_title">Social</h1></Link>
      <div className="topbar_searchbar">
        <SearchIcon color='#000' />
        <input placeholder="Search a friend, post or video" />
      </div>
      <div className="topbar_links">
        <div className="link">Homepage</div>
        <div className="link">Timeline</div>
      </div>
      <div className="topbar_icons">
        <div className="icon">
            <PersonIcon />
        </div>
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
      <Link to="/profile">
      <Avatar alt="Profile pic" src={user.profilePicture} /></Link>
      </div>
    </div>
  );
}
