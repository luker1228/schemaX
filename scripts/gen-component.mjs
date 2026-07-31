#!/usr/bin/env node
// gen-component.mjs —— 设计系统组件脚手架
//
// 用法：
//   pnpm gen:component Button              # 交互式询问标题/描述
//   pnpm gen:component Button 按钮描述...  # 命令行直接传参
//
// 生成：
//   1. src/components/design-system/<Name>.astro        组件本体
//   2. src/components/design-system/demos/<Name>Demo.astro  展示页演示
//   3. 更新 src/data/components-registry.ts            标记为 live
//
// 展示页 /design-system/components 是数据驱动的：
//   - registry 里 status=live 的条目会自动渲染对应 demo
//   - 新增 demo 文件会被 import.meta.glob 自动捕获
//   - 因此本脚本无需修改展示页本身。
//
// 分层约定：本脚本面向静态展示组件（.astro，零 JS）。
// 交互型组件（需要浏览器状态，如 Command / Dialog / Tabs / 搜索 / 主题切换 /
// Playground）用 React island（.tsx + client:*），不在本脚本范围。

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const COMPONENTS_DIR = join(ROOT, 'src/components/design-system');
const DEMOS_DIR = join(COMPONENTS_DIR, 'demos');
const REGISTRY_PATH = join(ROOT, 'src/data/components-registry.ts');

// ── 工具函数 ──────────────────────────────────────────────
const toPascal = (s) =>
  s
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');

const ask = async (rl, question, defaultValue) => {
  const hint = defaultValue ? ` (${defaultValue})` : '';
  const answer = (await rl.question(`${question}${hint}: `)).trim();
  return answer || defaultValue || '';
};

// ── 模板：组件本体 ────────────────────────────────────────
const componentTemplate = (name, title) => `---
// ${title} 组件 —— SchemaX UI
// TODO: 实现组件。下面的模板是一个最小可运行的占位，请按需替换。
//
// 设计语言：3px canonical 边框（border IS ornament）+ 纯黑零模糊硬影（3/6/9 ramp）+ paper 背景。状态用属性切换，非类名。
// 样式优先放入 src/styles/components.css 的全局类，组件文件只放组件私有的 scoped 微调。

interface Props {
  /** TODO: 按需定义 props。示例：label?: string */
  label?: string;
}

const { label = '${title}' } = Astro.props;
---

<div class="${name.toLowerCase()}">
  {label}
</div>

<style>
  .${name.toLowerCase()} {
    padding: var(--sx-ref-space-4);
    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);
    background: var(--sx-sys-color-bg-surface);
  }
</style>
`;

// ── 模板：演示文件 ────────────────────────────────────────
const demoTemplate = (name) => `---
// ${name} 演示 —— 仅供 /design-system/components 展示页使用。
// 展示页通过 import.meta.glob 自动捕获本文件。
// 演示块结构封装在 Demo.astro（head + stage + 折叠说明）。
import ${name} from '../${name}.astro';
import Demo from '../Demo.astro';
---

<>
  <Demo label="默认态" attr={'<${name} />'}>
    <${name} />
    <Fragment slot="note">
      <p>TODO: 补充 ${name} 的演示说明与状态变体。参考 demos/NavDemo.astro 的多状态结构。</p>
    </Fragment>
  </Demo>
</>
`;

// ── 主流程 ────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);

  // 判断是否需要交互：stdin 是 TTY 且参数不全时才问
  const isInteractive = process.stdin.isTTY && !args[0];
  const rl = isInteractive
    ? createInterface({ input: stdin, output: stdout })
    : null;

  try {
    // 1. 收集参数
    const rawName =
      args[0] || (rl ? await ask(rl, '组件名（PascalCase）') : '');
    if (!rawName) {
      console.error(
        '✗ 必须提供组件名。用法：pnpm gen:component <Name> [描述...]',
      );
      process.exit(1);
    }
    const name = toPascal(rawName);
    if (!/^[A-Z][a-zA-Z0-9]+$/.test(name)) {
      console.error(
        `✗ 组件名 "${name}" 不合法，需为 PascalCase（如 Button、NavBar）`,
      );
      process.exit(1);
    }

    const componentPath = join(COMPONENTS_DIR, `${name}.astro`);
    const demoPath = join(DEMOS_DIR, `${name}Demo.astro`);

    // 2. 检查是否已存在
    if (existsSync(componentPath)) {
      console.error(`✗ 组件已存在: ${componentPath}`);
      process.exit(1);
    }

    // 3. 询问或推断标题与描述
    let title = name;
    let description = `${name} 组件。`;
    if (args.slice(1).join(' ').trim()) {
      // 命令行直接给了描述：title 推断为 name，描述用参数
      description = args.slice(1).join(' ');
    } else if (rl) {
      title = await ask(rl, '中文标题', name);
      description = await ask(rl, '一句话描述', `${title}组件。`);
    }

    // 4. 确保 demos 目录存在
    const { mkdirSync } = await import('node:fs');
    mkdirSync(DEMOS_DIR, { recursive: true });

    // 5. 生成组件文件
    writeFileSync(componentPath, componentTemplate(name, title), 'utf8');
    console.log(`✓ 生成组件: ${componentPath}`);

    // 6. 生成 demo 文件
    writeFileSync(demoPath, demoTemplate(name), 'utf8');
    console.log(`✓ 生成演示: ${demoPath}`);

    // 7. 更新 registry
    updateRegistry(name, title, description);
    console.log(`✓ 更新清单: ${REGISTRY_PATH}`);

    console.log('');
    console.log('完成！访问 /design-system/components 查看演示。');
    console.log(
      `下一步：编辑 ${name}.astro 实现组件逻辑，编辑 ${name}Demo.astro 完善演示。`,
    );
  } finally {
    rl?.close();
  }
}

/**
 * 更新 components-registry.ts：
 * - 若已存在同名条目：把 status 改为 'live'，更新 title/description
 * - 若不存在：在数组末尾追加一条 live 记录
 * 采用文本替换，保留文件原有格式与注释。
 */
function updateRegistry(name, title, description) {
  const content = readFileSync(REGISTRY_PATH, 'utf8');

  // 转义描述里可能存在的特殊字符
  const descEsc = description.replace(/'/g, "\\'");

  // 尝试匹配已存在的条目（status 可为 planned/live）
  // 匹配形如：{ name: 'Button', ... status: 'planned' }
  const entryRegex = new RegExp(
    `(\\{\\s*name:\\s*'${name}'\\s*,[\\s\\S]*?status:\\s*)'(?:planned|live)'(\\s*,?\\s*\\})`,
  );

  if (entryRegex.test(content)) {
    // 已存在：替换 status 为 live，同时更新 title 和 description
    const updated = content.replace(entryRegex, (_match, prefix, suffix) => {
      // 进一步替换 title 与 description
      let rebuilt = `${prefix}'live'${suffix}`;
      rebuilt = rebuilt.replace(/title:\s*'[^']*'/, `title: '${title}'`);
      rebuilt = rebuilt.replace(
        /description:\s*'[^']*'/,
        `description: '${descEsc}'`,
      );
      return rebuilt;
    });
    writeFileSync(REGISTRY_PATH, updated, 'utf8');
    return;
  }

  // 不存在：在数组闭合 ] 之前追加新条目
  const newEntry = `  {\n    name: '${name}',\n    title: '${title}',\n    description: '${descEsc}',\n    status: 'live',\n  },\n`;
  const updated = content.replace(/(\n\];\s*)$/, `${newEntry}$1`);
  if (updated === content) {
    console.warn(
      '⚠ 未找到 registry 数组闭合位置，请手动在 components-registry.ts 追加条目',
    );
    return;
  }
  writeFileSync(REGISTRY_PATH, updated, 'utf8');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
