import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function SeminarTopicStage({topics}){
 const root=useRef(null),rows=useRef(null),[all,setAll]=useState(false),changed=useRef(false);
 useLayoutEffect(()=>{
  const element=root.current,list=rows.current;
  const media=gsap.matchMedia();
  media.add('(min-width:1024px) and (prefers-reduced-motion:no-preference)',()=>{
   if(all)return;
   const items=[...list.children];let rowHeight=0,imageHeight=0,travel=0;
   const measure=()=>{rowHeight=items[0].offsetHeight;imageHeight=items[0].querySelector('.seminar-scroll-photo').offsetHeight;list.style.height=`${rowHeight}px`;travel=Math.max(rowHeight,innerHeight-(list.getBoundingClientRect().top-element.getBoundingClientRect().top));items.forEach(row=>row.style.setProperty('--cover-height',`${rowHeight+24}px`));};
   const render=progress=>{items.forEach((row,index)=>{const y=Math.max(0,Math.min(1,index-progress))*travel;row.style.setProperty('--slide-y',`${y}px`);const visible=Math.max(0,Math.min(1,(rowHeight-y)/imageHeight));row.querySelector('img').style.clipPath=`inset(${(1-visible)*100}% 0 0 0)`;row.querySelector('.seminar-row-rule').style.opacity=index<items.length-1&&progress>=index+1?'0':'1';row.inert=index>Math.ceil(progress);});};
   element.classList.add('is-pinned');measure();render(0);
   const trigger=ScrollTrigger.create({trigger:element,start:'top top',end:()=>`+=${(items.length-1)*travel}`,pin:true,scrub:true,invalidateOnRefresh:true,onRefresh:self=>{measure();render(self.progress*(items.length-1))},onUpdate:self=>render(self.progress*(items.length-1))});
   return()=>{trigger.kill();element.classList.remove('is-pinned');list.style.height='';items.forEach(row=>{row.style.removeProperty('--slide-y');row.style.removeProperty('--cover-height');row.querySelector('img').style.clipPath='';row.querySelector('.seminar-row-rule').style.opacity='';row.inert=false;});};
  });
  if(changed.current&&!matchMedia('(prefers-reduced-motion: reduce)').matches){if(all)gsap.fromTo(list.children,{opacity:0,y:24},{opacity:1,y:0,duration:.5,ease:'power2.out',stagger:.06,clearProps:'opacity,transform'});else gsap.fromTo(list,{opacity:0},{opacity:1,duration:.45,ease:'power2.out',clearProps:'opacity'});}
  changed.current=true;
  return()=>media.revert();
 },[all,topics]);
 return <div ref={root} className={`seminar-topic-stage ${all?'show-all':''}`}><div className="seminar-topic-heading"><h2>A foundation for<br/>fairer markets.</h2><button className="text-link" aria-pressed={all} onClick={()=>setAll(v=>!v)}><span className="link-label">{all?'Detailed':'View all'}</span><span className="seminar-mode-icon" aria-hidden="true">+</span></button></div><div ref={rows} className="seminar-scroll-rows">{topics.map(([label,title,copy,image],i)=><article className="seminar-scroll-row" style={{zIndex:i+1}} key={label}><span className="seminar-row-rule"/><div className="seminar-scroll-label"><span className="seminar-topic-number">0{i+1}</span>{label}</div><div className="seminar-scroll-photo"><img src={`/seminar/highlights/${image}.png`} alt={label} loading="lazy"/></div><div className="seminar-scroll-copy"><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>
}
