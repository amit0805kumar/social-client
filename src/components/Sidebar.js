import RssFeedIcon from "@mui/icons-material/RssFeed";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import YouTubeIcon from "@mui/icons-material/YouTube";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import WorkIcon from "@mui/icons-material/Work";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Avatar } from "@mui/material";
import { Users } from "../dummyData";
export default function Sidebar() {
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
          {Users.map((user) => {
            return <li key={user.id}>
              <Avatar
                sx={{ width: 25, height: 25 }}
                alt="people"
                src={user.profilePicture}
              />
              <p>{user.username}</p>
            </li>;
          })}
        </ul>
      </div>
    </div>
  );
}
