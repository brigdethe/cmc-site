import gsap from 'gsap';

export function startPreloader(loader, { onReveal, onComplete } = {}) {
  if (!loader) return;
  const root = document.documentElement;
  root.classList.add('is-preloading');
  let disposed = false, revealed = false, finished = false;
  const reduced = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const reveal = () => {
    if (disposed || revealed) return;
    revealed = true;
    loader.dataset.phase = 'reveal';
    if (onReveal) onReveal();
  };

  const finish = () => {
    if (disposed || finished) return;
    reveal();
    finished = true;
    root.classList.remove('is-preloading');
    if (loader) loader.style.display = 'none';
    if (onComplete) onComplete();
  };

  if (reduced) {
    finish();
    return () => {};
  }

  async function run() {
    loader.dataset.phase = 'waiting';
    const heroImage = typeof document !== 'undefined' ? document.querySelector('.hero-media img') : null;
    const loaderImgs = Array.from(loader.querySelectorAll?.('img') || []);
    const promises = [
      typeof document !== 'undefined' && document.fonts?.ready,
      heroImage?.decode?.()
    ];
    loaderImgs.forEach(img => {
      if (img?.decode) promises.push(img.decode().catch(() => {}));
    });

    await Promise.allSettled(promises.filter(Boolean));
    if (disposed) return;

    loader.dataset.phase = 'running';

    if (typeof window !== 'undefined' && typeof gsap !== 'undefined') {
      const loadingLetter = loader.querySelectorAll('.willem__letter');
      const box = loader.querySelectorAll('.willem-loader__box');
      const growingImage = loader.querySelectorAll('.willem__growing-image');
      const headingStart = loader.querySelectorAll('.willem__h1-start');
      const headingEnd = loader.querySelectorAll('.willem__h1-end');
      const coverImageExtra = loader.querySelectorAll('.willem__cover-image-extra');
      const otherLines = loader.querySelectorAll('.willem__line.is--1, .willem__line.is--3');
      const stack = loader.querySelector('.willem__stack');

      const tl = gsap.timeline({
        defaults: {
          ease: 'expo.inOut'
        },
        onComplete: () => {
          finish();
        }
      });

      // 1. Letters entrance
      if (loadingLetter.length) {
        tl.from(loadingLetter, {
          yPercent: 110,
          stagger: 0.015,
          duration: 1.15,
          ease: 'power3.out'
        });
      }

      // 2. Box expands to 1.35em
      if (box.length) {
        tl.fromTo(box, {
          width: '0em'
        }, {
          width: '1.35em',
          duration: 1.25
        }, '< 0.9');
      }

      // 3. Growing image expands to 100% inside box
      if (growingImage.length) {
        tl.fromTo(growingImage, {
          width: '0%'
        }, {
          width: '100%',
          duration: 1.25
        }, '<');
      }

      // 4. Letters shift outward slightly
      if (headingStart.length) {
        tl.fromTo(headingStart, {
          x: '0em'
        }, {
          x: '-0.04em',
          duration: 1.25
        }, '<');
      }

      if (headingEnd.length) {
        tl.fromTo(headingEnd, {
          x: '0em'
        }, {
          x: '0.04em',
          duration: 1.25
        }, '<');
      }

      // 5. Extra shutter images rapidly cycle through
      if (coverImageExtra.length) {
        tl.fromTo(coverImageExtra, {
          opacity: 1
        }, {
          opacity: 0,
          duration: 0.05,
          ease: 'none',
          stagger: 0.45
        }, '-=0.05');
      }

      // 6. Fullscreen expansion: growingImage lands on exactly the hero's box
      //    (100vw × 100svh, matching .hero-media>img); box pushes letters off-screen
      const shade = loader.querySelector('.willem__shade');

      if (growingImage.length) {
        tl.to(growingImage, {
          width: '100vw',
          height: '100svh',
          duration: 1.8
        }, '< 1.15');
      }

      tl.addLabel('expand', '<');

      if (box.length) {
        tl.to(box, {
          width: '110vw',
          duration: 1.8
        }, 'expand');

        // Glide the entire typography stack so the center of the image box
        // aligns precisely to the viewport center during zoom handoff.
        if (stack && box[0]) {
          tl.to(stack, {
            x: () => {
              const r = box[0].getBoundingClientRect();
              return window.innerWidth / 2 - (r.left + r.width / 2);
            },
            y: () => {
              const r = box[0].getBoundingClientRect();
              return window.innerHeight / 2 - (r.top + r.height / 2);
            },
            duration: 1.8
          }, 'expand');
        }
      }

      // Top and bottom lines fade gently
      if (otherLines.length) {
        tl.to(otherLines, {
          opacity: 0,
          y: (i) => (i === 0 ? '-15px' : '15px'),
          duration: 1.2,
          ease: 'power1.inOut'
        }, 'expand');
      }

      // Letters drift out with the expanding box and fade gently
      if (headingStart.length && headingEnd.length) {
        tl.to([headingStart, headingEnd], {
          opacity: 0,
          duration: 1.4,
          ease: 'power1.inOut'
        }, 'expand+=0.1');
      }

      // Fade in the same gradient the page hero uses, so tones match at handoff
      if (shade) {
        tl.to(shade, {
          opacity: 1,
          duration: 1.2,
          ease: 'power1.inOut'
        }, 'expand+=0.6');
      }

      // 7. Image has landed: start the hero entrance underneath
      tl.addLabel('landed', 'expand+=1.8');
      tl.add(() => {
        reveal();
      }, 'landed');

      // 8. Frames are identical now, so this fade is invisible apart from
      //    letting the hero copy/header animate in
      tl.to(loader, {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.out'
      }, 'landed+=0.1');

    } else {
      // Fallback for headless test environments
      reveal();
      if (typeof loader.animate === 'function') {
        const anim = loader.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 50 });
        await anim?.finished?.catch?.(() => {});
      }
      finish();
    }
  }

  const timeoutId = setTimeout(finish, 10000);
  run().catch(() => finish());

  return () => {
    disposed = true;
    clearTimeout(timeoutId);
    root.classList.remove('is-preloading');
    if (typeof window !== 'undefined' && typeof gsap !== 'undefined') {
      gsap.killTweensOf(loader);
      gsap.killTweensOf('.willem__letter');
      gsap.killTweensOf('.willem__h1');
      gsap.killTweensOf('.willem__stack');
      gsap.killTweensOf('.willem__line');
      gsap.killTweensOf('.willem-loader__box');
      gsap.killTweensOf('.willem__growing-image');
      gsap.killTweensOf('.willem__h1-start');
      gsap.killTweensOf('.willem__h1-end');
      gsap.killTweensOf('.willem__cover-image-extra');
    }
  };
}
