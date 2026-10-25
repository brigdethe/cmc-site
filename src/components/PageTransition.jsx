import { updateMetadata } from '../lib/site-metadata.js';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
const loadApp=()=>import('../App.jsx');
const App=lazy(loadApp);
const loadBadgePage=()=>import('../SeminarPage.jsx');
const SeminarPage=lazy(loadBadgePage);
const loadProjects=()=>import('../ProjectsComingSoon.jsx');
const ProjectsComingSoon=lazy(loadProjects);
import ProjectPage from '../ProjectPage.jsx';
import './PageTransition.css';
import ShortPageLoader from './ShortPageLoader.jsx';
const route=()=>location.pathname.replace(/\/$/,'')||'/';
export default function PageTransition(){
 const [page,setPage]=useState(route),[phase,setPhase]=useState(''),[navigated,setNavigated]=useState(false);
 useEffect(()=>{updateMetadata(page);},[page]);
 const busy=useRef(false),activePath=useRef(route());
 useEffect(()=>{
  let timer,frame,disposed=false;
  const change=(url,push)=>{
   if(busy.current)return;
   busy.current=true;
   const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
   const pending=url.pathname.startsWith('/seminar')?loadApp():url.pathname.startsWith('/register')?loadBadgePage():url.pathname.startsWith('/projects')?loadProjects():Promise.resolve();
   // Start fetching under the curtain; keep it covered until the route is ready.
   const ready=pending.then(()=>true,()=>false);
   setPhase('cover');
   timer=setTimeout(async()=>{
    const loaded=await ready;
    if(disposed)return;
    if(!loaded){busy.current=false;setPhase('');return;}
    if(push)history.pushState(null,'',url.pathname+url.search+url.hash);
    activePath.current=route();setNavigated(true);setPage(route());
    document.body.style.overflow='';document.documentElement.classList.remove('is-preloading');
    frame=requestAnimationFrame(()=>{
     const target=url.hash?document.getElementById(decodeURIComponent(url.hash.slice(1))):null;
     if(target)target.scrollIntoView({behavior:'instant'});else scrollTo({top:0,behavior:'instant'});
     setPhase('reveal');
     timer=setTimeout(()=>{setPhase('');busy.current=false;},reduced?0:250);
    });
   },reduced?0:750);
  };
  const click=e=>{
   if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
   const a=e.target.closest?.('a[href]');
   if(!a||a.download||a.target&&a.target!=='_self')return;
   const url=new URL(a.href,location.href),path=url.pathname.replace(/\/$/,'')||'/';
   if(url.origin!==location.origin||!['/','/seminar','/projects/british-lands-hq','/projects','/register'].includes(path)||path===route())return;
   e.preventDefault();change(url,true);
  };
  const pop=()=>{if(route()!==activePath.current)change(new URL(location.href),false)};
  document.addEventListener('click',click);addEventListener('popstate',pop);
  return()=>{disposed=true;document.removeEventListener('click',click);removeEventListener('popstate',pop);clearTimeout(timer);cancelAnimationFrame(frame);};
 },[]);
 return <><Suspense fallback={<div aria-label="Loading page" style={{minHeight:'100svh',background:'var(--cream)'}}/>}>{page==='/seminar'?<App key={page} skipPreloader={navigated}/>:page==='/register'?<SeminarPage key={page}/>:page.startsWith('/projects')?<ProjectsComingSoon key={page}/>:<ProjectPage key={page} skipPreloader={navigated}/>}</Suspense><ShortPageLoader phase={phase}/></>;
}



