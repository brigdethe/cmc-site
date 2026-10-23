import { useCallback, useEffect, useState } from 'react';
import Preloader from './components/Preloader.jsx';
import Header, { Arrow } from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProcessSection from './components/ProcessSection.jsx';
import ContactDrawer from './components/ContactDrawer.jsx';
import OurHomeSections from './components/OurHomeSections.jsx';
import Prefooter from './components/Prefooter.jsx';
import Footer from './components/Footer.jsx';
import SeminarInvitation from './components/SeminarInvitation.jsx';

export default function App(){
  const [ready,setReady]=useState(false),[loading,setLoading]=useState(true),[contact,setContact]=useState(false),[menu,setMenu]=useState(false);
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
      <section className="intro-section" id="services" data-home-scheme="dark"><h2>About Competition<br/>&amp; Markets Center.</h2><div><p>Competition &amp; Markets Center is an Accra-based firm focused on competition economics, law and policy. We bring together regulators, policymakers, legal practitioners and businesses to examine how markets work and how competition frameworks can serve Ghana’s needs.</p><p>Through research, education and stakeholder dialogue, we explore the institutions, rules and enforcement approaches that support fair competition. Our work connects economic thinking with legal and policy questions, creating space for informed exchange as Ghana develops its competition framework.</p><a className="text-link" href="https://seminar.cmc-ghana.com/" target="_blank" rel="noopener noreferrer"><span className="link-label">Explore the seminar</span><Arrow/></a></div></section>
      <ProcessSection/>
      <OurHomeSections onContact={openContact}/>
      <div className="anchor-markers" aria-hidden="true"><span id="people"/><span id="projects"/><span id="vision"/><span id="journal"/></div>
      <SeminarInvitation onContact={openContact}/>
      <Prefooter onContact={openContact}/>
      <Footer onContact={openContact}/>
    </main>
    <ContactDrawer open={contact} onClose={closeContact}/>
  </>;
}
