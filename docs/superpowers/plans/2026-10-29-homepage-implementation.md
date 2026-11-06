# Hey Kahani homepage implementation plan

> **For agentic workers:** Execute inline using superpowers:executing-plans. The user's request authorizes implementation of the supplied handoff.

**Goal:** Build the handoff's local static homepage and representative fixture model.

**Architecture:** Semantic HTML sections, shared CSS, native JavaScript modules. Fixture rendering stays separate from DOM-based interaction modules; later Liquid supplies equivalent markup.

**Tech Stack:** HTML, CSS, browser ES modules, JSON, Python static server, Node built-in tests; no installed dependencies.

**Spec:** `shopify-ready-frontend-handoff.md` and its linked Hey Kahani SOW.

## Global constraints

- Local prototype only; no Shopify/backend/analytics/payment connection.
- `hk-` classes and separate section boundaries; Averia Serif Libre/Open Sans and SOW colors.
- Unknown business facts remain null. No invented artwork, public audio, prices, stock, reviews, or founder biography.
- No browser use. No new Git repository or deployment.
- Homepage first; supporting pages await designs. Navigation uses working homepage anchors.

## Review focus

- Missing assets/data: meaningful placeholders and readable fallback copy.
- Unknown commerce: no price or stock claims and no pretend checkout.
- Audio: single active sample, rejected playback, metadata/seek safety, completion.
- Keyboard and small screens: native dialogs, disclosure menu, native details and range input.
- Relationships: stable handles and valid series/story/preview references.

## Task 1: Fixtures and homepage

- [x] Create `frontend/data/{site,products,series,stories}.json` and a JSON Schema describing records and unknowns.
- [x] Create `frontend/index.html` with ordered homepage sections, anchor navigation, media placeholders, and native dialogs.
- [x] Create `frontend/assets/css/{tokens,base,components,sections}.css` for responsive branded layouts.
- [x] Create `frontend/assets/js/{main,render-fixtures,story-filters}.js`; rendering loads fixtures, interactions operate on DOM.

## Task 2: Reusable audio behavior

- [x] Write Node behavior tests against EventTarget media/element doubles: unavailable sample, play/pause, mutual exclusion, seeking, playback rejection/error, completion, late play promise.
- [x] Observe failures before implementing `frontend/assets/js/audio-player.js`.
- [x] Run tests and JavaScript syntax checks.

## Task 3: Handoff and checks

- [x] Write `frontend/README.md` with exact local command, fixture status, audio hook contract and Shopify mapping.
- [x] Check HTML links, JSON relationships and local resource paths without a browser.
- [x] Report created slice and remaining imagery/content/Shopify integration; appearance and real audio remain unverified.

## Execution notes

The supplied handoff is the approved approach; no replacement design or framework is introduced. Asset placeholders are deliberate because the checkout contains research Markdown only. Font loading uses Google Fonts with local fallbacks; this is the only external frontend dependency. Self-review only, keeping the work bounded to this setup slice.

## Homepage structure revision — October 30, 2026

The user specified the new order: combine hero and Player/Koel explanation in one scroll-led experience; separate companion app; multiple Koels with shop CTA; About; Founder’s Bundle; customer stories; FAQs; footer. Implement the scroll story with a sticky decorative state panel and IntersectionObserver; keep narrative text in normal document flow. On mobile, place the illustration below the opening hero instead of pinning it. The cart CTA remains a preview because this static homepage has no connected checkout.

## Verification results

- Seven audio-controller tests passed using Node EventTarget doubles; JavaScript syntax checks passed.
- Four product, two series and one story fixture parsed; all handle relationships resolved.
- Twenty-five unique static HTML IDs, five local script/style resources and all navigation anchors passed static checks.
- JSON Schema document was created, but validation with a standards-compliant validator was not run because Python jsonschema is unavailable; no dependency was installed for this.
- Self-review checked fixture/interaction separation, placeholder states, dialogs and section boundaries. No browser, visual or audible playback verification was performed.
- No server left running; use the README command when ready.
