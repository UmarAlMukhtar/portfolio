# Umar Al Mukhtar — Portfolio

A React portfolio with a multilingual intro, cursor agents that build sections as visitors scroll, warm monochrome themes, and lightweight GSAP/Lenis motion. Touch screens use six agents; desktop uses twelve. Reduced-motion visitors receive complete static content and native scrolling. The contact link opens the visitor's email app; there is no contact backend or runtime secret to configure.

## Develop and check

Use Node.js 22.13 or newer within the 22.x release line and npm 10 (validated with Node 22.23.1 / npm 10.9.8).

```sh
npm ci
npm run dev
```

Before a release:

```sh
npm run check
```

This runs lint with zero warnings allowed, builds `dist/`, checks metadata/assets/payload budgets and lint-toolchain compatibility with Node's test runner, and audits all dependencies, including development tooling. `npm test` alone expects an existing production build.

## Preview on a phone

```sh
npm run preview -- --host 0.0.0.0
```

Open the printed network address on a phone connected to the same trusted Wi-Fi. The computer must stay awake and its firewall must permit the preview port. This is a local preview, not public hosting.

## Deploy

The existing Vercel Git integration deploys `main`. `vercel.json` explicitly uses `npm ci` and the npm lockfile, then runs strict lint, the production build and artifact tests. `package.json` selects Node.js 22. The npm lockfile is authoritative; use npm for dependency changes.

Publish the contents of `dist/` at the root of a static HTTPS host. Build command: `npm run build`; output directory: `dist`. Hash anchors (`#home`, `#work`, etc.) need no server-side routes. Do not use the Vite development or preview server as the production web server. See the [Vite deployment guide](https://vite.dev/guide/static-deploy.html).

The canonical URL, Open Graph URLs, structured data, `public/robots.txt`, and `public/sitemap.xml` use `https://umaralmukhtar.dev/`. Keep these aligned if the public domain changes. No environment variables are required for the active portfolio.

Configure the host to revalidate HTML and cache hashed `/assets/` files for a year with `immutable`. Use normal revalidation for stable asset names such as `resume.pdf` and project images. Enable the host's HTTPS redirect and compression, then check the deployed origin for missing assets and confirm its share preview. These host settings cannot be verified against a local preview.

## Content and motion

- `src/sections/Portfolio.jsx`: hero, skills, selected projects, experience layout, contact.
- `src/constants/index.js`: experience, leadership, social links.
- `src/components/runSwarmBuild.js`: agent scheduling, typing, finishing adjustments, pointer/touch motion.
- `src/components/typedText.js`: preserves and restores React-owned text nodes.
- `src/index.css`: theme, layout, responsive and reduced-motion styles.
- `public/resume.pdf`: downloadable resume; `public/images/`: project screenshots.

Legacy 3D components/assets remain in the repository. The active app does not import them; the production build does not include their JavaScript.

The [production readiness report](docs/production-readiness.md) records the final checks, fixes, and remaining limitations.

## Development dependency security

ESLint 10 and its compatible React plugins use the patched minimatch through an ESLint-scoped npm override. Remove the override once ESLint and its configuration packages require minimatch 11.0.1 or newer directly. The lint-toolchain test verifies that JavaScript, JSX hooks, refresh exports, and output ignores still work with this override. Existing hooks rule severities are preserved explicitly rather than enabling the new plugin's additional compiler rules.

## Cursor synchronization check

`tests/browser/swarm-sync.js` exports `checkSwarmSync(duration)` for a real-browser run during loading and scroll-triggered builds. It checks actual rendered tool tips against frame corners and line endpoints, and fails above 1.5px or when no active drawing was sampled. Capture while the intro ends, then scroll or navigate to Work to cover the pen and duplicate tools. It is a browser probe, separate from the Node tests run by `npm test`.
