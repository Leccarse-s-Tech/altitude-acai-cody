# Altitude Açaí — Cordel & Wyoming Woodcut Design System

> **Brand:** Altitude Açaí — `1302 Beck Avenue, Suite C, Cody, WY 82414`  
> **Register:** `brand` (Institutional storefront showcase — EN-US only, zero prices, zero e-commerce)  
> **Aesthetic Direction:** Brazilian Cordel / Wyoming Mountain Woodcut (*Xilogravura*) on tactile cotton-rag paper  

---

## Design Reference

Inspiration: https://www.altitudeacai.com/

Supporting technical references studied on disk:
- Light-surface hairline structure, ink-tinted elevation, and weight calibration: `design-web/references/refs-design/parley-recode/tokens-parley.md` (`§11.1–11.5`)
- Strict monospace-for-labels vs sans-for-prose division and motion duration discipline: `design-web/references/refs-design/mosa-recode/tokens-mosa.md` (`§1.1–1.2`, `§3.1`)

Design Read: brand landing page for Cody, Wyoming locals and Yellowstone travelers visiting Altitude Açaí at 1302 Beck Avenue; vibe = tactile, woodcut-artisan, mountain-grounded, approachable; assets = official Altitude Açaí crest, Cody shop bowl photography, bespoke Cordel xilogravura SVGs, and ingredient-exact bowl WebPs; constraints = EN-US interface only, zero prices or checkout flows, exclusively 7 indigo-periwinkle palette colors, zero flat untextured surfaces.

- `DESIGN_VARIANCE`: **7** — asymmetric editorial framing, woodblock illustration splits, and layered bowl anatomy instead of cloned SaaS cards.
- `VISUAL_DENSITY`: **5** — balanced editorial cadence across cotton-paper light grounds and deep indigo woodblock bands.
- `MOTION_INTENSITY`: **4** — grounded tactile block press transitions (`200ms–300ms`, `cubic-bezier(0.16, 1, 0.3, 1)`), subtle reveal entrances, and full `prefers-reduced-motion` support.

Je reproduis: indigo-tinted structural hairlines and ink-anchored block shadows replacing neutral grey borders [corpus: parley-recode/tokens-parley.md §11.1-11.2], monospace label hierarchy paired with stepped-weight grotesk display and sans body prose [corpus: mosa-recode/tokens-mosa.md §3.1], and Cody mountain-berry storefront vocabulary with zero-price menu framing [sector: https://www.altitudeacai.com/ — register]

---

### Colors

Committed indigo-periwinkle Cordel woodblock palette (7 exclusive tokens; every token carries chroma > 0 along hue `269°–299°`, eliminating pure neutral gray or pure black/white):

```css
/* Primary OKLCH Brand Tokens (chroma > 0 across all 7 tokens) */
--color-jet-black:       oklch(32.57% 0.0203 269.50); /* #30343F — primary body ink on light, woodcut outlines */
--color-ghost-white:     oklch(98.65% 0.0066 286.28); /* #FAFAFF — cotton-paper canvas & light ink on indigo */
--color-periwinkle:      oklch(90.59% 0.0526 298.58); /* #E4D9FF — sun highlights, ingredient badges, hover washes */
--color-lavender-grey:   oklch(63.93% 0.0671 283.34); /* #8687B4 — ornamental borders, woodcut rules, support icons */
--color-dusty-grape:     oklch(49.72% 0.0787 276.92); /* #575E8F — secondary light-ground text, mid-layer cards */
--color-twilight-indigo: oklch(34.40% 0.0936 270.46); /* #273469 — primary CTAs, deep contrast frames, focus ring */
--color-space-indigo:    oklch(28.33% 0.0637 270.72); /* #1E2749 — navbar, footer, mountain woodcut ink & block shadows */
```

#### Mandatory 7-Color Palette Mapping & WCAG Contrast Ledger

| Token Name | Hex | OKLCH (`L% C H`) | Verified Surface & Ink Role | Verified WCAG Contrast |
| :--- | :--- | :--- | :--- | :--- |
| **Jet Black** | `#30343F` | `oklch(32.57% 0.0203 269.50)` | Primary body copy on light surfaces, structural woodcut strokes | `11.95:1` on Ghost White (AAA) · `9.28:1` on Periwinkle (AAA) |
| **Ghost White** | `#FAFAFF` | `oklch(98.65% 0.0066 286.28)` | Tactile cotton-paper canvas, primary ink on dark indigo bands | `14.00:1` on Space Indigo (AAA) · `11.33:1` on Twilight Indigo (AAA) |
| **Periwinkle** | `#E4D9FF` | `oklch(90.59% 0.0526 298.58)` | Illuminated secondary panels, ingredient chips, dark-band accents | `10.87:1` on Space Indigo (AAA) · `8.80:1` on Twilight Indigo (AAA) |
| **Lavender Grey** | `#8687B4` | `oklch(63.93% 0.0671 283.34)` | Carved inner hairlines, dividers, decorative woodcut hatching (non-body UI) | `3.29:1` on Ghost White (AA UI/border) · `4.25:1` on Space Indigo (Large/UI) |
| **Dusty Grape** | `#575E8F` | `oklch(49.72% 0.0787 276.92)` | Secondary body captions on light ground, sub-headers, woodcut midtones | `5.93:1` on Ghost White (AA Normal) |
| **Twilight Indigo** | `#273469` | `oklch(34.40% 0.0936 270.46)` | Primary CTA fill, active selector tabs, light-ground focus rings | `11.33:1` on Ghost White (AAA) |
| **Space Indigo** | `#1E2749` | `oklch(28.33% 0.0637 270.72)` | Navbar, footer, immersive Cody night/mountain sections, solid woodblock shadows | `14.00:1` on Ghost White (AAA) |

> **Accessibility Guardrail:** Never render small body text in `#8687B4` (Lavender Grey) on `#FAFAFF` (Ghost White) (`3.29:1 < 4.5:1`). Use `#575E8F` (Dusty Grape, `5.93:1`) for secondary body copy on light paper and `#E4D9FF` or `#FAFAFF` on dark indigo surfaces.

---

### Typography

Self-hosted variable `.woff2` families loaded locally via `@fontsource-variable/*` and `public/fonts/` with `@font-face` (`font-display: swap`) — zero external font CDN runtime requests.

```css
--font-display: "Bricolage Grotesque", "Bricolage Grotesque Variable", ui-sans-serif, system-ui, sans-serif;
--font-body: "DM Sans", "DM Sans Variable", ui-sans-serif, system-ui, sans-serif;
--font-mono: "JetBrains Mono", "JetBrains Mono Variable", ui-monospace, monospace;
```

- **Role Split:**
  - `Bricolage Grotesque` (`600`–`800` weight, tight tracking `-0.025em`, line-height `1.06`–`1.15`): Hero statement, section titles, bowl names, carved display numerals.
  - `DM Sans` (`400`–`600` weight, line-height `1.55`, max body measure `65ch`): Official Altitude Açaí narrative prose, bowl descriptions, store directions, seasonal summaries.
  - `JetBrains Mono` (`500`–`600` weight, uppercase tracking `0.08em`): Section eyebrows, ingredient category counts (`PICK UP TO 3`), Mountain Time live clock status (`AMERICA/DENVER`), bowl size pills (`12 OZ BOWL` / `16 OZ BOWL`), and structural metadata.

#### Modular Scale (1.25 Major Third / Editorial Display)

| Token | Size | Line Height | Weight | Role |
| :--- | :--- | :--- | :--- | :--- |
| `--text-xs` | `0.75rem` (`12px`) | `1.35` | `500` | Monospace metadata, printmaker stamps |
| `--text-sm` | `0.875rem` (`14px`) | `1.45` | `500` | Ingredient tags, nav items, secondary badges |
| `--text-base` | `1rem` (`16px`) | `1.55` | `400` | Standard body text, card summaries (minimum mobile body `15px–16px`) |
| `--text-lg` | `1.125rem` (`18px`) | `1.5` | `500` | Lead paragraphs, official verbatim copy blocks |
| `--text-xl` | `1.375rem` (`22px`) | `1.25` | `700` | Bowl card headings, anatomical layer titles |
| `--text-2xl` | `1.875rem` (`30px`) | `1.18` | `700` | Sub-section display headers |
| `--text-3xl` | `2.5rem` (`40px`) | `1.1` | `800` | Section headlines |
| `--text-hero` | `clamp(2.5rem, 5vw, 4.25rem)` | `1.04` | `800` | Hero headline (`Bricolage Grotesque`) |

---

### Tactile Cordel Materiality & Anti-Flat-Design Rules

1. **Zero Flat Solid Surfaces:** Every background surface pairs its solid base color with an SVG `<feTurbulence>` paper grain layer (strictly `3%`–`6%` opacity) and subtle woodcut fiber or crosshatch linework (`src/components/ui/WoodcutTextures.tsx` + `src/index.css` surface classes `.surface-cotton-paper`, `.surface-periwinkle-print`, `.surface-woodblock-indigo`, `.surface-twilight-plate`, `.surface-dusty-plate`).
2. **Woodcut Hard Block Shadows:** Elevated cards, buttons, and image frames replace soft Gaussian drop blurs with carved ink offset blocks:
   - Default elevation: `4px 4px 0px #1E2749` (`--shadow-woodcut`)
   - Compact pill/chip: `3px 3px 0px #1E2749` (`--shadow-woodcut-sm`)
   - Hero / feature plate: `6px 6px 0px #1E2749` (`--shadow-woodcut-lg`)
   - Dark-surface elevation: `4px 4px 0px #E4D9FF` (`--shadow-woodcut-periwinkle`)
3. **Carved Press Motion:** Interactive buttons and chips translate `(-1px, -1px)` with expanded shadow on hover and settle `(2px, 2px)` into the paper on active press (`200ms cubic-bezier(0.16, 1, 0.3, 1)`).
4. **Borders & Hairlines:** Outer printmaker borders use `2px solid #1E2749` paired with a `1px` inset hairline in `#8687B4` (at `32%` alpha on light paper) or `#E4D9FF` (at `28%` alpha on dark indigo).

---

### Spacing, Grid & Touch Targets

- **8pt Spatial Rhythm:** `4px / 8px / 12px / 16px / 24px / 32px / 48px / 64px / 96px`.
- **Section Pacing:** Alternate vertical breathing space deliberately (`py-16`, `py-20`, `py-24`) alongside alternating surface polarity (Cotton Paper Ghost White → Woodblock Space Indigo → Periwinkle Print → Cotton Paper) so consecutive bands remain distinct.
- **Touch Target Floor:** All interactive buttons, bowl layer selectors, custom builder ingredient chips, and season tabs maintain at least `44px × 44px` hit area on mobile (`375px`, `390px`), tablet (`768px`, `1024px`), and desktop (`1440px`).
- **Focus Visibility:** `:focus-visible` renders a crisp `3px solid #273469` ring (`offset: 3px`) on light surfaces and `3px solid #E4D9FF` on dark indigo surfaces.
