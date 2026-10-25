# Third-party provenance

The seminar photographs in `public/assets/highlights` are compressed copies of CMC's 2026 event images.

The speaker cards and profile drawer in `public/ui/speakers.*` adapt the CMS project's `seminar/views/partials/about-team-section.ejs` layout and interaction, using native browser features. Portraits in `public/assets/speakers` retain their original ownership and are stored locally as WebP:

- [Peter Alexiadis](https://ik.imagekit.io/dr5fryhth/conferencenew/f8aaed81-30d8-45c8-ad76-f4ca676449da.JPG?updatedAt=1770796073766) and [David Bailey](https://ik.imagekit.io/dr5fryhth/conferencenew/d6633b22-b0b5-40c1-8a9b-3fa75074dc9c.JPG?updatedAt=1770796068105): the portraits used by the CMS reference.
- [Juliette Twumasi-Anokye](https://seminar.cmc-ghana.com/images/juliet.png) and [Paul Kofi Datsa](https://seminar.cmc-ghana.com/images/mrdatsa.png): CMC's official 2026 recap.

The preloader's word sequence and upward curtain motion are adapted from [Omari's portfolio](https://github.com/omariomari2/omariswe), commit `39897354f7f38513a2fd8037af0607cfc8b34afb` (`index.html`, `assets/js/index-new.js`, and `assets/css/style-new.css`). CMC uses its own native-animation implementation in `public/ui/preloader.js`, with no Omari runtime dependencies.

Captured from [Sam Cheng’s portfolio](https://www.samfcheng.com/) on 2026-09-30:

- `public/vendor/C41mHjnf.js`: the card scene and bundled Rapier JavaScript bindings. Local changes externalize the WebAssembly payload and add a render-ready hook.
- `public/vendor/physics.wasm`: the original embedded Rapier WebAssembly bytes, stored separately.
- `public/vendor/BPhERcaf.js` and `B2SoGeMX.js`: Three.js r186 and its geometry/environment helpers.
- `public/assets/badge_nofilter.webp`: a lossless WebP conversion of the captured card artwork, used as the paper texture.
- `public/fonts/PPKyoto-Regular.woff`: the captured PP Kyoto Regular font.

These materials retain their respective ownership. No new license or redistribution permission is granted here for the captured scene, artwork, or font. The component wrapper and editor do not change those rights.

`THIRD_PARTY_LICENSES.txt` contains the verified upstream licenses for Three.js (MIT), Rapier and Rapier.js (Apache-2.0), and qrcode-generator (MIT). Those licenses apply to the identified libraries, not to all captured materials.

`public/fonts/SeasonMix-Regular.woff` reuses the heading font referenced by the CMS project's shared stylesheet. Its original source is [Season Mix Regular](https://cdn.prod.website-files.com/68eee3b7aa1d9628fd1f8ee0/68f15cc2a525239513fc686d_SeasonMix-Regular.woff). The font retains its existing ownership and licensing terms.

`public/assets/cmc-logo-mark.svg` is the [CMC logo mark](https://ik.imagekit.io/dr5fryhth/conference/create_logo_from_image_019d75ed-9ea3-7123-a3f6-a8fb2b2f41ed.svg?updatedAt=1775884388922) supplied for the conference site. The artwork is stored unchanged.
