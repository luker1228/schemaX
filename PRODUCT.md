# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**首要读者（已确认）：搜索技术文章的读者。** 经搜索引擎落入单篇文章（博客、课程章节、设计系统文档），解决一个具体问题后离开。这是全站的承重受众——可发现性、文章深度、搜索与 SEO 优先于一切。

**作者 / 所有者：Luke** —— AI Agent 工程师、独立构建者。站点同时也是他自己反复阅读与重组的个人知识系统。

**次要受众（init.md §2，未排序）：** 对 AI Agent / Schema / 后端工程感兴趣的开发者；系统学习前端或工程的初学者；评判手艺与立场的同行、招聘方、合作方；设计系统与知识系统兴趣者。它们都重要，但在「默认信息架构与视觉强度」的取舍上，都不凌驾于搜索读者之上。

## Product Purpose

SchemaX 是一个 **Schema 驱动的个人知识与作品平台** —— 静态、内容优先，统一了个人介绍、课程、技术写作、项目与一个活着的设计系统。它存在的理由（Luke 已确认）：**一个公开、schema 结构化的长期「第二大脑」** —— 全站是个人知识系统的对外窗口，用结构（Schema）连接课程、思考、代码、设计与 AI 执行。

成功意味着：这个知识系统是**耐久、可被发现、且对单篇落入的读者真正有用**的——读者因结构与深度而留下，而非被营销打动。不是虚荣指标，不是作品集推销。

## Positioning

**Schema-first，而非 Schema-everywhere。** 邻居产品无法如实照搬的差异化机制：平台在**自身的系统边界**上用 Schema 践行主张——内容集合（Zod）、设计令牌（DTCG JSON）、GitHub 数据（运行时校验）、Playground 跨窗口消息（postMessage schema）。Schema 既是品牌主张，也是承重实现。立场：可靠的智能不只是生成，而是把意图转换成可理解、可验证、可执行的结构。

## Operating Context

- **五条一级路由**，各回答一个问题：`/`（我是谁）、`/courses`（我如何组织与讲解）、`/blog`（我在研究什么）、`/projects`（我构建过什么）、`/design-system`（我如何设计与实现 SchemaX）。`/about` 存在但不进主导航。
- **阅读优先页面**（博客、课程章节）必须近乎零客户端 JS；交互（搜索、主题、代码 Tab、复制、Playground、配置器）通过 React Island 按需加载。
- **内容以 Markdown/MDX 写就**，归入五个集合（posts / courses / lessons / projects / topics），构建期加载并校验。
- **构建链是承重设计：** 令牌 → 内容校验 → astro check → astro build → Pagefind 索引。GitHub 数据构建期缓存为 JSON，绝不在运行时请求。
- **设计系统「SchemaX UI」本身就是一件作品**，而非附属文档。

## Capabilities and Constraints

- **技术栈（仅 V1）：** Astro 7 · React 19 · TypeScript strict · MDX · Content Collections（Content Layer `glob`/`file`）· Expressive Code · Pagefind · Style Dictionary（DTCG JSON）· 原生 CSS + Tailwind v4（token 桥接）· pnpm · 静态输出。单一 island 框架固定为 React。
- **Schema 边界（schema 只活在这些地方）：** 内部静态逻辑 → TS 类型；构建期内容 → Zod / Collection schema；外部 API（GitHub）→ 运行时 schema；跨窗口（Playground postMessage）→ 消息 schema；设计令牌 → DTCG JSON schema。不为品牌概念在普通代码里散布运行时 schema。
- **设计令牌是视觉真相的唯一来源**（DTCG JSON → Style Dictionary → 生成 CSS/TS）；设计系统页面必须读取生成产物，不得手工拷贝文档。
- **内容治理：** `id` = 永久身份，`slug` = URL（英文小写、连字符、不含日期 / 随机串）；`draft` 在生产构建中排除；已发布 URL 永不删除，通过中央重定向表重定向。
- **Playground** 在沙盒 iframe 中运行用户 HTML/CSS/JS（`sandbox="allow-scripts"` 仅此一项）；父窗口 ↔ iframe 走带校验的 postMessage。

**V1 非目标（明确排除）：** 用户登录、评论、数据库、学习进度云同步、远程 CMS、运行时远程 MDX、在线协作编辑、多语言、复杂后台、多个 UI 框架并存。

**开放决策（记录，未裁决）：** home surface brief 与全局令牌系统当前在配色上不一致（brief：RGBWB、无暖纸 / 无黄色；全局：暖纸 `#FFF7E8` + 黄强调）——属于视觉世界层面的不一致，留给 `document` / `new-work` 解决，不在 init 内裁决。

## Brand Commitments

- **名称：** SchemaX。**标语：** "Structure the Unknown." / 用 Schema，为未知建立可执行的结构。**品牌副标题（页眉）：** 协议是一等公民。
- **人格 / 语调（已确认）：** 理性但不冰冷，工程化但不枯燥，结构清晰但不僵化，视觉鲜明但不影响阅读，关注 AI 也重视基础工程，喜欢规范也鼓励探索。
- **四条持久原则：** Structure before automation · Contract before integration · Constraints enable reliability · Small schemas, large systems。
- **视觉身份锁定在别处**（DESIGN.md / 令牌系统 / `init.md` §14–17）：Neo-brutalist / RetroUI 基底；Schema 母题（花括号、字段名、类型标签、required 星号）仅用于品牌与设计系统区，不得侵入长篇阅读。*init 不设定视觉方向，此处不展开。*

## Evidence on Hand

- **权威产品规范：** `init.md`（仓库根，中文）—— 完整、规定性的整站方案；CLAUDE.md 派生自它。
- **已上线内容：** frontend-handbook 课程章节（`src/content/lessons/fe-*.mdx`）、设计系统页面与组件（`src/pages/design-system/`、`src/components/design-system/`）、首页。
- **品牌资产：** `schemax-app-icon.svg`、`schemax-mark.svg`、`apple-touch-icon.png`（见 `BaseLayout.astro` 引用）。
- **生成产物：** 令牌（`tokens/src/` DTCG JSON → `src/styles/generated/`、`src/generated/tokens.ts`）、GitHub 缓存（`src/generated/github.json`）。
- **缺失项（未来工作不得捏造）：** 不存在真实的客户证言、客户名单、基准测试、定价或部署声明——任何此类内容都不得虚构。

## Product Principles

1. **知识系统优先。** 每个默认值都服务于「搜索读者落入单篇」与「作者重组自己的知识」，而非作品集推销。可发现性、深度、结构胜过说服。
2. **Schema 在边界，不在处处。** Schema 恰在它能 earns its keep 的地方（内容、令牌、外部数据、消息）作为一等公民；普通代码保持朴素。
3. **静态与零 JS 为默认。** 阅读页交付 HTML，交互是按需 island。性能是特性，不是事后补丁。
4. **令牌是唯一的视觉真相。** 单一来源、生成、校验；设计系统是读取自身产物的一件作品。
5. **结构守住时间会侵蚀的东西。** 永久 ID、稳定 URL、重定向、构建期校验，让知识系统在内容演变中保持耐久。

## Accessibility & Inclusion

- **既定标准（init.md §22）：** 完整键盘操作、清晰 `focus-visible`、skip-to-content、正确标题层级、图片 alt、iframe title、颜色不作为唯一状态信息、支持 `prefers-reduced-motion`。
- 阅读优先页必须在近乎零客户端 JS 下仍可用——可访问性不得依赖水合。
