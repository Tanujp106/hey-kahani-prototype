const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const css = readFileSync(join(root, 'assets/css/styles.css'), 'utf8');
const js = readFileSync(join(root, 'assets/js/main.js'), 'utf8');

test('Why section ships USP tabs with brand-library container shells', () => {
  assert.match(html, /id="why"/);
  assert.match(html, /Stories that feel like yours\./);
  assert.match(html, /data-hk-how/);
  assert.match(html, /role="tablist"/);
  assert.match(html, /hk-how-panel__shell/);
  assert.match(html, /hk-how-panel__body/);
  assert.match(html, /Screen free by design/);
  assert.match(html, /Made for little hands/);
  assert.match(html, /Stories that feel like home/);
  assert.match(html, /Tap a Koel\. Hear a Kahani\./);
  assert.match(html, /hk-how-panel--screen/);
  assert.match(html, /hk-how-panel--hands/);
  assert.match(html, /hk-how-panel--home/);
  assert.match(html, /hk-how-panel--simple/);
  assert.match(html, /brand-library\/illustrations\/flying-kite\.svg/);
  assert.match(html, /Why Hey Kahani/);
  assert.match(html, /viewBox="0 0 640 400"/);
  assert.match(html, /hk-how-panel__shell[^>]*preserveAspectRatio="none"/);

  assert.doesNotMatch(html, /Koel on\. Story begins\./);
  assert.doesNotMatch(html, /Choose a Koel/);
  assert.doesNotMatch(html, /See how it works/);
  assert.doesNotMatch(html, /data-hk-how-step/);
  assert.doesNotMatch(js, /data-hk-how-step/);
  assert.doesNotMatch(html, /viewBox="0 0 400 520"/);
  assert.doesNotMatch(html, /hk-doodle/);
  assert.doesNotMatch(html, /hk-how-pager/);
  assert.doesNotMatch(html, /data-hk-how-dot/);
  assert.doesNotMatch(js, /data-hk-how-dot/);
  assert.doesNotMatch(css, /\.hk-doodle\b/);
  assert.doesNotMatch(css, /\.hk-how-pager/);
  assert.match(js, /data-hk-how-tab/);
});

test('Why feature stage CSS uses tall landscape container shells and crossfade', () => {
  assert.match(css, /\.hk-section--how\s*\{[\s\S]*?background:\s*var\(--hk-canvas\)/);
  assert.match(css, /\.hk-how-panel__shell\s*\{/);
  assert.match(css, /\.hk-how-panel__body\s*\{/);
  assert.match(css, /min-height:\s*min\(68vh,\s*36rem\)/);
  assert.match(css, /min-height:\s*min\(72vh,\s*40rem\)/);
  assert.match(css, /\.hk-how-panel--screen\s*\{/);
  assert.match(css, /\.hk-how-panel--hands\s*\{/);
  assert.match(css, /\.hk-how-panel--home\s*\{/);
  assert.match(css, /\.hk-how-panel--simple\s*\{/);
  assert.match(css, /\.hk-how-panel\.is-active/);
  assert.match(css, /--hk-how-panel-duration/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(css, /aspect-ratio:\s*400\s*\/\s*520/);
  assert.doesNotMatch(css, /\.hk-how-panel--choose\s*\{/);
  assert.doesNotMatch(css, /\.hk-how__step-reveal/);
});
