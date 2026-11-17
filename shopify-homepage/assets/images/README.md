# Website image assets

## Generated campaign — November 7, 2026

All 12 generated PNGs are saved in this website's asset tree. Paths below are relative to `shopify-homepage/` and can be used directly from its `index.html`. The originals, full prompts, and delivery notes remain in [`output/imagegen/hk-campaign-2026-11-07/`](../../../../output/imagegen/hk-campaign-2026-11-07/).

| Intended use | Website path | Native pixels |
| --- | --- | --- |
| Original portrait hero campaign concept | `assets/images/hero/hk-shot-01.png` | 1122 × 1402 |
| Original wide hero campaign concept | `assets/images/hero/hk-shot-01-wide.png` | 1672 × 941 |
| Bliss listening | `assets/images/editorial/hk-shot-02.png` | 1086 × 1448 |
| Holding / show-and-tell | `assets/images/editorial/hk-shot-03.png` | 1122 × 1402 |
| Parent companion app concept | `assets/images/app/hk-shot-04.png` | 1254 × 1254 |
| Creative table | `assets/images/editorial/hk-shot-05.png` | 1254 × 1254 |
| Bedtime wind-down | `assets/images/editorial/hk-shot-06.png` | 1672 × 941 |
| Clean Player product concept | `assets/images/product/hk-shot-07.png` | 1254 × 1254 |
| Holi kite play | `assets/images/koels/hk-shot-08-01-holi-kite.png` | 1254 × 1254 |
| Kerala houseboat | `assets/images/koels/hk-shot-08-02-kerala-houseboat.png` | 1254 × 1254 |
| Festival family | `assets/images/koels/hk-shot-08-03-festival-family.png` | 1254 × 1254 |
| Park mindfulness picnic | `assets/images/koels/hk-shot-08-04-park-mindfulness.png` | 1254 × 1254 |
| Market and temple travel | `assets/images/koels/hk-shot-08-05-market-temple.png` | 1254 × 1254 |

The original generated hero concepts remain available above. The portrait campaign image is still used by a How it works card. The active landing-page hero now uses the user-supplied image below at both breakpoints.

Example from `shopify-homepage/index.html`:

```html
<picture>
  <source media="(min-width: 721px)" srcset="assets/images/hero/landing-hero-child-player-koels.png" width="1672" height="941">
  <img src="assets/images/hero/landing-hero-child-player-koels.png" width="1672" height="941" alt="A child reaches for an illustrated Koel disc beside the Kahani Player.">
</picture>
```

The active landing-page hero uses `assets/images/hero/landing-hero-child-player-koels.png` (1672 × 941), regenerated from the user-supplied image on November 17, 2026. The three Koel disc diameters were reduced to roughly 55% of their previous size; this remains generated concept imagery, not verified production photography. Desktop and mobile use the same file, with the existing mobile `object-position: 78% 30%`. `generated-campaign.json` continues to document the original generated campaign assets; other homepage sections keep their existing image references.

The generated campaign assets above remain concept art, with approximate hardware geometry and unapproved story illustrations. The parent phone interface is a fictional app concept. Native campaign files are below the brief's 2400px long-edge target and have no verified embedded sRGB ICC profile. The original campaign assets were not resized, cropped, recolored, or format converted; the wide campaign hero is a separate generated edit.

## Brand library vectors (Why / USP panels)

Selected SVGs from `outputs/brand-library-v1/` are copied under
`assets/images/brand-library/` for the Why feature panels. The actual Quiet tide,
Double hill, Soft postcard and Plump panel paths supply the filled edge frames.
The `benefit-*.svg` container variants retain those paths with exact Mango / Sky /
Lavender / Kesar grounds. The frame centre adapts without a viewport-height floor.

The November 15, 2026 reference-led composition uses two differently scaled
illustrations on opposite photo edges. Artwork is anchored to the photo wrapper,
with its own space around the image, rather than the entire card. The reading
and CTA column remains clear. Wilf & Friends (Hey Girl Studio / Finding Design),
Leader Bag Co and Headspace / MetaLab informed this composition approach; only
Hey Kahani library artwork is used.

| Panel | Main illustration and placement | Companion and placement |
| --- | --- | --- |
| Screen free | Flying kite, upper right along the child's gaze | Listening ear, opposite lower edge, supporting the listening message |
| Little hands | Little hand, lower right beside the play table | Spinning top, separate upper-left play cue |
| Feels like home | Little home, lower left grounding the family photo | Marigold, upper right supporting festival stories |
| Tap to play | Open storybook, lower right supporting the Kahani | Story disc, upper left supporting tap-to-play |

On November 16, 2026, the Screen free card's paper boat was replaced with a new
editable `illustrations/listening-ear.svg`: Sky ear, Kesar inner shape, selective
Story Ink detail and Monsoon sound curves. This supports the listening copy
without implying a screen or a required accessory. Source and manifest are in
`outputs/brand-library-v1/extensions/listening-ear/`. It retains the secondary
illustration slot and existing mobile visibility; the kite and backgrounds are
unchanged.

A further Screen free refinement on November 16 makes the kite about 20%
smaller on desktop and 96px on phones, with a clearer gap above the photo. Its
Mango facet becomes Kesar. The shipped `flying-kite.svg` is now this local
colour variant; the original library drawing is preserved. The backdrop is
closer to the photo and lighter (94% Mango / 6% black), while a viewport-cropped
`decorative/corner-ring-crop.svg` replaces the complete corner ring. The listening
ear remains. Variant sources and manifest are in
`outputs/brand-library-v1/extensions/screen-free-refinement/`.

The follow-up on November 15, 2026 adds large background silhouettes while
preserving the accepted illustration placements:

| Panel | Behind the photo | Upper-right card background |
| --- | --- | --- |
| Screen free | Sky puddle in quiet darker Mango | Crooked ring, clipped by card, in faint lighter Mango |
| Little hands | Crooked ring in quiet darker Sky | Soft corner, clipped by card, in faint lighter Sky |
| Feels like home | Soft corner in quiet darker Lavender | Sky puddle, clipped by card, in faint lighter Lavender |
| Tap to play | Tilted arch in quiet darker Marigold | Double dip, clipped by card, in faint lighter Marigold |

CSS masks reuse the existing library contours. The latest colour correction
derives shapes from each card fill: 94% fill / 6% black behind the photo,
90% fill / 10% white in the corner. Existing illustration colours stay intact. Layers
scale proportionally, remain behind the photo/live content, and cannot intercept
clicks. Below 800px only the behind-photo background remains. Separate line
gestures remain removed; their sources are available under
`outputs/brand-library-v1/extensions/benefit-gestures/`; no asset files are deleted
or redrawn. Below 800px, only the main illustration remains. Decorative layers
are assistive-hidden and cannot intercept clicks.

The all-card refinement on November 16, 2026 increases corner masks from a
272px maximum to 352px while lowering their contrast. Coverage and visual weight
are adjusted separately: these should read as atmosphere after the primary
content. All photo backdrops now use the closer 128%-wide framing and all main
illustrations use the smaller scale. Each desktop card retains two foreground
illustrations plus two background shapes (four assets); mobile retains one
illustration and the photo backdrop. Copy, images/crops and controls are unchanged.

New editable `little-hand.svg`, `story-disc.svg` and two cropped corner contours
have source/manifest in `outputs/brand-library-v1/extensions/benefit-asset-refinement-v2/`.
The story disc is an abstract illustration, not published Koel artwork or a
merchandise render. The existing `marigold.svg` is copied unchanged from the
original library and connects directly to the Home card's festival copy.

The November 16 containment correction supersedes the pre-cropped corner
variants above. All four cards now use the full original decorative SVGs. Their
actual container contour clips the result through a matching nine-slice alpha
mask. The paint and clip share their source SVG path, slice size and responsive
inset, avoiding square cuts or a rounded-rectangle approximation. Generated
mask CSS is in `assets/css/benefit-frame-masks.css`; regeneration and native
render checks are in `outputs/brand-library-v1/extensions/benefit-frame-clipping/`.
Tilted arch and Double dip are copied unchanged from the library for card 4.
No card silhouette, copy, product media or interaction was replaced.

November 16, 2026, Tap a Koel only: the plump-panel frame fill is a lighter
Parrot Green, 48% `#2B9863` / 52% white (`#99CEB4` in
`benefit-plump-panel-parrot.svg`, same contour). Full Parrot was too dark. That card's tilted arch,
storybook, story disc and upper-right Double dip are larger than the shared
scale. The card shell and photo plate keep the shared size. The other three
cards are unchanged.

## Brand library vectors (testimonials and Koels)

The November 14, 2026 application uses the library's Moon and stars, Little home,
Rain cloud, Spinning top and Pebble pair in the testimonial card headers. These
replace the earlier large background motifs so quote text has its own reading
area. Rain cloud replaced Long wave on the quiet/screen-free card the same day
after the wave read as unclear. The Open storybook replaces the small handmade
book badge in the Koels introduction. Koels keeps its depth waves; the redundant
spark overlay was removed.

On November 15, 2026, the Koels introduction book was replaced with a newly
hand-authored `illustrations/open-storybook-sky.svg`: Sky cover, Monsoon binding,
Kesar pages and Mango sound marks/bookmark. The old red cover blended into the
Sindoor ground. This is a new editable book drawing in the selected loose-cut
style, with source and manifest in
`outputs/brand-library-v1/extensions/storybook-sky/`. The Tap to play / Why card also uses this blue-cover book following the
user's subsequent screenshot request.

`illustrations/rain-cloud.svg` is copied unchanged from the library source. Other
selected files were already present in this directory. Existing quote surfaces
remain content-sized and pastel rather than stretching a fixed-aspect SVG behind
long text. No product artwork, quote content or commerce controls are replaced.

## How it works media

The November 16, 2026 follow-up replaces the vector scenes with existing images:
`hero/hk-shot-01.png` for the loose Koels, `editorial/hk-shot-05.png` for placing a
Koel, and `product/player-desktop.jpg` for listening. CSS sets a 160–190px media
height with subject-specific crop positions; original files are unchanged.
The `hk-shot` files retain their generated-concept provenance documented above.
The existing JPG is reused as supplied, without a new photography-authenticity
claim. The previous SVG treatment is preserved below for provenance.

Added November 16, 2026: `illustrations/choose-a-koel.svg`,
`illustrations/place-on-player.svg`, and `illustrations/story-begins.svg` under
`brand-library/` are three new original editable scenes for the separate
How it works section. Their source drawings and manifest live in
`outputs/brand-library-v1/extensions/how-it-works/`. They use the selected flat
loose-cut language, exact brand fills and selective curved details. Each shows
the actual circular-disc sequence rather than a generic app/download metaphor.

The Player is a simplified instructional interpretation of `product/hk-shot-07.png`
with cream housing, arch handle, Gulab band, five controls and a wood-toned base.
It is not approved merchandise imagery. New abstract disc art does not represent
published Koel titles. Keep each 520 × 400 scene proportional and fully visible.

## Player section composition

The November 17, 2026 Mobbin-informed layout uses a larger product view beside
copy and purchase details. `product/player-cutout.png` is shown at up to 290px
wide on desktop, retaining its full 573 × 1134 proportions, handle, five controls,
red band and wood base. On narrow screens its maximum width is 280px.

`brand-library/decorative/speaker-ripples.svg` remains the only background asset:
Mango sound arcs anchored to the speaker band. Its source and manifest are in
`outputs/brand-library-v1/extensions/player-sound-field/`. The two detached
Listening ripples / Play bounce corner scribbles are removed from the section;
their files remain available. The previous Pebble pair blobs remain unused here.

The four benefit titles are now unboxed text in the purchase column below the
button. They retain the compact 15px Averia Bold treatment. The $129 USD price
was provided by the user on November 16, 2026 and is recorded in
`shopify-homepage/data/player.json`; it is not derived from the image.

## Testimonial content

The five quotes and parent attributions are draft mock content. The original three were retained from the prior homepage section; two additional samples were added for the second row on November 7, 2026. They must be replaced with approved customer testimonials before launch.
