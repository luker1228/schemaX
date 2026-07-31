# AGENTS.md

> **语言约定（最高优先级）：始终用中文回答用户。** 无论问题用什么语言提出，所有回复、解释、计划、注释说明都必须使用中文。技术标识符（命令名、文件路径、API 名称、配置项）保留英文原文，但围绕它们的说明文字必须用中文。

本文件为 Codex (Codex.ai/code) 在本仓库中工作时提供指引。

## 项目状态：脚手架已就位 / 规范驱动

本仓库的 `init.md`（以中文撰写）是整站**权威、完整的规范**。在做任何实现工作之前，**务必先阅读它**；下文所有内容均派生自该规范，章节号也指向它。Astro 7 + React 19 + TS + Tailwind 的工程脚手架已搭建完成（见 `package.json`），基础令牌系统、首页、设计系统展示页均已可运行。

SchemaX 是一个静态的、内容优先的个人知识与作品平台（首页、课程、博客、项目、设计系统）。它是 **Schema 驱动（Schema-driven）** 的：站点自身的内容、设计令牌（design tokens）、组件契约以及消息格式都由 schema 定义，并在构建时校验。

## 目标技术栈（规范 §6）

Astro 7.x · React 19 · TypeScript（严格模式）· MDX · Astro Content Collections（使用 Content Layer 的 `glob`/`file` 加载器）· Expressive Code · Pagefind · Style Dictionary（DTCG JSON 令牌）· 原生 CSS + Tailwind v4（token 桥接）· pnpm · 静态输出。

V1 **只使用** Astro + React + MDX + TS + 原生 CSS/Tailwind，单仓库（非 monorepo）。**单一 island 框架固定为 React**（不引入第二个 UI 框架）、数据库、鉴权、CMS、运行时远程 MDX 或评论系统 —— 见规范 §25 非目标。

## 命令（规范 §24 —— 脚手架已实现）

以下脚本契约由规范规定，已在 `package.json` 落地。请使用这些**完全一致**的名称：

- `pnpm dev` —— Astro 开发服务器（`predev` 钩子会先跑 `tokens:build`）
- `pnpm tokens:build` —— Style Dictionary → `src/styles/generated/tokens.css` / `src/generated/tokens.ts`
- `pnpm content:check` —— 依据集合 schema 校验 frontmatter（`scripts/validate-content.ts`）
- `pnpm github:sync` —— 拉取仓库数据到 `src/generated/github.json`（`scripts/sync-github.ts`）
- `pnpm search:build` —— `pagefind --site dist`（在 **`astro build` 之后**运行）
- `pnpm build` —— 完整链路：`tokens:build && content:check && astro check && astro build && search:build`
- `pnpm test` / `pnpm test:e2e` —— Vitest / Playwright
- `pnpm lint` —— `lint:eslint && lint:css`（ESLint 9 flat config + Stylelint 16，含 §17 token 约束）
- `pnpm lint:fix` —— 自动修复可修的 lint 问题
- `pnpm format` / `pnpm format:check` —— Prettier（含 astro 插件）
- `pnpm gen:component <Name>` —— **设计系统组件脚手架**（详见下文「设计系统组件工作流」）
- `pnpm check` —— `lint && test && build`

**构建顺序是承重设计（load-bearing）**：令牌 → 内容校验 → `astro check` → `astro build` → Pagefind 索引。令牌 CSS 与内容校验必须在 Astro 构建之前成功完成；Pagefind 仅对已构建的 `dist/` 建立索引。GitHub 同步写入的是构建期消费的缓存 JSON，绝不在运行时被请求。

**lint 三层体系已就位**：ESLint 9（flat config，覆盖 .ts/.astro/.tsx）+ Stylelint 16（含 §17 token 约束：禁裸 hex、强制 `--sx-*` 前缀、color/background 只能用 `var()`，生成产物豁免）+ Prettier 3。三者协作：Prettier 管格式，ESLint/Stylelint 管代码质量与 token 约束，由 `eslint-config-prettier` 解耦冲突规则。

## 设计系统组件工作流（承重约定）

设计系统页面 `/design-system/components` 是**数据驱动**的，新增组件必须走脚手架流程，**不要手写组件文件、不要手改展示页**。

**一键生成组件：**

```bash
pnpm gen:component Button 主要、次要、幽灵、强调变体。
# 或交互式：pnpm gen:component（在 TTY 下依次问名称/标题/描述）
```

一条命令完成三件事：

1. 生成 `src/components/design-system/<Name>.astro` —— 组件本体（带 lint 安全的最小模板）
2. 生成 `src/components/design-system/demos/<Name>Demo.astro` —— 展示页演示（已用 `<Demo>` 组件封装）
3. 更新 `src/data/components-registry.ts` —— 把对应条目标记为 `live`（或更新已有 `planned` 条目）

**数据驱动机制（无需改展示页）：**

- `src/data/components-registry.ts` 是组件清单（`name` / `title` / `description` / `status: 'live' | 'planned'`）
- `src/pages/design-system/components.astro` 用 `import.meta.glob('../../components/design-system/demos/*Demo.astro')` **自动捕获**所有 demo 文件
- `status: 'live'` 的条目自动渲染演示；`planned` 的显示占位卡片（含对应的 `pnpm gen:component <Name>` 命令提示）
- 新增 demo 文件后**刷新即生效**，展示页代码不动

**`<Demo>` 组件是展示块的唯一封装（src/components/design-system/Demo.astro）：**

```astro
<Demo label="默认态" attr='variant="primary"' stageClass="wrap">
  <!-- 默认 slot：演示舞台内容 -->
  <Button variant="primary">Primary</Button>
  <!-- named slot "note"：折叠说明，默认收起 -->
  <Fragment slot="note">
    <p>说明文字...</p>
  </Fragment>
</Demo>
```

- `Demo` 封装了头部（label + attr 代码）+ 舞台 + 折叠说明（原生 `<details>`，零 JS）
- `stageClass`：`'wrap'`（换行排列）/ `'align'`（底对齐）/ 不传（居中）
- **禁止**在 Demo 文件里手写 `<div class="demo">` / `<details class="demo__details">` 等结构 —— 一律用 `<Demo>` 组件

## 课程讲解 / 展示样式（承重约定）

**核心：课程里做讲解和视觉展示的「装修层」，大部分用设计系统组件 + Tailwind（shadcn 工作流），不要手写大段 inline style。**

本仓库尚未安装 npm 版 `shadcn/ui` 源码包，但已按 shadcn 方式接线：

- **组件**：`src/components/design-system/*`（`Card` / `Button` / `Badge` 等）—— 课程 MDX 里演示 UI 时优先 import 这些
- **工具类**：Tailwind v4 + `src/styles/tailwind.css` 的 token 桥接（`bg-primary` / `text-ink` / `shadow-brutal-md` 等 shadcn 标准色名）
- **课程壳**：`src/components/course/*`（`StepCard` / `Preview` / `Note` / `Takeaway`）只负责教学版式，舞台内容里的按钮、卡片、标签走设计系统

| 场景 | 做法 |
|------|------|
| 展示「装修后长什么样」 | `<Card>` + `<Button>` + `<Badge>` + 少量 Tailwind 布局类 |
| 展示「只有骨架」 | 裸 HTML（`h1` / `ul` / `a`），**不要**套 Card/Button |
| 专讲某条 CSS 属性（如 `font-size`） | 可在该练习里用 inline / 最小样式，但整页 UI 仍优先组件 |
| 禁止 | 用一长串 `style="padding:…;background:…;border:…"` 手搓整卡视觉 |

示例（导览课「小店装修」）：

```astro
import Card from '../../components/design-system/Card.astro';
import Button from '../../components/design-system/Button.astro';
import Badge from '../../components/design-system/Badge.astro';

<Preview label="骨架 + 装修后">
  <Card shadow="md" class="mx-auto flex max-w-sm flex-col gap-3.5 bg-primary">
    <Badge>今日上架</Badge>
    <h1 class="m-0 text-2xl font-bold">邻里小卖部</h1>
    <Button variant="outline" size="sm">购买</Button>
  </Card>
</Preview>
```

## 架构：承重原则

以下贯穿全局的决策约束着每一个实现选择：

**渲染 —— 静态 / 零 JS 优先（§6.3、§23）。** 默认服务器渲染为 HTML。**仅当**某个组件必须在浏览器中改变状态时（搜索、主题切换、代码标签页、复制按钮、Playground、配置器），才使用 React Island。规则是：_展示 → Astro；浏览器状态 → React `client:*` island。_ 博客 / 课程的阅读页必须近乎零客户端 JS。

**Schema 优先，而非 Schema 泛滥（§7）。** 仅在系统边界处添加 schema：

- 内部静态逻辑 → 仅用 TS 类型
- 构建期内容 → Zod / Content Collection schema
- 外部 API 数据（GitHub）→ 运行时 schema 校验
- 跨窗口通信（Playground `postMessage`）→ 消息 schema
- 设计令牌 → DTCG JSON 令牌 schema
  不要为了品牌理由在普通代码中到处散布运行时 schema。

**设计令牌是视觉真相的唯一来源（§15–17）。** 以 DTCG JSON 在 `tokens/src/` 中编写，由 Style Dictionary 构建，全局**仅导入一次**。强制规则：

- 业务代码**不得**引用 `--sx-ref-*` 原语 —— 应使用 `--sx-sys-*` / `--sx-article-*` / `--sx-comp-*`。
- 永远不要硬编码品牌色。一个组件只能覆盖自身的 `--sx-comp-*`。
- 设计系统页面（`/design-system/tokens`）必须读取**生成产物**，而非手工拷贝的文档。
- CSS 是分层的：`@layer reset, tokens, base, layout, article, components, utilities, overrides;`。文章正文使用低特异性 `:where()` 选择器，以便组件 / overrides 能干净地胜出。

**内容模型（§8–10）。** 五个 Content Collection：`posts`、`courses`、`lessons`、`projects`、`topics`，均由 `src/content.config.ts` 中共享的 `commonFields` 组合而成。治理规则：`id` = 永久身份，`slug` = URL（英文小写、连字符、不含日期 / 随机串）。`draft` 状态在生产构建中被排除。已发布的 URL 永不删除 —— 通过 `src/config/redirects.ts` 重定向。

**代码展示（§12）。** 静态代码块使用 Expressive Code。`CodeCompare` / `CodePreview` / `Playground` 是交互式变体。Playground 在沙盒 iframe 中运行用户的 HTML/CSS/JS（`sandbox="allow-scripts"` **仅此一项** —— 不含 `allow-same-origin`、顶部导航或弹窗）；父窗口 ↔ iframe 通过带校验的 `postMessage` 通信，使用 `PlaygroundMessage` schema。

**GitHub 数据（§19）。** 仅构建期，写入 `src/generated/github.json`；API 失败时回退到缓存文件。本地内容（叙述、状态、排序）是权威来源 —— GitHub 数据绝不决定一个项目是否出现。

## 设计语言（§14，已锁定）

SchemaX 的 UI 是 RetroUI / 新粗野主义（Neo-brutalist）风格。当前已锁定的视觉基线（参考 `retroui.dev.md` / `retroui.dev.json`）：

- **配色**：暖纸背景 `#FFF7E8`（paper）+ 纯黑墨 `#000000`（ink/border）+ 亮黄强调 `#FFDC58`（accent，唯一主操作色）+ 蓝 `#2f5bea`（action，交互态与图标品牌线色）+ 红 `#f9575c`（danger）+ 绿 `#35ad68`（success）
- **边框**：全站统一 `1px`（`--sx-sys-border-width`，业务代码必须引用此 token）
- **圆角**：卡片/容器默认 `0`（`--sx-sys-radius-sm`）；按钮 `2px`；仅 pill 用 `9999px`
- **阴影**：纯黑硬阴影无模糊，三档 `2px / 3px / 4px 0 #000`（`--sx-sys-shadow-sm/md/lg`）
- **字体**：系统字体栈（暂不加载网络字体）
- **交互**：按钮 hover 是「按下」感（向右下位移 2px + 阴影消失），非「飘起」

Schema 主题的视觉母题（花括号、字段名、类型标签、`required` 星号、网格 / 节点连接器）属于品牌和设计系统区域，**不得侵入长篇阅读空间**。视觉强度按页面分级（设计系统 = 最强；博客正文 = 最克制）。

## 实现时

- 规范中的目录布局（§21）、内容 schema（§8–9）、完整 `content.config.ts`（§9）以及令牌取值（§15）都是**规定性的** —— 请遵循它们，而不要自创新名称 / 枚举 / 路由。
- 实现顺序见 §26（基础 → 内容 → 交互 → 设计系统 → 质量）；V1 验收标准在 §27。
