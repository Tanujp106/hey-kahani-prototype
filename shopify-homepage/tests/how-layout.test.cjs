const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const css = readFileSync(join(root, 'assets/css/styles.css'), 'utf8');
const js = readFileSync(join(root, 'assets/js/main.js'), 'utf8');

test('How it works ships a static three-column bento, not an accordion', () => {
  assert.match(html, /class="hk-how-bento"/);
  assert.match(html, /hk-how-bento__card--choose/);
  assert.match(html, /hk-how-bento__card--place/);
  assert.match(html, /hk-how-bento__card--listen/);
  assert.match(html, /hk-how-bento__card--player/);
  assert.match(html, /hk-how-bento__arch/);
  assert.match(html, /Choose a Koel/);
  assert.match(html, /Place it on the Player/);
  assert.match(html, /Listen together/);
  assert.match(html, /hk-shot-05\.png/);
  assert.match(html, /hk-shot-03\.png/);
  assert.match(html, /hk-shot-07\.png/);

  assert.doesNotMatch(html, /data-hk-how-step/);
  assert.doesNotMatch(html, /data-hk-how-panel/);
  assert.doesNotMatch(html, /role="tablist"/);
  assert.doesNotMatch(js, /data-hk-how-step/);
  assert.doesNotMatch(js, /--hk-how-detail-height/);
});

test('How bento CSS keeps desktop three-column structure and arch mask', () => {
  assert.match(css, /\.hk-how-bento\s*\{/);
  assert.match(css, /grid-template-columns:\s*minmax\(0,\s*1\.05fr\)\s+minmax\(0,\s*1fr\)\s+minmax\(0,\s*1\.05fr\)/);
  assert.match(css, /\.hk-how-bento__arch\s*\{[\s\S]*?border-radius:/);
  assert.match(css, /\.hk-how-bento__caption\s*\{/);
  assert.doesNotMatch(css, /\.hk-how__step-reveal/);
  assert.doesNotMatch(css, /\.hk-how__panel\.is-active/);
});
