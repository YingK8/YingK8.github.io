# Visual Language

The design language for this portfolio. Minimal, text-first, "ASCII" in spirit:
the page should read like a well-set monospace document where structure comes from
**organization and spacing of text and images**, not decoration.

## Principle

- **Black on white.** Text is `#000000` on a `#ffffff` background. No accent colors,
  no gradients, no tinted panels.
- **Monospace everywhere.** IBM Plex Mono → JetBrains Mono → Fira Code → system mono.
- **Design through layout, not ornament.** Hierarchy is created by spacing, alignment,
  uppercase labels, and grouping — never by color, shadow, or rounded shapes.
- **Calm motion only.** Subtle entrance fades/slides are allowed; nothing looping,
  bouncing, or attention-grabbing.

## Color

| Role | Value |
| --- | --- |
| Background | `#ffffff` |
| Primary text | `#000000` |
| Secondary text (captions, descriptions, status) | Tailwind `text-gray-700` |
| Borders / frames | `1px solid #000000` (hairline black) |

No other colors. Avoid `bg-gray-*` fills and opacity-based "muting" of resting text.

## Typography

- Site/page title: `text-lg`–`text-xl`, uppercase, `tracking-wide`.
- Section titles (`h2`): `text-xs`–`text-sm`, uppercase. Active section is `font-bold`
  and gains a `> ` command-prompt prefix; inactive is `font-normal`.
- Body text: `text-xs`, `leading-relaxed`, `space-y-1` between lines.
- Secondary text: `text-xs`, `text-gray-700`.
- Reserve `uppercase tracking-wide` for titles and labels — not running body text.

## Layout

- Content is organized into **rows** of 1–4 **sections** on a responsive grid
  (`md:grid-cols-2`, etc.); generous gaps (`gap-6`/`gap-8`, `space-y-8`/`space-y-10`).
- Centered column, `max-w-7xl`, horizontal padding `px-6`/`px-8`.
- Sticky header with a hairline bottom border (`.pd-header`); plain centered footer.

## Media

- **Frame every image, video, and 3D viewer** with a hairline black border
  (`border border-black`). This reads like a technical drawing / contact sheet.
- **Sharp corners only** — no `rounded-*` on media, panels, or code.
- 3D models use `<model-viewer>` on a white background, framed the same way.
- Galleries are simple responsive grids of framed figures.

## Captions

- Caption style: `text-xs text-gray-700`.
- Number figures sequentially in reading order with a monospace label:
  `fig.NN — short description` (e.g. `fig.01 — full system demonstration`).
  Figure numbers reinforce the document-like, technical feel.

## Reusable building blocks

- `.pd-shell` / `.pd-content` — page wrapper + stacking context.
- `.pd-header` — white sticky header with `1px solid #000` bottom border.
- `.pd-link` — dashed-underline link, underline on hover.
- `.pd-panel` — `1px` black-bordered, transparent panel (the model for framed media/data).
- `.pd-tag` / `.pd-ascii-title` / `.pd-status` — uppercase tags, heavy titles, small status text.

## Don'ts

- No rounded corners, drop shadows, or gray background fills.
- No color beyond black / white / `text-gray-700`.
- No reducing the opacity of resting (non-animating) text.
- No decorative imagery that isn't load-bearing; if it doesn't inform, drop it.

## Reference implementation

`src/app/pages/tetris_bot.tsx` is the canonical example: a data-driven project page with
`text`, `image`, `video`, `gallery`, `model`, `models`, `facts`, and `grid` blocks, all
following the rules above.
