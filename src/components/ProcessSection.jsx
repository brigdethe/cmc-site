import { useEffect, useRef, useState } from 'react';
import './ProcessHero.css';

const steps = [
  { title: 'Paul Kofi Datsa', image: 'paul-kofi-datsa', imageUrl: 'https://ik.imagekit.io/dr5fryhth/creep.jpeg?updatedAt=1771705355007', position: '50% 30%', copy: 'Managing Director, CMC. Paul Kofi Datsa brings experience in telecommunications regulation and Ghana’s competition-policy discussions.', more: 'He previously served as Director of Regulatory Administration at Ghana’s National Communications Authority and represented the NCA at the International Telecommunication Union’s Global Symposium for Regulators in 2015 and 2016.' },
  { title: 'Dr. Juliette Twumasi-Anokye', image: 'juliette-twumasi-anokye', imageUrl: 'https://ik.imagekit.io/dr5fryhth/eleanor?updatedAt=1772063000212', position: '50% 30%', copy: 'Guest Speaker · Competition Law & Policy. A lawyer and independent consultant working across competition law, energy regulation and policy design.', more: 'Her work spans Ghana, West Africa, the UK and the EU. With a doctorate in regulation, competition law and economics, she brings regional insight to institutional capacity and market governance in West Africa.' },
  { title: 'Peter Alexiadis', image: 'peter-alexiadis', position: '50% 30%', copy: 'Keynote Speaker · Visiting Professor. Peter Alexiadis specialises in competition law, communications policy and the regulation of network and digital markets.', more: 'He is a Visiting Professor at King’s College London and a Research Fellow at CERRE. He previously led the Brussels office of Gibson, Dunn & Crutcher, advising competition authorities, regulators and government ministries.' },
  { title: 'Prof. David Bailey KC', image: 'david-bailey', position: '50% 30%', copy: 'King’s Counsel · Session Lead. David Bailey is a Professor of Practice in Competition Law at King’s College London and a practising barrister at Brick Court Chambers.', more: 'An author of leading works on competition law, his work addresses institutional structure, regulatory practice and enforcement policy across the EU, UK and emerging markets.' },
];

export default function ProcessSection() {
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
      <h2 className="process-section-title" id="process-title">Leadership &amp; Expertise</h2>
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
        <div ref={imageStage} className="process-image-stage" aria-hidden="true">{steps.map((item, i) => <div className="process-image-frame" key={item.title} style={{ zIndex: i + 1 }}><img src={item.imageUrl || `/media/people/${item.image}.webp`} alt="" style={{ objectPosition: item.position }}/></div>)}</div>
        <div ref={mainSlot} className="process-main-image"><img key={index} className="process-mobile-image" src={step.imageUrl || `/media/people/${step.image}.webp`} alt={step.title} style={{ objectPosition: step.position }}/></div>
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
