import Share from "../components/Share";

export default function Feed(props) {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share shareTopVisible={props.shareTopVisible} posts={props.posts} />
      </div>
    </div>
  )
}

