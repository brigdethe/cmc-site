import ResponsiveImage from './ResponsiveImage.jsx';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from './Header.jsx';
import './StickyStoryShowcase.css';
import FooterCardLines from './FooterCardLines.jsx';

const stories=[
 {label:'9:00–10:30 AM',meta:'Welcome & Registration',color:'#444828',image:'/seminar/highlights/arrival.png',alt:'Guests arriving at the first CMC seminar',title:'Guests gathered for registration, introductions and opening remarks.',quote:'Welcome drinks and registration were followed by introductions, the chairman’s remarks and speeches from public officials.',name:'Opening programme',role:'First seminar · Programme notes'},
 {label:'10:30–11:55 AM',meta:'Peter Alexiadis · Session II',color:'#f7f1e9',image:'/seminar/highlights/speakers.png',alt:'Speakers at the first CMC seminar',title:'Peter Alexiadis led a session followed by questions and conversation.',quote:'The programme reserved time for audience questions after Peter Alexiadis’s presentation, followed by a coffee break.',name:'Questions and exchange',role:'First seminar · Programme notes'},
 {label:'12:00–1:30 PM',meta:'David Bailey KC · Session III',color:'#cc9632',image:'https://ik.imagekit.io/dr5fryhth/Screenshots/Screenshot%202026-04-10%20110141.png?updatedAt=1775838070933',alt:'A speaker addressing the CMC seminar',title:'David Bailey KC led the midday session and an open Q&A.',quote:'The midday programme paired David Bailey KC’s presentation with a thirty-minute question-and-answer session.',name:'Time for discussion',role:'First seminar · Programme notes'},
 {label:'2:00–3:00 PM',meta:'Panel & Closing · Session IV',color:'#1b2d56',image:'/seminar/highlights/address.png',alt:'A speaker addressing the CMC seminar',title:'A panel on regulation and antitrust closed with CMC’s look ahead.',quote:'The final session included closing remarks, CMC’s plans for the future and a vote of thanks.',name:'Closing programme',role:'First seminar · Programme notes'}
];

export default function StickyStoryShowcase({onContact}){
 const root=useRef(null),last=useRef(0);
 const [active,setActive]=useState(0),[reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{
  const section=root.current,preference=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
  const update=()=>{
   frame=0;setReduced(preference.matches);const rect=section.querySelector('.sticky-stories-track').getBoundingClientRect();
   const progress=Math.max(0,Math.min(stories.length-1,-rect.top/innerHeight));
   section.querySelectorAll('.sticky-stories-image').forEach((image,i)=>{
    const wipe=i===0?0:(1-Math.max(0,Math.min(1,progress-(i-1))))*100;
    image.style.setProperty('--story-wipe',`${wipe}%`);
    image.dataset.revealed=String(progress>=i-.75);
   });
   const next=Math.min(stories.length-1,Math.floor(progress+.75));
   if(next!==last.current){last.current=next;setActive(next)}
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);preference.addEventListener('change',schedule);update();
  return()=>{removeEventListener('scroll',schedule);removeEventListener('resize',schedule);preference.removeEventListener('change',schedule);cancelAnimationFrame(frame)};
 },[]);
 return <section ref={root} className="sticky-stories" aria-label="Highlights from the first CMC seminar" data-home-scheme="light" data-active={active}>
  <div className="sticky-stories-track"><div className="sticky-stories-stage">
   <FooterCardLines variant="project-hero"/>
   <div className="sticky-stories-composition"><div className="sticky-stories-images" aria-hidden="true">{stories.map((story,i)=><div className={`sticky-stories-image sticky-stories-image--${i}`} style={{zIndex:i}} key={story.label}><ResponsiveImage src={story.image} alt="" loading="lazy"/></div>)}</div>
   <div className="sticky-stories-card-position"><div className="sticky-stories-card" style={{backgroundColor:stories[active].color}}>{stories.map((story,i)=><article className={`sticky-stories-panel ${active===i?'is-active':''}`} style={{'--story-color':story.color,color:i===1||i===2?'#22231d':'#f7f1e9'}} key={story.label} aria-hidden={!reduced&&active!==i} inert={!reduced&&active!==i}>
    <ResponsiveImage className="sticky-stories-static-image" src={story.image} alt={story.alt} loading="lazy"/>
    <div className="sticky-stories-panel-top"><div className="sticky-stories-meta"><span>{story.label}</span><span>{story.meta}</span></div><h2>{story.title}</h2></div>
    <div className="sticky-stories-panel-bottom"><blockquote><span className="sticky-stories-quote" aria-hidden="true"></span><p>{story.quote}</p><div className="sticky-stories-attribution">{story.name}<span>{story.role}</span></div></blockquote><button className="text-link" onClick={onContact}><span className="link-label">Register interest in the next seminar</span><Arrow/></button></div>
   </article>)}</div></div>
  </div></div></div>
 </section>;
}
