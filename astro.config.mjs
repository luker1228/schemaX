import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

// NOTE: 占位域名 —— 部署前请在 src/config/site.ts 与此处替换为真实域名。
export default defineConfig({
  site: 'https://schemax.dev',
  integrations: [
    // Expressive Code 必须在 mdx() 之前，否则 .mdx 中的代码块不会被处理。
    expressiveCode(),
    mdx(),
    svelte(),
    sitemap(),
  ],
});
