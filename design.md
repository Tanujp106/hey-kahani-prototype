# Hey Kahani design reference

This is the working UI reference for this project. It summarizes the supplied brand guide and separates its rules from later project decisions. Read it before creating or changing Hey Kahani UI, then inspect the cited PDF pages relevant to the change.

## Sources and authority

- [Brand identity source](<docs/brand/Hey Kahani - Brand identity.pdf>): 30 PDF pages, cover labeled “Brand Guidelines, Version 1.0 — August 2025” (PDF page 1). The original supplied file remains unchanged; this project copy makes the reference durable.
- `shopify-ready-frontend-handoff.md` and its linked Website Build SOW govern the current storefront scope and technical requirements.
- User direction on October 31, 2026: the manufacturing samples are grey, but production uses **Gulab Red**. Treat the grey speaker band in the supplied manufacturing renders as a shape/material reference and represent that band in Gulab Red for production-facing concept artwork.
- Supplied manufacturing archive: `wetransfer_kahani-player-3d-models_2026-10-29_2057.zip`. Inspection found 16 PNG renders, not browser-ready mesh/glTF files. Attached `1-1.1370.png` and `1-1.1378.png` show the same hardware from different angles.
- Latest explicit user decisions control project choices. Do not silently reinterpret a reference image, old website, or guide example as a change to product facts or task permissions.

Page numbers below mean **PDF page numbers (1–30)**, not the guide’s printed chapter numbers. The PDF is image-based; the relevant pages were visually inspected rather than relying on an empty text extraction.

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
| Section title | `--hk-text-section` | clamp → **40px** max | **Every** section `h2.hk-display--lg` (How it works, App, Koels, About, Founder, Community, FAQ). Same size always. |
| Secondary display | `--hk-text-md` | clamp → **32px** max | `hk-display--md` |
| Subhead / feature h3 | `--hk-text-subhead` | clamp → **24px** max | About feature titles, strip lines, newsletter h3, founder sign-off |
| Step title | `--hk-text-step` | clamp → **30px** max | How it works accordion step titles only |
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

- User direction on November 7, 2026: section titles across the `shopify-homepage/` refresh must share one size (`--hk-text-section` / `hk-display--lg`). No per-section heading size overrides (e.g. How it works vs companion app). Body copy uses Open Sans medium (500). Keep the scale in `design.md` and `tokens.css` in sync.
- User direction on November 7, 2026: page text (headings, leads, body, FAQ, founder, footer copy) uses **black `#000000`** via `--hk-ink` / `--hk-body`. Do not use Temple Maroon for running copy. Brand Story Ink `#05334A` remains available as `--hk-story-ink` for reference only. Remove unused section eyebrows when the user cuts them (App “For grown-ups”, Koels “Kahani Koels”).
- User direction on November 7, 2026: all storefront CTAs use the hero button pair sitewide — **primary** solid Gulab pill with white label and soft red shadow; **secondary** frosted light pill with black label. No outline-red ghosts, soft-rect CTAs, or per-section button skins. Classes: `hk-btn hk-btn--primary` / `hk-btn hk-btn--secondary`.
- User direction on November 7, 2026: body text sizes must be consistent sitewide via `--hk-text-body` (17px). Dense UI uses `--hk-text-body-sm`; fine print uses `--hk-text-fine`. No per-section body `font-size` overrides.
- User authorization on November 4, 2026: fictional parent names and sample quotes may populate the testimonial mockup when every card clearly labels them “Fictional sample”. They are not actual customer reviews and must be replaced with approved attribution before launch.

- User direction on November 4, 2026: use **white `#FFFFFF`** for `--hk-paper` / the principal page background. Keep **Kesar Sand `#FFF1D6`** (`--hk-sand`) for the footer for now, not as the site-wide ground. The PDF does not mandate a particular web background. The active vector logos are transparent and must not have white background plates.
- Latest user direction on November 4, 2026: the footer uses a Sindoor Red background with Kesar Sand text, logo and tonal cream dividers. This replaces the earlier inverse treatment. Do not use blue in the footer.
- User direction on November 4, 2026: use white, cream and red tones for the About section instead of yellow and blue. Current treatment uses a Kesar Sand background, Sindoor Red headings, Temple Maroon body text and a red “Explore Koels” CTA linking to the collection.
- Latest user direction on November 4, 2026: retain the testimonial ticker's Kesar Sand background and black heading block, with no section preview line or visible pause control. Images must remain clearly visible, card text must be black rather than red/maroon, and card type must be smaller. Blend clear lifestyle photos continuously into the text using a linear white fade and progressively masked blur, with white card backgrounds; do not create a separate text panel or abrupt image/text edge. Retain the looping layout and image provenance documentation; do not introduce blue surfaces.

1. Hero and Player/Koel introduction form one continuous scroll story.
2. Companion app section.
3. One Koel “vinyl shop” section: circular coin Koels on CSS pedestals (desktop 6/5/4 for 15 items, mobile 3×5), tap opens a play-first overlay with secondary shop preview. No Daily Life / Festivals split in this section.
   User correction on November 4, 2026: keep the collection on the continuous page ground (now white), without a grey studio backdrop or framed panel. Pedestals still use Kesar Sand and Coconut Husk with tonal shading for depth.
   User direction on November 4, 2026 (updated later same day): Koel preview is a centered vertical overlay — title, circular Koel art, circular play control, live continuous sound wavelength (Web Audio analyser; collapses to a single line when paused), then Add to bag. Keep the existing open motion. A design-preview sample may drive the wavelength until approved excerpts exist.
4. About (asymmetric bento feature showcase for brand pillars).
5. Founder story (homepage section replaced the earlier Founder’s Bundle slot on November 4, 2026): Daylight-style “note from our founders” letter—personal origin, why Hey Kahani exists, invitation, sign-off, and shop CTA—set flat on the white page ground with no atmospheric background and no paper/card plate. Content follows the live site founder narrative. Founder names stay generic until approved.
6. Customer stories.
7. FAQs.
8. Footer.

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
