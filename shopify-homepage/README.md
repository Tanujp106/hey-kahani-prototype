# Hey Kahani — Shopify homepage refresh (draft)

Detached first draft for Shopify theme handoff. **Does not import or affect** `../frontend/`.

## Homepage layout — November 17, 2026

Final order from November 18: viewport-height hero → concise Player/Koels Shop
cards → six featured Koels and Explore more → unchanged How-to/USP → restored
standalone Player → existing red Koel library → the remaining page. About remains
hidden. `#shop` and `#player` now distinguish the category shop and product section.

The homepage follows the section roles of [Yoto US](https://us.yotoplay.com/),
using the existing Hey Kahani palette, fonts, graphic system, CTA skins and assets.

| Reference role | Hey Kahani implementation |
| --- | --- |
| Hero and introduction | Campaign composition with a transparent Player and smaller Koels on the right, lower-left copy and first-Player CTA; existing brand styling retained |
| Feature stories | Four horizontal cards explaining the interaction, stories, independence and family routines |
| Player selection | The one existing Player at the approved $129 USD, followed by its Koel ecosystem and existing bundle destination |
| Audio discovery | All ten existing Koels in a horizontal rail, filtered by existing collections; original preview and bag hooks retained |
| Family stories | Existing concept-photo triptych and retained sample quote cards, followed by compact founder/app editorial cards |
| Reassurance | First-purchase, existing-owner, app and help destinations; no unverified shipping/return/warranty promises |
| FAQs and footer | Split question layout, explicit Player requirement, newsletter above the sitemap |

`assets/css/homepage-layout.css` changes composition without replacing the base
tokens or original product card skin. `assets/js/homepage-layout.js` adds native
scroll-rail controls and collection filtering; there is no autoplay or new dependency.
Search, checkout and demo audio keep their documented prototype boundaries.
Browser visual verification has not been performed for this layout pass.

## Open locally

### Hero responsiveness — November 21, 2026

The hero uses a bounded 25:27 art stage so the Player, Koels, shadow and backdrop
scale as one composition. Artwork size responds to both available width and
viewport height. Copy/art columns become a stacked layout on narrow portrait
screens; suitable landscape widths retain columns. The hero grows naturally
when its copy needs more room, rather than clipping it into a fixed-height
scrolling panel. Existing tilt, shadows, hover effects and photo masks remain.

Verification includes the existing storefront tests and a non-browser
[geometry audit](../output/qa/responsive-hero-2026-11-21/geometry-audit.json)
covering widths from 240 to 2560px, fourteen heights, both layout orientations,
and 16/20px default-font settings. The audit checks declared composition bounds
and source constraints; it does not verify browser layout, typography or paint.
Browser visual verification of this correction has not been performed.

### Preview server

```bash
cd shopify-homepage
python3 -m http.server 5175
```

Then open `http://localhost:5175`.

### Agentation feedback

From `shopify-homepage/`, build the local feedback toolbar once:

```bash
npm --prefix .agentation ci
npm --prefix .agentation run build
```

Refresh the homepage or `/kahani-player/` on localhost to use the Agentation
toolbar. It connects to the Agentation MCP server at `http://localhost:4747`
for feedback in Codex. The generated bundle stays in the ignored `.tmp/`
directory, and hosted storefront pages skip loading it.

## Shared storefront components — November 22, 2026

The navigation, footer, testimonials, FAQ accordion, dialogs and snackbar have
shared sources in `partials/`. The generated markup sits between markers in the
standalone pages.

```html
<!-- hk:header:start --> … <!-- hk:header:end -->
<!-- hk:footer:start --> … <!-- hk:footer:end -->
```

Edit the relevant partial or the page data in `partials/pages.json`, then
regenerate.

```bash
node scripts/sync-chrome.cjs          # write the pages
node scripts/sync-chrome.cjs --check  # fail if a page has drifted
```

`partials/pages.json` supplies anchor and asset prefixes, named slots, and the
questions and answers for each page. In Shopify, use Liquid sections or
snippets for the shared markup and section settings for the FAQ copy.

Both pages share one type scale, one tone set (`hk-tone--*`), one named tint
set, one Koel rail and one card radius (`--hk-radius-card`, 24px). Tokens exist
so a value can be shared — **not** so every value must sit on a row. A value
tuned for a specific element stays as it is; see "A deliberate value is not
drift" in `../design.md`. `tests/consistency.test.cjs` enforces the rules:

```bash
node --test tests/*.test.cjs
```

Verification for this pass: the full Node suite plus the consistency suite;
source-level checks only. No browser or visual verification was performed.

## Sources

- Visual system: `../design-refresh.md`, `../taste.md`, brand guide
- Koel + product imagery: downloaded from [heykahani.com](https://www.heykahani.com/) into `assets/images/`
- Copy tone: Yoto-style clarity adapted to Hey Kahani / live site messaging
- Patterns: light motif wash inspired by Yoto playfulness + Mobbin ecommerce pattern refs (BAGGU/ClassDojo/MANA-style motif use, not clones)

## Stack

Plain HTML, CSS, and a small `assets/js/main.js` (nav, Koel dialog, bag dialog, scroll reveals). No 3D.

## Kahani Player page — November 20, 2026

The product page is at `/kahani-player/` (the existing `/kahani-player` links
resolve through the static server's directory redirect). With the server above,
use `http://localhost:5175/kahani-player/`.

The supplied screen recording sets the sequence: product gallery/purchase →
four benefit tiles → close-ups → wide lifestyle media → Meet the Player rail →
included items → family story samples → specifications → two Koel rows → FAQs
→ newsletter/footer. The existing shared nav, tokens, buttons, bag, demo audio
and FAQ scripts are reused. Page-specific composition and media interactions
live in `assets/css/player-page.css` and `assets/js/player-page.js`.

The gallery supports swipe, pagination dots, arrow/Home/End keys, previous/next
controls and a native enlarge-image dialog. On phones, the benefits and included
items use horizontal card rails, the close-ups stack vertically, and the
specifications scan in two columns. The sticky purchase action forwards
to the same Player bag action. The shared prototype bag persists across page
navigation in the current tab, including quantity and removal updates. Its
approved $129 USD snapshot comes from `data/player.json`. Shopify should provide
product identity, native prices, availability, media and checkout.

Existing generated photos remain concept media. The wide media block uses a
still image and a named how-to link because no product video was supplied.
Quotes are individually marked “Fictional sample”; Koel artwork/prices/audio
retain sample/demo labels. Final hardware specifications and pack contents are
unconfirmed. Newsletter signup is visibly inactive until connected.

Verification: `node --test tests/*.test.cjs`, source checks for assets/anchors,
price alignment and section sequence, plus read-only HTTP checks against the
existing local server. Browser and audible verification were not performed.
