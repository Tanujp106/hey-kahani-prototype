import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { renderFixtures } from '../assets/js/render-fixtures.js';

// Small DOM boundary for running the real adapter against the shipped HTML.
// Geometry and browser rendering are deliberately outside this integration test.
class Node {
  constructor(tag = 'document') {
    this.tagName = tag; this.children = []; this.attrs = {}; this.dataset = {};
    this.style = { setProperty() {} }; this.listeners = {}; this.isConnected = true;
  }
  setAttribute(name, value) {
    this.attrs[name] = value;
    if (name === 'id') this.id = value;
    if (name === 'class') this.className = value;
    if (name.startsWith('data-')) this.dataset[name.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value;
  }
  removeAttribute(name) { delete this.attrs[name]; }
  append(...nodes) { for (const node of nodes) { node.parent = this; node.ownerDocument = this.ownerDocument || this; this.children.push(node); } }
  replaceChildren(...nodes) { this.children = []; this.append(...nodes); }
  matches(selector) {
    return selector.split(',').some(part => {
      part = part.trim();
      const attr = part.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);
      if (attr) {
        const key = attr[1].startsWith('data-') ? attr[1].slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase()) : null;
        const value = key === null ? this.attrs[attr[1]] : this.dataset[key];
        return value !== undefined && (attr[2] === undefined || value === attr[2]);
      }
      if (part.startsWith('.')) return (this.className || '').split(' ').includes(part.slice(1));
      if (part.startsWith('#')) return this.id === part.slice(1);
      return this.tagName === part;
    });
  }
  querySelectorAll(selector) { return this.children.flatMap(node => [...(node.matches(selector) ? [node] : []), ...node.querySelectorAll(selector)]); }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  getElementById(id) { return this.querySelector(`#${id}`); }
  createElement(tag) { const node = new Node(tag); node.ownerDocument = this; return node; }
  createTextNode(text) {
    const node = new Node('#text');
    node.textContent = String(text);
    node.ownerDocument = this;
    return node;
  }
  closest(selector) { return this.matches(selector) ? this : this.parent?.closest(selector); }
  contains(node) { return node === this || this.children.some(child => child.contains(node)); }
  remove() { this.parent.children = this.parent.children.filter(node => node !== this); }
  addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); }
  dispatchEvent(event) { for (const listener of this.listeners[event.type] || []) listener(event); return !event.defaultPrevented; }
  getBoundingClientRect() { return { left: 0, top: 0, width: 0, height: 0 }; }
  showModal() { this.open = true; }
  close() { this.open = false; this.dispatchEvent(new Event('close')); }
  focus() {}
  pause() {}
}
async function page(t) {
  const doc = new Node();
  doc.defaultView = { innerWidth: 1200, innerHeight: 800 };
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const stack = [doc];
  for (const match of html.matchAll(/<(\/?)([a-z][\w:-]*)\b([^>]*)>/gi)) {
    const [, closing, tag, attributes] = match;
    if (closing) { while (stack.length > 1 && stack.pop().tagName !== tag) {} continue; }
    const node = doc.createElement(tag);
    for (const attr of attributes.matchAll(/([^\s=/>]+)(?:="([^"]*)"|='([^']*)')?/g)) node.setAttribute(attr[1], attr[2] ?? attr[3] ?? '');
    stack.at(-1).append(node);
    if (!['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'].includes(tag) && !attributes.endsWith('/')) stack.push(node);
  }
  const original = { document: globalThis.document, fetch: globalThis.fetch, matchMedia: globalThis.matchMedia };
  t.after(() => Object.assign(globalThis, original));
  globalThis.document = doc;
  globalThis.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  globalThis.fetch = async url => ({ ok: true, json: async () => JSON.parse(await readFile(url, 'utf8')) });
  return doc;
}

test('the shipped homepage renders all 15 Koels and opens their preview', async t => {
  const doc = await page(t);
  const result = await renderFixtures();
  assert.equal(result.featuredKoels.length, 15);
  const shop = doc.querySelector('[data-hk-koel-shop]');
  assert.deepEqual(shop.children.map(tier => tier.children.length), [6, 5, 4]);
  const coin = shop.children[0].children[0];
  shop.dispatchEvent({ type: 'click', target: coin });
  assert.equal(doc.getElementById('koel-dialog').open, true);
  assert.equal(doc.querySelector('[data-hk-koel-dialog-title]').textContent, 'Daily Life Koel');
  assert.equal(doc.querySelector('[data-hk-data-status]').textContent, '');
});

test('a missing navigation section cannot prevent the collection from rendering', async t => {
  const doc = await page(t);
  doc.getElementById('primary-navigation').remove();
  await renderFixtures();
  assert.equal(doc.querySelector('[data-hk-koel-shop]').children.length, 3);
});
