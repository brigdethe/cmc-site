import { useEffect, useRef, useState } from 'react';
import { Arrow } from './Header.jsx';

const DEFAULT_IMAGE = 'https://ik.imagekit.io/dr5fryhth/Screenshots/Screenshot%202026-04-10%20110118.png?updatedAt=1775838071060';
const DEFAULT_VIDEO = 'https://kabaka.lon1.cdn.digitaloceanspaces.com/video_2026-04-15_14-58-37.mp4#t=0,60';

export default function Hero({
  ready,
  videoSrc = DEFAULT_VIDEO,
  imageSrc = DEFAULT_IMAGE
}) {
  const [loadVideo, setLoadVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      setLoadVideo(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    if (loadVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [loadVideo]);

  return (
    <section className={`hero ${ready ? 'hero-ready' : ''}`} id="home">
      <div className="hero-media" aria-hidden="true">
        <img src={imageSrc} alt="" fetchPriority="high" />
        {loadVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onPlaying={() => setIsPlaying(true)}
            onPlay={() => setIsPlaying(true)}
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
          <span>Lorem ipsum dolor.</span>
          <span>Consectetur adipiscing.</span>
        </h1>
        <a className="scroll-cue" href="#approach">
          Scroll<span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="hero-second" id="approach">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam.
        </p>
        <a className="text-link" href="#services">
          Our approach<Arrow />
        </a>
      </div>
    </section>
  );
}
