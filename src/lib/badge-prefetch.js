import { shouldSaveData } from './data-policy.js';

// Files the register-page badge (<hanging-card>) fetches when it mounts.
const BADGE_FILES = [
 '/seminar-badge/card.js',
 '/seminar-badge/vendor/C41mHjnf.js',
 '/seminar-badge/vendor/BPhERcaf.js',
 '/seminar-badge/vendor/B2SoGeMX.js',
 '/seminar-badge/vendor/physics.wasm',
 '/seminar-badge/assets/badge_nofilter.webp',
];

let started = false;

// Warm the cache for the register page and its badge so switching to it is seamless.
export function prefetchBadge(loadPage) {
 if (started || shouldSaveData()) return;
 started = true;
 loadPage?.().catch(() => {});
 for (const href of BADGE_FILES) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
 }
}

// Run after the current page has fully loaded and the browser is idle.
export function whenIdleAfterLoad(task) {
 let idle = 0, timer = 0;
 const schedule = () => {
  if ('requestIdleCallback' in window) idle = requestIdleCallback(task, { timeout: 4000 });
  else timer = setTimeout(task, 1500);
 };
 if (document.readyState === 'complete') schedule();
 else addEventListener('load', schedule, { once: true });
 return () => {
  removeEventListener('load', schedule);
  if (idle) cancelIdleCallback(idle);
  clearTimeout(timer);
 };
}
