
export default function GifPlayer({ code }) {
    return <div className="gifPlayer"  ><iframe src={`https://www.redgifs.com/ifr/${code}`} width='100px' allowFullScreen></iframe></div>;
}