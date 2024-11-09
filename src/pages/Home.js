import React, { useState, useEffect, useContext } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { MyContext } from "../MyContext";
import { callApi } from "../helpers/Helpers";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const { user, setLoading } = useContext(MyContext);

  const fetchPosts = async (userId) => {
    try {
      setLoading(true);
      const res = await callApi("GET", `posts/timeline/${userId}`);
      setPosts(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchPosts(user._id);
    }
  }, [user]);

  return (
    <React.Fragment>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        {user && <Feed posts={posts} />}
        <Rightbar />
      </div>
    </React.Fragment>
  );
}
