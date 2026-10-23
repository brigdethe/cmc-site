import { useCallback, useEffect, useState } from 'react';
import Preloader from './components/Preloader.jsx';
import Header, { Arrow } from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProcessSection from './components/ProcessSection.jsx';
import ContactDrawer from './components/ContactDrawer.jsx';

export default function App(){
  const [ready,setReady]=useState(false),[loading,setLoading]=useState(true),[contact,setContact]=useState(false),[menu,setMenu]=useState(false);
  const reveal=useCallback(()=>setReady(true),[]),finish=useCallback(()=>setLoading(false),[]),openContact=useCallback(()=>setContact(true),[]),closeContact=useCallback(()=>setContact(false),[]);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      frame=0;
      const root=document.documentElement;
      const section=document.getElementById('process');
      const dark=section?.getBoundingClientRect().top<=64;
      root.style.setProperty('--header-ink',dark?'#22231d':'#f7f1e9');
      root.style.setProperty('--header-arrow-ink',dark?'#f7f1e9':'#22231d');
      root.style.setProperty('--hero-scroll',String(Math.min(scrollY/innerHeight,1)));
    };
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll);update();
    return()=>{removeEventListener('scroll',scroll);removeEventListener('resize',scroll);cancelAnimationFrame(frame);};
  },[]);
  return <>
    {loading&&<Preloader onReveal={reveal} onComplete={finish}/>}
    <a className="skip-link" href="#main">Skip to content</a>
    <Header ready={ready} loading={loading} onContact={openContact} onMenuChange={setMenu}/>
    <main id="main" className="page-main" inert={loading||menu||contact}>
      <Hero ready={ready}/>
      <ProcessSection/>
      <section className="intro-section" id="services"><h2>Lorem ipsum.<br/>Dolor sit amet.</h2><div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.</p><button className="text-link" onClick={openContact}>Let’s make something<Arrow/></button></div></section>
      <div className="anchor-markers" aria-hidden="true"><span id="people"/><span id="projects"/><span id="vision"/><span id="journal"/></div>
      <footer><a className="footer-brand" href="#home">cmc<img src="/branding/cmc-round-logo.svg" alt="CMC" width="28" height="28"/></a><span>An independent studio concept.</span><button className="text-link" onClick={openContact}>Let’s talk<Arrow/></button></footer>
    </main>
    <ContactDrawer open={contact} onClose={closeContact}/>
  </>;
}
