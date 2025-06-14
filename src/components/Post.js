import { Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RecommendIcon from "@mui/icons-material/Recommend";
import { formatDistanceToNow } from "date-fns";

export default function Post(props) {
  const { data } = props;

  return (
    <div className="postWrapper" key={data.id}>
      <div className="header">
        <div className="col">
          <div className="profilepic_container">
            <Avatar alt="profilepic" src={data.profilePicture} />
          </div>
          <p className="name">{data.userName}</p>
          <span className="time">{formatDistanceToNow(new Date(data.createdAt), { addSuffix: false })}</span>
        </div>
        <div className="col">
          <div className="post_options">
            <MoreVertIcon />
          </div>
        </div>
      </div>
      <div className="postText">
        <p>{data.desc}</p>
      </div>
      <div className="media">
        <img src={data.img} />
      </div>
      <div className="footer">
        <div className="actions">
          <div className="likeBtn">
            <RecommendIcon />
          </div>
          <span className="likes"> {data.likes.length} Likes</span>
        </div>
        <div className="comments">9 comments</div>
      </div>
    </div>
  );
}
