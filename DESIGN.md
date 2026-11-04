# Design Spec — Umar Al Mukhtar Portfolio

## Direction

Use Majd’s portfolio as the structural reference for oversized uppercase role typography, generous open space, large project visuals, and an oversized contact close. Use a slim, full-width text navigation with the name on the left and section links on the right. Keep the hero text-led and reserve project screenshots for the work section. Keep the copy, imagery, and claims grounded in Umar’s repository content.

The site should feel personal and authored through hierarchy, restraint, and real project screenshots. It should not look like a generic dashboard or a generated set of cards.

## Colors

| Token | Light | Dark | Usage |
|---|---|---|---|
| `bg` | `#F4F2ED` | `#121212` | Main page |
| `surface` | `#E9E7E1` | `#1C1C1C` | Image backing and small surfaces |
| `ink` | `#101010` | `#F2F0EB` | Main type and key controls |
| `muted` | `#6A6863` | `#AAA7A0` | Secondary copy |
| `line` | `#D8D6D0` | `#353535` | Section dividers |
Use a light default and keep the theme switch visible in the header.

## Typography

- Hero: Arial/Helvetica system sans, weight 900, uppercase, tightly tracked, responsive size up to 15rem.
- Section headings: same sans family with strong size contrast and tight tracking.
- Metadata: Courier New/system monospace, small uppercase labels.
- Do not load web fonts. Use type scale and spacing to carry the identity.

## Layout

- Wide editorial canvas with a 1440px maximum width and responsive side gutters.
- Full-width fixed header aligned to the page gutters, with visible desktop links and a simple mobile menu.
- Hero uses a two-line “Backend Engineer” headline and a wide text introduction without a hero image.
- Flow: hero, short about, grouped technical toolkit, featured work, experience/community, contact, footer.
- Project screenshots remain large and directly sourced from `public/images`.
- Keep thin separators and mostly square image frames. Avoid dashboard cards and decorative diagram motifs.

## Motion

Use Lenis for an inertial page glide and smooth anchor navigation while retaining native document scrolling. Add a brief four-language intro that can be skipped, a reading-progress line, and restrained scroll-linked reveals for section headings, project imagery, and content rows. Reduced-motion users skip the intro and get immediate native scrolling. Keep the motion local to this page; avoid cursor effects, video, and 3D.

## Content boundaries

- Reuse the current FocusFlow, MatchUndo, community project, experience, leadership, and social data.
- Do not add agency services, testimonials, blog entries, contact forms, personal-photo stand-ins, new metrics, or unsupported claims.
- Keep the future-dated IEEE Sensors Council chair entry hidden pending confirmation.

## Reference

[Majd portfolio](https://majd-portfolio.framer.website/) supplies the composition and pacing reference. Its content, portrait, decorative objects, and business sections are not copied.
