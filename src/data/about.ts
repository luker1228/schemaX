// 关于页数据（经历时间线 + 联系方式）。规范 §4.2：/about 承载完整履历、经历与联系方式。
// 内容为占位示例，请按真实情况替换 period / title / org / href 等字段。

// 经历时间线。period 用作节点上的年标，tag 决定节点配色。
export interface JourneyEntry {
  period: string;
  title: string;
  org?: string;
  description: string;
  tag: string;
  highlight?: boolean;
}

export const journey: JourneyEntry[] = [
  {
    period: '2024 — 至今',
    title: '独立构建 SchemaX',
    org: 'schema-driven personal platform',
    description:
      '把课程、博客、作品与设计系统整合进一个 schema 驱动的平台。令牌、内容契约与构建链路都被显式定义并校验。',
    tag: '构建',
    highlight: true,
  },
  {
    period: '2023 — 2024',
    title: 'AI Agent 工程深入',
    org: 'LLM apps & agents',
    description:
      '基于 Claude / OpenAI API 构建 Agent、RAG 与 Function Calling 系统，沉淀 prompt 工程与工具调用的实践经验。',
    tag: 'AI',
  },
  {
    period: '2021 — 2023',
    title: '全栈平台开发',
    org: 'React · Node · Postgres',
    description:
      '主导产品级 Web 应用的前端架构与后端 API 设计，落地组件化、设计系统与 CI/CD 工程化流程。',
    tag: '工程',
  },
  {
    period: '2019 — 2021',
    title: '前端工程起步',
    org: 'UI · components · design systems',
    description:
      '从还原设计稿到组件化思维，建立对可访问性、性能与设计令牌的工程直觉。',
    tag: '前端',
  },
  {
    period: '持续进行',
    title: '写作与教学',
    org: 'write · learn · teach',
    description:
      '把系统工程与 AI 实践整理成可学习的课程和可复用的文章，相信教学是最好的学习。',
    tag: '教学',
  },
] as const;

// 联系渠道。emoji 作为零依赖图标，note 是渠道用途说明。
export interface ContactChannel {
  label: string;
  handle: string;
  href: string;
  emoji: string;
  note: string;
  external?: boolean; // 是否新窗口打开（外链）
}

export const contact: ContactChannel[] = [
  {
    label: 'GitHub',
    handle: '@luke',
    href: 'https://github.com/',
    emoji: '🐙',
    note: '代码与开源作品',
    external: true,
  },
  {
    label: 'Email',
    handle: 'hi@schemax.dev',
    href: 'mailto:hi@schemax.dev',
    emoji: '✉️',
    note: '合作与交流',
  },
  {
    label: 'RSS',
    handle: '/rss.xml',
    href: '/rss.xml',
    emoji: '📡',
    note: '订阅最新文章',
  },
  {
    label: 'X / Twitter',
    handle: '@luke',
    href: 'https://x.com/',
    emoji: '🐦',
    note: '碎片化思考',
    external: true,
  },
] as const;
