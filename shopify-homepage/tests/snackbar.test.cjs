const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');

function setup() {
  const timers = new Map(); let timerId = 0;
  function element() {
    const classes = new Set(); const listeners = {};
    return {
      textContent: '', attributes: {}, innerHTML: '', classes,
      classList: { add: name => classes.add(name), remove: name => classes.delete(name) },
      setAttribute(name, value) { this.attributes[name] = value; },
      addEventListener(name, callback) { listeners[name] = callback; },
      click() { listeners.click(); },
    };
  }
  const message = element(); const snackbar = element();
  snackbar.querySelector = selector => selector === '[data-hk-snackbar-message]' ? message : null;
  const cards = ['Holi Kite Play', 'Kerala Houseboat'].map(title => {
    const add = element();
    return { dataset: { title }, add, querySelectorAll: selector => selector === '[data-hk-koel-add]' ? [add] : [] };
  });
  const environment = {
    document: {
      querySelector: selector => selector === '[data-hk-snackbar]' ? snackbar : null,
      querySelectorAll: selector => selector === '[data-hk-koel]' ? cards : [],
    },
    window: {
      addEventListener() {},
      matchMedia() { return { matches: true }; },
      setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id; },
      clearTimeout(id) { timers.delete(id); },
    },
  };
  vm.runInNewContext(readFileSync(join(__dirname, '../assets/js/main.js'), 'utf8'), environment);
  return { cards, snackbar, message, timers };
}

test('adding a product shows its confirmation and dismisses the snackbar automatically', () => {
  const { cards, snackbar, message, timers } = setup();
  cards[0].add.click();
  assert.equal(message.textContent, 'Holi Kite Play added to bag');
  assert.equal(snackbar.classes.has('is-visible'), true);
  const dismissal = [...timers.values()].find(timer => timer.delay === 3500);
  assert.ok(dismissal, 'confirmation should have a dismissal timer');
  dismissal.callback();
  assert.equal(snackbar.classes.has('is-visible'), false);
});

test('another add updates the same snackbar and replaces its old dismissal timer', () => {
  const { cards, snackbar, message, timers } = setup();
  cards[0].add.click();
  const firstDismissal = [...timers].find(([, timer]) => timer.delay === 3500)[0];
  cards[1].add.click();
  assert.equal(message.textContent, 'Kerala Houseboat added to bag');
  assert.equal(snackbar.classes.has('is-visible'), true);
  assert.equal(timers.has(firstDismissal), false);
  assert.equal([...timers.values()].filter(timer => timer.delay === 3500).length, 1);
});
