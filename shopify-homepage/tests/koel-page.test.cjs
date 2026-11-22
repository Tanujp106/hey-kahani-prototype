/**
 * Koel product template: one page renders every Koel from the embedded catalogue.
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');

const ROOT = join(__dirname, '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const page = read('koel/index.html');
const script = read('assets/js/koel-page.js');
const catalog = JSON.parse(page.match(/<script type="application\/json" id="hk-koel-catalog">([\s\S]*?)<\/script>/)[1]);
const decode = (value) => value.replaceAll('&amp;', '&');

test('there is one Koel page, and it renders the catalogue rather than per-Koel files', () => {
  assert.ok(existsSync(join(ROOT, 'koel/index.html')));
  const handles = catalog.koels.map((koel) => koel.handle);
  assert.equal(new Set(handles).size, handles.length, 'handles are unique');
  for (const handle of handles) assert.ok(!existsSync(join(ROOT, `koel/${handle}`)), `no separate page for ${handle}`);
});

test('the catalogue matches the Koel records already on the homepage', () => {
  const home = read('index.html');
  const re = /data-collection="([^"]+)"\s+data-title="([^"]+)"\s+data-meta="([^"]+)"\s+data-image="assets\/images\/koels\/([^"]+)">[\s\S]*?data-price-kind="mock">\$([0-9.]+)</g;
  const records = new Map([...home.matchAll(re)].map((m) => [decode(m[2]), { collection: m[1], meta: m[3], image: m[4], price: Math.round(Number(m[5]) * 100) }]));
  assert.equal(catalog.koels.length, records.size, 'every homepage Koel has a page record');
  for (const koel of catalog.koels) {
    const record = records.get(koel.title);
    assert.ok(record, `${koel.title} is a homepage Koel`);
    assert.equal(koel.collection, record.collection, `${koel.title} collection`);
    assert.equal(koel.meta, record.meta, `${koel.title} meta`);
    assert.equal(koel.image, record.image, `${koel.title} image`);
    assert.equal(koel.priceMinor, record.price, `${koel.title} price`);
    assert.ok(existsSync(join(ROOT, 'assets/images/koels', koel.image)), `${koel.image} exists`);
    assert.ok(catalog.collections[koel.collection], `${koel.collection} has an icon`);
  }
});

test('prototype tracks are flagged as placeholders and add up to the runtime', () => {
  for (const koel of catalog.koels) {
    assert.equal(koel.trackStatus, 'placeholder', `${koel.title} tracks are marked as prototype data`);
    assert.equal(koel.copyStatus, 'draft');
    assert.ok(koel.tracks.length >= 5);
    const seconds = koel.tracks.reduce((sum, { duration }) => {
      const [m, s] = duration.split(':').map(Number);
      return sum + m * 60 + s;
    }, 0);
    assert.equal(koel.runtime, `About ${Math.round(seconds / 60)} minutes`);
  }
  assert.match(page, /data-hk-koel-tracks-empty>/, 'an empty record still shows the note');
});

test('story details are hidden and the purchase column carries a Player card', () => {
  assert.match(page, /<section[^>]*id="story-details"[^>]*\shidden>/);
  assert.equal((page.match(/<svg hidden class="hk-waves/g) || []).length, 2, 'both wave edges are hidden with it');
  const purchase = page.slice(page.indexOf('class="hk-pdp-purchase"'), page.indexOf('<!-- Reference order 2'));
  assert.match(purchase, /class="hk-kpdp-needs hk-tone--sky"/);
  assert.match(purchase, /player-cutout\.png/);
  assert.match(purchase, /\$129/);
  assert.match(purchase, /href="\/kahani-player\/"/);
  assert.match(page, /<article class="hk-pdp-feature hk-tone--mango">/);
});

test('the page reuses the Player components and the shared chrome', () => {
  for (const part of ['header', 'testimonials', 'faq', 'footer', 'dialogs']) {
    assert.match(page, new RegExp(`<!-- hk:${part}:start -->[\\s\\S]+?<!-- hk:${part}:end -->`));
  }
  for (const component of ['hk-pdp-hero', 'hk-pdp-gallery', 'hk-pdp-purchase', 'hk-pdp-included-band', 'hk-pdp-specs', 'hk-pdp-feature', 'hk-pdp-stories', 'hk-pdp-buybar']) {
    assert.ok(page.includes(`class="${component}`) || page.includes(` ${component}`), `uses ${component}`);
  }
  assert.ok(page.indexOf('koel-page.js') < page.indexOf('inline-preview.js'), 'the template fills in before the shared scripts bind');
  assert.ok(page.indexOf('koel-page.js') < page.indexOf('main.js'));
  const pages = JSON.parse(read('partials/pages.json')).pages;
  assert.ok(pages.find((entry) => entry.file === 'koel/index.html').faqs.length >= 4);
});

test('phones stack the description and keep 44px purchase targets', () => {
  const css = read('assets/css/koel-page.css');
  const phone = css.slice(css.indexOf('@media (max-width: 699px)'));
  assert.match(phone, /\.hk-kpdp-about \{[^}]*grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(phone, /\.hk-kpdp-preview \{ min-height: 44px; \}/);
  assert.match(css, /\.hk-kpdp-needs__cta \{ min-height: 44px;/);
  assert.match(read('assets/css/player-page.css'), /#how-koels-work\.hk-pdp-included-band/);
});

/* A small stand-in document: enough DOM for the template script. */
function render(search) {
  const el = (props = {}) => ({
    dataset: {}, attributes: {}, textContent: '', hidden: false, children: [],
    setAttribute(k, v) { this.attributes[k] = v; }, getAttribute(k) { return this.attributes[k]; },
    replaceChildren(...nodes) { this.children = nodes; }, append(...nodes) { this.children.push(...nodes); },
    querySelectorAll() { return []; }, ...props,
  });
  const fields = ['title', 'title', 'title', 'collection', 'collection', 'tagline', 'summary', 'runtime']
    .map((name) => el({ dataset: { hkKoelField: name } }));
  const prices = [el(), el()];
  const products = [0, 1].map((i) => el({ querySelectorAll: () => [prices[i]] }));
  const art = el({ tagName: 'IMG' }), artDot = el({ tagName: 'BUTTON' });
  const rail = el(), meta = el(), description = el(), icon = el();
  const card = () => {
    const parts = { collection: el(), title: el(), use: el(), price: el(), img: el(), poster: null };
    parts.poster = el({ querySelector: () => parts.img });
    return el({ parts, querySelector(selector) { return {
      '[data-card="collection"]': parts.collection, '[data-card="title"]': parts.title,
      '.hk-koel__badge-icon use': parts.use, '[data-hk-koel-price]': parts.price, '.hk-koel__poster': parts.poster,
    }[selector]; } });
  };
  const template = { content: { firstElementChild: { cloneNode: card } } };
  const document = {
    title: '',
    getElementById: (id) => ({ 'hk-koel-catalog': { textContent: JSON.stringify(catalog) }, 'hk-koel-card-template': template }[id]),
    querySelector: (s) => ({ 'meta[name="description"]': meta, '[data-hk-koel-rail]': rail, '[data-hk-koel-description]': description }[s] || null),
    querySelectorAll: (s) => ({
      '[data-hk-koel-product]': products, '[data-hk-koel-field]': fields,
      '[data-hk-koel-icon]': [icon], '[data-hk-koel-art]': [art, artDot],
    }[s] || []),
    createElement: () => el(),
  };
  vm.runInNewContext(script, { document, window: { location: { search } }, URLSearchParams, JSON, Number, encodeURIComponent });
  return { document, fields, prices, products, art, artDot, rail, description, icon };
}

test('?koel=<handle> fills every slot from that record', () => {
  const r = render('?koel=night-train');
  assert.equal(r.document.title, 'Night Train · Koel story disc · Hey Kahani');
  assert.deepEqual(r.fields.slice(0, 3).map((f) => f.textContent), ['Night Train', 'Night Train', 'Night Train']);
  assert.equal(r.fields[3].textContent, 'Wander with wonder');
  assert.equal(r.fields[7].textContent, catalog.koels.find((k) => k.handle === 'night-train').runtime);
  assert.deepEqual(r.prices.map((p) => p.textContent), ['$15.99', '$15.99']);
  for (const product of r.products) {
    assert.equal(product.dataset.title, 'Night Train');
    assert.equal(product.dataset.image, '../assets/images/koels/hk-koel-train.png');
  }
  assert.equal(r.art.src, '../assets/images/koels/hk-koel-train.png');
  assert.equal(r.art.width, 1024);
  assert.equal(r.artDot.dataset.src, '../assets/images/koels/hk-koel-train.png');
  assert.equal(r.icon.attributes.href, '#hk-lucide-compass');
  assert.equal(r.description.children.length, 2);
});

test('an unknown or missing handle falls back to the first Koel', () => {
  assert.equal(render('?koel=not-a-koel').document.title, 'Holi Kite Play · Koel story disc · Hey Kahani');
  assert.equal(render('').document.title, 'Holi Kite Play · Koel story disc · Hey Kahani');
});

test('More Koels leaves out the current Koel and leads with its collection', () => {
  const { rail } = render('?koel=night-train');
  const titles = rail.children.map((c) => c.dataset.title);
  assert.equal(titles.length, catalog.koels.length - 1);
  assert.ok(!titles.includes('Night Train'));
  assert.equal(titles[0], 'Market & Temple Travel', 'the other Wander with wonder Koel comes first');
  const first = rail.children[0];
  assert.equal(first.parts.poster.href, '?koel=market-temple-travel');
  assert.equal(first.parts.price.textContent, '$13.99');
});
