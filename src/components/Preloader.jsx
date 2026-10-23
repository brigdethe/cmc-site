import { useEffect, useRef } from 'react';
import { startPreloader } from '../lib/cmc-preloader.js';
import '../loader.css';

export default function Preloader({ onReveal, onComplete }) {
  const loader = useRef(null);
  useEffect(() => {
    return startPreloader(loader.current, { onReveal, onComplete });
  }, [onReveal, onComplete]);
  return <div ref={loader} className="site-preloader" role="status" aria-label="Loading studio">
    <div className="intro-lockup">
      <span className="intro-mark">cmc<svg viewBox="0 0 40 40" aria-hidden="true"><path fill="currentColor" d="M17 0h6l-1 14L34 5l4 5-12 8 14-1v6l-14-1 12 8-4 5-12-9 1 14h-6l1-14-12 9-4-5 12-8-14 1v-6l14 1L2 10l4-5 12 9z"/></svg></span>
      <div className="intro-words"><span className="intro-spacer">competition</span>{['competition','markets','policy','center','competition'].map((word,i)=><span key={i} data-word>{word}</span>)}</div>
    </div>
  </div>;
}
