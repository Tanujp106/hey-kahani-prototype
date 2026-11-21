const { test } = require('node:test');
const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const scriptPath = join(__dirname, '../assets/js/player-page.js');

function fixture({ reduced = false, decode = () => Promise.resolve() } = {}) {
  const element = (dataset = {}) => ({
    dataset, hidden: true, attributes: {}, listeners: {}, textContent: '', tabIndex: -1,
    addEventListener(type, callback) { this.listeners[type] = callback; },
    setAttribute(key, value) { this.attributes[key] = value; },
    removeAttribute(key) { delete this.attributes[key]; },
    focus() { this.focused = true; },
    classList: { toggle() {} },
  });
  const dots = [
    element({ src: 'player.png', alt: 'Cream Player', caption: 'The Kahani Player', kind: 'product' }),
    element({ src: 'choosing.webp', alt: 'Child choosing a Koel', caption: 'A story of their choosing', kind: 'lifestyle' }),
    element({ src: 'floor.webp', alt: 'Siblings listening', caption: 'Room for imagination', kind: 'lifestyle' }),
  ];
  let image;
  const mediaElement = (src, alt, kind) => Object.assign(element({ kind }), {
    src, alt, naturalWidth: 1254, naturalHeight: 1254,
    cloneNode() { return mediaElement(this.src, this.alt, this.dataset.kind); },
    after(nextImage) { image = nextImage; },
    decode() { return decode(this.src); },
    getBoundingClientRect() { return { left: 80, top: 100, width: 480, height: 320 }; },
    remove() { this.removed = true; },
    animate(frames, options) {
      const animation = element();
      this.animation = { frames, options, listeners: animation.listeners };
      return animation;
    },
  });
  image = mediaElement('player.png', 'Cream Player', 'product');
  const caption = element(), status = element();
  const controls = element(), previous = element({ hkGalleryStep: '-1' }), next = element({ hkGalleryStep: '1' });
  const gallery = element();
  gallery.querySelector = selector => ({
    '[data-hk-gallery-image]': image, '[data-hk-gallery-caption]': caption,
    '[data-hk-gallery-status]': status,
  }[selector] || null);
  gallery.querySelectorAll = selector => ({
    '[data-hk-gallery-dot]': dots, '[data-hk-gallery-step]': [previous, next],
    '[data-hk-gallery-controls]': [controls],
  }[selector] || []);
  let additions = 0;
  const primary = { click() { additions++; } };
  const sticky = element();
  const zoom = element(), zoomImage = mediaElement(), zoomButton = element();
  zoomImage.getBoundingClientRect = () => ({ left: 320, top: 140, width: 600, height: 600 });
  zoom.showModal = () => { zoom.open = true; };
  zoom.querySelector = () => zoomImage;
  const document = {
    querySelector(selector) { return {
      '[data-hk-gallery]': gallery, '[data-hk-player-add]': primary,
      '#player-zoom': zoom, '[data-hk-gallery-zoom]': zoomButton,
    }[selector] || null; },
    querySelectorAll(selector) { return selector === '[data-hk-player-add-sticky]' ? [sticky] : []; },
  };
  if (existsSync(scriptPath)) vm.runInNewContext(readFileSync(scriptPath, 'utf8'), {
    document,
    window: { matchMedia: () => ({ matches: reduced }) },
    getComputedStyle: () => ({ opacity: '1' }),
  });
  return { dots, get image() { return image; }, caption, status, controls, previous, next, gallery, sticky, zoom, zoomImage, zoomButton, additions: () => additions };
}

test('gallery slides to the decoded image and updates its accessible selected state', async () => {
  const f = fixture();
  assert.equal(typeof f.dots[1].listeners.click, 'function', 'gallery must be initialized');
  const outgoing = f.image;
  await f.dots[1].listeners.click();
  assert.equal(f.image.src, 'choosing.webp');
  assert.equal(f.image.alt, 'Child choosing a Koel');
  assert.equal(f.image.dataset.kind, 'lifestyle');
  assert.equal(f.caption.textContent, 'A story of their choosing');
  assert.equal(f.status.textContent, 'Image 2 of 3: A story of their choosing');
  assert.equal(f.dots[1].attributes['aria-pressed'], 'true');
  assert.equal(f.dots[0].attributes['aria-pressed'], 'false');
  assert.equal(f.controls.hidden, false);
  assert.equal(outgoing.attributes['aria-hidden'], 'true');
  assert.equal(outgoing.animation.frames[1].transform, 'translateX(-110%)', 'moving forward slides the old image out to the left');
  assert.equal(f.image.animation.frames[0].transform, 'translateX(110%)', 'the new image slides in from the right');
  outgoing.animation.listeners.finish();
  assert.equal(outgoing.removed, true);
});

test('gallery wraps with buttons and keeps keyboard selection and focus together', async () => {
  const f = fixture();
  assert.equal(typeof f.previous.listeners.click, 'function', 'previous control must be initialized');
  await f.previous.listeners.click();
  assert.equal(f.image.src, 'floor.webp');
  await f.next.listeners.click();
  assert.equal(f.image.src, 'player.png');
  let prevented = false;
  await f.dots[0].listeners.keydown({ key: 'ArrowRight', preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(f.image.src, 'choosing.webp');
  assert.equal(f.dots[1].focused, true);
  assert.equal(f.dots[1].tabIndex, 0);
  assert.equal(f.dots[0].tabIndex, -1);
  await f.dots[1].listeners.keydown({ key: 'End', preventDefault() {} });
  assert.equal(f.image.src, 'floor.webp');
  await f.dots[2].listeners.keydown({ key: 'Home', preventDefault() {} });
  assert.equal(f.image.src, 'player.png');
});

test('only the latest gallery selection takes effect when media load out of order', async () => {
  const pending = {};
  const f = fixture({ decode: (src) => new Promise((resolve, reject) => { pending[src] = { resolve, reject }; }) });
  const first = f.next.listeners.click();
  const second = f.next.listeners.click();
  assert.equal(f.image.src, 'player.png', 'keep showing the current image during loading');
  pending['floor.webp'].resolve();
  await second;
  pending['choosing.webp'].resolve();
  await first;
  assert.equal(f.image.src, 'floor.webp');
  const failed = f.dots[1].listeners.click();
  pending['choosing.webp'].reject();
  await failed;
  assert.equal(f.image.src, 'floor.webp', 'failed media keep the current image in place');
  assert.equal(f.dots[2].tabIndex, 0);
});

test('zoom morphs the selected image into the dialog and uses a fade for reduced motion', async () => {
  for (const reduced of [false, true]) {
    const f = fixture({ reduced });
    assert.equal(typeof f.zoomButton.listeners.click, 'function', 'zoom must be initialized');
    await f.dots[2].listeners.click();
    f.zoomButton.listeners.click();
    assert.equal(f.zoom.open, true);
    assert.equal(f.zoomImage.src, 'floor.webp');
    assert.equal(f.zoomImage.alt, 'Siblings listening');
    const [start] = f.zoomImage.animation.frames;
    if (reduced) {
      assert.equal(start.transform, undefined);
      assert.equal(start.opacity, 0);
    } else {
      assert.equal(start.transform, 'translate(-300px, -180px) scale(0.8)');
    }
  }
});

test('sticky purchase uses the same product addition as the main purchase control', () => {
  const f = fixture();
  assert.equal(typeof f.sticky.listeners.click, 'function', 'sticky purchase must be initialized');
  f.sticky.listeners.click();
  assert.equal(f.additions(), 1);
});

test('the purchase strip hides at the footer wave and returns above it', () => {
  const wave = { classList: { contains: (name) => name === 'hk-waves' } };
  const footer = { previousElementSibling: wave };
  const buybar = { hidden: true };
  const observed = [];
  let report;
  vm.runInNewContext(readFileSync(scriptPath, 'utf8'), {
    document: {
      querySelector: (selector) => ({ '.hk-pdp-buybar': buybar, '#footer': footer })[selector] ?? null,
      querySelectorAll: () => [],
    },
    window: {
      IntersectionObserver: class {
        constructor(callback) { report = callback; }
        observe(target) { observed.push(target); }
      },
    },
  });

  assert.deepEqual(observed, [wave, footer]);
  report([{ target: wave, isIntersecting: false }, { target: footer, isIntersecting: false }]);
  assert.equal(buybar.hidden, false);
  report([{ target: wave, isIntersecting: true }]);
  assert.equal(buybar.hidden, true);
  report([{ target: wave, isIntersecting: false }, { target: footer, isIntersecting: true }]);
  assert.equal(buybar.hidden, true);
  report([{ target: footer, isIntersecting: false }]);
  assert.equal(buybar.hidden, false);
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
  const listeners = {};
  const product = JSON.parse(readFileSync(join(__dirname, '../data/player.json'), 'utf8'));
  const button = {
    dataset: { hkPlayerAdd: 'Kahani Player' },
    addEventListener(type, callback) { listeners.primary = callback; },
    click() { listeners.primary({ currentTarget: button }); },
  };
  const sticky = { addEventListener(type, callback) { listeners.sticky = callback; } };
  const buyNow = ['main', 'sticky'].map((location) => ({
    hidden: true,
    addEventListener(type, callback) { listeners[`buy-now-${location}`] = callback; },
  }));
  const count = { textContent: '' };
  const total = { textContent: '' };
  const price = { dataset: { productHandle: product.handle, priceMinor: String(product.priceMinor), currency: product.currency } };
  const section = { querySelector(selector) { return {
    '[data-hk-player-add]': button, '[data-hk-player-price]': price,
    '.hk-player__photo': { src: '../assets/images/product/player-cutout.png' },
  }[selector] || null; } };
  const message = { textContent: '' };
  const snackbar = { querySelector: () => message, classList: { add() {}, remove() {} } };
  const bag = {
    open: false,
    showModal() { this.open = true; },
    querySelector: selector => selector === '[data-hk-bag-total]' ? total : null,
  };
  const environment = {
    document: {
      addEventListener() {},
      querySelector(selector) { return {
        '#player': section, '#bag-dialog': bag,
        '[data-hk-player-add]': button, '[data-hk-snackbar]': snackbar,
      }[selector] || null; },
      querySelectorAll(selector) { return {
        '.hk-nav__bag-count': [count], '[data-hk-player-add-sticky]': [sticky],
        '[data-hk-player-buy-now]': buyNow,
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
  assert.equal(bag.open, false);
  assert.ok(buyNow.every((button) => !button.hidden));
  listeners['buy-now-main']();
  assert.equal(count.textContent, '3');
  assert.equal(bag.open, true);
  listeners['buy-now-main']();
  assert.equal(count.textContent, '3', 'do not add again while the bag is open');
  bag.open = false;
  listeners['buy-now-sticky']();
  assert.equal(count.textContent, '4');
  assert.equal(bag.open, true);
  assert.equal(price.dataset.priceMinor, '12900');
});

test('both Player offer snapshots match the approved prices and derived discount', () => {
  const product = JSON.parse(readFileSync(join(__dirname, '../data/player.json'), 'utf8'));
  const html = readFileSync(join(__dirname, '../kahani-player/index.html'), 'utf8');
  const prices = [...html.matchAll(/<p\b[^>]*\bdata-hk-player-price(?:-snapshot)?\b[^>]*>[\s\S]*?<\/p>/g)];
  const percent = Math.round((1 - product.priceMinor / product.compareAtPriceMinor) * 100);
  assert.equal(prices.length, 2);
  for (const [price] of prices) {
    assert.ok(price.includes(`data-price-minor="${product.priceMinor}"`));
    assert.ok(price.includes(`data-compare-at-price-minor="${product.compareAtPriceMinor}"`));
    assert.ok(price.includes(`$${product.priceMinor / 100}</span>`));
    assert.ok(price.includes(`$${product.compareAtPriceMinor / 100}</s>`));
    assert.ok(price.includes(`>${percent}% off<`));
  }
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
