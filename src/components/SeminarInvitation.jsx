import ResponsiveImage from './ResponsiveImage.jsx';
import './SeminarInvitation.css';
import FooterCardLines from './FooterCardLines.jsx';

export default function SeminarInvitation() {
  return <section className="seminar-invitation" aria-labelledby="seminar-invitation-title" data-home-scheme="light">
    <ResponsiveImage className="seminar-invitation-image" src="https://ik.imagekit.io/dr5fryhth/conferencenew/giammarco-boscaro-zeH-ljawHtg-unsplash.jpg?updatedAt=1770793618312" alt="Classical busts and books in a library" loading="lazy"/>
    <div className="seminar-invitation-panel"><FooterCardLines variant="company-panel"/>
      <div className="seminar-invitation-meta"><span>Competition &amp; Markets Center</span><span>Accra, Ghana</span></div>
      <h2 id="seminar-invitation-title">A note from the Managing Director.</h2>
      <div className="seminar-invitation-perspective">
          <p className="company-invitation-description">Thank you to everyone who contributed to our first seminar. The questions raised will help shape our future discussions. We look forward to building on this exchange in the year ahead.</p>
          <p className="seminar-invitation-attribution">Paul Kofi Datsa<span>Managing Director · Competition &amp; Markets Center</span><span>Draft message — pending the Managing Director’s approval.</span></p>
      </div>
    </div>
  </section>;
}

