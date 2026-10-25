import { useEffect, useRef, useState } from 'react';
import ResponsiveImage from './ResponsiveImage.jsx';
import { Arrow } from './Header.jsx';
import './RegisterInterest.css';

export default function RegisterInterest(){
 const [role,setRole]=useState('Attendee'),[preview,setPreview]=useState(null);
 const result=useRef(null);
 useEffect(()=>{document.title='Register interest — CMC Seminar 2027';},[]);
 useEffect(()=>{if(preview)result.current?.focus();},[preview]);
 const submit=e=>{
  e.preventDefault();
  const fields=new FormData(e.currentTarget);
  setPreview({name:fields.get('name'),role});
 };
 return <section className="register-interest" id="interest" aria-labelledby="interest-title">
  <ResponsiveImage className="register-interest-photo" src="/seminar/highlights/delegates.png" alt="Delegates gathered at the first Ghana Competition Law and Policy Seminar" sizes="100vw"/>
  <div className="register-interest-card">
  <div className="register-interest-intro"><p>CMC Seminar · 2027</p><h2 id="interest-title">Be part of the next conversation.</h2><p>Interested in attending or supporting the next Ghana Competition Law &amp; Policy Seminar? Tell us how you would like to take part.</p><p>Dates, venue and sponsorship details will be announced. Expressing interest does not reserve a place.</p></div>
  <form onSubmit={submit} onChange={()=>setPreview(null)} className="register-interest-form">
   <p className="register-preview-notice" id="interest-preview">Preview form — nothing is sent or saved. Registration will open once a submission service is connected.</p>
   <fieldset><legend>I am interested in</legend><div className="register-role-options">{['Attendee','Sponsor'].map(value=><label key={value}><input type="radio" name="interest" value={value} checked={role===value} onChange={()=>setRole(value)}/>{value}</label>)}</div></fieldset>
   <label htmlFor="interest-name">Full name <span>(required)</span></label><input id="interest-name" name="name" autoComplete="name" required maxLength={120}/>
   <label htmlFor="interest-email">Email address <span>(required)</span></label><input id="interest-email" name="email" type="email" autoComplete="email" required maxLength={254}/>
   <label htmlFor="interest-organisation">Organisation <span>(optional)</span></label><input id="interest-organisation" name="organisation" autoComplete="organization" maxLength={160}/>
   <label htmlFor="interest-message">{role==='Sponsor'?'How would you like to support the seminar?':'Anything you would like us to know?'} <span>(optional)</span></label><textarea id="interest-message" name="message" rows={4} maxLength={2000}/>
   <button type="submit" className="text-link" aria-describedby="interest-preview"><span className="link-label">Preview interest</span><Arrow/></button>
   {preview&&<div ref={result} className="register-preview-result" role="status" tabIndex={-1}><strong>Preview complete, {preview.name}.</strong><p>You selected {preview.role.toLowerCase()} interest for the 2027 seminar. No details have been sent or saved.</p></div>}
  </form>
  </div>
 </section>;
}
