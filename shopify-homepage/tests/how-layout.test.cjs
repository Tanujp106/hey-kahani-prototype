const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const { join } = require('node:path');
const source = readFileSync(join(__dirname, '../assets/js/main.js'), 'utf8');

function setup() {
  const properties = new Map();
  const list = { style: {} };
  const heights = [80, 56, 56];
  const steps = heights.map((_, index) => {
    const active = new Set(index === 0 ? ['is-active'] : []);
    const listeners = {};
    const text = { get scrollHeight() { return heights[index]; } };
    const reveal = { getBoundingClientRect() { return { height: active.has('is-active') ? 80 : 0 }; } };
    return {
      dataset: { hkHowStep: String(index + 1) },
      classList: { toggle(name, enabled) { enabled ? active.add(name) : active.delete(name); } },
      attributes: {},
      setAttribute(name, value) { this.attributes[name] = value; },
      addEventListener(name, listener) { listeners[name] = listener; },
      querySelector(selector) { return selector.endsWith('step-text') ? text : reveal; },
      getBoundingClientRect() { return { height: 72 + reveal.getBoundingClientRect().height }; },
      click() { listeners.click(); },
      focus() {},
    };
  });
  const panels = steps.map((_, index) => ({
    dataset: { hkHowPanel: String(index + 1) },
    classList: { toggle() {} }, setAttribute() {},
  }));
  const copy = {};
  const root = {
    style: { setProperty(name, value) { properties.set(name, value); } },
    querySelectorAll(selector) { return selector.includes('step]') ? steps : panels; },
    querySelector(selector) { return selector.endsWith('__steps') ? list : copy; },
  };
  let resize;
  vm.runInNewContext(source, {
    document: {
      querySelector(selector) { return selector === '[data-hk-how]' ? root : null; },
      querySelectorAll() { return []; },
    },
    window: { matchMedia() { return { matches: true }; }, addEventListener() {} },
    getComputedStyle() { return { rowGap: '2px' }; },
    ResizeObserver: class { constructor(callback) { resize = callback; } observe() {} },
  });
  return { properties, list, steps, heights, resize };
}

test('reserves the tallest under-title description and stable list height', () => {
  const ui = setup();
  assert.equal(ui.properties.get('--hk-how-detail-height'), '80px');
  assert.equal(ui.list.style.minHeight, '300px');
  ui.steps[1].click();
  ui.steps[2].click();
  ui.steps[0].click();
  assert.equal(ui.list.style.minHeight, '300px');
  assert.deepEqual(ui.steps.map(step => step.attributes['aria-selected']), ['true', 'false', 'false']);
});

test('recalculates reserved space when text wraps at a narrower width', () => {
  const ui = setup();
  assert.equal(typeof ui.resize, 'function');
  ui.heights[0] = 104;
  ui.resize([{ contentRect: { width: 280 } }]);
  assert.equal(ui.properties.get('--hk-how-detail-height'), '104px');
  assert.equal(ui.list.style.minHeight, '324px');
});
