import { Arrow } from './Header.jsx';
import './SeminarInvitation.css';

export default function SeminarInvitation({ onContact }) {
  return <section className="seminar-invitation" aria-labelledby="seminar-invitation-title" data-home-scheme="light">
    <img className="seminar-invitation-image" src="https://ik.imagekit.io/dr5fryhth/conferencenew/giammarco-boscaro-zeH-ljawHtg-unsplash.jpg?updatedAt=1770793618312" alt="Background for CMC expertise across economics, law and policy" loading="lazy"/>
    <div className="seminar-invitation-panel">
      <div className="seminar-invitation-meta"><span>Competition &amp; Markets Center</span><span>Accra, Ghana</span></div>
      <h2 id="seminar-invitation-title">Expertise across economics, law and policy.</h2>
      <div className="seminar-invitation-perspective">
        <p className="company-invitation-description">Understanding markets takes more than one perspective. CMC connects economic thinking, legal analysis and policy discussion with the realities of Ghana’s institutions and businesses. We welcome conversations with the people working to understand competition and strengthen the frameworks that shape our markets.</p>
        <button className="text-link" onClick={onContact}><span className="link-label">Talk to CMC</span><Arrow/></button>
      </div>
    </div>
  </section>;
}
