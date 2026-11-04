import { useEffect, useRef, useState } from 'react';
import { journey } from '../content/journey.js';

export default function ProductVideo() {
  const videoRef=useRef(null);
  const [error,setError]=useState(false);
  const content=journey.current.video;
  useEffect(()=>{
    const video=videoRef.current;
    const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting || entry.intersectionRatio<0.25) video.pause();},{threshold:[0,0.25]});
    observer.observe(video);
    const pauseHidden=()=>{if(document.hidden) video.pause();};
    document.addEventListener('visibilitychange',pauseHidden);
    return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',pauseHidden);video.pause();};
  },[]);
  return <figure className="product-video">
    <video id="junta-demo" ref={videoRef} src={content.src} poster={content.poster} width="1916" height="948" muted playsInline controls preload="none" aria-label={content.label} aria-describedby="video-caption" onError={()=>setError(true)}/>
    <div className="video-toolbar"><span>{content.sound}</span></div>
    <figcaption id="video-caption">{content.caption}</figcaption>
    {error && <p role="status">{content.error} <a href={content.src}>{content.download}</a></p>}
  </figure>;
}
