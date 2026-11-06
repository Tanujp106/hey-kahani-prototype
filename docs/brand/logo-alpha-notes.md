# Transparent official wordmarks

Created October 31, 2026 for the user's request to remove the logo background.

## Final assets

- `frontend/assets/images/brand-wordmark-transparent.svg`: Sindoor Red `#B40023`.
- `frontend/assets/images/brand-wordmark-cream.svg`: Kesar Sand `#FFF1D6` for the
  dark footer, matching the guide's approved light-on-dark use.
- Both retain the official source's **275 × 131** `viewBox`, not the earlier
  596 × 308 PDF-crop artboard. Use their intrinsic ratio without stretching.

## Official source and preservation

The source is the inline stacked Hey Kahani SVG in the public site's header:
https://www.heykahani.com/ (retrieved by ordinary HTTP on October 31, 2026).
Its three original path `d` strings are copied **unchanged**. Only the website's
Tailwind classes were removed, an explicit approved fill added, and accessible
image metadata supplied. No lettering, geometry, kerning, spacing, or bird detail
was generated or traced. No background element, filter, embedded bitmap,
external image, script or runtime dependency is present.

This official vector supersedes the white-background PDF crop for frontend use.
The crop remains unchanged as a reference. Respect the brand guide's clearspace,
80px digital minimum, and tagline requirement above 200px display width.

## Validation

- XML and exact-source comparison passed: three identical paths and original
  viewBox for both color variants; no external hrefs.
- Native AppKit rendered the red SVG at 275 × 131 for visual inspection. The
  stacked wordmark and bird detail match the official lockup, with transparent
  exterior and solid Sindoor Red ink.
- Browser inspection was not used or authorized.

## Rejected trials

The requested imagegen background-removal attempt introduced speckle and edge
changes, so it was rejected and never copied into active logo paths. An SVG
mask alternative was also rejected after native CoreSVG rendered its image
filter inconsistently. The final files use the actual official vector paths,
not either trial.
