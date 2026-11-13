# Hey Kahani graphic library v1

Selected direction: November 13, 2026. Website asset library.

The user selected two references: **H / Freeform rhythm** for abstract shapes
and **A / Loose cut shapes** for illustrative vectors. Copies of the selected
attachments are preserved in `reference/`. These are the source of the drawing
language; the brand identity guide remains the source of exact colour values.

This library contains 36 individual, editable SVG drawings, matching transparent
PNG exports and three numbered preview sheets. It does not change the website.

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

## Decorative shapes: 12 different accents

Use loops, bursts, pebbles and ribbons to support a heading, frame a composition
or mark a section edge. Do not treat thin loops or ribbons as content holders.
Cropping an accent at a section edge is intentional; clipping a readable
illustration or the usable centre of a container is not.

Leave negative space. Avoid assembling every available motif into a sticker
collage. On narrow layouts, retain the strongest supporting graphic and remove
accents that compete with content. Existing functional UI icons remain Lucide.

## Illustrations: 12 different subjects

Open storybook, flying kite, mango sprig, marigold, listening headphones, paper
boat, spinning top, little home, moon and stars, rain cloud, banyan leaf and
gentle sun. The sun is the sole expressive exception; everything else is faceless.

These are supporting brand illustrations, not product photographs or published
Koel artwork. Keep their aspect ratios. Use at about 96px wide or larger so the
selected line detail remains clear; use the functional icon system for tiny UI
controls. Plants and ordinary objects carry cultural warmth without requiring
an ornate cultural motif in every composition.

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
