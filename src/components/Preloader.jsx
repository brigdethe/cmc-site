import FooterCardLines from './FooterCardLines.jsx';
import ResponsiveImage from './ResponsiveImage.jsx';
import { useEffect, useRef } from 'react';
import { startPreloader } from '../lib/cmc-preloader.js';
import '../loader.css';

export default function Preloader({ onReveal, onComplete, landing = 'hero' }) {
  const loader = useRef(null);

  useEffect(() => {
    return startPreloader(loader.current, {
      landing,
      onReveal,
      onComplete
    });
  }, [onReveal, onComplete, landing]);

  return (
    <div
      ref={loader}
      className="site-preloader willem-header is--loading"
      role="status"
      aria-label="Loading Competition and Markets Center"
    >
      <FooterCardLines variant="preloader"/>
      <div className="willem-loader">
        <div className="willem__stack">
          <div className="willem__line is--1">
            <span className="willem__line-inner">
              {'Competition'.split('').map((char, i) => (
                <span key={i} className="willem__letter">{char}</span>
              ))}
            </span>
          </div>

          <div className="willem__line is--2 willem__h1">
            <div className="willem__h1-start">
              {'and'.split('').map((char, i) => (
                <span key={i} className="willem__letter">{char}</span>
              ))}
            </div>
            <div className="willem-loader__box">
              <div className="willem-loader__box-inner">
                <div className="willem__growing-image">
                  <div className="willem__growing-image-wrap">
                    <ResponsiveImage
                      className="willem__cover-image-extra is--1 is--logo"
                      src="/branding/cmc-round-logo.svg"
                      alt=""
                      loading="eager"
                    />
                    <ResponsiveImage
                      sizes="96px" className="willem__cover-image-extra is--2"
                      src="https://ik.imagekit.io/dr5fryhth/Screenshots/Screenshot%202026-04-10%20110007.png?updatedAt=1775838071009"
                      alt=""
                      loading="eager"
                    />
                    <ResponsiveImage
                      sizes="96px" className="willem__cover-image-extra is--3"
                      src="https://ik.imagekit.io/dr5fryhth/Screenshots/Screenshot%202026-04-10%20110128.png?updatedAt=1775838070633"
                      alt=""
                      loading="eager"
                    />
                    <ResponsiveImage
                      className="willem__cover-image"
                      src={landing === 'library' ? '/media/cmc-library.jpg' : 'https://ik.imagekit.io/dr5fryhth/Screenshots/Screenshot%202026-04-10%20110118.png?updatedAt=1775838071060'}
                      alt=""
                      loading="eager"
                    />
                    <div className="willem__shade" />
                  </div>
                </div>
              </div>
            </div>
            <div className="willem__h1-end">
              {'Markets'.split('').map((char, i) => (
                <span key={i} className="willem__letter">{char}</span>
              ))}
            </div>
          </div>

          <div className="willem__line is--3">
            <span className="willem__line-inner">
              {'Center'.split('').map((char, i) => (
                <span key={i} className="willem__letter">{char}</span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
