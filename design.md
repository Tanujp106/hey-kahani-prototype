# Hey Kahani design reference

This is the working UI reference for this project. It summarizes the supplied brand guide and separates its rules from later project decisions. Read it before creating or changing Hey Kahani UI, then inspect the cited PDF pages relevant to the change.

## Sources and authority

- [Brand identity source](<docs/brand/Hey Kahani - Brand identity.pdf>): 30 PDF pages, cover labeled “Brand Guidelines, Version 1.0 — August 2025” (PDF page 1). The original supplied file remains unchanged; this project copy makes the reference durable.
- `shopify-ready-frontend-handoff.md` and its linked Website Build SOW govern the current storefront scope and technical requirements.
- User direction on October 31, 2026: the manufacturing samples are grey, but production uses **Gulab Red**. Treat the grey speaker band in the supplied manufacturing renders as a shape/material reference and represent that band in Gulab Red for production-facing concept artwork.
- Supplied manufacturing archive: `wetransfer_kahani-player-3d-models_2026-10-29_2057.zip`. Inspection found 16 PNG renders, not browser-ready mesh/glTF files. Attached `1-1.1370.png` and `1-1.1378.png` show the same hardware from different angles.
- Latest explicit user decisions control project choices. Do not silently reinterpret a reference image, old website, or guide example as a change to product facts or task permissions.

Page numbers below mean **PDF page numbers (1–30)**, not the guide’s printed chapter numbers. The PDF is image-based; the relevant pages were visually inspected rather than relying on an empty text extraction.

## Locked shape and illustration system — November 13, 2026

The user selected **H / Freeform rhythm** for abstract shapes and **A / Loose
cut shapes** for illustrative vectors, supplying both boards again and asking
for a varied asset library. This is the selected direction for new graphic
asset creation. The library is in `outputs/brand-library-v1/`; its `GUIDE.md`
documents the system and `manifest.json` lists the individual files.

For placement decisions, use "Start here", the chooser tables and homepage
recipes in `outputs/brand-library-v1/GUIDE.md` (added November 14, 2026). These
are application recommendations; the selected drawing style remains the same.
Choose the asset's content role before choosing its shape.

- Abstract language: asymmetrical blobs, open loops, rounded zigzags, broad
  ribbons and uneven bursts, with thoughtful negative space.
- Illustration language: recognisable objects and plants in simple flat fills,
  gently imperfect silhouettes and selective curved Story Ink details.
- Mostly faceless. The small closed-eye strokes on the selected sun are allowed;
  the system is not mascot-led.
- Include both filled content containers with broad usable centres and separate
  small decorative accents. Distinct silhouettes and different illustration
  subjects matter; recolouring or rotating one design does not supply variety.
- Use exact existing brand colours, transparent asset backgrounds and ordinary
  editable SVG paths. No 3D, gradients, grain or universal outline treatment in
  this selected library.

This selection supersedes the older absolute no-faces and regular-card-only
rules below for new asset creation. The existing website is not changed by
delivery of this library; fonts, content, product facts and interactions retain
their existing requirements. The selected reference attachments are preserved
in `outputs/brand-library-v1/reference/`.

## Earlier homepage graphic direction — November 10, 2026

These are the user's questionnaire decisions for the active `shopify-homepage/`
refresh. They supplement the supplied brand guide; they are not rules quoted
from the PDF. They take precedence over older project styling decisions where
those conflict. `design-refresh.md` carries the system details and `taste.md`
carries composition principles and examples. `frontend/` remains the earlier
implementation, not a target for this update.

**Intent:** make Hey Kahani feel human and clearly kid-focused through minimal,
purposeful graphic design. Soft organic shapes frame content; small icons and
simple vectors add warmth. The user rejected the dense generated concepts as
too maximal. Neither those concepts nor the simplified revision is an approved
page layout or a source for product geometry, fonts, or exact colours.

| Area | User decision |
| --- | --- |
| Main source of playfulness | Simple shapes framing content, supported by small icons. |
| Shape family | Mostly soft organic shapes with slightly irregular edges. Geometry may support this family without becoming the dominant language. |
| Illustration | Simple flat vectors with a few hand-drawn details. No faces, mascots, or personified decorative objects. |
| Outlines | Filled shapes with occasional thin dark outlines; no universal outline treatment. |
| Section boundaries | Important sections can have shaped boundaries. Sections need not all have flat, straight edges. |
| Backgrounds | Mostly white and Kesar Sand, with occasional Mango Yellow or Sky Blue areas. Respect the PDF's primary/secondary/accent hierarchy; do not widen the palette. |
| Cards | Regular rounded cards throughout. Graphics provide variety rather than custom card silhouettes. |
| Headings | A small nearby icon or accent on selected headings. |
| Images | Occasional simple shapes behind images; keep products unobstructed. |
| Motif purpose | Make the brand feel human and kid-focused. A culturally themed decorative motif library is not a requirement. |
| Fonts | Retain Averia Serif Libre and Open Sans; no additional handwritten font. The handmade quality comes from graphics. |
| Mobile | Keep only the strongest shape or graphic in each section; functional icons and content remain available. |
| Decorative motion | A few brief entrance animations; no continuous decorative movement. Honour reduced motion. |
| Density | Principles and examples with judgment per section, not fixed decoration counts or a prescribed treatment for every section. |

### Applying the direction

- Give shapes a clear purpose: frame a product, group content, support a heading,
  or mark an important section transition. Empty space can stay empty.
- Use smooth, gently imperfect contours and a consistent vector vocabulary.
  Avoid busy sticker collages, dense illustrated scenery, confetti, heavy
  paper-cut effects, or a different graphic treatment for every component.
- Use the focused surface palette above for new storefront decoration. The
  broader approved palette remains documented below; its presence does not
  make every colour an equal candidate for large page backgrounds. Existing
  approved product/story artwork retains its own identity.
- New decorative graphics are faceless. This does not require removing people
  from approved photography or changing existing Koel story artwork.
- Preserve official logo clearspace, readable copy, product silhouettes and
  controls, and reliable interactive hit areas. Custom decorative icons must
  remain visually compatible with the functional Lucide icon system.
- The shared language may appear throughout the homepage without placing
  decoration in every block. Dense shop, form, FAQ, and utility areas may stay
  visually quieter. Existing product data, section order, commerce behaviour,
  and content approvals are outside this guideline update.

## Illustration exploration — November 12, 2026

The user is developing a dedicated illustration/vector system, currently for
the website only. The desired character is a kids' brand: playful and
thoughtful. Prefer free, imperfect, hand-drawn shapes with a slightly raw
quality. South Asian character may come through objects, plants and drawing
style. Most illustrations should be faceless; occasional small eye/mouth
strokes are allowed. This qualifies the earlier absolute ban on decorative
faces above, without approving a mascot-led direction.

The first four direction boards are exploratory raster studies in
`outputs/illustration-directions/2026-11-12-round-01/`, not approved production
vectors or a final style system. The user will choose and iterate before the
larger asset library is made. Existing brand palette constraints remain.

## Brand purpose and character

Guide pages 5–9:

- Bring South Asian storytelling heritage into family life, including diaspora homes.
- Nurture identity, imagination, and independent play through stories that feel like home.
- Balance playfulness for children with sophistication and reassurance for parents.
- Keep communication warm, intuitive, culturally confident, modern, and trustworthy.
- Make cultural storytelling feel simple, joyful, and inspiring.
- The guide’s broad audience includes children ages **3–12** (pages 7 and 30). The current storefront SOW and homepage target ages **3–6**. Do not replace the SOW’s product-age messaging with the broader brand audience without confirmation.

## Color system

The named values are transcribed from guide pages 19–21. Use these exact hexadecimal values in design tokens rather than visually sampling a screenshot or inventing near matches.

### Primary colors and their variants — page 19

| Name | Hex | Intended role |
| --- | --- | --- |
| Gulab Red | `#D3000A` | Primary red; confirmed production speaker-band color |
| Sindoor Red | `#B40023` | Deeper primary red |
| Temple Maroon | `#6A0526` | Dark primary red variant |
| Kesar Sand | `#FFF1D6` | Warm light surface |
| Coconut Husk | `#E6CEAD` | Warm neutral surface |
| Mango Yellow | `#FECB74` | Warm yellow surface/accent |
| Sky Blue | `#63C3FE` | Light primary blue |
| Monsoon Blue | `#2578B7` | Mid primary blue |
| Story Ink | `#05334A` | Dark ink/blue |

The guide describes these as the core palette used most often. Use light/dark variants to support contrast and consistent applications. Page 9’s overview emphasizes the red, sand, ink, and sky combination; page 19 gives the full primary palette.

### Secondary colors — page 20

| Name | Hex |
| --- | --- |
| Parrot Green | `#2B9863` |
| Marigold Orange | `#FF5D27` |
| Lavender tea | `#D6C9E4` |

Secondary hues complement the primary palette without overshadowing it.

### Accent colors — page 21

| Name | Hex |
| --- | --- |
| Sunrise Saffron | `#FFAF27` |
| Rangoli Violet | `#B558DD` |
| Hibiscus Pink | `#EF2289` |
| Peacock Teal | `#14C5A1` |

Use accents minimally to emphasize a word, card, or icon within a larger composition. A colorful brand does not require every surface to use a different accent.

The guide labels example combinations with contrast badges, but those badges do not guarantee accessibility for arbitrary new text, sizes, opacity, or backgrounds. Evaluate the actual UI combination when changing it.

## Typography

Guide pages 9 and 23:

| Use | Family | Shown styles |
| --- | --- | --- |
| Headlines, titles, key messages | **Averia Serif Libre** | Regular, Bold |
| Body text and supporting content | **Open Sans** | Regular, Medium (500), Bold, Italic, Bold Italic |
| Navigation and controls | **Open Sans** | Follow the storefront SOW’s explicit interface requirement |

Use the actual font families, not a visually similar display serif or a substitute rounded font. Fallbacks may keep the site usable while fonts load; they are not an alternative brand direction.

The guide does not prescribe a website type scale. The scale below is the project rule for `shopify-homepage/` (set November 7, 2026; section titles raised November 14; use-when guide tightened November 16). Pick a row. Do not add a size between the rows.

Display sizes ease down on a phone. Body, UI, eyebrow, and fine print stay the same size everywhere, so sentences do not shrink.

### What to use when

| When the text is… | Role | Token | Size |
| --- | --- | --- | --- |
| The single headline at the top of the page | Hero | `--hk-text-hero` | 34–56px |
| A section heading (`h2.hk-display--lg`) | Section | `--hk-text-section` | 34–48px |
| A large title inside a card or module: Why card on a phone, newsletter, empty bag | Title | `--hk-text-md` | 24–32px |
| Any other title: quote, founder sign-off, product name, app feature, dialog, drawer, menu image label | Subhead | `--hk-text-subhead` | 20–24px |
| A sentence or a lead, including feature descriptions and FAQ questions and answers | Body | `--hk-text-body` | 17px |
| A control, nav item, tab, promo bar, footer link, or short meta line (quote name, snackbar) | UI | `--hk-text-body-sm` | 15px |
| A small uppercase label, including footer column labels | Eyebrow | `--hk-text-eyebrow` | 13px |
| Legal, a disclaimer, a tiny badge, or a bag count | Fine | `--hk-text-fine` | 12px |

**One step-up.** Why card titles use Title on small screens and Section from 800px. On a wide screen that title is the statement of the card, so it matches the section heading. Nothing else steps up.

**Store badges** are a fixed lockup. The small line (“Download on the”) is Fine. The name (“App Store”) is Body. They do not get their own sizes.

**The phone picture** is not page type. It uses only `--hk-text-picture-title` (20px), `--hk-text-picture` (12px), and `--hk-text-picture-sm` (10px).

**The quotation mark** uses `--hk-mark` (5rem). It is an ornament, not a word.

`--hk-text-lead` and `--hk-text-hero-lead` are aliases of Body. The old 30px step size is retired.

**Hard rule:** If two section titles look different, a local override snuck in. Delete it and use `--hk-text-section` / `hk-display--lg`.

**Hard rule:** Leads and running copy use Body only. Do not set a raw `font-size` on paragraphs, leads, feature descriptions, or FAQ answers. Controls stay on UI. Legal stays on Fine. FAQ questions moved to Body on November 17, 2026, when Subhead read too large. Answers stay on Body.

## Logo and brand marks

Guide pages 13–17:

- Use the supplied **stacked Hey Kahani wordmark** and the **Kahani Koel bird logomark** as approved assets.
- Do not reconstruct the official wordmark by typing the brand name, add an invented symbol, stretch the lockup, or claim an approximate recreation is official.
- Page 16 shows approved light/dark variations: red or dark-ink wordmarks on light backgrounds, and cream/white wordmarks on dark backgrounds. Choose an approved asset with enough contrast.
- Page 14: the full digital wordmark has a minimum width of **80 px**; the standalone digital bird has a minimum width of **60 px**. For print, the shown minima are **20 mm** and **10 mm**, respectively.
- Page 14: use the logo with its tagline when the logo is displayed **above 200 px** wide.
- Page 17 defines clearspace with proportional diagrams using the bird height as `x` and `x/2` annotations. Preserve that exclusion zone; no text, image, or control should crowd the mark. Inspect page 17 for the actual lockup in use rather than inventing a fixed-pixel rule.
- A conservative implementation may leave more clearspace than the minimum; the guide explicitly allows and sometimes recommends this.

**Active logo assets:** `frontend/assets/images/brand-wordmark-transparent.svg` and `brand-wordmark-cream.svg` preserve the official website header's vector paths, with approved Sindoor and Kesar fills respectively. They have no background or bitmap dependency. Use them without white plates, preserve the 275 × 131 aspect ratio, and keep the no-tagline lockup at 80–200 px wide. `docs/brand/logo-alpha-notes.md` records the source. The earlier exact PDF crop remains in `docs/brand/wordmark-source.png` for provenance only; it is not the active website logo.


## Voice and interface copy

Guide pages 9 and 11:

- Warm and friendly; playful and curious; clear and simple.
- Enthusiastic and encouraging, respectful and inclusive, modern and trustworthy.
- Recognize the parent’s situation with reassurance and practical help.
- Use positive framing: explain the opportunities for imagination and connection instead of shaming parents about screens.
- Make instructions caring and easy to act on. A support or setup explanation can be direct without sounding cold.
- Use emotionally resonant storytelling when it serves the message; do not turn every control, error, or metadata label into a slogan.

Copy should explain the product accurately. Do not invent testimonials, ratings, inventory, price, product capability, story titles, or business claims to fill an attractive layout.

## Illustration, icons, and graphic elements

Guide pages 25–28:

- Custom illustrations use a warm, approachable, textured storybook world with South Asian people, family life, landscapes, and everyday situations.
- Keep the illustration style and color relationships consistent across storytelling and marketing surfaces.
- Page 26 identifies **Lucide** as the SVG icon library. Reuse available Lucide-style line icons consistently instead of mixing unrelated icon systems or emoji controls. Do not add a runtime icon dependency if a small inline SVG is sufficient.
- Page 28 permits the brand’s organic/geometric shapes as decorative elements, framing devices, and image masks. Use them with restraint and consistency.
- Illustrative Koel artwork is a visual asset, not evidence that a corresponding story or SKU has been published.

## Photography and product imagery

Guide page 30:

- Warm, natural, modern, and homely-yet-aspirational.
- Authentic family moments: children and parents listening, handling Koels, or sharing cozy time together.
- Warm natural light, soft textures, and minimal clutter; simple modern interiors may include subtle cultural cues.
- Avoid stereotypical “Indian culture” imagery, Bollywood clichés, garish costumes, harsh lighting, artificial colors, oversaturation, and overly staged stock photography.
- Core storytelling imagery should not feature phones or tablets. The separately requested **parent companion-app section** can explain the parent’s app role without depicting the child’s listening experience as screen-based.

### Manufacturing-reference correction — user direction, October 31, 2026

The supplied manufacturing views establish the Player’s geometry:

- White/cream cylindrical main body, rounded top, and arch carry handle.
- Five physical controls: plus above, previous / play-pause / next across the middle, and minus below.
- Recessed blank circular top plate with a small cyan light ring; do not bake a fictional Koel illustration onto an empty Player’s top.
- Woven speaker band above a wood-toned base.
- The manufacturing band is grey. **Production artwork should depict this band in Gulab Red `#D3000A`**, preserving the white/cream housing and wood base rather than recoloring the entire device red.

A generated transparent cutout based on these renders is still a **concept recreation**, not an approved final product photograph. Keep provenance clear in development documentation and retain supplied source files. Final merchandise imagery must preserve actual shape, controls, materials, and color.

## Current homepage and interaction decisions

These are project decisions from this chat, not rules stated in the PDF:

### Homepage structure — November 17, 2026

**Final fold plan — November 18, 2026:** Hero (one viewport, with header-aware
offsets and mobile dynamic viewport support) → concise two-card Shop → light
six-Koel series row with “Explore more” → unchanged How-to/USP → original
standalone Player section → existing red Koel catalogue → unchanged remaining
page. The former Shop `#player` anchor becomes `#shop`; `#player` again refers
to the standalone product section. The six featured cards reuse the existing
catalogue records and shared playback/bag behaviour. The About section stays hidden.

**Order correction — November 18, 2026:** Shop is the second section,
immediately after the hero. Give the Player and Koels equal-width shopping
cards side by side on desktop, stacking on narrow screens. The user then asked
for the full Shop section to target roughly 500–700px on desktop: compact
180px image areas, shorter copy, tighter padding and no repeated benefit pills.
Koel discovery now follows Shop directly, ahead of the introductory strip and
feature stories. Narrow screens remain content-sized rather than height-clipped.

The user explicitly requested a homepage rebuild around Yoto's current section
roles and navigation, while preserving the Hey Kahani visual style already
created. This supersedes older section-order, single-card-tab, and fixed-grid
layout decisions below. It does not change brand colours, fonts, type tokens,
the asset drawing system, product facts or content approvals.

- Navigation: Start here, Shop Koel, How it works, Our story, plus the existing
  search and bag utilities in the frosted Kesar floating shell.
- Sequence: product/lifestyle hero → compact system introduction → four feature
  stories in a native horizontal rail → Player-first purchase choices → Koel
  discovery → family moments and retained sample quotes → compact founder/app
  editorial cards → practical help links → split FAQ → newsletter and sitemap.
  November 17, 2026: the FAQ intro heading and lead are center aligned. The
  heading breaks after “Small questions.” so “Straight answers.” stays on one
  line. The “Explore all FAQs” link under that intro is removed. The practical-help link
  to the FAQ page stays. The practical help row is four left-aligned white cards on a Kesar band,
  with a Kesar wave along the top and bottom. Each card has a stroke icon,
  a bold title, and a short supporting line. Hover is a slightly warm white. The four existing journeys and destinations stay;
  shipping, payment, return, and warranty claims are not added.
  November 18, 2026: the How it works rail is not clipped at the content column.
  It keeps the heading’s left edge and runs through the right margin to the
  viewport, so the next card stays visible. The rail scrolls inside the section.
  The page itself does not scroll sideways. The cards themselves do not clip
  their contents.
- The Player is offered before the Koel catalogue. The approved $129 USD price
  remains bound to its existing product snapshot. Koels explicitly require the
  Player; no first-purchase bundle contents, bundle price, additional device
  models, shipping terms, warranties or reviews are invented.
- Adapt Yoto's device selection to the one real Player and its story ecosystem.
  Adapt content discovery to existing story collections, since per-title age
  metadata is not available. All ten existing cards keep their artwork, prices,
  audio-preview and bag hooks; the layout becomes a filtered horizontal rail.
- Keep the selected hero image with the smaller Koels and use existing project
  photos/illustrations for this layout pass. Concept photos and sample quotes
  remain placeholders for approved assets; no new photography was generated.
- Rail controls support keyboard use, native touch scrolling and reduced
  motion. Collection filters announce results and stop hidden preview audio.
  Browser visual review requires explicit permission in the current message.

The layout is in `shopify-homepage/assets/css/homepage-layout.css`, with small
DOM enhancements in `assets/js/homepage-layout.js`. Base visual tokens and
existing commerce/prototype boundaries remain in their original sources.

### Earlier section decisions

**First-fold correction — November 18, 2026:** the user supplied a Yoto campaign
hero screenshot and asked for the same composition very closely. The current
hero uses a warm plain canvas, lower-left copy, a Mango label, one Gulab CTA and
a transparent Player with three smaller Koels on the right. This
supersedes the lifestyle-photo hero and its overlay layout. Averia/Open Sans,
brand colours and the rest of the visual system remain. November 18 follow-up:
the local 42–88px headline is retired. The hero uses the shared Hero token
(34–56px), Body for the lead, and UI for the label and button. The
“Already have a Player?” link is removed. The copy block sits low in the fold, raised enough that the Shop the Player
button clears the bottom edge, then another 32px. The hero ground is white.
The nav bar is a little shorter. The shop heading is centered, without the
eyebrow, with 40px more space above and below the section. The Player card
stays white and the Koels card is a lighter Mango. The featured Koel row
shows five cards, with 40px of space above and below that section.
The One Player strip is a Sindoor bar with a Sindoor wave on the top and bottom. The three labels use Open Sans at UI size, with a wide gap, centered in the bar. They are not links. No colour-wave stack sits above or below it. How it works
stays inside the content column so the first card is not cut off on the left.
The heading and lead are removed. The first card has no step list, and each card link
is a primary button.
The Player section’s bottom edge uses the colour wave. The top edge is a Kesar wave,
with 40px of padding inside the Player content. The red Koel catalogue wraps in rows and
has no eyebrow above the heading. A wave that meets a white section ends in white. The lead breaks after the first sentence so it reads as two lines.
The copy’s left edge and the Player’s right edge sit on the 1120px content
column, the same width as the nav. The Player is 15% larger than the reduced
campaign size. The three Koels are larger, sit a little closer to the Player, and clear the navbar. The landing fold is 100vh.
Under the hero, a compact Kesar strip lists three existing points with a small
stroke icon: One Player, Little Koels, and Ages 3–6. On narrow screens the product composition
sits above the copy. The screenshot's sale terms, Trustpilot marks and Yoto
hardware are reference content, not approved Hey Kahani claims or assets.

- User direction on November 14, 2026 (`shopify-homepage/` second fold): one large feature card at a time with a **top pill tab switcher** (Calm-style reference). Soft brand pastel card grounds, squircle media, Averia titles, Gulab primary CTAs, directional crossfade; reduced motion keeps opacity/color only. Same-day refinements: tighten empty cards and add selected brand-library vectors; **rework copy from how-to steps into USPs**. Section id `#why`. Header belief line: “Stories that feel like yours.” (not the discarded “Why families choose it” slogan). Four panels use existing store messaging: Screen free by design; Made for little hands; Stories that feel like home; Tap a Koel. Hear a Kahani. November 17, 2026: the hero secondary button is removed, so the hero keeps Shop Koels only. The footer Explore link to `#why` still says “Why Hey Kahani.” The belief lead under “Stories that feel like yours.” breaks after the first sentence so it reads as two lines at Body size. Not a horizontal card carousel and not earlier how-to bentos.

- User direction on November 16, 2026 (`shopify-homepage/` How it works): add a
  separate `#how-it-works` section between the USP section and Koels. Use the
  supplied reference for layout only: left-aligned section heading and lead,
  then three equal rounded cards with a numbered copy area above the artwork.
  Stack the cards on narrow screens. Keep the shared Averia/Open Sans type roles,
  black copy, and brand-derived light surfaces. Explain Pick a Koel → Place it
  on top → Let the story begin. Create new original vectors in the selected
  A / Loose cut shapes and H / Freeform rhythm system rather than reusing the
  repeated library motifs. The three source scenes and manifest are in
  `outputs/brand-library-v1/extensions/how-it-works/`; they depict circular Koels
  and the referenced cream Player with Gulab band, carry handle, five controls
  and wood-toned base. These are instructional illustrations, not published
  Koel art or merchandise renders. This addition preserves the existing USP tabs.

  Same-day correction: the user asked for real images and a shorter section.
  The live cards now use existing photographic-style assets in place of the SVG
  scenes: `hero/hk-shot-01.png` (loose Koels), `editorial/hk-shot-05.png`
  (placing a Koel), and `product/player-desktop.jpg` (listening). The `hk-shot`
  files remain generated concepts, not verified photography. Use compact copy,
  a number beside each Subhead-sized title, 20px card padding, 160–190px photo
  panels and less section/intro spacing. Keep Body copy at 17px. This supersedes
  the live vector treatment; the editable SVG sources remain available.
  Later the same day: each step is a short title and one line. Pick a Koel /
  Let them choose the story. Place it on top / Set it on the Player. Let the
  story begin / No phone or tablet needed. The number sits above the title in
  a fine ink ring, not a filled Gulab badge.
  Same-day follow-up: each photo fills its card. A Kesar Sand (`#FFF1D6`)
  linear gradient and a masked linear blur start at the top so the black copy
  stays readable, and ease off so the lower photo stays sharp. This replaces
  the separate photo panel.
  November 17, 2026: the ring is removed. Each number is Averia with a period
  (`1.` `2.` `3.`) above the title. A later pass the same day makes those
  numbers Subhead and Gulab, because Body black felt too small. The cards are a little taller
  (`clamp(340px, 32vw, 400px)`), and the section has 80px of padding
  below the cards.

- Same-day cleanup: remove pre-guideline hand-drawn `hk-doodle-*` sprites (kite, spark, sun, star, etc.), the `kids-objects.svg` sprite sheet, and Why bottom pager dots from markup/CSS/JS. Decorative graphics must come from `outputs/brand-library-v1` (or Lucide for UI icons), not the old doodle set.

- November 16, 2026 tab-state refinement (`#why`): no dots on the pills.
  Selected is Gulab (`#D3000A`) with white labels; selected hover deepens to
  Sindoor. November 17, 2026: unselected hover is a slightly darker cream
  (Kesar mixed with Coconut Husk), not Marigold, with black text. Press
  scales the pill to 0.97. Keyboard focus keeps the separate Sindoor outline.
  Reduced motion drops the scale and the hover lift. Preserve tab semantics
  and pill sizes.

- Same day card polish: section ground **white**; larger squircle media and USP titles (`--hk-text-md` / desktop `--hk-text-section`). Card colours Sky / Mango / Lavender / Marigold-on-Kesar.

- Same day shape update (superseded): landscape Quiet tide / Double hill / Soft postcard / Plump panel read as empty banners when forced full-bleed.

- Earlier Nov 14 restoration (superseded by the screenshot correction below):
  Why USP panels used Quiet tide / Double hill / Soft postcard / Plump panel
  stretched onto tall cards. The later request explicitly authorizes changing
  the container shapes, colours, elements and internal layout.

- Latest November 14 screenshot correction (`#why`): the user described the
  benefit cards as broken, empty and disharmonious and requested a full card
  composition pass. Follow-up correction: the CSS rounded-card approximation
  felt too plain. Use the actual created Quiet tide, Double hill, Soft postcard
  and Plump panel container artwork. These are applied as filled SVG edge frames
  with a flexible content centre, rather than a full SVG stretched to a tall
  viewport-height shell. No viewport-height floor. Shared inset image/copy columns become a vertical stack
  below 800px. The next reference-led refinement uses the supplied Headspace
  cards for composition inspiration: a layered visual on the left and a clear,
  vertically centred text/action column on the right. Photos keep a square crop,
  a cream edge and a slight static tilt; standalone product media uses contain.
  Reference-led placement — November 15, 2026: after rejecting the uniform
  card-corner placement, the user approved applying lessons from Wilf & Friends
  (Hey Girl Studio / Finding Design), Leader Bag Co and Headspace / MetaLab.
  Use two illustrations at different scales, anchored to opposite photo edges
  and chosen positions that relate to the subject. Current November 16 pairs:
  Screen free — kite along the child's upward gaze and a separate listening ear;
  Little hands — a new little-hand illustration at table level and a separate
  spinning top; Home — little house for belonging and the library marigold for
  festival stories; Tap to play — open storybook for Kahani and a new abstract
  circular story disc for placing a Koel. These are composition choices,
  not new product claims. Keep the copy/CTA column clear, remove the separate
  line gestures, and retain only the main illustration below 800px. Keep the
  existing container artwork, fills and -1 degree photo tilt. This supersedes
  both the grouped lower-edge vignette and uniform card-level corner anchors.
  Follow-up — November 15, 2026: the user approved the illustration placement
  and requested large background shapes behind the image and in upper-right
  card corners. Add oversized existing library silhouettes as separate, static
  background layers using Sky puddle, Crooked ring and Soft corner. Latest
  colour correction: each background shape must use a darker/lighter shade of
  its own card colour, not a contrasting brand hue. Derive the photo backdrop
  from 86% card fill / 14% black, and the corner from 72% card fill / 28% white.
  Card sources are Mango, Sky, Lavender and Kesar respectively. Preserve the
  proportional SVG masks, existing illustration colours and layer positions.
  On mobile keep the behind-photo shape and hide the corner layer. This
  supersedes the prior background-shape removal, while the separate line
  gestures remain removed.
  Screen free refinement — November 16, 2026: keep the new listening ear.
  Reduce the desktop kite roughly 20%, retain a readable 96px phone version,
  move it up/inward for a gap above the photo, and change its Mango facet to
  Kesar. Keep the photo/copy layout unchanged. Lighten only this card's backdrop
  to 94% Mango / 6% black and reduce its exposed contour to a 128%-wide layer
  at left -16% / top -16px. Use a top/right-cropped library ring variant with
  the existing pale Mango tint. Sources are in
  `outputs/brand-library-v1/extensions/screen-free-refinement/`. These local
  adjustments supersede the shared backdrop ratio for Screen free only.
  Latest all-card refinement — November 16, 2026: extend the lighter, closer
  photo backdrops to every card (94% card fill / 6% black; width 128%, left -16%,
  top -16px). Make the corner shapes larger (clamp 256px / 31vw / 352px) but
  quieter (90% card fill / 10% white), using cropped library silhouettes rather
  than small complete badges. This supersedes the prior 272px corner size and
  28% white tint. The user wants the shape to add fullness without registering
  at first glance. Foreground vectors remain distinct and moderately sized
  (96px mobile, clamp 109px / 11.2vw / 134px desktop main assets; smaller
  companions). Keep four supporting assets maximum per desktop card: two
  illustrations and two background shapes. On mobile keep the main illustration
  and photo backdrop. New vector/contour sources and manifest are under
  `outputs/brand-library-v1/extensions/benefit-asset-refinement-v2/`.
  November 16 containment fix: clip each whole card to an alpha mask generated
  from the same container path and nine-slice mapping as its border-image
  (110 source slices, shared responsive inset). Full original decorative SVGs
  now extend beyond the edge; the card contour performs the crop. Do not fake
  container clipping with a pre-cropped asset viewport or a generic rounded box.
  The generated stylesheet and build/verification helpers live under
  `assets/css/benefit-frame-masks.css` and
  `outputs/brand-library-v1/extensions/benefit-frame-clipping/`. Card 4 uses
  Tilted arch behind the photo and Double dip at the corner, replacing its
  duplicated Sky puddle/ring pair. Preserve the quiet tonal fills and four-asset
  cap. The mobile kite sits slightly inward to remain inside its card contour.
  The unused SVG-only line gestures remain available in
  `outputs/brand-library-v1/extensions/benefit-gestures/`.
  Card grounds use exact Mango, Sky, Lavender and Kesar fills.
  November 15, 2026: the Tap a Koel card ground is Marigold (`#FF5D27`), not
  Kesar or Coconut Husk. The other three cards stay Mango, Sky and Lavender.
  The photo plate keeps its Kesar edge. Black text stays; contrast on Marigold
  is about 6.7:1. Shared type
  tokens, existing tabs, USP copy, Gulab CTAs and crossfade/reduced-motion behaviour
  remain. The user explicitly superseded the earlier one-illustration treatment;
  judge additions by composition and readability. No carousel pager dots.
  November 16, 2026 (`#why`, Tap a Koel card only): the card felt empty. Its
  ground is a lighter shade of Parrot Green: 48% `#2B9863` / 52% white
  (`#99CEB4`). Full Parrot read too dark on this card. Mango, Sky and Lavender
  stay on the other cards. Gulab and Sindoor are too dark for this card's black
  text; Hibiscus stays an accent because it sits against the Player's red band.
  Black body text on the lighter Parrot is about 11.8:1. The card shell, Kesar plate size, shared visual padding, black
  text, Gulab CTA and tonal shape fills stay. This card's tilted-arch backdrop
  is 198% of the photo column and shifted up and left. The open storybook and
  story disc are larger. The upper-right Double dip is about 45% above the
  shared corner size (`clamp(372px, 45vw, 510px)`), past the requested 30%
  increase. The other three cards keep the shared sizes.

- Superseded earlier November 14, 2026: static 2×2 Yoto-style feature bento. Superseded November 12, 2026 three-column step bento. Both replaced by the tabbed one-card feature stage above.

- User direction on November 14, 2026 (`shopify-homepage/` FAQ): question summaries use `--hk-text-subhead` (not body); give the section more vertical padding, roomier row padding, and a clear gap between accordion items so the list does not feel squished. Answers stay `--hk-text-body`; keep accordion height measurement via `.hk-faq__content` padding (no vertical margin on answer `p`). November 17, 2026: question summaries also use Body, because Subhead felt too big. The plus mark uses the same size.

- Current section order, November 16, 2026: Hero → Why / USPs → How it works →
  Koels → Player → App → Founder → Community → FAQs. The separate How it works
  section supersedes the earlier Why → Koels adjacency. The Player remains
  between Koels and the app.

- User direction on November 13, 2026 (`shopify-homepage/` Koels section): add Yoto-like atmosphere of soft layered depth waves and faint spark accents on the Sindoor ground — patterns and colour only. No floating doodle/illustration assets in this section. Keep organic edges, white intro type, and Kesar Explore CTA.

  November 14 asset application: the user explicitly requested the selected
  library in Koels and testimonials, with restrained density and cautious
  removal of anything that competes. Koels now uses the library's Open storybook
  in the existing header-mark position; its Sindoor ground, depth waves, edges
  and product-card controls remain. The redundant spark overlay was removed.
  This permits the header illustration, not floating graphics over the products.
  November 15 book correction: replace only this header's red book with the
  new `open-storybook-sky.svg` drawing (Sky cover, Monsoon binding, Kesar pages,
  Mango bookmark/sound marks). Keep the subject an open book. Its editable
  source/manifest are in the library's `extensions/storybook-sky/`. A subsequent
  screenshot request applies the same blue-cover book to the Tap to play / Why
  card as well.

  November 15, 2026: remove the Sky puddle and Mango Crooked ring from the
  Koels introduction. Keep the open-storybook mark, Sindoor waves, clear product
  grid, and the centered heading. Those two shapes stay available in the Why
  benefit cards.

  Testimonials now place Moon and stars, Little home, Rain cloud, Spinning top
  and Pebble pair in a separate header area beside each quote mark, replacing
  the old large motifs behind the words. Long wave was removed from the
  quiet/screen-free card on November 14, 2026. Content-sized, softly irregular
  card surfaces retain the existing brand-pastel mix and quote hierarchy.
  Fixed-aspect container SVGs are not stretched to hold long quotes. The copy,
  attributions, five-card arrangement and existing interaction behaviour are
  preserved.

- User direction on November 11, 2026 (`shopify-homepage/` testimonial cards): use different soft brand-derived colours and genuinely distinct decorative shapes, informed by the supplied pastel-card references. Keep the treatment minimal, with one tonal background silhouette per card and clear black quote text. This supersedes earlier white/red-only card styling and the faint neutral corner-blob iterations for this section. Preserve the existing quotes, attributions and card layout; reference ratings and review links do not authorise adding ratings or claims.

  Later refinement: the user liked the coloured shapes and asked for a reason behind each. The current motifs connect to the quote: crescent for bedtime, open doorway for feeling at home, rain cloud for quiet/screen-free calm (replaced the Long wave on November 14, 2026 after the user said the wave did not make sense), ascending steps for independence, and overlapping rounded forms for shared stories. Keep them recognisable and tonal; the mapping is visual interpretation, not a new product claim.

  Latest colour correction: use slightly poppy pastel shades of the brand guide's named colours. Full-strength surfaces were too dark; the 28% colour wash was too light. The current balance uses Kesar Sand, Lavender tea, Mango Yellow, Coconut Husk and Sky Blue at 48% brand colour / 52% white, not unrelated pastel hexes. Shapes and quote marks use existing named brand shades; lower shape opacity keeps the background motifs quiet. Shape meanings, placement, black body text and layout remain unchanged.

- User direction on November 8, 2026: add a slim announcement bar above the navbar for USP/delivery messaging. Use existing product USPs until approved delivery copy is supplied. The announcement scrolls away while the existing navbar remains sticky. This explicitly supersedes the earlier preference to omit first-viewport announcement bars; preserve the navbar’s wordmark clearspace.
- User direction on November 14, 2026 (`shopify-homepage/` announcement strip): **Sindoor Red** (`#B40023`, `--hk-sindoor`) ground with **Kesar Sand** (`#FFF1D6`, `--hk-kesar`) text and icons. Content is **offers/promos** (e.g. % off, limited-time, free gift), not USPs. Show **one** offer at a time; rotate every **2.5 seconds** with blur-out / blur-in. Reduced motion drops blur and keeps opacity only. Exact brand tokens only; replace promo copy with approved offers when supplied.
- User direction on November 14, 2026 (`shopify-homepage/` navbar): **floating** content-width bar — same max width as `.hk-wrap` / `--hk-content` (1120px), centered, rounded, with a soft shadow — not full-bleed. Sindoor wordmark (`wordmark.svg`), black links/icons, Gulab bag badge. Mobile drawer opens inside the same floating shell. The solid white/`--hk-canvas` surface from this note is superseded by the November 16, 2026 frosted Kesar treatment below.
- User direction on November 16, 2026 (`shopify-homepage/` navbar): the floating bar is frosted **Kesar Sand** at 82% opacity (`rgba(255, 241, 214, 0.82)`) with a 16px background blur, not solid white. Shop Player, Shop Koel, Bestsellers, and Founder's Bundle share one hover and one open state: white pill, Gulab label, no underline. Search and bag sit in one light capsule with one shared hover; the hairline before search is removed. November 17, 2026: that capsule is a little wider and uses a warm Kesar/Husk cream, not white.
- User direction on November 14, 2026 (`shopify-homepage/` desktop mega menus): one shared floating overlay matching the **navbar width**, **clean/minimal** (Oura-like). Fixed height. **Left** large rounded hero image with title + circular go control; **right** compact thumbnail rows + Shop all. Hover Player/Koel opens with ease-out blur-in; close uses blur-out. Switching Player ↔ Koel keeps the same overlay and swaps content inside. Row hover updates the hero. Bestsellers/Bundle hover, Escape, and mouseleave dismiss. No close button, no heavy split red/cream panels. Desktop/fine-pointer only; mobile keeps the drawer. Exact brand tokens only.

- User direction on November 8, 2026: `shopify-homepage/` Koel product cards use full-card rectangular artwork, with the circular disc silhouette/rim cropped out. Use taller 2:3 card proportions, a top category badge, and a Kesar Sand (`#FFF1D6`) linear fade with masked progressive blur toward the bottom, sharp black title and existing price above Preview and Add to bag. Place Preview beside a 44px circular icon-only bag button; tapping the bag shows the existing tick confirmation. Keep the accessible Add to bag/Added to bag labels and narrow two-column mobile grid. Preserve the current grid, inline audio/waveform behavior, data and shared CTA styling. This supersedes the earlier circular-disc/contained-art card presentation.
- User direction on November 11, 2026: Koel Preview pill is a near-white frosted surface (`rgba(255, 252, 247, 0.92)` with light blur), not Coconut Husk. Category badges use a frosted white blur background over artwork.
- User direction on November 12, 2026: match the Koels section ground to the footer's Sindoor Red (`#B40023`), not Gulab Red. Keep white heading/intro text and organic edges showing the white sections above and below. Reverse the Explore CTA to Kesar Sand with a Sindoor Red label for contrast. Keep the Koel cards on their Kesar Sand foundation with black card copy and existing brand-red bag controls; hide the organic edges on narrow screens as already configured. November 17, 2026: poster titles use Body (17px) instead of Subhead.
- User direction on November 16, 2026 (`shopify-homepage/` section waves): remove the USP lines from the strip. Use three tall waves in Sky, Mango, and Marigold (`clamp(84px, 11vw, 148px)`, not a thin ribbon), with Sindoor continuing into the Koels section. Repeat that stack at the end of Koels, reversed, so Marigold meets the red and Sky meets the section below. The three Temple depth waves inside the section use that same curve and the same height, so their crests line up with the color bands. The bottom color stack sits clear of the Koel cards: the section’s bottom padding is the stack height plus a gap. The red above that stack is continuous — no straight clip and no flat red cap above the Marigold wave. November 18, 2026: that same Sky, Mango, and Marigold stack breaks every homepage section. The cap above the stack matches the section it leaves, and the cap below matches the section it enters. The help row is Kesar, with a cream wave on its top and bottom edges and white cards. The colour stack above the Player is removed. Its top edge is a single Kesar wave. The colour wave above Shop the Player & Koels is removed, and so is the one above A little story for every day. The One Player strip is the other: no wave stack above or below it.
- Current Player section direction, November 17, 2026: the user rejected the
  overall scale and positioning, the price/button row, and the overpowering
  floating badges, and requested Mobbin references followed by implementation.
  Use a large product view on the left and a separate copy/purchase column on
  the right. The price sits above Shop Player. The four existing lines sit below Shop Player as a plain vertical list:
  a black stroke icon beside Open Sans body text, with no pill, fill, shadow,
  or description. November 18, 2026: this replaces the coloured Averia pills.
  The lines stay Screen free by design, Made for little hands, A tap is all
  it takes, and Stories that feel like home. The cutout is 290px wide at its desktop
  maximum following the user's request to make the revised image a little smaller.
  Preserve its intrinsic 573/1134 proportion and the whole handle,
  five controls, Gulab speaker band and wood base. The heading uses the shared
  Section token and wraps naturally; the local narrow-screen size exception is
  removed. Keep Kesar ground, black copy, the shared Gulab button, the white exit
  wave, and this section between Koels and the app.
  On narrow screens use heading/lead → product → price/button → benefits.
  Keep only the Mango speaker-ripples backdrop. November 18, 2026: it sits behind the Player, centred on the speaker band, so the arcs show on either side of the body.
  November 17, 2026: the user first asked for a larger backdrop, then said it
  was too big. November 18, 2026: it is 560px on desktop and 440px below 800px,
  proportional and behind the Player, centred on the speaker band.
  Remove the two detached corner scribbles from this section. Existing SVG
  source files remain available for other uses.
  The user-confirmed price remains **$129 USD**, owned by
  `shopify-homepage/data/player.json`. HTML is a static snapshot of that record;
  Shopify must supply its native product price when integrated.
  Structure references inspected on Mobbin: [Daylight product purchase](https://mobbin.com/sites/sections/89ed61e7-de0b-49f4-ab94-b5a54d43cc7a)
  for a large product view beside the purchase details and quiet feature text,
  and [Norma purchase](https://mobbin.com/sites/sections/857a4823-e36c-4392-b388-5012f2c0a2b6)
  for a separate product/purchase arrangement and price above the action.
  Their styling, controls and product claims are not part of this direction.
  This supersedes the earlier centered composition, reduced speaker size,
  price/button row, floating USP cards and corner-scribble placements.

- User direction on November 7, 2026: section titles across the `shopify-homepage/` refresh must share one size (`--hk-text-section` / `hk-display--lg`). No per-section heading size overrides (e.g. How it works vs companion app). Body copy uses Open Sans medium (500). Keep the scale in `design.md` and `tokens.css` in sync.
- User direction on November 14, 2026: increase all section header (`h2.hk-display--lg`) sizes — they felt too small. Raise `--hk-text-section` to clamp → **48px** max (was 40px). Keep one shared token for every section; do not add per-section size overrides. Hero (`--hk-text-hero`, 56px max) stays larger.
- User direction on November 7, 2026: page text (headings, leads, body, FAQ, founder, footer copy) uses **black `#000000`** via `--hk-ink` / `--hk-body`. Do not use Temple Maroon for running copy. Brand Story Ink `#05334A` remains available as `--hk-story-ink` for reference only. Remove unused section eyebrows when the user cuts them (App “For grown-ups”, Koels “Kahani Koels”).
- User direction on November 7, 2026: all storefront CTAs use the hero button pair sitewide — **primary** solid Gulab pill with white label and soft red shadow; **secondary** frosted light pill with black label. No outline-red ghosts, soft-rect CTAs, or per-section button skins. Classes: `hk-btn hk-btn--primary` / `hk-btn hk-btn--secondary`.
- Superseded graphic direction, November 7, 2026: sparse hand-drawn object doodles were limited to selected sections. The November 10 questionnaire above now governs graphic style and placement: minimal organic framing throughout the experience, regular rounded cards, and unobstructed product media. The earlier object list is optional inspiration, not a required motif inventory.
- User direction on November 7, 2026: body text sizes must be consistent sitewide via `--hk-text-body` (17px). Dense UI uses `--hk-text-body-sm`; fine print uses `--hk-text-fine`. No per-section body `font-size` overrides.
- User authorization on November 4, 2026: fictional parent names and sample quotes may populate the testimonial mockup when every card clearly labels them “Fictional sample”. They are not actual customer reviews and must be replaced with approved attribution before launch.

- User direction on November 4, 2026: use **white `#FFFFFF`** for `--hk-paper` / the principal page background. Keep **Kesar Sand `#FFF1D6`** (`--hk-sand` / `--hk-canvas-warm`) for the footer for now, not as the site-wide ground. The PDF does not mandate a particular web background. The active vector logos are transparent and must not have white background plates.
- Footer colour (active November 7, 2026 shopify-homepage): **Sindoor Red** ground, **Kesar cream** wordmark (`wordmark-cream.svg`), cream body/link text, soft cream dividers, November 17, 2026: the newsletter email and Join share one Kesar capsule. Join is a Sindoor pill with a Kesar label. This replaces the separate translucent field and the earlier Kesar button with a Sindoor label. November 18, 2026: that capsule replaces the “Little stories. Lasting roots.” line in the brand row. The separate “A little Kahani in your inbox” block is removed. No blue. This restores the inverse footer treatment over the brief cream-ground trial.
- Footer layout (November 7, 2026): VanMoof three-tier on Sindoor Red — (1) compact brand row with cream wordmark + community line, (2) newsletter column beside Explore/About/Help, (3) copyright + Privacy/Terms. Keep the top row content-height only (no empty red band). Newsletter pitch uses `hk-display--md`.
- Superseded November 11, 2026: the homepage About / “Stories that feel like them” belief + three lifestyle moments section is removed. Origin story stays in Founder. Footer “Our story” points to `#founder`.
- Latest user direction on November 4, 2026: retain the testimonial ticker's Kesar Sand background and black heading block, with no section preview line or visible pause control. Images must remain clearly visible, card text must be black rather than red/maroon, and card type must be smaller. Blend clear lifestyle photos continuously into the text using a linear white fade and progressively masked blur, with white card backgrounds; do not create a separate text panel or abrupt image/text edge. Retain the looping layout and image provenance documentation; do not introduce blue surfaces.

1. Hero and Player/Koel introduction form one continuous scroll story.
2. Companion app section.
3. One Koel “vinyl shop” section: circular coin Koels on CSS pedestals (desktop 6/5/4 for 15 items, mobile 3×5), tap opens a play-first overlay with secondary shop preview. No Daily Life / Festivals split in this section.
   User correction on November 4, 2026: keep the collection on the continuous page ground (now white), without a grey studio backdrop or framed panel. Pedestals still use Kesar Sand and Coconut Husk with tonal shading for depth.
   User direction on November 4, 2026 (updated later same day): Koel preview is a centered vertical overlay — title, circular Koel art, circular play control, live continuous sound wavelength (Web Audio analyser; collapses to a single line when paused), then Add to bag. Keep the existing open motion. A design-preview sample may drive the wavelength until approved excerpts exist.
4. Founder story (latest user direction November 16, 2026): remove the postcard effect and align the section with the current homepage. Use an open text/photo split on a full-width Kesar Sand section background (same-day follow-up: the white section felt empty), shared Averia section heading, Open Sans body copy, black text and the existing Gulab shop CTA. No paper texture, inset borders, postal marks, address lines, photo tilt or printed-photo frame. A proportionally scaled library Sky puddle silhouette in Mango supports the rounded portrait. Same-day asset refinement: enlarge the backdrop from 120% to 154% of the media width and let it extend beyond the media box; keep section-level overflow contained. Add Little home at the lower-left image edge for belonging and a smaller Banyan leaf at the opposite upper-right edge for rootedness. Keep both clear of the face, Player and copy; below 980px retain only the home illustration. These are static supporting assets, not new content or product claims. Preserve the founder story and generic attribution. The portrait stays replaceable at `assets/images/founders/founder-portrait.jpg`, with a taller crop: on desktop the portrait stretches alongside the complete text column with 24px insets; on narrow screens it uses a square crop and stacks heading → portrait → letter/action. White wave cutouts at both section edges reuse the existing homepage curves, stay visible on mobile, and have dedicated content clearance. This supersedes the November 7 tactile-postcard treatment. November 17, 2026: the letter body uses the 15px UI size, the sign-off uses Body (17px), and the Shop now button is removed. A decorative ink signature sits under that sign-off. It is not a real person’s name and does not introduce a founder name. The separate About belief/moments section was removed November 11, 2026.
5. Customer stories.
6. FAQs.
7. Footer.
8. Bag is a right-side overlay drawer (`#bag-dialog.hk-dialog--drawer`): line items with thumb, title, meta, qty −/+, line price, remove; sticky foot with Total, disabled Gulab Checkout placeholder, Keep exploring. Add-to-bag keeps the snackbar only and does not auto-open the drawer. Account is a centered form-only modal (`#account-dialog.hk-dialog--account`) with Yoto-inspired fields, Gulab Continue, and a Shopify Customer Accounts note—no photo panel.

The Player moves from the right toward center as the second section arrives. A circular Koel is hidden in the initial landing fold, then enters the explanation and docks on its top plate. The first and second fold share the same white page background.

Latest first-fold refinements: a smaller title with a brief, one-time opacity fade; a compact three-zone desktop navigation and a contained mobile disclosure; and a background-free approved wordmark. On October 31, 2026 the user explicitly rejected the two-photo morph and requested actual 3D. The homepage Player now uses a geometric GLB with camera rotation, hover and direct drag controls, plus a static product-image fallback. The model is an approximate recreation of the supplied manufacturing renders, not CAD or approved merchandise imagery. These are project decisions, not requirements stated by the guide.

## Shopify and motion constraints

These are the project’s implementation constraints:

- Keep the current frontend plain HTML, CSS, and native JavaScript, with reusable `hk-` classes and section boundaries that can migrate to Liquid.
- Product imagery, product selection, price, availability, and stable IDs must remain separate from presentation and motion code. Shopify product/media references should later populate the same semantic markup.
- Keep ordinary product cards image-based. The explicitly requested homepage 3D enhancement uses one lazy-loaded, self-hosted model viewer and a replaceable GLB product-media source. A new product must not require custom animation code.
- Do not load manufacturing archives or CAD files into the storefront. Keep the renderer isolated to this enhancement, preserve an image fallback on load/WebGL failure, and use Shopify product model media when the store is connected.
- Keep hover movement subtle, enabled only for a fine pointer with hover support, and disabled for reduced motion. Touch scrolling and native page scrolling must remain usable.
- Compose hover on a wrapper or separate presentation layer so it does not overwrite the scroll animation’s transform or break Player/Koel alignment.
- Respect reduced motion and keep a readable static fallback. Preserve content without JavaScript.
- No autoplay audio. Keep public excerpts and protected recordings separate.
- No store/backend/checkout connection is implied by a UI task. The current commerce controls remain honest preview states until Shopify integration is requested.

## Practical UI check before finishing a change

- Correct colors and font families; readable contrast in the actual combination.
- Official logo asset/variation and proportional clearspace, or clearly tracked provisional status.
- Product geometry and Gulab Red production band; separate Koel rather than a fictional printed top.
- Warm imagery and positive, culturally authentic copy without unsupported claims.
- Shared media/data boundaries remain suitable for Shopify.
- Hover, scroll and reduced-motion behaviors compose; no heavy runtime or scroll hijacking.
- Report what was verified. Browser use remains explicit, current-message opt-in; a build or source check is not visual proof.
