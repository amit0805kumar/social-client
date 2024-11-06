import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';

export default function Topbar() {
  return (
    <div className="topbar_container">
      <h1 className="topbar_title">Social</h1>
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
      </div>
      <div className="topbar_profile">
      <Avatar alt="Profile pic" src="https://i.pinimg.com/564x/ac/36/64/ac3664428f99e65dd7c1020a5bbbaee9.jpg" />
      </div>
    </div>
  );
}
