---
name: schemax-icons
description: "Draw SchemaX BRAND / Schema-themed icons as static inline SVG locked to the real --sx-sys-* design tokens — 24px canvas, 2px currentColor stroke, hard edges. Default brand beat is blue-yellow complementary (blue line + yellow accent panel); black-line for restrained body/nav contexts; red/green for semantic status. Use when creating, re-coloring, or auditing BRAND icons (braces, field names, type labels, required stars). Generic functional UI icons (arrows, chevrons, grid, search…) come from lucide-react instead — see CLAUDE.md「图标体系」; this skill does not cover them."
---

# SchemaX icons

These **brand / Schema-themed** icons are **static inline SVG (Astro, zero JS)**. Draw
them by hand on a 24×24 grid. (Generic *functional* UI icons — arrows, chevrons, grid,
search, copy… — are **not** drawn here; they come from `lucide-react`, see CLAUDE.md
「图标体系」. The "no icon font / no JS icon library" rule below scopes to *these brand
glyphs* only.) One sentence:

> 蓝黄撞色是默认品牌节拍：蓝描边 + 黄强调面板。
> 黑线留给克制场景（正文 / 导航 / 密集行）；红 / 绿只表状态。
> 24×24 canvas · 2px `currentColor` stroke · hard edges · readable at 16px.

## Color model — the only colors an icon may use

The brand beat is **blue + yellow complementary (蓝黄撞色)**; black line is the
quiet workhorse for restrained spots. Never hard-code hex — and **the placeholder
names in older notes (`--sx-color-yellow`, `--sx-color-ink`, `--sx-color-blue`) do
not exist in this repo.** Use exactly these:

- **Blue line / default brand beat** → `stroke="currentColor"`; the parent sets
  `color: var(--sx-sys-color-action-primary)` and the icon inherits blue
- **Yellow brand accent** (panel fill) → `var(--sx-sys-color-accent)`
- **Black line / restrained** → `stroke="currentColor"`; the parent sets
  `color: var(--sx-sys-color-text-primary)` (body copy, nav, dense rows)
- **Green** (success / done / pass) → `var(--sx-sys-color-success)`
- **Red** (error / danger / delete) → `var(--sx-sys-color-danger)`
- **White backing panel** → `var(--sx-sys-color-bg-surface)`

Stroke is **always** `currentColor` — blue vs black is the *parent's* choice, never
baked into the glyph. That is what lets one icon serve both the brand 撞色 look and
a quiet black-line spot, and recolor on hover/focus with zero re-rendering.

Stroke width rides the token scale: `2px` = `var(--sx-sys-border-width-strong)`
(emphasis / hero icons); `1px` = `var(--sx-sys-border-width)` (dense rows).

## Workflow

1. **Confirm one concept.** One icon = one idea. If a request fuses two meanings,
   ask which one wins, or ship two icons.
2. **Pick the variant.**
   - **Brand / 撞色 (default recommendation)** — blue line + a yellow *panel*
     (filled rect/path covering ≤ 20–35% of the glyph). Reach for this whenever
     the icon carries brand weight: hero, feature card, primary action, selected /
     recommended entry, section mark. This is the signature look.
   - **Restrained** — black line, `fill="none"`. Use inside body copy, navigation,
     dense rows, toolbars — anywhere blue+yellow would be louder than the text.
   - **Semantic** — red/green only when the icon *states a status*
     (error, success). Not decoration.
3. **Draw on the grid** — `viewBox="0 0 24 24"`, `stroke-width="2"`,
   `stroke-linecap="square"`, `stroke-linejoin="miter"`, body kept inside a 2px
   safe margin (draw between x/y 4–20). Copy-paste templates in
   [`references/examples.md`](references/examples.md).
4. **Wire colors to the token map** — stroke is `currentColor`; the parent picks
   blue (brand) or black (restrained); yellow and semantic colors are the
   `var(--sx-sys-*)` values above.
5. **Place it.** New icon → `src/components/icons/Icon<Name>.astro`, named for the
   **concept** (`IconSchema`, `IconContract`, `IconValidate`, `IconSearch`…),
   never the shape (`IconBox1`, `IconYellowSquare` are banned). It accepts
   `size` / `class` / `title` props and inherits color via `currentColor`.
6. **Small-size check.** Mentally render at 16 / 20 / 24 / 32px. If 16px loses the
   shape, **simplify — do not add detail.** Strip color mentally: still
   recognizable? Full checklist + ratios in [`references/spec.md`](references/spec.md).

## Hard rules — don't ship without

- `viewBox="0 0 24 24"`; `width`/`height` come from a `size` prop (default 24), never a baked pixel value.
- `aria-hidden="true"` on decorative icons; if the icon *alone* conveys meaning, give it `role="img"` + a `<title>` (see [`references/spec.md`](references/spec.md) § Accessibility).
- `fill="none"` by default — the body is a **line drawing**. Yellow/red/green go on a *panel* (a shape with `fill`), never painted onto the stroke.
- Stroke color is **`currentColor`** — never bake ink/yellow/blue directly into `stroke=`. Blue vs black is chosen by the **parent's** `color`, not by the icon.
- No gradients, no `filter` drop-shadows, no glow, no 3D, no rounded decorative flourishes, no per-icon webfont.
- A genuinely new color is added by extending the token map, **never by an inline hex**.

## Interaction is the parent's job, not the icon's

Icons do not self-style their hover state. The containing button/link picks the
mode and handles state:

```css
/* the glyph's stroke is currentColor; the parent decides the color */
.nav  .icon { color: var(--sx-sys-color-text-primary); }     /* restrained: black */
.hero .icon { color: var(--sx-sys-color-action-primary); }   /* brand: blue (+ yellow panel in the glyph) */

/* hover/focus still recolors — a black-line icon flips to blue */
.nav:hover .icon,
.nav:focus-visible .icon { color: var(--sx-sys-color-action-primary); }
.btn:disabled .icon { opacity: .45; }   /* glyph structure stays identical */
```

So the same `<IconX>` works as a quiet black-line mark or as a blue-yellow 撞色
hero, and flips state on hover/focus without re-rendering.

## Reference files

- [`references/spec.md`](references/spec.md) — full design spec: color ratios, form rules, small-size checklist, naming, accessibility.
- [`references/examples.md`](references/examples.md) — canonical SVG templates (brand 撞色 / restrained / semantic) and the `.astro` wrapper, all wired to real tokens.
- [`references/gallery.html`](references/gallery.html) — 可视化画廊（浏览器直接打开）：4×4 基础图标（brand 撞色）+ 三模式对照 + 配色/配比图例。
