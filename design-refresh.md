---
version: alpha
name: Hey-Kahani-refresh
description: A light-only, photography-first kids-audio ecommerce system. Yoto-warm product clarity with an Apple hint of air, hierarchy, and quiet chrome. Brand red carries action; cream and soft neutrals carry the canvas; playful pattern is optional seasoning, never the main meal.
authority: This file governs the detached shopify-homepage/ refresh only. The existing design.md and frontend/ remain the archive of the prior homepage and are not to be mixed into this system.
mode: light-only
references_sentiment: Yoto primary; Apple clarity secondary; Diaspora cultural warmth for imagery; Nodi/Matic for product storytelling calm. No dark-mode tiles.

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
  ink: "#05334A"
  body: "#05334A"
  body-soft: "#6A0526"
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
  on-warm: "#05334A"
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
    fontSize: 18px # --hk-text-hero-lead clamp max
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: -0.01em
    cssToken: "--hk-text-hero-lead"
    className: "hk-hero .hk-lead, .hk-how__lead"
  lead:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 15px # --hk-text-lead clamp max
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: -0.01em
    cssToken: "--hk-text-lead"
    className: "hk-lead"
  lead-strong:
    fontFamily: "Open Sans, Helvetica, Arial, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.45
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
    height: 64px
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
    rounded: "{rounded.koel}"
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

Hey Kahani’s refresh is a **light-only ecommerce homepage**: warm like Yoto, clear like Apple, culturally present like Diaspora Co. The product leads. UI chrome stays quiet. Color is balanced — brand reds for action and emphasis, cream/sand for atmosphere, secondary hues only as sparse accents or soft pattern. There is **no dark mode** and no alternating near-black product tiles.

The client rejected the prior direction for being **too busy/colorful**, **not premium enough**, and **too motion-heavy**. This system answers those three complaints directly: restrained palette application, premium product-first hierarchy, and subtle motion only.

**Key characteristics**
- Light canvases only: white, soft cream, Kesar Sand, light tints — never dark tiles.
- Product-first hero: Player (and/or Koel) as the dominant visual; headline supports, does not overpower the product.
- Solid Gulab Red primary CTAs; few per viewport.
- Averia Serif Libre for display with slightly tightened tracking; Open Sans for body/UI at a readable 17px base.
- Photography mix: crisp product hero + warm lifestyle/cultural support imagery.
- Playful pattern allowed as a light wash or section texture — never as visual noise over product or type.
- Cards only for interactive modules (Koel tiles, FAQ rows, shop/dialog surfaces).
- Medium density: clear section blocks with breathing room; not museum-sparse, not catalog-crammed.
- Medium proof: a short press/logo row and a few quotes — not a wall of social proof.
- Detached implementation target: `shopify-homepage/`. Do not import or couple to `frontend/`.

**Authority**
- Brand hexes, logo rules, Player/Koel geometry, and voice still come from the brand guide (summarized in `design.md`).
- Layout taste, density, motion, light-only rule, and refresh component grammar come from **this file** + `taste.md`.
- Latest explicit user decisions win over both docs.

## Colors

### Action
- **Action / Gulab** (`{colors.action}` — `#D3000A`): Primary CTAs, key interactive emphasis, production Player speaker band in product art.
- **Action Hover / Sindoor** (`{colors.action-hover}` — `#B40023`): Hover for primary buttons.
- **Action Pressed / Temple Maroon** (`{colors.action-pressed}` — `#6A0526`): Pressed/active primary.
- **On Action** (`{colors.on-action}` — `#FFFFFF`): Text/icons on solid red buttons.

### Surfaces (light only)
- **Canvas** (`{colors.canvas}` — `#FFFFFF`): Default page ground and product-hero ground.
- **Canvas Soft** (`{colors.canvas-soft}` — `#FFF8EC`): Alternate light band for gentle rhythm without dark mode.
- **Canvas Warm / Kesar Sand** (`{colors.canvas-warm}` — `#FFF1D6`): Warm section bands, footer, quote blocks, pattern wash base.
- **Surface Husk** (`{colors.surface-husk}` — `#E6CEAD`): Soft pedestals, subtle fills, pattern support.
- **Tint Sky / Tint Mango**: Optional light section washes for variety; keep large areas mostly white/sand.

### Text
- **Ink / Story Ink** (`{colors.ink}` — `#05334A`): Headlines and primary body on light surfaces.
- **Body Soft / Temple Maroon** (`{colors.body-soft}` — `#6A0526`): Secondary body where a warmer dark is needed.
- **Muted**: Supporting labels, proof row, captions.

### Lines
- **Hairline** (`{colors.hairline}` — `#E8D9C4`): Interactive card borders, FAQ dividers.
- **Divider Soft** (`{colors.divider-soft}` — `#F3E6D4`): Nav underline, quiet separators.
- **Focus Ring / Monsoon** (`{colors.focus-ring}` — `#2578B7`): Keyboard focus only — not a second brand CTA color.

### Accents & pattern
Secondary and accent brand hues exist for illustration, Koel art, and rare highlights. On marketing chrome they stay sparse. Pattern washes use soft husk/ink at low opacity — never full-saturation doodle carpets behind dense copy.

### Explicitly out of system
- Near-black section tiles, dark cinematic bands, dark-mode counterparts.
- Purple-glow SaaS gradients, multi-layer card shadows, rainbow pill clusters.

## Typography

### Families
- **Display**: `Averia Serif Libre` — headlines, section titles, brand moments.
- **Body / UI**: `Open Sans` — paragraphs, nav, buttons, captions, forms.

Do not substitute Inter/Roboto/system stacks as the brand voice. Fallbacks may keep the page readable while fonts load; they are not a design direction.

### Hierarchy principles
- Display sizes use slight negative tracking for a tighter, more premium product feel (Apple hint) while remaining Averia.
- Body stays at **17px / 400 / ~1.5** for a reading pace, not a dashboard scan pace.
- Weight ladder for UI: 400 / 600 / 700. Avoid inventing a mid “500 everywhere” look.
- One headline job per section. Supporting copy is one short lead, not a paragraph essay above the fold.

### Responsive display steps (guideline)
| Context | Token | Approx desktop | Approx phone |
|---|---|---|---|
| Hero | `hero-display` | 56px | 34–40px |
| Section | `display-lg` / `display-md` | 40 / 32px | 28 / 26px |
| Lead | `lead` | 22px | 18–20px |
| Body | `body` | 17px | 16–17px |

## Layout

### Spacing
- Base unit **8px**. Section padding `{spacing.section}` (72px) default; hero can use `{spacing.section-lg}` (96px).
- Content max ~`{spacing.content-max}` (1120px); prose ~640px; hero media may breathe wider up to ~1200px.
- Medium density: enough modules to sell (hero, how-it-works/app, shop, about, founder, proof, FAQ, footer) without stacking competing promos in one viewport.

### Section rhythm (light pulse)
Alternate **white ↔ soft cream/sand** bands for rhythm. Color change is the divider — not dark tiles, not heavy rules.

Suggested pulse for the refresh homepage:
1. White product hero
2. Soft/warm benefit or app band
3. White Koel shop
4. Warm about / cultural editorial
5. White founder note
6. Soft proof + quotes
7. White FAQ
8. Warm footer

### Whitespace
Product imagery gets a pedestal of air. Crowding the Player or Koel with badges, stickers, or floating chips is forbidden. First viewport: brand, one headline, one short support line, one CTA group, one dominant product image.

## Elevation & depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow | Sections, nav, text blocks, FAQ |
| Hairline | 1px `{colors.hairline}` | Interactive cards only |
| Product soft | `{shadow.product-soft}` | Small product/Koel thumbs |
| Product | `{shadow.product}` | Hero Player / featured product resting on a surface |
| Interactive | `{shadow.interactive}` | Optional hover on interactive cards only |

Shadows are for **product weight** and light interactive affordance — never for decorative card stacks across the page.

## Shapes

| Token | Value | Use |
|---|---|---|
| `none` | 0 | Full-bleed section frames |
| `sm` / `md` | 10 / 14px | Buttons, inputs |
| `lg` / `xl` | 20 / 28px | Interactive cards, soft media frames |
| `pill` / `koel` | 9999px | All storefront CTAs; Koel discs; rare status chips |

Primary and secondary CTAs are **full pills** (`9999px`) sitewide — solid Gulab primary, frosted light secondary — matching the hero pair.

## Imagery

### Mix (preference D)
- **Hero**: product-first — clear Player silhouette, Gulab Red production band, honest geometry.
- **Support**: warm lifestyle and cultural editorial photography (family listening, home ritual, South Asian cues without cliché).
- **Koels**: circular story art as shopable discs.
- **Pattern**: optional light Yoto-like doodle/motif wash on warm bands at low opacity.

### Rules
- Prefer real or approved product/lifestyle media over decorative gradient blobs.
- No phones/tablets in core child-listening storytelling imagery; companion-app section may show the parent app role carefully.
- Avoid stereotypical “Indian culture” stock, harsh saturation, and busy collage heroes.
- Manufacturing grey band → depict production **Gulab Red** in concept art; label approximations honestly in preview states.

## Components

### Navigation — `global-nav`
Light white/cream bar, Story Ink links, official wordmark, quiet bag/search icons. Height ~64px. No black Apple-style global bar.

### Buttons
- **`button-primary`**: solid Gulab pill, white label, soft red shadow; few per view. Class `hk-btn hk-btn--primary`.
- **`button-secondary`**: frosted light pill, black label, thin tonal border; second action only when needed. Class `hk-btn hk-btn--secondary`.
- **`button-quiet` / `text-link`**: for tertiary navigation inside sections.

### Hero — `hero-product`
Edge-conscious but light. Centered or product-weighted composition: product dominates; type is confident and shorter than the old scroll-theater pages. No detached floating badges on the product.

### Sections
`section-white`, `section-soft`, `section-warm` — the only canvas modes. Use them to pulse rhythm.

### Interactive only cards
- **`koel-tile`**: circular, tappable, opens shop/preview affordance.
- **`interactive-card`**: FAQ is usually divider rows; use cards if a control needs a hit target container.
- **`faq-item`**: hairline-separated disclosure rows, not heavy panels.

### Proof
- **`proof-row`**: logos / “as seen in” in muted mono treatment.
- **`quote-block`**: a few short parent quotes on warm canvas — not a dense ticker of competing cards unless later requested.

### Footer — `footer`
Warm sand canvas, quiet links, newsletter preview may remain honestly disabled until Shopify wiring.

## Motion

Subtle only (`{motion.duration}` ~240ms, soft ease):
- Soft fade/translate reveals on scroll (`reveal-distance` ≤ 12px).
- Hover color/lift on fine-pointer only.
- No scroll-hijacking product theater, no multi-stage docking narratives unless explicitly re-requested.
- Honor `prefers-reduced-motion`: instant state, no reveal travel.

## Responsive behavior

| Band | Width | Notes |
|---|---|---|
| Phone | ≤ 640px | Single column; hero type steps down; CTAs full-width optional |
| Tablet | 641–1023px | 2-column feature/about where useful |
| Desktop | ≥ 1024px | Full hero split or centered product stack; content lock ~1120–1200px |

Touch targets ≥ 44px. Nav collapses cleanly; do not hide primary shop CTA on mobile.

## Iteration guide

1. Change one component at a time; reference YAML keys.
2. Use `{token.refs}` — do not invent near-hexes for brand colors.
3. Stay light-only. If a section feels flat, switch white ↔ sand before adding chrome.
4. If a section feels busy, remove color/pattern before enlarging type.
5. Cards only when interaction needs a container.
6. Document default + pressed/focus; keep hover subtle and pointer-conditioned.
7. Implement in `shopify-homepage/` only — zero imports from `frontend/`.

## Known gaps

- Exact Shopify section schema / Liquid mapping not specified yet.
- Approved final product photography vs concept recreations still need provenance labels in preview.
- Testimonial/press content must stay fictional-labeled or approved — do not invent launch claims.
- Pattern motif library not drawn yet; treat pattern as optional until assets exist.
- Companion-app UI shots and Koel catalog media will be plugged via product/media references, not hardcoded marketing claims.
- Browser visual verification of reference sites and of this refresh remains unperformed until explicitly authorized.
