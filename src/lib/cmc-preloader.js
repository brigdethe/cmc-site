// CMC's word/color/rotation sequence, adapted to an explicit React lifecycle.
// No Thirdway runtime or loader artwork. See NOTICE.md for provenance.
const words = ['competition', 'markets', 'policy', 'center', 'competition'];
const colors = ['#171717', '#3d2b27', '#cc9632', '#2a4030', '#171717'];
const easing = 'cubic-bezier(.45,0,.55,1)';

export function startPreloader(loader, { onReveal, onComplete }) {
  if (!loader) return;
  const root = document.documentElement;
  root.classList.add('is-preloading');
  let disposed = false, revealed = false, finished = false;
  const animations = new Set(), timers = new Set();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal = () => {
    if (disposed || revealed) return;
    revealed = true;
    loader.dataset.phase = 'reveal';
    onReveal();
  };
  const cleanup = () => {
    timers.forEach(clearTimeout);
    animations.forEach(animation => animation.cancel());
    root.classList.remove('is-preloading');
  };
  const finish = () => {
    if (disposed || finished) return;
    reveal();
    finished = true;
    loader.style.opacity = '0';
    cleanup();
    onComplete();
  };
  const pause = ms => new Promise(resolve => {
    const id = setTimeout(() => { timers.delete(id); resolve(); }, ms);
    timers.add(id);
  });
  const animate = async (element, frames, options) => {
    if (!element || disposed) return;
    const animation = element.animate(frames, { fill: 'forwards', ...options });
    animations.add(animation);
    await animation.finished.catch(() => {});
  };
  async function run() {
    loader.dataset.phase = 'waiting';
    const image = document.querySelector('.hero-media img');
    await Promise.allSettled([document.fonts.ready, image?.decode()]);
    if (disposed) return;
    if (reduced) { finish(); return; }
    loader.classList.add('intro-ready');
    loader.dataset.phase = 'words';
    const mark = loader.querySelector('.intro-mark');
    const star = mark.querySelector('svg');
    const spacer = loader.querySelector('.intro-spacer');
    const slots = loader.querySelectorAll('[data-word]');
    await animate(mark, [{ opacity: 0, transform: 'translateX(-20px)' }, { opacity: 1, transform: 'translateX(0)' }], { duration: 200, easing: 'ease-out' });
    for (let i = 0; i < words.length; i++) {
      if (disposed || finished) return;
      spacer.textContent = words[i];
      loader.style.backgroundColor = colors[i];
      loader.dataset.word = words[i];
      const steps = [
        animate(star, [{ transform: `rotate(${(i + 1) * 180}deg)` }, { transform: `rotate(${i * 180}deg)` }], { duration: 200, easing }),
        animate(slots[i], [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], { duration: 200, easing }),
      ];
      if (i > 0) steps.push(animate(slots[i - 1], [{ transform: 'translateY(-250%)' }], { duration: 200, easing }));
      await Promise.all(steps);
      await pause(350);
    }
    if (disposed || finished) return;
    // Entrance starts behind the opaque loader; its fade reveals a moving hero.
    // Keep the loader mounted and page inert throughout the overlapping exit.
    reveal();
    await animate(loader, [{ opacity: 1 }, { opacity: 0 }], { duration: 750, easing: 'cubic-bezier(.22,1,.36,1)' });
    finish();
  }
  timers.add(setTimeout(finish, 10000));
  run().catch(() => finish());
  return () => { disposed = true; cleanup(); };
}
