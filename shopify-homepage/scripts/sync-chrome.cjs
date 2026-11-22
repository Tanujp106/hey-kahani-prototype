#!/usr/bin/env node
/**
 * Renders shared storefront partials into the pages listed in
 * partials/pages.json, between each component's start and end markers.
 *
 *   node scripts/sync-chrome.cjs          write the pages
 *   node scripts/sync-chrome.cjs --check  exit non-zero if any page has drifted
 *
 * Edit the partials or page data, then regenerate the standalone HTML.
 */
const { readFileSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const ROOT = join(__dirname, '..');
const REGIONS = ['header', 'testimonials', 'faq', 'footer', 'dialogs'];

function escapeText(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

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
  const faqItem = readFileSync(join(ROOT, 'partials/faq-item.html'), 'utf8').trimEnd();

  const drifted = [];
  for (const page of config.pages) {
    const faqItems = page.faqs.map(({ question, answer }) => render(faqItem, {
      ...page,
      slots: { question: escapeText(question), answer: escapeText(answer) },
    })).join('\n');
    const pageWithFaqs = { ...page, slots: { ...page.slots, 'faq-items': faqItems } };
    const path = join(ROOT, page.file);
    const before = readFileSync(path, 'utf8');
    let after = before;
    for (const region of REGIONS) {
      after = splice(after, region, render(partials[region], pageWithFaqs), page.file);
    }
    if (after === before) continue;
    drifted.push(page.file);
    if (!check) writeFileSync(path, after);
  }

  if (check) {
    if (drifted.length) {
      console.error(`Shared component drift in: ${drifted.join(', ')}\nRun: node scripts/sync-chrome.cjs`);
      process.exit(1);
    }
    console.log(`shared components in sync (${config.pages.length} pages)`);
    return;
  }
  console.log(drifted.length ? `updated: ${drifted.join(', ')}` : 'shared components already in sync');
}

main();
