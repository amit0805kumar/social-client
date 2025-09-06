import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RecommendIcon from "@mui/icons-material/Recommend";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePostService,
  deleteProfilePostService,
  likePostService,
  unlikePostService,
} from "../services/postService";
import {
  updatePost,
  updatePostStart,
  updatePostFailure,
  updateProfilePost,
  deletePost,
  likeAndUnlikePost,
} from "../store/postSlice";
import Loader from "./Loader";
import { Content } from "./Content";


export default function Post(props) {
  const { data } = props;
  const [postOptionsOpen, setPostOptionsOpen] = useState(false);
  const [editPostOpen, setEditPostOpen] = useState(false);

  const [postDesc, setDesc] = useState("");
  const [imgUrl, setUrl] = useState("");
  const [mediaType, setMediaType] = useState("image");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDesc(data.desc || "");
    setUrl(data.img || "");
    setMediaType(data.mediaType || "image");
  }, [data]);

  const handlePostOptions = (option) => {
    switch (option) {
      case "edit":
        // Handle edit post logic
        setEditPostOpen(true);
        setPostOptionsOpen(false);
        break;
      case "delete":
        handleDeletePost();
        break;
      case "share":
        // Handle share post logic
        console.log("Share post");
        break;
      default:
        break;
    }
  };

  const handleDeletePost = async () => {
    try {
      dispatch(updatePostStart());
      let res = await deleteProfilePostService(user._id, data._id);
      if (res) {
        dispatch(deletePost(data._id));
        dispatch(updateProfilePost(data._id));
        setPostOptionsOpen(false);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      dispatch(updatePostFailure(error.message));
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "imgUrl":
        setUrl(e.target.value);
        break;
      case "mediaType":
        setMediaType(e.target.value);
        break;
      case "postDesc":
        setDesc(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleEditPost = async () => {
    // Logic to handle post editing
    try {
      dispatch(updatePostStart());
      const updatedPost = await updatePostService(user._id, {
        ...data,
        desc: postDesc,
        img: imgUrl,
        mediaType,
      });

      if (updatedPost) {
        dispatch(updatePost(updatedPost));
        dispatch(updateProfilePost(updatedPost));
      }
    } catch (error) {
      console.error("Error updating post:", error);
      updatePostFailure(error.message);
    }
    setEditPostOpen(false);
  };

  const handleLikeUnlike = async () => {
    setLoading(true);
    const isLiked = data.likes.includes(user._id);
    let res;
    if (isLiked) {
      res = await unlikePostService(data._id);
    } else {
      res = await likePostService(data._id);
    }
    if (res && res.success) {
      dispatch(
        likeAndUnlikePost({
          _id: data._id,
          userId: user._id,
        })
      );
    }
    setLoading(false);
  };

  return (
    <div className="postWrapper" key={data.id}>
      <div className="header">
        <div className="col">
          <div className="profilepic_container">
            <Avatar alt="profilepic" src={data.profilePicture} />
          </div>
          <p className="name">{data.userName}</p>
          <span className="time">
            {formatDistanceToNow(new Date(data.createdAt), {
              addSuffix: false,
            })}
          </span>
        </div>
        <div className="col">
          <div className="post_options">
            {user._id === data.userId && (
              <MoreVertIcon onClick={() => setPostOptionsOpen(true)} />
            )}
          </div>
          <Modal
            open={postOptionsOpen}
            onClose={() => setPostOptionsOpen(false)}
          >
            <div className="post-option-wrapper">
              <div
                className="post-option"
                onClick={() => handlePostOptions("edit")}
              >
                <span>Edit</span>
              </div>
              <div
                className="post-option"
                onClick={() => handlePostOptions("delete")}
              >
                <span>Delete</span>
              </div>
              <div
                className="post-option"
                onClick={() => handlePostOptions("share")}
              >
                <span>Share</span>
              </div>
              <div
                className="post-option"
                onClick={() => handlePostOptions("bookmark")}
              >
                <span>Bookmark</span>
              </div>
            </div>
          </Modal>
          <Modal open={editPostOpen} onClose={() => setEditPostOpen(false)}>
            <div className="main_modal">
              <p className="heading">Edit post</p>
              <div className="form">
                <div className="row">
                  <textarea
                    name="postDesc"
                    value={postDesc}
                    onChange={(e) => handleChange(e)}
                    placeholder="What's in you mind?"
                  />
                </div>
                <div className="row">
                  <TextField
                    className="input"
                    name="imgUrl"
                    value={imgUrl}
                    variant="standard"
                    id="standard-basic"
                    placeholder="https://example.com/image.jpg"
                    fullWidth
                    style={{ width: "100%" }}
                    onChange={(e) => handleChange(e)}
                    label="Paste the url here"
                  />
                </div>
                <div className="row">
                  <FormControl>
                    <FormLabel id="radio-btn-label">Media Type</FormLabel>
                    <RadioGroup
                      aria-labelledby="radio-btn-label"
                      name="mediaType"
                      defaultValue="image"
                      onChange={handleChange}
                      value={mediaType}
                    >
                      <FormControlLabel
                        value="image"
                        control={<Radio />}
                        label="Image"
                      />
                      <FormControlLabel
                        value="video"
                        control={<Radio />}
                        label="Video"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <Button
                  variant="contained"
                  endIcon={<CloudUploadIcon />}
                  onClick={handleEditPost}
                >
                  Update
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <div className="postText">
        <p>{data.desc}</p>
      </div>
      <div className="media">
        <Loader visible={loading} />
         <Content data={data} showDelete={false} />
      </div>
      <div className="footer">
        <div className="actions" onClick={() => handleLikeUnlike()}>
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
