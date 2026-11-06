# Kahani Player presentation model

`kahani-player.glb` is a real glTF 2.0 binary model with original geometric meshes
and PBR materials. It contains no image planes, photographs, texture dependencies,
external URLs, animation frames or embedded renderer.

It is an approximate presentation model, **not manufacturing CAD**. The supplied
archive called “3d-models” contains PNG renders, not source mesh files. Geometry
was built from the visible manufacturing references, principally
`docs/product-reference/manufacturing-front-angle.png`, with `design.md` and the
user's production-color direction: Gulab Red `#D3000A` on the speaker band,
white/cream housing and handle, and a wood-toned base.

Included geometry:

- Rounded cylindrical white housing with a recessed blank top plate.
- Gulab Red speaker band with small geometric surface apertures.
- Wooden base with restrained geometric grain seams.
- Arch carrying handle and side pivots.
- Five raised controls: plus; previous / play-pause / next; minus.
- Small, two-arc cyan status light on the top.

Coordinate contract:

- Metres; **Y up**, **front +Z**, ground at **y = 0**.
- Bounds: x `[-0.084, 0.084]`, y `[0, 0.319]`, z `[-0.07815, 0.0812]`.
- Blank top-plate center: `(0, 0.2258, 0)`; usable plate radius `0.0595`.
- Cyan light-ring nominal radius: `0.023`.
- 13 named meshes, 15,556 triangles, 440,588 bytes (about 430 KiB).

Regenerate from the repository root with Python's standard library:

```sh
python3 scripts/build-player-model.py
```

The retained generator uses no third-party dependencies and validates its GLB
header/chunk sizes, alignment, accessors and bounds, index ranges, finite values,
triangle count and file-size limit. Two successive builds were byte-identical.
Current SHA-256:
`8cd5e9fbac40e76122f8a489d7ef030f2dae4a226873a5abfd1f92b032b66d0e`.

The file is a model asset only. A lightweight model-viewing component in the
storefront is responsible for loading, camera controls, lighting, reduced-motion
behavior and any Shopify product-media integration. A future accurate supplied
GLB can replace this model using the same coordinate contract or updated camera
settings. Visual rendering was not inspected in a browser in this revision.
