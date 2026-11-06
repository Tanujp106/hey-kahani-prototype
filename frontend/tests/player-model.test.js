import test from 'node:test';
import assert from 'node:assert/strict';
import { initPlayerModel } from '../assets/js/player-model.js';

function setup({ reduce = false, fine = true } = {}) {
  const classes = new Set();
  const visual = { classList: {
    add: (...names) => names.forEach(name => classes.add(name)),
    remove: (...names) => names.forEach(name => classes.delete(name)),
    toggle: (name, on) => on ? classes.add(name) : classes.delete(name)
  } };
  const story = new EventTarget(); story.dataset = { hkStoryProgress: '0' };
  const viewer = new EventTarget();
  const attributes = new Map([['aria-hidden', 'true']]);
  viewer.dataset = { modelSrc: 'assets/models/kahani-player.glb' };
  viewer.closest = selector => selector === '#experience' ? story : visual;
  viewer.setAttribute = (key, value) => attributes.set(key, value);
  viewer.removeAttribute = key => attributes.delete(key);
  viewer.toggleAttribute = (key, on) => on ? attributes.set(key, '') : attributes.delete(key);
  viewer.getBoundingClientRect = () => ({ left: 0, top: 0, width: 400, height: 600 });
  const frames = [];
  const win = new EventTarget();
  win.matchMedia = query => ({ matches: query.includes('reduced') ? reduce : fine, addEventListener() {} });
  let intersect;
  globalThis.window = win;
  globalThis.requestAnimationFrame = callback => { frames.push(callback); return frames.length; };
  win.IntersectionObserver = globalThis.IntersectionObserver = class {
    constructor(callback) { intersect = callback; }
    observe() {}
    disconnect() {}
  };
  const scope = { querySelector: () => viewer };
  return {
    viewer, story, visual, attributes, classes, win, scope,
    enter: () => intersect([{ isIntersecting: true }]),
    flush: () => { while (frames.length) frames.shift()(); },
    move: (x, y) => {
      const event = new Event('pointermove');
      Object.assign(event, { clientX: x, clientY: y, buttons: 0 });
      viewer.dispatchEvent(event);
    }
  };
}

test('loads the viewer near the viewport and reveals geometry only after load', async () => {
  const env = setup(); let loads = 0;
  initPlayerModel(env.scope, async () => { loads++; });
  assert.equal(loads, 0, 'Do not download a renderer for an unseen scene');
  env.enter(); await Promise.resolve();
  assert.equal(loads, 1);
  assert.equal(env.attributes.get('src'), 'assets/models/kahani-player.glb');
  assert.ok(!env.classes.has('is-model-ready'), 'Keep the fallback visible while loading');
  env.viewer.dispatchEvent(new Event('load')); env.flush();
  assert.ok(env.classes.has('is-model-ready'));
  assert.ok(!env.attributes.has('camera-controls'), 'Scroll owns the camera; no drag on intro');
  assert.ok(!env.classes.has('is-model-interactive'));
  assert.equal(env.viewer.tabIndex, -1);
  assert.equal(env.viewer.cameraOrbit, '20.00deg 66.00deg auto', 'Intro orbit from scroll progress only');
  env.move(400, 0); env.flush();
  assert.equal(env.viewer.cameraOrbit, '20.00deg 66.00deg auto', 'Ignore pointer-driven tilt');
  env.story.dataset.hkStoryProgress = '0.3334';
  env.win.dispatchEvent(new Event('scroll')); env.flush();
  assert.equal(env.viewer.cameraOrbit, '0.00deg 66.00deg auto', 'Lerp to frontal dock from scroll');
  assert.ok(!env.attributes.has('camera-controls'));
  env.viewer.dispatchEvent(new Event('error'));
  assert.ok(!env.classes.has('is-model-ready'), 'WebGL/model failure restores the product image');
  assert.equal(env.attributes.get('aria-hidden'), 'true');
});

test('pointer movement never shifts the camera orbit', async () => {
  const env = setup();
  initPlayerModel(env.scope, async () => {});
  env.enter(); await Promise.resolve();
  env.viewer.dispatchEvent(new Event('load')); env.flush();
  env.move(400, 0); env.flush();
  assert.equal(env.viewer.cameraOrbit, '20.00deg 66.00deg auto');
  env.story.dataset.hkStoryProgress = '0.15';
  env.win.dispatchEvent(new Event('scroll')); env.flush();
  assert.equal(env.viewer.cameraOrbit, '11.00deg 66.00deg auto');
  env.move(0, 600); env.flush();
  assert.equal(env.viewer.cameraOrbit, '11.00deg 66.00deg auto');
});

test('reduced-motion preference still follows scroll-driven orbit', async () => {
  const env = setup({ reduce: true });
  initPlayerModel(env.scope, async () => {});
  env.enter(); await Promise.resolve();
  env.viewer.dispatchEvent(new Event('load')); env.flush();
  assert.equal(env.viewer.cameraOrbit, '20.00deg 66.00deg auto');
  env.story.dataset.hkStoryProgress = '0.3334';
  env.win.dispatchEvent(new Event('scroll')); env.flush();
  assert.equal(env.viewer.cameraOrbit, '0.00deg 66.00deg auto');
});

test('a failed renderer import leaves the product image and hides unavailable controls', async () => {
  const env = setup();
  const warn = console.warn; console.warn = () => {};
  try {
    initPlayerModel(env.scope, async () => { throw new Error('Renderer unavailable'); });
    env.enter(); await Promise.resolve(); env.flush();
    assert.ok(!env.classes.has('is-model-ready'));
    assert.ok(!env.classes.has('is-model-interactive'));
    assert.equal(env.viewer.tabIndex, -1);
    assert.ok(!env.attributes.has('camera-controls'));
  } finally { console.warn = warn; }
});
