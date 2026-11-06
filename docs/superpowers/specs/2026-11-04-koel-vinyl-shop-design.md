# Koel vinyl-shop section — design

Date: 2026-11-04  
Project: Hey Kahani homepage `#koels` section

## Goal

Replace the dual Daily Life / Festivals collection blocks with one physical “vinyl shop” section of **15 circular Koel coins** on stepped pedestals. Tap opens a play-first overlay with a secondary shop action.

## Copy

- Headline: **Find their next favourite Koel.**
- Subcopy: **Tap a Koel to listen and shop.**
- Keep fixture honesty line for artwork / prices / availability.
- Remove: eyebrow, right-rail support line, “Explore story collections”, “Meet the Koels”, dual series/product grids, bottom Shop Koels CTA strip.

## Layout

- **Approach:** CSS pedestal shop (no WebGL). Circular coin Koels only — not square sleeves.
- **Stage:** Continuous Kesar Sand page ground with no separate backdrop or framed panel. Plinths use Kesar Sand tops and Coconut Husk risers, with a visible front lip and warm contact shadows. This follows the user's colour correction on November 4, 2026.
- **Coins:** Thick disc construction (edge + face + specular shine + rim), slight yaw variety, hover lift for fine pointers; honor `prefers-reduced-motion`.
- **Artwork:** Image-only faces — no typography on the disc. Titles stay in `aria-label` / overlay.
- **Desktop tiers:** 6 / 5 / 4 (6+6+4 would need 16 items; catalog is 15).
- **Mobile tiers:** 3 / 3 / 3 / 3 / 3 on pedestals.

## Overlay

- Native `<dialog>` overlay.
- Priority: large coin artwork → play sample controls → shop CTA secondary.
- No autoplay. Missing approved audio stays an honest unavailable state.
- Shopping remains preview-only until Shopify is connected.

## Data

- One featured list of 15 koel-type fixture products.
- Presentation code does not own prices, stock, or story metadata.
- Search hooks attach to the coin controls instead of series cards.

## Depth refinement — November 4, 2026

The user's second reference asks for the feel of a physical stepped display.
The implementation now uses connected risers with independent top planes and
front faces, widening toward the floor. Koels remain upright, separate from the
plinth geometry. Each has twelve depth cross-sections, a bevelled cream rim,
inset artwork, directional surface light and a floor contact shadow. Fine-pointer
hover gives a small pick-up response; reduced motion keeps the static 3D pose.
Collection controls use `hk-shop-koel`, isolating them from the hero's
`hk-koel-coin` scroll transforms, height and animation rules. Source images stay
replaceable; optional image-level framing removes empty artboard margins.
Desktop 6 / 5 / 4, mobile five rows of three, and overlay behavior stay as above.
