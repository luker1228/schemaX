// Stylelint 配置 —— SchemaX
// 实现规范 §17 的 Token 使用约束：
//   - 禁止业务代码硬编码颜色（强制 var(--sx-*))
//   - 强制自定义属性使用 --sx-* 前缀
//   - color / background 等只能用 var() 或合法关键字
//   - font-size 必须走 sys.font.size.*（10 档）或 sys.font.display.*（3 档）
//   - @media 宽阈值必须命中 5 档断点白名单（方案 A）
// 注意：生成产物（tokens.css）作为 token 定义源头，单独豁免。
//
// Stylelint 16 已移除所有 stylistic（格式类）规则，格式交由 Prettier 负责。
// 本配置只保留代码质量与 Token 约束规则。

/** sys.font.size 10 档 + sys.font.display 3 档（tokens/src/semantic.json） */
const SX_FONT_SIZE_TOKENS = [
  // size：xs → 4xl
  'var(--sx-sys-font-size-xs)',
  'var(--sx-sys-font-size-sm)',
  'var(--sx-sys-font-size-md)',
  'var(--sx-sys-font-size-base)',
  'var(--sx-sys-font-size-lg)',
  'var(--sx-sys-font-size-reading)',
  'var(--sx-sys-font-size-xl)',
  'var(--sx-sys-font-size-2xl)',
  'var(--sx-sys-font-size-3xl)',
  'var(--sx-sys-font-size-4xl)',
  // display：hero / 分区标题 clamp
  'var(--sx-sys-font-display-sm)',
  'var(--sx-sys-font-display-md)',
  'var(--sx-sys-font-display-lg)',
];

/** 语义别名：最终仍解析到上表 size/display，禁止再开新的裸 rem 字号 */
const SX_FONT_SIZE_ALIASES = [
  'var(--sx-article-font-size)', // → size.reading
  'var(--sx-comp-page-head-title-size)', // → display.lg
  'var(--sx-comp-page-head-desc-size)', // → size.reading
];

/** 断点 5 档（sys.breakpoint.*）；CSS 变量不能写进 @media，白名单字面 rem */
const SX_BREAKPOINTS = ['36rem', '45rem', '48rem', '64rem', '82rem'];

/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    // ── §17 Token 约束（核心）──────────────────────────────
    'color-no-hex': true, // 禁止裸十六进制色值
    'color-no-invalid-hex': true,
    // color / background / border-color / font-size 只允许 token 或合法例外
    'declaration-property-value-allowed-list': {
      // color-scheme 接受 light/dark/light dark 等关键字
      'color-scheme': ['light', 'dark', 'light dark', 'dark light', 'normal'],
      '/^color/': ['inherit', 'transparent', 'currentColor', '/^var\\(/'],
      '/^background/': [
        'inherit',
        'transparent',
        'currentColor',
        '/^var\\(/',
        '/^color-mix\\(/',
        '/^url\\(/',
      ],
      '/^border-color/': [
        'inherit',
        'transparent',
        'currentColor',
        '/^var\\(/',
      ],
      // font-size：禁止 1.2rem / clamp(...) / px 等裸字号
      // 必须用 size.* / display.*；别名仅限已接线的 article / page-head
      // 例外：inherit；相对 em（行内 code/kbd 随父级缩放，不占用字号阶梯）
      'font-size': [
        'inherit',
        ...SX_FONT_SIZE_TOKENS,
        ...SX_FONT_SIZE_ALIASES,
        '/^\\d+(\\.\\d+)?em$/',
      ],
    },
    // @media (min|max)-width 必须命中 5 档断点
    'media-feature-name-value-allowed-list': {
      'max-width': SX_BREAKPOINTS,
      'min-width': SX_BREAKPOINTS,
      width: SX_BREAKPOINTS,
    },
    // 自定义属性必须以 --sx- 开头
    'custom-property-pattern': '^sx-',

    // ── 基础质量规则 ────────────────────────────────────────
    'length-zero-no-unit': true,
    'unit-no-unknown': true,
    'value-no-vendor-prefix': true,
    'property-no-vendor-prefix': [
      true,
      {
        // reset.css 中保留这两个前缀以保证移动端 / 旧 Safari 兼容
        ignoreProperties: ['text-size-adjust'],
      },
    ],

    // ── 命名风格不强约束（业务自定 BEM 等）─────────────────
    'selector-class-pattern': null,
    // 允许 Astro 的 :global() / Svelte 的 :global() 作用域逃逸
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global', 'local'] },
    ],

    // ── 格式偏好交由开发者 / Prettier ──────────────────────
    'rule-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'comment-empty-line-before': null,
    // @import 用字符串形式（Astro / 主流写法），不强制 url()
    'import-notation': null,
    // 媒体查询保留 max-width: X 旧式范围语法，不强制 (width <= X)
    'media-feature-range-notation': null,
  },
  overrides: [
    // 生成产物：token 定义源头，必须允许裸色值与任意自定义属性名
    {
      files: ['**/generated/tokens.css', '**/generated/**/*.css'],
      rules: {
        'color-no-hex': null,
        'custom-property-pattern': null,
        'declaration-property-value-allowed-list': null,
        'media-feature-name-value-allowed-list': null,
      },
    },
    // code.css：覆盖第三方 Expressive Code 的 --ec-* 变量，
    // 必须使用第三方 --ec- 前缀 + 少量裸色值（深色代码区背景），
    // 视为第三方系统的 escape hatch，整体豁免前缀约束。
    {
      files: ['**/styles/code.css'],
      rules: {
        'color-no-hex': null,
        'custom-property-pattern': null,
      },
    },
    // tailwind.css：Tailwind v4 @theme 桥接层，把 --sx-* token 映射到
    // Tailwind/shadcn 标准命名空间（--color-background / --color-primary 等），
    // 供 shadcn/ui（React）组件消费。桥接变量必须用 Tailwind 约定名，不以 sx-
    // 开头，视为桥接层 escape hatch，豁免前缀约束。
    {
      files: ['**/styles/tailwind.css'],
      rules: {
        'custom-property-pattern': null,
        // Tailwind v4 特有 at-rules（@theme / @apply / @variant 等），stylelint 默认不识别
        'at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: [
              'theme',
              'apply',
              'variant',
              'custom-variant',
              'utility',
              'plugin',
              'config',
              'reference',
              'tailwindcss',
            ],
          },
        ],
      },
    },
    // .astro 的 <style> 块用 postcss-html 解析（React .tsx 无 style 块，不扫）
    {
      files: ['**/*.astro'],
      customSyntax: 'postcss-html',
    },
  ],
};
