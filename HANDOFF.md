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
`npm install`, `npm run dev` (127.0.0.1:5178), `npm run build`, `npm run preview`.

## Current status
Scaffolding in progress. Update this section as milestones complete. Do not claim verified until actual command/browser evidence is recorded.

## Safe continuation rules for smaller models
Read this file, package.json, relevant components and git status first. Do not replace the app wholesale. Fix one visible mismatch at a time and preserve working interactions. Use the original website only for visual observation, never importing bundles. Keep source and donor projects unchanged. Keep all new work in this directory. Finish by updating this file with exact remaining work and test results. Never promise zero legal risk.
