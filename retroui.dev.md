# Design Map

Analyzed 4 pages: `/`, `/components`, `/docs/components/accordion`, `/blog`.

## Spacing Scale

- Base unit: 4px.
- Repeated values: 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 40px, 48px, 56px, 64px, 112px.
- Grid gutters: 28px on components/blog; 48px on home.
- DOM frequency leaders on home: 16px (105), 8px (64), 12px (59), 4px (43), 24px (42).

## Font Hierarchy

- Bricolage Grotesque: 72/73.44px hero, 60/63px secondary hero, 48/48px section, 36/40px article, 30/36px blog card, 24/32px component title; weights 600–700.
- Geist: 18/28px marketing body at weight 500; 16/24px docs body at weight 400; 14px UI labels at weight 500.
- Geist Mono: 14px code blocks and technical labels.
- Heading letter-spacing: −1.8px at 72px, −1.5px at 60px, −1.2px at 48px, −0.9px at 36px.

## Color Palette

- Paper background: `#FFF7E8` (61.1% sampled home surface).
- White surface: `#FFFFFF` (25.5% sampled home surface).
- Primary ink: `#000000`.
- Muted ink: `#6B6355`.
- Action accent: `#FFDC58`.
- Docs/code surface: `#EFE7D6`.
- Decorative local accents: `#01FFCC`, `#C4A1FF`, `#FF30CD` (each under 2.2% sampled area).

## Image Ratios

- Feature illustration: 1.02:1 at 346px rendered width.
- Feature illustration: 1.42:1 at 284px rendered width.
- Feature illustration: 1.52:1 at 486px rendered width.
- Avatar thumbnails: 1:1 at 32px rendered width.

## Component Tokens

- Radius: 4px for cards/controls; pill uses `9999px`.
- Hard shadows: `4px 4px 0 #000`, `3px 3px 0 #000`, `2px 2px 0 #000`; no blur/spread.
- Primary card sample: 524px × 150px, ratio 3.49:1, 4px radius, 4px black offset.
- Grids: home 2 columns × 48px; components 4 columns × 28px in 1368px; blog 3 columns × 28px in 1152px; docs shell 288px sidebar + 1136px content.
- Motion: transform/translate/scale 0.15–0.6s cubic-bezier; color/background/border 0.2s; `:focus-visible` and reduced-motion rules present.

---

# Taste DNA

### Warm paper as the continuous field
- **Trigger**: When choosing a site-wide canvas for marketing, catalog, docs, and editorial pages.
- **Decision**: Chose a warm `#FFF7E8` paper field over neutral gray or a dark canvas.
- **Reason**: The tinted field makes black rules and yellow actions read as printed marks, while the same surface carries long docs without a theme switch.
- **Evidence**: `#FFF7E8` covers 61.1% of sampled home background area; `#6B6355` recurs on all four pages; `#EFE7D6` is reserved for docs/code surfaces.

### Offset ink replaces soft elevation
- **Trigger**: When a card, button, or interactive control needs separation from the paper.
- **Decision**: Chose hard black offsets of 2–4px with 0px blur over diffuse multi-layer shadows.
- **Reason**: The object keeps a physical cut-out edge at small sizes and remains legible on both white and paper surfaces.
- **Evidence**: 47 elements use `4px 4px 0 #000`; 18 use `2px 2px 0 #000`; cards pair a 4px radius with the offset.

### Display personality, utility body
- **Trigger**: When headings must carry the brand while component labels and docs need fast scanning.
- **Decision**: Chose Bricolage Grotesque for display levels and Geist for body/UI over a one-family system.
- **Reason**: The display face makes section changes visible at a glance; Geist keeps 14–18px labels and 16px docs text compact.
- **Evidence**: Bricolage spans 72/60/48/36/30/24px headings; Geist spans 18/28px marketing and 16/24px docs; Geist Mono is isolated to 14px code.

### Color is a signal, not wallpaper
- **Trigger**: When adding emphasis across a large component catalog and long landing page.
- **Decision**: Chose `#FFDC58` for primary emphasis and kept mint, purple, and pink to small decorative zones.
- **Reason**: Readers can predict that yellow means action or focus; decorative colors remain occasional markers instead of competing navigation channels.
- **Evidence**: Yellow is the repeated accent on all four pages; home accent counts show yellow 10 versus black 57; mint/purple/pink each stay below 2.2% sampled area.
