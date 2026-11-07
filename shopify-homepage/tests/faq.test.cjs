const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const { join } = require('node:path');
const source = readFileSync(join(__dirname, '../assets/js/main.js'), 'utf8');

function setup(reducedMotion = false) {
  const timers = new Map();
  let timerId = 0;
  const items = [80, 120].map((height) => {
    const classes = new Set();
    const listeners = new Map();
    const attributes = {};
    const summary = {
      setAttribute(name, value) { attributes[name] = value; },
      addEventListener(name, listener) { listeners.set(`summary:${name}`, listener); },
    };
    const panel = {
      style: {}, offsetHeight: 0,
      addEventListener(name, listener) { listeners.set(name, listener); },
      removeEventListener(name) { listeners.delete(name); },
    };
    const content = { scrollHeight: height };
    const details = {
      open: false,
      classList: {
        contains(name) { return classes.has(name); },
        add(name) { classes.add(name); },
        remove(name) { classes.delete(name); },
        toggle(name, enabled) { enabled ? classes.add(name) : classes.delete(name); },
      },
      querySelector(selector) {
        return { summary, '.hk-faq__panel': panel, '.hk-faq__content': content }[selector];
      },
    };
    return {
      details, panel, attributes, classes,
      click() { listeners.get('summary:click')({ preventDefault() {} }); },
      finish() { listeners.get('transitionend')?.({ target: panel, propertyName: 'height' }); },
    };
  });
  vm.runInNewContext(source, {
    document: {
      querySelector(selector) { return selector === '[data-hk-faq]' ? { querySelectorAll: () => items.map(item => item.details) } : null; },
      querySelectorAll() { return []; },
    },
    window: {
      matchMedia() { return { matches: reducedMotion }; },
      setTimeout(callback) { timers.set(++timerId, callback); return timerId; },
      clearTimeout(id) { timers.delete(id); },
    },
  });
  return { items, timers };
}

test('switching FAQ answers starts opening before the old answer finishes closing', async () => {
  const { items: [first, second], timers } = setup();
  first.click();
  await new Promise(setImmediate);
  first.finish();

  second.click();
  await new Promise(setImmediate);
  assert.equal(first.classes.has('is-closing'), true);
  assert.equal(first.panel.style.height, '0px');
  assert.equal(second.details.open, true, 'new answer must open while the old one is still closing');
  assert.equal(second.panel.style.height, '120px');
  assert.equal(second.attributes['aria-expanded'], 'true');

  second.finish();
  first.finish();
  assert.equal(first.details.open, false);
  assert.equal(second.panel.style.height, 'auto');
  assert.equal(timers.size, 0);
  second.click();
  second.finish();
  assert.equal(second.details.open, false);
});

test('reduced motion switches FAQ answers immediately without animation timers', () => {
  const { items: [first, second], timers } = setup(true);
  first.click();
  second.click();
  assert.equal(first.details.open, false);
  assert.equal(second.details.open, true);
  assert.equal(second.attributes['aria-expanded'], 'true');
  assert.equal(timers.size, 0);
});
