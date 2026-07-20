// ESLint 9 flat config —— SchemaX
// 覆盖 .ts / .astro / .svelte。Prettier 负责 formatting，此处用
// eslint-config-prettier 关闭所有与 Prettier 冲突的格式化规则。
// 详见 init.md §24（CI 脚本契约）。

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // ── 全局忽略 ──────────────────────────────────────────────
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      'src/generated/**', // 构建产物：tokens.ts / github.json
      'src/styles/generated/**', // Style Dictionary 输出的 tokens.css
      'scripts/**', // 构建脚本，独立环境
      'pnpm-lock.yaml',
    ],
  },

  // ── 基础 JS/TS 规则 ───────────────────────────────────────
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 全局变量与解析器选项
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024,
      },
    },
    rules: {
      // 与 Prettier 协作：只保留代码质量规则，格式交给 Prettier
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off', // 交给 @typescript-eslint
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },

  // ── Astro 组件 ────────────────────────────────────────────
  ...astro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // ── Svelte 组件 ───────────────────────────────────────────
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        // 让 <script lang="ts"> 用 TS parser，否则 interface / 类型语法会解析失败
        parser: tseslint.parser,
        extraFileExtensions: ['.svelte'],
      },
    },
  },

  // ── 测试文件放松 ──────────────────────────────────────────
  {
    files: ['tests/**/*.{ts,js}', '**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },

  // ── 关闭所有与 Prettier 冲突的格式化规则（必须放最后）─────
  prettier,
];
