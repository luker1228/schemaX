# SchemaX 个人知识与作品网站完整方案

## 一、项目定义

### 1. 项目名称

**SchemaX**

推荐品牌写法：

```text
SchemaX
Structure the Unknown.
用 Schema，为未知建立可执行的结构。
```

中文辅助表达：

> 小小的 Schema，连接人的意图、系统的数据与机器的执行。

### 2. 名称含义

`Schema` 代表：

- 结构；
- 约束；
- 契约；
- 描述；
- 验证；
- 人与机器之间的共同语言。

JSON Schema 本质上是一种声明式语言，用于描述 JSON 数据的结构、数据类型和约束；它可以建立共同预期、验证数据并提升系统间的互操作性。

`X` 可以同时表达：

```text
Unknown       未知
Extension     扩展
Execution     执行
Exploration   探索
Cross         连接不同领域
```

SchemaX 可以理解为：

```text
Schema × AI
Schema × Agent
Schema × API
Schema × UI
Schema × Knowledge
Schema × Everything
```

### 3. 核心理念

在传统软件中，Schema 主要描述数据。

在 AI 时代，Schema 进一步承担：

```text
自然语言意图
    ↓
结构化描述
    ↓
Schema 约束
    ↓
Tool Call / API / Agent
    ↓
可验证执行结果
```

Schema 看起来很小，但它处在多个系统的关键连接处：

- 提示词与工具之间；
- 模型与 API 之间；
- 前端与后端之间；
- 数据与界面之间；
- 人类意图与机器执行之间；
- 自由生成与可靠控制之间。

SchemaX 的品牌主张是：

> 真正可靠的智能系统，不只是能生成内容，还需要把意图转换成可以理解、验证和执行的结构。

---

# 二、产品定位

SchemaX 不是传统意义上的个人简历站，也不只是博客。

它是一个以个人品牌为中心的：

> **个人介绍、课程、技术思考、工程作品和设计系统的统一展示平台。**

网站回答五个问题：

| 页面     | 回答的问题               |
| -------- | ------------------------ |
| 首页     | 我是谁                   |
| 课程     | 我如何组织和讲解知识     |
| 博客     | 我在研究和思考什么       |
| 作品     | 我构建过什么             |
| 设计系统 | 我如何设计和实现 SchemaX |

### 目标用户

主要访问者包括：

- 对 AI Agent、Schema、后端工程感兴趣的开发者；
- 希望系统学习前端或工程知识的初学者；
- 查看个人项目和工程能力的同行或合作方；
- 对个人知识系统和设计系统感兴趣的设计者；
- 通过搜索引擎进入具体技术文章的读者。

---

# 三、品牌叙事

## 1. 品牌宣言

SchemaX 可以建立四条长期原则：

### Structure before automation

先明确结构，再进行自动化。

### Contract before integration

先建立契约，再连接系统。

### Constraints enable reliability

合理的约束不是限制能力，而是让能力能够被可靠使用。

### Small schemas, large systems

复杂系统常常由少量关键 Schema 建立秩序。

## 2. 品牌人格

SchemaX 应呈现出以下气质：

```text
理性，但不冰冷
工程化，但不枯燥
结构清晰，但不僵化
视觉鲜明，但不影响阅读
关注 AI，也重视基础工程
喜欢规范，也鼓励探索
```

## 3. 首页主文案

推荐首页 Hero 文案：

```text
SchemaX

Structure the Unknown.

用 Schema，为未知建立可执行的结构。

我是 Luke，一名 AI Agent 工程师与独立构建者。
这里记录我的课程、技术思考、开源作品，以及 SchemaX 自身的设计过程。
```

主要按钮：

```text
Explore Projects
Read the Blog
```

次要入口：

```text
View Courses
Open Design System
```

---

# 四、网站信息架构

## 1. 一级路由

```text
SchemaX
├── /                  首页与个人介绍
├── /courses           课程
├── /blog              博客
├── /projects          GitHub 与个人作品
└── /design-system     SchemaX 设计系统
```

建议顶部导航显示：

```text
SchemaX    Courses    Blog    Projects    System
```

其中 Logo 点击后返回首页。

## 2. 完整路由

```text
/
├── /courses
│   ├── /courses/[course]
│   └── /courses/[course]/[lesson]
│
├── /blog
│   ├── /blog/[slug]
│   ├── /blog/topics/[topic]
│   └── /blog/archive
│
├── /projects
│   └── /projects/[slug]
│
├── /design-system
│   ├── /design-system/foundations
│   ├── /design-system/tokens
│   ├── /design-system/components
│   ├── /design-system/content
│   └── /design-system/patterns
│
├── /about
├── /search
├── /rss.xml
└── /404
```

`/about` 可以存在，但不进入主导航。首页已经承担主要个人介绍职责，`/about` 用于完整履历、经历和联系方式。

---

# 五、页面设计

## 1. 首页 `/`

首页不是内容列表，而是 SchemaX 的品牌入口。

推荐结构：

```text
全局导航
Hero
SchemaX Manifesto
个人身份
四个核心入口
当前关注
精选课程
代表作品
最新文章
网站构建说明
Footer
```

### Hero 视觉

左侧是个人与品牌文案，右侧可以是一个“Schema 卡片”：

```json
{
  "name": "Luke",
  "role": "AI Agent Engineer",
  "modes": ["build", "learn", "teach"],
  "status": "evolving"
}
```

但它只是视觉语言，不要把首页做成真正的 JSON 文档。

### 个人身份

```text
Builder
构建 AI Agent、开发平台与开源工具

Writer
记录系统设计、工程实践与技术思考

Teacher
将复杂知识整理成可以学习和实践的课程
```

### 四个核心入口

#### Courses

体系化课程、章节和练习。

#### Blog

技术文章、工程总结和观点记录。

#### Projects

开源仓库、产品实验和工程作品。

#### Design System

SchemaX 的 Token、组件和内容规范。

---

## 2. 课程 `/courses`

课程不是博客分类，而是有明确顺序的知识体系。

课程详情结构：

```text
课程封面
课程介绍
适合对象
学习目标
前置知识
课程章节
预计时长
学习成果
关联项目
```

章节页面结构：

```text
课程面包屑
章节标题
学习目标
正文
代码示例
练习
知识检查
上一节 / 下一节
```

课程类型可以统一为：

```text
guide       系统教程
workshop    实践课程
handbook    技术手册
series      系列专题
```

课程状态：

```text
planning
writing
active
completed
archived
```

首批课程可以考虑：

```text
后端同学的前端战术手册
AI Agent 工程入门
Schema 驱动的应用设计
从数据模型到 API
```

---

## 3. 博客 `/blog`

博客承载独立文章，不强制按学习顺序阅读。

推荐主题：

```text
Schema
AI Agent
Backend
Frontend
System Design
Developer Tools
Product & Design
Build in Public
```

博客首页包含：

```text
精选文章
最新文章
主题入口
文章归档
搜索
RSS
```

文章页包含：

```text
标题
描述
发布日期
更新时间
阅读时间
主题标签
正文目录
MDX 正文
相关文章
上一篇 / 下一篇
```

---

## 4. 作品 `/projects`

路由使用 `/projects`，而不是 `/github`。

因为作品不只是仓库链接，还包括：

- 产品背景；
- 架构决策；
- 技术栈；
- Demo；
- 截图；
- 开发状态；
- 相关文章；
- 设计过程；
- GitHub 数据。

项目页结构：

```text
项目 Hero
一句话定位
状态与技术栈
项目背景
要解决的问题
核心能力
系统架构
关键设计
截图或 Demo
GitHub 信息
相关博客
后续计划
```

项目状态：

```text
active
maintained
experimental
paused
archived
```

GitHub 的 stars、forks、更新时间可以在构建期同步，但项目介绍、排序、状态和技术叙事必须人工维护。

---

## 5. 设计系统 `/design-system`

设计系统命名为：

> **SchemaX UI**

设计系统不是附属文档，而是 SchemaX 的重要作品。

设计系统信息架构：

```text
SchemaX UI
├── Foundations
├── Tokens
├── Components
├── Content
└── Patterns
```

### Foundations

展示：

- 品牌原则；
- 色彩；
- 字体；
- 网格；
- 间距；
- 边框；
- 阴影；
- 图标；
- 动效。

### Tokens

展示真实使用的：

```text
Reference Tokens
Semantic Tokens
Article Tokens
Component Tokens
Theme Tokens
```

页面必须直接读取 Token 构建产物，不能手工复制一份文档。

### Components

展示：

```text
Button
Card
Tag
Badge
Navigation
Tabs
Dialog
Callout
CourseCard
ProjectCard
CodeBlock
CodeCompare
CodePreview
```

### Content

展示 Markdown 与 MDX 的真实排版：

```text
h1—h4
段落
链接
列表
引用
表格
图片
行内代码
代码块
脚注
提示框
```

### Patterns

展示组合模式：

```text
文章头部
课程目录
项目 Hero
代码对比
筛选与搜索
空状态
错误状态
分页
```

---

# 六、核心技术架构

## 1. 技术基线

```text
Astro 7.x
Svelte 5
TypeScript strict
MDX
Astro Content Collections
Expressive Code
Pagefind
原生 CSS
Style Dictionary
pnpm
静态输出
```

Astro 当前定位为面向内容型网站的 Server-first 框架，默认尽量输出 HTML；其 Islands 架构只在需要交互的位置发送客户端 JavaScript。Content Collections 可以通过 loader 和 schema 管理、校验并类型化 Markdown、MDX、JSON 及远程内容。

Astro 的官方 MDX 集成允许在 `.mdx` 中使用 Astro 或 UI 框架组件；官方 Svelte 集成支持渲染和客户端水合 Svelte 5 组件。

## 2. 架构职责

```text
Astro
├── 文件路由
├── 页面布局
├── 静态生成
├── 内容查询
├── SEO
└── 图片处理

MDX
├── 博客正文
├── 课程正文
└── 特殊内容组件

Svelte
├── 搜索
├── 主题切换
├── 代码 Tab
├── Playground
└── 需要浏览器状态的组件

CSS
├── Token
├── 页面排版
├── 组件样式
└── 响应式设计
```

## 3. 渲染原则

```text
静态优先
服务端优先
零 JavaScript 优先
局部交互
构建期验证
```

判断规则：

> 只负责展示，使用 Astro；需要在浏览器内改变状态，使用 Svelte Island。

---

# 七、Schema 驱动的系统设计

SchemaX 不能只在品牌文案中讨论 Schema。

网站自身的关键边界也必须使用 Schema。

```text
SchemaX
├── Content Schema
├── Token Schema
├── Component Contract
├── GitHub Data Schema
├── Playground Message Schema
└── Analytics Event Schema
```

## 1. Schema 使用边界

不应为了品牌概念而给所有代码增加运行时 Schema。

推荐原则：

```text
内部静态逻辑
→ TypeScript 类型即可

构建期内容
→ Zod / Content Collection Schema

外部 API 数据
→ 运行时 Schema 校验

跨窗口通信
→ Message Schema

Design Token
→ DTCG JSON Token Schema
```

也就是：

> Schema-first，不等于 Schema-everywhere。

Schema 应主要存在于系统边界、可复用契约和不可信数据入口。

---

# 八、内容模型

建议建立五个集合：

```text
posts
courses
lessons
projects
topics
```

## 1. 公共字段

所有主要内容共享：

```ts
type ContentStatus = 'draft' | 'published' | 'archived';

interface BaseContent {
  title: string;
  description: string;
  slug: string;
  status: ContentStatus;
  publishedAt?: Date;
  updatedAt?: Date;
  featured: boolean;
  cover?: ImageMetadata;
  coverAlt?: string;
  topics: TopicReference[];
}
```

## 2. Blog Schema

```ts
interface Post {
  title: string;
  description: string;
  slug: string;
  status: ContentStatus;
  publishedAt?: Date;
  updatedAt?: Date;
  featured: boolean;
  topics: TopicReference[];
  relatedProjects: ProjectReference[];
  canonical?: string;
  noindex: boolean;
}
```

## 3. Course Schema

```ts
interface Course {
  title: string;
  description: string;
  slug: string;
  status: 'planning' | 'writing' | 'active' | 'completed' | 'archived';
  type: 'guide' | 'workshop' | 'handbook' | 'series';
  level: 'beginner' | 'intermediate' | 'advanced';
  objectives: string[];
  prerequisites: string[];
  estimatedHours?: number;
}
```

## 4. Lesson Schema

```ts
interface Lesson {
  title: string;
  description: string;
  slug: string;
  course: CourseReference;
  order: number;
  durationMinutes?: number;
  objectives: string[];
  lessonType: 'lesson' | 'practice' | 'project' | 'review';
}
```

## 5. Project Schema

```ts
interface Project {
  title: string;
  description: string;
  slug: string;
  status: 'active' | 'maintained' | 'experimental' | 'paused' | 'archived';
  repository?: string;
  demo?: string;
  stack: string[];
  startedAt?: Date;
  featured: boolean;
  relatedPosts: PostReference[];
}
```

---

# 九、Astro Content Collections 配置

建议把 Schema 放在独立模块，再由 `content.config.ts` 组合。

```ts
// src/content.config.ts

import { defineCollection, reference, type SchemaContext } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const commonFields = ({ image }: SchemaContext) => ({
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(220),
  slug: slugSchema,
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  publishedAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  featured: z.boolean().default(false),
  cover: image().optional(),
  coverAlt: z.string().optional(),
  topics: z.array(reference('topics')).default([]),
});

const topics = defineCollection({
  loader: file('src/data/topics.json'),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    description: z.string().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/*.{md,mdx}',
  }),
  schema: ({ image }) =>
    z.object({
      ...commonFields({ image }),
      canonical: z.string().url().optional(),
      noindex: z.boolean().default(false),
      relatedProjects: z.array(reference('projects')).default([]),
    }),
});

const courses = defineCollection({
  loader: glob({
    base: './src/content/courses',
    pattern: '**/*.{md,mdx}',
  }),
  schema: ({ image }) =>
    z.object({
      ...commonFields({ image }),
      type: z.enum(['guide', 'workshop', 'handbook', 'series']),
      level: z.enum(['beginner', 'intermediate', 'advanced']),
      objectives: z.array(z.string()).min(1),
      prerequisites: z.array(z.string()).default([]),
      estimatedHours: z.number().positive().optional(),
    }),
});

const lessons = defineCollection({
  loader: glob({
    base: './src/content/lessons',
    pattern: '**/*.{md,mdx}',
  }),
  schema: ({ image }) =>
    z.object({
      ...commonFields({ image }),
      course: reference('courses'),
      order: z.number().int().positive(),
      durationMinutes: z.number().int().positive().optional(),
      objectives: z.array(z.string()).default([]),
      lessonType: z
        .enum(['lesson', 'practice', 'project', 'review'])
        .default('lesson'),
    }),
});

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/*.{md,mdx}',
  }),
  schema: ({ image }) =>
    z.object({
      ...commonFields({ image }),
      status: z.enum([
        'active',
        'maintained',
        'experimental',
        'paused',
        'archived',
      ]),
      repository: z.string().url().optional(),
      demo: z.string().url().optional(),
      stack: z.array(z.string()).default([]),
      startedAt: z.coerce.date().optional(),
      relatedPosts: z.array(reference('posts')).default([]),
    }),
});

export const collections = {
  topics,
  posts,
  courses,
  lessons,
  projects,
};
```

Astro 当前 Content Layer 使用 `src/content.config.ts`、loader 和 schema 定义内容集合；本地内容可使用 `glob()`，JSON 等单文件数据可以使用 `file()`。

---

# 十、内容治理规则

## 1. ID 与 slug 分离

```text
id
→ 内容永久身份

slug
→ 对外 URL
```

文件名或固定 ID 一旦发布，不应随标题变化。

## 2. slug 规则

```text
只使用英文小写
使用连字符
不使用日期
不使用随机字符串
不使用易变化的版本号
```

例如：

```text
schema-driven-agent-design
css-token-architecture
frontend-handbook
```

## 3. 内容状态

```text
draft
→ 本地可见，生产环境不生成

published
→ 正式公开

archived
→ 保留页面，但不进入主要列表
```

## 4. 重定向

建立中央重定向文件：

```ts
// src/config/redirects.ts

export const redirects = {
  '/blog/old-schema-post': '/blog/schema-driven-agent-design',
};
```

已公开的 URL 不应直接删除。

---

# 十一、MDX 编译管线

统一的内容管线：

```text
MDX
├── Frontmatter Schema 校验
├── 标题 ID 生成
├── 文章目录生成
├── 外部链接处理
├── 图片处理
├── 代码高亮
├── 代码元数据解析
├── 阅读时间
├── 内容组件映射
└── 链接有效性检查
```

允许在 MDX 中使用的组件必须有白名单：

```text
Callout
Steps
Figure
CodeCompare
CodePreview
Playground
Exercise
KnowledgeCheck
Tabs
Video
```

普通文章中不应自由导入任意业务组件。

### MDX 示例

```mdx
---
title: Schema 如何连接 AI 与工具
description: 理解 Schema 在 Tool Call 中的作用
slug: schema-connects-ai-and-tools
status: published
publishedAt: 2026-07-19
topics:
  - schema
  - ai-agent
---

## 从自然语言到工具调用

模型产生的内容具有不确定性，而工具接口需要确定的输入。

<Callout type="idea">Schema 位于生成式能力与确定性系统之间。</Callout>

<CodeCompare
  leftTitle="自由文本"
  rightTitle="结构化输入"
  leftCode={`帮我查询北京天气`}
  rightCode={`{
  "city": "北京",
  "unit": "celsius"
}`}
/>
```

---

# 十二、代码展示体系

## 1. 静态代码块

使用 **Expressive Code** 处理普通 Markdown 和 MDX 代码块。

支持：

- Shiki 语法高亮；
- 文件名；
- 行号；
- 行高亮；
- 文本标记；
- 代码折行；
- 明暗主题；
- 复制按钮；
- Astro 与 MDX 集成。

Expressive Code 支持 Astro、Markdown 和 MDX，并提供 `<Code>` 组件及文本、行范围标记能力。

## 2. CodeCompare

用于：

```text
HTML 与 Markdown
传统写法与 Schema 写法
错误示例与正确示例
输入与输出
Before 与 After
```

桌面端左右布局，移动端自动切换成 Tabs。

## 3. CodePreview

展示：

```text
左侧代码
右侧实际效果
```

静态安全示例可以直接渲染；独立 CSS 或 JavaScript 示例使用 iframe。

## 4. Playground

Playground 使用 Svelte 实现：

```text
HTML 编辑器
CSS 编辑器
JavaScript 编辑器
运行按钮
重置按钮
iframe 预览
```

安全策略：

```html
<iframe
  title="SchemaX code playground"
  sandbox="allow-scripts"
  loading="lazy"
  referrerpolicy="no-referrer"
/>
```

默认不开放：

```text
allow-same-origin
allow-top-navigation
allow-popups
allow-downloads
```

父页面与 iframe 通过 `postMessage` 通信，并使用 Schema 验证消息格式。

```ts
type PlaygroundMessage =
  | {
      type: 'RUN_CODE';
      payload: {
        html: string;
        css: string;
        javascript: string;
      };
    }
  | {
      type: 'RESET';
    };
```

---

# 十三、Islands 设计

## 静态 Astro 组件

```text
Header.astro
Footer.astro
HomeHero.astro
CourseCard.astro
PostCard.astro
ProjectCard.astro
ArticleHeader.astro
ArticleLayout.astro
TokenTable.astro
Callout.astro
```

## Svelte Islands

```text
ThemeSwitch.svelte
MobileMenu.svelte
SearchDialog.svelte
CodeTabs.svelte
CopyButton.svelte
CodePreview.svelte
Playground.svelte
ComponentConfigurator.svelte
```

使用方式：

```astro
<ThemeSwitch client:load />
<SearchDialog client:idle />
<Playground client:visible />
```

页面主体保持静态，只有被标记为 `client:*` 的交互组件加载客户端 JavaScript，这正是 Astro Islands 的核心工作方式。

---

# 十四、SchemaX UI 设计系统

## 1. 视觉方向

SchemaX UI 以 RetroUI 和 Neo-brutalist 风格为视觉基础：

```text
低圆角或无圆角
粗边框
实心硬阴影
蓝黄主色
高对比度
编辑感排版
模块化卡片
明显的交互反馈
少渐变
少玻璃效果
```

同时加入 SchemaX 自身的视觉语言：

```text
花括号
字段名
类型标签
required 星号
路径表达
网格
节点连接
结构分组
```

但这些元素主要用于品牌区域和设计系统，不能侵占长文章的阅读空间。

## 2. 页面视觉强度

| 页面     | RetroUI 强度 |
| -------- | ------------ |
| 首页     | 强           |
| 课程列表 | 中强         |
| 课程正文 | 中等         |
| 博客正文 | 克制         |
| 项目页   | 强           |
| 设计系统 | 最强         |

---

# 十五、基础视觉 Token

建议初始色板：

```css
--sx-ref-color-ink: #171717;
--sx-ref-color-paper: #fff8e7;
--sx-ref-color-white: #ffffff;

--sx-ref-color-blue-500: #2f5bea;
--sx-ref-color-yellow-400: #ffd447;
--sx-ref-color-red-500: #f9575c;
--sx-ref-color-green-500: #35ad68;
```

语义层：

```css
--sx-sys-color-bg-page: var(--sx-ref-color-paper);

--sx-sys-color-bg-surface: var(--sx-ref-color-white);

--sx-sys-color-text-primary: var(--sx-ref-color-ink);

--sx-sys-color-action-primary: var(--sx-ref-color-blue-500);

--sx-sys-color-accent: var(--sx-ref-color-yellow-400);

--sx-sys-color-border: var(--sx-ref-color-ink);
```

尺寸：

```css
--sx-ref-space-1: 0.25rem;
--sx-ref-space-2: 0.5rem;
--sx-ref-space-3: 0.75rem;
--sx-ref-space-4: 1rem;
--sx-ref-space-6: 1.5rem;
--sx-ref-space-8: 2rem;
--sx-ref-space-12: 3rem;
--sx-ref-space-16: 4rem;
--sx-ref-space-24: 6rem;
```

边框与阴影：

```css
--sx-sys-border-width: 2px;
--sx-sys-radius-sm: 0;
--sx-sys-radius-md: 4px;

--sx-sys-shadow-sm: 3px 3px 0 #171717;
--sx-sys-shadow-md: 6px 6px 0 #171717;
--sx-sys-shadow-lg: 10px 10px 0 #171717;
```

文章尺寸：

```css
--sx-article-width-reading: 46rem;
--sx-article-width-tutorial: 68rem;
--sx-layout-width-page: 78rem;

--sx-article-font-size: 1.0625rem;
--sx-article-line-height: 1.8;
```

---

# 十六、Token Source 与构建

Token Source 使用 DTCG 风格 JSON：

```json
{
  "color": {
    "ref": {
      "blue": {
        "500": {
          "$type": "color",
          "$value": "#2f5bea"
        }
      }
    },
    "sys": {
      "action": {
        "primary": {
          "$type": "color",
          "$value": "{color.ref.blue.500}"
        }
      }
    }
  }
}
```

构建链路：

```text
tokens/src/*.json
    ↓
Style Dictionary
    ↓
tokens.css
tokens.ts
tokens.generated.json
    ↓
网站 + 设计系统页面
```

Style Dictionary 可以读取 DTCG 风格 Token、解析别名，并输出 CSS Variables、JavaScript、TypeScript 或自定义文档格式。

目录：

```text
tokens/
├── src/
│   ├── reference/
│   ├── semantic/
│   ├── article/
│   └── component/
├── schema/
│   └── tokens.schema.json
├── style-dictionary.config.mjs
└── generated/
    ├── tokens.css
    ├── tokens.ts
    └── tokens.json
```

Token 前缀统一为：

```text
--sx-ref-*
--sx-sys-*
--sx-article-*
--sx-comp-*
```

强制规则：

- 业务代码不得使用 `--sx-ref-*`；
- 业务代码不得硬编码品牌颜色；
- 组件只能覆盖自己的 `--sx-comp-*`；
- Token 只由全局入口引入一次；
- 设计系统页面读取真实生成数据；
- Token 源修改必须通过 CI 校验。

---

# 十七、CSS 架构

```css
@layer reset;
@layer tokens;
@layer base;
@layer layout;
@layer article;
@layer components;
@layer utilities;
@layer overrides;
```

目录：

```text
src/styles/
├── reset.css
├── generated/
│   └── tokens.css
├── base.css
├── layout.css
├── article.css
├── utilities.css
└── global.css
```

文章样式使用低权重选择器：

```css
@layer article {
  .sx-article {
    max-width: var(--sx-article-width-reading);
    margin-inline: auto;
    font-size: var(--sx-article-font-size);
    line-height: var(--sx-article-line-height);
  }

  .sx-article :where(h2) {
    margin-block: 4rem 1.5rem;
    font-size: 2rem;
  }

  .sx-article :where(h3) {
    margin-block: 2.5rem 1rem;
    font-size: 1.5rem;
  }
}
```

Stylelint 检查：

```text
Token 命名
硬编码颜色
Primitive Token 使用
重复自定义属性
非法 CSS 值
组件越权覆盖全局 Token
```

Stylelint 提供自定义属性命名和属性值允许、禁止规则，可以作为 Token 使用约束的基础。

---

# 十八、搜索

采用 Pagefind：

```text
Astro 完成静态构建
    ↓
Pagefind 扫描 dist
    ↓
生成静态搜索索引
    ↓
SearchDialog.svelte 按需加载
```

Pagefind 在静态站构建完成后扫描 HTML，并生成不需要独立搜索服务器的静态索引；其扩展发行版还包含中文和日文索引支持。

搜索范围：

```text
博客
课程
课程章节
项目
设计系统文档
```

搜索结果类型必须明确标识：

```text
POST
COURSE
LESSON
PROJECT
SYSTEM
```

---

# 十九、GitHub 数据同步

项目基础数据人工维护：

```text
名称
介绍
状态
技术栈
展示顺序
封面
相关文章
```

GitHub 数据构建期同步：

```text
stars
forks
issues
last pushed
primary language
latest release
```

流程：

```text
GitHub API
    ↓
scripts/sync-github.ts
    ↓
src/generated/github.json
    ↓
Astro build
```

规则：

- 不在用户访问时请求 GitHub；
- API 失败时使用上一次缓存；
- GitHub 数据不控制项目是否展示；
- 项目叙事权由本地内容决定。

---

# 二十、SEO 与内容分发

统一建立：

```text
Seo.astro
OpenGraph.astro
JsonLd.astro
```

结构化数据类型：

```text
首页         Person + WebSite
博客         BlogPosting
课程         Course
项目         SoftwareSourceCode
设计系统     TechArticle / CreativeWork
```

同时生成：

```text
sitemap.xml
rss.xml
robots.txt
canonical
Open Graph 图片
favicon
web manifest
404 页面
```

Astro 提供 RSS helper、官方 sitemap 集成以及本地图片优化组件，可以在静态构建阶段生成内容分发与图像产物。

---

# 二十一、项目目录

```text
schemax/
├── src/
│   ├── components/
│   │   ├── site/
│   │   ├── home/
│   │   ├── course/
│   │   ├── article/
│   │   ├── project/
│   │   ├── design-system/
│   │   └── islands/
│   │
│   ├── content/
│   │   ├── posts/
│   │   ├── courses/
│   │   ├── lessons/
│   │   └── projects/
│   │
│   ├── data/
│   │   ├── topics.json
│   │   ├── profile.ts
│   │   └── navigation.ts
│   │
│   ├── generated/
│   │   ├── github.json
│   │   └── tokens.ts
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── ArticleLayout.astro
│   │   ├── CourseLayout.astro
│   │   └── ProjectLayout.astro
│   │
│   ├── lib/
│   │   ├── content/
│   │   ├── seo/
│   │   ├── github/
│   │   └── playground/
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── courses/
│   │   ├── blog/
│   │   ├── projects/
│   │   ├── design-system/
│   │   └── rss.xml.ts
│   │
│   ├── schemas/
│   │   ├── content.ts
│   │   ├── github.ts
│   │   ├── messages.ts
│   │   └── analytics.ts
│   │
│   ├── styles/
│   │   ├── reset.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── article.css
│   │   ├── utilities.css
│   │   └── global.css
│   │
│   └── content.config.ts
│
├── tokens/
│   ├── src/
│   ├── schema/
│   └── generated/
│
├── scripts/
│   ├── build-tokens.mjs
│   ├── sync-github.ts
│   ├── validate-content.ts
│   └── check-links.ts
│
├── tests/
│   ├── unit/
│   ├── e2e/
│   └── visual/
│
├── docs/
│   └── adr/
│
├── astro.config.mjs
├── pagefind.yml
├── stylelint.config.mjs
├── tsconfig.json
├── package.json
└── pnpm-lock.yaml
```

V1 保持单仓库，不提前拆成复杂 Monorepo。只有 Design Token 或组件需要被其他项目复用时，再拆成独立 package。

---

# 二十二、质量与测试

## 单元测试

测试：

```text
slug 生成
内容排序
课程章节关系
Token 转换
GitHub 数据转换
Playground Message Schema
```

## E2E 测试

测试：

```text
主导航
四个核心路由
博客阅读
课程上一节与下一节
搜索
主题切换
复制代码
Playground
404
```

## 视觉回归

重点截图：

```text
首页
博客详情
课程详情
项目详情
设计系统组件页
移动端导航
亮色与暗色主题
```

## 可访问性

要求：

```text
键盘完整操作
清晰的 focus-visible
Skip to content
正确标题层级
图片 alt
iframe title
颜色不是唯一状态信息
支持 prefers-reduced-motion
```

---

# 二十三、性能预算

建议 V1 预算：

```text
普通博客页
→ 不加载 Svelte 框架代码，或仅加载很小的复制按钮

主页初始客户端 JS
→ 35 KB gzip 以内

普通课程页初始 JS
→ 50 KB gzip 以内

Playground
→ client:visible 后加载

首屏图片
→ 移动端控制在约 200 KB 内

第三方脚本
→ 最多一个，优先为零
```

关键原则：

- 不把整个页面做成 Svelte 应用；
- 不让所有代码块都变成 Playground；
- 搜索按需加载；
- 编辑器按组件拆包；
- iframe 懒加载；
- 字体只加载必要字重。

---

# 二十四、CI/CD

推荐流水线：

```text
pnpm install
    ↓
Token Schema Validation
    ↓
Token Build
    ↓
Format Check
    ↓
ESLint + Stylelint
    ↓
astro check
    ↓
Content Validation
    ↓
Unit Tests
    ↓
Astro Build
    ↓
Pagefind Index
    ↓
Broken Link Check
    ↓
Playwright
    ↓
Preview Deploy
    ↓
Production Deploy
```

建议脚本：

```json
{
  "scripts": {
    "dev": "astro dev",
    "tokens:build": "node scripts/build-tokens.mjs",
    "content:check": "tsx scripts/validate-content.ts",
    "github:sync": "tsx scripts/sync-github.ts",
    "build:site": "astro build",
    "search:build": "pagefind --site dist",
    "build": "pnpm tokens:build && pnpm content:check && astro check && astro build && pnpm search:build",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "lint:css": "stylelint \"src/**/*.{css,astro,svelte}\"",
    "check": "pnpm lint:css && pnpm test && pnpm build"
  }
}
```

---

# 二十五、V1 非目标

第一版明确不做：

```text
用户登录
评论系统
数据库
学习进度云同步
远程 CMS
运行时远程 MDX
在线协作编辑
多语言
复杂后台
多个 UI 框架并存
```

第一版只使用：

```text
Astro
Svelte
MDX
TypeScript
原生 CSS
```

---

# 二十六、实施阶段

## 第一阶段：Foundation

完成：

```text
Astro 项目
路由骨架
Content Collections
Token 构建
全局布局
导航
基础 SEO
```

验收结果：

```text
五个一级页面可以访问
Token 自动生成
内容 Schema 能阻止错误内容构建
```

## 第二阶段：Content

完成：

```text
博客列表与详情
课程列表与章节
项目列表与详情
MDX 组件注册
Expressive Code
RSS 与 Sitemap
```

## 第三阶段：Interaction

完成：

```text
搜索
主题切换
复制代码
CodeCompare
CodePreview
Playground
```

## 第四阶段：Design System

完成：

```text
Foundations
Tokens
Components
Content
Patterns
```

设计系统页面直接展示网站实际使用的 Token 与组件。

## 第五阶段：Quality

完成：

```text
测试
可访问性
视觉回归
性能预算
CI/CD
GitHub 同步
链接检查
```

---

# 二十七、最终验收标准

SchemaX V1 完成时应满足：

1. 首页清晰介绍 Luke 与 SchemaX。
2. 课程、博客、作品和设计系统具有独立路由与内容模型。
3. 所有内容通过 Schema 校验。
4. Token Source 是唯一视觉事实来源。
5. 设计系统页面读取真实 Token 和组件。
6. 普通文章默认不加载多余客户端 JavaScript。
7. 交互组件使用 Svelte Islands 按需加载。
8. 静态代码由 Expressive Code 构建期渲染。
9. Playground 在隔离 iframe 中运行。
10. 搜索不依赖后端服务。
11. GitHub API 故障不影响网站构建。
12. 公开 URL 有稳定与重定向策略。
13. 支持 RSS、Sitemap、SEO 和结构化数据。
14. 关键路径通过自动化测试。
15. 移动端、键盘操作和低动效模式可用。

---

# 二十八、SchemaX 的一句话定义

> **SchemaX 是一个由 Schema 驱动的个人知识与作品平台，用结构连接课程、思考、代码、设计与 AI 执行。**

更具品牌感的表达是：

> **SchemaX — Structure the Unknown.**

> 用 Schema，为未知建立可执行的结构。
