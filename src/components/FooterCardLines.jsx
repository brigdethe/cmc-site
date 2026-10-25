import { useEffect, useRef } from 'react';
import './FooterCardLines.css';

const paths = [
  'M 560 -40 V 190 Q 560 250 620 250 H 790 Q 850 250 850 310 V 640',
  'M 1040 120 H 810 Q 750 120 750 180 V 350 Q 750 410 690 410 H 440 Q 380 410 380 470 V 640',
  'M 980 640 V 470 Q 980 410 920 410 H 900 Q 840 410 840 350 V -40',
  'M 1040 320 H 940 Q 880 320 880 260 V 80 Q 880 20 820 20 H 680 Q 620 20 620 -40',
  'M 650 640 V 560 Q 650 500 710 500 H 730 Q 790 500 790 440 V 340 Q 790 280 850 280 H 1040',
];

const spreadPaths = [
  'M 100 -40 V 180 Q 100 240 160 240 H 360 Q 420 240 420 300 V 640',
  'M -40 440 H 200 Q 260 440 260 380 V 100 Q 260 40 320 40 H 1040',
  'M 540 -40 V 360 Q 540 420 600 420 H 840 Q 900 420 900 480 V 640',
  'M 1040 180 H 780 Q 720 180 720 240 V 480 Q 720 540 660 540 H -40',
  'M 60 640 V 520 Q 60 460 120 460 H 400 Q 460 460 460 400 V -40',
];

export default function FooterCardLines({ variant = 'footer' }) {
  const artwork = useRef(null);
  useEffect(() => {
    const element = artwork.current;
    if (typeof IntersectionObserver === 'undefined') return;
    let visible = false;
    const sync = () => { element.dataset.playing = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, []);
  return <svg ref={artwork} className={`footer-card-lines footer-card-lines--${variant}`} viewBox="0 0 1000 600" preserveAspectRatio={variant === 'footer' ? 'xMidYMid slice' : 'none'} aria-hidden="true" focusable="false">
    {(variant === 'footer' ? paths : variant === 'project-hero' ? spreadPaths.slice(0, 4) : variant === 'company-panel' ? spreadPaths.slice(0, 3) : variant === 'hero' || variant === 'preloader' ? spreadPaths.slice(0, 2) : variant === 'about' ? spreadPaths.slice(0, 2) : spreadPaths).map((d, index) => <g key={d} className={`footer-card-line footer-card-line--${index + 1}`}>
      <path className="footer-card-line-base" d={d} pathLength="1"/>
      <path className="footer-card-line-trace" d={d} pathLength="1" style={{ animationDelay: `${[0, -4, -8, -2, -6][index]}s` }}/>
    </g>)}
  </svg>;
}





