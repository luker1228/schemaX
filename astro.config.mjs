import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// NOTE: 占位域名 —— 部署前请在 src/config/site.ts 与此处替换为真实域名。
export default defineConfig({
  site: 'https://schemax.dev',
  integrations: [
    // Expressive Code 必须在 mdx() 之前，否则 .mdx 中的代码块不会被处理。
    expressiveCode(),
    mdx(),
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  // 重定向（静态输出下 Astro 为旧路径生成 meta-refresh 跳转页，真正生效）。
  // src/config/redirects.ts 是规范记录的中央表；要让某条真正跳转，需在此登记。
  redirects: {
    '/courses/frontend-handbook/fe-css-figma': '/courses/frontend-handbook/fe-css-basics',
  },
});
