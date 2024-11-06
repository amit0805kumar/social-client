import Share from "./Share";

export default function Feed(props) {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share posts={props.posts} />
      </div>
    </div>
  )
}
