// 站点级配置（SEO / RSS / sitemap / footer 共用）。
// 注意：url 为占位值，部署前请同步修改此处与 astro.config.mjs 的 site。
export const site = {
  name: 'SchemaX',
  tagline: 'Structure the Unknown.',
  /** 用于 meta description / OG 的默认站点描述。 */
  description:
    'SchemaX —— 用 Schema 为未知建立可执行的结构。Luke 的课程、技术思考、开源作品与设计系统。',
  /** 品牌副标题（Header brand-text 第二行）。 */
  brandTagline: '协议是一等公民',
  url: 'https://schemax.dev',
  locale: 'en',
  author: {
    name: 'Luke',
    role: 'AI Agent Engineer',
  },
  social: [{ label: 'GitHub', href: 'https://github.com/' }],
  /** 站点 RSS 订阅地址（Header CTA / Footer 共用）。由 src/pages/rss.xml.ts 生成。 */
  rss: {
    label: 'RSS',
    href: '/rss.xml',
  },
} as const;
