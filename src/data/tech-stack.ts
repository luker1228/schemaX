// 技术栈数据（About 页面展示）。
export interface TechCategory {
  name: string;
  description: string;
  items: TechItem[];
}

export interface TechItem {
  name: string;
  level: 1 | 2 | 3 | 4; // 熟练度等级，用于活动图着色
  years?: number; // 使用年限
  featured?: boolean; // 是否重点展示
}

export const techStack: TechCategory[] = [
  {
    name: '前端开发',
    description: '构建现代 Web 应用的核心技术',
    items: [
      { name: 'React', level: 4, years: 5, featured: true },
      { name: 'Vue', level: 4, years: 4 },
      { name: 'Astro', level: 3, years: 2 },
      { name: 'Next.js', level: 3, years: 3 },
      { name: 'TypeScript', level: 4, years: 4, featured: true },
      { name: 'Tailwind CSS', level: 4, years: 3 },
      { name: 'Vite', level: 3, years: 3 },
      { name: 'CSS / Sass', level: 3, years: 5 },
    ],
  },
  {
    name: '后端开发',
    description: '服务端逻辑与 API 设计',
    items: [
      { name: 'Node.js', level: 4, years: 5, featured: true },
      { name: 'Go', level: 3, years: 2 },
      { name: 'Python', level: 3, years: 4 },
      { name: 'PostgreSQL', level: 3, years: 3 },
      { name: 'MongoDB', level: 3, years: 3 },
      { name: 'Redis', level: 2, years: 2 },
      { name: 'REST API', level: 4, years: 5 },
      { name: 'GraphQL', level: 2, years: 2 },
    ],
  },
  {
    name: 'AI & Agent',
    description: 'AI 应用与 Agent 开发',
    items: [
      { name: 'Claude API', level: 4, years: 1, featured: true },
      { name: 'OpenAI API', level: 3, years: 2 },
      { name: 'LangChain', level: 3, years: 1 },
      { name: 'Python AI Stack', level: 3, years: 2 },
      { name: 'Prompt Engineering', level: 4, years: 2 },
      { name: 'RAG', level: 3, years: 1 },
      { name: 'Function Calling', level: 4, years: 1 },
    ],
  },
  {
    name: '工具 & 工程化',
    description: '开发效率与工程实践',
    items: [
      { name: 'Git', level: 4, years: 6, featured: true },
      { name: 'Docker', level: 3, years: 3 },
      { name: 'CI/CD', level: 3, years: 3 },
      { name: 'Linux', level: 3, years: 4 },
      { name: 'VS Code', level: 4, years: 5 },
      { name: 'pnpm', level: 3, years: 2 },
      { name: 'ESLint', level: 3, years: 4 },
      { name: 'Prettier', level: 3, years: 4 },
    ],
  },
] as const;
