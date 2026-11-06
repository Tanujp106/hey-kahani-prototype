import test from 'node:test';
import assert from 'node:assert/strict';
import { initAudioPlayers } from '../assets/js/audio-player.js';

// Node has no HTMLMediaElement. These doubles emit native media events;
// assertions check the controller's public controls and playback coordination.
class Element extends EventTarget {
  constructor() { super(); this.disabled = false; this.textContent = ''; this.value = '0'; this.attrs = {}; }
  setAttribute(key, value) { this.attrs[key] = String(value); }
  getAttribute(key) { return this.attrs[key] ?? null; }
}
function player(src = '/approved-test-excerpt.mp3') {
  const media = new Element();
  Object.assign(media, { paused: true, duration: NaN, currentTime: 0, ended: false });
  media.attrs.src = src;
  media.play = async () => { media.paused = false; media.dispatchEvent(new Event('play')); };
  media.pause = () => { media.paused = true; media.dispatchEvent(new Event('pause')); };
  const parts = Object.fromEntries(['toggle', 'seek', 'elapsed', 'duration', 'status', 'label'].map(key => [key, new Element()]));
  const root = { querySelector: selector => selector === 'audio' ? media : parts[selector.match(/data-hk-audio-(\w+)/)?.[1]] };
  return { root, media, ...parts };
}
function init(...players) { initAudioPlayers({ querySelectorAll: () => players.map(p => p.root) }); }
const click = p => p.toggle.dispatchEvent(new Event('click'));
const settle = () => new Promise(resolve => setImmediate(resolve));

test('a missing sample cannot play or seek', () => {
  const p = player(''); init(p);
  assert.equal(p.toggle.disabled, true);
  assert.equal(p.seek.disabled, true);
  assert.match(p.status.textContent, /unavailable/i);
});

test('play and pause update accessible control state', async () => {
  const p = player(); init(p); click(p); await settle();
  assert.equal(p.toggle.getAttribute('aria-pressed'), 'true');
  assert.equal(p.label.textContent, 'Pause sample');
  click(p); assert.equal(p.toggle.getAttribute('aria-pressed'), 'false');
});

test('starting a second sample stops and resets the first', async () => {
  const a = player(), b = player(); init(a, b);
  click(a); await settle(); a.media.currentTime = 12;
  click(b); await settle();
  assert.equal(a.media.paused, true); assert.equal(a.media.currentTime, 0);
  assert.equal(a.toggle.getAttribute('aria-pressed'), 'false');
  assert.equal(b.toggle.getAttribute('aria-pressed'), 'true');
  b.media.pause();
});

test('metadata enables seeking, clamps values and formats time', () => {
  const p = player(); init(p); assert.equal(p.seek.disabled, true);
  p.media.duration = 125; p.media.dispatchEvent(new Event('loadedmetadata'));
  assert.equal(p.duration.textContent, '2:05'); assert.equal(p.seek.disabled, false);
  p.seek.value = '999'; p.seek.dispatchEvent(new Event('input'));
  assert.equal(p.media.currentTime, 125);
  p.media.currentTime = 61; p.media.dispatchEvent(new Event('timeupdate'));
  assert.equal(p.elapsed.textContent, '1:01');
});

test('rejected playback shows a retryable error', async () => {
  const p = player(); p.media.play = async () => { throw new Error('Network'); };
  init(p); click(p); await settle();
  assert.match(p.status.textContent, /try again/i);
  assert.equal(p.toggle.disabled, false);
  assert.equal(p.toggle.getAttribute('aria-pressed'), 'false');
});

test('completion returns to play and media errors disable seeking', async () => {
  const p = player(); init(p); click(p); await settle();
  p.media.ended = true; p.media.paused = true; p.media.dispatchEvent(new Event('ended'));
  assert.equal(p.label.textContent, 'Play sample'); assert.match(p.status.textContent, /finished/i);
  p.media.dispatchEvent(new Event('error'));
  assert.match(p.status.textContent, /unavailable/i); assert.equal(p.seek.disabled, true);
});

test('a late play promise cannot restart an interrupted sample', async () => {
  const a = player(), b = player(); let resolve;
  a.media.play = () => new Promise(done => { resolve = () => { a.media.paused = false; a.media.dispatchEvent(new Event('play')); done(); }; });
  init(a, b); click(a); click(b); await settle(); resolve(); await settle();
  assert.equal(a.media.paused, true); assert.equal(b.media.paused, false);
  b.media.pause();
});
