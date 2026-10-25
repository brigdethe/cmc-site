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

New lines approach approved on clean-baseline: replaced ONLY footer card contour SVG with FooterCardLines component/CSS.3 original routed rounded gold paths desktop/2 mobile;12s staggered draw/erase via normalized dasharray/offset; no rotation/drift/global layer. Opacity.48 trace/.09 base on dark card (.35mobile). IntersectionObserver+document visibility pauses offscreen/hidden; reduced motion static base. Card content/geometry unchanged. Build and desktop/mobile motion, no overflow, contact CTA, offscreen pause/reduced checks passed. Screenshots footer-lines-desktop/mobile.png outside repo. No commit/push.

Footer card lines extended per user: added2 distinct rounded paths,5 total desktop (4mobile; existing path3 hide retained). New stagger delays-2/-6s preserve independent timing within12s loop. No layout/style changes.

Approved About CMC lines added within left title-column wrapper only, faint on cream. Company panel path distribution corrected with5 full-width spread paths and uncropped viewBox; same offscreen/reduced lifecycle. Footer card original paths unchanged. Build passed; no global overlay.

User requested company panel lines revert to right-focused original pattern: SeminarInvitation now uses default FooterCardLines variant again. About-left lines and footer card unchanged.

About CMC decorative lines reduced to2 paths per user; other variants unchanged.

About lines visibility increased: base.07, animated.30 desktop/.24mobile. Other variants unchanged.

User removed About CMC decorative lines. Removed About FooterCardLines render and unused App import; heading wrapper/layout retained. Dark card/panel lines unchanged.

User removed lines from company prefooter panel (SeminarInvitation); removed component render/import only. Combined footer card retains its5-path animation.

Approved forum color change: oh-forum background#3D2B27, cream text, primary gold stats, light header scheme. Only About the seminar section changed; layout/counters/RSVP preserved.

User extended deep brown to next section, seminar carousel. Gallery background#3D2B27 with cream counter/controls and light header scheme. Images/interactions unchanged.

User extended brown to following CMC approach editorial: #3D2B27/cream/light header. Other content and layout unchanged.

User requested mobile copyright/company/back-to-top on single row. Footer bottom uses nowrap flex and compact responsive8.5–10px text; desktop unchanged.

Approved brown image handoff fix: seminar intro scene now has matching#3D2B27 backing; fixed media uses lower-edge mask following clip-bottom, feather ramps0->96px as scene exits. Fixed image position/reveal/text scrolling retained. Desktop1440x900/mobile390x844 screenshots reviewed; down/up samples identical at same offsets, imageTop0, computed mask valid, no page errors/overflow. Build passed after correcting initial string-escape syntax error. Screenshots brown-transition-desktop/mobile.png outside repo.

User reverted image-to-brown smoothing: removed exit feather update, media mask and intro brown backing added by that fix. Existing brown forum/gallery/company sections retained.

User requested underlying wrapper only: .our-home-sections background changed cream->#3D2B27. Overlay/clip/animation untouched.

User clarified split underlay: oh-heading explicitly signature cream, parent underlying lower area remains#3D2B27. No gradient/mask/animation changes.

Desktop navbar compacting approved: >=768px expanded shell600px (was680), nav28px/1.2 with18/20px padding, story height210px (was262), three equal-width cards, tighter heading. Ticket automatically matches600px. Mobile styles untouched. Targeted desktop/mobile checks600/354px widths and6px gap, no overflow; desktop screenshot reviewed.

Approved navbar scroll visibility: Header tracks direction with12px accumulated threshold, shows within80px top, keeps open menu visible, keyboard focus reveals/protects header. Mouse-focused controls do not permanently prevent hiding. CSS translates/fades whole header; reduced-motion no transition. Desktop/mobile browser checks down-hide/up-show/jitter/menu-open/keyboard/top passed. Build passed before focus-visible refinement; no changes to layout/menu behavior.

Menu label Approach renamed CMC Seminar. Current#approach destination retained temporarily; user plans dedicated seminar page next.

Approved seminar hero: /seminar/ route uses existing Header, contact pane, company prefooter, footer card and Footer. Cream/gold Haffer hero reuses CMCMain isolated hanging-card renderer and required assets under public/seminar-badge (provenance notices included). No new dependencies. CMC Seminar menu now links /seminar/; homepage anchors resolve across routes. Desktop1440x900/mobile390x844: badge live, no overflow/page errors, menu and contact verified. Screenshots outside repository. Production build passed. Seminar body sections remain future work.

White-section experiment (approved sections only): isolated src/white-sections.css switches About, leadership, seminar heading/hero, footer-card surround and footer backgrounds to pure white. Brown sections, navbar/ticket, controls, text colors and images unchanged. Remove stylesheet import to revert.

User reverted white-section experiment except seminar hero: src/white-sections.css now targets only .cmc-seminar-hero. Original cream sections restored; other styles untouched.

Approved seminar badge rope color: isolated renderer material strapColor changed #cb9635 to #000000. Artwork/gold lettering and physics unchanged; CMCMain donor untouched.

User clarified blue text applies to badge Seminar lettering only: name artwork accent now logo navy #1B2D56 in isolated badge renderer. Hero heading remains gold, rope remains black.

Approved gold lines across full white seminar hero: shared FooterCardLines hero variant uses five spread paths (four mobile), 12s staggered draw/retract, base .06 and trace .22/.18 mobile. Behind text and badge, pointer-events none. Footer unchanged. Desktop/mobile screenshots reviewed, badge live, no overflow, menu/contact working. Visible playing true/offscreen false; reduced motion hides traces. Production build passed.

Approved hero responsiveness correction: replaced custom layout/content with CMCMain hero ordering, exact viewport height, absolute copy/intro positions, title sizing, CTA dimensions and tablet/mobile breakpoints. Badge uses full-height original custom-element positioning. About CMC and Highlights CTAs restored (Highlights uses existing archive until local content exists). White, lines, black strap, blue badge retained. Browser bounding-box comparison desktop1440x900 matches donor for section/copy/title/date/intro/badge; tablet820x1180 matches within1px. Mobile390x844 visually reviewed. Shared navbar/footer unchanged.

Approved hero CTA refinement: removed About CMC button; Highlights now uses shared text-link/link-label/Arrow styling and retains archive destination.

Approved hero heading styling: Haffer retained, all breakpoint font sizes reduced15%, line-height .98 (from .86), letter-spacing -.055em (from -.07em), charcoal var(--ink). Three-line wording and bottom-anchored copy retained.

Approved hero line visibility: explicit CMC gold stroke, base opacity .12 and animated opacity .45 across desktop/mobile. Footer lines, paths and timing untouched.

Approved mobile viewport sizing: hero uses100vh fallback/100dvh, no height transition on mobile; hanging-card fills100% of hero. Desktop unchanged.

Approved seminar body: added SeminarSections.jsx/css with exactly3 sections (cream theme/context/venue; brown highlights with3 local photos and102/23/5 source-linked stats; cream four contributor portraits with native expandable biographies). Content/assets from CMCMain, no new event claims. Hero Highlights now #highlights. Existing hero/prefooter/footer retained. Build passed; desktop1440x900/mobile390x844 tested3sections, no overflow/broken images/page errors, profiles expand. Screenshots reviewed outside repo.

Approved homepage-consistent seminar restyle: removed bespoke photo/profile grids; intro now uses actual intro-section layout, highlights actual oh-editorial/oh-stats styles and exported shared HomeGallery six-image drag/swipe component; contributors reuse ProcessSection with optional title prop (homepage default unchanged). Hero/nav/prefooter/footer retained. Build passed; desktop/mobile gallery advances02/06, mobile profile next works, desktop stage sticky/mobile relative, no overflow/page errors. Screenshots outside repo.

Approved distinct seminar storytelling rebuild: three original components in SeminarSections (numbered expandable topics inspired by Thirdway Services; brown case-study photo essay with unequal image pair and102/23/05 stats; portrait/text contributor directory with expandable bios inspired by People). Homepage components no longer repeated on seminar page. Hero/nav/prefooter/footer unchanged. Uses local CMCMain content/assets. Build passed; desktop1440x900/mobile390x844:3sections, topic toggles/profile expansion work, no overflow/broken images/page errors. Screenshots outside repo reviewed.

Source fidelity correction requested: inspected live Thirdway Services DOM/computed classes, identified actual service-row scroll-driven overlapping layout, 3-column proportions,48px/.98/-0.06 headings,24px gaps and View all compact mode. Implemented independent SeminarTopicStage with sticky scroll stacking, View all toggle, mobile accordion and static reduced-motion fallback. Added profile hover/detail transitions. Corrected Juliette/Datsa to exact homepage ImageKit eleanor/creep URLs and30% portrait positions. Build passed; desktop row2 reacheszero transform at its scroll position, View all mode switches, mobile accordion works; no overflow/page errors. Screenshot reviewed outside repo.

User rejected approximate choreography. Read archived source Services implementation for measurement (not shipped/copied): pin starts top-top; row height and image height determine travel; photos stationary with bottom-up clip; rule/label/copy translate separately; mode compact rows .5s power2.out/.06 stagger, detail fade .45s; mobile all items stacked. Reimplemented those rules with existing GSAP/ScrollTrigger in SeminarTopicStage. 24col responsive positioning matches source classes, mobile377/564 photo ratios. Build passed; browser transition sample row transform none/copy318.5px/photo78.1% clip confirms independent mechanics, View all works, desktop/mobile no overflow/errors. Portrait URLs remain exact homepage assets.

User requested removal of all added seminar body sections. Removed SeminarSections import/render from SeminarPage. Existing hero, company prefooter, footer card and footer remain. Highlights restored to external archive to avoid dead local anchor. Components retained unused for recoverability.

Approved short page transition: PageTransition wraps existing route choice and intercepts same-origin home/seminar links.250ms logo curtain cover +250ms reveal, no image sequence/expansion. Return homepage skips first-load Preloader; direct initial home still original loader. Browser history and anchors handled; modified/new-tab/external links preserved; reduced-motion switches without animation. Desktop checked curtain/home->seminar/back and no replayed loader. Build passed.

Page transition smoothness correction: replaced vertical cover/reveal transforms with stationary250ms opacity crossfades (same approximate .5s total). Logo remains fixed, removing start/stop travel. Routing/timing/reduced-motion logic unchanged.

Approved single hero line: FooterCardLines hero variant now renders only first spread path (static faint base plus animated trace of same path). Footer variants unchanged; hero gold opacity and12s playback unchanged.

User found single hero line too faint: hero-only stroke1.5px, base opacity .2, animated opacity .85. CMC gold/timing/path and footer unchanged.

User requested another hero line: hero now uses first2 distinct spreadPaths, same gold strength and staggered animation. Footer unchanged.

Approved replacement for generic transition: ShortPageLoader reuses original loader's three-line competitions/and [round logo] markets/center composition, Haffer sizing, staggered letter rise, logo-box opening and outward type shifts. Entrance .5s/box .5s overlap; route swap750ms then250ms reveal (~1s total). No seminar photos/image sequence/fullscreen image expansion. Existing first-visit loader unchanged.

Short loader verification: home/seminar/back routes pass without full loader replay; reduced-motion route switch passes; production build passed before final cover-duration adjustment to750ms.

Approved two animated gold paths in company prefooter panel: shared FooterCardLines company-panel variant renders2spread paths, clipped/isolated behind content.12s animation/offscreen-hidden pause/reduced-motion retained; opacity .09 base/.48 trace. Footer and hero unaffected.

User requested one more line sc: company panel now3spread paths, including mobile. Hero stays2/footer unchanged.

User rejected compiled Thirdway runtime/iframe as wrong approach. Fully reverted that approach: public/project-reference moved OUTSIDE repo to chat work/rejected-project-runtime for recovery; only CMC photograph retained as public/media/cmc-project.png. ProjectPage.jsx/css rewritten as authored React/Haffer/Georgia and existing GSAP/ScrollTrigger. No Next HTML/chunks/CSS/fonts/iframe in src/public/dist. Projects route remains /projects/british-lands-hq/. CMC Header kept per explicit clarification; NO footer. CMC copy replaces British Land article. Native page includes centered masked title entrances/delayed image, original-layout editorial/photo rows/tall pairs/overlay/caption/stats, looping draggable/click-next gallery with custom cursor+keyboard/buttons, related CMC links. Header iframe scrollSurface support removed; ordinary page scroll restored. Browser-testing-with-devtools skill requested; exact DevTools MCP not available in registry; connected browser read-only source visual/computed inspection and isolated Playwright QA used. Desktop1440x900/mobile390x844 screenshots reviewed; no errors/warningsHTTPfailures/source requests, no iframe/footer, counts102/23/5, only localCMCimage, no overflow/brokenphotos. Reduced-motion: gallery wraps4steps, keyboard,contact,Projects/Seminar/history pass. Build passes. Original reference look is composition/motion reference; no copied native runtime retained.

Approved project hero gold lines: reused two-path hero variant inside isolated heading-stage only. Moved existing top padding to wrapper at identical248px desktop/148px below1280; text spacing unchanged, photo outside clipped layer. Gold1.5px, .2 base/.85 trace, shared12s stagger/pause/reduced-motion.

User requested two more spread hero lines: project-hero variant now4distinct spreadPaths across heading only, includingmobile. Seminar hero andfooter unchanged.

Approved CMCMain first2sections added immediately after Projectshero: CmcIntroSections.jsx/css copies companylabel/photo curvedtab and editorial wording/layout from CMCMain src/about/index.html. Libraryphoto localized public/media/cmc-library.jpg. Scoped stylesadapt Haffer sizing andcharcoal/currentcream colors; same1.4s imagesettle and.8s/70ms textentry onintersection, reducedmotion static. CTA mapped /#services to avoid donor #our-focus deadanchor. Existingheader retained/nofooter. Build passes; desktop1440x900/mobile390x844:2sections correctorder, photo loaded,nooverflow/errors, CTA landsrootservices. Screenshots reviewed outside repo.

Approved nextCMCMain section: CmcCitySection.jsx/css plus ownCMC section-border module imported as cmc-section-border. Exact Local insight/Wider impact copy and donor actual seminar-stage background retained. Stickycard grid3/8 desktop4/6 mobile,48px matingcurves,ResizeObserver dock-height reservation/scroll dock-state, unique SVGmask viauseId. Typography/colors adapt projectcurrent Haffer/cream/ink. Inserted after intro pair. Buildpassed; desktop/mobile pinnedtop80/72px, then dockgap0 at550/650px scroll, reversescleanly at150px, no overflow/errors. Screenshots outside repo reviewed.

User requested projecthero removal but preservation for anotherpage: extracted complete hero/photo/4goldlines/responsiveCSS/GSAP entrance into reusable CaseStudyHero.jsx/css withtitle/subtitle/image props. Not mounted inProjects. Removed oldhero render and emptyGSAP hero selectors; current intro title promotedtoh1 without stylingchange. Projectnow startsCMCIntroSections thenCMCCitySection; headerretained/nofooter.

Approved4spread gold paths overCMC intro libraryphoto: reused project-hero variant, fullphoto widthdesktop/mobile, abovephoto/shade belowcompanylabel.1.5px/.2base/.85trace, shared12s stagger/offscreen-hidden pause/reducedmotion. No layout/image changes.

User removed Projects carousel: CaseGallery no longer mounted; surrounding statistics/photo-pair/related content unchanged.

User swapped menu destinations only: CMC Seminar -> /projects/british-lands-hq/; Projects -> /seminar/. Labels/page routes/content unchanged.

Approved CTA consistency: intro Explore our approach now sharedtext-link/link-label/Arrow instead donorroundedpill. Related CMC card actions use sharedgold Arrow, underlinehover/focusring. Labels/URLs/navbar/layout preserved.

Approved currentproject typographyhierarchy: scoped tokens h1~64desktop/40mobile,h2~40/28,h3 26/22,body18/16,labels14/12. Applied toCMCintro,city,editorial,info,related; standfirst28/22 andfeature26/22. Wording/colors/actions untouched; docking ResizeObserver accommodates reflow.

User corrected hierarchy to match mainlandingpage: main heading exactlandingclamp40/5vw/80, mobile46; body20desktop/19mobile; sectionheadingsclamp32/3vw/48 mobile36; cards28/26; labels16/14; standfirstlandingclamp26/2.5vw/42 mobile26. Previous64/18/16 scale replaced.

User removed selected final2photo pair immediately aboveContinue the conversation. Earlier photo pair andrelatedcards untouched.

User removed first standalonefullwidth ProjectPhoto afterseminardetails andbeforeA sharedstartingpoint. Remainingpaired/overlay/captionphotos unchanged.

User requested companylabel singleline: kicker uses max-content width/nowrap, bounded bycurvewidth; mobilefontclamp11/3.3vw/14 tofit smallphones. Companywording unchanged.

## Landing route swap
- Root now renders the former CMC Seminar menu destination (ProjectPage). Former homepage is /seminar/; hanging-badge page remains accessible at /projects/british-lands-hq/ through Projects.
- Updated shared navigation, footer and company approach anchors for the new routes.
- Fixed queued city ResizeObserver callback during route unmount; no visual changes.
- Production build and direct route/menu navigation checks completed.

## New homepage preloader handoff
- Restored full first-load preloader on the new homepage; internal navigation retains the short loader.
- Final frame uses local cmc-library.jpg, expands independently of the typography stack to screen height, settles to the photo bounds, then reveals the cream editorial.
- Matched image crop/shade and suppressed duplicate photo zoom during handoff. Header/content wait for reveal.
- Reserved scrollbar gutter; expansion width uses actual photo bounds rather than viewport width (verified 1425px photo in 1440px desktop).
- Production build and all three existing preloader tests pass. Desktop/mobile browser checks report no errors or horizontal overflow; screenshots saved outside repo.

## Leadership moved to landing page
- Moved existing ProcessSection from /seminar/ to /, immediately after Local insight. Wider impact. Component, portraits, bios and animation code preserved.
- People menu, leadership story card and footer process link now target /#process; removed obsolete people marker from seminar page.
- Production build passes. Desktop sticky profile changes and mobile Next/Read more verified; no horizontal overflow or browser errors; seminar has no duplicate leadership section.

- Removed the selected side-by-side repeated photo pair from the landing page; adjacent content preserved.

- Added shared SeminarInvitation, animated Prefooter card and Footer to the landing page, connected to its existing contact drawer. Production build passes; desktop/mobile checks confirm one instance each, clickable CTA, no horizontal overflow or browser errors.

- Removed the selected first-edition photo and its overlaid venue caption from the landing page; surrounding editorial sections preserved.

- Removed approved landing-page sections: A shared starting point, Beyond the seminar, and First edition in numbers. Kept Institutions, rules and practice and surrounding content.

## Landing seminar scroll sequence
- Added CaseSeminarSequence.jsx/css around existing CMC Seminar info, group photograph text and Institutions editorial. Preserved exact copy and local image.
- Uses source mechanism: viewport-fixed image clipped to moving scene bounds, scroll-driven shade and per-word opacity; cream intro above, #3D2B27 editorial below. Removed cream photo text card in favor of direct overlay.
- Excluded scene from generic GSAP photo fade to protect fixed positioning. Header ink follows brown section; observers/listeners clean up on route changes; reduced motion shows all text.
- Production build passes. Desktop 1440x900 and mobile 390x844 forward/reverse checks verify clip movement, reversible text, reduced motion, no overflow/errors. Screenshots in chat outputs.

- Continue the conversation now uses CMC deep brown #3D2B27 and cream foreground; gold arrows and layout retained. Header uses light controls over the section.

- Hero heading now reads Shaping fairer, more competitive markets for Ghana. Moved existing Explore our approach link under the heading with 24px separation; destination/style retained. Desktop/mobile checks confirm placement and no overflow.

## Seminar sticky story showcase
- Added StickyStoryShowcase before company prefooter on /seminar/: two CMC images, upward image wipe behind stationary changing card, lorem ipsum content, reversible scroll state and responsive mobile image-above-card layout.
- Contact CTAs open existing drawer. Reduced-motion CSS provides static stories. Fixed attribution markup to avoid global footer styles.
- Production build passes; desktop/mobile forward/reverse checks show correct card switches and no collisions, horizontal overflow or browser errors. Contact drawer opens.

- Removed Ghanaian context. Broader perspectives. editorial from /seminar/. Gallery and sticky showcase preserved.

- Reduced seminar opening heading top padding to 80px desktop/tablet and 64px mobile. Existing fixed-image reveal and content preserved.

- Removed rounded border from hero Explore our approach CTA. Updated existing text-link selector after its move into title column; underline, gold arrow and focus indicator retained.

- Removed sticky showcase bottom padding on desktop/mobile so it meets the company image section without the cream gap.

- Swapped seminar sticky showcase and gallery: showcase now follows forum/statistics, then gallery, then company prefooter. Both components and interactions retained. Production build passes.

## Four-stage seminar highlight reel
- Replaced lorem ipsum stories with four reference-agenda stages: welcome 9–10:30, Peter Alexiadis 10:30–11:55, David Bailey KC 12–1:30, panel/closing 2–3. Source agenda read from conference2.onrender.com HTML.
- Time left/activity right; concise agenda summaries, four local seminar photographs and clearly labeled draft attendee testimonial placeholders. RSVP for the next seminar opens existing contact drawer.
- Expanded track to 400svh with per-image wipe values and four reversible active states; mobile/reduced-motion treatments retained. Production build passes; desktop all-stage/reverse checks and RSVP drawer verified.

- Fixed abrupt final highlight-stage exit: last wipe previously finished exactly at sticky release (3 viewport scroll distances). Added 65svh of pinned reading hold after final wipe, preserving all transition timing and zero bottom gap.

- Corrected actual final-stage wipe bug: image layers with z-index 3 escaped their parent and painted above the card (z-index 2). Isolated image container at z-index 0, keeping all wipes behind the card. Desktop/mobile hit tests at four final-stage positions confirm card remains uncovered; screenshot verified.

- Added compact cream heading before the seminar highlight stages: Highlights from the first seminar / A day of ideas. A shared way forward. Reuses oh-heading typography and approved 80px desktop / 64px mobile top padding.

- Highlights heading now deep brown with cream text. Added matching brown Gallery / Moments from the seminar. heading directly before image gallery, retaining existing slider interactions.

- Mobile/tablet sticky-stage surround now CMC deep brown instead of cream; individual card colors and wipe behavior unchanged.

- Added four animated gold paths behind mobile/tablet stage image and card, visible in brown surround only. Reuses FooterCardLines lifecycle/reduced-motion support. Desktop hidden; all four mobile paths retained.

- Stage card palette now green, cream, CMC gold and navy, with dark text on light cards. Shortened summaries: verified <=4 lines at 320/390px. Fictional Ghanaian names carry Sample testimonial labels.
- Mobile animated stage viewport explicitly 100dvh with 100vh fallback, preserving existing 390px card (small phones) / 365px card sizes and scrolling track. Reduced-motion static layout retained. Build passes.

- Corrected mobile height change: image/card composition retains its original 100svh footprint and fixed card height inside separate 100dvh brown stage surround. Extra viewport space no longer stretches the image/card group. Build passes.

- Added four animated gold paths directly within oh-gallery-viewport (carousel div), behind its image slides. Existing offscreen/hidden-tab pause and reduced-motion support reused; outer gallery section unchanged.

- Third-stage RSVP arrow glyph now CMC gold inside its existing black capsule.

- Swapped About CMC and CMC Seminar information blocks across / and /seminar/ via extracted AboutCmcSection and SeminarInformation components. Copy/styles preserved; both fixed-image scroll sequences remain. Build and direct route checks pass.
- Cream second-stage RSVP capsule now has a visible gold arrow glyph, matching the third-stage treatment.

- Final seminar stage now remains pinned after the reel finishes while the opaque brown Moments heading and gallery rise above it (scoped sticky end position and foreground stacking). Stage transitions, mobile card dimensions and reduced-motion static layout preserved. Desktop/mobile forward/reverse checks confirm pinned stage, moving Moments boundary and no horizontal overflow. Build passes.

- Moments heading and gallery now signature cream with charcoal text and dark header controls; existing foreground stacking and wipe-over behavior retained.

- Landing order changed to Local insight → About CMC → Leadership & Expertise → fixed-image seminar sequence. Content and interactions preserved.

## Official-site content pass (subagent research and implementation)
- Company-focused landing: purpose, Ghana context, approach, leadership/guest distinction, seminar as example. Event-focused /seminar/: factual overview, official theme, practical questions, programme and gallery.
- Replaced all invented attendee endorsements/names with factual programme notes. Short summaries retained. Stats102/23/5 sourced to CMC's own recap; no100% satisfaction claim used.
- CMC in focus cards: official https://cmc-ghana.com/ ; Citi Newsroom March30 report ; NCA March31 account of March26 courtesy call. Clearly labeled sources; no formal endorsement/partnership implied.
- Updated profile copy to supported event roles/contributions; removed unsupported historical embellishments. Corrected company name Competition (singular). Fixed About CMC navigation and first-edition anchor.
- Build and existing tests pass. Desktop1440/mobile390 checks: no placeholders, overflow or runtime errors; source URLs verified in rendered cards. Added missing root home anchor found during check.
- Submission caveat: contact form remains explicitly a demo, with no sending service; not altered by content-only scope. Next seminar date is not asserted.

- Landing fixed-scroll seminar scene now plays supplied gha.mp4 muted, looping and inline. Original image remains behind video for loading/error and reduced-motion fallback. Video source assigned on intersection; pauses offscreen/hidden tab and on reduced motion; cleanup releases media.
- Build passes. Real Chrome verified playback 640x360, muted, paused offscreen and hidden for reduced motion. Existing clipping, shade and text unchanged.

- Mobile video-reveal smoothing: preload video one viewport before entry, fade poster-to-video over450ms, batch all geometry reads before CSS writes (removed forced layout read after clip writes), and promote active clipping surface. Scroll geometry/effect unchanged.
- Build passes. Mobile Chrome emulation confirms video ready while still offscreen/paused, playing through forward/reverse clip positions, paused on exit, no runtime errors. Physical-device browser-bar behavior still requires user observation.

- Ghana-flag video overlay now focuses on serving Ghana's long-term interests and the people who depend on its markets; replaced event/date caption with CMC / Accra, Ghana. Scroll/media behavior unchanged.

- Updated middle Citi Newsroom card to supplied ImageKit SVG and right NCA card to supplied maxresdefault JPG. Left recap image, links and layout retained; all three images verified loaded.

- Updated seminar fixed-reveal background to supplied Screenshot110153. Stage four now uses former stage-three address.png; stage three uses supplied Screenshot110141. Text, colors and animation unchanged.

## Low-data performance optimization
- Approval covers responsive/optimized images, deferred assets, route splitting and Data Saver poster fallback. Added ResponsiveImage, image-delivery/data-policy helpers, local WebP variants, Latin Haffer subset and smaller silent hero MP4. Originals retained; no new runtime dependencies.
- Production mobile cold-cache first11s: landing 2,005,510→358,637 bytes; seminar4,795,424→2,137,426 bytes on normal connection. Data Saver +1Mbps:299,458 /265,755 bytes, no media requests even after scrolling. Synthetic sample, not field CWV.
- Low-data skips full first-load preloader and videos. Normal preloader/animations preserved. Both video lifecycles pause offscreen/hidden/reduced-motion. Hidden menu imagery mounts on opening; fixed-scene posters approach-load.
- Lazy routes load beneath curtain before route change. Fixed same-page popstate triggering redundant curtain. Six tests and production build pass. Desktop/mobile normal interaction checks and throttled Data Saver scans report no errors/overflow; all image candidates present.
- Detailed report and screenshots saved to chat outputs/performance-report.md. No push or commit.

## Register and Projects routes
- Approved menu now Home, Seminar, Projects, Register. Register /register/ reuses the existing badge hero with the new 2027 attendee/sponsor interest section immediately after it. No sending service or persistence; explicit preview notice and preview-only result.
- Projects retains /projects/british-lands-hq/ (also /projects/) and restores CaseStudyHero with Projects / Coming soon, then shared prefooter and footer. Landing and seminar content preserved.
- Lazy route loading and curtain interception cover both new destinations. Build and six tests pass. Chrome desktop1440/mobile390 verifies sponsor preview, both routes, no overflow or runtime errors. No commit or push.

- Seminar-only image-backed prefooter now carries a draft Managing Director closing note attributed to Paul Kofi Datsa, visibly pending approval. Existing image/lines/layout retained. Lower Keep in touch footer card and other pages unchanged. Build and desktop/mobile rendered checks pass; no horizontal overflow.

- Approved Register interest restyle: full-width, minimum100svh seminar photograph with cream form panel on right. Mobile photo above overlapping cream panel with natural form height. All fields/preview behavior preserved. Production build and desktop/mobile sponsor preview/overflow checks pass.

- Approved mobile hanging badge scroll fix: removed100dvh mobile override in favor of100svh, preserving100% card height and physics. Prevents mobile browser chrome resizing hero/canvas during scroll. Build passes; Chrome mobile scroll checks show stable844px hero/card/canvas, no errors/overflow. Actual mobile browser-bar expansion still needs device observation.

- Approved title-case loader wording: Competition and Markets Center in both initial and short route loaders. Removed forced lowercase CSS. Letter spans/layout/choreography unchanged. Build and six tests pass.

- Approved landing updates: mobile intro copy hidden; seminar-group fallback replaced with640x360 JPEG still captured from supplied Ghana flag video. Mobile scene now clips fixed media through native ancestor clip-path rather than per-scroll JS clip updates; desktop reveal and word reveal retained. Stable100svh mobile media. Build passes; desktop/mobile checks confirm correct poster, visibility, clip modes, no overflow/runtime errors. Physical mobile browser-bar behavior still needs device observation.

- User clarified director-note prefooter is sitewide. Removed old contact-copy variant entirely; shared director note now mounted on Home, Seminar, Register and Projects ahead of unchanged Keep in touch footer card. Build and all four rendered route checks pass: one note, zero old headings, one footer card each.

- Approved middle CMC in focus photo changed to supplied Screenshot110028; Citi article destination retained. Entire menu ticket is now a native /register/ anchor with accessible label, focus outline, and menu close handler. Existing focus trap includes anchor. Build passes; image decode and mobile Enter-key navigation verified.

- Approved fast gold loader paths: shared preloader variant in full and route loaders,2s cycle with proportionate stagger, behind text; lifecycle/reduced-motion rules retained. Footer navigation now exactly Home/Seminar/Projects/Register, same navbar URLs. Build and six tests pass; mobile browser confirms2s running traces and footer navigation to Register.

- User refined loader paths to exactly two, matching landing hero12s cycle and original stagger. Only preloader variant count/speed changed. Build passes.

## GitHub and Vercel publication
- User authorized push and deployment. Verified GitHub/Vercel account brigdethe. Created private brigdethe/cmc-site, pushed clean-baseline to remote main; connected repository to Vercel brigdethes-projects/cmc-site for automatic deployments.
- Production https://cmc-site-peach.vercel.app. Initial deployment READY. Public unauthenticated Chrome checks for Home, Seminar, Register and Projects return200, correct headings, no runtime errors or horizontal overflow. Six tests/build pass. Register remains preview-only and director note draft.
- vercel.json specifies Vite/dist with SPA fallback. Local .vercel and .env.local ignored; no credentials committed.

- Approved CMC metadata rewrite: company/event/register/projects-specific titles/descriptions, canonical current Vercel domain, OpenGraph and Twitter library-photo previews. Central metadata helper updates client navigation; build emits static route HTML tags for non-JS crawlers. Removed competing title setters. Build/six tests pass. Awaiting SEO audit recommendations; changes not yet pushed.
