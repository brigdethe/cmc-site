// CMC Preloader - 1:1 Port of Curo recreation kinetic lockup & slot machine
// Adapted for React lifecycle cleanup. See NOTICE.md for provenance.

const words = ["competition", "markets", "policy", "center", "competition"];
const colors = ["#171717", "#3d2b27", "#cc9632", "#2a4030", "#171717"];
const easing = "cubic-bezier(0.45, 0, 0.55, 1)";

export function startPreloader() {
  const root = document.documentElement;
  const loader = document.querySelector('.site-preloader');
  if (!loader) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const page = [...document.querySelectorAll('.site-header, .page-main, .site-rsvp')];
  const previousInert = page.map(element => element.inert);
  page.forEach(element => { element.inert = true; });

  let disposed = false;
  let finished = false;
  const animations = new Set();
  const timers = new Set();

  const pause = (ms) =>
    new Promise((resolve) => {
      const id = setTimeout(() => {
        timers.delete(id);
        resolve();
      }, ms);
      timers.add(id);
    });

  const animate = (el, frames, options) => {
    if (!el) return Promise.resolve();
    const animation = el.animate(frames, { fill: "forwards", ...options });
    animations.add(animation);
    return animation.finished.catch(() => {});
  };

  const finish = () => {
    if (disposed && finished) return;
    finished = true;
    disposed = true;
    timers.forEach(clearTimeout);
    animations.forEach((animation) => animation.cancel());
    loader.hidden = true;
    loader.style.display = 'none';
    root.classList.remove('is-preloading');
    page.forEach((element, index) => { element.inert = previousInert[index]; });
    root.classList.add('hero-entered');
    loader.dataset.finished = String(performance.now());
    document.dispatchEvent(new Event('cmc-ready'));

    if (!reducedMotion.matches) {
      const text = [...document.querySelectorAll('[data-hero-enter]')];
      text.forEach((element, index) => element.animate([
        { opacity: 0, transform: 'translateY(24px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 800, delay: index * 70, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' }));
    }
  };

  if (reducedMotion.matches) {
    finish();
    return;
  }

  const logo = loader.querySelector('.intro-mark');
  const star = loader.querySelector('.intro-mark svg');
  const spacer = loader.querySelector('.intro-spacer');
  const wordEls = loader.querySelectorAll('.intro-words [data-word]');

  async function run() {
    try {
      await document.fonts.ready;
    } catch {}

    if (disposed) return;
    loader.classList.add('intro-ready');

    await animate(
      logo,
      [
        { opacity: 0, transform: 'translateX(-20px)' },
        { opacity: 1, transform: 'translateX(0)' },
      ],
      { duration: 200, easing: 'ease-out' },
    );

    for (let i = 0; i < words.length; i++) {
      if (disposed) return;
      if (spacer) spacer.textContent = words[i];
      loader.style.backgroundColor = colors[i];
      const steps = [
        animate(
          star,
          [
            { transform: `rotate(${(i + 1) * 180}deg)` },
            { transform: `rotate(${i * 180}deg)` },
          ],
          { duration: 200, easing },
        ),
        animate(
          wordEls[i],
          [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-100%)' },
          ],
          { duration: 200, easing },
        ),
      ];

      if (i > 0) {
        steps.push(
          animate(wordEls[i - 1], [{ transform: 'translateY(-250%)' }], {
            duration: 200,
            easing,
          }),
        );
      }

      if (i === words.length - 1) {
        if (window.innerWidth > 1024) {
          const id = setTimeout(() => {
            timers.delete(id);
            if (!disposed) loader.style.backgroundColor = 'transparent';
          }, 100);
          timers.add(id);
        } else {
          loader.style.backgroundColor = colors[0];
        }
      }

      await Promise.all(steps);
      await pause(350);
    }

    await animate(loader, [{ opacity: 1 }, { opacity: 0 }], {
      duration: window.innerWidth > 1024 ? 400 : 600,
      easing,
    });

    finish();
  }

  const watchdog = setTimeout(() => {
    if (!finished) finish();
  }, 10000);
  timers.add(watchdog);

  run().catch((error) => {
    if (!disposed && error?.name !== 'AbortError') finish();
  });

  return () => {
    if (finished) return;
    disposed = true;
    timers.forEach(clearTimeout);
    animations.forEach(animation => animation.cancel());
    root.classList.remove('is-preloading');
    page.forEach((element, index) => { element.inert = previousInert[index]; });
  };
}



