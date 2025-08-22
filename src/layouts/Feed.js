import Share from "../components/Share";
import {memo} from "react";

function Feed(props) {
  return (
    <div className="feed" ref={props.feedRef}>
      <div className="feedWrapper">
        <Share shareTopVisible={props.shareTopVisible} posts={props.posts} loaderRef={props.loaderRef}  />
      </div>
    </div>
  )
}

export default memo(Feed);
