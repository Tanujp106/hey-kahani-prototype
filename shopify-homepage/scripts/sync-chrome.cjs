#!/usr/bin/env node
/**
 * Renders the shared chrome partials into every page listed in
 * partials/pages.json, between the hk:header / hk:footer markers.
 *
 *   node scripts/sync-chrome.cjs          write the pages
 *   node scripts/sync-chrome.cjs --check  exit non-zero if any page has drifted
 *
 * The partials are the single source of truth. Edit partials/header.html,
 * partials/footer.html or partials/pages.json, never the chrome inside a page.
 */
const { readFileSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const ROOT = join(__dirname, '..');
const REGIONS = ['header', 'footer'];

function render(partial, page) {
  const missing = new Set();
  const out = partial
    .replace(/\{\{base\}\}/g, page.base)
    .replace(/\{\{asset\}\}/g, page.asset)
    .replace(/\{\{slot:([a-z0-9-]+)\}\}/g, (_, name) => {
      if (!Object.prototype.hasOwnProperty.call(page.slots, name)) {
        missing.add(name);
        return '';
      }
      return page.slots[name];
    });
  if (missing.size) {
    throw new Error(`${page.file}: pages.json is missing slot(s) ${[...missing].join(', ')}`);
  }
  const leftover = out.match(/\{\{[^}]+\}\}/);
  if (leftover) {
    throw new Error(`${page.file}: unresolved placeholder ${leftover[0]}`);
  }
  return out;
}

function splice(html, region, body, file) {
  const start = `<!-- hk:${region}:start -->`;
  const end = `<!-- hk:${region}:end -->`;
  const from = html.indexOf(start);
  const to = html.indexOf(end);
  if (from === -1 || to === -1 || to < from) {
    throw new Error(`${file}: missing ${start} / ${end} markers`);
  }
  const indent = (html.slice(0, from).match(/\n([ \t]*)$/) || [, ''])[1];
  return html.slice(0, from + start.length) + '\n' + body.replace(/\n$/, '') + '\n' + indent + html.slice(to);
}

function main() {
  const check = process.argv.includes('--check');
  const config = JSON.parse(readFileSync(join(ROOT, 'partials/pages.json'), 'utf8'));
  const partials = Object.fromEntries(
    REGIONS.map((region) => [region, readFileSync(join(ROOT, `partials/${region}.html`), 'utf8')])
  );

  const drifted = [];
  for (const page of config.pages) {
    const path = join(ROOT, page.file);
    const before = readFileSync(path, 'utf8');
    let after = before;
    for (const region of REGIONS) {
      after = splice(after, region, render(partials[region], page), page.file);
    }
    if (after === before) continue;
    drifted.push(page.file);
    if (!check) writeFileSync(path, after);
  }

  if (check) {
    if (drifted.length) {
      console.error(`Chrome drift in: ${drifted.join(', ')}\nRun: node scripts/sync-chrome.cjs`);
      process.exit(1);
    }
    console.log(`chrome in sync (${config.pages.length} pages)`);
    return;
  }
  console.log(drifted.length ? `updated: ${drifted.join(', ')}` : 'chrome already in sync');
}

main();
