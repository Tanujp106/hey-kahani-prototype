const { test } = require('node:test');
const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const scriptPath = join(__dirname, '../assets/js/player-page.js');

function fixture() {
  const element = (dataset = {}) => ({
    dataset, hidden: true, attributes: {}, listeners: {}, textContent: '', tabIndex: -1,
    addEventListener(type, callback) { this.listeners[type] = callback; },
    setAttribute(key, value) { this.attributes[key] = value; },
    focus() { this.focused = true; },
    classList: { toggle() {} },
  });
  const thumbs = [
    element({ src: 'player.png', alt: 'Cream Player', caption: 'The Kahani Player', kind: 'product' }),
    element({ src: 'choosing.webp', alt: 'Child choosing a Koel', caption: 'A story of their choosing', kind: 'lifestyle' }),
    element({ src: 'floor.webp', alt: 'Siblings listening', caption: 'Room for imagination', kind: 'lifestyle' }),
  ];
  const image = element(), caption = element(), status = element();
  const controls = element(), previous = element({ hkGalleryStep: '-1' }), next = element({ hkGalleryStep: '1' });
  const gallery = element();
  gallery.querySelector = selector => ({
    '[data-hk-gallery-image]': image, '[data-hk-gallery-caption]': caption,
    '[data-hk-gallery-status]': status,
  }[selector] || null);
  gallery.querySelectorAll = selector => ({
    '[data-hk-gallery-thumb]': thumbs, '[data-hk-gallery-step]': [previous, next],
    '[data-hk-gallery-controls]': [controls],
  }[selector] || []);
  let additions = 0;
  const primary = { click() { additions++; } };
  const sticky = element();
  const zoom = element(), zoomImage = element(), zoomButton = element();
  zoom.showModal = () => { zoom.open = true; };
  zoom.querySelector = () => zoomImage;
  const document = {
    querySelector(selector) { return {
      '[data-hk-gallery]': gallery, '[data-hk-player-add]': primary,
      '#player-zoom': zoom, '[data-hk-gallery-zoom]': zoomButton,
    }[selector] || null; },
    querySelectorAll(selector) { return selector === '[data-hk-player-buy]' ? [sticky] : []; },
  };
  if (existsSync(scriptPath)) vm.runInNewContext(readFileSync(scriptPath, 'utf8'), { document });
  return { thumbs, image, caption, status, controls, previous, next, gallery, sticky, zoom, zoomImage, zoomButton, additions: () => additions };
}

test('gallery selection updates image, description and accessible selected state', () => {
  const f = fixture();
  assert.equal(typeof f.thumbs[1].listeners.click, 'function', 'gallery must be initialized');
  f.thumbs[1].listeners.click();
  assert.equal(f.image.src, 'choosing.webp');
  assert.equal(f.image.alt, 'Child choosing a Koel');
  assert.equal(f.image.dataset.kind, 'lifestyle');
  assert.equal(f.caption.textContent, 'A story of their choosing');
  assert.equal(f.status.textContent, 'Image 2 of 3: A story of their choosing');
  assert.equal(f.thumbs[1].attributes['aria-pressed'], 'true');
  assert.equal(f.thumbs[0].attributes['aria-pressed'], 'false');
  assert.equal(f.controls.hidden, false);
});

test('gallery wraps with buttons and keeps keyboard selection and focus together', () => {
  const f = fixture();
  assert.equal(typeof f.previous.listeners.click, 'function', 'previous control must be initialized');
  f.previous.listeners.click();
  assert.equal(f.image.src, 'floor.webp');
  f.next.listeners.click();
  assert.equal(f.image.src, 'player.png');
  let prevented = false;
  f.thumbs[0].listeners.keydown({ key: 'ArrowRight', preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(f.image.src, 'choosing.webp');
  assert.equal(f.thumbs[1].focused, true);
  assert.equal(f.thumbs[1].tabIndex, 0);
  assert.equal(f.thumbs[0].tabIndex, -1);
  f.thumbs[1].listeners.keydown({ key: 'End', preventDefault() {} });
  assert.equal(f.image.src, 'floor.webp');
  f.thumbs[2].listeners.keydown({ key: 'Home', preventDefault() {} });
  assert.equal(f.image.src, 'player.png');
});

test('zoom opens the selected image with its accessible description', () => {
  const f = fixture();
  assert.equal(typeof f.zoomButton.listeners.click, 'function', 'zoom must be initialized');
  f.thumbs[2].listeners.click();
  f.zoomButton.listeners.click();
  assert.equal(f.zoom.open, true);
  assert.equal(f.zoomImage.src, 'floor.webp');
  assert.equal(f.zoomImage.alt, 'Siblings listening');
});

test('sticky purchase uses the same product addition as the main purchase control', () => {
  const f = fixture();
  assert.equal(typeof f.sticky.listeners.click, 'function', 'sticky purchase must be initialized');
  f.sticky.listeners.click();
  assert.equal(f.additions(), 1);
});

test('story rails provide playable demo audio that resolves from the nested Player route', () => {
  const page = join(__dirname, '../kahani-player/index.html');
  const html = readFileSync(page, 'utf8');
  for (const id of ['koels', 'more-koels']) {
    const section = html.match(new RegExp(`<section[^>]*id="${id}"[^>]*>`))[0];
    assert.match(section, /data-preview-demo="true"/);
    const audio = section.match(/data-preview-src="([^"]+)"/)?.[1];
    assert.ok(audio, 'each story rail needs its demo audio source');
    assert.ok(existsSync(join(page, '..', audio)), `audio must resolve from the Player page: ${audio}`);
  }
});

test('Player purchase and sticky purchase both reach the shared bag with the approved price', () => {
  const listeners = {}, values = {};
  const product = JSON.parse(readFileSync(join(__dirname, '../data/player.json'), 'utf8'));
  const button = {
    dataset: { hkPlayerAdd: 'Kahani Player' },
    addEventListener(type, callback) { listeners.primary = callback; },
    click() { listeners.primary({ currentTarget: button }); },
  };
  const sticky = { addEventListener(type, callback) { listeners.sticky = callback; } };
  const count = { textContent: '' };
  const total = { textContent: '' };
  const price = { dataset: { productHandle: product.handle, priceMinor: String(product.priceMinor), currency: product.currency } };
  const section = { querySelector(selector) { return {
    '[data-hk-player-add]': button, '[data-hk-player-price]': price,
    '.hk-player__photo': { src: '../assets/images/product/player-cutout.png' },
  }[selector] || null; } };
  const message = { textContent: '' };
  const snackbar = { querySelector: () => message, classList: { add() {}, remove() {} } };
  const bag = { querySelector: selector => selector === '[data-hk-bag-total]' ? total : null };
  const environment = {
    document: {
      addEventListener() {},
      querySelector(selector) { return {
        '#player': section, '#bag-dialog': bag,
        '[data-hk-player-add]': button, '[data-hk-snackbar]': snackbar,
      }[selector] || null; },
      querySelectorAll(selector) { return {
        '.hk-nav__bag-count': [count], '[data-hk-player-buy]': [sticky],
      }[selector] || []; },
    },
    window: { matchMedia: () => ({ matches: true }), addEventListener() {}, setTimeout() {}, clearTimeout() {} },
  };
  vm.runInNewContext(readFileSync(join(__dirname, '../assets/js/main.js'), 'utf8'), environment);
  vm.runInNewContext(readFileSync(scriptPath, 'utf8'), environment);
  button.click();
  assert.equal(message.textContent, 'Kahani Player added to bag');
  assert.equal(count.textContent, '1');
  listeners.sticky();
  assert.equal(count.textContent, '2');
  // The same product is added twice, with no second price or product identity owned by page JS.
  assert.equal(price.dataset.priceMinor, '12900');
});

function bagPage(storage, baseURI = 'https://shop.example/', koelImage = 'assets/images/koels/holi.png') {
  let purchase, addKoel;
  const koelButton = { addEventListener(type, callback) { addKoel = callback; }, classList: { add() {}, remove() {} }, setAttribute() {} };
  const card = { dataset: { title: 'Holi Kite Play', meta: 'A Kahani Original', image: koelImage }, querySelector: () => ({ textContent: '$9.99' }), querySelectorAll: () => [koelButton] };
  const count = { textContent: '' };
  const button = { dataset: { hkPlayerAdd: 'Kahani Player' }, addEventListener(type, callback) { purchase = callback; } };
  const section = { querySelector(selector) { return {
    '[data-hk-player-add]': button,
    '[data-hk-player-price]': { dataset: { productHandle: 'kahani-player', priceMinor: '12900' } },
    '.hk-player__photo': { src: new URL('assets/images/product/player-cutout.png', 'https://shop.example/').href },
  }[selector] || null; } };
  const environment = {
    URL,
    document: {
      baseURI, addEventListener() {},
      querySelector: selector => selector === '#player' ? section : null,
      querySelectorAll: selector => ({ '.hk-nav__bag-count': [count], '[data-hk-koel]': [card] }[selector] || []),
    },
    window: { sessionStorage: storage, matchMedia: () => ({ matches: true }), addEventListener() {}, setTimeout() {}, clearTimeout() {} },
  };
  vm.runInNewContext(readFileSync(join(__dirname, '../assets/js/main.js'), 'utf8'), environment);
  return { count, add: () => purchase({ currentTarget: button }), addKoel: () => addKoel() };
}

test('bag survives navigation between homepage and Player page in the same tab', () => {
  const entries = new Map();
  const storage = { getItem: key => entries.get(key) || null, setItem: (key, value) => entries.set(key, value) };
  const homepage = bagPage(storage);
  homepage.add();
  const playerPage = bagPage(storage, 'https://shop.example/kahani-player/');
  assert.equal(playerPage.count.textContent, '1');
  playerPage.add();
  const returned = bagPage(storage);
  assert.equal(returned.count.textContent, '2');
  const saved = JSON.parse([...entries.values()][0]);
  assert.equal(saved[0].price, 129);
  assert.equal(saved[0].qty, 2);
  assert.equal(saved[0].image, 'https://shop.example/assets/images/product/player-cutout.png');
});

test('corrupt or unavailable tab storage does not prevent adding a product', () => {
  for (const storage of [
    { getItem: () => '{bad json', setItem() {} },
    { getItem: () => '[{"key":"bad","qty":-4,"price":null}]', setItem() {} },
    { getItem: () => { throw new Error('Storage denied'); }, setItem: () => { throw new Error('Storage denied'); } },
  ]) {
    const page = bagPage(storage);
    assert.equal(page.count.textContent, '0');
    page.add();
    assert.equal(page.count.textContent, '1');
  }
});


test('the same Koel merges across pages whose artwork paths use different relative prefixes', () => {
  const entries = new Map();
  const storage = { getItem: key => entries.get(key) || null, setItem: (key, value) => entries.set(key, value) };
  bagPage(storage).addKoel();
  bagPage(storage, 'https://shop.example/kahani-player/', '../assets/images/koels/holi.png').addKoel();
  const saved = JSON.parse([...entries.values()][0]);
  assert.equal(saved.length, 1);
  assert.equal(saved[0].qty, 2);
  assert.equal(saved[0].image, 'https://shop.example/assets/images/koels/holi.png');
});
