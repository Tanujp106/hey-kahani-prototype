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

test('product and feature rails put pagination below the track and use arrows where needed', () => {
  const player = readFileSync(join(root, 'kahani-player/index.html'), 'utf8');
  for (const [page, id, trackId, hasArrows = true] of [
    [html, 'why', 'how-it-works'],
    [html, 'koel-series', 'series-rail'],
    [html, 'koels', 'koel-rail'],
    [player, 'player-benefits', 'player-benefits-rail'],
    [player, 'included', 'player-included-rail', false],
    [player, 'how-it-works', 'player-feature-rail'],
    [player, 'koels', 'koels-rail', false],
    [player, 'more-koels', 'more-koels-rail', false],
  ]) {
    const section = page.match(new RegExp(`<section[^>]*\\bid="${id}"[^>]*>[\\s\\S]*?<\\/section>`))[0];
    const footerStart = section.indexOf('<div class="hk-rail-pagination');
    const footer = section.slice(footerStart);
    assert.ok(footerStart > section.indexOf(`id="${trackId}"`), `Controls must follow ${trackId}`);
    assert.match(footer, /class="hk-carousel-dots"[^>]*\bdata-hk-rail-dots hidden/);
    if (hasArrows) {
      assert.match(footer, new RegExp(`data-hk-rail-prev[^>]*aria-controls="${trackId}"`));
      assert.match(footer, new RegExp(`data-hk-rail-next[^>]*aria-controls="${trackId}"`));
    } else {
      assert.doesNotMatch(footer, /hk-rail-controls|data-hk-rail-(?:prev|next)/);
    }
  }
  const closerLook = player.match(/<section[^>]*id="closer-look"[\s\S]*?<\/section>/)[0];
  assert.doesNotMatch(closerLook, /data-hk-rail|hk-rail-pagination/);
  assert.equal((closerLook.match(/<figure\b/g) || []).length, 3);
  for (const [page, id] of [[html, 'community'], [player, 'family-stories']]) {
    const section = page.match(new RegExp(`<section[^>]*\\bid="${id}"[^>]*>[\\s\\S]*?<\\/section>`))[0];
    assert.match(section, /data-hk-quote-ticker/);
    assert.match(section, /data-hk-quote-toggle hidden/);
    assert.match(section, /data-hk-rail-track tabindex="0"/);
    assert.doesNotMatch(section, /data-hk-rail-(?:prev|next|dots)|hk-rail-pagination/);
  }
  assert.equal((player.match(/class="hk-carousel-dot"[^>]*\bdata-hk-gallery-dot/g) || []).length, 5);
});

test('the shared quote ticker wraps one full set and supports pausing and reduced motion', () => {
  const reduced = { matches: false, addEventListener(_, callback) { this.change = callback; } };
  const cards = [0, 300, 600].map(left => ({
    getBoundingClientRect: () => ({ left }),
    cloneNode: () => ({
      getBoundingClientRect: () => ({ left: left + 900 }),
      setAttribute(name, value) { this[name] = value; },
      remove() { track.children.splice(track.children.indexOf(this), 1); },
    }),
  }));
  const classes = new Set();
  const target = () => ({ events: {}, addEventListener(name, callback) { this.events[name] = callback; } });
  const track = Object.assign(target(), {
    children: [...cards], scrollLeft: 0,
    matches: () => true,
    append(...copies) { this.children.push(...copies); },
    classList: { add: value => classes.add(value), remove: value => classes.delete(value) },
  });
  const toggle = Object.assign(target(), { hidden: true });
  const section = { querySelector: selector => selector === '[data-hk-quote-toggle]' ? toggle : track };
  const frames = new Map();
  const timers = new Map();
  let nextFrame = 0;
  let nextTimer = 0;
  let setVisible;
  vm.runInNewContext(source, {
    document: { querySelectorAll: selector => selector === '[data-hk-quote-ticker]' ? [section] : [] },
    window: {
      // The ticker runs at 900px and below; this fixture is a phone.
      matchMedia: query => query.includes('reduced-motion') ? reduced : { matches: query.includes('max-width: 900px'), addEventListener() {} },
      addEventListener() {},
      requestAnimationFrame(callback) { frames.set(++nextFrame, callback); return nextFrame; },
      cancelAnimationFrame(id) { frames.delete(id); },
      setTimeout(callback) { timers.set(++nextTimer, callback); return nextTimer; },
      clearTimeout(id) { timers.delete(id); },
      IntersectionObserver: class {
        constructor(callback) { setVisible = isIntersecting => callback([{ isIntersecting }]); }
        observe() {}
      },
    },
  });
  const frame = time => {
    const [[id, callback]] = frames;
    frames.delete(id);
    callback(time);
  };
  const finishIdleDelay = () => {
    assert.equal(timers.size, 1);
    const [[id, callback]] = timers;
    timers.delete(id);
    callback();
  };

  assert.equal(track.children.length, 6);
  assert.ok(track.children.slice(3).every(copy => copy.inert && copy['aria-hidden'] === 'true'));
  assert.equal(toggle.hidden, false);
  assert.ok(classes.has('is-ticking'));
  assert.equal(frames.size, 0, 'offscreen cards do not animate');
  setVisible(true);
  track.scrollLeft = 899;
  frame(0);
  frame(50);
  assert.ok(track.scrollLeft > 0 && track.scrollLeft < 4, 'wrap includes the first copy’s trailing gap');
  toggle.events.click();
  assert.equal(frames.size, 0);
  assert.equal(toggle.textContent, 'Resume stories');
  toggle.events.click();
  assert.equal(frames.size, 1);
  track.events.focus();
  assert.equal(frames.size, 0);
  track.events.blur();
  assert.equal(frames.size, 1);
  const finger = { touches: [{ clientX: 100, clientY: 30 }] };
  const release = { targetTouches: [] };
  track.events.touchstart(finger);
  track.events.touchend?.(release);
  track.events.click?.();
  assert.equal(toggle.textContent, 'Pause stories', 'a tap must not toggle the persistent pause');
  finishIdleDelay();
  assert.equal(frames.size, 1, 'a tap resumes playback automatically');

  track.events.touchstart(finger);
  assert.equal(frames.size, 0, 'the ticker yields to the gesture');
  track.events.touchend(release);
  const releaseTimer = nextTimer;
  track.scrollLeft = 620;
  track.events.scroll();
  assert.ok(!timers.has(releaseTimer), 'momentum scrolling postpones the restart');
  assert.equal(frames.size, 0);
  finishIdleDelay();
  frame(100);
  assert.equal(track.scrollLeft, 620, 'resuming preserves the swiped position');
  frame(150);
  assert.ok(track.scrollLeft > 620);

  toggle.events.click();
  track.events.touchstart(finger);
  track.events.touchcancel(release);
  finishIdleDelay();
  assert.equal(frames.size, 0, 'touch handling does not override an explicit pause');
  toggle.events.click();
  reduced.matches = true;
  reduced.change();
  assert.equal(frames.size, 0);
  assert.equal(track.children.length, 3);
  assert.equal(toggle.hidden, true);
  assert.ok(!classes.has('is-ticking'));
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
