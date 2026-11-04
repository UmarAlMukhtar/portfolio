# Production readiness — 2026-11-04

This pre-deployment report records the local checks on the compiled portfolio. The release commit and deployment status are recorded separately by GitHub and Vercel.

## Fixes made during release checks

- Pinned Vercel to `npm ci`, Node.js 22, strict lint, the build, and artifact tests so the Git deployment uses the validated npm dependency tree rather than the older pnpm lockfile.
- Replaced unresolved `%VITE_SITE_URL%` metadata with the same canonical domain already used by robots/sitemap: `https://umaralmukhtar.dev/`.
- Fixed navigation after crossing the 700px breakpoint. Elements initially hidden by layout now inherit the built header's visibility when shown, without replaying completed content.
- Disabled Lenis when reduced-motion is requested, including live preference changes. Cleanup restores the page and native scrolling.
- Fixed the existing `TechIcon` hook dependency warning.
- Applied compatible dependency updates, including Vite 6.4.5 and postprocessing 6.39.6; resolved the legacy Three.js peer warning.
- Corrected the resume's Mulearn date from January 2026–Present to January–June 2026. All other resume text, both pages, and link counts were preserved; both pages were visually reviewed. This was a date correction, not a full resume rewrite.
- Added a 1200×630 PNG share card using the existing warm monochrome design, replacing the SVG social image.
- Added `npm run check` and three artifact tests using Node's built-in test runner. Metadata test was observed failing on unresolved placeholders before the fix.

## Verification

| Check | Evidence / outcome |
| --- | --- |
| Strict lint | Zero errors or warnings, including existing source files |
| Build | Vite production build, 45 modules; no unresolved environment warnings |
| Artifact tests | 3/3: metadata/structured data, assets and PDF, compressed payload budgets |
| Fresh install | `npm ci` and `npm run check` in an isolated directory whose path contains spaces |
| Production audit | `npm audit --omit=dev`: zero reported vulnerabilities |
| Desktop motion | Actual Brave, 1440×900: measured mean frame interval 16.67ms; no sampled frame over 33ms in the 5-second handoff/build window |
| Mobile motion | Brave 390×844 touch emulation: six busy agents, mean 16.67ms; no sampled frame over 33ms in the 4.5-second build window; finishing corrections observed |
| Loader handoff | Zero visible content during the loader's closing phase; first frame after loader removal had zero visible hero text and active workers |
| Responsive navigation | Desktop→390px Menu visible and functional; mobile→desktop links visible; Contact anchor builds destination |
| Touch scrolling | Emulated touch swipe moved native document scrolling and triggered the next build work |
| Keyboard | Menu closes with Escape and returns focus to Menu; keyboard activation of Skip works |
| Skip cleanup | All 111 text blocks matched their original content; no hidden rendered build pieces or remaining inert sections |
| Reduced motion | Page becomes ready; swarm hidden, text restored, no remaining task attributes/inert sections; Lenis removed |
| Layout | 320px phone and 768px tablet layouts: no horizontal overflow; 320px text/link bounds were inside viewport |
| Themes | Theme toggle still works after animated text restoration; dark cursor token is white, light token black |
| In-app browser | Compiled site renders, Work anchor builds selected work, images load, no console errors observed |
| Semantics/assets | One main and h1, valid internal anchors, visible controls named, project images load, resume PDF is present |
| No JavaScript | Static identity/description fallback renders |
| Links | Canonical site, project sites, GitHub redirect, GitHub, X and Instagram returned HTTP 200 in automated HEAD checks. LinkedIn returned 405 to HEAD; not treated as a broken profile |

Measured windows are diagnostics on this computer, not a guarantee for every device. The validated app payload is about 120.33 kB JavaScript + 4.83 kB CSS gzip; project screenshots load separately. Desktop supports twelve agents, with actual concurrency determined by available work.

## Remaining limits

- Full `npm audit` reports six moderate development-tool findings from the transitive `minimatch` advisory [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). npm reports no compatible fix. No major-version override was forced; the lint tooling is not shipped in the static browser bundle.
- iOS Safari, Android browsers on physical devices, screen-reader usage, social-card rendering, and public-host cache/security headers were not independently tested in this pass. No Lighthouse or accessibility certification is claimed.
- HTTP status checks establish reachability, not the functionality of linked project applications or ownership of social profiles. LinkedIn still needs a normal manual profile visit.
- The PNG share image is validated locally at 1200×630; platform-specific cropping/cache behavior still needs a public share-preview check.

## Release procedure

1. Run `npm ci` and `npm run check` from this repository.
2. Publish only `dist/` on a static HTTPS host at the canonical domain's root; follow the [Vite static deployment guide](https://vite.dev/guide/static-deploy.html). `vite preview` is only for local verification.
3. Configure HTML revalidation, immutable hashed-asset caching, HTTPS redirection and compression using the host's settings.
4. Verify the deployed page, project images, resume download, robots/sitemap, phone motion and share preview against the public URL. Keep the prior deployment available for rollback.
