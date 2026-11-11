# Hey Kahani refresh — taste rules

Rules for how the detached `shopify-homepage/` should look and behave.
Token values live in `design-refresh.md`. This file is the judgment layer: what to do, what never to do, and how to resolve conflicts.

**Scope:** visual refresh only. Do not alter or import `frontend/`.  
**North star, November 10, 2026:** human, kid-focused, minimal. Soft organic shapes frame content; small flat vectors and occasional hand-drawn details bring warmth. Product and copy stay clear. Use the brand palette with discipline.

The questionnaire decisions in [design.md](design.md#active-graphic-direction--november-10-2026) govern this update. Reference images inform the approach; they are not layouts to copy. The dense generated concepts were rejected. The simplified generated revision is a discussion reference, not an approved implementation.

## Graphic principles

- **Give each shape a job.** Frame an image, connect a heading to its content, group a feature, or shape an important section transition. Do not decorate every available gap.
- **Lead with soft organic contours.** Slight irregularity should feel drawn by a person, with smooth confident edges. Reuse a coherent family instead of inventing a new blob for each section. Circles and arches may support it.
- **Keep vectors simple.** Flat colour, recognisable object silhouettes and a few hand-drawn details. Filled shapes may have occasional thin dark outlines. Avoid faces, mascots, heavy texture, sticker borders and dense scenes in new decoration.
- **Let section edges have personality.** Important sections may have a soft shaped boundary. Choose this when it helps the page rhythm; neither flat edges everywhere nor waves everywhere are requirements.
- **Keep cards regular.** Use consistent rounded rectangles. Graphics, content and spacing create variety; scalloped, cloud-shaped, tilted and asymmetric card silhouettes do not.
- **Keep the palette focused.** White and Kesar Sand lead; Mango and Sky may have occasional larger roles. Red remains the action colour. Other PDF colours support selectively; do not introduce a broad rainbow of section themes.
- **Use small heading accents selectively.** Keep them adjacent to the title, clear of letterforms and line breaks. Do not make every heading an illustrated lockup.
- **Frame images from behind.** A simple organic shape can support an image without crossing the Player, its controls, the Koel art, faces in approved photos, or text. Keep the logo's exclusion zone clear.
- **Make it human and kid-focused.** Choose relevant, familiar objects and gentle imperfection. Cultural motifs may fit the content, but they are not a compulsory decorating theme.
- **Reduce for mobile.** Keep the strongest decorative shape or graphic in a section. Remove subordinate decoration rather than shrinking the whole desktop composition. Retain functional icons and content.
- **Allow a few brief entrances.** Decorations settle into place and stay still; no continuous floating, spinning, bouncing or path drawing. Reduced motion uses the final static composition.
- **Judge the composition, not a quota.** There is no fixed count of shapes per section. Keep breathing room and remove graphics that compete with content. A quiet section is part of the rhythm.

### Examples, not prescribed layouts

| Context | A restrained application | Too much |
| --- | --- | --- |
| Hero | A soft Sky or Mango shape behind the Player, leaving the headline and product clear | Layered landscape, clouds, kite, rays and stickers around the same product |
| How it works | Small simple object vectors aligned with concise steps | Large scenic panels and multiple competing arrows for every step |
| Important section | A soft organic edge with generous spacing | Repeated scallops and waves on every band |
| Koel grid | Regular rounded cards; the story art supplies visual interest | Decorative shapes between every card or a different silhouette per product |
| Heading | A small relevant nearby accent when useful | Underline, highlight, icon and squiggles all emphasising the same title |
| App or editorial image | A simple background shape, or no decoration where the image already leads | A shaped frame, texture, scattered icons and ornamental caption competing together |

These examples are implementation guidance derived from the answers, not approved section-by-section designs. Apply the same principles to About, founder, community, FAQ and footer, with quieter treatment where reading or interaction needs it.

---

## 1. Always

1. **Lead with the product.** In the first viewport, the Player (or clear product story) is the dominant visual. Brand mark is visible and strong; the headline supports the product rather than competing with it.
2. **Stay light.** Mostly white and Kesar Sand, with occasional Mango or Sky areas. Preserve existing section-specific inverse treatments where already directed; do not introduce dark-mode marketing tiles.
3. **Prefer clarity over spectacle.** If a visitor cannot tell what the product is and what to do next in five seconds, simplify.
4. **One job per section.** One purpose, one headline, usually one short supporting sentence, then content.
5. **Use brand fonts.** Averia Serif Libre for display; Open Sans for body, nav, and controls. No Inter/Roboto/system-as-brand.
6. **Use verified brand hexes** from `design-refresh.md` / the brand guide. Do not invent near-reds or near-creams.
7. **Primary actions are solid Gulab Red** with white labels. Few per viewport — typically one primary, optional one secondary.
8. **Keep structure ecommerce-clean:** hero → value/app → shop → about → founder → proof → FAQ → footer, unless the user changes structure.
9. **Keep card silhouettes consistent.** Regular rounded rectangles for card modules; do not add a card merely to hold decoration.
10. **Honor reduced motion.** Every animated moment has an instant static equivalent.
11. **Keep Shopify-ready boundaries.** Presentation must not own price, stock, product identity, or story metadata.
12. **Keep content provenance honest.** Follow the approved-content and fictional-sample rules in `design.md`; a graphic refresh does not approve new quotes, press marks, or commerce facts.
13. **Preserve official logo assets** and clearspace; do not reconstruct the wordmark with typed text.
14. **Depict the Player honestly:** cream body, wood base, Gulab Red production speaker band, real control layout. Distinguish concept art from approved merchandise photography.

## 2. Never

1. **Never use dark mode** or dark alternating product tiles in this refresh.
2. **Never rebuild or couple to** the archived `frontend/` homepage. No shared CSS/JS imports between the two trees.
3. **Never fill the first viewport** with stats, schedules, promo chips, badge clusters, or secondary marketing modules.
4. **Never obscure product media.** Background shapes may frame the hero product; stickers, pills, or callouts must not cover it.
5. **Never make motion the story.** No scroll-hijacked multi-act Player theater, no heavy parallax, no animation for its own sake.
6. **Never paint every surface a different accent.** Balanced color means red for action, sand/cream for warmth, ink for type — accents are rare.
7. **Never let decoration overpower product or copy.** Do not default to patterned wallpaper, even at low opacity.
8. **Never default to card UI** for static content. If removing border/shadow/radius doesn’t hurt understanding, remove it.
9. **Never use purple-glow SaaS gradients**, multi-layer chrome shadows, emoji as UI, or rainbow pill rows.
10. **Never invent launch-critical commerce facts** (prices, inventory, ratings), cultural product claims or apparently genuine social proof. Follow `design.md` for clearly labelled prototype samples.
11. **Never show child listening as phone/tablet screen time** in core storytelling imagery.
12. **Never crowd the logo** or stretch/recolor unofficial lockups.
13. **Never ship autoplay audio.**
14. **Never claim visual/browser verification** that was not authorized and performed.

## 3. Composition rules

### First viewport
Allowed: wordmark/nav, one headline, one short support line, one CTA group, one dominant product image.  
Avoid: feature grids, testimonial scraps, or dual competing heroes. Preserve the separately requested slim announcement bar; it is not a decorative badge cluster.

### Brand test
Check that the official mark, distinctive Player, brand colours and graphic vocabulary feel like Hey Kahani, while the simple organic shapes make the page feel human and kid-focused. More cultural ornament is not the default remedy.

### Section pulse
Use mostly white and Kesar Sand for breathing room. Occasional Mango/Sky areas and soft organic boundaries can mark important sections. Do not force every section into the same flat-band pattern or shape every boundary.

### Hierarchy
- Display type is confident and slightly tight (premium product sizing).
- Body is readable and calm (17px class), not tiny UI grey.
- The brand name / product should not be visually outranked by a clever headline.

### Density
Minimal and readable, with enough content to explain the product. Use principles and examples rather than a fixed decoration budget. Remove competing detail when a composition feels dense or try-hard.

## 4. Color taste

| Role | Do | Don’t |
|---|---|---|
| Action | Gulab solid CTAs, key links | Blue Apple-style action color; multiple competing CTA colors |
| Canvas | Mostly white / Kesar Sand; occasional Mango or Sky areas | Every section in a different saturated colour; near-black marketing tiles |
| Text | Black via the shared ink/body tokens | Low-contrast combinations; red body paragraphs by default |
| Accents | Sparse illustration / Koel art | Accent rainbow across chrome |
| Shapes | Purposeful soft organic framing and selected section edges | Loud doodle carpets, dense shape stacks or decorative wallpaper |

The aim is a kid-focused brand experience with a controlled palette and minimal visual density.

## 5. Imagery taste

- **Hero:** product-first, clear, plenty of air; a simple organic background shape may support it.
- **Support:** use crafted vectors and relevant product/UI compositions. Lifestyle photos are occasional support when needed, not the default language.
- **Shop:** regular rounded rectangular product cards using the current art, data and interaction rules in `design.md`. The physical Koel remains circular.
- Prefer authentic family moments over staged costume tropes.
- Soft natural light; avoid harsh neon product stacks.
- **Decorative graphics:** simple flat vectors with occasional hand-drawn details; soft organic framing is primary. New decoration is faceless; existing approved story artwork and photography are not subject to a blanket ban on people.
- Choose objects for relevance and familiarity, not to fill an obligatory doodle inventory. Use the focused surface palette and the PDF colour hierarchy. Do not treat the earlier section-restricted doodle rules as the active system.

## 6. Component taste

### Buttons
- Primary = shared solid Gulab pill with white label and soft red shadow (`hk-btn--primary`).
- Secondary = shared frosted light pill with black label (`hk-btn--secondary`).
- One obvious next step per section.

### Cards
- Where cards are useful, keep regular rounded silhouettes and consistent spacing. Graphics supply variety.
- Preserve existing Koel shop and dialog functionality; avoid adding decorative containers without a purpose.
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
| A few brief opacity/translate entrances (≤ ~12px), then stillness | Scroll-owned multi-scene product choreography |
| Short hover color/lift on fine pointer | Parallax stacks, bounce noise, looping decorative motion |
| Simple open/close for dialogs | Motion that blocks scroll or competes with content |
| Instant state under reduced motion | “Premium” equated with more animation |

Motion should introduce selected elements briefly without becoming the page's visual theme. No continuous decorative motion. This does not silently change existing functional feedback, audio visualisation, or the testimonial ticker.

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
4. `design.md` for brand facts and dated product/section decisions; its November 10 questionnaire section is active, not archived
5. Reference sentiment: playful compositions informed by the supplied references, simplified into Hey Kahani's own graphic language
6. Archived `frontend/` implementation — not a source of automatic style defaults for the refresh

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
- It feels human, kid-focused, light and minimal, with space for the content to lead.
- Organic framing and small vectors have a clear purpose; regular card silhouettes remain consistent.
- Mobile retains only the strongest decoration per section, and reduced motion preserves the static composition.
- Product or story media is legible and not covered by chrome.
- Tokens match `design-refresh.md`.
- Rules in this file are not violated.
- Unknowns remain labeled; no invented commerce or social proof.
