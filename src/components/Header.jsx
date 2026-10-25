import ResponsiveImage from './ResponsiveImage.jsx';
import { useEffect, useRef, useState } from 'react';
import './MenuTicket.css';
import './MenuCards.css';
import OriginalTicket from './OriginalTicket.jsx';

export function Arrow({ className='' }) { return <span className={`arrow ${className}`} aria-hidden="true">→</span>; }

function Clock() {
  const [time,setTime]=useState(()=>new Date());
  useEffect(()=>{const id=setInterval(()=>setTime(new Date()),1000);return()=>clearInterval(id);},[]);
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Accra',hour:'2-digit',minute:'2-digit',hour12:false}).format(time).split(':');
  return <time className="clock" dateTime={time.toISOString()} title="Accra, Ghana" aria-label={`${parts.join(':')} in Accra, Ghana`}><span>{parts[0]}</span><b>:</b><span>{parts[1]}</span><strong>ACCRA</strong></time>;
}

const links=[['Home','/'],['Seminar','/seminar/'],['Projects','/projects/british-lands-hq/'],['Register','/register/']];

export default function Header({ ready, loading, onContact, onMenuChange }) {
  const [open,setOpen]=useState(false);
  const [scrollHidden,setScrollHidden]=useState(false);
  const header=useRef(null);
  const panel=useRef(null),toggle=useRef(null),strip=useRef(null);
  useEffect(()=>{
    let previous=Math.max(0,window.scrollY),travel=0,direction=0,frame=0;
    setScrollHidden(false);
    if(!ready||loading||open)return;
    const update=()=>{
      frame=0;
      const current=Math.max(0,window.scrollY),delta=current-previous;
      previous=current;
      if(current<80||(header.current?.contains(document.activeElement)&&document.activeElement.matches(':focus-visible'))){
        travel=0;direction=0;setScrollHidden(false);return;
      }
      if(!delta)return;
      const nextDirection=Math.sign(delta);
      travel=nextDirection===direction?travel+Math.abs(delta):Math.abs(delta);
      direction=nextDirection;
      if(travel>=12){setScrollHidden(direction>0);travel=0;}
    };
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',scroll,{passive:true});
    return()=>{window.removeEventListener('scroll',scroll);cancelAnimationFrame(frame);};
  },[ready,loading,open]);
  useEffect(()=>{
    onMenuChange(open);
    if(!open)return;
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const id=requestAnimationFrame(()=>panel.current?.querySelector('a')?.focus());
    return()=>{cancelAnimationFrame(id);document.body.style.overflow=previous;};
  },[open,onMenuChange]);
  const close=()=>{setOpen(false);toggle.current?.focus();};
  const keys=e=>{
    if(e.key==='Escape'){e.preventDefault();close();}
    if(e.key==='Tab'&&open){
      const nodes=[...panel.current.querySelectorAll('a,button')].filter(n=>!n.disabled);
      const first=nodes[0],last=nodes.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  };
  return <>
    <header ref={header} className={`site-header ${ready?'is-ready':''} ${open?'menu-is-open':''} ${scrollHidden&&!open?'is-scroll-hidden':''}`} inert={loading} onFocusCapture={()=>setScrollHidden(false)}>
      <Clock/>
      <div className={`navigation-shell ${open?'is-open':''}`} ref={panel} onKeyDown={keys} role={open?'dialog':undefined} aria-modal={open?'true':undefined} aria-label={open?'Main navigation':undefined}>
      <div className={`navigation ${open?'is-open':''}`}>
        <div className="navigation-bar"><a className="wordmark" href={location.pathname !== '/'?'/':'#home'} onClick={close} aria-label="CMC home">cmc<ResponsiveImage src="/branding/cmc-round-logo.svg" alt="" width="25" height="25"/></a><button className="menu-toggle" ref={toggle} onClick={()=>open?close():setOpen(true)} aria-expanded={open} aria-controls="main-navigation" aria-label={open?'Close menu':'Open menu'}><span/><span/></button></div>
        <div className="navigation-content" id="main-navigation" inert={!open} aria-hidden={!open}>
          <nav>{links.map(([label,href])=><a key={label} href={href.startsWith('#')&&location.pathname.replace(/\/$/,'') !== '/seminar'?'/seminar/'+href:href} onClick={e=>{if((href==='/#process'||href==='/#services')&&location.pathname==='/'){close();return;}if(!href.startsWith('#')||location.pathname.replace(/\/$/,'') !== '/seminar')return;e.preventDefault();close();document.querySelector(href)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}>{label}<span aria-hidden="true">↗</span></a>)}</nav>
          <div className="latest-heading"><span>● Explore CMC</span><div><button aria-label="Previous story" onClick={()=>strip.current?.scrollBy({left:-250,behavior:'smooth'})}>←</button><button aria-label="Next story" onClick={()=>strip.current?.scrollBy({left:250,behavior:'smooth'})}>→</button></div></div>
          <div className="latest-strip" ref={strip}>
            <a href="https://seminar.cmc-ghana.com/" target="_blank" rel="noopener noreferrer" className="story story-mint" onClick={close}><span>Explore<br/>the seminar<Arrow/></span>{open&&<ResponsiveImage sizes="235px" src="https://ik.imagekit.io/dr5fryhth/conference/Accra_xxxxxxxxx_i116585_13by5.webp?updatedAt=1771048872912" alt="Accra, Ghana"/>}</a>
            <a href={location.pathname !== '/'?'/#process':'#process'} className="story story-forest" onClick={e=>{if(location.pathname !== '/')return;e.preventDefault();close();document.getElementById('process')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}><span>Meet the people<br/>behind the discussion<Arrow/></span>{open&&<ResponsiveImage sizes="235px" src="https://ik.imagekit.io/dr5fryhth/creep.jpeg?updatedAt=1771705355007" alt="Paul Kofi Datsa"/>}</a>
            <div className="story story-ochre" aria-label="Second edition coming soon"><span><i>Next seminar</i><br/>Register your interest</span></div>
          </div>
        </div>
      </div>
      <div className="menu-ticket-slot" inert={!open} aria-hidden={!open}>
        <a className="menu-ticket-link" href="/register/" onClick={close} aria-label="Register interest in the next CMC seminar"><OriginalTicket/></a>
      </div>
      </div>
      <button className="contact-trigger" onClick={()=>{if(open)close();onContact();}}><span>Let’s talk</span><Arrow/></button>
    </header>
    <button className={`menu-backdrop ${open?'is-open':''}`} onClick={close} tabIndex={-1} aria-label="Close navigation" aria-hidden={!open}/>
  </>;
}





