import { shouldSaveData } from './lib/data-policy.js';
import ResponsiveImage from './components/ResponsiveImage.jsx';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header, { Arrow } from './components/Header.jsx';
import ContactDrawer from './components/ContactDrawer.jsx';
import './ProjectPage.css';
import CmcCitySection from './components/CmcCitySection.jsx';
import SeminarInvitation from './components/SeminarInvitation.jsx';
import Prefooter from './components/Prefooter.jsx';
import Footer from './components/Footer.jsx';
import AboutCmcSection from './components/AboutCmcSection.jsx';
import CaseSeminarSequence from './components/CaseSeminarSequence.jsx';
import ProcessSection from './components/ProcessSection.jsx';
import Preloader from './components/Preloader.jsx';
import CmcIntroSections from './components/CmcIntroSections.jsx';

gsap.registerPlugin(ScrollTrigger);
const photograph='/media/cmc-project.png';
function ProjectPhoto({className='',caption,children,eager=false}){
 return <figure className={`cmc-case-photo ${className}`} data-case-photo><ResponsiveImage src={photograph} alt="Participants at the CMC Ghana Competition Law and Policy Seminar" width="1366" height="768" loading={eager?'eager':'lazy'} decoding="async"/>{caption&&<figcaption>{caption}</figcaption>}{children}</figure>;
}
function Editorial({title,children}){return <section className="cmc-case-editorial" data-case-reveal><h2>{title}</h2><div>{children}</div></section>}
function CaseGallery(){
 const viewport=useRef(null),cursor=useRef(null),drag=useRef(null),[index,setIndex]=useState(0);
 const move=useCallback((direction)=>{const el=viewport.current;if(!el)return;const step=el.querySelector('figure').getBoundingClientRect().width+16;el.scrollTo({left:el.scrollLeft+step*direction,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});},[]);
 const scroll=()=>{const el=viewport.current,step=el.querySelector('figure').getBoundingClientRect().width+16;const raw=Math.round(el.scrollLeft/step);setIndex(((raw-1)%4+4)%4);};
 const settle=()=>{const el=viewport.current;if(!el)return;const step=el.querySelector('figure').getBoundingClientRect().width+16;if(el.scrollLeft<step*.25)el.scrollTo({left:el.scrollLeft+step*4,behavior:'instant'});else if(el.scrollLeft>step*4.75)el.scrollTo({left:el.scrollLeft-step*4,behavior:'instant'});};
 useEffect(()=>{const el=viewport.current;const initialize=()=>{const photo=el.querySelector('figure');el.scrollTo({left:photo.getBoundingClientRect().width+16,behavior:'instant'});};initialize();const resize=new ResizeObserver(initialize);resize.observe(el);el.addEventListener('scrollend',settle);return()=>{resize.disconnect();el.removeEventListener('scrollend',settle)};},[]);
 const release=e=>{if(!drag.current)return;const el=viewport.current;const moved=drag.current.moved;drag.current=null;el.removeAttribute('data-dragging');if(el.hasPointerCapture(e.pointerId))el.releasePointerCapture(e.pointerId);if(moved){e.preventDefault();}settle();};
 return <section className="cmc-case-gallery" aria-label="Seminar photographs"><div ref={viewport} className="cmc-case-gallery-track" tabIndex="0" aria-label="Seminar gallery; use left and right arrow keys" onScroll={scroll} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}}} onPointerDown={e=>{if(e.pointerType!=='mouse'||e.button!==0)return;drag.current={x:e.clientX,left:viewport.current.scrollLeft,moved:false};viewport.current.setAttribute('data-dragging','true');viewport.current.setPointerCapture(e.pointerId)}} onPointerMove={e=>{const rect=viewport.current.getBoundingClientRect();if(cursor.current){cursor.current.style.transform=`translate(${e.clientX-rect.left-40+viewport.current.scrollLeft}px,${e.clientY-rect.top-40}px)`;}if(drag.current){const delta=e.clientX-drag.current.x;if(Math.abs(delta)>5)drag.current.moved=true;viewport.current.scrollLeft=drag.current.left-delta}}} onPointerUp={e=>{const dragged=drag.current?.moved;release(e);if(e.pointerType==='mouse'&&!dragged)move(1)}} onPointerCancel={release}>{Array.from({length:6},(_,i)=><figure key={i} aria-hidden={i===0||i===5?'true':undefined}><ResponsiveImage src={photograph} alt={`CMC seminar moment ${((i+3)%4)+1}`} width="1366" height="768" loading="lazy" draggable="false"/></figure>)}<span ref={cursor} className="cmc-case-gallery-cursor" aria-hidden="true">Next →</span></div><div className="cmc-case-gallery-controls"><span aria-live="polite">{String(index+1).padStart(2,'0')} / 04</span><div><button onClick={()=>move(-1)} aria-label="Previous photograph">←</button><button onClick={()=>move(1)} aria-label="Next photograph">→</button></div></div></section>;
}
export default function ProjectPage({skipPreloader=false}){
 const [ready,setReady]=useState(()=>skipPreloader||shouldSaveData()),[loading,setLoading]=useState(()=>!skipPreloader&&!shouldSaveData());
 const reveal=useCallback(()=>setReady(true),[]),finish=useCallback(()=>setLoading(false),[]);
 const root=useRef(null),[menu,setMenu]=useState(false),[contact,setContact]=useState(false);
 const openContact=useCallback(()=>setContact(true),[]),closeContact=useCallback(()=>setContact(false),[]);
 useLayoutEffect(()=>{
  
  const mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',()=>{
   const context=gsap.context(()=>{
    gsap.utils.toArray('[data-case-reveal]').forEach(el=>gsap.from(el,{opacity:.15,y:24,duration:.85,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
    gsap.utils.toArray('[data-case-photo]:not(.cmc-case-hero-photo):not(.cmc-intro-photo):not(.case-scroll-scene)').forEach(el=>gsap.from(el,{opacity:.15,duration:.9,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
    gsap.utils.toArray('[data-case-count]').forEach(el=>{const number={value:0};gsap.to(number,{value:Number(el.dataset.caseCount),duration:1.2,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true},onUpdate:()=>{el.textContent=String(Math.round(number.value));}})});
   },root);
   return()=>context.revert();
  });
  return()=>mm.revert();
 },[]);
 useEffect(()=>{let raf=0;const html=document.documentElement,previous=html.style.getPropertyValue('--header-ink');const update=()=>{raf=0;const photos=[...root.current.querySelectorAll('[data-case-photo]')];const photo=photos.some(el=>{const r=el.getBoundingClientRect();return r.top<=42&&r.bottom>42&&r.left<=32&&r.right>32});let light=photo;root.current.querySelectorAll('[data-home-scheme]').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<=42&&r.bottom>42)light=el.dataset.homeScheme==='light'});html.style.setProperty('--header-ink',light?'#f7f1e9':'#22231d');};const schedule=()=>{if(!raf)raf=requestAnimationFrame(update)};addEventListener('scroll',schedule,{passive:true});update();return()=>{removeEventListener('scroll',schedule);cancelAnimationFrame(raf);if(previous)html.style.setProperty('--header-ink',previous);else html.style.removeProperty('--header-ink');};},[]);
 return <>{loading&&<Preloader landing="library" onReveal={reveal} onComplete={finish}/>}<a className="skip-link" href="#main">Skip to content</a><Header ready={ready} loading={loading} onContact={openContact} onMenuChange={setMenu}/><main id="main" ref={root} className="cmc-case" inert={loading||menu||contact}>
  <CmcIntroSections ready={ready} preloaded={!skipPreloader}/><CmcCitySection/><AboutCmcSection/><ProcessSection/>
  <CaseSeminarSequence/>
  <section className="cmc-case-related" data-home-scheme="light" aria-labelledby="case-related-title"><div className="cmc-case-related-heading" data-case-reveal><h2 id="case-related-title">CMC in focus.</h2><a href="/seminar/" className="text-link"><span className="link-label">Explore the seminar</span><Arrow/></a></div><div className="cmc-case-related-grid">{[
   ['CMC · Official recap','The first seminar','https://cmc-ghana.com/',photograph,'Participants at the first CMC seminar'],
   ['Citi Newsroom · 30 March 2026','Competition policy in the spotlight','https://www.citinewsroom.com/2026/03/seminar-on-competition-policy-and-law-held-in-accra/','https://ik.imagekit.io/dr5fryhth/Screenshots/Screenshot%202026-04-10%20110028.png?updatedAt=1775838067301','Citi Newsroom'],
   ['National Communications Authority · 31 March 2026','Continuing the dialogue with the NCA','https://nca.org.gh/2026/03/31/competition-and-market-centre-pays-courtesy-call-on-the-nca/','https://ik.imagekit.io/dr5fryhth/conferencenew/maxresdefault.jpg?updatedAt=1770793618115','National Communications Authority']
  ].map(([label,title,href,image,alt])=><a href={href} key={label} target="_blank" rel="noopener noreferrer" data-case-reveal><div className="cmc-case-related-photo"><ResponsiveImage sizes="(max-width: 767px) 76vw, 33vw" src={image} alt={alt} loading="lazy" width="1366" height="768"/></div><span>{label}</span><h3><span className="cmc-case-action-label">{title}</span><Arrow/></h3></a>)}</div></section>
 <SeminarInvitation/><Prefooter onContact={openContact}/><Footer onContact={openContact}/>
 </main><ContactDrawer open={contact} onClose={closeContact}/></>;
}








