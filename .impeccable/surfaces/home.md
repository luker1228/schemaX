---
version: 2
slug: "home"
primary_target: "home"
related_targets:
  - "src/pages/index.astro"
  - "src/components/home"
  - "src/styles/home.css"
---

# Surface: Home

## Scope & mode
- Route: `/`
- Mode: **Persuade** + light **Experience** (peers / recruiters judge craft; first-person narrative invites trust)
- Primary sources: `src/pages/index.astro`, `src/components/home/*`, `src/styles/home.css`

## Job
In one scroll: prove SchemaX is a durable second brain with craft (RetroUI base + editorial doodle), then open paths to courses / blog / projects / design system—without turning into a circus.

## Direction
**neubrutalism 贴纸堆（北极星 neubrutalism.com）× 撞色贴纸 × 抬升式 hover × Bricolage 大写粗 display**

- Composition: WALNUT-like editorial asymmetry (large type, chaptered sections, breathing room) on a Swiss grid — macro asymmetry, micro mechanical alignment
- Voice: first-person, concrete, not pitch-deck
- Components: 3px black border, zero radius, zero-blur hard offset shadows (3/5/8/12px), lift-on-hover (translate -2,-2 + shadow grows; active presses down)
- Clashing stickers: yellow `accent` + blue `action` + neubrutalism clash (coral / sky / pop-green / orange) — black text on light clash for contrast; GeoMark geometric icons (no hand-drawn)
- Paper: warm paper page (`bg-page`) + 32px 淡蓝工程方格网格 (schema blueprint = subject's world)
- Display: Bricolage Grotesque 800 UPPERCASE for hero

## Constraints
- PRODUCT.md product truth unchanged; no fabricated claims
- Global DESIGN.md wins (now neubrutalism north star): reading-first elsewhere; home may be loudest
- Token-only colors/sizes; stylelint breakpoints whitelist
- 3px canonical black border · zero radius · zero-blur hard shadows (3/5/8/12) · lift-on-hover (not press)
- Clashing stickers allowed on home (coral/sky/pop-green/orange + yellow/action); black text on light clash
- Respect `prefers-reduced-motion`; one authored moment (hero geometric arrow draw-in)
- Schema motif (braces as decoration ok sparingly; not inside long-form elsewhere)
- Stamp/sticker CTAs may slight-rotate at rest (±2°)

## Memorable moment
UPPERCASE Bricolage display **STRUCTURE THE UNKNOWN.** with yellow highlight block + geometric arrow draw-in + lift-on-hover stamp CTAs + terminal with 8px yellow+black-outline hard shadow on engineering grid; four-card entries as a clashing sticker stack (yellow/coral/sky/pop-green) + manifesto four-clash wall (coral/white/pop-green/yellow).

## Section map
1. Hero — personal narrative + stamp CTAs + terminal
2. Entries — four hand-drawn icons (course / blog / code / db)
3. Manifesto — 4 principles, B&W line + blue/yellow wash
4. Latest posts — editorial feature card + dashed archive
5. Projects — doodle side panel + lab/toolchain cards
6. Tech note — pipeline with doodle arrows + metrics
