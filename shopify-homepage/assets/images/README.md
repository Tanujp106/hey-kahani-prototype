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
`assets/images/brand-library/` for the Why feature panels: `containers/`
(source silhouettes), plus decorative shapes and illustrations used as accents.
Live panels inline the container paths with `currentColor` fills. Edit the
library source, then re-copy when updating website graphics.

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
