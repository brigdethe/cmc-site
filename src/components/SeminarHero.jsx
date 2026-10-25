import { useEffect } from 'react';
import { Arrow } from './Header.jsx';
import FooterCardLines from './FooterCardLines.jsx';
import './SeminarHero.css';
export default function SeminarHero(){
 useEffect(()=>{import(/* @vite-ignore */ (location.origin+'/seminar-badge/card.js')).catch(()=>{});},[]);
 return <section className="cmc-seminar-hero" id="home" data-home-scheme="dark" aria-labelledby="seminar-title">
  <FooterCardLines variant="hero"/>
  <hanging-card aria-label="Interactive CMC seminar badge"/>
  <div className="cmc-seminar-copy">
   <p className="cmc-seminar-date">25 March 2026 · Accra, Ghana</p>
   <h1 id="seminar-title"><span>Competition</span><span>Law &amp; Policy</span><span>Seminar</span></h1>
   <div className="cmc-seminar-actions"><a className="text-link" href="https://seminar.cmc-ghana.com/#highlights" target="_blank" rel="noopener noreferrer"><span className="link-label">Highlights</span><Arrow/></a></div>
  </div>
  <p className="cmc-seminar-intro">The first <span>Ghana Competition Law &amp; Policy Seminar</span> took place in <span>Accra</span> on 25 March 2026. Revisit the <span>speakers</span>, discussions and moments from the day.</p>
 </section>;
}



