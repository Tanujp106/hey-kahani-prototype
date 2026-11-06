# Hey Kahani refresh — taste rules

Rules for how the detached `shopify-homepage/` should look and behave.
Token values live in `design-refresh.md`. This file is the judgment layer: what to do, what never to do, and how to resolve conflicts.

**Scope:** visual refresh only. Do not alter or import `frontend/`.  
**North star:** Yoto-warm ecommerce clarity with an Apple hint of air and hierarchy. Light mode only. Product speaks first. Motion stays quiet.

---

## 1. Always

1. **Lead with the product.** In the first viewport, the Player (or clear product story) is the dominant visual. Brand mark is visible and strong; the headline supports the product rather than competing with it.
2. **Stay light.** White, soft cream, and Kesar Sand canvases only. No dark-mode pages, no near-black marketing tiles, no cinematic black bands.
3. **Prefer clarity over spectacle.** If a visitor cannot tell what the product is and what to do next in five seconds, simplify.
4. **One job per section.** One purpose, one headline, usually one short supporting sentence, then content.
5. **Use brand fonts.** Averia Serif Libre for display; Open Sans for body, nav, and controls. No Inter/Roboto/system-as-brand.
6. **Use verified brand hexes** from `design-refresh.md` / the brand guide. Do not invent near-reds or near-creams.
7. **Primary actions are solid Gulab Red** with white labels. Few per viewport — typically one primary, optional one secondary.
8. **Keep structure ecommerce-clean:** hero → value/app → shop → about → founder → proof → FAQ → footer, unless the user changes structure.
9. **Cards only for interaction** (Koel tiles, disclosures that need a hit target, dialogs). Decorative card grids are not the default.
10. **Honor reduced motion.** Every animated moment has an instant static equivalent.
11. **Keep Shopify-ready boundaries.** Presentation must not own price, stock, product identity, or story metadata.
12. **For the refresh draft, mock social proof should read as real** (no “fictional sample” labels on quotes/press). Keep commerce unknowns honest where they affect checkout/email wiring (e.g. newsletter not yet connected). Replace mock quotes/press with approved content before launch.
13. **Preserve official logo assets** and clearspace; do not reconstruct the wordmark with typed text.
14. **Depict the Player honestly:** cream body, wood base, Gulab Red production speaker band, real control layout. Distinguish concept art from approved merchandise photography.

## 2. Never

1. **Never use dark mode** or dark alternating product tiles in this refresh.
2. **Never rebuild or couple to** the archived `frontend/` homepage. No shared CSS/JS imports between the two trees.
3. **Never fill the first viewport** with stats, schedules, promo chips, badge clusters, or secondary marketing modules.
4. **Never place floating stickers, pills, or callout badges** on top of hero product media.
5. **Never make motion the story.** No scroll-hijacked multi-act Player theater, no heavy parallax, no animation for its own sake.
6. **Never paint every surface a different accent.** Balanced color means red for action, sand/cream for warmth, ink for type — accents are rare.
7. **Never let pattern overpower product or copy.** Pattern is a light wash, not wallpaper behind dense text.
8. **Never default to card UI** for static content. If removing border/shadow/radius doesn’t hurt understanding, remove it.
9. **Never use purple-glow SaaS gradients**, multi-layer chrome shadows, emoji as UI, or rainbow pill rows.
10. **Never invent launch-critical commerce facts** (prices, inventory, ratings) or cultural product claims. Mock parent quotes and press marks are allowed in the refresh draft when they look native and are replaced before launch.
11. **Never show child listening as phone/tablet screen time** in core storytelling imagery.
12. **Never crowd the logo** or stretch/recolor unofficial lockups.
13. **Never ship autoplay audio.**
14. **Never claim visual/browser verification** that was not authorized and performed.

## 3. Composition rules

### First viewport
Allowed: wordmark/nav, one headline, one short support line, one CTA group, one dominant product image.  
Disallowed: feature grids, testimonial scraps, sticky promo bars, dual competing heroes.

### Brand test
If you remove the nav and the first screen could belong to a generic kids-tech brand, the Hey Kahani signal is too weak — strengthen wordmark presence, cultural warmth in imagery, or product distinctiveness, not more decoration.

### Section pulse
Use light canvas alternation (white ↔ soft/sand) as the divider. Do not use heavy horizontal rules or dark slabs to force rhythm.

### Hierarchy
- Display type is confident and slightly tight (premium product sizing).
- Body is readable and calm (17px class), not tiny UI grey.
- The brand name / product should not be visually outranked by a clever headline.

### Density
Medium: enough to sell and reassure, not so sparse it feels unfinished, not so rich it feels busy. When unsure, remove an element before adding one.

## 4. Color taste

| Role | Do | Don’t |
|---|---|---|
| Action | Gulab solid CTAs, key links | Blue Apple-style action color; multiple competing CTA colors |
| Canvas | White / soft cream / Kesar Sand | Near-black tiles; full-bleed mango/sky slabs as default |
| Text | Story Ink on light | Low-contrast cream-on-yellow; red body paragraphs by default |
| Accents | Sparse illustration / Koel art | Accent rainbow across chrome |
| Pattern | Soft husk/ink motif at low opacity | Loud doodle carpets behind hero type |

Client pain this solves: **too colorful/busy** → balanced application, not a dull grey site.

## 5. Imagery taste

- **Hero:** product-first, clean, premium, plenty of air.
- **Support:** warm home lifestyle + visible cultural editorial (Diaspora-like warmth without spice-shop pastiche).
- **Shop:** circular Koels as clear, tappable objects.
- Prefer authentic family moments over staged costume tropes.
- Soft natural light; avoid harsh neon product stacks.
- Pattern may appear in warm bands as a Yoto-like playful hint — keep it behind content, muted, removable without breaking layout.

## 6. Component taste

### Buttons
- Primary = filled Gulab, soft rounded rect (`rounded.md`), not giant candy pills everywhere.
- Secondary = outline or quiet text.
- One obvious next step per section.

### Cards
- Default: no cards.
- Yes: Koel shop targets, modal/dialog surfaces, controls that need a contained hit area.
- FAQ: prefer hairline accordion rows over stacked shadowed panels.

### Nav
- Light, simple, ecommerce. Official wordmark. Quiet icons.
- No opaque black utility bar.

### Proof
- Medium only: compact press/logo row + a few quotes.
- Quotes should feel editorial and calm, not a noisy infinite ticker unless later requested.

### Footer
- Warm, quiet, useful links. Honest about preview-only newsletter until Shopify wiring exists.

## 7. Motion taste

| Allowed | Forbidden |
|---|---|
| Soft opacity/translate reveals (≤ ~12px) | Scroll-owned multi-scene product choreography |
| Short hover color/lift on fine pointer | Parallax stacks, bounce noise, looping decorative motion |
| Simple open/close for dialogs | Motion that blocks scroll or competes with content |
| Instant state under reduced motion | “Premium” equated with more animation |

Client pain this solves: **too much motion** and **not premium enough** — premium here means stillness, hierarchy, and product craft, not effects.

## 8. Copy taste (presentation)

- Warm, clear, parent-reassuring; playful without cutesy chaos.
- Positive framing around imagination and connection — no shame about screens.
- Short headlines; concrete support lines.
- Do not turn every label into a slogan.
- Keep age/product claims aligned with approved SOW/store facts.

## 9. Conflict resolution

When references disagree, apply this order:

1. **Latest explicit user instruction**
2. **`taste.md` rules** (this file)
3. **`design-refresh.md` tokens**
4. Brand guide facts (palette names/hex, logo, voice, Player geometry)
5. Reference sentiment: **Yoto warmth → Apple clarity → Diaspora cultural imagery**
6. Archived `design.md` / `frontend/` — reference only for content inventory, never for style defaults

When a section feels wrong, debug in this order:
1. Remove competing elements  
2. Reduce color/pattern  
3. Enlarge product / simplify type  
4. Only then add a new component  

## 10. Build boundaries

- Implement the refresh only under `shopify-homepage/`.
- Keep `frontend/` preserved as the prior homepage archive.
- Plain HTML/CSS/JS (or Liquid-friendly equivalents) suitable for Shopify theme handoff.
- No WebGL/3D requirement unless explicitly re-requested for this refresh.
- Report source checks separately from visual checks; browser work needs per-message authorization.

## 11. Definition of done (visual)

A section is done when:
- It has one clear job and one clear CTA path.
- It reads as light, warm, and premium — not busy, not dark, not toy-chaotic.
- Product or story media is legible and not covered by chrome.
- Tokens match `design-refresh.md`.
- Rules in this file are not violated.
- Unknowns remain labeled; no invented commerce or social proof.
