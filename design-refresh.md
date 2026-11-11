---
version: questionnaire-2026-11-10
name: Hey-Kahani-refresh
description: A light kids-audio ecommerce system that feels human and kid-focused through minimal organic framing, small flat vectors and occasional hand-drawn details. Mostly white and Kesar Sand, with occasional Mango or Sky areas and Gulab actions.
authority: This file governs shopify-homepage/ with taste.md and the active questionnaire decisions in design.md. frontend/ remains the prior implementation. Latest explicit user decisions take precedence.
mode: light-only
references_sentiment: Supplied references inform playful composition, simplified for minimal density and the Hey Kahani brand. No copied layouts, faces or dense decorative scenes.

graphics:
  intent: human and kid-focused, minimal and purposeful
  primary-language: soft organic shapes framing content
  contour: gently irregular, smooth and confident
  supporting-language: small simple flat vectors with a few hand-drawn details
  outline: occasional thin dark outlines, not required on every shape
  faces: none in new decorative graphics
  section-edges: shaped boundaries permitted for important sections
  card-silhouette: regular rounded rectangle
  heading-treatment: small nearby accents on selected headings
  image-treatment: occasional simple shape behind unobstructed media
  density: principles and examples, no fixed shape counts
  mobile: retain only the strongest decorative shape or graphic per section
  motion: a few brief entrances, no continuous decorative movement
  handwriting-font: none

colors:
  # Brand primaries — verified from brand guide / design.md
  gulab: "#D3000A"
  sindoor: "#B40023"
  temple-maroon: "#6A0526"
  kesar-sand: "#FFF1D6"
  coconut-husk: "#E6CEAD"
  mango: "#FECB74"
  sky: "#63C3FE"
  monsoon: "#2578B7"
  story-ink: "#05334A"
  # Secondary
  parrot: "#2B9863"
  marigold: "#FF5D27"
  lavender-tea: "#D6C9E4"
  # Accents — use sparsely
  sunrise-saffron: "#FFAF27"
  rangoli-violet: "#B558DD"
  hibiscus: "#EF2289"
  peacock-teal: "#14C5A1"
  # Refresh system roles (light mode)
  action: "#D3000A"
  action-hover: "#B40023"
  action-pressed: "#6A0526"
  on-action: "#FFFFFF"
  ink: "#000000" # existing Nov 7 page-text decision
  body: "#000000"
  body-soft: "#000000"
  muted: "#7A5A4A"
  muted-soft: "#9A7A6A"
  canvas: "#FFFFFF"
  canvas-warm: "#FFF1D6"
  canvas-soft: "#FFF8EC"
  surface-husk: "#E6CEAD"
  surface-tint-sky: "#EAF6FE"
  surface-tint-mango: "#FFF3DE"
  hairline: "#E8D9C4"
  divider-soft: "#F3E6D4"
  focus-ring: "#2578B7"
  pattern-ink: "#05334A"
  pattern-soft: "#E6CEAD"
  on-warm: "#000000"
  on-action-muted: "#FFF1D6"
  paper: "#FFFFFF"
  # Forbidden in this refresh
  # dark-tile / near-black canvases / dark-mode surfaces — do not define or use

typography:
  hero-display:
    fontFamily: "Averia Serif Libre, Georgia, serif"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.02em
  # HARD RULE (Nov 7, 2026): every section h2 uses display-lg / --hk-text-section.
  # Never override font-size on .hk-how__header, .hk-app__header, or other section titles.
  display-lg:
    fontFamily: "Averia Serif Libre, Georgia, serif"
    fontSize: 40px # --hk-text-section clamp max; all section titles
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: -0.015em
    cssToken: "--hk-text-section"
    className: "hk-display hk-display--lg"
  display-md:
    fontFamily: "Averia Serif Libre, Georgia, serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: -0.01em
    cssToken: "--hk-text-md"
  display-sm:
    fontFamily: "Averia Serif Libre, Georgia, serif"
    fontSize: 24px # --hk-text-subhead
    fontWeight: 700
    lineHeight: 1.22
    letterSpacing: -0.005em
    cssToken: "--hk-text-subhead"
  hero-lead:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 17px # alias of body — Nov 7, 2026
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: -0.01em
    cssToken: "--hk-text-hero-lead"
    className: "hk-hero .hk-lead, .hk-how__lead"
  lead:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 17px # same as body — Nov 7, 2026
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: -0.01em
    cssToken: "--hk-text-lead"
    className: "hk-lead"
  lead-strong:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 17px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: -0.01em
  title:
    fontFamily: "Averia Serif Libre, Georgia, serif"
    fontSize: 30px # --hk-text-step how-it-works step titles
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0
    cssToken: "--hk-text-step"
  body-strong:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.01em
  body:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 17px
    fontWeight: 500 # medium — project default for body
    lineHeight: 1.5
    letterSpacing: -0.01em
    cssToken: "--hk-text-body"
  body-sm:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: -0.005em
    cssToken: "--hk-text-body-sm"
  caption:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 15px # --hk-text-body-sm
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
    cssToken: "--hk-text-body-sm"
  caption-strong:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0
    cssToken: "--hk-text-body-sm"
  button:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: -0.01em
    cssToken: "--hk-text-body-sm"
  button-sm:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: 0
    cssToken: "--hk-text-body-sm"
  nav:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0
    cssToken: "--hk-text-body-sm"
  fine-print:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0
    cssToken: "--hk-text-fine"
  eyebrow:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.04em
    textTransform: uppercase

rounded:
  none: 0px
  xs: 6px
  sm: 10px
  md: 14px
  lg: 20px
  xl: 28px
  pill: 9999px
  full: 9999px
  koel: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 72px
  section-lg: 96px
  gutter: 24px
  content-max: 1120px
  prose-max: 640px
  hero-max: 1200px

shadow:
  none: none
  product: "0 8px 28px rgba(5, 51, 74, 0.14)"
  product-soft: "0 4px 16px rgba(5, 51, 74, 0.10)"
  interactive: "0 2px 8px rgba(5, 51, 74, 0.08)"

motion:
  duration-fast: 160ms
  duration: 240ms
  duration-slow: 360ms
  ease: "cubic-bezier(0.22, 1, 0.36, 1)"
  ease-out: "cubic-bezier(0.16, 1, 0.3, 1)"
  reveal-distance: 12px
  hover-lift: 2px

components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.on-action}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 15px 28px
    minHeight: 52px
    boxShadow: "0 10px 28px rgba(211, 0, 10, 0.28)"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.on-action}"
    boxShadow: "0 14px 32px rgba(211, 0, 10, 0.34)"
  button-primary-pressed:
    backgroundColor: "{colors.action-pressed}"
    textColor: "{colors.on-action}"
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.42)"
    textColor: "{colors.ink}"
    border: "1px solid rgba(5, 51, 74, 0.12)"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 15px 28px
    minHeight: 52px
    backdropFilter: "blur(10px)"
    boxShadow: "0 6px 20px rgba(5, 51, 74, 0.06)"
  button-quiet:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
  text-link:
    backgroundColor: transparent
    textColor: "{colors.action}"
    typography: "{typography.body}"
  global-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
    height: 96px
    borderBottom: "1px solid {colors.divider-soft}"
  hero-product:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.hero-display}"
    padding: "{spacing.section-lg} {spacing.gutter}"
  section-warm:
    backgroundColor: "{colors.canvas-warm}"
    textColor: "{colors.on-warm}"
    padding: "{spacing.section} {spacing.gutter}"
  section-soft:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    padding: "{spacing.section} {spacing.gutter}"
  section-white:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    padding: "{spacing.section} {spacing.gutter}"
  feature-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    padding: "{spacing.section} {spacing.gutter}"
  interactive-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.hairline}"
    padding: "{spacing.lg}"
  koel-tile:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    aspectRatio: "2 / 3"
  faq-item:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderBottom: "1px solid {colors.hairline}"
    padding: "{spacing.lg} 0"
  proof-row:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
  quote-block:
    backgroundColor: "{colors.canvas-warm}"
    textColor: "{colors.ink}"
    typography: "{typography.display-sm}"
    padding: "{spacing.xl}"
  footer:
    backgroundColor: "{colors.canvas-warm}"
    textColor: "{colors.body-soft}"
    typography: "{typography.fine-print}"
    padding: "{spacing.xxl} {spacing.gutter}"
  pattern-wash:
    backgroundColor: "{colors.canvas-warm}"
    patternColor: "{colors.pattern-soft}"
    opacity: 0.35
---

## Overview

Hey Kahani's refresh should feel **human, kid-focused and minimal**. Soft organic shapes frame content, supported by small flat vectors and occasional hand-drawn details. The product and copy remain easy to understand. Most backgrounds are white or Kesar Sand, with occasional Mango Yellow or Sky Blue areas and Gulab actions.

The November 10, 2026 questionnaire narrows the earlier request to use graphics throughout the experience: this is a coherent brand language, not dense decoration in every section. The maximal generated concepts were rejected. The simpler revision is a discussion reference, not an approved page layout or source for product geometry, fonts or colours.

### Authority and scope

- The questionnaire decisions in [design.md](design.md#active-graphic-direction--november-10-2026) are the active graphic direction. They are user choices, separate from the PDF's source rules.
- Brand colour values, logo rules and voice remain grounded in the brand guide. Its primary/secondary/accent hierarchy remains in force.
- This file defines system details; [taste.md](taste.md) supplies composition principles and examples.
- Existing dated product and section decisions in `design.md` continue to govern their own details. This update does not change section order, product facts, commerce behaviour or content approvals.
- Implementation remains confined to `shopify-homepage/`. `frontend/` remains the earlier implementation; updating the shared design reference does not authorise restyling it.
- The YAML contains the broader brand palette and existing implementation tokens. Their presence does not approve using every colour or component treatment equally. Dated section-specific decisions take precedence over generic component examples.

## Colour roles

| Role | Application |
| --- | --- |
| White and Kesar Sand `#FFF1D6` | Main page grounds and breathing room. |
| Gulab Red `#D3000A` | Primary actions, selected graphic details and the Player's production speaker band. |
| Mango Yellow `#FECB74` and Sky Blue `#63C3FE` | Occasional background areas or simple framing shapes. Do not assign a new colour theme to every section. |
| Other PDF colours | Supporting roles under the primary/secondary/accent hierarchy; no palette expansion or broad rainbow of decorative colours. |
| Black `#000000` | Page headings and running copy, preserving the November 7 text decision. |
| Existing neutrals, borders and focus tokens | Supporting interface roles; do not turn them into additional decorative palette themes. |

The guide says primaries appear most often, secondaries complement without overshadowing them, and accents are minimal. Existing approved story artwork retains its own identity. Do not recolour product art merely to enforce the decorative palette. Existing section-specific inverse treatments remain governed by their dated decisions.

Check actual text/background contrast; the PDF's sample badges do not validate arbitrary UI combinations. Avoid multicolour gradients, saturated colour on every surface and decorative wallpaper behind copy. Existing specific product-card fades are separate from this graphic direction.

## Shapes and section rhythm

**Lead with soft organic shapes with slightly irregular edges.** Curves should be smooth and confident, not mechanically perfect or deliberately messy. Reuse a coherent family; simple circles, semicircles and arches can support it without becoming the dominant vocabulary.

A shape should frame an image, group content, support a heading or mark a meaningful section transition. Empty space can remain empty. Minimality is judged through hierarchy, breathing room and relevance; there is no fixed number of shapes per section.

Important sections may have organic shaped boundaries. The user explicitly did not require every section to keep a straight, flat edge. Equally, avoid repeated waves or scallops between every section. Mostly white and Kesar Sand provide continuity, with occasional Mango or Sky areas where helpful.

### Functional surface geometry

| Surface | Treatment |
| --- | --- |
| Cards | Regular rounded rectangles throughout; graphics supply variety. Use the existing `rounded.lg` / `rounded.xl` family as appropriate. |
| Buttons | Existing full pills: solid Gulab primary, frosted light secondary. Preserve shared CTA classes and states. |
| Inputs and utility controls | Existing simple radius tokens and clear interaction affordances. |
| Physical Koels | Circular discs; this does not make storefront card silhouettes circular. |
| Section boundaries and background frames | Soft organic shapes where purposeful, separate from functional card geometry. |

Do not introduce cloud-shaped, scalloped, arched, tilted or asymmetric card silhouettes as the new card system. Organic framing can sit behind a media composition without changing its functional container or obscuring content.

## Icons, vectors and handmade detail

- Use simple flat vectors with a few hand-drawn details. Filled shapes may have occasional thin dark outlines; outlines are not compulsory on every shape.
- Keep stroke weight, line caps and the degree of irregularity consistent across decorative objects. Functional icons remain in the existing Lucide-style system; decorative vectors must not create a competing control language.
- No faces, mascots or personified objects in new decoration. Existing approved story art and photography do not need to lose people or faces.
- Choose familiar objects that relate to listening, stories, play or the section's content. Making the page human and kid-focused is the motivation; a culturally themed motif inventory is not compulsory.
- Avoid dense scenic compositions, sticker collages, confetti, heavy paper-cut depth and decorative texture as the default vector style. Existing specifically requested media treatments remain separately governed.
- Use crafted shapes, vectors and relevant product/UI compositions as the main presentation language. Lifestyle photos are occasional support when the content needs them.

## Typography and heading accents

Retain **Averia Serif Libre** for display and **Open Sans** for body and interface text. No additional handwritten font; the handmade quality comes from graphics.

| Role | Existing token / class | Rule |
| --- | --- | --- |
| Hero title | `--hk-text-hero` / `hk-display--hero` | Existing responsive scale, 56px maximum. |
| Every section h2 | `--hk-text-section` / `hk-display--lg` | Same shared responsive scale, 40px maximum; no local heading-size overrides. |
| Secondary display | `--hk-text-md` | Existing responsive scale, 32px maximum; not an alternate section h2 size. |
| Leads and running copy | `--hk-text-body` and existing lead aliases | 17px, Open Sans medium 500. |
| Dense UI / metadata | `--hk-text-body-sm` | Existing 15px role. |
| Legal / fine print | `--hk-text-fine` | Existing 12px role. |

A small nearby icon or accent may support selected headings. Leave title letterforms, line breaks and reading order clear. Avoid combining icon clusters, highlights, underlines and squiggles around the same heading. Not every heading needs a graphic lockup.

## Product and image framing

Occasional simple shapes can sit **behind** images, including hero product media. Preserve the Player silhouette, controls, handle, Koel artwork and image clarity. Do not cover the product with stickers, decorative badges or foreground graphics. Keep official logo clearspace intact.

Maintain product fidelity: cream cylindrical body and arch handle, actual control layout, Gulab woven speaker band and wood-toned base. Generated mockups are concept recreations, not approved product photography. Approved product media remains replaceable through normal product/section references.

The parent companion-app section may show UI; core child-listening imagery must not suggest that the listening experience requires a phone or tablet. Custom graphics do not authorise invented app capabilities, story titles or product claims.

## Layout and components

Preserve the existing content hierarchy and useful ecommerce structure. Start with clear alignment and reading space, then add purposeful organic framing or a small vector where it helps. Do not fill a viewport with secondary promotions or decoration.

Existing spacing tokens remain starting points: an 8px base unit, 72px default section spacing, 96px for larger sections, roughly 1120px content width and 640px prose width. They do not impose a fixed graphic treatment on every section.

| Component | Guidance |
| --- | --- |
| Header / announcement | Preserve official assets, clearspace, current navigation behaviour and the separately requested slim announcement bar. Keep utility controls quiet. |
| Hero | Clear product, headline, short supporting copy and CTA group. A purposeful organic background shape may frame the product without competing with it. |
| How it works | Relevant small object vectors can clarify steps; avoid an illustrated scene around every instruction. |
| Koel cards | Keep current rounded rectangular 2:3 artwork cards, category and title treatment, price/data boundaries, preview and bag behaviour. Follow the detailed existing decision in `design.md`. |
| App / About / editorial | Organic framing may group an image or content area; do not stack multiple competing treatments. |
| Founder / community | Preserve existing content and specific media treatments. This graphic direction does not approve replacement images, testimonials or claims. |
| FAQ / forms / footer | Keep reading and task completion easy. Quiet treatment is a valid part of the shared brand language. Preserve existing functionality and specific palette decisions. |

These are examples and guardrails, not a prescribed redesign for every section. Regular card shapes and simple controls should remain consistent even where backgrounds or graphics vary.

## Motion

The user chose **a few brief entrance animations, with no continuous decorative movement**. Introduce selected shapes or vectors briefly, then leave them still; do not animate every decorative element.

Existing timing tokens are implementation starting points, not newly selected questionnaire values: approximately 240ms with the shared easing and small opacity/translate entrances, up to the existing 12px reveal distance. Avoid extended staggers, scroll-owned shape choreography, heavy parallax or motion that delays reading.

New decoration must not float, rotate, bounce or draw paths continuously. Under `prefers-reduced-motion`, show the final static composition without entrance travel or stagger; keep all content visible. Hover feedback remains subtle and restricted to fine pointers that support hover.

This rule concerns new decorative graphics. It does not silently change existing functional feedback, audio visualisation or the testimonial ticker. No autoplay audio.

## Mobile and accessibility

On mobile, keep only the strongest decorative shape or graphic in each section. Remove or simplify subordinate decoration instead of shrinking the complete desktop composition. Retain functional icons, content, images, readable headings and useful controls.

Shapes must not cause horizontal overflow, obscure text or intercept interaction. Decorative assets should be hidden from assistive technology; meaningful illustrations need appropriate accessible descriptions. Preserve keyboard focus, readable contrast and touch targets of at least 44px.

Existing layout bands remain implementation references: phone up to 640px, tablet 641–1023px, desktop from 1024px. Use content needs and the selected strongest graphic to determine placement within those bands.

## Applying and reviewing the guidelines

1. Begin with the section's content and purpose.
2. Use the shared typography, controls and regular rounded cards.
3. Add an organic frame, a small vector or a shaped boundary only where it contributes.
4. Compare with the restrained/excessive examples in `taste.md`. Judge density as a composition, not a count.
5. Keep the brand palette focused, product imagery unobstructed and mobile decoration simplified.
6. If adding motion, use a brief entrance and a readable static reduced-motion variant.
7. Preserve ordinary HTML/CSS/JS or Liquid-friendly equivalents, product-media boundaries and truthful prototype states.

The reusable shape/vector library and exact section applications remain to be designed. No generated preview is a production asset selection. These documents do not claim that the page has been restyled or visually verified. Browser verification remains current-message opt-in only.
