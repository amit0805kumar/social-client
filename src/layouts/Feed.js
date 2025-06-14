import Share from "../components/Share";
import {memo} from "react";

function Feed(props) {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share shareTopVisible={props.shareTopVisible} posts={props.posts} />
      </div>
    </div>
  )
}

export default memo(Feed);
