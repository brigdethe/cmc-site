import { Arrow } from './Header.jsx';

export default function Hero({ ready, videoSrc }) {
  return <section className={`hero ${ready?'hero-ready':''}`} id="home">
    <div className="hero-media" aria-hidden="true">{videoSrc?<video autoPlay muted loop playsInline poster="/media/hero.jpg"><source src={videoSrc} type="video/mp4"/></video>:<img src="/media/hero.jpg" alt="" fetchPriority="high"/>}<div className="hero-shade"/></div>
    <div className="hero-first"><h1><span>Lorem ipsum dolor.</span><span>Consectetur adipiscing.</span></h1><a className="scroll-cue" href="#approach">Scroll<span aria-hidden="true">↓</span></a></div>
    <div className="hero-second" id="approach"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p><a className="text-link" href="#services">Our approach<Arrow/></a></div>
  </section>;
}
