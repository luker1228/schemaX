// Prettier 配置 —— SchemaX
// 与 ESLint 协作：Prettier 管格式，ESLint 管代码质量（通过 eslint-config-prettier 解耦）。
/** @type {import("prettier").Config} */
export default {
  // 单行宽度
  printWidth: 80,
  // 缩进
  tabWidth: 2,
  useTabs: false,
  // 分号（Astro/TS 主流约定保留）
  semi: true,
  // 字符串：单引号，JSX 用双引号
  singleQuote: true,
  jsxSingleQuote: false,
  // 尾随逗号：ES 友好
  trailingComma: 'all',
  // 空格敏感：避免破坏 CSS/MDX 选择器
  bracketSpacing: true,
  // 箭头函数参数括号：始终
  arrowParens: 'always',
  // Astro 插件（.tsx 由 Prettier 内置支持，无需额外插件）
  plugins: ['prettier-plugin-astro'],
  // 覆盖：不同文件类型
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
    {
      files: '*.md',
      options: { proseWrap: 'preserve' },
    },
    {
      files: '*.mdx',
      options: { proseWrap: 'preserve' },
    },
  ],
};
