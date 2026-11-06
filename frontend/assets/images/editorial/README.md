# About section editorial imagery

Created on November 4, 2026 with the built-in image-generation tool for the
three cards in `frontend/index.html#about`. These are generated lifestyle
concepts depicting imaginary families, not customer portraits or approved
brand photography. No product hardware is depicted. Replace the ordinary
image sources/srcsets with approved section media when available; no JavaScript
or product-data change is required.

The testimonial ticker previously reused these images and
`../app-storytime-concept.png`. On November 4, 2026, it received a dedicated
new set; see `../testimonials/README.md` for those assets and prompts. These
original About assets remain unchanged.

Each image is supplied as a 960 × 720 WebP plus a 480 × 360 WebP, encoded at
quality 82. Full-resolution PNG originals remain in the Codex generated-images
directory. The images use lazy loading, explicit dimensions and responsive
source selection.

## Layout references

Mobbin references inspected for structure only:

- [Aboard](https://mobbin.com/sites/sections/72ae36df-5806-4266-9356-c00b9a786b4d): large landscape image above article text, without an outer card panel.
- [folk](https://mobbin.com/sites/sections/cdb7e503-8bdb-434e-bff9-715d24523d4e): editorial images immediately above their corresponding headings.

Scope: add an image above each existing value in the supplied screenshot.
The original image addition preserved the mango section, headings and body copy, section anchor,
brand typography, homepage initialization hooks, and all other sections.
The single layout move replaces the three top rules with landscape imagery;
the existing three desktop columns stack on mobile. No article destinations,
publication dates, bylines, or new commercial claims are implied.

Later user direction on November 4, 2026 changed the About surface to cream
with red-toned text and added an “Explore Koels” CTA. The imagery is unchanged.

## Final generation prompts

### imagination.webp

Use case: photorealistic-natural. Asset type: landscape 4:3 editorial photograph for one Hey Kahani homepage story card, full bleed, no text. Style: warm candid family photography with natural skin and fabric texture, soft window light, cream linen and warm wood in a contemporary South Asian family home. Quiet sophisticated framing, subtle film grain, restrained cream #FFF1D6, honey #FECB74, rust and muted blue; no oversaturation. Keep faces and hands comfortably inside the central 80 percent so a 4:3 crop retains them. No screens, phones, tablets, headphones, audio players, electronics, logos, watermarks, typography, costumes, festival cliches or staged stock poses. Conceptual lifestyle imagery, imaginary people, not a testimonial. Scene: Two South Asian siblings around four and six years old sit on a soft cream rug at child's eye level, absorbed together building an imaginary world with a handful of wooden animal toys and natural wooden blocks. One child in muted rust cotton, the other in dusty blue, smiling at their shared creation rather than looking at the camera. Natural movement, airy afternoon light, soft cream sofa and a small leafy plant quietly blurred behind. The toy animals and children together tell the story; no books. Medium-wide intimate composition.

### heritage.webp

Use case: photorealistic-natural. Asset type: landscape 4:3 editorial photograph for one Hey Kahani homepage story card, full bleed, no text. Style: warm candid family photography with natural skin and fabric texture, soft window light, cream linen and warm wood in a contemporary South Asian family home. Quiet sophisticated framing, subtle film grain, restrained cream #FFF1D6, honey #FECB74, rust and muted blue; no oversaturation. Keep faces and hands comfortably inside the central 80 percent so a 4:3 crop retains them. No screens, phones, tablets, headphones, audio players, electronics, logos, watermarks, typography, costumes, festival cliches or staged stock poses. Conceptual lifestyle imagery, imaginary people, not a testimonial. Scene: An affectionate South Asian grandmother with softly silver hair in a casual blue cotton kurta sits on a cream living-room sofa with her young granddaughter in a pale mustard cotton dress. The grandmother is telling an animated story with a gentle open-hand gesture and the child is looking up at her, delighted and engaged. Candid intergenerational connection rather than a portrait. A warm wood side table and a small plant; no books or props. Medium-wide intimate composition in warm late afternoon window light.

### ritual.webp

Use case: photorealistic-natural. Asset type: landscape 4:3 editorial photograph for one Hey Kahani homepage story card, full bleed, no text. Style: warm candid family photography with natural skin and fabric texture, soft window light, cream linen and warm wood in a contemporary South Asian family home. Quiet sophisticated framing, subtle film grain, restrained cream #FFF1D6, honey #FECB74, rust and muted blue; no oversaturation. Keep faces and hands comfortably inside the central 80 percent so a 4:3 crop retains them. No screens, phones, tablets, headphones, audio players, electronics, logos, watermarks, typography, costumes, festival cliches or staged stock poses. Conceptual lifestyle imagery, imaginary people, not a testimonial. Scene: A South Asian mother in a muted warm rust cotton top sits on the edge of a child's low bed, sharing a quiet bedtime story with her five-year-old son curled comfortably under a cream quilt, head on a muted blue pillow. Mother smiling softly toward the child, child looking up at her sleepily, both with relaxed natural expressions. A small warm bedside lamp and wood headboard softly blurred, natural dusk light, cozy rather than dark. No book or story device visible. Medium-wide candid intimate composition.

