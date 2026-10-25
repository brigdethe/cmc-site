import ResponsiveImage from './ResponsiveImage.jsx';
import { Arrow } from './Header.jsx';
import './Footer.css';

export default function Footer({ onContact }) {
  return <footer className="cmc-footer" id="footer" data-home-scheme="dark">
    <div className="cmc-footer-grid">
      <div className="cmc-footer-identity">
        <a className="cmc-footer-logo" href="/" aria-label="CMC home">cmc<ResponsiveImage src="/branding/cmc-round-logo.svg" alt="" width="56" height="56"/></a>
        <p>Competition and<br/>Markets Center.</p>
      </div>
      <nav className="cmc-footer-navigation" aria-label="Footer navigation">
        <span className="cmc-footer-label">Explore</span>
        <a href="/">Home</a>
        <a href="/seminar/">Seminar</a>
        <a href="/projects/british-lands-hq/">Projects</a>
        <a href="/register/">Register</a>
      </nav>
      <div className="cmc-footer-contact">
        <span className="cmc-footer-label">Find us</span>
        <p>Accra, Ghana.</p>
        <button className="text-link" onClick={onContact}><span className="link-label">Let’s talk</span><Arrow/></button>
      </div>
    </div>
    <div className="cmc-footer-bottom"><span>© {new Date().getFullYear()} CMC</span><span>Competition and Markets Center.</span><a href="#home">Back to top <span aria-hidden="true">↑</span></a></div>
  </footer>;
}

