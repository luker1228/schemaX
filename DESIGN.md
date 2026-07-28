---
name: SchemaX UI
description: 工程师的现场手册——粗黑边、硬阴影、暖纸，可按压的实体界面。
colors:
  paper: "#FFF7E8"
  ink: "#000000"
  surface: "#FFFFFF"
  accent: "#FFDC58"
  action: "#2F5BEA"
  danger: "#F9575C"
  success: "#35AD68"
  text-soft: "#6B6355"
  text-muted: "#666666"
  mint: "#01FFCC"
  lavender: "#C7B7FF"
  beige: "#EFE7D6"
  gray-light: "#CBCCC9"
  terminal-bg: "#0F1115"
  terminal-text: "#E6E6E6"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Geist', ui-sans-serif, system-ui, 'PingFang SC', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  article:
    fontFamily: "'Geist', ui-sans-serif, system-ui, 'PingFang SC', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.08em"
  mono:
    fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  none: "0"
  control: "2px"
  md: "4px"
  pill: "9999px"
spacing:
  s1: "0.25rem"
  s2: "0.5rem"
  s3: "0.75rem"
  s4: "1rem"
  s6: "1.5rem"
  s8: "2rem"
  s12: "3rem"
  s16: "4rem"
  s24: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1rem"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1rem"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1rem"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1rem"
  badge-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.15em 0.55em"
  nav-link-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.5rem 0.8rem"
---

# Design System: SchemaX UI

## Overview

**Creative North Star: "The Engineer's Field Manual"**

SchemaX UI 是一本工程师的现场手册，不是一份精修的画册。它诚实、硬朗、可触摸——像一张被反复翻阅、盖过章、写满等宽批注的工作纸。粗黑边框、无模糊的硬阴影、暖纸背景，共同把界面当作**有重量的实体**来对待：按钮是能按下去的按键，卡片是能抬起来的硬纸板，标签是盖上去的戳。Schema 母题（花括号、字段名、类型标签、required 星号）是这本手册的批注语言，但它们只在品牌与设计系统区出场，绝不侵入长篇阅读。

整套系统的视觉真相由令牌（DTCG JSON → Style Dictionary → 生成 CSS/TS）单一定义，业务代码只消费 `--sx-sys-*` / `--sx-comp-*`，不得硬编码品牌色、不得引用 `--sx-ref-*` 原语。CSS 分九层（`reset, tokens, theme, base, layout, article, components, utilities, overrides`），文章正文用 `:where()` 零特异性，保证组件与 overrides 能干净胜出。

视觉强度按页面分级：设计系统 = 最强（母题全开），首页/项目 = 强，课程正文 = 中等，**博客正文 = 最克制**（Schema 母题退场，回归安静阅读）。这条分级是承重的：手册的「装订感」服务于内容，而非压过内容。

**Key Characteristics:**

- **暖纸 + 纯墨**：`#FFF7E8` 纸面 + `#000000` 墨黑，是全站底色与文字/边框的唯一基线。
- **硬阴影无模糊**：偏移纯黑实体阴影（2/4/6px），物体始终贴着纸面，交互靠位移而非渐变。
- **可按压的实体**：按钮 hover「按下 2px」、卡片 hover「抬起 3px」——方向相反的物理反馈。
- **等宽即批注**：Geist Mono / IBM Plex Mono 承载代码、导航、标签、终端——手册里的「手写注记」。
- **粗细两档边框**：1px 默认，2px（`--sx-sys-border-width-strong`）用于强调（大卡、pill、终端）。
- **几乎无圆角**：容器 0、控件 2px、仅状态 pill 用 9999px。

## Colors

技术化命名——沿用令牌的语义角色，不附加文学修辞。基线是暖纸 + 纯墨的单色对，加一枚黄强调作唯一主操作色。

### Primary

- **Accent** (`#FFDC58`, `--sx-sys-color-accent`): 唯一主操作色。主按钮、激活态导航、表头、`<mark>` 高亮、徽章 accent 变体。它是整页视觉的「印泥」——稀少、因此醒目。
- **Action** (`#2F5BEA`, `--sx-sys-color-action-primary`): 链接 hover/focus 色、全局 focus 描边、正文链接、blockquote 左边框。仅用于「可跳转/可聚焦」的语义，不作大面积填充。

### Secondary

- **Danger** (`#F9575C`, `--sx-sys-color-danger`): 危险/停用（删除按钮、archived/paused 徽章、终端红点）。
- **Success** (`#35AD68`, `--sx-sys-color-success`): 成功/完成（completed/published/maintained 徽章、终端绿点）。

### Tertiary（装饰色，仅品牌/首页 bento/分区强调）

- **Mint** (`#01FFCC`, `--sx-sys-color-mint`)
- **Lavender** (`#C7B7FF`, `--sx-sys-color-lavender`)
- **Beige** (`#EFE7D6`, `--sx-sys-color-beige`): 也作 planned/未开放状态的语义底色。
- **Gray-light** (`#CBCCC9`, `--sx-sys-color-gray-light`)

### Neutral

- **Paper** (`#FFF7E8`, `--sx-sys-color-bg-page`): 全站页面背景，手册的纸。
- **Surface** (`#FFFFFF`, `--sx-sys-color-bg-surface`): 卡片/容器/输入的白色承载面，浮于纸上的实体。
- **Ink** (`#000000`, `--sx-sys-color-text-primary` / `--sx-sys-color-border`): 正文文字 + 全站边框/阴影色，身兼二职。
- **Text-soft** (`#6B6355`, `--sx-sys-color-text-soft`): 次要正文（描述、引导文案），暖灰不冷。
- **Text-muted** (`#666666`, `--sx-sys-color-text-muted`): 辅助/技术栈小字。

### 终端子系统（暗色内嵌）

终端是手册里的「黑底屏幕」，独立一套冷灰色阶：`terminal-bg #0F1115` / `surface #161A20` / `elevated #1B1F26` / `border #2A2F37` / `text #E6E6E6` / `muted #9AA0A6`，配 IBM Plex Mono。它是有意从暖纸世界切出的「设备窗口」。

### Named Rules

**The One Stamp Rule.** Accent（黄）是整页唯一的「印泥」——只用于主操作与激活态，单屏占用 ≤10%。它的稀少就是它的分量；把它当背景大面积铺，手册就变成了马戏团。

**The Ink-Does-Double-Duty Rule.** 同一个 `#000000` 既是正文文字也是全站边框与阴影色。不要为边框/阴影引入第二种黑；纸墨二元的一致性比「丰富」更重要。

**The Decorative-Only Rule.** Mint / Lavender / Beige / Gray-light 是装饰色，只活在品牌区、首页 bento 与状态语义里，不得出现在正文阅读路径上。

## Typography

**Display Font:** Bricolage Grotesque（回退 ui-sans-serif / system-ui）
**Body Font:** Geist（回退 ui-sans-serif / system-ui / PingFang SC / Microsoft YaHei）
**Mono Font:** Geist Mono（回退 ui-monospace / SFMono-Regular / Menlo / Consolas）
**Terminal Font:** IBM Plex Mono（终端屏幕专用）

四族字体由 `@fontsource` 自托管，仅引入实际字重（Geist 400/600/700、Geist Mono 400/700、Bricolage 700/800、IBM Plex Mono 400），无运行时外部请求。字体族经 `--sx-sys-font-family-*` token 落地，系统字体栈作 fallback。

**Character:** Bricolage Grotesque 给手册的「标题章」以工程化的重量感；Geist 是干净中性的正文，让信息密度不被字形抢戏；等宽两族（Geist Mono 通用、IBM Plex Mono 终端）是手册里的批注与设备输出，呼应「协议是一等公民」。

### Hierarchy

- **Display** (Bricolage Grotesque 800, `clamp(2.5rem, 6vw, 4rem)`, 1.05, `-0.02em`): hero / 页面主标题。仅大标题用 display 字族。
- **H1** (Geist 800, 2.5rem, 1.1, `-0.02em`): 文章级主标题。
- **H2** (Geist 700, 2rem, 1.2, `-0.01em`): 章节标题。上 margin 4rem / 下 1.5rem——标题上方留更多呼吸。
- **H3** (Geist 700, 1.5rem, 1.25): 子章节。
- **H4** (Geist 700, 1.2rem): 小节。
- **Label (H5/H6)** (Geist 700, uppercase, `0.05em`–`0.08em` 字距): 章节批注/小标题；H6 用 0.9rem + opacity 0.7 作次级。
- **Body** (Geist 400, UI 1rem/1.6；正文 1.0625rem/1.8): 正文行宽 ≤46rem（阅读）/ 68rem（教程）。
- **Mono** (Geist Mono 400, 0.85rem/1.65): 代码、导航、标签、内联 code/kbd。

### Named Rules

**The Mono-Is-Annotation Rule.** 等宽字是「批注与数据」的字体——代码、终端、导航链接、标签、技术栈小字。不要把等宽当装饰给普通文案「装技术感」；它只在承载代码/数据/测量/路径时出场。

**The Display-Is-Rare Rule.** Bricolage Grotesque 只用于 hero / 页面主标题。正文标题（H1–H4）一律 Geist。display 的稀缺让它成为手册的「封面字」。

## Layout

**栅格与容器：** 三套宽度令牌——页面 `--sx-layout-width-page: 78rem`、阅读 `--sx-article-width-reading: 46rem`、教程 `--sx-article-width-tutorial: 68rem`。文档/课时双栏用 `--sx-sys-layout-width-doc: 87.5rem`（侧栏 13.5rem + 主区，gap 10rem），侧栏 sticky，≤1024px 折叠为单栏。容器左右内边距 `--sx-ref-space-6`（移动端 `space-4`）。所有容器 margin-inline auto 居中。

**节奏：** 间距走 4 单位基底的 `--sx-ref-space-*` 刻度（`1=0.25 / 2=0.5 / 3=0.75 / 4=1 / 6=1.5 / 8=2 / 12=3 / 16=4 / 24=6` rem）。组内紧、组间松——同组元素 `space-6`，跨组分离 `space-12`。标题上方留白多于下方（H2 上 4rem / 下 1.5rem）。

**响应式断点：** `48rem`(768px) 卡片进三列；`1024px` 文档双栏侧栏隐藏、主区全宽；`82rem`(1312px) 大屏装饰元素（如设计系统的 Figma 面板）才显示，跳过 1200–1312px 碰撞窗。

**Tailwind 桥接：** `src/styles/tailwind.css` 用 `@theme` 把 `--sx-*` 桥接到 shadcn 命名空间（`bg-primary`=黄、`text-foreground`=墨、`bg-paper`、`text-ink`、`shadow-brutal-sm/md/lg`、`radius-none/sm/md`）。**不引入 Tailwind preflight**——reset 已由 `reset.css` 承担，避免与 article/components 冲突。

### Named Rules

**The Scale-Not-Ad-Hoc Rule.** 间距只用 `--sx-ref-space-*` 刻度值，不要写 `1.375rem` / `1.75rem` 这类脱刻度数字。组内/组间的比例（如 1.5rem vs 3rem 的 2×）是节奏的承重设计。

## Elevation & Depth

这套系统用**无模糊的偏移硬阴影**表达深度——物体是贴着纸面的实体，阴影是它与纸的接触，不是弥散的光晕。阴影恒在（静态卡片 resting 即有 2px 影），交互时靠**位移改变影长**：按钮按下 2px、阴影消失（贴底）；卡片抬起 3px、阴影升级到 4px。两种方向相反的物理反馈，是「可触摸」的核心。

颜色统一纯黑（`#000000`），唯一例外是终端的黄色硬阴影（`6px 6px 0 #FFDC58, 6px 6px 0 1px #000000`——黄偏移 + 黑描边），把它从暖纸世界切出来当作「设备」。

### Shadow Vocabulary

- **sm** (`box-shadow: 2px 2px 0 #000000`, `--sx-sys-shadow-sm`): 默认静态态。按钮、卡片、内联 code/kbd、figure、details 的 resting 阴影。
- **md** (`box-shadow: 4px 4px 0 #000000`, `--sx-sys-shadow-md`): 卡片 hover 升级态、正文表格。
- **lg** (`box-shadow: 6px 6px 0 #000000`, `--sx-sys-shadow-lg`): 设计系统演示块、首页大卡。
- **terminal** (`6px 6px 0 #FFDC58, 6px 6px 0 1px #000000`, `--sx-comp-term-shadow`): 终端专属黄色硬阴影。

### Named Rules

**The Contact-Not-Glow Rule.** 阴影是实体与纸面的接触，不是柔和的光晕。永远 `offset 0 blur`、纯黑、零模糊。不要给阴影加 `blur` 或 `rgba()` 透明度——那会立刻把「手册实体」变成「玻璃玩具」。

**The Motion-Is-Displacement Rule.** 交互反馈靠 `transform: translate()` 改变物体位置与影长，不靠透明度或渐变。120ms ease，并遵守 `prefers-reduced-motion`（降至 0.01ms）。

## Shapes

几乎无圆角是新粗野主义的承重选择。容器默认 0，控件 2px，仅状态 pill 用 9999px。边框两档：1px 默认、2px 强调（`--sx-sys-border-width-strong`，用于首页大卡、pill、终端）。

- **容器/卡片**：圆角 0（`--sx-sys-radius-sm`）。`Card` 有 `rounded` 变体（2px, `--sx-comp-card-radius`）但默认方角。
- **按钮/输入/kbd**：2px（`.btn` border-radius: 2px）。
- **全局 Badge / Tag**：0（方角戳记）。
- **状态 pill**：9999px（FeatureCard 状态胶囊、hero 彩色徽章等展示型 pill；非全局 Badge）。
- **终端点**：50%（红黄绿圆点）。

### Named Rules

**The Square-Default Rule.** 默认方角。圆角是刻意的、克制的例外（控件 2px、pill 9999px），不是默认。不要给卡片/容器加 8–16px 圆角——那不属于这本手册。

**The Border-Or-Shadow-Not-Both-Soft Rule.** 边框与硬阴影可以并存（这是本系统的签名：1–2px 黑边 + 偏移硬影），但不要在硬阴影之上再叠柔光阴影，也不要无边框只剩影子漂浮。

## Components

每个组件是 props → 全局类（`.btn` / `.card` / `.badge` / `.nav__link` / `.term`，定义在 `src/styles/components.css`）的映射；`.astro` 组件只做语义与变体映射，样式集中在全局类。组件可在自身作用域微调，但优先复用全局类。

### Buttons

可按压的实体。1px 黑边 + 2px 圆角 + resting 硬阴影（sm）；hover/active 向右下位移 2px、阴影消失（贴底）= 物理按键被按下。focus-visible 走全局蓝描边（1px action，offset 2px）。disabled 半透明 0.4 + pointer-events none。120ms ease，遵守 reduced-motion。

- **Shape:** 方控件的 2px 圆角。
- **Primary:** 黄底（accent）墨字。主操作（默认变体）。
- **Secondary:** 墨底白字。次要操作。
- **Outline:** 白底墨字。中性操作。
- **Danger:** 红底白字。删除等破坏性操作。
- **Ghost:** 透明、无阴影。Hero 等特殊场景；hover 仍「按下」。
- **Sizes:** sm `0.3rem 0.7rem` / 0.78rem；md `0.5rem 1rem` / 0.9rem（默认）；lg `0.75rem 1.4rem` / 1rem。

### Badges

盖上去的戳。1px 黑边、方角（0）、0.7rem、weight 800、uppercase、0.04em 字距。语义变体：default 白底墨字、accent 黄底墨字、action 蓝底白字、danger 红底白字、success 绿底白字。用于状态/类型标记。

### Tags

等宽戳记。1px 黑边、方角、0.72rem、`ui-monospace`、paper 底。比 Badge 更「技术注记」。

### Cards / Containers

能抬起的硬纸板。1px 黑边、默认方角（`rounded` 变体 2px）、padding `space-4`(1rem)、resting 阴影 sm(2px)。`shadow` 档位 none/sm/md/lg；`shadowColor` 可经 `--sx-card-shadow-color` 局部覆盖（如黄色偏移）。**interactive 卡片** hover 向左上抬起 3px + 阴影升级到 4px；**静态卡片**（无 href）不抬起，避免「不可点却跳一下」的误导。

### Navigation

等宽批注式导航。`.nav__link` 用 `ui-monospace`、0.78rem、700、uppercase、0.08em 字距。默认透明无框；hover/active 整块黄底填充（accent，无边框无阴影）；disabled 半透明 0.4。`aria-current="page"` 常驻黄底。

### Terminal（签名组件）

手册里的「设备窗口」。标题栏（暖纸底 + 红黄绿圆点 + 等宽标题）+ 屏幕主体。屏幕分 light（暖纸底墨字）/ dark（`#0F1115` 底 `#E6E6E6` 字）两主题，IBM Plex Mono。专属**黄色硬阴影**（黄偏移 + 黑描边），与全站纯黑阴影区隔，把它当作嵌入手册的物理设备。被 `Command`（纯展示）与 `HeroTerminal`（React island，light 打字机）复用。

## Do's and Don'ts

### Do:

- **Do** 用 `--sx-sys-*` / `--sx-comp-*` 令牌，绝不硬编码品牌色、绝不引用 `--sx-ref-*` 原语（仅令牌层可用）。
- **Do** 让间距落在 `--sx-ref-space-*` 刻度上，用「组内紧、组间松」的 2× 比例建立节奏。
- **Do** 让按钮按下、卡片抬起——交互反馈靠 `transform` 位移与阴影增减，120ms ease。
- **Do** 把等宽字留给代码/数据/导航/标签/终端（批注语言），把 display 字族留给 hero 主标题。
- **Do** 按页面分级控制视觉强度：设计系统最强、博客正文最克制。
- **Do** 让设计系统页读取令牌生成产物，而非手工拷贝文档。

### Don't:

- **Don't** 给阴影加 `blur` 或 `rgba()` 透明度——硬阴影必须 `offset 0 blur` 纯黑（终端黄影是唯一例外）。
- **Don't** 给卡片/容器加 8–16px 圆角；默认方角，圆角只是控件的 2px / pill 的 9999px 例外。
- **Don't** 把 Accent（黄）当背景大面积铺——它是单屏 ≤10% 的「印泥」。
- **Don't** 让 Schema 母题（花括号/字段名/类型标签/required 星号）侵入长篇阅读空间。
- **Don't** 在硬阴影之上叠柔光阴影，或无边框只剩影子漂浮。
- **Don't** 引入 Tailwind preflight 或第二个 UI 框架；reset 已由 `reset.css` 承担，单一 island 框架固定为 React。
- **Don't** 把单页的视觉偏离（如某页 surface brief 授权的配色实验）当成全站规则；全局系统以本文件为准，单页偏离记录在该页 surface brief 内。
