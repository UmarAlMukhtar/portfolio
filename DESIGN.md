# Design Spec — Umar Al Mukhtar Portfolio

## Colors

| Token | Light | Dark | Usage |
|---|---|---|---|
| `bg-primary` | `#F5F2EA` | `#171915` | Main page background |
| `bg-surface` | `#ECE8DF` | `#22251F` | Project and diagram surfaces |
| `text-primary` | `#1D1E1A` | `#F4F0E7` | Headings and primary copy |
| `text-muted` | `#575951` | `#B6B3A9` | Supporting copy and metadata |
| `line` | `#D9D4C8` | `#3A3D34` | Dividers and card outlines |
| `accent` | `#A3482A` | `#E2956F` | Links, focus states, small highlights |
| `accent-soft` | `#E9D4C7` | `#482E25` | Small accent fills and diagram nodes |

Light is the initial theme. A compact theme control switches between both palettes.

## Typography

- Display and headings: DM Sans, 500–700; hero size `clamp(3.5rem, 9vw, 8rem)`.
- Body: DM Sans, 400–500; 16px base, 1.6 line height.
- Metadata: IBM Plex Mono, 400–500; 12–14px.
- Fallbacks: system sans-serif and system monospace.
- Use weight and size contrast instead of all-caps paragraphs or decorative type effects.

## Spacing

- Base unit: 8px, with 4px for tight details.
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Desktop section spacing: 96–128px; mobile: 64–80px.

## Radius

- `sm`: 6px.
- `md`: 10px.
- `lg`: 16px.
- Keep large surfaces mostly square; reserve rounded corners for cards and controls.

## Elevation

Flat. No shadows. Use surface color and a fine border to separate cards.

## Icons

Simple 1.5px line icons with rounded joins. Use arrows and system-node marks sparingly.

## Layout

- Responsive web layout, 12 columns on desktop and 4 on mobile.
- Maximum content width: 1240px.
- Gutter: 24px desktop, 16px mobile.
- Compact sticky top navigation; mobile navigation keeps only the key links visible.
- Hero pairs a short introduction with a CSS/SVG backend-flow illustration.

## Motion

Native smooth anchor scrolling and short CSS transitions/reveals only. The multilingual intro lasts under one second, can be skipped, and is skipped when reduced motion is preferred. No scroll hijacking, long blocking loader, or 3D/WebGL.

## Banned

- Heavy 3D, WebGL, video backgrounds, cursor effects, or scroll-jacking.
- Bright neon gradients, generic dashboard layouts, or overly saturated card colors.
- A loader that delays reading the page, motion without a reduced-motion path, or unsupported project metrics.
- Placeholder testimonials or invented credentials.

This spec is locked. All subsequent UI work must conform to DESIGN.md. If a decision isn't in the spec, ask before implementing. Do not deviate.
