import test from 'node:test';
import assert from 'node:assert/strict';
import { getKoelDialogMotion } from '../assets/js/koel-dialog-motion.js';

class Element {
  constructor(rect = { left: 300, top: 100, width: 240, height: 240 }) {
    this.rect = rect; this.style = {}; this.dataset = {};
    this.listeners = {}; this.animations = []; this.children = []; this.isConnected = true;
  }
  getBoundingClientRect() { return this.rect; }
  setAttribute() {}
  cloneNode() { return new Element(this.rect); }
  append(node) { this.children.push(node); }
  remove() { this.removed = true; }
  focus() { this.focused = true; }
  querySelector(selector) { return this.nodes?.[selector] || null; }
  addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); }
  dispatchEvent(event) {
    for (const listener of this.listeners[event.type] || []) listener(event);
    return !event.defaultPrevented;
  }
  animate(frames, options) {
    let resolve, reject;
    const finished = new Promise((yes, no) => { resolve = yes; reject = no; });
    const animation = { frames, options, finished, finish: resolve,
      cancel() { reject(new Error('cancelled')); }, commitStyles() {} };
    this.animations.push(animation); return animation;
  }
}
function scene(t, { reduced = false, visible = true, animation = true } = {}) {
  const original = { matchMedia: globalThis.matchMedia, getComputedStyle: globalThis.getComputedStyle };
  globalThis.matchMedia = () => ({ matches: reduced });
  globalThis.getComputedStyle = () => ({ transform: 'matrix(1, 0, 0, 1, -90, 40)', opacity: '.6' });
  t.after(() => Object.assign(globalThis, original));
  const dialog = new Element(), panel = new Element(), art = new Element(), close = new Element();
  const source = new Element({ left: 100, top: visible ? 300 : -600, width: 80, height: 80 });
  const origin = new Element();
  origin.nodes = { '.hk-koel-coin-shell': source };
  dialog.nodes = { '[data-hk-koel-dialog-panel]': panel, '[data-hk-koel-dialog-art]': art, '[data-hk-close-dialog]': close };
  dialog.ownerDocument = { defaultView: { innerWidth: 1000, innerHeight: 800 } };
  dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; dialog.dispatchEvent(new Event('close')); };
  if (!animation) panel.animate = art.animate = undefined;
  const motion = getKoelDialogMotion(dialog);
  const finish = async () => {
    for (const element of [panel, art, ...dialog.children]) element.animations.forEach(a => a.finish());
    await new Promise(resolve => setImmediate(resolve));
  };
  return { dialog, panel, art, source, origin, motion, finish };
}

test('opening expands the tapped Koel into its dialog position before revealing the original artwork', async t => {
  const s = scene(t);
  s.motion.open(s.origin);
  assert.equal(s.dialog.open, true);
  assert.equal(s.source.style.visibility, 'hidden');
  assert.equal(s.art.style.visibility, 'hidden');
  const flight = s.dialog.children[0];
  assert.match(flight.animations[0].frames[0].transform, /translate\(-200px, 200px\)/);
  assert.match(flight.animations[0].frames[0].transform, /scale\(0\.333/);
  await s.finish();
  assert.equal(s.art.style.visibility, '');
  assert.equal(flight.removed, true);
});

test('close request and Escape keep the modal open until its return transition finishes', async t => {
  for (const type of ['hk:request-close', 'cancel']) {
    const s = scene(t);
    s.motion.open(s.origin); await s.finish();
    const request = new Event(type, { cancelable: true });
    s.dialog.dispatchEvent(request);
    assert.equal(request.defaultPrevented, true);
    assert.equal(s.dialog.open, true);
    await s.finish();
    assert.equal(s.dialog.open, false);
    assert.equal(s.source.style.visibility, '');
    assert.equal(s.origin.focused, true);
  }
});

test('closing during expansion cancels the entrance without stale cleanup or a stuck hidden Koel', async t => {
  const s = scene(t);
  s.motion.open(s.origin);
  const closing = s.motion.close();
  await s.finish(); await closing;
  assert.equal(s.dialog.open, false);
  assert.equal(s.source.style.visibility, '');
  assert.equal(s.art.style.visibility, '');
});

test('reduced motion and an offscreen source use a fade without a travelling Koel', async t => {
  for (const config of [{ reduced: true }, { visible: false }]) {
    const s = scene(t, config);
    s.motion.open(s.origin);
    assert.equal(s.dialog.children.length, 0);
    assert.ok(s.panel.animations.length);
    for (const frame of s.panel.animations[0].frames) assert.equal(frame.transform, undefined);
    await s.finish();
    const closing = s.motion.close();
    await s.finish(); await closing;
    assert.equal(s.dialog.open, false);
  }
});

test('a missing animation API leaves a functional modal and immediate dismissal', async t => {
  const s = scene(t, { animation: false });
  s.motion.open(s.origin);
  assert.equal(s.dialog.open, true);
  await s.motion.close();
  assert.equal(s.dialog.open, false);
  assert.notEqual(s.source.style.visibility, 'hidden');
});

test('a queued native close event cannot erase the next opening', async t => {
  const s = scene(t);
  s.dialog.close = () => { s.dialog.open = false; };
  s.motion.open(s.origin); await s.finish();
  const closing = s.motion.close();
  await s.finish(); await closing;
  s.motion.open(s.origin);
  const nextFlight = s.dialog.children.at(-1);
  s.dialog.dispatchEvent(new Event('close'));
  assert.equal(s.dialog.open, true);
  assert.notEqual(nextFlight.removed, true);
  assert.equal(s.source.style.visibility, 'hidden');
  await s.finish();
});

const tap = (dialog, target, x, y) => {
  dialog.dispatchEvent({ type: 'pointerdown', target, clientX: x, clientY: y, button: 0, isPrimary: true });
  dialog.dispatchEvent({ type: 'click', target, clientX: x, clientY: y });
};

test('a backdrop tap uses the animated close path and restores focus', async t => {
  const s = scene(t);
  let closingEvents = 0;
  s.dialog.addEventListener('hk:koel-closing', () => closingEvents++);
  s.motion.open(s.origin); await s.finish();
  tap(s.dialog, s.dialog, 50, 50);
  assert.equal(closingEvents, 1);
  assert.equal(s.dialog.open, true);
  assert.equal(s.dialog.dataset.hkMotionState, 'closing');
  await s.finish();
  assert.equal(s.dialog.open, false);
  assert.equal(s.origin.focused, true);
});

test('inside taps and dragging from the panel onto the backdrop keep the modal open', async t => {
  const s = scene(t);
  s.motion.open(s.origin); await s.finish();
  tap(s.dialog, s.panel, 350, 150);
  tap(s.dialog, s.dialog, 350, 150); // The dialog's transparent box still overlaps its panel.
  assert.equal(s.dialog.open, true);
  s.dialog.dispatchEvent({ type: 'pointerdown', target: s.panel, clientX: 350, clientY: 150, button: 0 });
  s.dialog.dispatchEvent({ type: 'click', target: s.dialog, clientX: 50, clientY: 50 });
  assert.equal(s.dialog.dataset.hkMotionState, 'open');
  s.dialog.dispatchEvent({ type: 'pointerdown', target: s.dialog, clientX: 50, clientY: 50, button: 0 });
  s.dialog.dispatchEvent({ type: 'click', target: s.panel, clientX: 350, clientY: 150 });
  assert.equal(s.dialog.open, true);
});

test('cancelled backdrop gestures do not dismiss, and taps work without animation support', async t => {
  const s = scene(t, { animation: false });
  s.motion.open(s.origin);
  s.dialog.dispatchEvent({ type: 'pointerdown', target: s.dialog, clientX: 50, clientY: 50, button: 0 });
  s.dialog.dispatchEvent({ type: 'pointercancel' });
  s.dialog.dispatchEvent({ type: 'click', target: s.dialog, clientX: 50, clientY: 50 });
  assert.equal(s.dialog.open, true);
  tap(s.dialog, s.dialog, 50, 50);
  assert.equal(s.dialog.open, false);
});
