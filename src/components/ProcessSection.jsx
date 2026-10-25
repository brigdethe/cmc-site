import ResponsiveImage from './ResponsiveImage.jsx';
import { useEffect, useRef, useState } from 'react';
import './ProcessHero.css';

const steps = [
  { title: 'Paul Kofi Datsa', image: 'paul-kofi-datsa', imageUrl: 'https://ik.imagekit.io/dr5fryhth/creep.jpeg?updatedAt=1771705355007', position: '50% 30%', copy: 'Managing Director, CMC. Paul Kofi Datsa brings people together to discuss competition economics, law and policy in Ghana.', more: 'He led CMC’s organisation of the first Ghana Competition Law & Policy Seminar and joined the delegation that met the National Communications Authority the following day.' },
  { title: 'Dr. Juliette Twumasi-Anokye', image: 'juliette-twumasi-anokye', imageUrl: 'https://ik.imagekit.io/dr5fryhth/eleanor?updatedAt=1772063000212', position: '50% 30%', copy: 'Invited expert · First CMC Seminar. Dr. Juliette Twumasi-Anokye is a lawyer and competition specialist who addressed Ghana’s regional commitments at the event.', more: 'Her contribution highlighted the importance of professional skills, economic expertise and institutional capacity in making competition rules work.' },
  { title: 'Peter Alexiadis', image: 'peter-alexiadis', position: '50% 30%', copy: 'Invited expert · First CMC Seminar. Peter Alexiadis is a Visiting Professor at King’s College London with experience in competition law and communications regulation.', more: 'His seminar session examined technical questions in Ghana’s draft framework, including market power and intellectual property rights.' },
  { title: 'Prof. David Bailey KC', image: 'david-bailey', position: '50% 30%', copy: 'Invited expert · First CMC Seminar. David Bailey KC is Professor of Practice in Competition Law at King’s College London.', more: 'At the seminar, he discussed effective enforcement, certainty for businesses and the challenges of applying competition rules in digital markets.' },
];

export default function ProcessSection({ title = 'Leadership & invited experts' } = {}) {
  const section = useRef(null);
  const imageStage = useRef(null), mainSlot = useRef(null), smallSlot = useRef(null);
  const [index, setIndex] = useState(0), [expanded, setExpanded] = useState(false);
  const swipe = useRef(null);
  useEffect(() => setExpanded(false), [index]);
  const step = steps[index];
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (matchMedia('(max-width: 767px)').matches) return;
      const distance = -section.current.getBoundingClientRect().top;
            const progress = Math.max(0, Math.min(steps.length - 1, distance / (innerHeight * .6)));
      setIndex(Math.floor(progress));
      const base = Math.floor(progress), fraction = progress - base;
      const t = fraction * fraction * (3 - 2 * fraction);
      const origin = imageStage.current.getBoundingClientRect();
      const main = mainSlot.current.getBoundingClientRect(), small = smallSlot.current.getBoundingClientRect();
      const preview = { x: small.left - origin.left, y: small.top - origin.top, w: small.width, h: small.height };
      const full = { x: 0, y: 0, w: main.width, h: main.height };
      const seed = { x: preview.x + preview.w, y: preview.y + preview.h, w: 0, h: 0 };
      const mix = (a, b) => Object.fromEntries(Object.keys(a).map(key => [key, a[key] + (b[key] - a[key]) * t]));
      Array.from(imageStage.current.children).forEach((el, i) => {
        const box = i === base ? mix(full, { ...full, w: 0, h: 0 })
          : i === base + 1 ? mix(preview, full)
          : i === base + 2 ? mix(seed, preview) : seed;
        el.style.width = `${box.w}px`; el.style.height = `${box.h}px`;
        el.style.transform = `translate(${box.x}px, ${box.y}px)`;
        el.style.visibility = box.w > .5 ? 'visible' : 'hidden';
      });
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', scroll, { passive: true });
    addEventListener('resize', scroll); update();
    return () => { removeEventListener('scroll', scroll); removeEventListener('resize', scroll); cancelAnimationFrame(frame); };
  }, []);

  const go = next => {
    if (next < 0 || next >= steps.length) return;
    if (matchMedia('(max-width: 767px)').matches) { setIndex(next); return; }
    const top = section.current.getBoundingClientRect().top + scrollY + next * innerHeight * .6 + 2;
    window.scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return <section ref={section} className="process-hero process-ready" id="process" aria-labelledby="process-title">
    <div className="process-stage">
      <h2 className="process-section-title" id="process-title">{title}</h2>
      <div className="process-grid" onPointerDown={event => {
        if (event.pointerType !== 'touch' || !event.isPrimary || !matchMedia('(max-width: 767px)').matches || event.target.closest('button,a')) return;
        swipe.current = { x: event.clientX, y: event.clientY };
      }} onPointerCancel={() => { swipe.current = null; }} onPointerUp={event => {
        const start = swipe.current;
        swipe.current = null;
        if (!start) return;
        const dx = event.clientX - start.x, dy = event.clientY - start.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
      }}>
        <div ref={imageStage} className="process-image-stage" aria-hidden="true">{steps.map((item, i) => <div className="process-image-frame" key={item.title} style={{ zIndex: i + 1 }}><ResponsiveImage sizes="(max-width: 767px) 100vw, 45vw" src={item.imageUrl || `/media/people/${item.image}.webp`} alt="" style={{ objectPosition: item.position }}/></div>)}</div>
        <div ref={mainSlot} className="process-main-image"><ResponsiveImage sizes="(max-width: 767px) 100vw, 45vw" key={index} className="process-mobile-image" src={step.imageUrl || `/media/people/${step.image}.webp`} alt={step.title} style={{ objectPosition: step.position }}/></div>
        <div className="process-side">
          <div className="process-counter"><span className="digit-pill">{String(index + 1).padStart(2, '0')}</span><span>/</span><span className="digit-pill">{String(steps.length).padStart(2, '0')}</span></div>
          <div className="process-controls process-mobile-controls"><button onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous profile">←</button><button onClick={() => go(index + 1)} disabled={index === steps.length - 1} aria-label="Next profile">→</button></div>
          <div ref={smallSlot} className="process-small-image" aria-hidden="true"/>
        </div>
        <div className="process-detail">
          <h2 key={`title-${index}`} className="process-enter">{step.title}</h2>
          <div className="process-copy" key={`copy-${index}`}>
            <p className="process-enter">{step.copy}</p>
            <p id="profile-full-bio" className="process-enter process-full-bio" data-expanded={expanded}>{step.more}</p>
            <button className="process-read process-mobile-read" aria-expanded={expanded} aria-controls="profile-full-bio" onClick={() => setExpanded(value => !value)}>{expanded ? 'Read less' : 'Read more'}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
          </div>
        </div>
      </div>
      <div className="process-bottom"><span className="process-scroll">Scroll to explore <span aria-hidden="true">↓</span></span><div className="process-controls"><button onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous profile">←</button><button onClick={() => go(index + 1)} disabled={index === steps.length - 1} aria-label="Next profile">→</button></div></div>
    </div>
  </section>;
}

