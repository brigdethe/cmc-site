import { useEffect, useRef, useState } from 'react';
import './ProcessHero.css';

const steps = [
  { title: 'Discover', position: '25% 50%', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.' },
  { title: 'Define', position: '40% 55%', copy: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.' },
  { title: 'Design', position: '65% 45%', copy: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.' },
  { title: 'Detail', position: '80% 55%', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum.' },
  { title: 'Deliver', position: '55% 70%', copy: 'Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.' },
  { title: 'Evolve', position: '20% 35%', copy: 'Nullam quis risus eget urna mollis ornare vel eu leo. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.' },
];

export default function Hero({ ready }) {
  const section = useRef(null);
  const [index, setIndex] = useState(0), [expanded, setExpanded] = useState(false);
  const step = steps[index];
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (matchMedia('(max-width: 767px)').matches) return;
      const distance = -section.current.getBoundingClientRect().top;
      setIndex(Math.max(0, Math.min(steps.length - 1, Math.floor(distance / (innerHeight * .6)))));
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', scroll, { passive: true });
    addEventListener('resize', scroll); update();
    return () => { removeEventListener('scroll', scroll); removeEventListener('resize', scroll); cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => setExpanded(false), [index]);

  const go = next => {
    if (next < 0 || next >= steps.length) return;
    if (matchMedia('(max-width: 767px)').matches) { setIndex(next); return; }
    const top = section.current.getBoundingClientRect().top + scrollY + next * innerHeight * .6 + 2;
    window.scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return <section ref={section} className={`process-hero ${ready ? 'process-ready' : ''}`} id="home" aria-labelledby="process-title">
    <div className="process-stage" id="approach">
      <h1 id="process-title">Trust the process</h1>
      <div className="process-grid">
        <div className="process-main-image"><img src="/media/hero.jpg" alt="Warm contemporary studio interior" fetchPriority="high" style={{ objectPosition: step.position }}/></div>
        <div className="process-side">
          <div className="process-counter"><span className="digit-pill">{String(index + 1).padStart(2, '0')}</span><span>/</span><span className="digit-pill">06</span></div>
          <div className="process-small-image"><img src="/media/hero.jpg" alt="Another crop of the studio interior" style={{ objectPosition: steps[(index + 2) % steps.length].position }}/></div>
        </div>
        <div className="process-detail">
          <h2 key={`title-${index}`} className="process-enter">{step.title}</h2>
          <div className="process-copy" key={`copy-${index}`}>
            <p className="process-enter">{step.copy}</p>
            <div className="process-more" id="process-more" hidden={!expanded}><p>Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p></div>
            <button className="process-read" aria-expanded={expanded} aria-controls="process-more" onClick={() => setExpanded(value => !value)}>{expanded ? 'Read less' : 'Read more'}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
          </div>
        </div>
      </div>
      <div className="process-bottom"><span className="process-scroll">Scroll to explore <span aria-hidden="true">↓</span></span><div className="process-controls"><button onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous process step">←</button><button onClick={() => go(index + 1)} disabled={index === steps.length - 1} aria-label="Next process step">→</button></div></div>
    </div>
  </section>;
}
