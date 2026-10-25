import { useState } from 'react';
import SeminarTopicStage from './SeminarTopicStage.jsx';
import { Arrow } from './Header.jsx';
import './SeminarSections.css';
const topics=[
 ['Institutional design','Building the foundations.','The first edition examined institutional design and the foundations of Ghana’s emerging competition framework.','speakers'],
 ['Enforcement','From framework to practice.','Enforcement was a central discussion: how competition frameworks can work in practice within Ghana’s institutional and regulatory context.','address'],
 ['Regulation & competition','Connecting perspectives.','The seminar explored the relationship between sector regulation and competition policy, bringing perspectives from law, economics, business and public policy into the same conversation.','conversation']
];
const people=[
 ['peter-alexiadis','Peter Alexiadis','Visiting Professor, King’s College London','Peter Alexiadis specialises in competition law, communications policy and the regulation of network and digital markets. He is a Visiting Professor at King’s College London and a Research Fellow at CERRE.'],
 ['david-bailey','Professor David Bailey KC','Professor of Practice, King’s College London','David Bailey is a Professor of Practice in Competition Law at King’s College London and a practising barrister at Brick Court Chambers. His research and practice focus on competition law and policy, particularly in the EU, UK and Asia.'],
 ['juliette-twumasi-anokye','Dr Juliette Twumasi-Anokye','Competition law & policy · Guest speaker','Dr Juliette Twumasi-Anokye is a lawyer and independent consultant whose work spans competition law, energy regulation and policy development in Ghana, West Africa, the UK and the EU.'],
 ['paul-kofi-datsa','Paul Kofi Datsa','Managing Director, CMC · Closing remarks','Paul Kofi Datsa is the Managing Director of Competition & Markets Center. He contributed the closing remarks at the first Ghana Competition Law & Policy Seminar.']
];
export default function SeminarSections(){
 const [active,setActive]=useState(0);
 return <div className="seminar-story">
  <section className="seminar-topics" aria-labelledby="discussion-title" data-home-scheme="dark">
   <div className="seminar-story-heading"><p className="seminar-kicker">01 / The discussions</p><h2 id="discussion-title">A foundation for<br/>fairer markets.</h2><p>On 25 March 2026, law, business and public policy came together in Accra to examine Ghana’s emerging competition framework.</p></div>
   <SeminarTopicStage topics={topics}/><div className="seminar-topic-list">{topics.map(([label,title,copy,image],i)=><div className={`seminar-topic ${active===i?'is-active':''}`} key={label}>
    <button className="seminar-topic-toggle" aria-expanded={active===i} aria-controls={`seminar-topic-${i}`} onClick={()=>setActive(active===i?null:i)}><span className="seminar-topic-number">0{i+1}</span><span>{label}</span><span className="seminar-topic-symbol" aria-hidden="true">{active===i?'−':'+'}</span></button>
    <div className="seminar-topic-detail" id={`seminar-topic-${i}`} hidden={active!==i}><img src={`/seminar/highlights/${image}.png`} alt={`Discussion of ${label.toLowerCase()} at the CMC seminar`} width="800" height="528" loading="lazy"/><div><h3>{title}</h3><p>{copy}</p></div></div>
   </div>)}</div>
  </section>
  <section className="seminar-recap" id="highlights" aria-labelledby="recap-title" data-home-scheme="light">
   <div className="seminar-recap-heading"><p className="seminar-kicker">02 / The first edition</p><h2 id="recap-title">One room.<br/>Many perspectives.</h2><p>Mövenpick Ambassador Hotel.<br/>Accra, Ghana · 25 March 2026</p></div>
   <figure className="seminar-photo-lead"><img src="/seminar/highlights/speakers.png" alt="Seminar speakers exchanging perspectives on stage" width="800" height="562" loading="lazy"/><figcaption><span>01 / On stage</span><span>Different perspectives. A shared conversation.</span></figcaption></figure>
   <div className="seminar-recap-middle"><p>Expert sessions and the exchanges between them made space for practical discussion about competition law, policy and regulatory practice.</p><dl>{[['102','Attendees'],['23','Law firms'],['05','Speakers']].map(([number,label])=><div key={label}><dt>{label}</dt><dd>{number}</dd></div>)}</dl></div>
   <div className="seminar-photo-pair"><figure><img src="/seminar/highlights/participants.png" alt="Two participants at the first CMC seminar" width="800" height="1079" loading="lazy"/><figcaption>02 / Connections made in Accra.</figcaption></figure><figure><img src="/seminar/highlights/delegates.png" alt="Delegates and speakers gathered for a seminar group photograph" width="800" height="388" loading="lazy"/><figcaption>03 / The people who started the conversation.</figcaption></figure></div>
   <a className="text-link" href="https://seminar.cmc-ghana.com/" target="_blank" rel="noopener noreferrer"><span className="link-label">Read CMC’s 2026 recap</span><Arrow/></a>
  </section>
  <section className="seminar-directory" id="seminar-speakers" aria-labelledby="contributors-title" data-home-scheme="dark">
   <div className="seminar-directory-intro"><p className="seminar-kicker">03 / Contributors</p><h2 id="contributors-title">Experience.<br/>In conversation.</h2><p>Perspectives from competition law, economics and regulatory practice.</p></div>
   <div className="seminar-directory-list">{people.map(([image,name,role,bio])=><article key={image}><img src={image==='paul-kofi-datsa'?'https://ik.imagekit.io/dr5fryhth/creep.jpeg?updatedAt=1771705355007':image==='juliette-twumasi-anokye'?'https://ik.imagekit.io/dr5fryhth/eleanor?updatedAt=1772063000212':`/seminar/speakers/${image}.webp`} alt={name} width="433" height="577" loading="lazy"/><div><h3>{name}</h3><p className="seminar-person-role">{role}</p><details><summary>Read profile <span aria-hidden="true">+</span></summary><p>{bio}</p></details></div></article>)}</div>
  </section>
 </div>;
}

