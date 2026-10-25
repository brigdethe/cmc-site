import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import FooterCardLines from './FooterCardLines.jsx';
import './CaseStudyHero.css';

// Retained for reuse; intentionally not mounted on Projects.
export default function CaseStudyHero({ title='The CMC Seminar', subtitle='Laying a sound foundation. For a new era.', image='/media/cmc-project.png', imageAlt='Participants at the CMC Ghana Competition Law and Policy Seminar', id='home' }){
 const root=useRef(null);
 useLayoutEffect(()=>{
  const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   const context=gsap.context(()=>{
    gsap.from('.case-study-hero-line',{yPercent:110,opacity:0,duration:1.1,ease:'power3.out',stagger:.1});
    gsap.from('.case-study-hero-photo',{opacity:0,y:32,duration:1.1,delay:.75,ease:'power2.out'});
   },root);
   return()=>context.revert();
  });
  return()=>media.revert();
 },[]);
 return <section ref={root} className="case-study-hero" id={id}><div className="case-study-hero-stage"><FooterCardLines variant="project-hero"/><div className="case-study-hero-heading"><h1><span className="case-study-hero-line">{title}</span></h1><h2><span className="case-study-hero-line">{subtitle}</span></h2></div></div><figure className="case-study-hero-photo" data-case-photo><img src={image} alt={imageAlt} width="1366" height="768" loading="eager" decoding="async"/></figure></section>;
}
