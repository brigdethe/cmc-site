import { useCallback, useEffect, useState } from 'react';
import Preloader from './components/Preloader.jsx';
import Header, { Arrow } from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ContactDrawer from './components/ContactDrawer.jsx';

export default function App(){
  const [ready,setReady]=useState(false),[contact,setContact]=useState(false),[menu,setMenu]=useState(false);
  const finish=useCallback(()=>setReady(true),[]),openContact=useCallback(()=>setContact(true),[]),closeContact=useCallback(()=>setContact(false),[]);
  useEffect(()=>{
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0;
    const update=()=>{frame=0;const progress=Math.min(window.scrollY/window.innerHeight,1);const root=document.documentElement;root.style.setProperty('--hero-scroll',reduced.matches?'0':String(progress));const dark=window.scrollY>=window.innerHeight*1.55-60;root.style.setProperty('--header-ink',dark?'#22231d':'#f7f1e9');root.style.setProperty('--header-arrow-ink',dark?'#f7f1e9':'#22231d');};
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);update();
    return()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);cancelAnimationFrame(frame);};
  },[]);
  return <>
    {!ready&&<Preloader onComplete={finish}/>}
    <a className="skip-link" href="#main">Skip to content</a>
    <Header ready={ready} onContact={openContact} onMenuChange={setMenu}/>
    <main id="main" className="page-main" inert={!ready||menu||contact}>
      <Hero ready={ready}/>
      <section className="intro-section" id="services"><h2>Lorem ipsum.<br/>Dolor sit amet.</h2><div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.</p><button className="text-link" onClick={openContact}>Let’s make something<Arrow/></button></div></section>
      <div className="anchor-markers" aria-hidden="true"><span id="people"/><span id="projects"/><span id="vision"/><span id="journal"/></div>
      <footer><a className="footer-brand" href="#home">cmc<span>STUDIO</span></a><span>An independent studio concept.</span><button className="text-link" onClick={openContact}>Let’s talk<Arrow/></button></footer>
    </main>
    <ContactDrawer open={contact} onClose={closeContact}/>
  </>;
}
