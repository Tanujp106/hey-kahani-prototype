import test from 'node:test';
import assert from 'node:assert/strict';
import { initProductExperience } from '../assets/js/product-experience.js';

// DOM/WAAPI boundaries only; the production controller owns every state change.
function setup() {
  const frames = [];
  const tracks = [];
  let scroll = 0;
  const win = new EventTarget();
  Object.assign(win, {
    innerWidth: 1440, innerHeight: 900, scrollY: 0,
    matchMedia: query => ({ matches: query.includes('pointer: fine'), addEventListener() {} })
  });
  function element() {
    const node = new EventTarget();
    const classes = new Set();
    Object.assign(node, {
      dataset: {}, style: { transform: '', opacity: '', transition: '', setProperty(key, value) { this[key] = value; } },
      classList: {
        add: (...names) => names.forEach(name => classes.add(name)),
        remove: (...names) => names.forEach(name => classes.delete(name)),
        contains: name => classes.has(name),
        toggle: (name, on) => on ? classes.add(name) : classes.delete(name)
      },
      clientWidth: 400, clientHeight: 600,
      setAttribute() {}, removeAttribute() {},
      querySelector: () => null,
      animate(keyframes) {
        const track = {
          node, keyframes, currentTime: null, playState: 'running',
          pause() { this.playState = 'paused'; },
          play() { this.playState = 'running'; },
          cancel() { this.playState = 'idle'; this.currentTime = null; }
        };
        tracks.push(track);
        return track;
      }
    });
    return node;
  }
  const player = element();
  const image = { naturalWidth: 1072, naturalHeight: 1467 };
  player.querySelector = selector => selector === 'img' ? image : null;
  const koels = Array.from({ length: 4 }, (_, index) => {
    const layer = element();
    const shell = element();
    shell.getBoundingClientRect = () => ({ left: 0, top: 0, width: 200, height: 200 });
    layer.dataset.hkKoel = String(index);
    layer.querySelector = selector => selector === 'img'
      ? { naturalWidth: 1295, naturalHeight: 1214 }
      : selector === '[data-hk-koel-hover]' ? shell : null;
    return layer;
  });
  const story = element();
  const captions = ['choose', 'tap', 'listen'].map(name => {
    const caption = element();
    caption.dataset.hkCaption = name;
    return caption;
  });
  const layers = { player, shadow: element(), signal: element() };
  story.getBoundingClientRect = () => ({ top: 120 - scroll });
  story.querySelector = selector => selector === '[data-hk-story-stage]'
    ? element() : layers[selector.match(/data-hk-story-layer="(.*?)"/)?.[1]];
  story.querySelectorAll = selector => {
    if (selector === '[data-hk-koel]') return koels;
    if (selector === '[data-hk-caption]') return captions;
    if (selector === '[data-hk-story-panel]') return [0, 780, 1680, 2580].map(top => ({
      getBoundingClientRect: () => ({
        top: 120 - scroll + top,
        bottom: 120 - scroll + top + 900
      })
    }));
    return [];
  };
  globalThis.window = win;
  globalThis.document = {};
  globalThis.Element = class { animate() {} };
  globalThis.requestAnimationFrame = callback => { frames.push(callback); return frames.length; };
  globalThis.cancelAnimationFrame = () => {};
  const flush = () => { while (frames.length) frames.shift()(); };
  initProductExperience({ querySelector: () => story });
  return {
    story, koels, captions, tracks, flush,
    scrollTo(value) {
      scroll = value;
      win.scrollY = value;
      win.dispatchEvent(new Event('scroll'));
      flush();
    }
  };
}

test('scrolling back from a docked Koel restores its entrance animation', () => {
  const env = setup();
  env.scrollTo(1900);
  assert.equal(env.story.classList.contains('is-koel-docked'), true);
  env.scrollTo(600);
  assert.equal(env.story.classList.contains('is-koel-docked'), false);
  for (const layer of env.koels) {
    const track = env.tracks.findLast(track => track.node === layer);
    assert.equal(track.playState, 'paused', 'Reverse scrolling must restore the canceled timeline');
    assert.ok(track.currentTime > 0 && track.currentTime < 1000);
    assert.equal(layer.style.transform, '', 'Remove the dock transform when scrolling owns the Koel');
  }
  env.scrollTo(1900);
  assert.equal(env.koels[0].classList.contains('is-docked'), true);
});

test('theater captions crossfade with scroll panels', () => {
  const env = setup();
  env.scrollTo(100);
  assert.equal(env.story.classList.contains('is-story-theater'), false);
  assert.equal(env.captions.every(caption => !caption.classList.contains('is-active')), true);
  env.scrollTo(900);
  assert.equal(env.story.classList.contains('is-story-theater'), true);
  assert.equal(env.captions[0].classList.contains('is-active'), true, 'Choose caption enters with theater');
  env.scrollTo(1900);
  assert.equal(env.captions[0].classList.contains('is-active'), false);
  assert.equal(env.captions[1].classList.contains('is-active'), true, 'Tap caption replaces choose');
  env.scrollTo(2800);
  assert.equal(env.captions[1].classList.contains('is-active'), false);
  assert.equal(env.captions[2].classList.contains('is-active'), true, 'Listen caption arrives as the third beat');
});

test('Koel hover responds on both sides of its center', () => {
  const env = setup();
  env.scrollTo(1900);
  const shell = env.koels[1].querySelector('[data-hk-koel-hover]');
  for (const [position, horizontalSign, verticalSign] of [[0, -1, 1], [200, 1, -1]]) {
    const event = new Event('pointermove');
    Object.assign(event, { clientX: position, clientY: position });
    shell.dispatchEvent(event);
    env.flush();
    const [, yaw, pitch] = shell.style.transform.match(/rotateY\(([-\d.]+)deg\) rotateX\(([-\d.]+)deg\)/);
    assert.equal(Math.sign(Number(yaw)), horizontalSign);
    assert.equal(Math.sign(Number(pitch)), verticalSign);
  }
});
