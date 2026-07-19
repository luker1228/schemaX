// 独立内容校验脚本（`pnpm content:check`）。
// 复用 src/schemas/content.ts 的纯 Zod schema（注入 stringRef），
// 对 src/content/** 的 frontmatter 与 src/data/topics.json 做快速校验，
// 在完整 astro build 之前给出早期反馈。
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import matter from 'gray-matter';
import { z } from 'astro/zod';
import {
  postFields,
  courseFields,
  lessonFields,
  projectFields,
  topicSchema,
} from '../src/schemas/content';

const root = process.cwd();
const stringRef = () => z.string();

const schemas = {
  posts: postFields({ ref: stringRef }),
  courses: courseFields({ ref: stringRef }),
  lessons: lessonFields({ ref: stringRef }),
  projects: projectFields({ ref: stringRef }),
} as const;

type CollectionName = keyof typeof schemas;

const collectionDirs: Record<CollectionName, string> = {
  posts: 'src/content/posts',
  courses: 'src/content/courses',
  lessons: 'src/content/lessons',
  projects: 'src/content/projects',
};

async function listContentFiles(dir: string): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return []; // 目录不存在视为空集合
  }
  const files: string[] = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await listContentFiles(full)));
    } else if (e.isFile() && /\.(md|mdx)$/.test(e.name)) {
      files.push(full);
    }
  }
  return files;
}

interface Failure {
  file: string;
  messages: string[];
}
const failures: Failure[] = [];
let checked = 0;

for (const name of Object.keys(collectionDirs) as CollectionName[]) {
  const dir = join(root, collectionDirs[name]);
  const files = await listContentFiles(dir);
  for (const file of files) {
    checked++;
    const raw = await readFile(file, 'utf8');
    const { data } = matter(raw);
    const result = schemas[name].safeParse(data);
    if (!result.success) {
      failures.push({
        file: relative(root, file),
        messages: result.error.issues.map(
          (i) => `  • ${i.path.join('.') || '(root)'}: ${i.message}`,
        ),
      });
    }
  }
}

// 校验 topics.json（数组每项需含 id）。
const topicsFile = join(root, 'src/data/topics.json');
try {
  const topicsRaw = JSON.parse(await readFile(topicsFile, 'utf8'));
  const tSchema = topicSchema();
  const arr = Array.isArray(topicsRaw) ? topicsRaw : [];
  for (const item of arr) {
    checked++;
    const r = tSchema.safeParse(item);
    if (!r.success) {
      failures.push({
        file: 'src/data/topics.json',
        messages: r.error.issues.map(
          (i) => `  • ${i.path.join('.') || '(root)'}: ${i.message}`,
        ),
      });
    }
  }
} catch (e) {
  failures.push({
    file: 'src/data/topics.json',
    messages: [`  • 无法解析: ${(e as Error).message}`],
  });
}

if (failures.length > 0) {
  console.error(`\n✗ 内容校验失败（${failures.length} 个文件）：\n`);
  for (const f of failures) {
    console.error(`  ${f.file}`);
    for (const m of f.messages) console.error(m);
    console.error('');
  }
  process.exit(1);
}

console.log(`✓ 内容校验通过（${checked} 项）。`);
