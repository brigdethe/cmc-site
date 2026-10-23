import { useEffect, useRef } from 'react';
import { startPreloader } from '../lib/cmc-preloader.js';
import '../loader.css';

export default function Preloader({ onReveal, onComplete }) {
  const loader = useRef(null);

  useEffect(() => {
    return startPreloader(loader.current, {
      onReveal,
      onComplete
    });
  }, [onReveal, onComplete]);

  return (
    <div
      ref={loader}
      className="site-preloader willem-header is--loading"
      role="status"
      aria-label="Loading Competitions and Markets Center"
    >
      <div className="willem-loader">
        <div className="willem__stack">
          <div className="willem__line is--1">
            <span className="willem__line-inner">
              {'competitions'.split('').map((char, i) => (
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
                    <img
                      className="willem__cover-image-extra is--1 is--logo"
                      src="/branding/cmc-round-logo.svg"
                      alt=""
                      loading="eager"
                    />
                    <img
                      className="willem__cover-image-extra is--2"
                      src="/images/loader-2.jpg"
                      alt=""
                      loading="eager"
                    />
                    <img
                      className="willem__cover-image-extra is--3"
                      src="/images/loader-3.jpg"
                      alt=""
                      loading="eager"
                    />
                    <img
                      className="willem__cover-image"
                      src="https://ik.imagekit.io/dr5fryhth/Screenshots/Screenshot%202026-04-10%20110118.png?updatedAt=1775838071060"
                      alt=""
                      loading="eager"
                    />
                    <div className="willem__shade" />
                  </div>
                </div>
              </div>
            </div>
            <div className="willem__h1-end">
              {'markets'.split('').map((char, i) => (
                <span key={i} className="willem__letter">{char}</span>
              ))}
            </div>
          </div>

          <div className="willem__line is--3">
            <span className="willem__line-inner">
              {'center'.split('').map((char, i) => (
                <span key={i} className="willem__letter">{char}</span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
