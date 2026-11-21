const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { dirname, join } = require('node:path');

const root = join(__dirname, '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');

// Resolve the stylesheet rules used by these geometry checks. This models a
// subset of CSS lengths and layout budgets without rendering the page.
function readRules(file) {
  const source = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const imports = [...source.matchAll(/@import\s+url\(["']([^"'?]+)[^)]*\);/g)];
  const rules = imports.flatMap(([, path]) => readRules(join(dirname(file), path)));
  const conditions = [];
  const tokens = source.replace(/@import[^;]+;/g, '').match(/(?:"[^"\n]*"|'[^'\n]*'|[^{}"'])+|[{}]/g) || [];
  for (let i = 0; i < tokens.length; i += 1) {
    const selector = tokens[i].trim();
    if (selector === '}') {
      conditions.pop();
      continue;
    }
    if (tokens[i + 1] !== '{') continue;
    if (selector.startsWith('@')) {
      conditions.push(selector);
      i += 1;
      continue;
    }
    rules.push({
      selectors: selector.split(/,(?![^()]*\))/).map(part => part.trim().replace(/\s+/g, ' ')),
      declarations: [...tokens[i + 2].matchAll(/([\w-]+)\s*:\s*([^;]+)(?:;|$)/g)]
        .map(([, property, value]) => [property, value.trim()]),
      conditions: conditions.slice(),
    });
    i += 3;
  }
  return rules;
}

const rules = [...html.matchAll(/href="(assets\/css\/[^"?]+)[^"]*"/g)]
  .flatMap(([, path]) => readRules(join(root, path)));

function applies(condition, viewport) {
  const size = condition.startsWith('@container') ? viewport.container : viewport.width;
  return condition.split(',').some(query => {
    const features = [...query.matchAll(/\(([^)]+)\)/g)];
    return features.length > 0 && features.every(([, feature]) => {
      const bound = feature.match(/^(min|max)-(width|height):\s*([\d.]+)(px|rem)$/);
      if (bound) {
        const [, direction, dimension, amount, unit] = bound;
        const boundary = Number(amount) * (unit === 'rem' ? 16 : 1);
        const axis = dimension === 'height' ? viewport.height : size;
        return direction === 'min' ? axis >= boundary : axis <= boundary;
      }
      const range = feature.match(/^width\s*(<=|>=|<|>)\s*([\d.]+)px$/);
      if (range) {
        const [, operator, amount] = range;
        const boundary = Number(amount);
        return { '<': size < boundary, '<=': size <= boundary, '>': size > boundary, '>=': size >= boundary }[operator];
      }
      if (feature === 'orientation: landscape') return viewport.width > viewport.height;
      if (feature === 'orientation: portrait') return viewport.width <= viewport.height;
      return ['hover: none', 'pointer: coarse', 'prefers-reduced-motion: no-preference'].includes(feature);
    });
  });
}

function specificity(selector) {
  return 100 * (selector.match(/#[\w-]+/g) || []).length
    + 10 * (selector.match(/\.[\w-]+|\[[^\]]+\]|:[\w-]+/g) || []).length
    + (selector.match(/(?:^|[ >+])(?:[a-z][\w-]*)/g) || []).length;
}

// Each query lists the selectors that identify the specific element under test.
function probe(...selectors) {
  const matching = rules.flatMap(rule => {
    const matches = rule.selectors.filter(selector => selectors.includes(selector));
    return matches.length ? [{ ...rule, weight: Math.max(...matches.map(specificity)) }] : [];
  }).sort((a, b) => a.weight - b.weight);
  return viewport => Object.fromEntries(matching
    .filter(rule => rule.conditions.every(condition => applies(condition, viewport)))
    .flatMap(rule => rule.declarations));
}

function length(value, viewport, basis, properties = {}) {
  assert.ok(value, `Missing CSS length at ${viewport.width}px`);
  const resolved = value.replace(/var\((--[\w-]+)(?:,\s*([^()]+))?\)/g,
    (_, name, fallback) => String(length(properties[name] ?? viewport.tokens[name] ?? fallback, viewport, basis, properties)));
  const units = { px: 1, rem: 16, '%': basis / 100, vw: viewport.width / 100, svh: viewport.height / 100 };
  const parts = resolved.match(/[a-z]+\(|(?:\d*\.)?\d+(?:px|rem|vw|svh|%)?|[(),+*/-]|\S/g) || [];
  let index = 0;
  function number() {
    const part = parts[index++];
    if (part === '-') return -number();
    if (['(', 'calc(', 'min(', 'max(', 'clamp('].includes(part)) {
      const args = [expression()];
      while (parts[index] === ',') {
        index += 1;
        args.push(expression());
      }
      assert.equal(parts[index++], ')', `Unrecognized length ${value}`);
      if (part === 'min(') return Math.min(...args);
      if (part === 'max(') return Math.max(...args);
      if (part === 'clamp(') return Math.max(args[0], Math.min(args[1], args[2]));
      return args[0];
    }
    const parsed = part?.match(/^((?:\d*\.)?\d+)(px|rem|vw|svh|%)?$/);
    assert.ok(parsed, `Unrecognized length ${value} at ${viewport.width}px`);
    return Number(parsed[1]) * (parsed[2] ? units[parsed[2]] : 1);
  }
  function product() {
    let size = number();
    while (parts[index] === '*' || parts[index] === '/') {
      const operator = parts[index++];
      const right = number();
      size = operator === '*' ? size * right : size / right;
    }
    return size;
  }
  function expression() {
    let size = product();
    while (parts[index] === '+' || parts[index] === '-') {
      const operator = parts[index++];
      const right = product();
      size = operator === '+' ? size + right : size - right;
    }
    return size;
  }
  const size = expression();
  assert.equal(index, parts.length, `Unrecognized length ${value}`);
  return size;
}

const pageTokenSelectors = /<body\b[^>]*\bclass="[^"]*\bhk-homepage\b/.test(html) ? [':root', '.hk-homepage'] : [':root'];
const tokensAt = probe(...pageTokenSelectors);
const wrap = probe('.hk-wrap');

function splitValues(value) {
  const parts = [];
  let brackets = 0;
  let start = 0;
  for (let i = 0; i <= value.length; i += 1) {
    if (value[i] === '(') brackets += 1;
    if (value[i] === ')') brackets -= 1;
    if (brackets === 0 && (i === value.length || /\s/.test(value[i]))) {
      if (i > start) parts.push(value.slice(start, i));
      start = i + 1;
    }
  }
  return parts;
}

const minimumWidth = 290;
const maximumWidth = 1440;
const widths = new Set(Array.from({ length: maximumWidth - minimumWidth + 1 }, (_, index) => minimumWidth + index));
for (const { conditions } of rules) {
  for (const condition of conditions.filter(value => value.startsWith('@media'))) {
    for (const [, amount, unit] of condition.matchAll(/width\s*(?::|<=?|>=?)\s*([\d.]+)(px|rem)/g)) {
      const breakpoint = Number(amount) * (unit === 'rem' ? 16 : 1);
      for (const width of [breakpoint - 0.25, breakpoint, breakpoint + 0.25]) {
        if (width >= minimumWidth && width <= maximumWidth) widths.add(width);
      }
    }
  }
}
const viewportWidths = [...widths].sort((a, b) => a - b);

function forEachWidth(check, heights = [844]) {
  const failures = [];
  for (const height of heights) {
    for (const width of viewportWidths) {
      for (const scrollbar of [0, 17]) {
        const pageWidth = width - scrollbar;
        const viewport = { width, height, pageWidth };
        viewport.tokens = tokensAt(viewport);
        const content = length(wrap(viewport).width, viewport, pageWidth);
        const failure = check(viewport, content);
        if (failure) failures.push(`${width}×${height} (${scrollbar}px scrollbar): ${failure}`);
      }
    }
  }
  assert.equal(failures.length, 0, `${failures.length} viewport failures. ${failures.slice(0, 4).join('; ')}${failures.length > 4 ? `; last ${failures.at(-1)}` : ''}`);
}

function inlinePadding(style, viewport, basis) {
  const parts = splitValues(style.padding || '0');
  const right = parts[1] ?? parts[0];
  const left = parts[3] ?? right;
  const [start, end = start] = splitValues(style['padding-inline'] || '');
  return length(style['padding-left'] ?? start ?? left, viewport, basis, style)
    + length(style['padding-right'] ?? end ?? right, viewport, basis, style);
}

function columnGap(style, viewport, basis) {
  const gap = splitValues(style.gap || '0').at(-1);
  return length(style['column-gap'] || gap, viewport, basis, style);
}

const navInner = probe('.hk-nav__inner', '.hk-nav .hk-nav__inner', '.hk-homepage .hk-nav__inner');
const navLinks = probe('.hk-nav__links');
const wordmark = probe('.hk-wordmark img', '.hk-homepage .hk-nav__inner .hk-wordmark img');
const actionGroup = probe('.hk-nav__actions', '.hk-homepage .hk-nav__actions');
const navButton = probe('.hk-icon-btn', '.hk-nav__actions .hk-icon-btn', '.hk-homepage .hk-nav__actions .hk-icon-btn');
const searchBase = probe('.hk-nav__search', '.hk-homepage .hk-nav__search');
const searchField = ['.hk-nav__search-field', '.hk-homepage .hk-nav__search-field'];
const searchClosed = probe(...searchField);
const searchOpen = probe(...searchField, '.hk-nav__search.is-open .hk-nav__search-field', '.hk-homepage .hk-nav__search.is-open .hk-nav__search-field');
const menuButton = probe('.hk-icon-btn', '.hk-menu-btn', '.hk-nav__actions .hk-menu-btn', '.hk-nav .hk-menu-btn');

test('the logo and header controls have width in both closed and expanded search states', () => {
  forEachWidth((viewport, content) => {
    const nav = navInner(viewport);
    const actions = actionGroup(viewport);
    const field = searchOpen(viewport);
    const drawerToggleVisible = menuButton(viewport).display !== 'none';
    const linksVisible = navLinks(viewport).display !== 'none';
    const controls = drawerToggleVisible ? 3 : 2;
    const icon = length(navButton(viewport).width, viewport, content, actions);
    const logo = length(wordmark(viewport).width, viewport, content, nav);
    const groupWidth = inlinePadding(actions, viewport, content)
      + columnGap(actions, viewport, content) * (controls - 1)
      + icon * (controls - 1) + Math.max(icon, length(searchBase(viewport)['min-width'] || '0', viewport, content)) + 2;
    const visibleLinkBudget = linksVisible ? 270 : 0;
    const tracks = splitValues(nav['grid-template-columns']).length;
    const required = logo + visibleLinkBudget + groupWidth + inlinePadding(nav, viewport, content)
      + columnGap(nav, viewport, content) * (tracks - 1) + 2;
    if (required > content + 0.01) return `closed header requires ${Math.ceil(required)}px of ${Math.floor(content)}px`;
    if (drawerToggleVisible === linksVisible) return 'mobile and desktop navigation have the same visibility';
    if (drawerToggleVisible && icon < 44) return 'a mobile header target is narrower than 44px';
    if (field.visibility === 'hidden' || searchClosed(viewport).visibility !== 'hidden') return 'the search field visibility does not follow its open state';
    if (field.position === 'absolute') {
      const [, right, , left = right] = splitValues(field.inset);
      const horizontalInsets = length(left, viewport, content) + length(right, viewport, content);
      const openWidth = field.width === 'auto' ? content - horizontalInsets - 2 : length(field.width, viewport, content, field);
      const available = openWidth - inlinePadding(field, viewport, content) - 2;
      if (available < 150 || openWidth + horizontalInsets > content + 0.01) return `detached search field has ${Math.floor(available)}px for input within the toolbar width`;
    } else {
      const openWidth = length(field.width, viewport, content, field);
      if (required + openWidth > content + 0.01) return `expanded search requires ${Math.ceil(required + openWidth)}px of ${Math.floor(content)}px`;
    }
  });
});

const faqGrid = probe('#faqs .hk-wrap', '#faqs .hk-home-faq__grid', '#faqs > .hk-home-faq__grid', '.hk-home-faq__grid');
const faqLine = probe('.hk-home-faq .hk-faq__intro h2 span', '.hk-home-faq .hk-faq__intro span');

test('the FAQ title can wrap and the answers have their own usable column', () => {
  forEachWidth((viewport, content) => {
    const style = faqGrid(viewport);
    if (style.display !== 'grid') return 'the general FAQ wrapper overrides the homepage grid';
    if (faqLine(viewport)['white-space'] === 'nowrap') return 'the FAQ title prevents wrapping within its column';
    if (fractionalTracks(style, viewport, content).at(-1) < 220) return 'FAQ answers have a cramped column';
  });
});

const orientationCopy = probe('.hk-home-orientation span');

test('the three badges allow labels to wrap inside their small-screen tracks', () => {
  forEachWidth((viewport, content) => {
    const style = orientationCopy(viewport);
    if (style['flex-direction'] === 'column' && (content - 16) / 3 < 84 && style['white-space'] === 'nowrap') {
      return 'the badge label cannot wrap on a narrow three-column badge strip';
    }
  });
});

const hero = probe('.hk-hero', '.hk-home-hero', '.hk-hero.hk-home-hero');
const heroArt = probe('.hk-campaign__art');
const shopGrid = probe('.hk-home-shop__cards');
const playerGrid = probe('.hk-player > .hk-wrap', '.hk-player.hk-section > .hk-wrap');

function fractionalTracks(style, viewport, basis) {
  const columns = style['grid-template-columns'];
  const repeat = columns.match(/^repeat\((\d+),\s*(.+)\)$/);
  const tracks = repeat ? Array(Number(repeat[1])).fill(repeat[2]) : splitValues(columns);
  const fractions = tracks.map(track => Number(track.match(/([\d.]+)fr\)?$/)?.[1]));
  assert.ok(fractions.every(Number.isFinite), `Unexpected track sizing ${tracks.join(' ')}`);
  const available = basis - (tracks.length - 1) * columnGap(style, viewport, basis);
  const fractionSum = fractions.reduce((total, value) => total + value, 0);
  return fractions.map(fraction => available * fraction / fractionSum);
}

test('hero art fits its track and Shop and Player keep usable columns in portrait and landscape', () => {
  forEachWidth((viewport, content) => {
    const style = hero(viewport);
    const heroContent = viewport.pageWidth - inlinePadding(style, viewport, viewport.pageWidth);
    const artTrack = fractionalTracks(style, viewport, heroContent).at(-1);
    const artWidth = length(heroArt(viewport).width, viewport, artTrack);
    if (artWidth > artTrack + 0.01 || artWidth < 140) return `hero art has an unusable ${Math.round(artWidth)}px width`;
    for (const [name, grid] of [['Player', playerGrid], ['Shop', shopGrid]]) {
      const trackWidth = Math.min(...fractionalTracks(grid(viewport), viewport, content));
      if (trackWidth < 220) return `${name} column has only ${Math.floor(trackWidth)}px`;
    }
  }, [320, 568, 844, 1024]);
});

const series = probe('.hk-home-scroll', '.hk-koel-rail', '.hk-series-rail');
const catalogue = probe('.hk-home-scroll', '.hk-koel-grid', '.hk-koels .hk-koel-grid', '.hk-home-discovery .hk-koel-grid');
const koelActions = probe('.hk-koel__actions');

test('Koel card widths accommodate playback, add to bag and the copy at every grid transition', () => {
  forEachWidth((viewport, content) => {
    const seriesStyle = series(viewport);
    const seriesInner = content - inlinePadding(seriesStyle, viewport, content);
    const seriesCard = length(seriesStyle['grid-auto-columns'], viewport, seriesInner, seriesStyle);
    const list = catalogue(viewport);
    const tracks = fractionalTracks(list, viewport, content - inlinePadding(list, viewport, content));
    const catalogueCard = Math.min(...tracks);
    // A 190px card allows a 44px add target and playback label with its icon,
    // while retaining the card insets, shared spacing, and visible title area.
    if (seriesCard < 190 || seriesCard > seriesInner + 0.01) return `featured Koel is ${Math.floor(seriesCard)}px within a ${Math.floor(seriesInner)}px rail`;

    // User direction, November 21, 2026: the Koel catalogue stays two to a row
    // on a phone rather than widening to one. A catalogue card is therefore
    // narrower than a rail card, so what has to survive is the add target and
    // a usable preview control beside it — not a fixed card width.
    if (viewport.width <= 800 && tracks.length !== 2) {
      return `catalogue shows ${tracks.length} Koels a row at phone width, not 2`;
    }
    const actions = koelActions(viewport);
    const inset = length(actions.left, viewport, catalogueCard) + length(actions.right, viewport, catalogueCard);
    const preview = catalogueCard - inset - 44 - columnGap(actions, viewport, catalogueCard);
    if (preview < 44) return `preview control has only ${Math.floor(preview)}px beside the add button`;
    if (!['auto', 'scroll'].includes(seriesStyle['overflow-x'])) return 'the featured Koel rail does not own its overflow';
  });
});

const rail = probe('.hk-home-scroll', '.hk-feature-rail');
const feature = probe('.hk-feature');
const featureCopy = probe('.hk-feature__copy p');

test('the feature rail contains overflow and leaves room for text at both container breakpoints', () => {
  forEachWidth(viewport => {
    const track = rail(viewport);
    const inner = viewport.pageWidth - inlinePadding(track, viewport, viewport.pageWidth);
    const cardWidth = length(track['grid-auto-columns'], viewport, inner, track);
    const itemViewport = { ...viewport, container: inner };
    const card = feature(itemViewport);
    const columnCount = splitValues(card['grid-template-columns']).length;
    const cardInner = cardWidth - inlinePadding(card, itemViewport, cardWidth);
    const copyWidth = columnCount === 1 ? cardInner : (cardInner - columnGap(card, itemViewport, cardWidth)) / 2;
    const typeSize = length(featureCopy(itemViewport)['font-size'], itemViewport, copyWidth);
    if (!['auto', 'scroll'].includes(track['overflow-x'])) return 'the rail does not own its overflow';
    if (cardWidth > inner + 0.01 || copyWidth < 180) return `feature has only ${Math.floor(copyWidth)}px for its copy`;
    if (typeSize < 17) return `feature text drops below the storefront body size (${typeSize}px)`;
  });
});

const featureNav = probe('.hk-feature-nav');
const featureDots = probe('.hk-carousel-dots:not([hidden])', '.hk-feature-dots:not([hidden])');
const featureDot = probe('.hk-carousel-dot', '.hk-feature-dot');
const featureArrow = probe('.hk-icon-btn', '.hk-rail-control', '.hk-home-features .hk-rail-control');

test('the feature pager fits all four dots and both arrows with full-size targets', () => {
  forEachWidth(viewport => {
    const nav = featureNav(viewport);
    const dots = featureDots(viewport);
    const dotCount = dots.display === 'grid' ? Number(dots['grid-template-columns'].match(/repeat\((\d+)/)?.[1]) : 4;
    const navWidth = length(nav.width, viewport, viewport.pageWidth);
    const dotWidth = length(featureDot(viewport).width, viewport, navWidth);
    const arrowWidth = length(featureArrow(viewport).width, viewport, navWidth);
    // The dot strip wraps, so overflow is handled by flowing onto a second
    // line rather than by shrinking the targets.
    if (dots['flex-wrap'] === 'wrap') {
      if (Math.min(arrowWidth, dotWidth) < 44) return 'a feature pager target is narrower than 44px';
      return;
    }
    // The pager stacks the dots above the arrows, so the two rows do not share
    // a line; the wider row is what has to fit.
    const stacked = nav['flex-direction'] === 'column';
    const dotsRow = dotCount * dotWidth + (dotCount - 1) * columnGap(dots, viewport, navWidth);
    const arrowsRow = 2 * arrowWidth + columnGap(nav, viewport, navWidth);
    const required = stacked
      ? Math.max(dotsRow, arrowsRow)
      : arrowsRow + dotsRow + 2 * columnGap(nav, viewport, navWidth);
    if (required > navWidth) return `feature pager requires ${Math.ceil(required)}px of ${Math.floor(navWidth)}px`;
    if (Math.min(arrowWidth, dotWidth) < 44) return 'a feature pager target is narrower than 44px';
  });
});

const quoteGrid = probe('.hk-quotes', '.hk-community .hk-quotes', '.hk-community__content .hk-quotes');
const quoteBody = probe('.hk-quote__body', '.hk-community .hk-quote__body');
const quoteHeader = probe('.hk-quote__header', '.hk-community .hk-quote__header');
const quoteGraphic = probe('.hk-quote__graphic', '.hk-community .hk-quote__graphic');
const newsletter = probe('.hk-footer .hk-newsletter', '.hk-footer__top .hk-newsletter');
const newsletterRow = probe('.hk-newsletter__row', '.hk-footer .hk-newsletter__row');
const subscribeButton = probe('.hk-btn', '.hk-footer .hk-newsletter .hk-btn--primary');

test('testimonials and the footer signup retain space for their content', () => {
  forEachWidth((viewport, content) => {
    const grid = quoteGrid(viewport);
    const quoteWidth = Math.min(content, length(grid['max-width'], viewport, content));
    const quoteInner = quoteWidth - inlinePadding(grid, viewport, quoteWidth);
    const slots = fractionalTracks(grid, viewport, quoteInner);
    const cardWidth = slots.length === 1 ? slots[0] : slots[0] + slots[1] + columnGap(grid, viewport, quoteInner);
    const cardTextWidth = cardWidth - inlinePadding(quoteBody(viewport), viewport, cardWidth) - 2;
    const graphic = length(quoteGraphic(viewport).width, viewport, cardTextWidth);
    if (graphic + columnGap(quoteHeader(viewport), viewport, cardTextWidth) + 28 > cardTextWidth) return 'testimonial ornament cannot fit beside its quotation mark';

    const formWidth = length(newsletter(viewport).width, viewport, content);
    const row = newsletterRow(viewport);
    const buttonWidth = inlinePadding(subscribeButton(viewport), viewport, formWidth) + 32;
    const fieldWidth = formWidth - inlinePadding(row, viewport, formWidth) - columnGap(row, viewport, formWidth) - buttonWidth;
    if (formWidth > content + 0.01 || fieldWidth < 100) return `signup has only ${Math.floor(fieldWidth)}px for the email field`;
  });
});

const drawer = probe('.hk-dialog', '.hk-dialog--drawer');
const drawerContent = probe('.hk-drawer', '.hk-homepage .hk-drawer');
const drawerBody = probe('.hk-drawer__body', '.hk-homepage .hk-drawer__body');
const searchDialog = probe('.hk-dialog', '#search-dialog');

test('the bag and search dialogs fit the viewport and the bag keeps a scrollable area', () => {
  forEachWidth(viewport => {
    const drawerWidth = length(drawer(viewport).width, viewport, viewport.width);
    const searchWidth = length(searchDialog(viewport).width, viewport, viewport.width);
    if (Math.max(drawerWidth, searchWidth) > viewport.width + 0.01) return 'a dialog extends beyond the viewport';
    const scrollable = [drawerBody(viewport).overflow, drawerContent(viewport)['overflow-y']];
    if (!scrollable.some(value => ['auto', 'scroll'].includes(value))) return 'the bag cannot scroll when its contents extend below the viewport';
  }, [320, 430, 431, 844]);
});
