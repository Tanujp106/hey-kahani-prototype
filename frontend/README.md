# Hey Kahani static frontend

Homepage setup slice from `../shopify-ready-frontend-handoff.md`. Plain HTML,
CSS, native JavaScript modules and JSON; no bundler, API, store credentials,
backend, analytics, payments, or installed dependencies.

## Run locally

From the Hey Kahani project root:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory frontend
```

Then visit `http://127.0.0.1:4173` when ready. Reuse that server if already running.
Serve over HTTP: module imports and JSON fetches do not work through `file://`.
Google Fonts supplies Averia Serif Libre and Open Sans; offline fallback fonts
are Georgia and Arial. Self-host licensed font files when preparing the theme.

## Implemented

- Announcement/header, one scroll-led hero and Player/Koel explanation, a
  separate parent companion-app section, Koel and collection discovery with a
  shop CTA, About, Founder’s Bundle, customer-stories placeholder, FAQs and
  footer. Each has a stable `data-hk-section` boundary and `hk-` classes.
- One shared Player and Koel scene persists from the hero into choose/tap/listen.
  Native Web Animations are paused and their current time follows scroll progress;
  motion reverses on scroll-up without transitions or timers. Narrative remains
  in normal document flow. Reduced motion, short landscape viewports, or missing
  Web Animations support retain a complete static layout.
- Search opens a native dialog and finds rendered collection records. Results
  link to representative Koels. Escape closes dialogs; the mobile menu is a
  native disclosure. FAQs use native details/summary elements.
- One DOM-driven audio component: play/pause, seek, elapsed/total time,
  mutual exclusion, completion, playback rejection and unavailable states.
- Local section links keep navigation usable while supporting page designs
  remain pending. There are no missing destination pages.
- Cart is an explicitly empty preview dialog; newsletter controls are disabled.
  There is no fake add-to-cart, checkout, email submission or success message.
- Koel previews keep native modal focus and Escape behavior. A temporary copy
  expands from the selected disc into the overlay as the panel/backdrop fade in;
  dismissal returns it to its shelf. Interrupted openings are cancellable.
  Reduced motion and offscreen sources use a fade; missing Web Animations falls
  back to the ordinary dialog. Audio stops when dismissal starts.

## Fixtures and content approval

`data/site.json`, `products.json`, `series.json`, and `stories.json` are explicitly
marked fixtures. `schema.json` describes a combined object with those four keys;
each value is the contents of the corresponding file. Record handles are stable;
relationship fields reference handles rather than display labels.

- Player, proposed bundle, Daily Life Koel and Festivals Koel are representative
  records. They do not establish current publication or availability.
- Prices, currency, inventory, SKUs, Shopify IDs and existing content IDs are
  null. The story example intentionally has no invented title or audio.
- The bundle's proposed two physical Koels and 20 individual stories come from
  the SOW and are labeled pending client confirmation, including on the page.
- No approved product photography, official logo asset or public samples were supplied.
  The opening now uses illustrative generated cutouts; other media blocks remain
  placeholders and the text wordmark is provisional.
- Founder biography and testimonials are absent. The customer stories section
  previews a centered heading and a card mosaic: two feature cards
  around two stacked short cards, switching to a horizontal strip on mobile.
  A CSS transform ticker repeats the current cards in a continuous 30-second
  loop; the duplicate group is hidden from assistive technology and inert.
  Pointer hover and keyboard focus on the rail pause the ticker. Reduced motion
  shows the original manually scrollable cards. The heading block uses black
  text; the section preview line and visible pause control are removed.
  Cards use four dedicated generated family lifestyle images as decorative backgrounds
  (assets and exact prompts in `assets/images/testimonials/README.md`),
  with clear photos blending into smaller black text through a linear white
  fade and two masked backdrop-blur layers. Both layers feather upward beyond
  the copy, avoiding a separate panel edge. Each card retains a clear image area.
  These are illustrative scenes, not reviewer portraits. The user authorized
  fictional names and sample quotes for the mockup; every card is visibly labeled
  “Fictional sample”. These are not approved customer reviews. There are no
  ratings, review counts or inactive review links. The ticker works without
  JavaScript. Replace fictional samples with approved quotes and attribution
  before launch; `site.testimonials` remains empty. Layout references: the supplied
  Eight Sleep screenshot, plus [Craft](https://mobbin.com/sites/sections/27893108-c769-431b-ad8e-b141b4b27c76)
  and [Hex](https://mobbin.com/sites/sections/14278a9c-6853-4b22-bd1c-c274192f2892)
  on Mobbin for quote-first cards and bottom-aligned attribution (structure only).
  Legal/support destinations,
  newsletter consent workflow and social URLs await approved store content.
- Editorial copy is draft prototype copy based on the SOW, not approved launch
  messaging. This preview has `noindex, nofollow` and must not be published as a
  production storefront.

No full protected story recordings belong in this directory. Image and audio
folders contain asset instructions only.

## Reusing the audio control

The component operates on `[data-hk-audio]` containing an `<audio preload="none">`
and these hooks: `data-hk-audio-toggle`, `-label`, `-seek`, `-elapsed`, `-duration`,
and `-status` (each with the full `data-hk-audio-` prefix).

Use a native button with `aria-pressed`, a labeled range input, and a status
element with `role="status"`. Supply a unique range ID for every instance.
Keep the button and range disabled in the authored markup. An approved public
excerpt URL in `<audio src="…">` enables playback during initialization.
Never add `autoplay`. Call `initAudioPlayers()` once after all page instances
are rendered so they share one playback coordinator.

`story-filters.js` similarly consumes rendered `data-hk-search-item` links with
`data-hk-search-text` and `data-hk-search-title`; it never reads JSON. Only the
static adapter `render-fixtures.js` knows where fixture files live.

## Shopify migration

| File or boundary | Future theme destination |
| --- | --- |
| `assets/css/*.css` | Theme assets; retain tokens and class names |
| `assets/js/audio-player.js`, `story-filters.js` | Theme assets; retain DOM hooks |
| Header/footer/announcement | Liquid sections and header/footer groups |
| Each `data-hk-section` | Its own `sections/hk-*.liquid` with settings/schema |
| Homepage ordering | `templates/index.json` |
| Series and Koel card markup in `render-fixtures.js` | Liquid snippets and product/metaobject loops |
| `data/*.json` | Shopify products, variants, collections, story/series records |
| `main.js` | Adapt initialization to theme and section-editor lifecycle |
| Cart and disabled newsletter | Native Shopify cart/checkout and approved email workflow |

CSS and independent interaction modules can be reused. HTML section markup must
be wrapped in Liquid and editor schemas; static fixture rendering must be
rewritten. There is no zero-conversion theme export.

Supporting Player, bundle, catalog, series, Koel and founder pages are outside
this first slice. Final artwork, sample recordings, product details, editorial
approval, theme conversion and Shopify integration remain to be completed.

## Checks

```sh
cd frontend
npm test
```

This invokes Node's built-in test runner; no install is required. The audio
tests use EventTarget media doubles because Node does not supply native media
elements. They verify controller behavior, not actual audio decoding or mobile
browser restrictions. Browser/visual checks and audible playback have not been
performed; no approved audio exists yet.

## Product introduction revision — October 30, 2026

The opening uses Superr's product-first pacing: a large physical object in the
hero, followed by a sticky choose/tap/listen demonstration. Hey Kahani's own
cream/red cylindrical Player and circular Koels informed the new imagery.

`player-cutout.png` and `koel-cutout.png` are illustrative AI recreations, not
approved merchandising images. They are flat transparent PNGs; all perspective,
shadows and state transitions are CSS. The same assets appear in the hero,
demonstration and product cards. See `assets/images/README.md` for provenance.

Static image binding is in `render-fixtures.js`, keyed by
`data-hk-product-image="<handle>"`. Later, Liquid should render the selected
Shopify product's image or a transparent presentation-image metafield into
these ordinary `<img>` tags. The animation reads only `data-hk-demo-step` and
`data-mode`; it never loads products, prices or IDs. Keep product selection and
media in section settings/product references, not inside the motion module.

`product-experience.js` uses a passive scroll listener and one requested animation
frame per scroll update to drive paused native Web Animations. It reads one root
rectangle and updates compositor transforms/opacity; there is no wheel/touch
interception, scroll smoothing, or continuous animation loop. Breakpoints are
measured from narrative panels on initialization, resize and font load.

The screen recording supplied on October 30, 2026 clarified the required
continuity: the product itself carries from the first fold into the explanation.
The opening now uses one product image element per object instead of separate
hero and demo images. Shopify media bindings remain unchanged. Four narrative
panels give about three viewport heights of pinned progression at desktop size.
Different image framing may need composition calibration. No assets changed in
this revision. Source syntax, anchors, paths and shared-image count were checked;
this revision was not inspected in a browser because browser permission is
turn-specific. Earlier browser checks above describe the previous implementation.

### Center-and-dock correction

The Player now reaches the horizontal center and the Koel reaches the Player's
top plate during the first-to-second-panel transition (timeline offset 1/3).
Both remain aligned for later explanation panels. The old path incorrectly
returned the Player to the right and delayed docking until the third panel.

Calibration lives on the ordinary product image tags: `data-hk-dock-x`,
`data-hk-dock-y`, `data-hk-dock-width` on the Player, and
`data-hk-artwork-width` on the Koel. Values are normalized to the source image.
The controller accounts for actual image aspect ratio and object-fit letterboxing
before calculating the dock position and scale. Shopify can emit these from
presentation metafields when final media replaces the illustrative images.

The center/dock paths were checked in an isolated runtime at 1440x900,
1024x768 and 390x844. Visual alignment has not been browser-inspected in this
revision, per the user's selection. Open `/?v=center-dock-1` on the local server
to load the versioned script and stylesheet.

## Brand and hover update — October 31, 2026

The project `design.md` records the supplied brand guide, page references, and
current production/color/Shopify decisions. Root `AGENTS.md` requires the
project-local `.agents/skills/hey-kahani-ui/SKILL.md` before UI changes. The
maintained skill source remains under `docs/skills/hey-kahani-ui/`.

Active Player imagery now uses `player-production-v2.png`, based on the supplied
manufacturing front-angle render with a Gulab Red speaker band. The image's
normalized docking anchor is (.50, .32), with plate width .44 of its artboard.
The five actual buttons and blank top plate replace the earlier approximate
controls and invented top artwork. Header/footer use the exact PDF wordmark
export on white plates; main paper uses Kesar Sand.

`product-hover.js` adds restrained pointer depth to the common scene wrapper.
It never changes the scroll-owned image transforms, so the Player and Koel stay
aligned. It coalesces pointer events into one animation frame, has no idle loop,
resets when leaving/scrolling/losing focus, and stays off for touch or reduced
motion. `initProductHover()` returns cleanup for a later Shopify section-unload
integration. There are no additional browser libraries, model files or canvas.

Load `/?v=brand-production-1` to fetch the versioned assets. This revision has
source/runtime-double checks only; browser appearance was not inspected.

## First-fold style and interaction refinement

The `landing-depth-2` revision made the title smaller and
fades in once (opacity only; no animation for reduced motion). The landing fold
shows only the Player; the Koel stays transparent until the explanation starts.
The second fold retains the same Kesar surface; there is no animated backdrop.

Navigation now uses a compact desktop logo/links/utilities row and a single-row
mobile header with a contained disclosure menu. Its DOM module supports Escape,
outside dismissal, focus return, and fixture/link rerendering. Mobbin section
references inspected for this change:
- In Common With: https://mobbin.com/sites/sections/1893a1bc-96e8-414f-82ec-79edaecbf02e
- Zellerfeld: https://mobbin.com/sites/sections/301cf56f-08e8-4ab4-b44b-43d80ffd3e35

Header/footer logos now use the official source-preserving transparent SVGs
recorded in `docs/brand/logo-alpha-notes.md`; white image plates are removed.

Hover does not zoom. It combines directional perspective rotation, parallax,
a product-masked light pass, a moving contact shadow and a second product view.
The alternate front view loads only on fine hover pointers and is disabled as
soon as scrolling begins, preserving the primary-image docking calibration.
Its wide transparent artboard is composed with object-fit:cover to keep the
subject height comparable to the primary portrait cutout. This is a lightweight
two-image depth illusion, not a continuously rotatable 3D model. Product media
and an optional presentation/front-view metafield can supply these images later.

Non-browser checks cover navigation state/focus, hover/no-zoom behavior, reduced
motion, touch exclusion, scroll docking, initial Koel opacity, absence of a
backdrop animation, source syntax, local assets and served parity. Browser visual
inspection was not performed for this revision.

## Actual 3D Player — October 31, 2026

This supersedes the two-image hover illusion described above. Open
`http://127.0.0.1:4173/?v=real-player-1` on the existing local preview.

The hero now loads one actual GLB mesh through a self-hosted, pinned
`@google/model-viewer` 4.4.0 component. Hover changes the camera angle on fine
pointers; drag or keyboard arrows rotate the geometry. Wheel/pinch zoom and
panning are disabled so native page scrolling remains available. The camera
returns to a frontal view during the scroll transition and locks while the Koel
docks. Projected model hotspots calibrate the top-plate position and diameter.
Reduced motion disables pointer-follow movement and retains the static story.

The original product image stays visible until the mesh loads and returns on
renderer/model errors. No-JavaScript visitors retain that image. The renderer
loads only near the homepage instance, never for product cards. It is about
1 MiB before transfer compression, plus the 430 KiB uncompressed GLB; it adds a
real WebGL cost compared with the earlier CSS effect. No continuous spin,
autoplay, external textures, decoder downloads or CAD files are used.

The model is an original approximation built from the supplied manufacturing
PNGs, with a Gulab Red production band. Geometry, dimensions, provenance and the
deterministic Python generator are documented in `assets/models/README.md`.
`data-model-src` / optional product `metadata.modelSrc` supplies the GLB URL.
For Liquid, emit that URL from the selected product's GLB model media source;
emit the regular product image as fallback. Camera/interaction code remains
shared, independent of product identity, price and stock. Replacement models
with different geometry require updated dock hotspots and camera framing.

Verification: generator validates GLB structure, bounds, finite positions,
indices and size; Node tests cover lazy loading, camera controls, scroll reset,
reduced motion, touch exclusion and fallback errors. Source and HTTP asset checks
are separate from visual proof. This revision has not been inspected in a browser.
