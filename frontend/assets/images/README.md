# Product presentation assets

`player-cutout.png` and `koel-cutout.png` are AI-generated transparent concept
assets, created on October 30, 2026 with the user's permission to recreate the
hardware approximately. They reference the Player and round physical Koels on
https://www.heykahani.com/. They are illustrative, not approved product photos;
the Koel illustration does not establish a real story title or published SKU.

The live reference sources were:
- Player: `/api/media/file/d47e892f2ecc15b65c7afd8aaae5dacc407295b5%20(1)%20(1).png`
- Koel shape/art direction: `/api/media/file/Product%20Image-2.jpg`

Both files are ordinary flat images with alpha. Perspective, rotation, contact
shadows, positioning and the tap state live in `assets/css/experience.css`.
There is no 3D model, canvas, WebGL, video or product-specific geometry engine.

Replace these files with approved transparent images, or supply URLs via the
existing product `images` records. Use a consistent artboard with the whole
object visible and roughly centered. The generic scene uses `object-fit:
contain`; a radically different camera angle may need presentation calibration.
Other products need only an image, not their own animation implementation.

## Koel collection presentation — November 4, 2026

The collection uses the existing concept illustrations as replaceable face
artwork inside CSS discs, with a bevelled cream face and twelve cross-sections
forming the thickness. These are presentation geometry, not manufacturing CAD.
`images[].discArtworkScale` crops an image's empty artboard inside the face;
the source image is unchanged. The same framing is used in the preview dialog.
Use 1 for artwork that already fills its square, or calibrate up to 2 when the
source has margins. This optional image property can map to a Shopify media
metafield or be omitted for uniformly prepared replacement artwork.

The `arcs.jpg` file contains a whole display composition rather than individual
disc art. It is no longer used for Koel preview 12; that fixture uses the
existing `night.jpg` concept instead. All representative artwork remains
unapproved; it does not establish story titles or available products.

The source generation outputs remain in the Codex generated-images directory.

## Manufacturing-based production concept — October 31, 2026

`player-production-v2.png` replaces the earlier approximate Player cutout in
active presentation/product data. It is an imagegen edit of the supplied
`1-1.1370.png` manufacturing render: the grey woven speaker band is Gulab Red
`#D3000A`; the white housing, arch handle, five-button controls, blank top plate,
cyan ring, and wooden base follow the supplied hardware. It remains a concept
recreation, not a final approved product photo. The original two attached
manufacturing views are retained under `docs/product-reference/`.

`brand-wordmark.png` is an exact high-resolution crop rendered from page 13 of
the supplied brand PDF. It has a white background and is displayed on a matching
white plate with clearspace. It is not AI-generated or a typed approximation.

The ZIP named “3d-models” contains 16 PNG renders and no mesh files. No source
archive or model viewer is loaded into the storefront.

## Active transparent logos and optional front view

`brand-wordmark-transparent.svg` / `brand-wordmark-cream.svg` replace the earlier
white-background crop in the live header/footer. These are the official website
header's unchanged vector paths, with approved Sindoor / Kesar fills; no white
background, embedded image or image filter. See `docs/brand/logo-alpha-notes.md`.

`player-front-production.png` is an imagegen production-color recreation of the
supplied front manufacturing view (`1-1.1378.png`), matched to the existing
Gulab-band concept. It remains illustrative. It is an optional hover view, not a
new product or proof of additional hardware capability. No full 3D viewer or
model payload is added to the storefront.

## Companion-app section — November 4, 2026

`app-storytime-concept.png` is AI-generated lifestyle imagery produced with the
built-in image generation tool. It depicts an imaginary child, not a customer
or testimonial. Replace it with approved brand photography when available.
The two phone interfaces are decorative HTML/CSS design concepts, not approved
app screens or working controls. Download badges are non-interactive previews
until official store URLs and availability are confirmed. No new app capability
is established by this design.

The supplied NODI screenshot sets the centered introduction, paired download
badges, and three numbered cards with square visuals and white captions.
Mobbin references inspected for structure:
- Klarna: https://mobbin.com/sites/sections/7dd0b801-68c5-4ebb-abdb-b75610742cfe
  (large feature visuals above concise card captions).
- Deezer: https://mobbin.com/sites/sections/5727e077-c7cf-46e1-92e2-4553033310c5
  (paired store badges below a centered app introduction).

Final image-generation prompt:

> Use case: photorealistic-natural. Asset type: square lifestyle image for the third card in the Hey Kahani homepage companion-app section. Create one editorial photograph, no text. A South Asian child around five years old with dark wavy hair, wearing a muted rust-orange cotton top and cream trousers, sitting cross-legged on a cream textured living-room rug, joyfully absorbed in imaginative play with a few simple wooden toy animals. Child occupies the center and right of the square crop, seen at child's eye level; warm natural window light, gentle candid smile looking slightly upward as if imagining a story. Calm contemporary family home, soft cream sofa and a muted leafy plant softly out of focus. Authentic natural skin and fabric texture, warm airy premium editorial photography, minimal clutter, restrained colors harmonizing with cream #FFF1D6, warm wood, muted terracotta and blue. Leave the lower left quarter mostly rug for an HTML caption overlay. No phone, tablet, headphones, screens, audio device, books with text, logos, watermarks, costumes or cultural stereotypes. This is conceptual lifestyle imagery, not a testimonial.
