/**
 * Cross-page consistency checks.
 *
 * These guard the rules in design.md: one header, one footer, one type scale,
 * one section rhythm, one tone set, one radius system, one spacing grid.
 * A failure here means a local override snuck in — delete it and use the
 * token, rather than relaxing the test.
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { execFileSync } = require('node:child_process');
const { join } = require('node:path');

const ROOT = join(__dirname, '..');
const CSS = ['assets/css/styles.css', 'assets/css/homepage-layout.css', 'assets/css/player-page.css', 'assets/css/benefit-frame-masks.css'];
const PAGES = ['index.html', 'kahani-player/index.html'];

const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const tokens = read('assets/css/tokens.css');

/** The phone illustration is a picture of an interface, not page chrome. Its
 *  corners, colours and spacing are part of the drawing (design.md). */
const PICTURE_PREFIX = '.hk-phone';

/** Walk every CSS declaration with the selector it belongs to. */
function declarations(file) {
  const out = [];
  let selector = '';
  read(file).split('\n').forEach((line, index) => {
    const open = line.match(/^\s*([^{};]*)\{/);
    if (open && open[1].trim()) selector = open[1].trim();
    for (const match of line.matchAll(/(?:^|[{;])\s*([a-z-]+)\s*:\s*([^;{}]+)/g)) {
      out.push({ file, line: index + 1, selector, property: match[1], value: match[2].trim() });
    }
  });
  return out;
}

const allDeclarations = CSS.flatMap(declarations);
const pageDeclarations = allDeclarations.filter((d) => !d.selector.startsWith(PICTURE_PREFIX));
const at = (d) => `${d.file}:${d.line} (${d.selector}) ${d.property}: ${d.value}`;

test('the shared header and footer are rendered from the partials, not copied', () => {
  // Throws with the drifted page names if a page's chrome was hand-edited.
  execFileSync(process.execPath, [join(ROOT, 'scripts/sync-chrome.cjs'), '--check'], { cwd: ROOT });
});

test('every page loads the shared assets at the same version', () => {
  const versions = new Map();
  for (const page of PAGES) {
    for (const [, file, version] of read(page).matchAll(/assets\/(?:css|js)\/([a-z-]+\.(?:css|js))\?v=([^"']+)/g)) {
      if (versions.has(file)) {
        assert.equal(versions.get(file), version, `${file} is loaded at two different versions; one page will cache a stale copy`);
      }
      versions.set(file, version);
    }
  }
  assert.ok(versions.size > 0, 'expected versioned asset links');
});

test('words use a type-scale role, never a raw font-size', () => {
  const offenders = pageDeclarations
    .filter((d) => d.property === 'font-size')
    // --hk-mark is the quotation ornament, not a word (design.md).
    .filter((d) => !/var\(--hk-(text-[a-z-]+|mark)\)/.test(d.value));
  assert.deepEqual(offenders.map(at), [], 'set a --hk-text-* role instead of a raw size');
});

test('no page redefines a type-scale token locally', () => {
  const offenders = allDeclarations.filter((d) => /^--hk-text-/.test(d.property));
  assert.deepEqual(offenders.map(at), [], 'a local override makes the same heading render at two sizes across pages');
});

test('section headings all use the same display role', () => {
  // design.md sets the Player benefits heading to Title size deliberately.
  const allowed = new Set(['player-benefits-title']);
  const offenders = [];
  for (const page of PAGES) {
    for (const [tag, id] of read(page).matchAll(/<h2 class="hk-display hk-display--md"[^>]*\bid="([^"]+)"/g)) {
      void tag;
      if (!allowed.has(id)) offenders.push(`${page} #${id}`);
    }
  }
  assert.deepEqual(offenders, [], 'section headings use hk-display--lg / --hk-text-section');
});

test('corners come from the radius system', () => {
  const offenders = pageDeclarations
    .filter((d) => d.property === 'border-radius')
    .filter((d) => !/var\(--hk-(radius-[a-z]+|pill|cut-[a-z]+)\)/.test(d.value))
    .filter((d) => !['50%', '0', 'inherit'].includes(d.value));
  assert.deepEqual(offenders.map(at), [], 'use a --hk-radius-*, --hk-pill or --hk-cut-* value');
});

test('section padding picks a row of the section rhythm', () => {
  const rhythm = /var\(--hk-section(-tight|-lg)?\)|var\(--hk-space-[a-z0-9]+\)|0/;
  const sectionish = /^\.hk-(section|pdp-section|home-(shop|features|family|notes|help)|koel-series)\b/;
  const offenders = pageDeclarations
    .filter((d) => sectionish.test(d.selector))
    .filter((d) => d.property === 'padding' || d.property === 'padding-block')
    .filter((d) => !d.value.split(/\s+/).every((part) => rhythm.test(part)));
  assert.deepEqual(offenders.map(at), [], 'use --hk-section-tight / --hk-section / --hk-section-lg');
});

test('spacing sits on the 4px grid', () => {
  const spacing = /^(padding|margin|gap|row-gap|column-gap|inset)(-(top|bottom|left|right|inline|block)(-(start|end))?)?$/;
  const offenders = [];
  for (const d of pageDeclarations) {
    if (!spacing.test(d.property)) continue;
    // calc()/env() encode real geometry (track widths, safe areas), not rhythm.
    if (/\b(calc|env)\s*\(/.test(d.value)) continue;
    for (const [, px] of d.value.matchAll(/(?<![\d.])(\d+)px(?![\d.])/g)) {
      const n = Number(px);
      if (n > 2 && n % 4 !== 0) offenders.push(`${at(d)} -> ${n}px`);
    }
  }
  assert.deepEqual(offenders, [], 'use a --hk-space-* row, or at least a multiple of 4px');
});

test('there is one tone set, defined once', () => {
  const names = [...tokens.matchAll(/--hk-tone-([a-z]+):/g)].map((m) => m[1]);
  assert.ok(names.length >= 4, 'expected the tone palette in tokens.css');

  // A brand colour softened over white is a tone or a tint, and both live in
  // tokens.css. A component restating the mix is how one hue ends up at five
  // different strengths across the site.
  // Mixing a *component variable* is fine: that is one rule producing a tint
  // per slot. Mixing a brand colour directly is what has to be named.
  // Fading a colour to `transparent` is an alpha ramp, not a tint.
  const rawTint = /color-mix\(\s*in srgb,\s*var\(--hk-(sky|mango|lavender|parrot|kesar)\)\s*\d+%\s*,\s*(white|#fff)/;
  const offenders = allDeclarations.filter((d) => rawTint.test(d.value));
  assert.deepEqual(offenders.map(at), [], 'reference a --hk-tone-* or --hk-tint-* token instead of mixing again');

  // Both pages use the same tone class names.
  for (const page of PAGES) {
    const used = [...read(page).matchAll(/hk-tone--([a-z]+)/g)].map((m) => m[1]);
    assert.ok(used.length > 0, `${page} uses no tone classes`);
    for (const name of used) assert.ok(names.includes(name), `${page} uses hk-tone--${name}, which has no token`);
  }
});

test('surfaces and on-dark text come from tokens', () => {
  const offenders = pageDeclarations
    .filter((d) => d.property === 'background' || d.property === 'background-color' || d.property === 'color')
    .filter((d) => /#(fff|ffffff)\b/i.test(d.value));
  assert.deepEqual(offenders.map(at), [], 'use var(--hk-canvas) for a surface or var(--hk-on-dark) for text');
});

test('every global token a stylesheet references is defined', () => {
  const defined = new Set([...tokens.matchAll(/(--hk-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
  // Some tokens are measured and set on the document by the page scripts.
  for (const script of ['assets/js/main.js', 'assets/js/homepage-layout.js', 'assets/js/player-page.js']) {
    for (const [, name] of read(script).matchAll(/setProperty\(\s*['"`](--hk-[a-z0-9-]+)/g)) defined.add(name);
  }
  // Component-scoped custom properties are declared in the component itself.
  const local = new Set(allDeclarations.filter((d) => d.property.startsWith('--hk-')).map((d) => d.property));
  const missing = new Set();
  for (const d of allDeclarations) {
    for (const [, name] of d.value.matchAll(/var\((--hk-[a-z0-9-]+)/g)) {
      if (!defined.has(name) && !local.has(name)) missing.add(name);
    }
  }
  assert.deepEqual([...missing].sort(), [], 'referenced token is neither in tokens.css nor declared by a component');
});
