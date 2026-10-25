import { useEffect, useId, useRef } from 'react';
import '../lib/cmc-section-border.js';
import './CmcCitySection.css';
export default function CmcCitySection(){
 const root=useRef(null),stage=useRef(null),dock=useRef(null),maskId=useId();
 useEffect(()=>{
  const section=root.current,stageElement=stage.current,dockElement=dock.current;let frame=0,active=true;
  const update=()=>{frame=0;if(!active)return;const docked=dockElement.getBoundingClientRect().top-stageElement.getBoundingClientRect().bottom<.5;stageElement.classList.toggle('is-docked',docked)};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  const reserve=()=>{if(!active)return;section.style.setProperty('--cmc-dock-height',`${dockElement.getBoundingClientRect().height}px`);schedule()};
  const observer=new ResizeObserver(reserve);observer.observe(dock.current);addEventListener('scroll',schedule,{passive:true});addEventListener('resize',reserve);reserve();
  return()=>{active=false;observer.disconnect();removeEventListener('scroll',schedule);removeEventListener('resize',reserve);cancelAnimationFrame(frame)};
 },[]);
 return <div className="cmc-city-section"><cmc-section-border class="cmc-city-top-border"/><section ref={root} className="cmc-city" aria-labelledby="cmc-city-title" data-case-photo>
  <svg width="0" height="0" className="cmc-city-defs" aria-hidden="true"><defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="48"><rect width="80" height="48" fill="white"/><path d="M0 0C36 0 52 48 72 48H80V48H0Z" transform="rotate(180 40 24)" fill="black"/></mask></defs></svg>
  <div ref={stage} className="cmc-city-stage"><div className="cmc-city-card"><cmc-section-border class="cmc-city-card-border" variant="tail"/><h2 id="cmc-city-title">Grounded in Ghana. Open to the world.</h2><p>Ghana’s markets have their own history, institutions and ways of doing business. That context matters.</p><div className="cmc-city-bump" aria-hidden="true"><div><svg viewBox="0 0 80 48" preserveAspectRatio="none"><path d="M0 0C36 0 52 48 72 48H80V48H0Z" transform="rotate(180 40 24)"/></svg></div></div></div></div>
  <div className="cmc-city-dock"><div ref={dock} className="cmc-city-dock-card"><div className="cmc-city-dock-shape" aria-hidden="true"><span/><svg viewBox="0 0 80 48" preserveAspectRatio="none"><rect width="80" height="48" mask={`url(#${maskId})`}/></svg></div><p>We draw on experience from Ghana and other countries, asking what can be learned and what needs to work differently here.</p></div></div><cmc-section-border class="cmc-city-bottom-border"/>
 </section></div>;
}
