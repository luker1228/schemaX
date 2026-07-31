# SchemaX icon — canonical templates

All templates are wired to the **real** `--sx-sys-*` tokens. Copy, rename the
component to `Icon<Concept>`, and redraw the inner shapes — keep the outer
attributes (`viewBox`, stroke, caps, `currentColor`, a11y).

## Shared attributes (don't change these)

```text
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"        ← color always inherited, never baked in
stroke-width="2"
stroke-linecap="square"
stroke-linejoin="miter"
aria-hidden="true"           ← or role="img" + <title> when meaning-bearing
```

## Brand — blue line + yellow panel (the default 撞色 recommendation)

Concept: a "schema" box with a divider. **Blue is the line (via `currentColor`),
yellow is a filled panel; the two clash on purpose.** Don't paint the stroke yellow.

```svg
<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
  <rect x="4" y="4" width="16" height="16"
        fill="var(--sx-sys-color-accent)"
        stroke="currentColor" stroke-width="2" />
  <path d="M8 12h8"
        fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="square" stroke-linejoin="miter" />
</svg>
```

The parent sets the blue: `.hero .icon { color: var(--sx-sys-color-action-primary); }`.
Yellow lives inside the glyph as the panel; blue comes from the parent's `color`.

## Restrained — black line, no fill (body / nav / dense rows)

Same glyph, no panel, parent color is ink. Use wherever blue+yellow would be
louder than the text around it.

```svg
<svg viewBox="0 0 24 24" width="24" height="24"
     fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"
     aria-hidden="true">
  <rect x="4" y="4" width="16" height="16" />
  <path d="M8 12h8" />
</svg>
```

The parent sets the color: `.nav .icon { color: var(--sx-sys-color-text-primary); }`.

## Semantic — status color as the line, contour stays currentColor

Concept: success. Green is the *status* mark; the container is still a clean
line circle. Reach for this only when the icon *is* a status.

```svg
<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
  <circle cx="12" cy="12" r="8"
          fill="none" stroke="currentColor" stroke-width="2" />
  <path d="M8.5 12.5l2.5 2.5 4.5-5.5"
        fill="none" stroke="var(--sx-sys-color-success)" stroke-width="2"
        stroke-linecap="square" stroke-linejoin="miter" />
</svg>
```

Swap `--sx-sys-color-success` → `--sx-sys-color-danger` (red) for the fail state.
(Blue is not a semantic swap — it is the brand line color; see Brand above.)

## The `.astro` wrapper (how icons actually live in this repo)

New icon → `src/components/icons/Icon<Name>.astro`. Color and size come from
props / parent; the glyph honors `currentColor`, so the **same** file serves the
brand 撞色 look or a quiet black-line spot, and recolors on hover/focus with zero
changes.

```astro
---
interface Props {
  size?: number | string;
  class?: string;
  title?: string; // omit → decorative (aria-hidden); pass → meaning-bearing (role="img")
}
const { size = 24, class: className, title } = Astro.props;
const a11y = title
  ? { role: 'img', 'aria-label': title }
  : { 'aria-hidden': 'true' };
---
<svg
  viewBox="0 0 24 24"
  width={size}
  height={size}
  class={className}
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="square"
  stroke-linejoin="miter"
  {...a11y}
>
  {title && <title>{title}</title>}
  {/* redraw these shapes for your concept, keep everything above */}
  <rect x="4" y="4" width="16" height="16" />
  <path d="M8 12h8" />
</svg>
```

Usage — decorative next to a label:

```astro
---
import IconSchema from '../../components/icons/IconSchema.astro';
---
<a class="nav-link" href="/design-system">
  <IconSchema size={20} class="icon" />
  Schema
</a>
```

Usage — icon-only button (meaning-bearing, needs a title):

```astro
---
import IconSearch from '../../components/icons/IconSearch.astro';
---
<button class="search-btn" type="button">
  <IconSearch size={20} title="Search" />
</button>
```

## Quick decision tree

```text
Default to the Brand (撞色) template — blue line + yellow panel (≤ 35%).
  → Use Restrained (black line) when the icon sits in body copy, navigation,
    or a dense row where blue+yellow would be louder than the text.
  → Use Semantic (red/green) only when the icon IS a status (error / success).
```
