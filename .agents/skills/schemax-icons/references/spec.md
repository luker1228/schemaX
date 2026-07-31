# SchemaX icon — full spec

The visual language is **blue-yellow complementary + hard black ink** (new-brutalist).
The icon system's signature brand beat is **蓝黄撞色**: a blue line paired with a
yellow accent panel. Black line is the quiet workhorse for restrained spots;
semantic color only for status. Restraint still rules — 撞色 means *blue + yellow
together on one glyph*, never flooding every icon with color.

> icon 本体仍保持克制：撞色 = 蓝线 + 少量黄面板（≤ 35% 面积），不是把每个图标都填满颜色。

## 1. Base spec (every icon)

- Canvas: `24×24`
- Stroke: `2px` (=`--sx-sys-border-width-strong`)
- Stroke color: `currentColor` (the parent picks blue for brand, black for restrained)
- Fill: `none`, or white (`--sx-sys-color-bg-surface`) when it sits on the warm paper background and needs to read as a hole
- Form: hard edges / tiny corner radius
- Safe margin: keep the body inside a `2px` inset (draw between 4 and 20)
- Style: clean contour, low detail

## 2. Color ratios — the whole system

```text
~50% blue-yellow complementary  (brand beat: blue line + yellow panel)
~35% black-line restrained      (body / nav / dense rows)
~15% red / green semantic       (status only)
```

### ~50% blue-yellow complementary (the brand beat)
The signature look. Blue line (`currentColor` → `--sx-sys-color-action-primary`) +
a yellow accent panel (`--sx-sys-color-accent`). Reach for it whenever the icon
carries brand weight: hero, feature card, primary action, selected / recommended
entry, section mark. **Never flood an entire icon yellow** — keep the panel to
**20–35%** of one glyph's area. The line stays blue; yellow is the panel.

### ~35% black-line restrained
Black `currentColor` stroke (→ `--sx-sys-color-text-primary`), no fill (or a white
panel). For body copy, navigation, dense rows, toolbars — anywhere the brand 撞色
would read louder than the surrounding text. Still the right default next to a lot
of running prose.

### ~15% semantic color
Red / green only, capped low. **Status language, not decoration:**
- Green `--sx-sys-color-success` — success, complete, pass
- Red `--sx-sys-color-danger` — error, danger, delete, fail

Blue is no longer filed under "semantic" — it is the default brand line color
(see §5 for interaction).

## 3. Brand / 撞色 icon rules

```text
blue stroke (currentColor → action-primary)
white or unfilled body
yellow local panel (20–35%)
no gradients
no shadows
no glow
```

Reference structure: [`examples.md`](examples.md) § Brand.

## 4. Restrained icon rules

```text
currentColor black stroke
no fill, or white panel
24×24
2px stroke
hard edges / tiny radius
small-size first
```

Reference structure lives in [`examples.md`](examples.md) § Restrained.

## 5. Interaction rules

Blue is now a *default* brand color for icons, not only a hover state. Recommended states:

- brand default → blue line (+ the glyph's yellow panel where it has one)
- restrained default → black `currentColor`
- hover → black-line icons flip to blue (`--sx-sys-color-action-primary`); brand-blue icons may deepen or gain a focus ring
- focus → blue stroke or blue outer ring (≥ 3:1 contrast)
- active / selected → carry (or intensify) the yellow back-panel
- disabled → drop opacity, **do not change structure**

The icon component itself does none of this; the parent button/link does (see
`SKILL.md` § Interaction). The icon only needs to honor `currentColor`.

## 6. Form rules

Hard, direct, engineered.

Recommended:
- straight lines over curves
- tiny corner radius, or fully square
- square line caps (`stroke-linecap="square"`)
- orthogonal projection, no complex perspective
- one concept per icon

Avoid:
- excessive diagonals
- complex 3D
- layered gradients
- glow
- fiddly ornament
- flooding an entire icon with yellow (keep the panel ≤ 35%)
- baking blue into `stroke=` instead of using `currentColor`

## 7. Small-size check (mandatory)

Every icon must be checked at **16 / 20 / 24 / 32px**. If 16px is unclear,
**simplify the shape — do not add detail.**

Ask:
- Stripped of color, is it still recognizable?
- Shrunk down, is the contour clear?
- Is the stroke weight consistent with sibling icons?
- Is the yellow louder than the subject?
- Does the semantic color actually signal a state?

## 8. Naming

Semantic names, not shape names.

Good:
```text
IconSchema IconContract IconValidate IconAgent IconApi IconTokens
IconConnect IconWorkflow IconCourse IconBlog IconProject IconSearch
```

Bad:
```text
IconBox1 IconYellowSquare IconLineThing IconShapeA
```

File → `src/components/icons/Icon<Name>.astro`.

## 9. Accessibility

- Decorative icon (next to visible text) → `aria-hidden="true"`.
- Icon-only button / meaning-bearing icon → `role="img"` + `<title>` (the `.astro`
  wrapper in [`examples.md`](examples.md) does this from a `title` prop).
- Never rely on color alone to signal state — keep the glyph legible in pure line.
- `focus-visible` must produce a visible blue ring at ≥ 3:1 contrast (parent's job).
