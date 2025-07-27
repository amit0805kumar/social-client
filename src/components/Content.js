export function Content(props) {
  const { data, onClick } = props;
  return (
    <div className="content" onClick={onClick}>
      {data.mediaType === "image" && data.img != "" ? (
        <img src={data.img} />
      ) : (
        <video className="postVideo" src={data.img} autoPlay muted loop></video>
      )}
    </div>
  );
}
