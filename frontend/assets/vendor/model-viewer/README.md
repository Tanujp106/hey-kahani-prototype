# Vendored model-viewer

Pinned `@google/model-viewer` 4.4.0 from its published npm package:
https://www.npmjs.com/package/@google/model-viewer/v/4.4.0

`model-viewer.min.js` is the published browser distribution, used unchanged.
Package license: Apache-2.0 (`LICENSE`); bundled dependency notices are retained
in the distribution. Documentation: https://modelviewer.dev/

Loaded dynamically by `player-model.js` only when the homepage viewer is near
the viewport. The current uncompressed, texture-free GLB needs no Draco/KTX
decoder downloads or external environment assets. No per-card viewer is created.
