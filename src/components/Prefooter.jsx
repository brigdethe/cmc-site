import { Arrow } from './Header.jsx';
import './Prefooter.css';
import FooterCardLines from './FooterCardLines.jsx';

export default function Prefooter({ onContact }) {
  return <section className="cmc-prefooter" aria-labelledby="prefooter-title" data-home-scheme="dark">
    <div className="cmc-invitation" data-home-scheme="light">
      <FooterCardLines/>
      <div className="cmc-invitation-content">
        <h2 id="prefooter-title">Keep in touch<br className="cmc-prefooter-break"/> with CMC.</h2>
        <button className="text-link cmc-invitation-button" onClick={onContact}><span className="link-label">Let’s talk</span><Arrow/></button>
      </div>
      <div className="cmc-invitation-captions"><span>Competition &amp; Markets Center.</span><span>Accra, Ghana.</span></div>
    </div>
  </section>;
}
