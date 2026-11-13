const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const css = readFileSync(join(root, 'assets/css/styles.css'), 'utf8');
const js = readFileSync(join(root, 'assets/js/main.js'), 'utf8');

test('USP strip rides the wave as a ticker and stays still when motion is reduced', () => {
  assert.match(html, /data-hk-strip-ticker/);
  assert.match(html, /class="hk-strip__usps"/);
  assert.match(html, /Screen free by design/);
  assert.match(html, /Made for little hands/);
  assert.match(html, /Stories that feel like home/);

  assert.match(css, /\.hk-strip__ticker/);
  assert.match(css, /overflow-x:\s*clip/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)\s*\{[^}]*\.hk-strip__usps/s);

  assert.match(js, /data-hk-strip-ticker/);
  assert.match(js, /data-hk-clone/);
  assert.match(js, /aria-hidden", "true"/);
  assert.match(js, /if \(!reduceMotion && stripOriginals\.length\)/);
  assert.match(js, /hk-strip__glyph/);
  assert.match(js, /pointOnStrip/);
  assert.match(js, /rotate\(/);
  assert.match(js, /easing: "linear"/);
  assert.match(js, /iterations: Infinity/);
  assert.match(js, /stripMotion\?\.pause\(\)/);
});
