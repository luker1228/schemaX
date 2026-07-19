// 由 `pnpm tokens:build` 调用：用 Style Dictionary v5 程序化构建令牌产物。
// 产出：src/styles/generated/tokens.css 与 src/generated/tokens.ts。
import StyleDictionary from 'style-dictionary';
import config from '../tokens/style-dictionary.config.mjs';

const sd = new StyleDictionary(config);
await sd.hasInitialized;
await sd.buildAllPlatforms();

console.log(
  '✓ Tokens built → src/styles/generated/tokens.css, src/generated/tokens.ts',
);
