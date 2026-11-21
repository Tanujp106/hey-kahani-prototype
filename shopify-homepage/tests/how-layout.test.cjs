const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const root = join(__dirname, '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const source = readFileSync(join(root, 'assets/js/homepage-layout.js'), 'utf8');

test('the first-purchase path precedes content shopping and local navigation/assets resolve', () => {
  const folds = [...html.matchAll(/<section[^>]*\bid="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(folds.slice(0, 6), ['top', 'shop', 'koel-series', 'why', 'player', 'koels']);
  const hero = html.match(/<section[^>]+id="top"[\s\S]*?<\/section>/)[0];
  assert.match(hero, /href="#shop"/);
  assert.match(html, /Every Koel needs a Kahani Player/);
  const series = html.match(/<section[^>]*\bid="koel-series"[\s\S]*?<\/section>/)[0];
  const library = html.match(/<section[^>]*\bid="koels"[\s\S]*?<\/section>/)[0];
  assert.equal((series.match(/\bdata-hk-koel\s/g) || []).length, 6);
  assert.equal((library.match(/\bdata-hk-koel\s/g) || []).length, 10);
  assert.match(series, />Explore more<\/a>/);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, 'IDs must remain unique after section moves');
  for (const [, target] of html.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.includes(target), `Missing in-page destination: ${target}`);
  }
  for (const [, asset] of html.matchAll(/(?:src|href)="(assets\/[^"?#]+)[^"]*"/g)) {
    assert.ok(existsSync(join(root, asset)), `Missing asset: ${asset}`);
  }
  const collections = [...html.matchAll(/data-collection="([^"]+)"/g)].map(m => m[1]);
  for (const [, filter] of html.matchAll(/data-hk-koel-filter="([^"]+)"/g)) {
    assert.ok(filter === 'all' || collections.includes(filter), `Filter has no matching products: ${filter}`);
  }
});

function fixture(reduced = false, withPager = false) {
  const element = () => ({
    hidden: false, disabled: false, attrs: {}, events: {},
    addEventListener(name, callback) { this.events[name] = callback; },
    setAttribute(name, value) { this.attrs[name] = value; },
    removeAttribute(name) { delete this.attrs[name]; },
    classList: { toggle() {} },
  });
  const previous = element(), next = element(), track = element(), status = element();
  Object.assign(track, { scrollWidth: 1200, clientWidth: 400, scrollLeft: 0,
    scrollBy(options) { this.lastScroll = options; },
    scrollTo(options) { this.scrollLeft = options.left; this.lastScroll = options; },
  });
  const filters = ['all', 'Celebrations'].map(value => Object.assign(element(), {
    dataset: { hkKoelFilter: value }, textContent: value,
  }));
  const cards = ['Kahani Original', 'Celebrations', 'Kahani Original'].map((collection, i) => Object.assign(element(), {
    dataset: { collection }, paused: false,
    querySelector() { return i === 0 ? { click: () => { this.paused = true; } } : null; },
  }));
  track.querySelectorAll = () => cards;
  const pager = withPager ? {
    hidden: true,
    replaceChildren(...dots) { this.dots = dots; },
  } : null;
  if (pager) Object.assign(track, {
    id: 'test-rail',
    scrollWidth: 1310,
    clientWidth: 680,
    children: Array.from({ length: 6 }, (_, index) => ({
      getBoundingClientRect: () => ({ left: 72 + index * 220 - track.scrollLeft }),
    })),
  });
  const section = {
    querySelector(selector) { return {
      '[data-hk-rail-track]': track, '[data-hk-rail-prev]': previous,
      '[data-hk-rail-next]': next, '[data-hk-filter-status]': status,
      '[data-hk-rail-dots]': pager,
    }[selector] || null; },
    querySelectorAll: () => withPager ? [] : filters,
  };
  let resize;
  vm.runInNewContext(source, {
    document: { createElement: element, querySelectorAll: selector => selector === '[data-hk-rail]' ? [section] : [] },
    window: { matchMedia: () => ({ matches: reduced }), addEventListener(name, callback) { if (name === 'resize') resize = callback; } },
  });
  return { previous, next, track, filters, cards, status, pager, resize };
}

test('hero header offsets update when the announcement or navigation size changes', () => {
  const sizes = { announcement: 37, navigation: 110 };
  const values = {};
  const announcement = { getBoundingClientRect: () => ({ height: sizes.announcement }) };
  const navigation = { getBoundingClientRect: () => ({ height: sizes.navigation }) };
  const observed = [];
  let resize;
  vm.runInNewContext(source, {
    document: {
      querySelector: selector => ({ '.hk-announcement': announcement, '.hk-nav': navigation })[selector],
      querySelectorAll: () => [],
      documentElement: { style: { setProperty: (name, value) => { values[name] = value; } } },
    },
    window: {
      matchMedia: () => ({ matches: false }), addEventListener() {},
      ResizeObserver: class { constructor(callback) { resize = callback; } observe(node) { observed.push(node); } },
    },
  });
  assert.equal(values['--hk-announcement-height'], '37px');
  assert.equal(values['--hk-navigation-height'], '110px');
  assert.equal(observed.length, 2);
  sizes.announcement = 58;
  sizes.navigation = 114;
  resize();
  assert.equal(values['--hk-announcement-height'], '58px');
  assert.equal(values['--hk-navigation-height'], '114px');
});

test('collection filters preserve products, pause hidden audio, announce results and reset scroll', () => {
  const { filters, cards, track, status } = fixture();
  track.scrollLeft = 300;
  filters[1].events.click();
  assert.deepEqual(cards.map(card => card.hidden), [true, false, true]);
  assert.equal(cards[0].paused, true);
  assert.equal(filters[1].attrs['aria-pressed'], 'true');
  assert.equal(filters[0].attrs['aria-pressed'], 'false');
  assert.equal(status.textContent, '1 Koel shown in Celebrations.');
  assert.equal(track.scrollLeft, 0);
  filters[0].events.click();
  assert.ok(cards.every(card => !card.hidden));
  assert.equal(status.textContent, '3 Koels shown.');
});

test('every storefront card rail has its arrow group below the track in the shared pagination row', () => {
  const player = readFileSync(join(root, 'kahani-player/index.html'), 'utf8');
  for (const [page, id, trackId] of [
    [html, 'why', 'how-it-works'],
    [html, 'koel-series', 'series-rail'],
    [html, 'koels', 'koel-rail'],
    [html, 'community', 'community-quotes'],
    [player, 'closer-look', 'closer-look-rail'],
    [player, 'how-it-works', 'player-feature-rail'],
    [player, 'family-stories', 'family-quotes'],
    [player, 'koels', 'koels-rail'],
    [player, 'more-koels', 'more-koels-rail'],
  ]) {
    const section = page.match(new RegExp(`<section[^>]*\\bid="${id}"[^>]*>[\\s\\S]*?<\\/section>`))[0];
    const footer = section.match(/<div class="hk-rail-pagination(?: hk-wrap)?"[^>]*>\s*<div class="hk-carousel-dots"[^>]*><\/div>\s*<div class="hk-rail-controls"[^>]*>[\s\S]*?<\/div>\s*<\/div>/);
    assert.ok(footer, `Missing the shared controls for ${trackId}`);
    assert.ok(footer.index > section.indexOf(`id="${trackId}"`), `Controls must follow ${trackId}`);
    assert.match(footer[0], new RegExp(`data-hk-rail-prev[^>]*aria-controls="${trackId}"`));
    assert.match(footer[0], new RegExp(`data-hk-rail-next[^>]*aria-controls="${trackId}"`));
    assert.match(footer[0], /class="hk-carousel-dots"[^>]*\bdata-hk-rail-dots hidden/);
  }
  assert.equal((player.match(/class="hk-carousel-dot"[^>]*\bdata-hk-gallery-dot/g) || []).length, 5);
});

test('the dot pager tracks reachable positions and updates after scrolling and resizing', () => {
  const { pager, track, previous, next, resize } = fixture(true, true);
  assert.equal(pager.hidden, false);
  assert.equal(pager.dots.length, 4);
  assert.equal(pager.dots[0].attrs['aria-current'], 'true');
  assert.equal(pager.dots[3].attrs['aria-controls'], 'test-rail');

  pager.dots[3].events.click();
  assert.equal(track.lastScroll.left, 630, 'the last dot targets the end of the rail');
  assert.equal(track.lastScroll.behavior, 'auto');
  track.events.scroll();
  assert.equal(next.disabled, true);
  assert.equal(pager.dots[3].attrs['aria-current'], 'true');
  assert.equal(pager.dots[0].attrs['aria-current'], undefined);

  previous.events.click();
  assert.equal(track.lastScroll.left, 440);
  track.scrollLeft = 222;
  track.events.scroll();
  assert.equal(pager.dots[1].attrs['aria-current'], 'true');

  track.clientWidth = 900;
  resize();
  assert.equal(pager.dots.length, 3);
  assert.equal(pager.dots[1].attrs['aria-current'], 'true');
  track.clientWidth = track.scrollWidth;
  resize();
  assert.equal(pager.hidden, true);
  assert.equal(pager.dots.length, 0);
});

test('rails respect boundaries, reduced motion and nested keyboard controls', () => {
  for (const reduced of [false, true]) {
    const { previous, next, track } = fixture(reduced);
    assert.equal(previous.disabled, true);
    assert.equal(next.disabled, false);
    next.events.click();
    assert.equal(track.lastScroll.behavior, reduced ? 'auto' : 'smooth');
    assert.ok(track.lastScroll.left > 0);
    track.scrollLeft = 800;
    track.events.scroll();
    assert.equal(next.disabled, true);
    assert.equal(previous.disabled, false);
    track.lastScroll = null;
    track.events.keydown({ target: {}, key: 'ArrowRight' });
    assert.equal(track.lastScroll, null, 'nested controls retain their own keyboard behavior');
    track.events.keydown({ target: track, key: 'Home', preventDefault() {} });
    assert.equal(track.lastScroll.left, 0);
    track.scrollWidth = track.clientWidth;
    track.events.scroll();
    assert.equal(next.hidden, true);
    assert.equal(previous.hidden, true);
  }
});

test('navigation overlays close and restore focus across viewport and keyboard changes', () => {
  let focused;
  const element = () => {
    const classes = new Set();
    return {
      attrs: {}, events: {},
      classList: {
        add: name => classes.add(name),
        remove: name => classes.delete(name),
        contains: name => classes.has(name),
        toggle(name, active) { if (active) classes.add(name); else classes.delete(name); },
      },
      addEventListener(name, callback) {
        const previous = this.events[name];
        this.events[name] = event => { previous?.(event); callback(event); };
      },
      setAttribute(name, value) { this.attrs[name] = value; },
      focus() { focused = this; this.events.focus?.(); },
    };
  };
  const menu = element();
  const drawer = element();
  const drawerLink = element();
  const search = element();
  const searchButton = element();
  const input = element();
  const bagButton = element();
  const bag = { querySelector: () => null, showModal() { this.open = true; } };
  const documentEvents = {};
  const desktop = element();
  const mega = element();
  const megaSet = element();
  const megaLink = element();
  const megaTrigger = element();
  const navFloat = element();
  desktop.matches = false;
  drawer.querySelectorAll = () => [drawerLink];
  search.querySelector = () => input;
  search.contains = node => node === input || node === searchButton;
  mega.contains = node => node === megaLink;
  megaSet.getAttribute = () => 'player';
  megaSet.querySelector = selector => selector === '[data-hk-mega-hero]' ? megaLink : null;
  megaSet.querySelectorAll = () => [];
  megaTrigger.getAttribute = () => 'player';

  const elements = {
    '[data-hk-menu]': menu, '[data-hk-drawer]': drawer, '[data-hk-nav-search]': search, '#bag-dialog': bag,
    '.hk-nav__float': navFloat, '[data-hk-mega-panel]': mega,
  };
  const groups = {
    '[data-hk-open-search]': [searchButton], '[data-hk-open-bag]': [bagButton],
    '[data-hk-mega-trigger]': [megaTrigger], '[data-hk-mega-set]': [megaSet],
  };
  vm.runInNewContext(readFileSync(join(root, 'assets/js/main.js'), 'utf8'), {
    document: {
      get activeElement() { return focused; },
      querySelector: selector => elements[selector] ?? null,
      querySelectorAll: selector => groups[selector] ?? [],
      addEventListener(name, callback) { (documentEvents[name] ??= []).push(callback); },
    },
    window: {
      matchMedia: query => query === '(min-width: 900px)' ? desktop : { matches: query.startsWith('(hover: hover)') },
      clearTimeout() {},
    },
  });

  const dispatch = (name, event) => documentEvents[name].forEach(listener => listener(event));
  const escape = () => dispatch('keydown', { key: 'Escape' });
  menu.events.click();
  assert.equal(menu.attrs['aria-expanded'], 'true');
  searchButton.events.click();
  assert.equal(menu.attrs['aria-expanded'], 'false');
  assert.equal(searchButton.attrs['aria-expanded'], 'true');
  assert.equal(focused, input);
  dispatch('click', { target: input });
  assert.equal(searchButton.attrs['aria-expanded'], 'true');
  escape();
  assert.equal(searchButton.attrs['aria-expanded'], 'false');
  assert.equal(focused, searchButton);

  menu.events.click();
  desktop.matches = true;
  desktop.events.change();
  assert.equal(drawer.classList.contains('is-open'), false);
  assert.equal(menu.attrs['aria-expanded'], 'false');
  menu.events.click();
  assert.equal(drawer.classList.contains('is-open'), false);
  megaTrigger.events.keydown({ key: 'ArrowDown', preventDefault() {} });
  assert.equal(mega.attrs['aria-hidden'], 'false');
  assert.equal(focused, megaLink);
  escape();
  assert.equal(mega.attrs['aria-hidden'], 'true');
  assert.equal(focused, megaTrigger);

  megaTrigger.events.keydown({ key: 'ArrowDown', preventDefault() {} });
  desktop.matches = false;
  desktop.events.change();
  assert.equal(mega.attrs['aria-hidden'], 'true');
  menu.events.click();
  drawerLink.events.click();
  assert.equal(menu.attrs['aria-expanded'], 'false');
  menu.events.click();
  escape();
  assert.equal(focused, menu);
  searchButton.events.click();
  bagButton.events.click();
  assert.equal(searchButton.attrs['aria-expanded'], 'false');
  assert.equal(bag.open, true);
});
