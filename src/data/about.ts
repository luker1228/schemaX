// 关于页数据（忠实对应 tokens/design_system.pen 中的 "SchemaX About Me Page" 设计稿）。
// accent 为颜色键，经 accentToken 映射到 --sx-sys-color-* token（见文件末尾）。

export type Accent =
  | 'accent'
  | 'mint'
  | 'lavender'
  | 'action'
  | 'beige'
  | 'success'
  | 'danger'
  | 'surface';

// —— Hero ——
export interface Principle {
  label: string;
  accent: Accent;
}

export const aboutHero = {
  title: '关于我',
  intro: '你好，我是人类大模型 Luke。',
  description: '设计系统不是附属文档，而是 SchemaX 的重要作品。',
  copy: '我是 Luke，一名 AI Agent 工程师，全栈工程师。我把 schema、设计系统和个人知识库当作训练语料，记录被模型重塑的学习、表达与创作过程。',
  principles: [
    { label: 'SCHEMA-FIRST', accent: 'surface' },
    { label: 'FULL STACK', accent: 'accent' },
    { label: 'AI AGENT', accent: 'surface' },
    { label: 'WRITE TO LEARN', accent: 'accent' },
    { label: 'CLOUD', accent: 'surface' },
  ] as const satisfies readonly Principle[],
};

// —— 三段角色 ——
export interface Role {
  index: string;
  accent: Accent;
  eyebrow: string;
  title: string;
  desc: string;
  tags: string[];
}

export const roles: Role[] = [
  {
    index: '01',
    accent: 'accent',
    eyebrow: 'SERVER & DATA',
    title: '后端工程师',
    desc: '服务端架构、API 设计与数据建模。打磨高可用系统，把复杂业务逻辑收敛成清晰、稳定、可维护的接口。',
    tags: ['Java', 'Go', 'MySQL', 'Redis'],
  },
  {
    index: '02',
    accent: 'mint',
    eyebrow: 'END-TO-END DELIVERY',
    title: '全栈工程师',
    desc: '打通前后端边界，独立完成从数据库到界面的设计、开发与部署，对产品的整条链路负责。',
    tags: ['React', 'Node.js', 'TypeScript', 'Astro'],
  },
  {
    index: '03',
    accent: 'lavender',
    eyebrow: 'LLM APPLICATIONS',
    title: 'Agent 应用工程师',
    desc: '用 schema 与工具编排构建 AI Agent 应用，让大模型在可控契约下完成多步推理与真实任务。',
    tags: ['LLM', 'Function Calling', 'RAG', 'Prompt Eng'],
  },
];

// —— 技术栈矩阵 ——
export interface StackRow {
  label: string;
  accent: Accent;
  items: string[];
}

export const stackRows: StackRow[] = [
  { label: '语言', accent: 'accent', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Go'] },
  { label: '部署', accent: 'mint', items: ['Docker', 'k8s', 'CI/CD'] },
  { label: 'AI / AGENT', accent: 'lavender', items: ['OpenAI', 'Claude', 'Function Calling', 'Embeddings'] },
  { label: '中间件', accent: 'action', items: ['apisix', 'keycloak', 'mysql', 'redis', 'kafka'] },
  { label: '框架', accent: 'beige', items: ['SpringBoot', 'Gin', 'PI', 'Expressive Code'] },
  { label: 'DESIGN', accent: 'success', items: ['Figma', 'Pencil', 'DTCG Tokens', 'Design Systems'] },
];

// —— 个人履历 ——
export interface Milestone {
  year: string;
  tag: string;
  title: string;
  desc: string;
}

export const milestones: Milestone[] = [
  {
    year: '2012–2016',
    tag: 'BACHELOR',
    title: '西安电子科技大学',
    desc: '通信工程学院 · 本科。系统学习通信与信息处理，奠定信号、编码与网络的工程基础。',
  },
  {
    year: '2016–2017',
    tag: 'ENGINEER',
    title: '内蒙古巴彦淖尔市连通',
    desc: '网络优化工程师。负责移动通信网络的覆盖、容量与质量分析及无线网络优化。',
  },
  {
    year: '2018–2021',
    tag: 'MASTER',
    title: '西安电子科技大学',
    desc: '电子信息工程 · 硕士。深入电子与信息系统方向，强化系统工程与研究能力。',
  },
  {
    year: '2021–至今',
    tag: 'PRESENT',
    title: '腾讯云',
    desc: '云计算平台研发。参与腾讯云产品与后端系统的设计、构建与持续演进。',
  },
];

// —— 四原则 ——
export interface PrincipleValue {
  num: string;
  cn: string;
  en: string;
  body: string;
  accent: Accent;
}

export const principleValues: PrincipleValue[] = [
  {
    num: '01',
    cn: '先结构，后执行',
    en: 'Structure before execution',
    body: '先把意图、字段、边界描述清楚，再交给工具与 Agent 去执行。结构是一切自动化的前提。',
    accent: 'accent',
  },
  {
    num: '02',
    cn: '公开学习',
    en: 'Learn in public',
    body: '把每一次理解、修正与迭代都留下痕迹。公开的过程比最终的成品更有价值。',
    accent: 'mint',
  },
  {
    num: '03',
    cn: '约束即自由',
    en: 'Constraints enable freedom',
    body: '合理的 schema 与边界不是限制能力，而是让结果可检查、可复现、可维护。',
    accent: 'danger',
  },
  {
    num: '04',
    cn: '长期主义',
    en: 'Compound over time',
    body: '知识、作品与工具会复利增长。比起短期流量，我更愿意打磨能留存十年的结构。',
    accent: 'lavender',
  },
];

// —— 此刻在做什么 ——
export interface NowCard {
  status: string;
  accent: Accent;
  title: string;
  desc: string;
}

export const nowCards: NowCard[] = [
  {
    status: 'BUILDING',
    accent: 'accent',
    title: 'SchemaX 平台 V1',
    desc: '把首页、课程、博客、作品与设计系统统一在一个 schema 驱动的 Astro 站点下。',
  },
  {
    status: 'WRITING',
    accent: 'mint',
    title: 'AI Agent 工程课程',
    desc: '围绕 function calling、工具契约与多步推理，整理一套可上手的实战课程。',
  },
  {
    status: 'RESEARCHING',
    accent: 'lavender',
    title: 'Schema 驱动的内容治理',
    desc: '用 Content Collections 与永久 id/slug 分离，探索可维护的内容架构。',
  },
  {
    status: 'SHARING',
    accent: 'action',
    title: '每周技术随笔',
    desc: '在博客公开记录被模型重塑的学习、表达与创作过程。',
  },
];

// —— 联系 CTA ——
export const contactCta = {
  eyebrow: 'CONTACT / 05',
  title: '一起把想法变成结构。',
  sub: '无论是课程合作、技术写作、开源贡献，还是只想聊聊 schema、Agent 与设计系统——我都很乐意听见你的想法。',
  email: 'luke@schemax.dev',
  github: 'https://github.com/',
  rss: '/rss.xml',
  meta: {
    response: 'RESPONSE TIME / 通常 24 小时内回复',
    location: 'BASED IN REMOTE / 远程协作',
  },
} as const;

// accent 键 → token 映射（单一真相，组件统一引用）。
export const accentToken: Record<Accent, string> = {
  accent: 'var(--sx-sys-color-accent)',
  mint: 'var(--sx-sys-color-mint)',
  lavender: 'var(--sx-sys-color-lavender)',
  action: 'var(--sx-sys-color-action-primary)',
  beige: 'var(--sx-sys-color-beige)',
  success: 'var(--sx-sys-color-success)',
  danger: 'var(--sx-sys-color-danger)',
  surface: 'var(--sx-sys-color-bg-surface)',
};
