import { useCallback, useState } from 'react';
import Preloader from './components/Preloader.jsx';
import Header, { Arrow } from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ContactDrawer from './components/ContactDrawer.jsx';

export default function App(){
  const [ready,setReady]=useState(false),[loading,setLoading]=useState(true),[contact,setContact]=useState(false),[menu,setMenu]=useState(false);
  const reveal=useCallback(()=>setReady(true),[]),finish=useCallback(()=>setLoading(false),[]),openContact=useCallback(()=>setContact(true),[]),closeContact=useCallback(()=>setContact(false),[]);
  return <>
    {loading&&<Preloader onReveal={reveal} onComplete={finish}/>}
    <a className="skip-link" href="#main">Skip to content</a>
    <Header ready={ready} loading={loading} onContact={openContact} onMenuChange={setMenu}/>
    <main id="main" className="page-main" inert={loading||menu||contact}>
      <Hero ready={ready}/>
      <section className="intro-section" id="services"><h2>Lorem ipsum.<br/>Dolor sit amet.</h2><div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.</p><button className="text-link" onClick={openContact}>Let’s make something<Arrow/></button></div></section>
      <div className="anchor-markers" aria-hidden="true"><span id="people"/><span id="projects"/><span id="vision"/><span id="journal"/></div>
      <footer><a className="footer-brand" href="#home">cmc<img src="/branding/cmc-round-logo.svg" alt="CMC" width="28" height="28"/></a><span>An independent studio concept.</span><button className="text-link" onClick={openContact}>Let’s talk<Arrow/></button></footer>
    </main>
    <ContactDrawer open={contact} onClose={closeContact}/>
  </>;
}
