import { useEffect, useRef, useState } from 'react';

export function Arrow({ className='' }) { return <span className={`arrow ${className}`} aria-hidden="true">→</span>; }

function Clock() {
  const [time,setTime]=useState(()=>new Date());
  useEffect(()=>{const id=setInterval(()=>setTime(new Date()),1000);return()=>clearInterval(id);},[]);
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'UTC',hour:'2-digit',minute:'2-digit',hour12:false}).format(time).split(':');
  return <time className="clock" dateTime={time.toISOString()} aria-label={`${parts.join(':')} GMT`}><span>{parts[0]}</span><b>:</b><span>{parts[1]}</span><strong>GMT</strong></time>;
}

const links=[['Approach','#approach'],['Services','#services'],['People','#people'],['Projects','#projects'],['Vision & Values','#vision'],['Our Home','#home'],['Journal','#journal']];

export default function Header({ ready, loading, onContact, onMenuChange }) {
  const [open,setOpen]=useState(false);
  const panel=useRef(null),toggle=useRef(null),strip=useRef(null);
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
    <header className={`site-header ${ready?'is-ready':''} ${open?'menu-is-open':''}`} inert={loading}>
      <Clock/>
      <div className={`navigation ${open?'is-open':''}`} ref={panel} onKeyDown={keys} role={open?'dialog':undefined} aria-modal={open?'true':undefined} aria-label={open?'Main navigation':undefined}>
        <div className="navigation-bar"><a className="wordmark" href="#home" onClick={close} aria-label="CMC home">cmc<img src="/branding/cmc-round-logo.svg" alt="" width="25" height="25"/></a><button className="menu-toggle" ref={toggle} onClick={()=>open?close():setOpen(true)} aria-expanded={open} aria-controls="main-navigation" aria-label={open?'Close menu':'Open menu'}><span/><span/></button></div>
        <div className="navigation-content" id="main-navigation" inert={!open} aria-hidden={!open}>
          <nav>{links.map(([label,href])=><a key={label} href={href} onClick={e=>{e.preventDefault();close();document.querySelector(href)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}>{label}<span aria-hidden="true">↗</span></a>)}</nav>
          <div className="latest-heading"><span>● Lately in the studio</span><div><button aria-label="Previous story" onClick={()=>strip.current?.scrollBy({left:-250,behavior:'smooth'})}>←</button><button aria-label="Next story" onClick={()=>strip.current?.scrollBy({left:250,behavior:'smooth'})}>→</button></div></div>
          <div className="latest-strip" ref={strip}>
            <a href="#projects" className="story story-mint" onClick={close}><span><i>New perspectives</i><br/>Lorem ipsum dolor<Arrow/></span><img src="/media/hero.jpg" alt="Sunlit studio lounge"/></a>
            <a href="#journal" className="story story-forest" onClick={close}><span><i>In the making</i><br/>Sit amet consectetur<Arrow/></span><img src="/media/hero.jpg" alt="Warm architectural interior"/></a>
            <button className="story story-ochre" onClick={()=>{close();onContact();}}><span><i>Something in mind?</i><br/>Start a conversation<Arrow/></span><span className="story-number" aria-hidden="true">↗</span></button>
          </div>
        </div>
      </div>
      <button className="contact-trigger" onClick={()=>{if(open)close();onContact();}}><span>Let’s talk</span><Arrow/></button>
    </header>
    <button className={`menu-backdrop ${open?'is-open':''}`} onClick={close} tabIndex={-1} aria-label="Close navigation" aria-hidden={!open}/>
  </>;
}
