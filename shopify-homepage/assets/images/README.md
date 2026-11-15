# Website image assets

## Generated campaign — November 7, 2026

All 12 generated PNGs are saved in this website's asset tree. Paths below are relative to `shopify-homepage/` and can be used directly from its `index.html`. The originals, full prompts, and delivery notes remain in [`output/imagegen/hk-campaign-2026-11-07/`](../../../../output/imagegen/hk-campaign-2026-11-07/).

| Intended use | Website path | Native pixels |
| --- | --- | --- |
| Hero with text space on the left (narrow screens) | `assets/images/hero/hk-shot-01.png` | 1122 × 1402 |
| Extended wide hero for desktop | `assets/images/hero/hk-shot-01-wide.png` | 1672 × 941 |
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

The hero uses the extended wide image above 720px and keeps the original portrait image for narrower screens. The wide image is an edited concept variation of the original hero, with more room around the child and Player.

Example from `shopify-homepage/index.html`:

```html
<picture>
  <source media="(min-width: 721px)" srcset="assets/images/hero/hk-shot-01-wide.png">
  <img src="assets/images/hero/hk-shot-01.png" alt="A child smiling beside the Kahani Player and illustrated Koel discs on a cream rug">
</picture>
```

`generated-campaign.json` provides the paths, dimensions, and provenance. Homepage sections reference these campaign assets directly; the hero uses the extended wide variant on desktop and the original portrait image on narrow screens.

All files remain generated concept art, with approximate hardware geometry and unapproved story illustrations. The parent phone interface is a fictional app concept. Native files are below the brief's 2400px long-edge target and have no verified embedded sRGB ICC profile. The original campaign assets were not resized, cropped, recolored, or format converted; the wide hero is a separate generated edit.

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

November 16, 2026, Tap a Koel only: the plump-panel frame fill is Parrot Green
(`benefit-plump-panel-parrot.svg`, same contour). That card's tilted arch,
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

`illustrations/rain-cloud.svg` is copied unchanged from the library source. Other
selected files were already present in this directory. Existing quote surfaces
remain content-sized and pastel rather than stretching a fixed-aspect SVG behind
long text. No product artwork, quote content or commerce controls are replaced.

## Testimonial content

The five quotes and parent attributions are draft mock content. The original three were retained from the prior homepage section; two additional samples were added for the second row on November 7, 2026. They must be replaced with approved customer testimonials before launch.
