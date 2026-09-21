# Cursor — Style Reference
> Warm parchment atelier lit by embers

**Theme:** light

Cursor uses a warm parchment editorial language: cream canvas, ink-black text, and a single ember-orange accent that activates links and emphasis rather than filling buttons. Headlines whisper at weight 400 in CursorGothic with progressively tighter tracking as size grows — authority comes from restraint and letter-tightening, never from bold weight. Surfaces stay flat and paper-like with hairline borders and soft warm-gray shadows; corners stay sharp at 4px throughout. EB Garamond appears selectively for editorial subheadings and prose, and berkeleyMono handles code, labels, and metadata, giving the system a typographic personality that feels closer to a literary journal than a SaaS dashboard.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Parchment | `#f7f7f4` | `--color-parchment` | Page background, primary canvas — warm cream that softens contrast and makes ink feel printed rather than digital |
| Bone | `#f2f1ed` | `--color-bone` | Card surfaces and elevated containers — one step darker than canvas, creates paper-on-paper layering without borders |
| Linen | `#e6e5e0` | `--color-linen` | Light neutral action fill for buttons on dark surfaces. |
| Stone | `#cdcdc9` | `--color-stone` | Hairline borders, dividers, subtle separators — warm-tinted 1px rules |
| Mist | `#a1a19f` | `--color-mist` | Tertiary helper text, captions — between muted and secondary |
| Driftwood | `#84847e` | `--color-driftwood` | Secondary body text, table content — quieter than primary ink |
| Ash | `#7a7974` | `--color-ash` | Icon fills, tertiary body text, subdued UI labels — the workhorse muted tone |
| Ink | `#26251e` | `--color-ink` | Primary text, primary action button background, nav text — warm-tinted near-black, never pure #000 |
| Ember | `#f54e00` | `--color-ember` | Orange text accent for links, tags, and emphasized short phrases. Do not promote it to the primary CTA color |
| Amber | `#c08532` | `--color-amber` | Warm action button fill (Build, Continue) and accent icon strokes — earthy companion to ember, used in product UI chrome |
| Forest | `#34785c` | `--color-forest` | Green action color for filled buttons, selected navigation states, and focused conversion moments. Use as a supporting accent, not as a status color |
| Verdant | `#1f8a65` | `--color-verdant` | Green text accent for links, tags, and emphasized short phrases. Use as a supporting accent, not as a status color |
| Crimson | `#cf2d56` | `--color-crimson` | Red text accent for links, tags, and emphasized short phrases. Use as a supporting accent, not as a status color |

## Tokens — Typography

### CursorGothic — Primary typeface for UI, headings, navigation, body, and product surfaces. Weight 400 headlines with progressively tighter letter-spacing (-0.005em at 22px → -0.03em at 72px) is the signature — headlines never bold. Font features ss08, ss09, tnum activate stylistic alternates and tabular numerals. · `--font-cursorgothic`
- **Substitute:** Inter, system-ui, Helvetica Neue
- **Weights:** 400, 500
- **Sizes:** 11px, 13px, 14px, 16px, 22px, 26px, 36px, 72px
- **Line height:** 1.00–1.50
- **Letter spacing:** 0.01em at 14px → -0.005em at 22px → -0.012em at 26px → -0.02em at 36px → -0.03em at 72px
- **OpenType features:** `"ss08", "ss09", "tnum"`
- **Role:** Primary typeface for UI, headings, navigation, body, and product surfaces. Weight 400 headlines with progressively tighter letter-spacing (-0.005em at 22px → -0.03em at 72px) is the signature — headlines never bold. Font features ss08, ss09, tnum activate stylistic alternates and tabular numerals.

### EB Garamond — Editorial serif for select subheadings, prose body, and table data — adds literary texture against the CursorGothic UI shell · `--font-eb-garamond`
- **Substitute:** Iowan Old Style, Palatino Linotype, ui-serif, Georgia
- **Weights:** 400, 500
- **Sizes:** 16px, 17px, 19px
- **Line height:** 1.35–1.50
- **Letter spacing:** normal
- **OpenType features:** `"cswh"`
- **Role:** Editorial serif for select subheadings, prose body, and table data — adds literary texture against the CursorGothic UI shell

### berkeleyMono — Monospace for code blocks, CLI snippets, metadata tags, file paths, and developer-facing labels — the technical voice · `--font-berkeleymono`
- **Substitute:** ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas
- **Weights:** 400, 500
- **Sizes:** 12px, 13px
- **Line height:** 1.43–1.67
- **Role:** Monospace for code blocks, CLI snippets, metadata tags, file paths, and developer-facing labels — the technical voice

### system-ui — Secondary system text for small meta labels and supplementary UI where a custom font is overkill · `--font-system-ui`
- **Substitute:** system-ui, -apple-system, Helvetica Neue
- **Weights:** 400, 500, 600, 700
- **Sizes:** 11px, 12px, 13px
- **Line height:** 1.25–1.55
- **Letter spacing:** 0.004em
- **OpenType features:** `"case"`
- **Role:** Secondary system text for small meta labels and supplementary UI where a custom font is overkill

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| eyebrow | 12px | 1.63 | — | `--text-eyebrow` |
| body-sm | 14px | 1.5 | 0.14px | `--text-body-sm` |
| heading-sm | 22px | 1.3 | -0.11px | `--text-heading-sm` |
| heading | 26px | 1.25 | -0.312px | `--text-heading` |
| heading-lg | 36px | 1.2 | -0.72px | `--text-heading-lg` |
| display | 72px | 1.1 | -2.16px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px
**Density:** compact

### Spacing Scale
4, 8, 12, 16, 20, 24, 32, 48, 56, 64 (px)

### Border Radius
cards 4px · tiles 4px · inputs 4px · modals 8px · buttons 4px

### Shadows
- xl: `rgba(0,0,0,0.14) 0 28px 70px 0, rgba(0,0,0,0.1) 0 14px 32px 0, oklab(0.263 -0.002 0.012 / 0.1) 0 0 0 1px`
- subtle: `rgb(235,234,229) 0 0 0 2px`
- xl-2: `rgba(0,0,0,0.25) 0 25px 50px -12px, rgba(0,0,0,0.15) 0 12px 24px -8px, oklab(0.263 -0.002 0.012 / 0.1) 0 0 0 0.5px`
- subtle-2: `oklab(0.263 -0.002 0.012 / 0.1) 0 0 0 1px, rgba(0,0,0,0.28) 0 18px 36px -18px`

### Layout
Page max-width 1300px · Section gap 64-96px · Card padding 24px · Element gap 8px

## Components (selected)
- Primary Filled Button: bg Ink `#26251e`, text Parchment `#f7f7f4`, 4px radius, padding 0.78em 1.35em 0.8em, CursorGothic 14px/400.
- Secondary Filled Button: bg Linen `#e6e5e0`, text Ink, 4px radius, same padding, arrow glyph.
- Ghost Text Button: transparent bg, Ink @60% opacity text, underline on hover.
- Amber Action Button: bg Amber `#c08532`, cream text, 4px radius, compact padding — for in-product accents.
- Forest Action Button: bg Forest `#34785c`, Parchment text, 1px border same green — success/confirm actions.
- Default Product Card: bg Bone `#f2f1ed`, 4px radius, 1px border color-mix(Ink 5%, transparent), soft double shadow, 24px padding.
- Logo Trust Tile: bg Linen, pill shape, logo at Ink 60% opacity, 16px padding.
- Navigation Bar: transparent bg, 52px height, 24px h-padding, logo+wordmark left, links center, CTA cluster right.
- Terminal Input Field: bg transparent/Bone, 1px border Ink@10%, 4px radius, berkeleyMono 12px text.
- Footer Link Column: heading CursorGothic 14px/500 Ink, links 13px/400 Driftwood, 8px gap, no card.
- Mono Metadata Tag: berkeleyMono 12px Ash, inline, no border/radius.
- Selection Highlight: `#8BC4F8` — reserved exclusively for text selection.

## Do's and Don'ts

### Do
- Use 4px border-radius on every button, card, input, and tile.
- Set all headlines at weight 400 in CursorGothic; never 600+ for display sizes.
- Apply progressively tighter letter-spacing as type grows.
- Use Parchment `#f7f7f4` as canvas and Bone `#f2f1ed` as card surface; layer with 1px hairline borders before reaching for shadows.
- Use Ember `#f54e00` only on inline text links and emphasis — never as a button background or large surface.
- Reach for EB Garamond on editorial subheadings and prose; keep it off UI labels/nav.
- Use berkeleyMono for code, file paths, CLI, developer metadata.
- Pair one dark filled button with one light secondary in the same action group — never two filled buttons of equal weight.

### Don't
- No pure white or pure black — warm cream / warm ink only.
- No weight 600/700 on headings.
- No pill radius (≥999px) on buttons/cards — 4px is the workhorse.
- No gradients, glows, or color washes — flat + editorial, depth via hairline borders and warm shadows only.
- No cool/blue-tinted shadows — always warm rgba(0,0,0,0.14) over cream.
- No Ember on backgrounds/large fills — text-only punctuation.
- No system-ui font for headings/prominent text.
- No more than two button styles in one action group.

## Imagery
Product screenshots dominate on the real Cursor site — macOS window mockups inside Bone card frames with soft warm elevation. A muted landscape photograph (mountains/desert horizon) bleeds behind the hero section, adding warmth without competing with the UI. Customer logos appear as monochrome wordmarks inside pill-shaped Linen tiles. No people photography, no abstract decorative graphics beyond product UI and brand wordmarks. Icons are thin-stroke monoline glyphs in Ash `#7a7974`, never chromatic.

## Layout
Max-width 1300px centered, 24px outer padding. Top nav 52px transparent. Hero left-aligned headline + dual CTA, product/cover mockup below. Trust strip: single row of logo tiles. Feature sections alternate two-column 50/50. 64–96px vertical rhythm between sections. Footer: multi-column link grid, brand mark left. Sections separated by breathing room, not dividers.

## Quick Reference — CSS Custom Properties

```css
:root {
  --color-parchment: #f7f7f4;
  --color-bone: #f2f1ed;
  --color-linen: #e6e5e0;
  --color-stone: #cdcdc9;
  --color-mist: #a1a19f;
  --color-driftwood: #84847e;
  --color-ash: #7a7974;
  --color-ink: #26251e;
  --color-ember: #f54e00;
  --color-amber: #c08532;
  --color-forest: #34785c;
  --color-verdant: #1f8a65;
  --color-crimson: #cf2d56;

  --font-cursorgothic: 'CursorGothic', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-eb-garamond: 'EB Garamond', ui-serif, Georgia, serif;
  --font-berkeleymono: 'berkeleyMono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-system-ui: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --radius-cards: 4px;
  --radius-modals: 8px;

  --shadow-xl: rgba(0,0,0,0.14) 0px 28px 70px 0px, rgba(0,0,0,0.1) 0px 14px 32px 0px, oklab(0.263084 -0.00230259 0.0124794 / 0.1) 0px 0px 0px 1px;
  --shadow-subtle: rgb(235,234,229) 0px 0px 0px 2px;

  --page-max-width: 1300px;
}
```

## Similar Brands
Linear, Vercel, Stripe, Arc Browser, Notion — shared traits: monochrome cream-on-ink palette, 4px sharp corners, weight-400 whisper-headlines, warm-gray shadows, one chromatic accent used sparingly.
