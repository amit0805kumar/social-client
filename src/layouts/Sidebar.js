import RssFeedIcon from "@mui/icons-material/RssFeed";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import YouTubeIcon from "@mui/icons-material/YouTube";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import WorkIcon from "@mui/icons-material/Work";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Avatar } from "@mui/material";
import { callApi } from "../helpers/Helpers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchAllUsers } from "../services/userService";
export default function Sidebar() {
  const [users, setUser] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const fetchAllSidebarUsers = async () => {
    try {
      let allUsers = await fetchAllUsers(token);
      setUser(allUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllSidebarUsers();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebar_list">
          <li>
            <RssFeedIcon fontSize="small" />
            <p>Feed</p>
          </li>
          <li>
            <InsertCommentIcon fontSize="small" />
            <p>Chats</p>
          </li>
          <li>
            <YouTubeIcon fontSize="small" />
            <p>Video</p>
          </li>
          <li>
            <BookmarkIcon fontSize="small" />
            <p>Bookmarks</p>
          </li>
          <li>
            <LiveHelpIcon fontSize="small" />
            <p>Questions</p>
          </li>
          <li>
            <WorkIcon fontSize="small" />
            <p>Jobs</p>
          </li>
          <li>
            <EventAvailableIcon fontSize="small" />
            <p>Events</p>
          </li>
          <li>
            <LibraryBooksIcon fontSize="small" />
            <p>Courses</p>
          </li>
          <li>
            <button className="showmore">Show more</button>
          </li>
          <hr />

          <h5 className="suggetionHeading">Suggestions</h5>
          {users && users.map((data) => {
            if (user._id !== data._id)
              return (
                <Link to={`/profile/${data._id}`}>
                  <li key={data.id}>
                    <Avatar
                      sx={{ width: 25, height: 25 }}
                      alt="people"
                      src={data.profilePicture}
                    />
                    <p>{data.username}</p>
                  </li>
                </Link>
              );
          })}
        </ul>
      </div>
    </div>
  );
}
