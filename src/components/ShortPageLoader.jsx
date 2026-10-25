import FooterCardLines from './FooterCardLines.jsx';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import '../loader.css';
const letters=text=>text.split('').map((letter,i)=><span className="willem__letter" key={i}>{letter}</span>);
export default function ShortPageLoader({ phase }){
 const root=useRef(null);
 useLayoutEffect(()=>{
  if(phase!=='cover'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const el=root.current;
  const tl=gsap.timeline();
  tl.fromTo(el.querySelectorAll('.willem__letter'),{yPercent:110},{yPercent:0,duration:.5,stagger:.008,ease:'power3.out'},0)
   .fromTo(el.querySelector('.willem-loader__box'),{width:'0em'},{width:'1.35em',duration:.5,ease:'expo.inOut'},.12)
   .fromTo(el.querySelector('.short-loader-mark'),{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:.5,ease:'expo.inOut'},.12)
   .fromTo(el.querySelector('.willem__h1-start'),{x:'0em'},{x:'-.04em',duration:.5,ease:'expo.inOut'},.12)
   .fromTo(el.querySelector('.willem__h1-end'),{x:'0em'},{x:'.04em',duration:.5,ease:'expo.inOut'},.12);
  return()=>tl.kill();
 },[phase]);
 return <div ref={root} className={`page-transition ${phase}`} aria-hidden="true">{phase&&<FooterCardLines variant="preloader"/>}<div className="willem-loader"><div className="willem__stack"><div className="willem__line is--1"><span className="willem__line-inner">{letters('Competition')}</span></div><div className="willem__line is--2 willem__h1"><div className="willem__h1-start">{letters('and')}</div><div className="willem-loader__box"><div className="willem-loader__box-inner"><img className="short-loader-mark" src="/branding/cmc-round-logo.svg" alt=""/></div></div><div className="willem__h1-end">{letters('Markets')}</div></div><div className="willem__line is--3"><span className="willem__line-inner">{letters('Center')}</span></div></div></div></div>;
}
