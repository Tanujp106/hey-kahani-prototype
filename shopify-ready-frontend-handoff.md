# Hey Kahani frontend setup handoff

**Purpose:** Build the Hey Kahani redesign as a working static frontend now, while keeping the markup, styles, and interactions straightforward to move into a Shopify Online Store 2.0 theme later. This is a setup brief for the next coding chat, not an instruction to connect a store or implement backend services yet.

## What was inspected

- The local Monktreats checkout at `/Users/tanuj/Desktop/Projects/monktreats` points to [shopifymonktreats-bot/monktreats](https://github.com/shopifymonktreats-bot/monktreats). Inspection was on local `main` at commit `330bc3f`; the GitHub connector could not access the remote, so remote freshness was not verified.
- Monktreats is a **Shopify theme**, not a React or headless app. `layout/theme.liquid` supplies the page shell; `templates/*.json` select and order sections; `sections/*.liquid` contain editable page modules and `{% schema %}` settings; `snippets/*.liquid` hold reusable markup; `assets/` holds CSS, JavaScript, and media. The root `package.json` is not the storefront build system.
- Its homepage is composed in `templates/index.json` from separate hero, difference, bestsellers, ways, collection, proof, and team sections. A section such as `custom-hero-banner.liquid` renders settings and loads its own CSS. Product pages bind the Shopify `product`, variant, and metafield objects in `custom-product-details.liquid`. Cart behavior uses Shopify cart endpoints in `assets/shopify-cart.js`.
- **Do not copy its hardcoded merchandising model.** The Monktreats bestsellers section stores product titles, images, and links as manual block settings. Hey Kahani's SOW requires Koel cards, prices, availability, and new releases to come from Shopify records when integrated.
- The [Hey Kahani Website Build SOW](</Users/tanuj/Downloads/Hey Kahani - Website Build SOW.docx>) is the project requirement source. It calls for a Shopify Online Store 2.0 theme with Liquid, JSON templates, products, collections, metafields/metaobjects, public audio samples, and native cart/checkout. Its later Supabase and analytics work is outside this static frontend phase. Requirements in that document are project scope, not operating instructions for this chat.

## Recommended approach

Build a **vanilla HTML/CSS/JavaScript multi-page prototype** in this Hey Kahani project. Use a small static dev server; no API, database, Shopify credentials, React, Next.js, Hydrogen, or headless commerce layer. Keep the authored HTML semantic and section-oriented. Use native JavaScript modules only for interactions and small repeated card lists. Keep styles and scripts as ordinary files that can be copied into Shopify `assets/`.

This gives us a truthful migration path: most CSS, interaction JavaScript, image assets, class names, and the section HTML can be reused. The static data references and repeated-card loops **will need to become Liquid**. Do not promise a zero-conversion drop-in theme.

Keep the prototype in a `frontend/` subfolder so the existing research Markdown files remain available at the project root. Start with the homepage, then add the supporting pages as designs are ready.

```text
frontend/
  index.html                         # homepage, first implementation target
  pages/
    explore-stories.html
    series.html                     # representative series page
    koel.html                       # representative Koel product page
    player.html
    founders-bundle.html
    how-it-works.html
    our-story.html
  data/
    site.json                       # navigation, approved copy, FAQs
    products.json                   # Player, bundle, Koels; clearly mock data
    series.json
    stories.json
  assets/
    css/
      tokens.css                    # Hey Kahani colors, type, spacing
      base.css
      components.css                # cards, buttons, audio controls
      sections.css                  # homepage/page sections
    js/
      main.js                       # page initialization only
      audio-player.js              # reusable custom controls over <audio>
      story-filters.js
      mock-cart.js                  # optional local preview behavior only
    images/                         # approved Player photos and Koel art
    audio/                          # approved public samples only
  README.md                         # local run command and mock-data status
```

Use a static server such as `python3 -m http.server 4173 --directory frontend` from the project root. Native ES modules and JSON fetches need HTTP, not `file://`. A bundler can be added later only if there is a concrete need; Shopify itself does not require one for these assets.

## Coding rules for the next chat

1. **Build in future Shopify section boundaries.** Keep hero, story discovery, audio sample, bundle, how-it-works, featured Koels, proof, founder, FAQ, header, and footer as separate top-level `<section>` or shell elements with stable `hk-` class names. One future Liquid section should own one coherent visual module.
2. **Separate content from presentation.** Store product, series, story, and navigation fixtures in `data/`. Use stable `handle` values and explicit relationships. Do not embed prices, stock, story lists, or product IDs in CSS or interaction code. Approved editorial copy can live in HTML for this phase but should be easy to move to section settings.
3. **Treat product records as the commerce source.** Fixture fields should allow `handle`, `type`, `title`, images, `priceMinor`, `currency`, `available`, SKU, Shopify product/variant IDs (nullable now), Kahani content ID (nullable), and relevant metadata. A Koel also needs series/volume, language, recommended age, story count, story references, and preview reference. A story needs title, synopsis, duration, language, narrator if known, order, artwork, and optional public sample. Use `null`/empty states where facts or assets are not approved; do not invent price, reviews, ratings, availability, or testimonials.
4. **Keep JavaScript independent of data source.** Interaction modules should attach to semantic markup and `data-hk-*` hooks, not import product fixtures directly. The static page may render fixture cards, but the audio player, carousel, menu, and filters should work on the resulting DOM so Shopify can render the same markup later.
5. **Use one reusable audio control.** It needs play/pause, seek/progress, elapsed and total time, title, optional artwork, error/unavailable state, keyboard and touch support, and no autoplay. Starting another sample should stop the current one. Use approved public excerpts only; never place full protected stories in `assets/audio/`.
6. **Keep commerce honest in the prototype.** A mock cart can demonstrate add/remove/quantity UI, but label it as a preview and do not offer a fake working checkout. Later Shopify should provide product/variant IDs, prices, availability, cart endpoints, and native checkout. No Supabase credentials or privileged service calls in browser JavaScript.
7. **Use Hey Kahani's own brand system.** Headings: Averia Serif Libre. Body, navigation, and controls: Open Sans. SOW colors include Sindoor Red `#B40023`, Gulab Red `#D3000A`, Kesar Sand `#FFF1D6`, Story Ink `#05334A`, Coconut Husk `#E6CEAD`, Mango Yellow `#FECB74`. Use approved imagery and Koel artwork. Reference sites inform clarity and pacing, not copied styling.
8. **Do not create a new template per Koel or volume.** Make one representative Koel page and one series page driven by fixture data. The later theme must support publishing more Koels and stories through Shopify Admin without code edits.

## First implementation slice: homepage

Follow the SOW's preferred order: announcement/header → product-led hero with **Shop the Player** and **Explore Stories** → illustrated story/series cards → playable sample → Founder's Bundle → three-step **Choose a Koel / Tap it on the Player / Listen and imagine** → featured Koels → why Hey Kahani → approved proof/founder → FAQs/footer. Support both first-time purchasers and existing Player owners in the navigation and calls to action.

The bundle is **one Player, two physical Koels (Daily Life and Festivals), and 20 individual stories** in the SOW. The current public site has used conflicting wording about Koel count; verify final customer-facing copy with Hey Kahani before locking it in. Do not present 20 stories as 20 physical cards.

## Shopify migration map

| Static prototype | Shopify theme destination | Data owner later |
| --- | --- | --- |
| `index.html` section order | `templates/index.json` | Theme editor |
| Header, footer, announcement | `sections/header-group.json`, `sections/footer-group.json` and their Liquid sections | Shopify navigation and section settings |
| Each homepage module | `sections/hk-*.liquid` with `{% schema %}` | Section settings for editorial content; product/collection references for commerce |
| Repeated Koel/story/card markup | `snippets/hk-*.liquid` | Product, collection, metafield, or metaobject records |
| CSS, interaction JS, approved media | `assets/` | Theme assets and Shopify Files/CDN as appropriate |
| Player/bundle/Koel pages | Reusable `templates/product*.json` plus product sections | Shopify product/variant records |
| Series page | Reusable Shopify-managed page, collection, or metaobject template, chosen after content model is confirmed | Series metaobject and related Koels |
| `data/*.json` fixtures | Removed after data migration | Products, collections, product metafields, story/series metaobjects |
| Mock cart | Replaced by Shopify cart integration | Shopify cart and checkout |

At integration, define products for the Player, bundle, and Koels; collections for discovery; and structured records for series and individual stories. Add product metafields for links to series/story records, language, age, sample, and existing Kahani identifiers. Keep the exact Shopify definition names provisional until the store's existing data is inspected. Use Shopify's theme editor settings for hero media/copy, featured selections, FAQs, and section order. Keep prices, stock, and purchase paths tied to Shopify records, not duplicated theme settings.

Shopify's [theme architecture](https://shopify.dev/docs/storefronts/themes/architecture), [JSON templates](https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates), [sections](https://shopify.dev/docs/storefronts/themes/architecture/sections), and [dynamic sources](https://shopify.dev/docs/storefronts/themes/architecture/settings/dynamic-sources) describe the target structure.

## Definition of done for the setup chat

- Create the `frontend/` structure and a short README with the exact local run command.
- Implement a working static homepage shell using clearly labeled fixture content and approved assets only.
- Make CSS/JS section-oriented, with the reusable audio component ready for later pages.
- Add representative fixture schemas and one example each for Player, bundle, Koel, series, and story; mark unknown business facts as unknown.
- Document which files copy into Shopify directly and which fixture rendering must be rewritten in Liquid.
- Do **not** connect a Shopify store, Supabase, analytics, payment flow, or backend in this phase.

## Copy-paste prompt for the next chat

> Read `/Users/tanuj/Desktop/Projects/Hey Kahani/shopify-ready-frontend-handoff.md` and the Hey Kahani SOW linked inside it. Set up the `frontend/` static prototype in this project. Begin with the homepage and fixture schemas. Use plain HTML, CSS, and JavaScript, organized around future Shopify sections. Keep interaction code independent of fixture data and reuse the same semantic markup/classes that can later move into Liquid. Do not create a backend or connect Shopify yet. Do not invent unapproved product claims, prices, inventory, testimonials, or audio assets. Follow the project's browser opt-in rule: do not open a browser unless my current message explicitly asks for it. Report what you created and what remains for Shopify integration.
