import test from 'node:test';
import assert from 'node:assert/strict';
import { startPreloader } from './cmc-preloader.js';

function environment(t, { reduced = false, imageReady = Promise.resolve() } = {}) {
  const events = [];
  const classes = new Set();
  const element = name => ({
    style: {}, dataset: {}, classList: { add() {} },
    animate() {
      events.push(name === 'loader' ? 'fade' : 'word');
      return { finished: Promise.resolve(), cancel() {} };
    },
  });
  const star = element('star'), mark = element('mark'), spacer = {};
  mark.querySelector = () => star;
  const loader = element('loader');
  loader.querySelector = selector => selector === '.intro-mark' ? mark : spacer;
  loader.querySelectorAll = () => Array.from({ length: 5 }, () => element('slot'));
  const replace = (name, value) => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
    t.after(() => descriptor ? Object.defineProperty(globalThis, name, descriptor) : delete globalThis[name]);
  };
  replace('document', {
    documentElement: { classList: { add: name => classes.add(name), remove: name => classes.delete(name) } },
    fonts: { ready: Promise.resolve() },
    querySelector: () => ({ decode: () => imageReady }),
  });
  replace('matchMedia', () => ({ matches: reduced }));
  let id = 0;
  t.mock.method(globalThis, 'setTimeout', (callback, duration) => {
    if (duration !== 10000) queueMicrotask(callback);
    return ++id;
  });
  t.mock.method(globalThis, 'clearTimeout', () => {});
  const callbacks = { onReveal: () => events.push('reveal'), onComplete: () => events.push('complete') };
  return { loader, events, classes, callbacks };
}
const settle = () => new Promise(resolve => setImmediate(resolve));

test('hero entrance begins before loader fade and completion follows fade', async t => {
  const env = environment(t);
  startPreloader(env.loader, env.callbacks);
  await settle();
  assert(env.events.indexOf('reveal') < env.events.indexOf('fade'));
  assert(env.events.indexOf('fade') < env.events.indexOf('complete'));
  assert.equal(env.events.filter(event => event === 'complete').length, 1);
  assert.equal(env.classes.has('is-preloading'), false);
});

test('hero media readiness gates reveal; disposal prevents late callbacks', async t => {
  let ready;
  const env = environment(t, { imageReady: new Promise(resolve => { ready = resolve; }) });
  const dispose = startPreloader(env.loader, env.callbacks);
  await settle();
  assert.deepEqual(env.events, []);
  assert.equal(env.classes.has('is-preloading'), true);
  dispose(); ready();
  await settle();
  assert.deepEqual(env.events, []);
  assert.equal(env.classes.has('is-preloading'), false);
});

test('reduced motion reveals and completes without animation', async t => {
  const env = environment(t, { reduced: true });
  startPreloader(env.loader, env.callbacks);
  await settle();
  assert.deepEqual(env.events, ['reveal', 'complete']);
  assert.equal(env.classes.has('is-preloading'), false);
});
