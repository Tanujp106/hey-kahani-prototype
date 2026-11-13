# Hey Kahani graphic library v1

Selected direction: November 13, 2026. Website asset library.

The user selected two references: **H / Freeform rhythm** for abstract shapes
and **A / Loose cut shapes** for illustrative vectors. Copies of the selected
attachments are preserved in `reference/`. These are the source of the drawing
language; the brand identity guide remains the source of exact colour values.

This library contains 36 individual, editable SVG drawings, matching transparent
PNG exports and three numbered preview sheets. It does not change the website.

### Website additions — November 14, 2026

The Why cards also use four new **SVG-only line gestures** in
[`extensions/benefit-gestures/`](extensions/benefit-gestures/README.md), with a
separate [manifest](extensions/benefit-gestures/manifest.json). They follow H /
Freeform rhythm and are not included in the original 36-asset preview sheets
or PNG exports. Use them as small, proportionally scaled strokes in their own
space, away from words and controls. Current card combinations and responsive
rules are documented in `design.md` and the website image README.

## Start here: choose the graphic's job

Practical usage guidance added November 14, 2026. The style is selected; the
placements below are starting recommendations for applying it to real content.

| What the section needs | Use | Example |
| --- | --- | --- |
| A surface that groups text, a quote or an image | A **filled container** | Soft postcard behind a short benefit or quote |
| Framing, emphasis, rhythm or a section-edge gesture | A **decorative shape** | Wandering loop beside a heading, or Long wave cropped at a section edge |
| A recognisable idea supporting the message | An **illustration** | Little home for belonging; Flying kite for imagination |
| A recognisable control or product instruction | The existing **Lucide/UI system**, or accurate product media | Bag, search and playback controls; placing a Koel on the Player |

Choose the message and content first, then the asset. A section can stay quiet
when the product image, story artwork or copy already supplies its personality.
An illustration does not need a container, and a container does not need extra
graphics to be complete.

1. Write the section's main message and choose the actual content it must hold.
2. Decide whether the graphic should **hold content**, **frame content** or
   **explain an idea**. Use the chooser tables below.
3. Fit the real copy or image, then choose colour, size and placement. Keep the
   message, image subject and next action visually clear.
4. Check the narrow layout. Simplify if the text becomes cramped, the image
   subject is cropped or the action becomes harder to find.

The preview sheets show the available vocabulary, not a composition to copy
with every asset at once: [containers](preview/containers.png),
[shapes](preview/decorative.png), [illustrations](preview/illustrations.png).

## Two related drawing families

**Shapes:** asymmetrical blobs, open loops, rounded zigzags, broad ribbons and
uneven bursts. The handmade quality comes from contour and proportion. Mix
filled forms with a few open-line forms. Keep a clear reason for each accent.

**Illustrations:** simple, recognisable objects and plants built from a few
large colour masses, with selective dark curved details. Preserve a gently
imperfect silhouette. Vary the subject and construction, not just colour or
rotation. Nature, play, home and listening supply the vocabulary.

Most artwork is faceless. The gentle sun has only the two small closed-eye
strokes shown in the selected reference. Do not turn the whole library into a
cast of smiling objects.

## What stays consistent

- Flat, opaque fills; no gradients, grain, shadows, glossy highlights or 3D.
- Soft asymmetry, broad curves and slightly uneven corners; avoid jitter added
  indiscriminately to every edge.
- Rounded line caps and joins. Dark detail is selective rather than a universal
  outline. Open bursts and loops can be line-led.
- Transparent artwork backgrounds. Kesar or white belongs to the surrounding
  composition unless it is the asset's actual filled form.
- No text, fonts, embedded raster images, scripts or external resources in an
  individual asset. Website typography remains Averia Serif Libre and Open Sans.
- No product geometry, logo reconstruction, story titles or commerce claims.

## Palette

| Role | Colours used in this library |
| --- | --- |
| Main identity | Gulab Red `#D3000A`, Kesar Sand `#FFF1D6`, Sky Blue `#63C3FE`, Mango Yellow `#FECB74`, Story Ink `#05334A` |
| Supporting | Parrot Green `#2B9863`, Marigold Orange `#FF5D27`, Lavender tea `#D6C9E4`, Coconut Husk `#E6CEAD` |
| Small optional accent | Hibiscus Pink `#EF2289` |

The pink flick is an accent option, not a new major surface colour. Primary
colours should establish the composition. Secondary colours support them. Use
Story Ink for most fine illustrative details. Recolour through the existing
brand palette; do not sample approximate colours from reference PNGs.

## Filled containers: 12 different content surfaces

The `containers/` set supplies broad, uninterrupted centres for text and images.
It includes landscape cards, portrait arches, a pebble tile, wide banners and a
callout pill. Their contours are original variations in the selected organic
language, not identical blobs resized into different formats.

`manifest.json` records each asset's viewBox and conservative `contentSafeRect`.
That rectangle is expressed in the SVG's own coordinates and scales with the
artwork. Keep live text within it; add normal typography and layout spacing.
Preserve the outer silhouette's aspect ratio. Choose a different container for
a different amount of content instead of stretching one shape arbitrarily.

Container PNGs are blank colour surfaces. Container SVGs may also supply a path
for an image mask. If using a mask, keep the actual image replaceable. The safe
rectangle is a starting layout constraint; review the final composition when
real copy, images and responsive behaviour are applied.

Dark red surfaces need a light text treatment. Evaluate the actual text size,
colour and background combination rather than treating this asset sheet as a
text-contrast approval.

### Container chooser

| Asset | Best starting use | Fit guidance |
| --- | --- | --- |
| [Soft postcard](svg/containers/soft-postcard.svg) | Short quotes, benefit copy, a brief founder note | A flexible landscape text surface; use its safe rectangle. |
| [Plump panel](svg/containers/plump-panel.svg) | Feature explanation or a photo with short caption | Its broad centre supports balanced text/image content. |
| [Gentle trapezoid](svg/containers/gentle-trapezoid.svg) | Short editorial copy or compact feature | Keep text level while the outside edges tilt. |
| [Leaning note](svg/containers/leaning-note.svg) | An aside, short tip or supporting quote | Let the silhouette supply the tilt; keep live content horizontal. |
| [Quiet tide](svg/containers/quiet-tide.svg) | A reflective quote or softer supporting message | Retain space around the curved edges. |
| [Scooped shoulder](svg/containers/scooped-shoulder.svg) | Feature card or image frame | Keep text and important image details away from the recess. |
| [Double hill](svg/containers/double-hill.svg) | Playful short benefit or illustrated feature | Use its broad lower body; keep the top contour visible. |
| [Lopsided pebble](svg/containers/lopsided-pebble.svg) | Very short statement or illustration backdrop | Its compact centre suits little content, not a long paragraph. |
| [Off-centre arch](svg/containers/off-centre-arch.svg) | Portrait photo or vertical art | Check the image crop at the shoulder; preserve important subject details. |
| [Round window](svg/containers/round-window.svg) | Another portrait-image option | Choose between the arches by image fit and composition. |
| [Rolling banner](svg/containers/rolling-banner.svg) | Short section introduction or message strip | Keep copy brief; tall content needs a taller surface. |
| [Story pill](svg/containers/story-pill.svg) | Short prominent message or callout | A content background, not automatically a button; preserve the normal CTA component and hit area. |

Banner and pill safe areas become shallow at phone width. Use the shape behind
a short heading, switch to a taller container or use an ordinary content
surface. Do not shrink body text to force it inside.

Long FAQs, forms, specifications and dense shop information usually work better
on ordinary surfaces. A decorative edge around those areas can carry the brand
without forcing expanding content into a fixed silhouette.

## Decorative shapes: 12 different accents

Use loops, bursts, pebbles and ribbons to support a heading, frame a composition
or mark a section edge. Do not treat thin loops or ribbons as content holders.
Cropping an accent at a section edge is intentional; clipping a readable
illustration or the usable centre of a container is not.

Leave negative space. Avoid assembling every available motif into a sticker
collage. On narrow layouts, retain the strongest supporting graphic and remove
accents that compete with content. Existing functional UI icons remain Lucide.

### Decorative-shape chooser

These are flexible visual roles, not a fixed semantic icon set.

| Asset | Useful placement | Keep in mind |
| --- | --- | --- |
| [Wandering loop](svg/decorative/wandering-loop.svg) | Heading or open section margin | Keep the line away from words so it does not read as an accidental underline or link. |
| [Spring zigzag](svg/decorative/spring-zigzag.svg) | Playful feature or exploration heading | Use where energy suits the copy; keep reading areas clear. |
| [Open burst](svg/decorative/open-burst.svg) | Emphasis near an important message | Leave its centre open; keep the CTA visually clear. |
| [Sky puddle](svg/decorative/sky-puddle.svg) | Colour patch behind/beside a photo or illustration | Offset it while keeping the foreground subject unobstructed. |
| [Crooked ring](svg/decorative/crooked-ring.svg) | Loose framing around an image edge | Do not pack text into the opening. |
| [Orange bend](svg/decorative/orange-bend.svg) | Small corner or heading punctuation | Leave enough space that it cannot be mistaken for an arrow/control. |
| [Pebble pair](svg/decorative/pebble-pair.svg) | Grouped or shared-story content | Keep the overlap intentional and off the actual content. |
| [Double dip](svg/decorative/double-dip.svg) | Compact heading accent | Keep separate from words rather than using it as a decorative letter. |
| [Long wave](svg/decorative/long-wave.svg) | Cropped section edge or background transition | Keep copy on the stable section surface. |
| [Soft corner](svg/decorative/soft-corner.svg) | Corner crop or framing patch | Frame the composition; empty corners can also stay empty. |
| [Tilted arch](svg/decorative/tilted-arch.svg) | Curved companion to a photo or heading | Use the separate filled arch containers when content needs a surface. |
| [Pink flick](svg/decorative/pink-flick.svg) | Small optional highlight | Keep subordinate to the primary brand colours. |

## Illustrations: 12 different subjects

Open storybook, flying kite, mango sprig, marigold, listening headphones, paper
boat, spinning top, little home, moon and stars, rain cloud, banyan leaf and
gentle sun. The sun is the sole expressive exception; everything else is faceless.

These are supporting brand illustrations, not product photographs or published
Koel artwork. Keep their aspect ratios. Use at about 96px wide or larger so the
selected line detail remains clear; use the functional icon system for tiny UI
controls. Plants and ordinary objects carry cultural warmth without requiring
an ornate cultural motif in every composition.

### Illustration chooser

| Message or context | Asset | Application |
| --- | --- | --- |
| Stories and listening | [Open storybook](svg/illustrations/open-storybook.svg) | Story-library introduction or a storytelling feature; its sound marks help make the listening connection. |
| Imagination, freedom, discovery | [Flying kite](svg/illustrations/flying-kite.svg) | Benefit or brand-belief content with spacious composition. |
| Nature or growth as a theme | [Mango sprig](svg/illustrations/mango-sprig.svg) | Supporting nature-themed or editorial content. |
| Celebration or seasonal storytelling | [Marigold](svg/illustrations/marigold.svg) | Use when the actual copy or collection makes that connection. |
| Listening as an editorial subject | [Listening headphones](svg/illustrations/listening-headphones.svg) | General listening content. Use real Player media for hardware/setup so this does not imply headphones are required. |
| Adventure, journeys, exploration | [Paper boat](svg/illustrations/paper-boat.svg) | Discovery-led content or a suitable collection introduction. |
| Play and curiosity | [Spinning top](svg/illustrations/spinning-top.svg) | Play-related feature or brand story. |
| Home, belonging, family routines | [Little home](svg/illustrations/little-home.svg) | Founder, family or emotional-benefit content. |
| Evening and bedtime | [Moon and stars](svg/illustrations/moon-and-stars.svg) | Bedtime content when that theme is present. |
| Weather and everyday wonder | [Rain cloud](svg/illustrations/rain-cloud.svg) | Weather/nature content or a quiet supporting moment. |
| Nature and rootedness | [Banyan leaf](svg/illustrations/banyan-leaf.svg) | A botanical editorial accent with a different silhouette from the sprig. |
| Warmth, welcome, daytime | [Gentle sun](svg/illustrations/gentle-sun.svg) | Occasional expressive welcome; preserve the restrained eye strokes. |

These are suggested associations, not product categories or new promises.
Choose the subject because it supports the nearby words. Keep the drawing
whole, including the kite string or book sound marks that explain it.

## Combining assets on the website

The live text, product or image is the main subject. A container groups it, an
illustration supports its meaning and an accent frames the composition. Give
an asset room to work before adding another. Judge density by clarity and
balance, not a fixed number of graphics.

Within repeating cards, keep alignment, padding, typography and behaviour
consistent. Use a coherent container treatment for that component. Introduce
different silhouettes where the content role or image proportions differ;
the library's variety can appear across the site without making neighbouring
cards feel unrelated.

### Starting recipes for the current homepage

| Area | Suggested starting treatment | Keep clear |
| --- | --- | --- |
| Hero | Let real product/lifestyle media lead. Try an edge-cropped Soft corner or Long wave in open space if framing helps. | The Player, child, headline and primary CTA. |
| How it works | Use accurate product media for selecting/placing a Koel. Soft postcard or Plump panel can support short copy; Open storybook can support the listening idea. | The actual sequence and product geometry. |
| Benefits / brand belief | Match illustration to message: Flying kite for imagination, Little home for belonging, Spinning top for play. | Reading order and a coherent card treatment. |
| Companion app | Let the app screen lead; a broad colour patch or small loop can frame it. | The screen and setup explanation. |
| Koel collection | Put accents around the section introduction if needed; existing story artwork supplies the product-card imagery. | Artwork, titles, prices and Preview/Add to bag controls. |
| Founder story | Off-centre arch or Round window can frame a portrait when the crop fits. Soft postcard can hold a short note. | The portrait subject and founder's words. |
| Testimonials | Quiet tide or a soft panel is a possible future quote surface. Keep the treatment coherent across the group. | Quote readability; avoid stacking shape, illustration and accents behind each quote. |
| FAQ, bag, search and forms | Start with ordinary readable surfaces; place an accent only in available surrounding space. | Questions, inputs, controls and focus indicators. |
| Newsletter / footer | Try a short Rolling banner message or a peripheral Wandering loop where it supports the existing composition. | Form labels, email input and submit control. |

These are placement recipes, not replacements for existing section layouts,
copy, product artwork or behaviour.

### Colour, spacing and narrow layouts

- Start with white or Kesar space. Choose the main colour relationship before
  adding graphics; keep new colours subordinate to that composition.
- Story Ink is the text starting point on light containers; Kesar or white on
  Gulab Red. Check the actual combination, size and contrast when applying it.
- Keep asset colours opaque. If a backdrop feels too strong, choose a lighter
  existing brand surface rather than fading the text or product content.
- Keep text and CTAs clear of decorative contours. For containers, use the
  `contentSafeRect` and then normal readable padding.
- Scale proportionally. Keep a content container upright; rotate an accent only
  when it improves the composition.
- On narrow layouts, retain the strongest useful graphic and simplify the
  decoration. Let content determine height. Switch container or surface when
  text no longer fits; an illustration can move above the copy.
- Manifest minimum widths are starting design recommendations, not automatic
  CSS breakpoints. Actual detail and content fit determine the result.
- Keep decorative assets static by default. Separately requested motion should
  follow the existing brief-entrance and reduced-motion rules.

### Applying the files

**In a design tool:** import the SVG, preserve its proportions and place text as
separate live layers. Use real intended copy or images while arranging it. Keep
an untouched source copy so recolouring or path edits can be reversed.

**In the website:** prefer SVG; use PNG when the consuming tool requires raster.
An illustration or accent can be an image. A container needs live HTML content
positioned within its safe area, or its path used as a mask behind replaceable
image media. Do not bake text into the graphic. Decorative layers must not
intercept clicks or enter keyboard focus order.

Start application with a benefit/brand-belief section: its short messages make
the relationship between illustration, container and copy easy to judge. Carry
the resulting spacing and hierarchy into the next section rather than giving
each section a separate visual system.

## Files and editing

- `svg/containers/`, `svg/decorative/`, `svg/illustrations/`: separate editable
  assets with meaningful names, viewBoxes and accessible SVG titles.
- `png/`: transparent raster exports at twice each SVG's nominal dimensions.
- `preview/`: labelled contact sheets in PNG and SVG. Preview captions are
  inventory labels, not website typography assets.
- `manifest.json`: inventory, suggested uses, minimum display sizes and safe
  rectangles for containers.
- `build.py`: original path source and repeatable export tool. Requires Python 3
  with Pillow, Node.js and sharp. `render.cjs` uses sharp/libvips, without a browser. Set
  `HK_SHARP_MODULE` to a local sharp module path if it is not installed in the
  environment. The bundled Codex runtime is detected as a fallback. Arial in
  the preview SVGs is used only for inventory captions, not artwork. PNG contact
  sheets use the same local font file through Pillow; set `HK_PREVIEW_FONT` to
  another local caption font file when rebuilding on a different system.

Import an SVG into Figma or a vector editor to edit its paths and exact fills.
For a normal image embed, use the separate SVG file as the source. For decorative
web use, supply empty image alt text; for meaningful illustrations, write alt
text that describes the actual content role. Inline SVG copies used more than
once should receive unique title IDs in the consuming component.

No selected reference bitmap is embedded in an SVG. The library uses original
hand-authored vector geometry informed by the selected style boards; it is not
an automatic trace of the raster examples.

## Verification scope

Individual files are checked as SVG/XML and rendered with a non-browser SVG
renderer. The numbered sheets are visually inspected for composition and
clipping. These checks cover the delivered assets, not integration into a live
page. Browser, responsive layout and real text/image fitting are outside this
asset-only delivery.
