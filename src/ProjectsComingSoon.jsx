import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import ContactDrawer from './components/ContactDrawer.jsx';
import CaseStudyHero from './components/CaseStudyHero.jsx';
import SeminarInvitation from './components/SeminarInvitation.jsx';
import Prefooter from './components/Prefooter.jsx';
import Footer from './components/Footer.jsx';

export default function ProjectsComingSoon(){
 const [contact,setContact]=useState(false),[menu,setMenu]=useState(false);
 const openContact=useCallback(()=>setContact(true),[]),closeContact=useCallback(()=>setContact(false),[]);
 useEffect(()=>{document.title='Projects — Competition & Markets Center';},[]);
 return <><a className="skip-link" href="#main">Skip to content</a><Header ready loading={false} onContact={openContact} onMenuChange={setMenu}/><main id="main" className="page-main seminar-page" inert={menu||contact}><CaseStudyHero title="Projects" subtitle="Coming soon."/><SeminarInvitation/><Prefooter onContact={openContact}/><Footer onContact={openContact}/></main><ContactDrawer open={contact} onClose={closeContact}/></>;
}
