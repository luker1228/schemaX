// GitHub 数据同步（`pnpm github:sync`）—— 占位实现。
// 真实的 GitHub API 同步（stars/forks/issues/last pushed 等）在第五阶段实现（规范 §19）。
// 此处仅写入空缓存，保证脚本能运行、构建链不依赖网络。
import { writeFile, mkdir } from 'node:fs/promises';

await mkdir('src/generated', { recursive: true });
await writeFile(
  'src/generated/github.json',
  `${JSON.stringify({ repositories: [] }, null, 2)}\n`,
  'utf8',
);

console.log(
  '✓ github:sync 占位已写入 src/generated/github.json（真实同步将在 Phase 5 实现）。',
);
