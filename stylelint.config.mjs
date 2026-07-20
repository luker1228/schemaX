// Stylelint 配置 —— SchemaX
// 实现规范 §17 的 Token 使用约束：
//   - 禁止业务代码硬编码颜色（强制 var(--sx-*))
//   - 强制自定义属性使用 --sx-* 前缀
//   - color / background 等只能用 var() 或合法关键字
// 注意：生成产物（tokens.css）作为 token 定义源头，单独豁免。
//
// Stylelint 16 已移除所有 stylistic（格式类）规则，格式交由 Prettier 负责。
// 本配置只保留代码质量与 Token 约束规则。

/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    // ── §17 Token 约束（核心）──────────────────────────────
    'color-no-hex': true, // 禁止裸十六进制色值
    'color-no-invalid-hex': true,
    // color / background / border-color 只允许 var() 或合法关键字
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
    // .astro / .svelte 的 <style> 块用 postcss-html 解析
    {
      files: ['**/*.astro', '**/*.svelte'],
      customSyntax: 'postcss-html',
    },
  ],
};
