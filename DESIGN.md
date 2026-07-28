---
name: SchemaX UI
description: 页边有涂鸦的暖纸手册——阅读优先，实体可按，粗黑边框，全局批注气质。
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
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
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

**Creative North Star: "The Marginal Sketchbook"**

SchemaX UI 是一本**页边写满批注的暖纸速写本**——中间是安静、耐久的阅读，四周是可按压的实体控件与等宽「涂鸦」注记。它不是精修画册，也不是中性 SaaS 后台；它像被反复翻开的工程师现场本：纸面发暖、墨线硬直、印章盖歪一点也无妨，但正文永远保持可读。

**四柱承重（优先级固定）：**

1. **阅读感（第一）** —— 长文与课程正文永远安静：宽行距、克制色、Schema 母题退场。任何涂鸦、粗野或互动都不得压过「能读完」这件事。
2. **互动感** —— 界面是有重量的实体：按钮按下贴底、卡片抬起加深影。反馈靠位移与影长，不靠发光或漂浮。
3. **涂鸦感** —— 全站气质：等宽批注、方角戳记、黄高亮「马克笔」、页眉/课程壳/控件上的手作痕迹。它是**全局气氛**，但在正文段落里只以最轻的形式出现（`code` 小戳、`mark` 高亮、链接下划线）。
4. **新粗野主义** —— 粗黑边、无模糊硬阴影、几乎无圆角、纸墨二元。材质诚实，拒绝玻璃拟态与弥散光晕。

视觉强度按页面分级（承重）：设计系统 = 最强（母题 + 涂鸦全开）；首页 / 项目 = 强；课程壳（StepCard / SectionHead / 互动件）= 中等偏涂鸦；**博客正文 = 最克制**（涂鸦退到 chrome 与组件，段落本身安静）。

整套视觉真相由令牌单一定义（DTCG JSON → Style Dictionary → 生成 CSS/TS）。业务代码只消费 `--sx-sys-*` / `--sx-article-*` / `--sx-comp-*`，不得硬编码品牌色、不得引用 `--sx-ref-*` 原语。CSS 九层：`reset, tokens, theme, base, layout, article, components, utilities, overrides`；文章用 `:where()` 零特异性。

**Key Characteristics:**

- **阅读优先的暖纸本**：`#FFF7E8` 纸 + `#000000` 墨；正文 1.0625rem / 1.8、行宽 ≤46rem。
- **页边涂鸦语言**：等宽标签、uppercase 戳记、黄底激活块、`code` 小硬边框——像页边手写，不是插画噪点。
- **实体可按可抬**：按钮 hover 右下 2px 贴底；interactive 卡片左上 3px 抬起 + 影升级。
- **硬阴影无模糊**：2 / 4 / 6px 纯黑偏移（终端黄影是唯一彩色例外）。
- **几乎无圆角**：容器 0、控件 2px、仅状态 pill 9999px。
- **粗细两档边框**：1px 默认，2px 强调（大卡 / pill / 终端）。

## Colors

纸墨二元是底盘；黄是唯一「印泥 / 马克笔」；蓝只服务可跳转与焦点。装饰色是页边彩铅，不进正文流。

### Primary

- **Accent** (`#FFDC58`, `--sx-sys-color-accent`): 唯一主操作色与涂鸦高亮。主按钮、激活导航、表头、`<mark>`、徽章 accent。单屏占用 ≤10%——它的稀少就是分量。在涂鸦语言里，它像马克笔划过的一笔，不是大面积墙漆。
- **Action** (`#2F5BEA`, `--sx-sys-color-action-primary`): 链接 hover/focus、全局 focus 描边、正文链接、blockquote 左边框。只承载「可跳转 / 可聚焦」，不作大面积填充。

### Secondary

- **Danger** (`#F9575C`, `--sx-sys-color-danger`): 危险 / 停用（删除、archived、终端红点）。
- **Success** (`#35AD68`, `--sx-sys-color-success`): 成功 / 完成（published、终端绿点）。

### Tertiary（装饰 / 页边彩铅）

- **Mint** (`#01FFCC`, `--sx-sys-color-mint`)
- **Lavender** (`#C7B7FF`, `--sx-sys-color-lavender`)
- **Beige** (`#EFE7D6`, `--sx-sys-color-beige`): 亦作 planned 状态底色。
- **Gray-light** (`#CBCCC9`, `--sx-sys-color-gray-light`)

仅用于品牌区、首页 bento、状态语义与课程壳的轻强调——**不得铺进博客段落背景**。

### Neutral

- **Paper** (`#FFF7E8`, `--sx-sys-color-bg-page`): 全站纸面。
- **Surface** (`#FFFFFF`, `--sx-sys-color-bg-surface`): 浮在纸上的卡片 / 输入面。
- **Ink** (`#000000`, `--sx-sys-color-text-primary` / `--sx-sys-color-border`): 正文 + 边框 + 阴影色，身兼三职。
- **Text-soft** (`#6B6355`, `--sx-sys-color-text-soft`): 次要正文（暖灰）。
- **Text-muted** (`#666666`, `--sx-sys-color-text-muted`): 辅助 / 技术栈小字。

### 终端子系统（暗色内嵌）

终端是速写本上贴着的「黑屏设备」：`terminal-bg #0F1115` / surface `#161A20` / elevated `#1B1F26` / border `#2A2F37` / text `#E6E6E6` / muted `#9AA0A6`，IBM Plex Mono。有意从暖纸世界切开。

### Named Rules

**The Reading-First Rule.** 配色决策先问：会不会伤害长文可读？会——退场。装饰色、大面积 accent、Schema 母题一律让位给段落对比与安静。

**The One Stamp Rule.** Accent 黄是整页唯一「印泥 / 马克笔」——主操作与激活态，单屏 ≤10%。当背景大面积铺就变成马戏团，不再是批注。

**The Ink-Does-Triple-Duty Rule.** 同一个 `#000000` 是文字、边框、硬阴影。不为「丰富」引入第二种黑。

**The Decorative-Only Rule.** Mint / Lavender / Beige / Gray-light 是页边彩铅，只活在品牌、bento、状态与课程壳，不进正文阅读路径。

## Typography

**Display Font:** Bricolage Grotesque（回退 ui-sans-serif / system-ui）  
**Body Font:** Geist（回退 ui-sans-serif / system-ui / PingFang SC / Microsoft YaHei）  
**Mono Font:** Geist Mono（通用等宽）  
**UI Mono / Annotation:** `ui-monospace` 系统栈（`--sx-sys-font-family-mono-system`：nav / tag / terminal 标题 / 行内 code）  
**Terminal Font:** IBM Plex Mono（终端屏幕专用）

`@fontsource` 自托管，仅实际字重；经 `--sx-sys-font-family-*` 落地。

**Character:** Bricolage 是封面大字——重、稀少；Geist 是正文与 UI 的安静中性面，扛起阅读感；等宽族是涂鸦感的主声部——页边批注、路径、测量、导航戳，而不是给普通句子「装技术感」。

### Hierarchy

- **Display** (Bricolage 800, `clamp(2.5rem, 7vw, 4.5rem)`, 1.05, `-0.02em`): hero / 页面主标题 only。
- **H1** (Geist 800, 2.5rem, 1.1, `-0.02em`): 文章级主标题。
- **H2** (Geist 700, 2rem, 1.2, `-0.01em`): 章节。上 margin 4rem / 下 1.5rem——标题上方多呼吸。
- **H3** (Geist 700, 1.5rem, 1.25): 子章节。
- **H4** (Geist 700, 1.2rem): 小节。
- **Label (H5/H6)** (Geist 700, uppercase, `0.05em`–`0.08em`): 章节批注式小标题；H6 可略透明作次级。
- **Body UI** (Geist 400, 1rem / 1.6): 界面文案。
- **Body Article** (Geist 400, 1.0625rem / 1.8): 长文；行宽 ≤46rem（阅读）/ 教程主区可放宽至 68rem 容器逻辑。
- **Mono** (Geist Mono / system mono, ~0.85rem / 1.65): 代码、导航、标签、内联 code/kbd。

字号刻度（token）：xs 0.6875 · sm 0.75 · md 0.8125 · base 0.9 · lg 1 · reading 1.0625 · xl 1.2 · 2xl 1.5 · 3xl 2 · 4xl 2.5 rem；display sm/md/lg 为 clamp 三档。

### Named Rules

**The Quiet-Prose Rule.** 正文段落用 Geist，行高 1.8，最大阅读宽 46rem。不在段落里堆 uppercase 标签、大块 mono 装饰或彩底——涂鸦停在 chrome、壳与组件。

**The Mono-Is-Annotation Rule.** 等宽 = 批注与数据：代码、终端、导航、tag、路径、测量。禁止把整段营销文案设成 mono「装手账」。

**The Display-Is-Rare Rule.** Bricolage 只用于 hero / 页主标题。H1–H4 一律 Geist。稀缺即封面。

## Layout

**容器宽度：** 页面 78rem（`--sx-layout-width-page`）· 阅读 46rem（`--sx-article-width-reading`）· 教程 68rem（`--sx-article-width-tutorial`）· 文档双栏总宽 87.5rem（侧栏 13.5rem + gap 10rem）。容器水平居中；左右 padding 默认 `space-6`（移动端 `space-4`）。

**节奏：** `--sx-ref-space-*` 四单位基底（0.25 → 6rem）。组内紧（常 `space-6`）、组间松（常 `space-12`）。标题上白大于下白。

**涂鸦落点（布局层）：** 页眉、侧栏目录、课程 Step 壳、Demo 舞台、卡片网格——允许更强的硬边与戳记。**主阅读柱（`.sx-article` 段落流）保持单一栏、稳定节奏、无装饰层叠。**

**断点（token）：** sm 36rem · md 45rem · lg 48rem · xl 64rem · 2xl 82rem。文档双栏约 ≤1024px 折为单栏；大屏装饰（如设计系统侧板）可到 2xl 再显。

**Tailwind 桥接：** `src/styles/tailwind.css` 将 `--sx-*` 映射为 shadcn 名（`bg-primary`=黄、`text-ink`、`shadow-brutal-*` 等）。**不引入 Tailwind preflight**——reset 归 `reset.css`。

### Named Rules

**The Reading-Column Rule.** 博客 / 长文主柱 ≤46rem；教程可更宽以容纳对比与 playground，但讲解段落仍按阅读节奏排，不把整页拉成仪表盘。

**The Scale-Not-Ad-Hoc Rule.** 间距只用 `--sx-ref-space-*`，禁止 `1.375rem` 类脱刻度值。

**The Shell-vs-Prose Rule.** 课程壳、设计系统、首页可以「吵」；`.sx-article` 里的 p/h/list 必须「静」。强度分级不可反转。

## Elevation & Depth

深度 = **实体贴在纸上的接触影**，不是弥散光。阴影常在 resting 态；交互改**位置与影长**。

### Shadow Vocabulary

- **sm** (`2px 2px 0` 纯黑, `--sx-sys-shadow-sm`): 按钮、卡片、内联 code/kbd、figure 的 resting。
- **md** (`4px 4px 0`, `--sx-sys-shadow-md`): interactive 卡片 hover、正文表格。
- **lg** (`6px 6px 0`, `--sx-sys-shadow-lg`): Demo 块、首页大卡。
- **terminal** (`6px 6px 0 #FFDC58, 6px 6px 0 1px #000`, `--sx-comp-term-shadow`): 黄偏移 + 黑描边，设备感。

### Motion（互动感的物理）

- **Press（按钮）:** hover/active → `translate(2px, 2px)` + 阴影消失 = 按到底。
- **Lift（interactive 卡片）:** hover → `translate(-3px, -3px)` + 阴影升 md = 掀起纸板。
- **时长:** 120ms ease；`prefers-reduced-motion` → ~0.01ms。
- **方向故意相反：** 按下 vs 抬起——同一套材质，两种手感。

### Named Rules

**The Contact-Not-Glow Rule.** 阴影永远 `offset 0 blur`、默认纯黑。禁止 blur / 半透明灰影。终端黄影是唯一彩色例外。

**The Motion-Is-Displacement Rule.** 状态反馈优先 `transform` + 影长，不靠透明度闪烁或渐变扫光。

**The No-Fake-Click Rule.** 只有可点的 interactive 卡片才抬起；静态卡不跳——避免「看起来能点却不能点」。

## Shapes

新粗野主义的形：方角、硬边、可辨的纸切边缘。涂鸦感来自**戳记与批注的并置**，不是圆润贴纸风。

- **容器 / 卡片默认：** 圆角 0（`--sx-sys-radius-sm`）。`rounded` 变体 2px。
- **按钮 / 输入 / kbd：** 2px（`--sx-sys-radius-control`）。
- **Badge / Tag：** 0——盖上去的方戳。
- **状态 pill：** 9999px（展示型胶囊，非全局 Badge 默认）。
- **终端交通灯点：** 50%。
- **边框：** 1px 默认；2px strong（首页大卡、pill、终端强调）。

### Named Rules

**The Square-Default Rule.** 默认方角。8–16px 圆角不属于这本速写本。

**The Border-Plus-Hard-Shadow Rule.** 1–2px 黑边 + 硬偏移影是签名；禁止「无边只漂影」或「硬影上再叠柔光」。

**The Doodle-Is-Not-Scribble-Chaos Rule.** 涂鸦感 = 有意的批注系统（等宽、戳记、马克笔黄、硬纸实体），不是随机 SVG 乱线铺满正文。若加手绘装饰，只放在品牌 / 课程壳 / 设计系统，且不得降低正文对比。

## Components

组件 = props → 全局类（`.btn` / `.card` / `.badge` / `.tag` / `.nav__link` / `.term`，在 `src/styles/components.css`）。`.astro` 只做语义与变体映射。

### Buttons

可按压的实体键。1px 黑边 + 2px 圆角 + resting sm 影；hover/active 右下 2px、影消失。focus-visible：1px action、offset 2px。disabled：opacity 0.4。

- **Primary:** 黄底墨字——印泥主操作。
- **Secondary:** 墨底白字。
- **Outline:** 白底墨字（常见默认）。
- **Danger:** 红底白字。
- **Ghost:** 透明无影；hover 仍按下（Hero 等）。
- **Sizes:** sm `0.3rem 0.7rem` / md `0.5rem 1rem` / lg `0.75rem 1.4rem`。

### Badges

盖歪也成立的方戳。0 圆角、~0.7rem、weight 800、uppercase、0.04em 字距。变体：default 白 / accent 黄 / action 蓝底白字 / danger / success。

### Tags

等宽技术注记。1px 黑边、方角、paper 底、mono——比 Badge 更「页边铅笔」。

### Cards / Containers

硬纸板。默认方角、padding 1rem、resting sm。`shadow` none/sm/md/lg；`shadowColor` 可局部覆盖（如黄偏移）。**仅 interactive** hover 抬起。

### Navigation

等宽 uppercase 批注导航。默认透明；hover / `aria-current` 整块黄底填充（无边无影）——像马克笔涂掉当前项。

### Terminal（签名）

速写本上的设备窗口。标题栏暖纸 + 红黄绿点 + mono 标题；屏幕 light（纸底）/ dark（`#0F1115`）。专属黄硬影。被 `Command` 与 `HeroTerminal` 复用。

### 阅读与课程壳（模式，非单一类名）

- **`.sx-article`:** 阅读感核心——字号 / 行高 / 标题呼吸 / 链接下划线 / blockquote 左边框 / 行内 code 小硬戳。
- **课程壳**（StepCard、SectionHead、Preview、DocPlayground）: 涂鸦与互动的中场——允许更强边框、编号戳、舞台阴影；内部讲解短文仍服从 Quiet-Prose。
- **Schema 母题**（`{}`、字段名、类型标签、required 星）: 仅品牌与设计系统；**禁止侵入长文**。

## Do's and Don'ts

### Do:

- **Do** 先保证阅读：46rem 柱、1.0625rem/1.8、对比足够，再叠加涂鸦与粗野。
- **Do** 用 `--sx-sys-*` / `--sx-article-*` / `--sx-comp-*`，间距落在 `--sx-ref-space-*`。
- **Do** 按钮按下、卡片抬起——`transform` + 硬影，120ms，尊重 reduced-motion。
- **Do** 把涂鸦语言用在 chrome / 壳 / 戳记 / 等宽批注；正文保持 Geist 安静。
- **Do** 按页面分级：设计系统最吵，博客正文最静。
- **Do** 设计系统页读取令牌生成产物，不手抄色值。

### Don't:

- **Don't** 用涂鸦、bento 彩块或 Schema 花括号打断长文段落流。
- **Don't** 给阴影加 blur 或 rgba 柔光；终端黄影除外。
- **Don't** 给卡片默认 8–16px 圆角。
- **Don't** 把 Accent 黄当大面积背景（单屏 ≤10%）。
- **Don't** 让静态卡片 hover 抬起，制造假可点。
- **Don't** 引入 Tailwind preflight 或第二个 UI 框架。
- **Don't** 把单页 surface brief 的实验配色写成全站规则；全局以本文件为准。
- **Don't** 用随机乱线 / 廉价贴纸风冒充「涂鸦感」——涂鸦 = 批注系统 + 手作实体，不是噪音层。
