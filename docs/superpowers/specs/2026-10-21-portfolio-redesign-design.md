# Portfolio redesign — design proposal

## Goal and audience

Create a complete portfolio refresh that presents Umar's backend-focused work with enough visual character to reward browsing. The working audience is engineering teams and recruiters; the first action is exploring selected work, with contact as a secondary action. The audience framing is an assumption because the owner has not chosen a narrower audience.

The owner approved the hybrid direction, technical/minimal/warm tone, DM Sans + IBM Plex Mono, light and dark themes, no brand colors, and a lightweight implementation.

## Reference decisions

- [Jithin RP](https://jithinrp.com/): borrow oversized typography and project stories with enough context to understand the work. Skip the pixel wordmark and designer-specific framing.
- [Majd](https://majd-portfolio.framer.website/): borrow a continuous editorial page and calm scroll-led transitions. Skip constant parallax and decorative moving objects.
- [Aadarsh Rai](https://aadarshrai.vercel.app/): borrow a short greeting that changes language and an open hero composition. Keep the intro under one second, skippable, and out of the way of page content.
- [Aditya](https://ad1tya.me/): borrow a restrained grid/monospace texture and concrete systems details. Adapt those cues to a warm light/dark palette instead of copying the dark terminal aesthetic.
- [Rohit](https://rohitwork.vercel.app/): borrow persistent navigation, clear project cards, and soft section reveals. Avoid loud card colors and excess navigation.

## Design direction

Use an editorial shell in warm paper and charcoal, with ink-colored typography and a restrained rust accent. A subtle grid and small monospace labels provide technical character. Keep the hero legible and personal; pair it with a lightweight request-to-service-to-data-flow illustration made with CSS or SVG. Use the existing project material as the visual proof, rather than making the page feel like a monitoring dashboard.

The detailed visual tokens and layout rules are in the repository-root [DESIGN.md](../../../DESIGN.md).

## Page flow

1. Compact sticky navigation with Work, Experience, About, Contact, and a light/dark control.
2. Hero with a concise backend-focused statement, a brief multilingual greeting, location/availability only if already present in approved content, and a link to selected work.
3. Selected work first: FocusFlow, MatchUndo, and the client/community project group, using the existing project descriptions and links. Cards should reveal the problem, Umar's contribution, outcome, and stack only where the source content supports them.
4. Experience and leadership, grouped into a short timeline and secondary contribution list.
5. Skills grouped by backend/data, infrastructure, and product tooling; keep the existing information but reduce logo-heavy presentation.
6. About and contact, ending with email and existing social links.

Do not add testimonials: the current testimonial constants contain generic copy attributed to another person. Do not invent performance numbers or credentials. Recheck dated claims before displaying them; hide any future or unclear dates until confirmed.

## Motion and performance

- No new dependencies or externally hosted animation assets.
- No active Three.js/WebGL scene in the new page flow.
- Use native anchor scrolling and small CSS reveal transitions. Keep normal page scrolling under user control.
- The greeting cycles through `Hello`, `Hola`, `Bonjour`, and `नमस्ते` for less than one second, has a visible skip action, and is skipped for `prefers-reduced-motion`.
- The theme control changes the palette without changing layout or content.
- Keep all page content readable if JavaScript animation fails.

## Scope and non-goals

This POC redesigns the existing one-page portfolio and its presentation across desktop and mobile. It does not add a blog, project CMS, contact form, new project claims, or new animation framework. Existing images, model assets, and legacy components remain in the repository unless a later implementation review proves they are safe and necessary to remove; the new page simply does not load the heavy scene.

## Acceptance criteria

- The first screen makes the backend focus and selected-work action clear.
- Work cards use existing project material and do not show placeholder testimonials or unsupported metrics.
- Both palettes remain legible and have a visible theme control.
- Layout and navigation adapt to mobile without horizontal overflow.
- Motion remains subtle, the greeting is short and skippable, and reduced-motion users see the page immediately.
- The main page does not load a 3D/WebGL scene or require a new dependency.

## Implementation boundary

This is the design proposal only. UI implementation starts after review of this document and the root `DESIGN.md`. The planned POC is limited to the existing Vite/React portfolio; no remote repository changes are included.
