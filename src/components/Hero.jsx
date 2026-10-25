import { allowBackgroundVideo } from '../lib/data-policy.js';
import ResponsiveImage from './ResponsiveImage.jsx';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from './Header.jsx';

const DEFAULT_IMAGE = 'https://ik.imagekit.io/dr5fryhth/Screenshots/Screenshot%202026-04-10%20110118.png?updatedAt=1775838071060';
const DEFAULT_VIDEO = '/media/usehero-web.mp4';

function getFragmentEnd(src) {
  const match = src?.match(/#t=\d*(?:,\s*(\d+(?:\.\d+)?))/);
  return match?.[1] ? parseFloat(match[1]) : null;
}

export default function Hero({
  ready,
  videoSrc = DEFAULT_VIDEO,
  imageSrc = DEFAULT_IMAGE
}) {
  const [loadVideo, setLoadVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null), heroRef = useRef(null);
  const initialSeekDone = useRef(false);
  const fragmentEnd = getFragmentEnd(videoSrc);

  const applyInitialSeek = (video) => {
    if (!initialSeekDone.current && video) {
      initialSeekDone.current = true;
      try {
        video.currentTime = 17;
      } catch (_) {}
    }
  };

  useEffect(() => {
    if (!ready || !allowBackgroundVideo()) return;
    const timer = setTimeout(() => {
      setLoadVideo(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    if(!loadVideo)return;
    const video=videoRef.current;let visible=false;
    const sync=()=>{
      if(visible&&!document.hidden&&allowBackgroundVideo())video.play().catch(()=>{});
      else video.pause();
    };
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()});observer.observe(heroRef.current);
    document.addEventListener('visibilitychange',sync);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);video.pause()};
  },[loadVideo]);

  const restartLoop = (e) => {
    const video = e.currentTarget;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const handleTimeUpdate = (e) => {
    const video = e.currentTarget;
    if (fragmentEnd && video.currentTime >= fragmentEnd) {
      restartLoop(e);
    }
  };

  const handlePause = (e) => {
    const video = e.currentTarget;
    if (!document.hidden && allowBackgroundVideo() && fragmentEnd && video.currentTime >= fragmentEnd - 0.2) {
      restartLoop(e);
    }
  };

  return (
    <section ref={heroRef} className={`hero ${ready ? 'hero-ready' : ''}`} id="home">
      <div className="hero-media" aria-hidden="true">
        <ResponsiveImage src={imageSrc} alt="" loading="eager" fetchPriority="high" />
        {loadVideo && (
          <video
            ref={videoRef}
            preload="metadata"
            muted
            loop
            playsInline
            onLoadedMetadata={(e) => applyInitialSeek(e.currentTarget)}
            onCanPlay={(e) => applyInitialSeek(e.currentTarget)}
            onPlaying={() => setIsPlaying(true)}
            onPlay={(e) => {
              applyInitialSeek(e.currentTarget);
              setIsPlaying(true);
            }}
            onEnded={restartLoop}
            onTimeUpdate={handleTimeUpdate}
            onPause={handlePause}
            style={{
              opacity: isPlaying ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              pointerEvents: 'none'
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        <div className="hero-shade" />
      </div>
      <div className="hero-first">
        <h1>
          <span>Ghana Competition</span>
          <span>Law &amp; Policy</span>
          <span>Seminar.</span>
        </h1>
        <a className="scroll-cue" href="https://seminar.cmc-ghana.com/" target="_blank" rel="noopener noreferrer">
          Official event recap<span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="hero-second" id="approach">
        <p>
          Held in Accra on 25 March 2026, our first seminar examined the choices involved in building Ghana’s competition framework.
        </p>
        <a className="text-link" href="#first-edition"><span className="link-label">
          About the first edition</span><Arrow />
        </a>
      </div>
    </section>
  );
}
