# Thirdrecreate — implementation and takeover guide

## User-approved scope
Build a NEW independent React application here. Do not modify `C:\Users\Bright\Desktop\third` (committed source reference) or `C:\Users\Bright\Desktop\Projects\CMCMain` (read-only donor). User particularly values visual fidelity and distrusts broad redesigns. Preserve the reference composition: live clock top-left, compact centered expanding navigation, Let's talk top-right, immersive full-screen hero and coordinated transitions. Use CMCMain's loader and Haffer font. Lorem ipsum is intentional. This milestone is the loader/header/hero/contact drawer, NOT another five-page archive.

## Non-negotiable independence
- Do not copy Thirdway HTML, CSS, JS, Lottie, fonts, logos, photography, video, text, or `/_next/` files. No remote Thirdway requests or dependency on the old localhost:3000 server.
- Write readable React/CSS. General design ideas and observed geometry inform the implementation; no claim of legal clearance or exact pixel parity.
- Haffer files are supplied from CMCMain at the user's direction; web licensing is unverified. CMC loader provenance is documented in NOTICE.md; using it does not grant rights to CMC or other marks. Treat branding as a replaceable demo.
- Hero is an original generated still with restrained motion, not Thirdway's footage. Component accepts a future user-licensed video source.
- Never invent a working backend. Contact form is a local demonstration and must visibly state that no message was sent.

## Implementation plan / file map
1. Vite + React app; `src/main.jsx` entry, `src/App.jsx` orchestration and scroll state.
2. `src/components/Preloader.jsx`: React markup wrapping the CMC native Web Animations loader; keep original word sequence, five colors, rotation and slot transitions. Respect reduced motion and cleanup.
3. `src/components/Header.jsx`: clock, compact centered brand/menu, expanded nav, horizontal latest cards. Escape closes; restore focus; lock background scroll; shared contact action.
4. `src/components/ContactDrawer.jsx`: native dialog, focus handling, Escape/backdrop close, demo contact form.
5. `src/components/Hero.jsx`: fullscreen media, large bottom-aligned two-line heading; scroll reveals supporting text. Header fades in after loader.
6. `src/styles.css`: local Haffer font faces, responsive geometry, reduced-motion fallbacks. No Tailwind or third-party reference CSS.
7. Browser verify loader sequence and exit, menu open/close/Escape/card scroll, contact drawer/demo form, heading/media/scroll at desktop and narrow viewport. Build and run dependency audit.

## Reference geometry (observed at 1280x720)
- Header top20px; edge controls32px from sides. Center compact nav around170x44px; expanded panel about680px wide, capped to viewport height.
- Reference hero headline about110px, tight -.06em tracking and .92 line-height. Left32px. Two lines; use Haffer metrics and adjust visually rather than assume identical font widths.
- Cream #f7f1e9 / dark #20221b; hero warm full bleed. Menu light surface, subtle radius, blurred darkened backdrop. Clock has two outlined digit pills separated by colon and GMT label. Contact CTA underlined with small arrow capsule.
- Avoid generic cards, decorative gradients and unrelated sections. Scope must stay small.

## Commands
`npm install`, `npm run dev` (127.0.0.1:5178), `npm run build`, `npm test`, `npm run preview`.

## Current status
Implemented: independent React/Vite app with CMC slot loader, live GMT clock, expanding centered navigation, card strip controls, full-screen original generated hero image, scroll continuation, and a native-dialog contact drawer. Content is intentionally lorem ipsum. Local image/fonts/logo require no external media service. Build passes. There is no GSAP dependency; motion uses CSS and Web Animations API.

User's latest corrections: replace the navbar STUDIO badge with CMCMain's exact round logo, and synchronize loader and hero. Logo is copied unchanged to `public/branding/cmc-round-logo.svg`, used in header and footer. Do not replace it with a text badge or reconstructed SVG.

## Loader synchronization — understand before editing
- `App.jsx` has TWO independent states: `loading` controls loader mount/input locking; `ready` controls hero and header entrance. Do not collapse them into a single boolean again.
- `startPreloader(loader, {onReveal,onComplete})` waits for `document.fonts.ready` AND hero image `decode()`. It runs CMC's original five words/colors, 200ms slot/rotation steps and 350ms holds.
- `onReveal` runs BEFORE loader fade. It sets ready=true so header/headline begin animating behind the still-opaque overlay. Loader then fades for750ms. `onComplete` runs afterward, unmounting it and unlocking the page.
- Previous bug: desktop loader background turned transparent before the hero/header became ready; the hero entrance then started after the loader disappeared. Do not reintroduce that early transparent-background timeout.
- Loader owns animation/timer cancellation and root `is-preloading` class. React owns header/main inert state. Do not directly restore main.inert from a captured initial value: it can re-lock the finished page.
- Reduced motion skips the sequence after assets are ready. The10s watchdog releases the page if media readiness fails. Cleanup prevents late callbacks after unmount.
- `src/lib/cmc-preloader.test.js` verifies reveal-before-fade-before-complete order, image gating/cancellation, and reduced motion. These3 targeted tests pass.

## Browser verification recorded
- Desktop: loader enters and completes; hero renders local generated image; centered nav expands to680px, Escape closes and restores toggle focus; background scroll locks while open.
- Contact dialog: opens, native focus containment, all form fields accept demo values; Preview message produces explicit no-message-sent status. No backend/network submission exists.
- Responsive check through a390px iframe caught long headline clipping. Mobile headline was reduced to9vw to fit the longer placeholder line. Navbar controls fit at390px. This is browser responsive QA, not a physical phone certification.
- Dependency audit found0 vulnerabilities. Vite production build passes. Fresh-browser console must be rechecked after final corrections; historical console entries can remain from pre-fix reloads.

## Known limitations / exact next steps
1. This milestone is ONE PAGE, not five routes. Some nav destinations are placeholder anchors near the footer. Do not claim substantive People/Projects/Journal pages exist. Only build them if requested.
2. Hero uses a generated photograph with slow CSS motion, NOT video. `Hero` accepts optional `videoSrc`; use only user-supplied/licensed footage. Preserve the original generated photo as poster/fallback.
3. Replace lorem ipsum/CMC demo branding only at user direction. Haffer and CMC logo rights remain unverified for public launch; no legal-safety guarantee was given.
4. Header ink switches from cream to dark when scrolling onto the cream section using CSS variables set by App's rAF-throttled scroll handler. Check this if changing hero height.
5. If changing loader exit duration, adjust overlapping hero/header transition durations and rerun `npm test`, then visually reload once. Preserve reduced motion and cancellation behavior.
6. Vite config explicitly sets `esbuild.jsx='automatic'`; removing it without adding the React plugin causes `React is not defined` in JSX files. Do not regress this.
7. Native dialog uses a750px desktop drawer with sliding entrance/exit. Demo field values are not persisted and no API is configured. Do not add external transmission without an explicit task.

## Files and content editing
- Typography/spacing/palette/mediaqueries: `src/styles.css` (currently compact CSS; organize carefully rather than wholesale replacing).
- CMC-only loader appearance: `src/loader.css`; motion controller: `src/lib/cmc-preloader.js`; wrapper markup: `src/components/Preloader.jsx`.
- Menu labels/card content: `src/components/Header.jsx`; live GMT timezone is intentionally UTC, displayed GMT.
- Headline/hero copy: `src/components/Hero.jsx`; the two headline spans are intentional. Check longest line at320/390px after changing text.
- Contact text/fields: `src/components/ContactDrawer.jsx`; current title aria-labelledby and native dialog must remain.
- Hero image: `public/media/hero.jpg`,348KB, originally generated specifically for this app, no remote runtime dependency.
- Asset licensing/provenance: `NOTICE.md`. Preserve that file, and add provenance for replacements.

## Safe continuation rules for smaller models
Read this file, package.json, relevant components and git status first. Do not replace the app wholesale. Fix one visible mismatch at a time and preserve working interactions. Use the original website only for visual observation, never importing bundles. Keep source and donor projects unchanged. Keep all new work in this directory. Finish by updating this file with exact remaining work and test results. Never promise zero legal risk.

## Scrollbar layout fix
Root html uses scrollbar-gutter:stable so menu/contact scroll locking does not widen the page or move the centered navigation. Keep this rule when editing overlay behavior. No new test suite is needed for this CSS correction.

## Latest approved scope change — process hero
User CANCELLED team carousel and image contact-section work. Do not build those. User also prohibited further image generation: reuse public/media/hero.jpg for ALL images. Hero.jsx is now an independent six-step process hero matching the annotated Approach layout: cream background, heading, large left image, small inset image/counter, bordered right title/copy, Read more. Desktop uses CSS sticky over460svh with scroll-driven step changes every60vh; arrows scroll between steps. Mobile is natural-height and arrows change steps without scroll pinning. ProcessHero.css owns this layout. All step copy is lorem ipsum. Header is dark on cream; App no longer uses old full-bleed hero scroll-color logic. Loader readiness now targets .process-main-image img. Retain existing CMC loader, logo, navbar and contact drawer. Old hero CSS remains unused; do not accidentally restore it. Existing lower placeholder intro/footer remain; no new team/CTA sections were implemented.

Process hero verification: production build passes. One browser check confirmed desktop layout, same local image in both image slots, and Next moves01/06 Discover to02/06 Define while the stage stays pinned. No additional test suites were run. Collapsed copy has no inner scrollbar; expanded long details may scroll within the right column on desktop. User requests minimal tests/token use; do not run unrelated checks.

## Latest correction — restore original hero, process follows it
User clarified the process layout is a SECTION AFTER the original full-bleed hero. Original Hero.jsx restored from a6ee37a. Process now lives in ProcessSection.jsx, rendered immediately after Hero, before the existing intro/footer. Process root id=process; title is h2. Its sticky scroll math uses its own offset, not the page origin. Header uses light controls over hero and dark controls when process reaches the header. Loader readiness again targets .hero-media img. Keep synchronized loader state and CMC logo. This supersedes the previous process-as-hero instruction.

## Public preview tunnel
User authorized switching the existing ngrok endpoint from port5174 to this app on5178. Public URL: https://sue-unprocessed-morton.ngrok-free.dev . Existing ngrok agent API4040 manages tunnel named thirdrecreate, target http://127.0.0.1:5178. Vite allowedHosts contains only that exact hostname. Public HTML and hero asset verified HTTP200. Keep Vite and ngrok running for link availability; do not switch it to another project without user direction.

## Kinetic split-letter loader checkpoint
Replaced the photo strip preloader with the Osmo Willem-style kinetic split-letter loader (`Preloader.jsx`, `cmc-preloader.js`, `loader.css`). Displays "CM" on left and "C" on right with an expanding central photo box cycling through shutter frames and landing on the page hero image (`/media/hero.jpg`). Optical lockup centering smoothly glides into true viewport center during the 100vw × 100svh zoom with matching crop (`48% 50%`), scale (`1.025`), and `.willem__shade` gradient overlay, eliminating flashes and jumps during handoff to the page hero. Letters fade gracefully over 1.5s. All 3 unit tests pass and Vite production build passes cleanly.


## Our Home sections — approved and appended
User approved appending new Our Home-inspired content BELOW ALL existing sections, before the existing footer, stopping before the reference contact prefooter. Existing Hero.jsx, ProcessSection.jsx, custom Preloader/loader CSS/controller and local usehero.mp4 were not edited. User current Accra clock was preserved. User supplied new AGENTS.md requires intent approval; approval for this scope was received in chat.
Files: OurHomeSections.jsx and OurHomeSections.css. Order: large two-line heading; 100svh image intro with right-side word reveal; two-column editorial text; 16:9 large image; second editorial text; six-image horizontal gallery; right-aligned quote and animated placeholder figures. All eight new image slots reuse /media/hero.jpg per user instruction. No generated images or reference media were introduced. Lorem ipsum, author and numerical figures are explicitly placeholders.
Motion: rAF-throttled scroll progress drives word opacity and restrained image parallax. Native horizontal scroll-snap supports touch; mouse drag uses pointer capture; click left25% goes back, remainder advances; custom Back/Next cursor and accessible arrow controls. Stats count once on intersection over1100ms; reduced motion skips interpolation. App header uses new data-home-scheme regions so controls switch ink over image vs cream. Header nav Our Home points to #our-space.
Reference observed: desktop heading about90px at1548px width, first content block about1458px high, editorial blocks about342px high, large image16:9 with16px inset, gallery slides82vw/aspect1.55, quote/stat column right50%. Styling/motion are independent implementations, NOT verified pixel-perfect parity. Own Haffer font and repeated placeholder imagery intentionally differ. Source interaction click was obscured by browser comment mode; gallery timing is a close approximation, not extracted reference physics.
Checks: one production build passed; brief browser check showed zero console errors, eight local image slots with zero broken images, gallery advancing01 to02, and active reveal opacity reaching1. No broader suites were run. GSAP is present from the user custom loader changes; it is a general library, not a copied Thirdway runtime. No Thirdway/_next/DatoCMS/Mux/Vimeo references in either new source file. Preserve AGENTS.md untracked user file; do not delete or overwrite it.
