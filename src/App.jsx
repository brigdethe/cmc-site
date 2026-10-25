import { shouldSaveData } from './lib/data-policy.js';
import SeminarInformation from './components/SeminarInformation.jsx';
import { useCallback, useEffect, useState } from 'react';
import Preloader from './components/Preloader.jsx';
import Header, { Arrow } from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ContactDrawer from './components/ContactDrawer.jsx';
import OurHomeSections from './components/OurHomeSections.jsx';
import Prefooter from './components/Prefooter.jsx';
import Footer from './components/Footer.jsx';
import SeminarInvitation from './components/SeminarInvitation.jsx';

export default function App({ skipPreloader = false }){
  const [ready,setReady]=useState(()=>skipPreloader||shouldSaveData()),[loading,setLoading]=useState(()=>!skipPreloader&&!shouldSaveData()),[contact,setContact]=useState(false),[menu,setMenu]=useState(false);
  const reveal=useCallback(()=>setReady(true),[]),finish=useCallback(()=>setLoading(false),[]),openContact=useCallback(()=>setContact(true),[]),closeContact=useCallback(()=>setContact(false),[]);
  useEffect(()=>{
    
    let frame=0;
    const update=()=>{
      frame=0;
      const root=document.documentElement;
      const section=document.getElementById('process');
      let dark=section?.getBoundingClientRect().top<=64;
      document.querySelectorAll('[data-home-scheme]').forEach(block=>{
        const rect=block.getBoundingClientRect();
        if(rect.top<=64&&rect.bottom>64)dark=block.dataset.homeScheme==='dark';
      });
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
      <SeminarInformation/>
      <OurHomeSections onContact={openContact}/>
      <div className="anchor-markers" aria-hidden="true"><span id="projects"/><span id="vision"/><span id="journal"/></div>
      <SeminarInvitation/>
      <Prefooter onContact={openContact}/>
      <Footer onContact={openContact}/>
    </main>
    <ContactDrawer open={contact} onClose={closeContact}/>
  </>;
}


