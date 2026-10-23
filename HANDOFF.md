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

## Our Space opening interaction correction
Reference inspection confirmed a viewport-fixed image clipped by a moving section, not a translated image inside normal flow. The opening now uses fixed .oh-intro-media with scroll-measured clip-path top/bottom insets and visibility limited to the scene. Heading scroll reveals the stationary image; following text scrolls over it at60% scene offset, with progressive darkening. Feature image parallax remains independent. Do not restore the old112%-height translated opening image. No source bundles were used.
Visual check after correction: image top remained exactly0 at two scroll positions, while reveal clip top changed418px to151px. Screenshot confirmed title scrolling off and right-column copy scrolling over the stationary image. Production build passed; no broad tests run.

## Loader desktop gutter + first-frame logo correction
First loader shutter frame now uses /branding/cmc-round-logo.svg, object-fit:contain on cream; remaining shutters and final poster retained. Desktop landing previously mixed100vw/window.innerWidth (includes reserved gutter) with hero width excluding that gutter. Preloader overlay now width100%; GSAP landing dimensions use hero media offsetWidth/offsetHeight and transformed rect center, cached at expansion start. Preserve overscan scale on the image itself; do not measure transformed width as layout width or overscan gets applied twice. Center stack and outgoing text expansion use the same measured target. Mobile timings/sequence unchanged.

## Standalone feature image removed
User approved removal of the annotated .oh-feature-image block and its spacing. Removed JSX and unused desktop/mobile CSS. Opening fixed image, gallery, and shared hero.jpg remain. Reviewed scoped diff; no test suites run for this simple deletion.

## Process image transition correction
User approved changing only process image motion to follow the ESG reference. Replaced crop-only desktop changes with continuously scroll-driven image frames: outgoing main shrinks at top left, next preview moves/grows into main, following preview grows from bottom right. Geometry measures existing main/small slots; layout, copy, imagery, loader remain intact. Independent React/DOM implementation, no reference bundles. Production build passed. Targeted browser check confirmed intermediate frames (main271x262, incoming368x346, next104x91) instead of crop panning. Screenshot outputs/process-transition-update.png in chat output directory. Prior request to reduce Our Space heading padding still awaits its own approval; not applied.

## Mobile Our Space stability correction
Approved mobile-only fix: intro image uses an absolute section-contained background with no viewport clip-path or visibility toggling. Scene height now follows text content with min-height100svh and upper image breathing room; copy is in normal flow so next editorial cannot cover its bottom. Mobile intro words remain fully visible and shade stays constant to prevent scroll-direction flashing. Desktop fixed-image clipping remains unchanged. Earlier Our Space heading padding request remains pending approval.

## Mobile reveal restored after regression
Supersedes static-background correction above. User approved restoring scroll animation and requested actual mobile checks. Restored fixed image/clipping, progressive shade and word reveal. Kept content-driven scene sizing and normal-flow copy to avoid overlap. Mobile image uses stable100lvh; clip bottom now measures the actual image viewport bottom rather than mixing innerHeight and svh. Playwright via installed Chrome at390x844 checked enter/down/exit/up: image top stayed0, clip at the same down/up offset matched exactly, copy bottom stayed160px above section bottom, no page errors. Reviewed mobile-reveal-down.png visually. New request to enlarge mobile preloader is awaiting approval; current font clamps to19.2px at390px screen width.

## Mobile loader scale increased
User approved mobile-only sizing change. loader.css max-width767px overrides stack font-size to clamp(1.8rem,7.2vw,2.7rem). At390px text is28.8px, up from19.2px; central photo uses em units and scales proportionally. Desktop and timeline untouched. Playwright mobile capture verified28.8px and188px stack width within390px viewport; screenshot mobile-loader-larger.png saved outside repo.

## CMC prefooter card implemented
Approved plan implemented in Prefooter.jsx / Prefooter.css, inserted in App.jsx immediately before existing footer. Reusable onContact prop opens existing ContactDrawer. Wide dark teal gradient card, original inline SVG contour curves, Haffer heading, cream pill with existing Arrow, CMC caption and Accra location. No reference assets/dependencies. Desktop min580px with32px side margins; mobile min500px content-driven with20px margins. IntersectionObserver triggers opacity once; reduced-motion renders immediately. data-home-scheme light integrates existing header color switching.
Validation: production build passed. Playwright Chrome checked1440x950 and390x844, plus shorter1440x700 and390x600 to exercise header over card. No horizontal overflow or page errors; contact drawer opened/closed at both widths. Header ink becomes cream when dark section reaches header. Desktop/mobile screenshots reviewed; saved outside repo in chat outputs/prefooter-desktop.png and prefooter-mobile.png. Existing user changes and untracked AGENTS.md retained; no commit/push performed.

## Prefooter palette/button integration correction
User approved cream surround + charcoal card, subtle cream contours, existing underlined text-and-arrow CTA; also requested scrolling sync with neighbors. Removed teal gradients, large pill styling and independent timed entrance fade. Card stays in normal document flow with no pinning/transforms/opacity delays, so it follows neighboring sections directly in both scroll directions. Header scheme is dark for cream surround and light for card itself. Existing text-link and Arrow styles reused with inverse colors. Build passed. Playwright Chrome1440x900 and390x844 checked down/up scroll: identical rects on returning to same position, footer top exactly equals prefooter bottom, opacity1, no horizontal overflow/page errors; drawer open/close passed. Screenshots prefooter-matched-desktop.png and prefooter-matched-mobile.png reviewed visually outside repo. Existing user changes retained.

## Lightweight contour motion
Approved slow drift: entire SVG animates as one layer with a28s alternating CSS transform, no path morphing/dependencies. IntersectionObserver pauses offscreen; reduced-motion removes animation. Build passed. Targeted mobile browser check confirmed transform changes while visible, paused offscreen, animation-name none for reduced motion. No layout animation or change to neighboring section scrolling.

Contour speed follow-up approved:12s alternating drift, travel ±3% horizontal/±2% vertical, scale1.12 preserves edge coverage. Offscreen pause and reduced-motion unchanged.

Contour roll approved: replaced drift with continuous20s linear360-degree SVG rotation at scale1.5, clipped by card. Text/button stay still; offscreen pause and reduced-motion retained.

Sideways roll correction: user clarified translation, not rotation. SVG now contains two matching periodic wave tiles;200% width translates0 to-50% over20s with identical curve positions/tangents at wrap. No spin. Offscreen/reduced-motion unchanged.

User requested revert of sideways roll: restored previous original contour geometry and20s rotation; other prefooter styling unchanged.

User requested removing rotation: contours are now static. Removed contour animation/keyframes and unused visibility observer. Card design and contact behavior retained.

## Full footer approved and implemented
Replaced minimal footer with Footer.jsx/Footer.css, onContact prop uses existing drawer. Cream/charcoal, large cmc+round logo, full organization name, Explore links to real sections only (home/approach/process/services/our-space), Accra location, contact CTA, current-year copyright and back-to-top. Responsive three-column desktop and stacked identity/two-column navigation mobile. data-home-scheme dark keeps header legible. No fabricated social/email/address/legal links. Production build passed; Playwright1440x900 and390x844 screenshots reviewed, no overflow/page errors, every anchor target exists, contact opens/closes, back-to-top returns scrollY0. Screenshots footer-desktop.png/footer-mobile.png outside repo. No commit or push.

Footer integration approved: removed footer top divider and prefooter bottom padding; footer content begins40px after card on desktop/32px mobile. Cream background shared, card and footer read together. Copyright row divider retained.

Footer logo optical alignment approved: round emblem lowered.08em relative to the Haffer wordmark line box. Visually reviewed1440px desktop and390px mobile screenshots; emblem now centers against visible lowercase letter shapes. Targeted footer browser checks passed.

Mobile footer compact layout approved: brand and Explore now share two columns; Find us / Accra Ghana / contact CTA share one full-width horizontal row. Proportional smaller mobile wordmark/emblem; desktop untouched.390px visual screenshot reviewed, no overflow, anchor targets/contact drawer/back-to-top checks passed on mobile and desktop.

User corrected viewport-fit approach: preserve original prefooter card size. Removed compact-card override, restoring580px desktop/500px mobile minimum height, original padding and heading sizes. Compact footer spacing retained. Combined viewport fit is subordinate to preserving card size; allow natural scrolling on small screens.

Approved section order change: Hero, intro/services text, ProcessSection, OurHomeSections, combined footer. Swapped second and third sections only.

Approved content-only hero update: heading is now Shaping fairer, / more competitive markets for Ghana. Existing spans, CSS, assets and animation unchanged.

Hero line-break correction requested: Shaping fairer, / more competitive / markets for Ghana. Three spans; no styling changes.

Approved hero supporting paragraph now describes CMC bringing economics, law and policy together to deepen competition understanding and support fairer, more effective Ghanaian markets. Content-only replacement; layout/link unchanged.

Approved hero cue replacement: Ghana Competition Law & Policy Seminar links to https://seminar.cmc-ghana.com/ in a new tab with noopener noreferrer. Label and href only; existing cue styling retained. Destination verified against CMCMain src/events/index.html.

Approved intro content: Understanding competition. / Shaping better markets. Two paragraphs explain Accra-based CMC focus, audience, research/education/dialogue and Ghana context. About CMC links to existing cmc-ghana.com/about/ in new tab. Content/link changes only.

User-directed intro correction: heading About Competition & Markets Center (official singular name), right CTA Explore the seminar -> https://seminar.cmc-ghana.com/. Paragraphs/layout unchanged.

Approved Leadership & Expertise section replaces process lorem with4 CMCMain profiles: Paul Kofi Datsa (Managing Director), Juliette Twumasi-Anokye (guest speaker), Peter Alexiadis (keynote/visiting professor), David Bailey KC (session lead). Local webp portraits copied from CMCMain. Bio/details from donor About page; contributors not called executives. Layout/image morph retained; counter04 and scroll height340svh match4 profiles. Build passed; desktop/mobile checked next profile, read more and no broken portraits. Screenshots leadership-desktop/mobile.png outside repo.

User supplied replacement ImageKit portrait URLs for Datsa (creep.jpeg) and Juliette (eleanor); imageUrl overrides applied to desktop animated frames and mobile image. Other portraits/layout unchanged.

Approved full-bio display: removed Read more button and expanded state from leadership; copy and more paragraphs are always visible for all4 profiles. Existing layout/transitions retained.

Approved seminar opening: Ghana Competition Law & Policy Seminar label; Laying a sound foundation. / For a new era. heading;25March2026 context paragraph; supplied ImageKit105938 screenshot. Opening content/image only; scroll effects retained.

Approved mobile leadership refinements: portrait height48svh (was37), full second bio paragraph collapsed behind44px Read more button on mobile only; reset collapse on profile change. Desktop always shows both paragraphs and hides toggle. Touch pointer swipe on grid uses50px threshold and horizontal dominance1.5x; touch-action pan-y pinch-zoom preserves vertical scroll/zoom; no looping beyond ends. Build passed. Actual CDP touch gestures at390x844 verified left/right profiles, expanded bio/collapse reset, vertical scroll without profile change, desktop full bio/no toggle. Screenshot leadership-mobile-swipe.png reviewed.

Mobile leadership arrows moved into process-side alongside01/04 counter. Bottom controls hidden only on mobile; desktop controls/swipe unchanged.

Approved seminar editorial copy: A forum for informed debate. plus first-edition themes paragraph. RSVP for next seminar opens existing contact pane via onContact passed to OurHomeSections; no registration backend or dates invented.

Approved order swap: seminar editorial, quote/statistics block, gallery, remaining Aenean editorial. Content and gallery position preserved.

Approved merged seminar editorial and statistics: heading left; seminar description, RSVP contact-pane trigger and animated102attendees/23law firms/5speakers/1inaugural edition right. Removed separate quote/attribution placeholder section. Counter observer still targets oh-stats. Numbers from CMCMain seminar recap.

Carousel images replaced with5 user-supplied ImageKit seminar URLs in given order. Counter and next-button bound derive from galleryImages length. Existing layout, drag/swipe and motion preserved.

Added user-supplied110028 ImageKit screenshot as sixth carousel slide; count updates automatically.

User requested seminar photos for middle preloader frames. Replaced loader2/3 with ImageKit110007 and110128 respectively; first CMC logo and final hero110118 untouched. Timing/controller unchanged.

Approved NEW prefooter section SeminarInvitation before existing combined footer; existing card/footer untouched. Static full-width seminar photo with right charcoal panel desktop; stacked photo/panel mobile. Original CMC heading, explicitly labelled invented placeholder testimonial (replace before publishing), contact-pane CTA. No pin/scroll effects or copied Thirdway assets. Build passed; desktop/mobile no overflow/image decode/contact verified, screenshot seminar-invitation-desktop/mobile.png outside repo.

Approved company-content correction: image panel now Expertise across economics, law and policy. Company perspective paragraph + Talk to CMC; removed invented seminar testimonial/attribution. Image retained. Remaining lorem editorial now Ghanaian context. Broader perspectives. with CMC approach copy. No layout/motion changes.

User-supplied prefooter image replaced in SeminarInvitation with conferencenew/giammarco-boscaro-zeH-ljawHtg-unsplash.jpg ImageKit URL. Company copy, footer card, layout and interactions untouched.

Loader timing approved50% shorter: GSAP timeline timeScale2 preserves all relative transitions/callbacks and hero handoff. Asset decoding wait and watchdog unchanged.

Loader timing revised by user:20% shorter than original, timeScale1.25 (replaces2).

Approved navbar content: first4 links only (Approach Services People Projects). Explore CMC cards: seminar external URL+Accra image, leadership Datsa image->our-space seminar section per explicit user request, competition-law Supreme Court image inactive Coming soon. Existing menu/strip styling and animation preserved.

Navbar follow-up: no image in right Competition Law placeholder card; left/middle images retained.

Approved navbar ticket: independent MenuTicket CSS + sibling article below navigation panel, same shell width and12px gap. CMC cream/charcoal seminar ticket, next edition TBA, RSVP opens contact pane; no fake QR/registration. Shared shell scrolls on short screens; focus trap covers menu+ticket; hidden/inert closed. Existing menu expand width retained. Build passed. Browser desktop/mobile confirmed equal680/354px widths,12px gap, no overflow and RSVP contact opens. Screenshot menu-ticket-desktop/mobile.png outside repo. Ticket design independently implemented; donor source not copied.

User requested exact original ticket look: replaced custom CMC ticket with first original airline-ticket HTML/SVG from ticket/src/index.html. Original BNE/ATH,RS11,date,passenger,QR retained. Scoped local Tailwind-equivalent CSS avoids CDN; scales768x256 artwork uniformly to menu width. MIT notice copied to public/ticket-LICENSE.txt. Existing12px gap/placement preserved. Build and desktop/mobile width/no-overflow checks passed; screenshot reviewed. No RSVP on original static ticket.

Approved ticket edits: genuine transparent masked notches,01 Mar2025 /02 Mar2027, CMC Seminar, no plane, live days since25March2026 (UTC/Accra; refresh minute), Date25/03/2026, Location Accra Gh, Attendee You, Role Your role. Original QR and style retained. Build and desktop/mobile equal width12px gap/no overflow checks passed. PrintedMar2025 left label intentionally follows explicit user request despite2026 counter origin.

Approved navbar stories: first2 images now fill cards behind text, no framing/border/round mask, gradient overlay for contrast; right remains text-only. User sc follow-up reduces menu-ticket gap12->6px.

Latest ticket follow-up:25 replaces01,DD replaces02; artwork height256->208 with reduced inner vertical padding. Cream/charcoal Haffer retained. Navbar image overrides moved into explicit MenuCards.css import to resolve stale dev style delivery; full-card image checks required.

Completion pass verified: ticket uses Haffer, cream/charcoal (QR palette matched), no monospace/lime; updated25/DD and reduced height. Navbar full-bleed photos now confirmed in real desktop screenshot, right card text-only. Desktop/mobile widths680/354px match menu;6px gap; no overflow. Final build passed. No commit/push performed.

Navbar left card label updated per user: Explore / the seminar; removed Ghana competition prefix. Image/link/layout unchanged.

Navbar right text-only card now Second edition / Coming soon, including accessible label.

Approved CMC gold accents added via cmc-accents.css loaded after base styles: canonical#CC9632 arrow capsules/menu toggle/right story/current leadership counter/dividers/ticket badge and perforation/dark captions. Darker#946014 used for readable gold stats and small text on cream. Main surfaces/headings untouched. Middle nav card now Leadership / and expertise. Build passed; desktop/mobile menu screenshots and equal widths6px gap/no overflow checked.

User styling follow-up: text-link labels wrapped separately so only words are underlined, never Arrow pseudo-elements. Footer card contour SVG now CMC gold#CC9632 at16% opacity; static motion retained.
