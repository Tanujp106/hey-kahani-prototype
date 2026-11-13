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

The guide does not prescribe a website type scale. The **active storefront type scale** below is a project decision (November 7, 2026) for `shopify-homepage/` and must stay consistent. Do not invent one-off `font-size` overrides per section.

### Active type scale (`shopify-homepage/assets/css/tokens.css`)

| Role | Token | Size | Class / use |
| --- | --- | --- | --- |
| Hero title | `--hk-text-hero` | clamp → **56px** max | `h1.hk-display--hero` only |
| Section title | `--hk-text-section` | clamp → **48px** max | **Every** section `h2.hk-display--lg` (Why, App, Koels, Founder, Community, FAQ). Same size always. Raised from 40px on November 14, 2026. |
| Secondary display | `--hk-text-md` | clamp → **32px** max | `hk-display--md` |
| Subhead / feature h3 | `--hk-text-subhead` | clamp → **24px** max | Strip lines, newsletter h3, founder sign-off, FAQ question summaries |
| Step title | `--hk-text-step` | clamp → **30px** max | Legacy step titles only |
| USP card title | `--hk-text-md` → `--hk-text-section` on desktop | **32px** → **48px** | Why Hey Kahani feature panel `h3` titles (tracks section title token) |
| Lead + body | `--hk-text-body` | **17px** | **All** leads (`hk-lead`, hero, How, App, section intros) and running body paragraphs. Open Sans **medium 500**. `--hk-text-lead` / `--hk-text-hero-lead` alias this size. |
| Body small | `--hk-text-body-sm` | **15px** | Dense UI / meta / nav / quote attribution only |
| Fine print | `--hk-text-fine` | **12px** | Legal and newsletter disclaimer only |
| Eyebrow | `--hk-text-eyebrow` | **13px** | Uppercase section labels |

**Hard rule:** If two section titles look different, a local override snuck in. Delete it and use `--hk-text-section` / `hk-display--lg`.

**Hard rule:** Leads and running body copy must use `--hk-text-body` only (same size everywhere). Do not set one-off `font-size` (px/rem) on paragraphs, leads, feature descriptions, or FAQ answers. Dense UI stays on `--hk-text-body-sm`; legal on `--hk-text-fine`.

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

- User direction on November 14, 2026 (`shopify-homepage/` second fold): one large feature card at a time with a **top pill tab switcher** (Calm-style reference). Soft brand pastel card grounds, squircle media, Averia titles, Gulab primary CTAs, directional crossfade; reduced motion keeps opacity/color only. Same-day refinements: tighten empty cards and add selected brand-library vectors; **rework copy from how-to steps into USPs**. Section id `#why`. Header belief line: “Stories that feel like yours.” (not the discarded “Why families choose it” slogan). Four panels use existing store messaging: Screen free by design; Made for little hands; Stories that feel like home; Tap a Koel. Hear a Kahani. Hero/footer CTAs say “Why Hey Kahani,” not “How it works.” Not a horizontal card carousel and not earlier how-to bentos.

- Same-day cleanup: remove pre-guideline hand-drawn `hk-doodle-*` sprites (kite, spark, sun, star, etc.), the `kids-objects.svg` sprite sheet, and Why bottom pager dots from markup/CSS/JS. Decorative graphics must come from `outputs/brand-library-v1` (or Lucide for UI icons), not the old doodle set.

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
  Follow-up user correction: a single asset still feels empty. Each desktop
  card combines the main illustration, a related companion, one broad framing
  shape and a short freehand line. A subsequent placement correction rejected
  scattered corner assets and the detached motif row above the heading. Keep
  the graphics together in one vignette along the photo's lower edge: the line
  leads into the larger illustration and smaller companion on a shared baseline,
  with the broad shape behind the group and photo. The text column begins at
  the heading. Photo tilt is a consistent -1 degree. Mirror the whole home
  vignette to the left, away from the Player. Below 800px, keep the grouped main
  illustration and line; hide the broad shape and companion. Container shapes,
  fills and asset choices are unchanged by this placement correction.
  New editable, SVG-only line gestures extend H / Freeform rhythm under
  `outputs/brand-library-v1/extensions/benefit-gestures/`.
  Card grounds use exact Mango, Sky, Lavender and Kesar fills. Shared type
  tokens, existing tabs, USP copy, Gulab CTAs and crossfade/reduced-motion behaviour
  remain. The user explicitly superseded the earlier one-illustration treatment;
  judge additions by composition and readability. No carousel pager dots.

- Superseded earlier November 14, 2026: static 2×2 Yoto-style feature bento. Superseded November 12, 2026 three-column step bento. Both replaced by the tabbed one-card feature stage above.

- User direction on November 14, 2026 (`shopify-homepage/` FAQ): question summaries use `--hk-text-subhead` (not body); give the section more vertical padding, roomier row padding, and a clear gap between accordion items so the list does not feel squished. Answers stay `--hk-text-body`; keep accordion height measurement via `.hk-faq__content` padding (no vertical margin on answer `p`).

- User direction on November 14, 2026 (`shopify-homepage/` section order): place Koels (`#koels`) immediately after Why (`#why`), with the companion app / phone section (`#app`) directly below Koels. Order: Hero → Why → Koels → App → Founder → Community → FAQs.

- User direction on November 13, 2026 (`shopify-homepage/` Koels section): add Yoto-like atmosphere of soft layered depth waves and faint spark accents on the Sindoor ground — patterns and colour only. No floating doodle/illustration assets in this section. Keep organic edges, white intro type, and Kesar Explore CTA.

  November 14 asset application: the user explicitly requested the selected
  library in Koels and testimonials, with restrained density and cautious
  removal of anything that competes. Koels now uses the library's Open storybook
  in the existing header-mark position; its Sindoor ground, depth waves, edges
  and product-card controls remain. The redundant spark overlay was removed.
  This permits the header illustration, not floating graphics over the products.

  Latest November 14 background correction: frame the Koels introduction with
  Sky puddle and Mango Crooked ring in separate side columns outside the 40rem
  reading column. The kite/boat arrangement and negative-offset crops were
  rejected. Use CSS background assets so decorative media cannot create large
  in-flow images if styling is unavailable. At 1100px and below keep one complete
  96px ring beside the book mark, above the heading. Preserve the Sindoor waves,
  clear product grid and static, non-interactive decorative treatment.

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
- User direction on November 14, 2026 (`shopify-homepage/` navbar): **floating** content-width bar — same max width as `.hk-wrap` / `--hk-content` (1120px), centered, rounded, white/`--hk-canvas` surface with soft shadow — not full-bleed. Sindoor wordmark (`wordmark.svg`), black links/icons, Gulab bag badge. Mobile drawer opens inside the same floating shell.
- User direction on November 14, 2026 (`shopify-homepage/` desktop mega menus): one shared floating overlay matching the **navbar width**. Hover **Shop Player** / **Shop Koel** opens it with ease-out blur-in; close uses blur-out. Switching Player ↔ Koel keeps the same overlay and crossfades/blurs content sets inside. **Left** Kesar names, **right** Sindoor featured image on name hover. Close, Escape, mouseleave dismiss. Desktop/fine-pointer only; mobile keeps the drawer. Exact brand tokens only.

- User direction on November 8, 2026: `shopify-homepage/` Koel product cards use full-card rectangular artwork, with the circular disc silhouette/rim cropped out. Use taller 2:3 card proportions, a top category badge, and a Kesar Sand (`#FFF1D6`) linear fade with masked progressive blur toward the bottom, sharp black title and existing price above Preview and Add to bag. Place Preview beside a 44px circular icon-only bag button; tapping the bag shows the existing tick confirmation. Keep the accessible Add to bag/Added to bag labels and narrow two-column mobile grid. Preserve the current grid, inline audio/waveform behavior, data and shared CTA styling. This supersedes the earlier circular-disc/contained-art card presentation.
- User direction on November 11, 2026: Koel Preview pill is a near-white frosted surface (`rgba(255, 252, 247, 0.92)` with light blur), not Coconut Husk. Category badges use a frosted white blur background over artwork.
- User direction on November 12, 2026: match the Koels section ground to the footer's Sindoor Red (`#B40023`), not Gulab Red. Keep white heading/intro text and organic edges showing the white sections above and below. Reverse the Explore CTA to Kesar Sand with a Sindoor Red label for contrast. Keep the Koel cards on their Kesar Sand foundation with black card copy and existing brand-red bag controls; hide the organic edges on narrow screens as already configured.
- User direction on November 14, 2026 (`shopify-homepage/` USP strip into Koels): the cream USP strip is the same wave as the Sindoor Koels edge, not a flat bar. A white wave cuts the strip’s top and the strip ground continues through the matching wave into the red. The bottom Koels wave stays white where it meets the app section. That lower edge still hides on narrow screens; the strip wave stays so the points can ride it.
- User direction on November 14, 2026 (`shopify-homepage/` USP strip): each character and each icon sits on the strip wave path, rotated to that curve, and the line glides continuously. Phrases are not shifted as flat blocks. Icons are not held upright off the path. Hover pauses the scroll. Reduced motion keeps the points still, on the wave, with no looping movement. The cream band stays only as tall as the points plus the wave clearance (`--hk-wave` max 16px); do not pad it into a large banner.

- User direction on November 7, 2026: section titles across the `shopify-homepage/` refresh must share one size (`--hk-text-section` / `hk-display--lg`). No per-section heading size overrides (e.g. How it works vs companion app). Body copy uses Open Sans medium (500). Keep the scale in `design.md` and `tokens.css` in sync.
- User direction on November 14, 2026: increase all section header (`h2.hk-display--lg`) sizes — they felt too small. Raise `--hk-text-section` to clamp → **48px** max (was 40px). Keep one shared token for every section; do not add per-section size overrides. Hero (`--hk-text-hero`, 56px max) stays larger.
- User direction on November 7, 2026: page text (headings, leads, body, FAQ, founder, footer copy) uses **black `#000000`** via `--hk-ink` / `--hk-body`. Do not use Temple Maroon for running copy. Brand Story Ink `#05334A` remains available as `--hk-story-ink` for reference only. Remove unused section eyebrows when the user cuts them (App “For grown-ups”, Koels “Kahani Koels”).
- User direction on November 7, 2026: all storefront CTAs use the hero button pair sitewide — **primary** solid Gulab pill with white label and soft red shadow; **secondary** frosted light pill with black label. No outline-red ghosts, soft-rect CTAs, or per-section button skins. Classes: `hk-btn hk-btn--primary` / `hk-btn hk-btn--secondary`.
- Superseded graphic direction, November 7, 2026: sparse hand-drawn object doodles were limited to selected sections. The November 10 questionnaire above now governs graphic style and placement: minimal organic framing throughout the experience, regular rounded cards, and unobstructed product media. The earlier object list is optional inspiration, not a required motif inventory.
- User direction on November 7, 2026: body text sizes must be consistent sitewide via `--hk-text-body` (17px). Dense UI uses `--hk-text-body-sm`; fine print uses `--hk-text-fine`. No per-section body `font-size` overrides.
- User authorization on November 4, 2026: fictional parent names and sample quotes may populate the testimonial mockup when every card clearly labels them “Fictional sample”. They are not actual customer reviews and must be replaced with approved attribution before launch.

- User direction on November 4, 2026: use **white `#FFFFFF`** for `--hk-paper` / the principal page background. Keep **Kesar Sand `#FFF1D6`** (`--hk-sand` / `--hk-canvas-warm`) for the footer for now, not as the site-wide ground. The PDF does not mandate a particular web background. The active vector logos are transparent and must not have white background plates.
- Footer colour (active November 7, 2026 shopify-homepage): **Sindoor Red** ground, **Kesar cream** wordmark (`wordmark-cream.svg`), cream body/link text, soft cream dividers, Kesar Join CTA with Sindoor label. No blue. This restores the inverse footer treatment over the brief cream-ground trial.
- Footer layout (November 7, 2026): VanMoof three-tier on Sindoor Red — (1) compact brand row with cream wordmark + community line, (2) newsletter column beside Explore/About/Help, (3) copyright + Privacy/Terms. Keep the top row content-height only (no empty red band). Newsletter pitch uses `hk-display--md`.
- Superseded November 11, 2026: the homepage About / “Stories that feel like them” belief + three lifestyle moments section is removed. Origin story stays in Founder. Footer “Our story” points to `#founder`.
- Latest user direction on November 4, 2026: retain the testimonial ticker's Kesar Sand background and black heading block, with no section preview line or visible pause control. Images must remain clearly visible, card text must be black rather than red/maroon, and card type must be smaller. Blend clear lifestyle photos continuously into the text using a linear white fade and progressively masked blur, with white card backgrounds; do not create a separate text panel or abrupt image/text edge. Retain the looping layout and image provenance documentation; do not introduce blue surfaces.

1. Hero and Player/Koel introduction form one continuous scroll story.
2. Companion app section.
3. One Koel “vinyl shop” section: circular coin Koels on CSS pedestals (desktop 6/5/4 for 15 items, mobile 3×5), tap opens a play-first overlay with secondary shop preview. No Daily Life / Festivals split in this section.
   User correction on November 4, 2026: keep the collection on the continuous page ground (now white), without a grey studio backdrop or framed panel. Pedestals still use Kesar Sand and Coconut Husk with tonal shading for depth.
   User direction on November 4, 2026 (updated later same day): Koel preview is a centered vertical overlay — title, circular Koel art, circular play control, live continuous sound wavelength (Web Audio analyser; collapses to a single line when paused), then Add to bag. Keep the existing open motion. A design-preview sample may drive the wavelength until approved excerpts exist.
4. Founder story (homepage section replaced the earlier Founder’s Bundle slot on November 4, 2026; latest user direction November 7, 2026): wrap the compact founder letter and portrait in one tactile postcard container. Use warm Kesar paper with visible raster fiber/grain texture, fine inset edging, a subtle postal mark and framed landscape photo; no blue surfaces. Keep the heading above the left-hand letter, black text, shared type tokens, generic founder attribution and Gulab shop CTA. The portrait stays replaceable at `assets/images/founders/founder-portrait.jpg`, using a balanced 5:4 landscape crop. Stack the content on mobile. This supersedes the earlier open/no-container layout. The separate About belief/moments section was removed November 11, 2026.
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
