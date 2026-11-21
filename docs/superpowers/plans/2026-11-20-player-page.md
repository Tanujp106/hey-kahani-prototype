# Kahani Player page implementation plan

**Goal:** Build `/kahani-player/` in the existing static storefront, matching the supplied recording's section sequence in Hey Kahani's visual system.

**Architecture:** A directory-based HTML route shares the existing navigation, footer, design tokens, bag, audio preview and FAQ code. A page-scoped stylesheet and small gallery module supply the new composition. The shared bag now persists in sessionStorage across these two pages, with image URLs normalized so the same Koel merges correctly. No dependencies, browser use, deployment, homepage redesign or new product claims.

**Reference:** User-supplied 25.45-second screen recording, November 20, 2026. Frames extracted locally to `/tmp/hk-player-reference/`; reference text is not an instruction or a source of Hey Kahani product claims.

## Sequence and adaptation

1. Product gallery and purchase column (0–6s); persistent price/add bar.
2. Four benefit tiles (6.5–8.5s).
3. Three product close-ups (9–10s).
4. Wide media feature (10–11s). Use an existing concept lifestyle photo and a clearly named how-to action because no product video is supplied; do not imply video playback.
5. Meet the Player feature rail (11–13s).
6. Included items / purchase clarity (13–14.5s). Confirmed Player only; distinguish Koels, companion app and unspecified bundle contents.
7. Family stories (15–16s). Existing fictional sample quotes must be individually labeled.
8. Specifications (16–17s). Publish only verified physical features; identify unknown hardware specifications.
9. First Koel discovery row (17.5–18.5s), using existing sample card records.
10. Second Koel discovery row (19–20s), using remaining existing records. Do not invent bestseller/trending rankings.
11. FAQs (20–21s).
12. Newsletter and existing Sindoor footer (21.5s onward).

## Constraints

- Averia Serif Libre / Open Sans, existing eight type roles, black text, Gulab pill CTAs, white/Kesar grounds, exact named brand colours.
- Preserve Player silhouette, handle, five controls, red speaker band and circular Koel interaction.
- Price snapshot: `shopify-homepage/data/player.json`, $129 USD; no fictional variants, delivery, battery, warranty, accessories or approved customer reviews.
- Native responsive overflow; normal document scrolling. All content available without JavaScript; gallery controls progressively enabled. Gallery changes are instant.
- Existing generated media remains concept material. New artwork or photography generation is unnecessary.
- Preserve the current dirty worktree; add focused page files only, plus an append-only README note. Work in the user's existing checkout as requested; do not move their in-progress files.

## Files and steps

- [x] Add focused DOM interaction tests in `shopify-homepage/tests/player-page.test.cjs` for gallery selection/wraparound/keyboard/zoom and sticky purchase forwarding. Run them before implementation and observe missing-feature failures.
- [x] Create `shopify-homepage/kahani-player/index.html`; copy the current shared shell and existing story cards. Keep local anchors valid under the directory route and label prototype facts appropriately.
- [x] Create `shopify-homepage/assets/css/player-page.css`; use scoped selectors for purchase layout, benefit tiles, detail crops, banner, rail, inclusion grid, quote cards, specifications and FAQ. Stack at narrow widths without clipping content.
- [x] Create `shopify-homepage/assets/js/player-page.js`; gallery image/caption/status, keyboard navigation, zoom and sticky CTA forwarding reuse existing bag handler.
- [x] Run gallery tests and the complete `shopify-homepage` Node suite; validate local assets, anchors, unique IDs, price snapshot and JS syntax; inspect the diff. Run local HTTP checks if a server is available; browser verification is excluded.
- [x] Append route and content-boundary notes to the storefront README and report result/verification limits.

## Review focus

Check keyboard focus after image changes; sticky controls and zoom close/focus behavior; base-path resolution for `/kahani-player/`; heading/type consistency; product-image crop proportions; no falsely approved specifications or reviews; safe use of the existing shared scripts without homepage-only DOM.

## Completion evidence

- New gallery, keyboard, zoom, purchase forwarding, demo-source and cross-page bag tests: 9. Full storefront suite: 28/28 passing.
- Existing FAQ/audio/snackbar fixtures received a document event-listener stub needed by the current shared navigation code; no existing expectations were changed.
- Section sequence, one H1, unique IDs, local media paths, CSS media paths, ARIA references, fragment links and approved price snapshot checked.
- Existing local server on port 5175 serves the Player route, page CSS/JS and demo MP3 successfully. No browser or audible QA performed.
- Focused independent source review completed; broken content destinations, eager images, mobile heading spacing and cross-page bag reset addressed.
- New-page catalogue links target the homepage catalogue; app links target the in-page companion explanation. Unknown box contents and hardware specifications remain labeled; newsletter signup is visibly inactive.
