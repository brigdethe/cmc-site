import { Arrow } from './Header.jsx';
import './Footer.css';

export default function Footer({ onContact }) {
  return <footer className="cmc-footer" id="footer" data-home-scheme="dark">
    <div className="cmc-footer-grid">
      <div className="cmc-footer-identity">
        <a className="cmc-footer-logo" href="#home" aria-label="CMC home">cmc<img src="/branding/cmc-round-logo.svg" alt="" width="56" height="56"/></a>
        <p>Competitions and<br/>Markets Center.</p>
      </div>
      <nav className="cmc-footer-navigation" aria-label="Footer navigation">
        <span className="cmc-footer-label">Explore</span>
        <a href="#home">Home</a>
        <a href="#approach">Approach</a>
        <a href="#process">Our process</a>
        <a href="#services">Services</a>
        <a href="#our-space">Our space</a>
      </nav>
      <div className="cmc-footer-contact">
        <span className="cmc-footer-label">Find us</span>
        <p>Accra, Ghana.</p>
        <button className="text-link" onClick={onContact}><span className="link-label">Let’s talk</span><Arrow/></button>
      </div>
    </div>
    <div className="cmc-footer-bottom"><span>© {new Date().getFullYear()} CMC</span><span>Competitions and Markets Center.</span><a href="#home">Back to top <span aria-hidden="true">↑</span></a></div>
  </footer>;
}
