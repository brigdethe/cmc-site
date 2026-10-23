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
      aria-label="Loading studio"
    >
      <div className="willem-loader">
        <div className="willem__h1">
          <div className="willem__h1-start">
            <span className="willem__letter">C</span>
            <span className="willem__letter">M</span>
          </div>
          <div className="willem-loader__box">
            <div className="willem-loader__box-inner">
              <div className="willem__growing-image">
                <div className="willem__growing-image-wrap">
                  <img
                    className="willem__cover-image-extra is--1"
                    src="/images/loader-1.jpg"
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
                    src="/media/hero.jpg"
                    alt=""
                    loading="eager"
                  />
                  <div className="willem__shade" />
                </div>
              </div>
            </div>
          </div>
          <div className="willem__h1-end">
            <span className="willem__letter">C</span>
          </div>
        </div>
      </div>
    </div>
  );
}
