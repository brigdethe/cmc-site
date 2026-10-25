import { shouldSaveData } from '../lib/data-policy.js';
import ResponsiveImage from './ResponsiveImage.jsx';
import { useEffect, useRef, useState } from 'react';
import './CaseSeminarSequence.css';

function ScrollText({as:Tag='p',children}) {
 const words=children.split(' ');
 return <Tag className="case-scroll-text" data-case-scroll-text style={{'--word-count':words.length}}>{words.map((word,index)=><span key={index} style={{'--word-index':index}}>{word}{index<words.length-1?' ':''}</span>)}</Tag>;
}

export default function CaseSeminarSequence(){
 const root=useRef(null);
 const [near,setNear]=useState(false);
 useEffect(()=>{
  const scene=root.current.querySelector('.case-scroll-scene'),video=scene.querySelector('video');
  const preference=matchMedia('(prefers-reduced-motion: reduce)');let visible=false,nearby=false,disposed=false;
  const prepare=()=>{
   if(disposed||shouldSaveData()||preference.matches||!nearby||video.getAttribute('src'))return;
   video.preload='auto';
   video.src='https://lockin-encrypted-backups.lon1.digitaloceanspaces.com/gha.mp4';
   video.load();
  };
  const sync=()=>{
   if(disposed)return;
   prepare();
   if(!visible||document.hidden||shouldSaveData()||preference.matches){video.pause();return;}
   if(!video.getAttribute('src'))video.src='https://lockin-encrypted-backups.lon1.digitaloceanspaces.com/gha.mp4';
   video.play().catch(()=>{});
  };
  const warmup=new IntersectionObserver(([entry])=>{nearby=entry.isIntersecting;if(nearby)setNear(true);prepare()},{rootMargin:'100% 0px'});warmup.observe(scene);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()});observer.observe(scene);
  document.addEventListener('visibilitychange',sync);preference.addEventListener('change',sync);
  return()=>{disposed=true;warmup.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',sync);preference.removeEventListener('change',sync);video.pause();video.removeAttribute('src');video.load()};
 },[]);

 useEffect(()=>{
  const block=root.current,scene=block.querySelector('.case-scroll-scene'),media=block.querySelector('.case-scroll-media');
  const texts=[...block.querySelectorAll('[data-case-scroll-text]')];
  const preference=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width:767px)');let frame=0;
  const update=()=>{
   frame=0;const height=innerHeight,rect=scene.getBoundingClientRect();
   const measurements=texts.map(el=>[el,el.getBoundingClientRect()]);
   const mediaBottom=media.getBoundingClientRect().bottom;
   const visible=String(rect.bottom>0&&rect.top<height);
   if(scene.dataset.visible!==visible)scene.dataset.visible=visible;
   if(!mobile.matches){
    scene.style.setProperty('--clip-top',`${Math.max(0,rect.top)}px`);
    scene.style.setProperty('--clip-bottom',`${Math.max(0,mediaBottom-rect.bottom)}px`);
   }
   scene.style.setProperty('--shade',String(Math.min(1,Math.max(0,(height*.55-rect.top)/(height*.55)))));
   measurements.forEach(([el,r])=>el.style.setProperty('--reveal',preference.matches?1:Math.min(1,Math.max(0,(height*.94-r.top)/(height*.4+Math.min(r.height,height*.25))))));
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);preference.addEventListener('change',schedule);update();
  return()=>{removeEventListener('scroll',schedule);removeEventListener('resize',schedule);preference.removeEventListener('change',schedule);cancelAnimationFrame(frame)};
 },[]);
 return <div ref={root} className="case-seminar-sequence">
 <section className="case-scroll-scene" data-case-photo aria-label="Serving Ghana’s long-term interests">
  <div className="case-scroll-media">{near&&<ResponsiveImage src="/media/ghana-flag-poster.jpg" alt="Ghana’s flag waving" loading="eager" width="640" height="360"/>}<video muted loop playsInline preload="none"  aria-hidden="true" onPlaying={e=>{e.currentTarget.dataset.ready='true'}} onError={e=>{delete e.currentTarget.dataset.ready}}/><div className="case-scroll-shade"/></div>
  <div className="case-scroll-copy"><ScrollText>Serving Ghana’s long-term interests.</ScrollText><ScrollText>We work to deepen understanding of competition so that public policy and business decisions can better serve the people who depend on Ghana’s markets.</ScrollText><span>Competition &amp; Markets Center<br/><em>Accra, Ghana</em></span></div>
 </section>
 <section className="cmc-case-editorial case-scroll-editorial" data-home-scheme="light" aria-label="From discussion to understanding"><ScrollText as="h2">From discussion to understanding</ScrollText><div><ScrollText>How should competition rules work alongside sector regulation? What does effective enforcement require? These questions need economic evidence, legal scrutiny and knowledge of the institutions involved.</ScrollText><ScrollText>CMC makes room for that exchange through its education and dialogue activities, including the Ghana Competition Law &amp; Policy Seminar.</ScrollText></div></section>
 </div>;
}
