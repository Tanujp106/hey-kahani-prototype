# Public samples only

`preview-sample.mp3` is copied from `frontend/assets/audio/preview-sample.mp3`.
It is an existing design-preview stand-in (trimmed internet sample), not approved
story audio. The playing button labels this shared fallback as demo audio.
Replace it with approved public excerpts before launch.

The Koels section supplies the fallback through `data-preview-src`, marked with
`data-preview-demo="true"`. Each card can override it with its own
`data-preview-src`, populated from product media in Shopify. Card overrides are
treated as actual public previews, so only supply approved excerpts there.
One shared player loads audio only on interaction. External audio URLs must
allow CORS for the live Web Audio visualizer.

Do not add protected full-length audio.
