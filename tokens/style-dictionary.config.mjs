// SchemaX 设计令牌构建配置（Style Dictionary v5，DTCG 自动识别）。
// 令牌源以 tier 在前（ref / sys / layout / article / comp）编写，
// 配合 prefix 'sx' + name/kebab，输出与规范 §15 完全一致的
// --sx-ref-color-blue-500 / --sx-sys-color-action-primary 等命名。
export default {
  source: ['tokens/src/**/*.json'],

  // 仅用 name/kebab 做命名，不施加任何数值变换 ——
  // 取值（hex / rem / px / shadow 字符串）已是最终值，原样输出。
  platforms: {
    css: {
      transforms: ['name/kebab'],
      prefix: 'sx',
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true, // 别名以 var(--sx-…) 输出，保留引用关系
          },
        },
      ],
    },
    ts: {
      transforms: ['name/kebab'],
      prefix: 'sx',
      buildPath: 'src/generated/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'javascript/esm',
          options: {
            minify: true, // 仅输出取值树，剥离 SD 元数据
          },
        },
      ],
    },
  },
};
