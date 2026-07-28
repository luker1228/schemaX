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
**RetroUI 结构底座 × 编辑式黑白涂鸦 × 蓝黄强调 × 少量手绘动画**

- Composition: WALNUT-like editorial asymmetry (large type, chaptered sections, breathing room)
- Voice: Marie Guillaumet–style personal narrative (first person, concrete, not pitch-deck)
- Components: RetroUI hard borders, zero radius, solid offset shadows
- Accent: SchemaX blue (`action`) + yellow (`accent`) only for emphasis; decorative mint/lavender/red no longer lead the home story
- Paper: warm paper page (`bg-page`) with light fiber texture (token-safe gradients)

## Constraints
- PRODUCT.md product truth unchanged; no fabricated claims
- Global DESIGN.md wins: reading-first elsewhere; home may be louder
- Token-only colors/sizes; stylelint breakpoints whitelist
- Prefer CSS doodle motion; respect `prefers-reduced-motion`
- Schema motif (braces as decoration ok sparingly; not inside long-form elsewhere)
- Zero radius on home hard cards; stamp/sticker CTAs may slight-rotate at rest

## Memorable moment
Yellow highlight on **the Unknown.** + hand-drawn arrow draw-in + stamp CTAs + terminal with yellow hard shadow on paper grain.

## Section map
1. Hero — personal narrative + stamp CTAs + terminal
2. Entries — four hand-drawn icons (course / blog / code / db)
3. Manifesto — 4 principles, B&W line + blue/yellow wash
4. Latest posts — editorial feature card + dashed archive
5. Projects — doodle side panel + lab/toolchain cards
6. Tech note — pipeline with doodle arrows + metrics
