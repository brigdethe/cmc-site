import { useEffect, useRef, useState } from 'react';
import './OurHomeSections.css';

const image = '/media/hero.jpg';
const positions = ['50% 50%', '15% 50%', '85% 60%', '45% 80%', '70% 35%', '30% 70%'];
const intro = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.';
const body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Vestibulum id ligula porta felis euismod semper.';

function RevealText({ as: Tag = 'p', children, className = '' }) {
  const words = children.split(' ');
  return <Tag className={`oh-reveal ${className}`} data-oh-reveal style={{ '--word-count': words.length }}>{words.map((word, index) => <span key={index} style={{ '--word-index': index }}>{word}{index < words.length - 1 ? ' ' : ''}</span>)}</Tag>;
}

function HomeGallery() {
  const viewport = useRef(null), cursor = useRef(null), drag = useRef(null), frame = useRef(0);
  const [index, setIndex] = useState(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const slideWidth = () => viewport.current.querySelector('figure').getBoundingClientRect().width + 16;
  const go = direction => viewport.current.scrollBy({ left: direction * slideWidth(), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  const scroll = () => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => { frame.current = 0; setIndex(Math.max(0, Math.min(5, Math.round(viewport.current.scrollLeft / slideWidth())))); });
  };
  const point = event => {
    const el = viewport.current, rect = el.getBoundingClientRect();
    if (event.pointerType !== 'touch') {
      cursor.current.style.transform = `translate(${event.clientX - rect.left + el.scrollLeft}px,${event.clientY - rect.top}px) translate(-50%,-50%)`;
      cursor.current.dataset.label = event.clientX - rect.left < rect.width * .25 ? 'Back' : 'Next';
    }
    if (drag.current?.active) {
      const distance = event.clientX - drag.current.x;
      if (Math.abs(distance) > 5) drag.current.moved = true;
      el.scrollLeft = drag.current.left - distance;
    }
  };
  const release = event => {
    if (!drag.current?.active) return;
    drag.current.active = false;
    viewport.current.removeAttribute('data-dragging');
    if (viewport.current.hasPointerCapture(event.pointerId)) viewport.current.releasePointerCapture(event.pointerId);
  };
  return <section className="oh-gallery" aria-label="Studio image gallery" data-home-scheme="dark">
    <div className="oh-gallery-viewport" ref={viewport} onScroll={scroll} onPointerMove={point}
      onPointerDown={event => {
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        drag.current = { x: event.clientX, left: viewport.current.scrollLeft, moved: false, active: true };
        viewport.current.setAttribute('data-dragging', 'true');
        viewport.current.setPointerCapture(event.pointerId);
      }} onPointerUp={release} onPointerCancel={release}
      onClick={event => {
        if (drag.current?.moved) { drag.current.moved = false; return; }
        const rect = viewport.current.getBoundingClientRect();
        go(event.clientX - rect.left < rect.width * .25 ? -1 : 1);
      }}>
      {positions.map((position, i) => <figure key={position}><img src={image} alt={`Studio interior, gallery view ${i + 1}`} loading="lazy" draggable="false" style={{ objectPosition: position }}/></figure>)}
      <span className="oh-gallery-cursor" aria-hidden="true" ref={cursor} data-label="Next"/>
    </div>
    <div className="oh-gallery-controls"><span aria-live="polite">{String(index + 1).padStart(2, '0')} / 06</span><div><button aria-label="Previous studio image" disabled={index === 0} onClick={() => go(-1)}>←</button><button aria-label="Next studio image" disabled={index === 5} onClick={() => go(1)}>→</button></div></div>
  </section>;
}

export default function OurHomeSections() {
  const root = useRef(null);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const block = root.current;
    const reveals = [...block.querySelectorAll('[data-oh-reveal]')];
    const scenes = [...block.querySelectorAll('[data-oh-parallax]')];
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = innerHeight;
      const textMeasurements = reveals.map(el => [el, el.getBoundingClientRect()]);
      const sceneMeasurements = scenes.map(el => [el, el.getBoundingClientRect()]);
      textMeasurements.forEach(([el, rect]) => {
        const progress = reduced ? 1 : Math.min(1, Math.max(0, (height * .94 - rect.top) / (height * .4 + Math.min(rect.height, height * .25))));
        el.style.setProperty('--reveal', progress);
      });
      sceneMeasurements.forEach(([el, rect]) => {
        const progress = reduced ? .5 : Math.min(1, Math.max(0, (height - rect.top) / (height + rect.height)));
        el.style.setProperty('--oh-parallax', `${(progress - .5) * 9}%`);
        if (el.classList.contains('oh-intro-scene')) {
          // Crop a viewport-fixed image to this section's moving window.
          // The title reveals the image rather than carrying it down the page.
          el.dataset.ohVisible = String(rect.bottom > 0 && rect.top < height);
          el.style.setProperty('--oh-clip-top', `${Math.max(0, rect.top)}px`);
          el.style.setProperty('--oh-clip-bottom', `${Math.max(0, height - rect.bottom)}px`);
          el.style.setProperty('--oh-shade', String(Math.min(1, Math.max(0, (height * .55 - rect.top) / (height * .55)))));
        }
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule); update();

    let counterFrame = 0;
    const counters = [...block.querySelectorAll('[data-oh-count]')];
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const tick = now => {
        const progress = reduced ? 1 : Math.min(1, (now - start) / 1100);
        const eased = 1 - Math.pow(1 - progress, 3);
        counters.forEach(el => { el.textContent = String(Math.round(Number(el.dataset.ohCount) * eased)).padStart(2, '0'); });
        if (progress < 1) counterFrame = requestAnimationFrame(tick);
      };
      counterFrame = requestAnimationFrame(tick);
    }, { threshold: .4 });
    observer.observe(block.querySelector('.oh-stats'));
    return () => { removeEventListener('scroll', schedule); removeEventListener('resize', schedule); cancelAnimationFrame(frame); cancelAnimationFrame(counterFrame); observer.disconnect(); };
  }, []);

  return <div ref={root} className="our-home-sections" id="our-space" data-home-scheme="dark">
    <section className="oh-opening" aria-labelledby="our-space-title">
      <div className="oh-heading"><p>Our space</p><h2 id="our-space-title">Lorem ipsum.<br/>A place for possibility.</h2></div>
      <div className="oh-intro-scene" data-oh-parallax data-home-scheme="light">
        <div className="oh-intro-media"><img src={image} alt="A warm, light-filled creative studio" loading="lazy"/><div className="oh-intro-shade"/></div>
        <div className="oh-intro-copy"><RevealText>{intro}</RevealText></div>
      </div>
    </section>
    <section className="oh-editorial oh-editorial-wide" aria-label="Studio design and craft"><RevealText as="h2" className="oh-editorial-title">Lorem ipsum dolor, sit amet consectetur.</RevealText><RevealText>{body}</RevealText></section>
    <div className="oh-feature-image" data-oh-parallax><div><img src={image} loading="lazy" alt="Studio lounge with warm materials and natural light"/></div></div>
    <section className="oh-editorial" aria-label="A space made for people"><RevealText as="h2" className="oh-editorial-title">Aenean commodo, ligula eget dolor.</RevealText><RevealText>{`${body} Donec ullamcorper nulla non metus auctor fringilla.`}</RevealText></section>
    <HomeGallery/>
    <section className="oh-quote-section" aria-label="Studio perspective and placeholder figures">
      <div className="oh-quote-column"><span className="oh-quote-mark" aria-hidden="true">“</span><blockquote><RevealText>{intro}</RevealText><div className="oh-attribution"><span>Lorem Ipsum</span><span>Studio perspective · placeholder</span></div></blockquote>
        <div className="oh-stats" aria-label="Illustrative placeholder figures">{[[12,'Lorem ipsum'],[24,'Dolor sit amet'],[8,'Consectetur elit'],[16,'Aenean commodo']].map(([value,label]) => <div key={label}><span className="oh-stat-number" data-oh-count={value} aria-label={String(value)}>00</span><span>{label}</span></div>)}</div>
      </div>
    </section>
  </div>;
}
