import React from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Feed from "../../components/Feed";
import Rightbar from "../../components/Rightbar";
import {Posts} from "../../dummyData";
export default function Home() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed posts={Posts} />
        <Rightbar />
      </div>
    </React.Fragment>
  );
}
