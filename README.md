# Umar Al Mukhtar — Portfolio

A React portfolio with a multilingual intro, cursor agents that build sections as visitors scroll, warm monochrome themes, and lightweight GSAP/Lenis motion. Touch screens use six agents; desktop uses twelve. Reduced-motion visitors receive complete static content and native scrolling. The contact link opens the visitor's email app; there is no contact backend or runtime secret to configure.

## Develop and check

Use Node.js 22 and npm 10 (validated with Node 22.23.1 / npm 10.9.8).

```sh
npm ci
npm run dev
```

Before a release:

```sh
npm run check
```

This runs lint with zero warnings allowed, builds `dist/`, checks metadata/assets/payload budgets with Node's test runner, and audits production dependencies. `npm test` alone expects an existing production build. Run `npm audit` separately to see development-tool advisories as well.

## Preview on a phone

```sh
npm run preview -- --host 0.0.0.0
```

Open the printed network address on a phone connected to the same trusted Wi-Fi. The computer must stay awake and its firewall must permit the preview port. This is a local preview, not public hosting.

## Deploy

The existing Vercel Git integration deploys `main`. `vercel.json` explicitly uses `npm ci` and the npm lockfile, then runs strict lint, the production build and artifact tests. `package.json` selects Node.js 22. The older pnpm lockfile is retained for history and is not used by this deployment.

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
