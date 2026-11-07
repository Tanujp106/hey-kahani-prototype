const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');

class Element {
  constructor(tag = 'span') {
    this.tag = tag; this.children = []; this.attributes = {}; this.style = {};
    this.listeners = {}; this.dataset = {}; this.textContent = '';
    this.classes = new Set();
    this.classList = { toggle: (name, on) => on ? this.classes.add(name) : this.classes.delete(name) };
  }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  addEventListener(name, callback) { (this.listeners[name] ||= []).push(callback); }
  emit(name) { for (const callback of this.listeners[name] || []) callback(); }
}

function setup({ reduced = false, src = 'assets/audio/preview-sample.mp3', graphFails = false } = {}) {
  const audios = []; const frames = new Map(); let frameId = 0;
  let modalOpens = 0;
  const dialog = new Element('dialog');
  dialog.querySelector = () => new Element();
  dialog.showModal = () => { modalOpens++; };
  const root = { dataset: { previewSrc: src, previewDemo: 'true' } };
  const cards = ['Holi Kite Play', 'Kerala Houseboat'].map(title => {
    const preview = new Element('button'); const poster = new Element('button');
    const card = {
      dataset: { title }, preview, poster,
      closest() { return root; },
      querySelector(selector) { return selector === '.hk-koel__preview' ? preview : null; },
      querySelectorAll(selector) { return selector === '[data-hk-koel-preview]' ? [poster, preview] : []; },
    };
    return card;
  });
  class Audio extends Element {
    constructor() { super('audio'); this.paused = true; this.currentTime = 0; this.playCalls = 0; audios.push(this); }
    play() { this.playCalls++; this.paused = false; this.emit('playing'); return this.result || Promise.resolve(); }
    pause() { this.paused = true; this.emit('pause'); }
    load() {}
  }
  const window = {
    Audio,
    matchMedia() { return { matches: reduced, addEventListener() {} }; },
    addEventListener() {},
    requestAnimationFrame(callback) { frames.set(++frameId, callback); return frameId; },
    cancelAnimationFrame(id) { frames.delete(id); },
    AudioContext: class {
      constructor() { if (graphFails) throw Error('No analyser'); this.state = 'running'; }
      createMediaElementSource() { return { connect() {} }; }
      createAnalyser() { return { connect() {}, fftSize: 256, getByteTimeDomainData(data) { data.fill(160); } }; }
    },
  };
  const environment = {
    window, Uint8Array, Math,
    document: {
      querySelector(selector) { return selector === '#koel-dialog' ? dialog : null; },
      querySelectorAll(selector) { return selector === '[data-hk-koel]' ? cards : []; },
      createElement: tag => new Element(tag), createElementNS: (_, tag) => new Element(tag),
    },
  };
  vm.runInNewContext(readFileSync(join(__dirname, '../assets/js/inline-preview.js'), 'utf8'), environment);
  vm.runInNewContext(readFileSync(join(__dirname, '../assets/js/main.js'), 'utf8'), environment);
  return { cards, audios, frames, modalOpens: () => modalOpens };
}

test('preview plays inline and the same button pauses, without creating any modal', async () => {
  const { cards, audios, frames, modalOpens } = setup();
  cards[0].preview.emit('click'); await Promise.resolve();
  assert.equal(audios.length, 1);
  assert.equal(audios[0].src, 'assets/audio/preview-sample.mp3');
  assert.equal(audios[0].playCalls, 1);
  assert.equal(modalOpens(), 0);
  assert.equal(cards[0].preview.attributes['aria-pressed'], 'true');
  assert.match(cards[0].preview.attributes['aria-label'], /Pause.*demo.*Holi Kite Play/i);
  assert.equal(frames.size, 1);
  cards[0].preview.emit('click');
  assert.equal(audios[0].paused, true);
  assert.equal(cards[0].preview.attributes['aria-pressed'], 'false');
  assert.equal(frames.size, 0);
});

test('switching cards uses one audio element and clears the previous waveform', async () => {
  const { cards, audios } = setup();
  cards[1].dataset.previewSrc = 'assets/audio/kerala.mp3';
  cards[0].preview.emit('click');
  cards[1].poster.emit('click'); await Promise.resolve();
  assert.equal(audios.length, 1);
  assert.equal(audios[0].src, 'assets/audio/kerala.mp3');
  assert.equal(cards[0].preview.attributes['aria-pressed'], 'false');
  assert.equal(cards[1].preview.attributes['aria-pressed'], 'true');
  assert.equal(cards[1].preview.attributes['aria-label'], 'Pause preview for Kerala Houseboat');
});

test('ending or failing audio clears playing state and allows retry', async () => {
  const { cards, audios, frames } = setup();
  cards[0].preview.emit('click'); await Promise.resolve();
  audios[0].emit('ended');
  assert.equal(cards[0].preview.attributes['aria-pressed'], 'false');
  assert.equal(frames.size, 0);
  audios[0].result = Promise.reject(Error('Unavailable'));
  cards[0].preview.emit('click'); await new Promise(setImmediate);
  assert.equal(cards[0].preview.attributes['aria-pressed'], 'false');
  assert.match(cards[0].preview.attributes['aria-label'], /retry/i);
});

test('a late play rejection cannot stop the newly selected card', async () => {
  const { cards, audios } = setup();
  cards[0].preview.emit('click'); await Promise.resolve();
  cards[0].preview.emit('click');
  let reject;
  audios[0].result = new Promise((_, fail) => { reject = fail; });
  cards[0].preview.emit('click');
  audios[0].result = Promise.resolve();
  cards[1].preview.emit('click');
  reject(Error('Interrupted')); await Promise.resolve(); await Promise.resolve();
  assert.equal(cards[1].preview.attributes['aria-pressed'], 'true');
  assert.equal(audios[0].paused, false);
});

test('reduced motion keeps playback usable without animation frames', () => {
  const { cards, audios, frames } = setup({ reduced: true });
  cards[0].preview.emit('click');
  assert.equal(audios[0].playCalls, 1);
  assert.equal(cards[0].preview.attributes['aria-pressed'], 'true');
  assert.equal(frames.size, 0);
});

test('an unavailable analyser does not prevent audio playback', () => {
  const { cards, audios, frames } = setup({ graphFails: true });
  cards[0].preview.emit('click');
  assert.equal(audios[0].playCalls, 1);
  assert.equal(cards[0].preview.attributes['aria-pressed'], 'true');
  assert.equal(frames.size, 0);
});

test('missing audio does not pretend to play', () => {
  const { cards, audios } = setup({ src: '' });
  cards[0].preview.emit('click');
  assert.equal(audios.length, 0);
  assert.equal(cards[0].preview.attributes['aria-pressed'], 'false');
  assert.match(cards[0].preview.attributes['aria-label'], /unavailable/i);
});

test('a delayed pause event from the previous card cannot clear new playback', () => {
  const { cards, audios } = setup();
  cards[0].preview.emit('click');
  cards[1].preview.emit('click');
  audios[0].emit('pause');
  assert.equal(cards[1].preview.attributes['aria-pressed'], 'true');
});

test('pausing then resuming the same card preserves the playback position', () => {
  const { cards, audios } = setup();
  cards[0].preview.emit('click');
  audios[0].currentTime = 5;
  cards[0].preview.emit('click');
  cards[0].preview.emit('click');
  assert.equal(audios[0].currentTime, 5);
  assert.equal(audios[0].playCalls, 2);
});

test('wave bars sample the audio signal and stop scheduling frames on pause', () => {
  const { cards, audios, frames } = setup();
  cards[0].preview.emit('click');
  const bars = cards[0].preview.children[2].children;
  const before = bars[0].style.transform;
  const [id, paint] = frames.entries().next().value;
  frames.delete(id); paint();
  assert.notEqual(bars[0].style.transform, before);
  assert.equal(bars.length, 32);
  audios[0].pause();
  assert.equal(frames.size, 0);
});
