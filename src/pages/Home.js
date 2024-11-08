import React, { useState, useEffect,useContext } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { Posts } from "../dummyData";
import { MyContext } from "../MyContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const {user,loggedIn} = useContext(MyContext);


  const fetchPosts = async (userId) => {
    const res = await axios.get(`posts/timeline/${userId}`);
    setPosts(res.data.data);
  };
  useEffect(() => {
    user && fetchPosts(user._id);
  }, [user]);

  return loggedIn ? <React.Fragment>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed posts={posts} />
        <Rightbar />
      </div>
    </React.Fragment> : <Navigate to="login" />
    
  ;
}
