# Majd-inspired portfolio revision — implementation plan

## Goal

Rework the approved portfolio POC to use Majd’s composition and pacing while keeping Umar’s data, screenshots, links, light/dark choice, and lightweight implementation.

## Scope

- Rebuild the active page composition in `src/sections/Portfolio.jsx`.
- Replace the conventional sticky header with a full-width editorial header and compact mobile menu in `src/components/NavBar.jsx`.
- Replace the generic warm/rust stylesheet with the approved monochrome editorial system in `src/index.css`.
- Add short multilingual loader, inertial scrolling, and scroll-linked reveals without bringing in a large animation framework.
- Update `DESIGN.md` and the design proposal to describe the approved reference-based direction.
- Preserve `App.jsx`, Footer data, project links, and metadata unless an integration issue requires a small change.
- Do not add dependencies, services, testimonials, blog content, forms, portraits, metrics, or new project claims.

## Implementation record

- [x] Inspected Majd’s page and the local portfolio screenshots.
- [x] Reworked the hero around oversized “Backend Engineer” typography and a text-led introduction; project screenshots stay in selected work.
- [x] Added direct header links, a compact mobile menu, and a visible theme toggle.
- [x] Reordered content into about, toolkit, projects, experience/community, and oversized contact.
- [x] Reused existing content and omitted the future-dated leadership entry.
- [x] Replaced the prior design system with monochrome light/dark tokens, wide editorial spacing, and subtle scroll reveals.
- [x] Updated the design contract and this plan.
- [x] Added Lenis anchor/wheel smoothing, a skippable greeting loader, scroll progress, and section/row/image reveals.
- [x] Production build passes; browser preview confirmed the greeting loader and skip, inertial anchor scrolling, scroll progress, and scroll reveals. Reduced-motion behavior and short-view menu constraints are handled in code; the existing responsive layout and theme control remain in place.

## Constraints

Keep native document scrolling, visible focus, keyboard access, small responsive CSS, and no external font or large animation package. Do not delete or relocate legacy components and assets.
