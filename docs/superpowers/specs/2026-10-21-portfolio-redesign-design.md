# Portfolio redesign — Majd-inspired revision

## Goal

Present Umar’s backend-focused work in a distinctive editorial portfolio based on the composition and pacing of [Majd’s portfolio](https://majd-portfolio.framer.website/), using Umar’s existing content and project screenshots.

## Approved direction

- Large, all-caps “Backend Engineer” hero title.
- Slim, full-width text navigation with the name on the left, section links and theme control on the right, and a simple mobile menu.
- Open warm-white canvas, black typography, small monospaced labels, generous whitespace.
- Keep the hero text-led and let the introduction use the full row; reserve project screenshots for the work section.
- Follow with a concise about section, grouped toolkit, image-led selected projects, sparse experience and leadership rows, and an oversized contact section.
- Retain light and dark palettes, with light as the initial theme.
- Use Lenis for a gentle inertial glide and smooth anchor navigation; it remains on native document scrolling and respects reduced motion.
- Add a short, skippable greeting loader that cycles through four languages, plus a thin scroll progress line and restrained scroll-linked section, row, and image reveals.
- Keep motion dependency-light; do not add 3D, cursor effects, video, or large animation frameworks.
- Reuse existing project, work, leadership, and social content. Do not invent testimonials, services, posts, or a contact form.

## Visual DNA

Borrow from the reference: oversized type, large project imagery in the work section, calm spacing, and a clear long-page sequence. Keep navigation direct and editorial rather than floating. Keep the site grounded in the owner’s own screenshots and records. Do not copy the reference owner’s portrait or business content.

## Implementation surface

- `src/sections/Portfolio.jsx`: arrange existing portfolio content in the approved editorial flow; keep the hero text-led and use supplied screenshots in the work section.
- `src/components/NavBar.jsx`: provide a full-width editorial header, direct section links, a compact mobile menu, and a theme control.
- `src/index.css`: replace the previous warm/rust system with the reference-derived monochrome layout, responsive type, reduced-motion support, and subtle view reveals.
- `DESIGN.md`: keep the root design contract in sync.
- Leave the project data, Footer content, and HTML metadata intact unless review finds a concrete integration issue.

## Acceptance

- First viewport has the oversized backend role title and a text-led introduction; project images live in selected work.
- Main page flow and whitespace resemble the reference without importing its identity or content.
- Work descriptions, links, and images remain accurate; future-dated chair entry stays hidden.
- Menu and theme control work with keyboard and on narrow widths, including short viewports.
- Page remains responsive and reduced-motion users do not get scroll animation.
- No heavy animation stack, 3D/model load, fake portrait, testimonial, or unsupported content.
