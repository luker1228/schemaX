---
name: SchemaX UI
description: neubrutalism 贴纸堆（北极星 neubrutalism.com）——3px 黑框、3/5/8/12px 零模糊硬影、恒 0 圆角、抬升式 hover、撞色贴纸（黄/珊瑚粉/天蓝/柔绿/橙）、Bricolage 大写粗 display；阅读优先、信息密度高、永远明亮不暗。
colors:
  paper: "#FFFCF4"
  ink: "#000000"
  surface: "#FFFFFF"
  accent: "#FFDC58"
  action: "#2F5BEA"
  danger: "#F9575C"
  success: "#35AD68"
  text-soft: "#6B6355"
  text-muted: "#666666"
  coral: "#FF6B6B"
  sky: "#74B9FF"
  pop-green: "#88D498"
  orange: "#FFA552"
  lavender: "#B8A9FA"
  beige: "#EFE7D6"
  mint: "#01FFCC"
  gray-light: "#CBCCC9"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    textTransform: "uppercase"
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
  control: "0"
  md: "0"
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
    rounded: "{rounded.none}"
    padding: "0.5rem 1rem"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.none}"
    padding: "0.5rem 1rem"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.5rem 1rem"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.surface}"
    rounded: "{rounded.none}"
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
    rounded: "{rounded.none}"
    padding: "0.5rem 0.8rem"
---

# Design System: SchemaX UI

## Overview

**Creative North Star: neubrutalism.com（"The Clashing Sticker Stack"）**

SchemaX UI 是一摞**撞色硬边贴纸**，以 [neubrutalism.com](https://neubrutalism.com/) 为北极星。每一张都是直角、3px 纯黑硬边、压着一道零模糊的纯黑接触影——黄是印泥、蓝是可跳转、珊瑚粉/天蓝/柔绿/橙是贴纸堆的撞色人格，重磅 Bricolage 大写粗 display 在上面喊话。贴纸可以微微歪 ±2°，但正文永远端正。它明亮、坦诚、有触感、explicit over subtle：敢大敢撞的新粗野主义工程师语调，响亮单色 + 撞色贴纸，但永远可读、永远不暗、信息密度高、不空话。

它不是精修画册，也不是中性 SaaS 后台。它像工程师把想法一张张盖章、贴歪、摞起来的工作台——纸面发白带一点暖、3px 墨线硬直、印章盖歪一点也无妨，但中间的长文依然能让人安静读完。等宽批注（mono 标签、code 小戳、路径、`01 — Definition` 编号章节）是贴纸堆的次要笔触；身份的主角是**重磅大写 display + 3px 黑框 + 重硬影 + 撞色贴纸**。

**四柱承重（优先级固定）：**

1. **阅读感（仅约束长文）** —— 阅读克制**只**适用于大量连续文字的页面：博客正文、课程章节、长文档。那里才需要宽行距、克制色、Schema 母题退场，任何贴纸、粗野或互动都不得压过「能读完」这件事。**首页 / landing、入口、导航、展示页文字少，反方向走——大胆、丰富、有冲击力，不受阅读克制约束。** 密度来自信息，不来自视觉噪音；信息密度由瑞士网格承载（见 Layout）。
2. **玩心（贴纸）** —— Bricolage 重磅**大写**封面大字、可微旋 ±2° 的戳记与 CTA、高密度排版、撞色贴纸并置。玩心在大字与贴纸的并置，不在正文里歪斜或花哨。
3. **互动感（抬升式）** —— 界面是有重量的实体：hover **抬起**（左上位移）+ 阴影涨；active 才**按下**贴底、影消。反馈靠位移与影长，不靠发光或漂浮。
4. **新粗野主义（neubrutalism）** —— 单一 3px canonical 笔触、零模糊硬偏移影（3/5/8/12px 四档）、恒 0 圆角、撞色贴纸堆（黄 + 珊瑚粉 + 天蓝 + 柔绿 + 橙 + 薰衣草）。材质诚实，拒绝玻璃拟态、弥散光晕、渐变与任何暗色面。

视觉强度按页面分级（承重），**基准是文字密度而非页面类型**：**首页 / landing = 最强之一**（Persuade，要赢得注意与行动，贴纸 / 撞色 / 母题 / 大字全开）；设计系统 = 最强；项目 = 强；课程壳 = 中等；**博客正文 / 长文 = 最克制**（贴纸与母题退到 chrome，段落安静、端正、不歪）。强度分级不可反转。

整套视觉真相由令牌单一定义（DTCG JSON → Style Dictionary → 生成 CSS/TS）。业务代码只消费 `--sx-sys-*` / `--sx-article-*` / `--sx-comp-*`，不得硬编码品牌色、不得引用 `--sx-ref-*` 原语。CSS 分层；文章用 `:where()` 零特异性。

**Key Characteristics:**

- **单一 3px canonical 笔触**：所有主组件默认 `3px solid #000`（`--sx-sys-border-width-strong`）；2px（`--sx-sys-border-width`）仅作细分割/次级。border IS ornament——边框就是品牌信号与结构语言。
- **零模糊硬偏移影，四档**：`3px / 5px / 8px / 12px 0 #000`（`--sx-sys-shadow-sm/md/lg/xl`）。组件可局部覆盖 `--sx-sys-shadow-color` 做撞色偏移（黄/粉/蓝/绿）。
- **恒 0 圆角**：容器 / 卡片 / 控件 / 按钮 / 徽章一律直角，无例外（`--sx-sys-radius-*` 全 0）；仅状态 pill `9999px`、终端交通灯点 `50%`。
- **抬升式 hover**：hover → `translate(-2px, -2px)` + 影涨到 lg(8px)；active → `translate(3px, 3px)` + 影消（按下贴底）。0.1s ease。
- **撞色贴纸堆**：黄 `#FFDC58`（印泥）+ 蓝 `#2F5BEA`（可跳转/focus）+ neubrutalism 撞色（珊瑚粉 `#FF6B6B` / 天蓝 `#74B9FF` / 柔绿 `#88D498` / 橙 `#FFA552` / 薰衣草 `#B8A9FA`）。浅撞色一律配黑字保证对比度。
- **重磅大写 display**：Bricolage Grotesque 800，`clamp(2.5rem, 7vw, 4.5rem)`，`text-transform: uppercase`，紧字距 `-0.02em`，仅 hero / 页主标题。
- **贴纸可微旋、正文不歪**：戳记 / CTA / sticker 可 `±2°` 微旋；正文与标题端正。
- **永远不暗**：页面与阅读世界永远明亮；终端亦为浅色（退役暗屏）。
- **focus = sky 蓝描边**：`outline: 3px solid #74B9FF; outline-offset: 3px`（neubrutalism focus），不被装饰硬影吞掉。
- **瑞士网格骨架**：非对称比例列 + 模数 auto-fill 卡片格 + `--sx-ref-space-*` 纵向节奏；贴纸贴在网格交点上，±2° 微旋是唯一刻意的破格。

## neubrutalism 北极星速查（Cheat Sheet）

[neubrutalism.com](https://neubrutalism.com/) 的权威值——任何取舍冲突时回到这里：

| 维度 | 权威值 |
|---|---|
| Border | `3px solid #000`（单一 canonical 笔触） |
| Shadow | `5px 5px 0 0 #000`（默认），三档 3 / 5 / 8，hero 12 |
| Corner radius | `0`（恒直角） |
| Shadow blur | **Always zero. Always.** |
| Hover | 抬起 + 影涨（lift + grow shadow） |
| Active / Press | 按下 + 影消（press + kill shadow） |
| Min contrast | 4.5:1 正文（WCAG AA）/ 3:1 大字·UI 边界 |
| Palette | 一个中性底 + 一个深色描边 + 有限撞色；**无渐变** |
| The One Rule | 先搭标准 UX 骨架，再裹 neubrutalism token |

**Core philosophy：** explicitness over subtlety · personality over invisibility · memorable structure over perfect polish——"intentionally emphatic, not accidentally clumsy." Layout **broken but not random**：macro 不对称、micro 机械对齐；"一旦破坏干扰了理解，设计就从表达越界成破坏。"

## Colors

这套配色读作 **neubrutalism 撞色堆**：一个中性底（暖纸 + 白）+ 一个深色描边（黑墨）+ 一组高饱和撞色。黄是「印泥 / 马克笔」，蓝服务可跳转与 focus；珊瑚粉 / 天蓝 / 柔绿 / 橙 / 薰衣草是贴纸堆的撞色人格，在首页 / landing / bento 大胆并置，不进长文阅读流。

### Primary

- **Accent** (`#FFDC58`, `--sx-sys-color-accent`): 主操作色与贴纸高亮。主按钮、激活导航、徽章 accent、`<mark>`、sticker 黄底、马克笔高亮关键词。**长文**里单屏 ≤10%；**首页 / landing** 可更大胆。
- **Action** (`#2F5BEA`, `--sx-sys-color-action-primary`): 链接 hover、正文链接、blockquote 左边框、ticker 标语底。承载「可跳转」语义。

### Clashing Colors（neubrutalism 撞色人格）

- **Coral** (`#FF6B6B`, `--sx-sys-color-coral`): 珊瑚粉，贴纸 / 撞色卡 / 徽章强调（如 POST 徽、manifesto 色块、labFlow 步）。
- **Sky** (`#74B9FF`, `--sx-sys-color-sky`): 天蓝，**focus outline** 专用色 + 撞色卡 / 状态徽（如 project status、REDIRECT 步）。
- **Pop-green** (`#88D498`, `--sx-sys-color-pop-green`): 柔绿，贴纸 / 状态撞色（如 Design System 入口、manifesto 色块）。
- **Orange** (`#FFA552`, `--sx-sys-color-orange`): 橙，贴纸 / 强调。
- **Lavender** (`#B8A9FA`, `--sx-sys-color-lavender`): 薰衣草，罕见页边彩点。

撞色配**黑字**（ink）保证对比度 ≥3:1（large/bold text）；仅深色面（action 蓝、ink 黑）配白字。撞色活在首页 / landing / bento / 设计系统，**不进长文段落背景**。

### Secondary

- **Danger** (`#F9575C`, `--sx-sys-color-danger`): 危险 / 停用（删除、archived、终端红点）。
- **Success** (`#35AD68`, `--sx-sys-color-success`): 成功 / 完成（published、终端绿点）。

### Neutral

- **Paper** (`#FFFCF4`, `--sx-sys-color-bg-page`): 全站纸面。近白暖底，明亮到读作「白」但保留纸的触感。
- **Surface** (`#FFFFFF`, `--sx-sys-color-bg-surface`): 卡片 / 输入面，纯白。
- **Ink** (`#000000`, `--sx-sys-color-text-primary` / `--sx-sys-color-border`): 正文 + 边框 + 阴影色，身兼三职。
- **Text-soft** (`#6B6355`, `--sx-sys-color-text-soft`): 次要正文（暖灰）。
- **Text-muted** (`#666666`, `--sx-sys-color-text-muted`): 辅助 / 技术栈小字。
- **Beige** (`#EFE7D6`): planned 状态底色。**Gray-light** (`#CBCCC9`) / **Mint** (`#01FFCC`): 罕见页边彩点。

### 终端（浅色，无暗屏）

贴纸堆上一张浅色「设备窗口」贴纸：屏幕走 paper 近白底 + 墨字，签名是 **8px 黄偏移 + 黑描边双层硬影**（`--sx-comp-term-shadow`），与站点纯黑硬影区分。暗屏退役为可选 opt-in。

### Named Rules

**The neubrutalism-Clash Rule.** 首页 / landing / bento / 设计系统放开撞色（黄 + 珊瑚粉 + 天蓝 + 柔绿 + 橙），贴纸堆 personality 拉满；长文阅读流只走蓝黄白 + 墨。浅撞色一律黑字。

**The Reading-First Rule（仅长文）.** 长文配色决策先问：会不会伤害可读？会——退场，撞色、大面积 accent、Schema 母题让位给段落对比与安静。首页 / landing 不受此约束。

**The One Stamp Rule.** Accent 黄是整页唯一「印泥 / 马克笔」。长文里稀少即分量（单屏 ≤10%）；首页可更大胆。

**The Ink-Does-Triple-Duty Rule.** 同一个 `#000000` 是文字、边框、硬阴影。不为「丰富」引入第二种黑。

**The Never-Dark Rule.** 页面与阅读世界永远明亮；终端亦为浅色；任何 UI 面不得引入暗色填充（语义性 danger/success 小点除外）。

## Typography

**Display Font:** Bricolage Grotesque（回退 ui-sans-serif / system-ui）——**大写**，800，紧字距。
**Body Font:** Geist（回退 ui-sans-serif / system-ui / PingFang SC / Microsoft YaHei）。
**Mono Font:** Geist Mono（通用等宽）。
**UI Mono / Annotation:** `ui-monospace` 系统栈（`--sx-sys-font-family-mono-system`：nav / tag / terminal 标题 / 行内 code / `01 — Definition` 编号章节）。

`@fontsource` 自托管，仅实际字重；经 `--sx-sys-font-family-*` 落地。

**Character:** Bricolage 是封面大字——重、大写、稀少、有玩心，是贴纸堆的「喊话」声部；Geist 是正文与 UI 的安静中性面；等宽族是次要笔触——批注、路径、标签、行内 code、编号章节，给信息加技术注记。正文与标题左对齐（ragged-right）。

> **字体判断（POV）：** neubrutalism.com 用 Syne / Space Grotesk / Inter / Space Mono，但这些都落在 AI 训练数据默认里；Bricolage Grotesque 不在那批默认里、更有 POV，其 800 + uppercase + `-0.02em` 已能完整承载 neubrutalism display 张力，故保留不改。

### Hierarchy

- **Display** (Bricolage 800, `clamp(2.5rem, 7vw, 4.5rem)`, 1.05, `-0.02em`, **uppercase**): hero / 页面主标题 only。
- **H1** (Geist 800, 2.5rem, 1.1, `-0.02em`): 文章级主标题。
- **H2** (Geist 700, 2rem, 1.2, `-0.01em`): 章节。上 margin 4rem / 下 1.5rem。
- **H3** (Geist 700, 1.5rem, 1.25): 子章节。
- **H4** (Geist 700, 1.2rem): 小节。
- **Label (H5/H6)** (Geist 700, uppercase, `0.05em`–`0.08em`): 章节批注式小标题。
- **Body UI** (Geist 400, 1rem / 1.6): 界面文案。
- **Body Article** (Geist 400, 1.0625rem / 1.8): 长文；行宽 ≤46rem。
- **Mono** (Geist Mono / system mono, ~0.85rem / 1.65): 代码、导航、标签、内联 code/kbd、编号章节。

字号刻度（token）：xs 0.6875 · sm 0.75 · md 0.8125 · base 0.9 · lg 1 · reading 1.0625 · xl 1.2 · 2xl 1.5 · 3xl 2 · 4xl 2.5 rem；display sm/md/lg 为 clamp 三档。

### Named Rules

**The Display-Is-Rare Rule.** Bricolage 只用于 hero / 页主标题，重磅、大写、稀少。H1–H4 一律 Geist。

**The Quiet-Prose Rule.** 正文段落用 Geist，行高 1.8，最大阅读宽 46rem。不在段落里堆 uppercase 标签、大块 mono 装饰或彩底。

**The Body-Never-Tilts Rule.** 戳记 / CTA / sticker 可微旋 ±2°；正文、标题、列表、表格端正不歪。

**The Mono-Is-Annotation Rule.** 等宽 = 批注与数据：代码、终端、导航、tag、路径、`01 —` 编号。禁止把整段营销文案设成 mono。

## Layout

**容器宽度：** 页面 78rem · 阅读 46rem · 教程 68rem · 文档双栏总宽 87.5rem（侧栏 13.5rem + gap 10rem）。容器水平居中；左右 padding 默认 `space-6`（移动 `space-4`）。

**瑞士网格（International Typographic Style）：** 贴纸堆骨架是**非对称、有数学比例的网格**——neubrutalism 的 "broken but not random"：宏观不对称、微观机械对齐。三类：**非对称比例双栏**（hero `minmax(0,1.1fr) minmax(0,0.95fr)`、manifesto `1.4fr/0.6fr`、文档双栏 `13.5rem + 10rem + 1fr`）；**模数 auto-fill 卡片格**（`repeat(auto-fill, minmax(min(100%,18rem),1fr))`）；**缩进列**（`2.75rem minmax(0,1fr)`，编号 / TOC 标号柱）。贴纸贴在网格交点；±2° 微旋是唯一被允许的破格。纵向对齐 `--sx-ref-space-*`。

**节奏：** `--sx-ref-space-*`（0.25 → 6rem）。组内紧（`space-6`）、组间松（`space-12`）。标题上白大于下白。

**断点（token）：** sm 36rem · md 45rem · lg 48rem · xl 64rem · 2xl 82rem。

**Tailwind 桥接：** `src/styles/tailwind.css` 将 `--sx-*` 映射为 shadcn 名。不引入 Tailwind preflight。

### Named Rules

**The Grid-First Rule.** 布局先落网格，再放贴纸。禁止无网格的 ad-hoc 绝对定位堆叠。

**The Asymmetry-On-Grid Rule.** 列宽刻意不均，用比例制造编辑张力；macro 不对称、micro 机械对齐。

**The Baseline-Rhythm Rule.** 纵向间距对齐 `--sx-ref-space-*`。

**The Tilted-Sticker Rule.** 戳记 / CTA / sticker 微旋走 `--sx-sys-rotate-sticker`（左倾 -2°）。禁止正文 / 标题 / 表格 / 图片旋转。

**The Shell-vs-Prose Rule.** 课程壳、设计系统、首页 / landing 大胆（贴纸、撞色、母题全开）；只有 `.sx-article` 长文必须「静」。

## Elevation & Depth

深度 = **实体贴在纸上的接触影**，零模糊、纯黑偏移。阴影常在 resting 态；交互改**位置与影长**（抬升式）。

### Shadow Vocabulary

- **sm** (`3px 3px 0` 纯黑, `--sx-sys-shadow-sm`): 按钮、badge、卡片、内联 code/kbd、figure 的 resting。
- **md** (`5px 5px 0`, `--sx-sys-shadow-md`): 次级大卡 resting、正文表格。
- **lg** (`8px 8px 0`, `--sx-sys-shadow-lg`): 主大卡 resting / 抬升态 hover 影涨目标 / Demo 块。
- **xl** (`12px 12px 0`, `--sx-sys-shadow-xl`): hero 元素 / dialog。
- **terminal** (`8px 8px 0 #FFDC58, 8px 8px 0 1px #000`, `--sx-comp-term-shadow`): 黄偏移 + 黑描边双层，浅色终端设备签名。

### Motion（抬升式物理）

- **Lift（按钮 / interactive 卡片 hover）:** `translate(-2px, -2px)` + 阴影涨到 lg(8px) = 掀起。
- **Press（active 按下）:** `translate(3px, 3px)` + 阴影消失 = 按到底。
- **时长:** 0.1s ease；`prefers-reduced-motion` → 禁用 transform / animation（旋转退零）。
- **方向：** hover 抬起、active 按下——同一套材质两种手感，physical & satisfying。

### Named Rules

**The Contact-Not-Glow Rule.** 阴影永远 `offset 0 blur`、默认纯黑。禁止 blur / 半透明灰影。终端黄影是唯一彩色例外（撞色卡可局部覆盖 `--sx-sys-shadow-color` 做彩色偏移）。

**The Lift-Not-Press Rule.** hover = 抬起 + 影涨（不是按下）。只有 active 才按下贴底。这是 neubrutalism 的物理模型。

**The Motion-Is-Displacement Rule.** 状态反馈优先 `transform` + 影长，不靠透明度闪烁或渐变扫光。

**The No-Fake-Click Rule.** 只有可点的 interactive 卡片才抬起；静态卡不跳。

## Shapes

neubrutalism 的形：恒 0 圆角、硬边、3px 黑墨 canonical 笔触。贴纸感来自**硬边方戳并置 + 微旋 + 撞色**，不是圆润或随机涂鸦。

- **所有容器 / 卡片 / 按钮 / 输入 / badge / tag / sticker：** 圆角 0（`--sx-sys-radius-*` 全 0）。无 rounded 变体。
- **状态 pill：** 9999px（展示型胶囊，非 Badge 默认）。
- **终端交通灯点：** 50%。
- **边框：** **3px canonical**（`--sx-sys-border-width-strong`，所有主组件默认）；2px（`--sx-sys-border-width`）仅细分割 / 次级。永远 `#000`。

### Named Rules

**The Square-Default Rule.** 恒 0 圆角，无例外。2–16px 圆角不属于这套贴纸堆。

**The Border-Is-Ornament Rule.** 3px 黑框既是品牌信号也是结构语言——单一 canonical 笔触宽度，border 必须承载语义（container / interactive / focus / selected / error），否则去掉。

**The Border-Plus-Hard-Shadow Rule.** 3px 黑边 + 零模糊硬偏移影是签名；禁止「无边只漂影」或「硬影上再叠柔光」。

**The Sticker-Not-Scribble Rule.** 贴纸感 = 有意的硬边戳记系统（方角、微旋 ±2°、撞色、黑墨硬影、手作实体）+ 几何符号 icon（GeoMark：方块/圆/十字/箭头/方括号/线条 icon，硬边 2–3px 描边）。禁止随机 SVG 乱线、sketch-style 涂鸦、`feTurbulence` 颗粒、廉价贴纸素材。

## Components

组件 = props → 全局类（`.btn` / `.card` / `.badge` / `.tag` / `.nav__link` / `.term`，在 `src/styles/components.css`）。`.astro` 只做语义与变体映射。

### Buttons

可按压的实体键。**3px 黑边 + 0 圆角 + resting sm(3px) 影**；hover `translate(-2px,-2px)` + 影涨到 lg(8px)；active `translate(3px,3px)` + 影消。focus-visible：3px sky outline + offset 3px。disabled：opacity 0.4。transition 0.1s。

- **Primary:** 黄底墨字——印泥主操作。
- **Secondary:** 墨底白字。
- **Outline:** 白底墨字（常见默认）。
- **Danger:** 红底白字。
- **Ghost:** 透明无影；hover 仍抬起。
- **Sizes:** sm `0.3rem 0.7rem` / md `0.5rem 1rem` / lg `0.75rem 1.4rem`。

### Badges

盖歪也成立的方戳。**3px 黑边 + 0 圆角 + sm(3px) 硬影**、~0.7rem、weight 800、uppercase、0.04em 字距。变体：default 白 / accent 黄 / action 蓝底白字 / danger / success；首页可走撞色（coral / sky / pop-green）。

### Tags

等宽技术注记。3px 黑边、方角、paper 底、mono——比 Badge 更「页边铅笔」。

### Sticker / Stamp（签名）

贴纸堆的基本单元。硬边方戳（0 圆角）+ **3px 黑边** + resting 硬影 + **微旋 ±2°**（`--sx-sys-rotate-sticker`）。CTA、章节戳、状态印泥。黄底墨字为默认 accent 变体；亦可白底 / 墨底 / 撞色。hover 抬升 + 影涨。**只有 sticker / stamp / CTA 戳记可旋，正文不可。**

### Cards / Containers

硬纸板。方角、padding 1rem、resting sm/md。`shadow` none/sm/md/lg/xl；`shadowColor` 可局部覆盖（撞色偏移）。**仅 interactive** hover 抬升。

### Navigation

等宽 uppercase 批注导航。默认透明；hover / `aria-current` 整块黄底填充（无边无影）——像马克笔涂掉当前项。

### Terminal（浅色设备窗口）

贴纸堆上的设备窗口。标题栏 paper + 红黄绿点 + mono 标题；屏幕默认浅色（paper 近白底 + 墨字）。专属 8px 黄+黑描边双层硬影（`--sx-comp-term-shadow`）。暗屏退役为可选。被 `Command` 与 `HeroTerminal` 复用。

### GeoMark（几何符号 icon）

首页装饰与入口 icon 的几何语系（替代手绘涂鸦）。纯 SSR inline SVG（零 JS），32×32 viewBox，**3px 黑墨描边、hard edges（miter/square）**，局部蓝/黄/撞色实心填充。覆盖：star（四角几何星）/ spark（实心十字）/ arrow（粗几何箭头）/ brace（方括号）/ icon-course|blog|code|db（几何线条 icon）。接口兼容 DoodleMark。

### 阅读与课程壳（模式，非单一类名）

- **`.sx-article`:** 阅读感核心——字号 / 行高 / 标题呼吸 / 链接下划线 / blockquote 左边框 / 行内 code 小硬戳。端正不旋。
- **课程壳**（StepCard、SectionHead、Preview、DocPlayground）: 贴纸与互动的中场——允许更强边框、编号戳、舞台阴影、±2° 微旋；内部讲解短文仍服从 Quiet-Prose 与 Body-Never-Tilts。
- **Schema 母题**（`{}`、字段名、类型标签、required 星）: 仅品牌与设计系统；**禁止侵入长文**。

## Do's and Don'ts

### Do:

- **Do** 以 neubrutalism.com 为北极星：3px 黑框、零模糊硬影（3/5/8/12）、恒 0 圆角、抬升式 hover、撞色贴纸。
- **Do** 把 neubrutalism 当「主题层裹在常规交互骨架上」——先搭标准 UX 骨架，再裹 neubrutalism token（The One Rule）。
- **Do** 先保证阅读：46rem 柱、1.0625rem/1.8、对比足够，再叠加贴纸与粗野。密度来自信息，不来自视觉噪音。
- **Do** 用结构简单的调色板：一个中性底（暖纸 / 白）+ 一个深色描边（黑墨）+ 有限撞色；用颜色把面切成可辨的离散物件（categorical, not ambient）。
- **Do** 让 loud 服务层级：一套粗边、一种硬影行为、一个大写 display 刻度——最硬手势只留给这三处。每个对象都 loud = 什么都不 legible。
- **Do** 在首页 / landing / bento 放开撞色（黄 + 珊瑚粉 + 天蓝 + 柔绿 + 橙），浅撞色配黑字。
- **Do** display 用 impact face（Bricolage grotesque、800、紧字距、uppercase），正文用 utility face（Geist、高可读、宽行高）——loud 在 scale 与 weight，不在 letterform；大字 vs 平静正文 的对比就是排版技巧本身。
- **Do** 早验证 WCAG：设计期就强制对比，勿上线后补；每对撞色组合都测。
- **Do** 用 `--sx-sys-*` / `--sx-article-*` / `--sx-comp-*`，间距落 `--sx-ref-space-*`，微旋走 `--sx-sys-rotate-sticker`。
- **Do** hover 抬起 + 影涨、active 按下贴底——`transform` + 硬影，0.1s，尊重 reduced-motion。
- **Do** focus 用 3px sky 蓝描边 + offset 3px（不被装饰硬影吞）。
- **Do** 设计系统页读取令牌生成产物，不手抄色值。

### Don't:

- **Don't** 用渐变——平涂（flat fill）是 neubrutalism 的语法。
- **Don't** 给阴影加 blur 或 rgba 柔光（终端黄影 / 撞色硬影除外，仍零模糊）。
- **Don't** 给任何元素圆角（2–16px 一律禁止）；仅 pill 9999px、终端圆点 50%。
- **Don't** 用细于 3px 的边框作主组件轮廓；2px 只作细分割。
- **Don't** 让每个组件都在最大饱和度竞争——hierarchy 会塌。
- **Don't** 把 loud 等同 accessible：黄 on 白失败、粉 on 橙失败、中色调都失败 WCAG（见 Accessibility）。
- **Don't** 只靠颜色传达状态或意义（WCAG 1.4.1）——撞色实验增加 color-only 风险，状态必须配文字 / 图标 / 边框差异。
- **Don't** 让整个排版系统同一音量喊叫；loud 只给 display / hero / CTA。
- **Don't** 用花体或装饰字体——loud 在 scale 不在 letterform；不为审美一致牺牲正文可读。
- **Don't** 用粗边框假装大点击区——视觉体积 ≠ 实际 hit area，验证真实 padding ≥ 24×24（WCAG 2.5.8）。
- **Don't** 用装饰硬影吞掉键盘 focus——focus 用 outline-offset 落在硬影之外。
- **Don't** 让正文 / 标题 / 表格 / 图片倾斜；微旋只属于 sticker / 戳记 / CTA。
- **Don't** 用贴纸、bento 彩块或 Schema 花括号打断长文段落流。
- **Don't** 让静态卡片 hover 抬起，制造假可点。
- **Don't** 把撞色铺进长文阅读流；撞色只活在首页 / landing / bento / 设计系统。
- **Don't** 在信息密集的仪表盘 / 表单 / 交易流用全套 neubrutalism——那里要常规交互模式（neubrutalism 是品牌获取层，不是信任默认层）。
- **Don't** 用手绘涂鸦 / sketch-style SVG / `feTurbulence` 颗粒 / 廉价贴纸素材冒充贴纸感——贴纸 = 硬边几何戳记 + 微旋 + 撞色 + 手作实体。装饰 icon 走 GeoMark 几何语系。
- **Don't** 引入 Tailwind preflight 或第二个 UI 框架。
- **Don't** 把单页 surface brief 的实验配色写成全站规则；全局以本文件为准。

## Accessibility（neubrutalism 失败模式）

neubrutalism 的 loud 调色板 ≠ 自动合规。北极星列出的常见失败模式（须主动规避）：

- **对比度失败（WCAG 1.4.3）**：黄 on 白、粉 on 橙、中色调组合都过不了 4.5:1（正文）/ 3:1（大字·UI 边界 1.4.11）。**每对撞色组合都测**。本系统规则：浅撞色（黄 / 珊瑚粉 / 天蓝 / 柔绿 / 橙）一律配黑字（ink）；仅深色面（action 蓝、ink 黑）配白字。
- **只用颜色传达状态（WCAG 1.4.1）**：撞色实验增加 color-only 风险——状态必须配文字 / 图标 / 边框差异，不能仅靠色。
- **假点击区（WCAG 2.5.8）**：3px 粗边暗示比实际更大的 target——验证真实 padding ≥ 24×24。
- **focus 被吞（WCAG 2.4.7）**：装饰硬影会盖住键盘 focus——focus 用 `outline: 3px solid sky; outline-offset: 3px`，落在硬影之外。

**Sector guidance（克制强度）**：首页 / landing / 作品集 = 最佳（品牌获取、差异化、personality）；课程壳 / 设计系统 = 强；博客正文 / 长文 / 仪表盘 / 表单 / 交易流 = 克制（认知负荷已高，要常规交互）；银行 / 医疗 / 政务 = 避免或重度克制（信任靠平静常规的专业感）。
