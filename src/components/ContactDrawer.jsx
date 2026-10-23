import { useEffect, useRef, useState } from 'react';
import { Arrow } from './Header.jsx';

export default function ContactDrawer({ open, onClose }) {
  const dialog=useRef(null),[sent,setSent]=useState(false);
  useEffect(()=>{
    const el=dialog.current;
    if(!open){if(el.open)el.close();return;}
    setSent(false);el.showModal();
    const previous=document.body.style.overflow;document.body.style.overflow='hidden';
    return()=>{document.body.style.overflow=previous;};
  },[open]);
  const close=()=>{
    const el=dialog.current;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.close();onClose();return;}
    el.animate([{transform:'translateX(0)'},{transform:'translateX(100%)'}],{duration:350,easing:'cubic-bezier(.65,0,.35,1)'}).finished.then(()=>{el.close();onClose();}).catch(()=>onClose());
  };
  return <dialog ref={dialog} className="contact-drawer" onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===dialog.current){const r=dialog.current.getBoundingClientRect();if(e.clientX<r.left)close();}}} aria-labelledby="contact-title">
    <div className="drawer-bar"><span>Contact us</span><button className="close-button" onClick={close} aria-label="Close contact form">×</button></div>
    <div className="drawer-body"><h2 id="contact-title">Let’s talk...</h2><p className="contact-intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tell us what you have in mind.</p>
      <form onSubmit={e=>{e.preventDefault();setSent(true);}}>
        {[['Name','text','name'],['Email address','email','email'],['Subject','text','subject']].map(([label,type,name],i)=><label className="field" key={name}><span><small>0{i+1}</small>{label}*</span><input name={name} type={type} required autoComplete={name==='subject'?'off':name}/></label>)}
        <label className="field"><span><small>04</small>Where to*</span><select name="enquiry"><option>General enquiry</option><option>A new project</option><option>Collaborate with us</option></select></label>
        <label className="field"><span><small>05</small>Message*</span><textarea name="message" required rows="3"/></label>
        <p className="demo-note">Demo form — your details stay in this browser. Nothing is sent or saved.</p>
        <button className="send-button" type="submit">Preview message<Arrow/></button>
        {sent&&<p className="form-result" role="status">Preview complete. This demo has no sending service; no message was sent.</p>}
      </form>
    </div>
  </dialog>;
}
