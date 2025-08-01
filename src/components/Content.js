export function Content(props) {
  const { data, onClick, controls=false } = props;
  return (
    <div className="content" onClick={onClick}>
      {data.mediaType === "image" && data.img !== "" ? (
        <img src={data.img} />
      ) : (
        <video  className="postVideo" src={data.img} autoPlay controls={controls} muted loop></video>
      )}
    </div>
  );
}
