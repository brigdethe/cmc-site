import { Arrow } from './Header.jsx';
import './Prefooter.css';

export default function Prefooter({ onContact }) {
  return <section className="cmc-prefooter" aria-labelledby="prefooter-title" data-home-scheme="dark">
    <div className="cmc-invitation" data-home-scheme="light">
      <svg className="cmc-invitation-contours" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        {Array.from({ length: 13 }, (_, i) => <path key={i} d={`M ${-260 + i * 42} 640 C ${-120 + i * 42} ${280 - i * 13}, ${350 + i * 47} ${710 - i * 31}, ${465 + i * 45} ${415 - i * 18} S ${725 + i * 48} ${120 + i * 14}, ${1030 + i * 43} ${255 - i * 20} S ${1360 + i * 25} ${150 + i * 17}, 1630 ${-110 + i * 40}`} />)}
      </svg>
      <div className="cmc-invitation-content">
        <h2 id="prefooter-title">Let’s make something<br className="cmc-prefooter-break"/> that matters.</h2>
        <button className="text-link cmc-invitation-button" onClick={onContact}><span className="link-label">Let’s talk</span><Arrow/></button>
      </div>
      <div className="cmc-invitation-captions"><span>Competitions and Markets Center.</span><span>Accra, Ghana.</span></div>
    </div>
  </section>;
}
