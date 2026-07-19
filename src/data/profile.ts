// 首页 Hero 上的 "Schema 卡片" 数据（规范 §4.1）。
// 仅作视觉语言呈现，并非真实 JSON 文档契约。
export const profile = {
  name: 'Luke',
  role: 'AI Agent Engineer',
  modes: ['build', 'learn', 'teach'],
  status: 'evolving',
} as const;
