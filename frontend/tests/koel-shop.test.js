import test from 'node:test';
import assert from 'node:assert/strict';
import { initKoelShop } from '../assets/js/koel-shop.js';

class FakeNode {
  constructor(tag = 'div') {
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.attrs = {};
    this.dataset = {};
    this.style = { setProperty() {}, removeProperty() {}, background: '' };
    this.removeAttribute = () => {};
    this.listeners = {};
    this.textContent = '';
    this.className = '';
    this.id = '';
  }
  setAttribute(key, value) { this.attrs[key] = String(value); }
  getAttribute(key) { return this.attrs[key] ?? null; }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes; }
  addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); }
  removeEventListener(type, fn) {
    this.listeners[type] = (this.listeners[type] || []).filter(item => item !== fn);
  }
  querySelector() { return null; }
  closest() { return null; }
}

const products = Array.from({ length: 15 }, (_, index) => ({
  handle: `koel-${index + 1}`,
  title: `Koel ${index + 1}`,
  images: [],
  priceMinor: null,
  currency: null,
  metadata: { coinTone: 'husk', previewHandle: null }
}));

test('desktop pedestal paints 6-5-4 coin tiers for 15 Koels', () => {
  const originalMatchMedia = globalThis.matchMedia;
  globalThis.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  globalThis.document = {
    createElement: tag => new FakeNode(tag),
    getElementById: () => null
  };
  const root = new FakeNode('div');
  const cleanup = initKoelShop({ products, shopRoot: root, dialog: null });
  assert.equal(root.children.length, 3);
  assert.deepEqual(root.children.map(tier => tier.children.length), [6, 5, 4]);
  // Hero CSS owns .hk-koel-coin (height:100%, rotation and idle animation).
  // Collection controls must never pick up those scene rules.
  for (const tier of root.children) {
    for (const coin of tier.children) {
      assert.equal(coin.className, 'hk-shop-koel');
      assert.ok(coin.attrs['aria-label'].startsWith('Open Koel'));
    }
  }
  cleanup();
  globalThis.matchMedia = originalMatchMedia;
});

test('mobile pedestal paints five tiers of three', () => {
  globalThis.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
  globalThis.document = {
    createElement: tag => new FakeNode(tag),
    getElementById: () => null
  };
  const root = new FakeNode('div');
  const cleanup = initKoelShop({ products, shopRoot: root, dialog: null });
  assert.equal(root.children.length, 5);
  assert.deepEqual(root.children.map(tier => tier.children.length), [3, 3, 3, 3, 3]);
  cleanup();
});
