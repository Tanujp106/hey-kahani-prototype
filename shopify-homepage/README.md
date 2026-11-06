# Hey Kahani — Shopify homepage refresh (draft)

Detached first draft for Shopify theme handoff. **Does not import or affect** `../frontend/`.

## Open locally

```bash
cd shopify-homepage
python3 -m http.server 5175
```

Then open `http://localhost:5175`.

## Sources

- Visual system: `../design-refresh.md`, `../taste.md`, brand guide
- Koel + product imagery: downloaded from [heykahani.com](https://www.heykahani.com/) into `assets/images/`
- Copy tone: Yoto-style clarity adapted to Hey Kahani / live site messaging
- Patterns: light motif wash inspired by Yoto playfulness + Mobbin ecommerce pattern refs (BAGGU/ClassDojo/MANA-style motif use, not clones)

## Stack

Plain HTML, CSS, and a small `assets/js/main.js` (nav, Koel dialog, bag dialog, scroll reveals). No 3D.
