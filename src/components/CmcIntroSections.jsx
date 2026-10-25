import ResponsiveImage from './ResponsiveImage.jsx';
import { useEffect, useRef } from 'react';
import './CmcIntroSections.css';
import { Arrow } from './Header.jsx';
import FooterCardLines from './FooterCardLines.jsx';
export default function CmcIntroSections({ready=true,preloaded=false}){
 const root=useRef(null);
 useEffect(()=>{
  if(!ready)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||typeof IntersectionObserver==='undefined')return;
  const animations=[];
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   observer.unobserve(entry.target);
   if(!preloaded&&entry.target.classList.contains('cmc-intro-photo')){
    animations.push(entry.target.querySelector('img').animate([{transform:'scale(1.045)'},{transform:'scale(1)'}],{duration:1400,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));
   }
   entry.target.querySelectorAll('[data-cmc-intro-enter]').forEach((el,i)=>animations.push(el.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:800,delay:i*70,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'})));
  }),{threshold:.15});
  root.current.querySelectorAll('section').forEach(el=>observer.observe(el));
  return()=>{observer.disconnect();animations.forEach(a=>a.cancel())};
 },[ready,preloaded]);
 return <div ref={root} className="cmc-intro-sections" id="home">
  <section className="cmc-intro-photo" aria-label="About the Competition and Markets Center" data-case-photo>
   <ResponsiveImage src="/media/cmc-library.jpg" alt="Classical busts in a library" width="2000" height="1333" loading="eager" fetchPriority="high"/>
   <FooterCardLines variant="project-hero"/>
   <p className="cmc-intro-kicker" data-cmc-intro-enter>Competition &amp; Markets Center Ltd<svg className="cmc-intro-curve" viewBox="0 0 80 48" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0C36 0 52 48 72 48H80V48H0Z"/></svg></p>
  </section>
  <section className="cmc-intro-editorial" aria-labelledby="cmc-intro-title">
   <div className="cmc-intro-title-wrap"><h1 id="cmc-intro-title" data-cmc-intro-enter>Shaping fairer, more competitive markets for Ghana.</h1><div data-cmc-intro-enter><a className="text-link cmc-intro-cta" href="/#services"><span className="link-label">Explore our approach</span><Arrow/></a></div></div>
   <div className="cmc-intro-copy"><p data-cmc-intro-enter>Competition &amp; Markets Center is an Accra-based firm working across competition economics, law and policy. We bring these disciplines together to help people understand how markets work and the rules that shape them.</p></div>
  </section>
 </div>;
}



