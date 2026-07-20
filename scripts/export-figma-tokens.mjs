// 由 `pnpm tokens:figma` 调用：把 tokens/src/*.json 合并、按类型重组、
// 解析引用与 shadow 字符串，导出为 Tokens Studio（W3C DTCG）可直接导入的
// 单一 JSON —— tokens/dist/figma-tokens.json。
//
// 与 build-tokens.mjs（Style Dictionary → CSS/TS）是平行链路：不污染 CSS/TS
// 产物，源令牌仍是唯一真相。无法精确映射到 Figma 的令牌（复合阴影、clamp()、
// 跨 group 引用解析失败）会被跳过并在控制台打印 warning，保证导出 JSON 100%
// 干净可导入。
//
// 顶层 group 按 Tokens Studio 约定：color / spacing / dimension / boxShadow /
// borderRadius / borderWidth / typography / other。
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'tokens', 'src');
const OUT_DIR = path.join(ROOT, 'tokens', 'dist');
const OUT_FILE = path.join(OUT_DIR, 'figma-tokens.json');

// ---- 1. 加载并合并所有 tier（保留 $description）----
async function loadSourceTokens() {
  const files = (await readdir(SRC_DIR)).filter((f) => f.endsWith('.json'));
  /** @type {Record<string, unknown>} */
  const merged = {};
  for (const f of files) {
    const raw = JSON.parse(await readFile(path.join(SRC_DIR, f), 'utf8'));
    // 跳过 $schema 等顶层元数据键，只合并令牌 group
    for (const [k, v] of Object.entries(raw)) {
      if (k.startsWith('$')) continue;
      if (k in merged) {
        merged[k] = deepMerge(
          /** @type {Record<string, unknown>} */ (merged[k]),
          v,
        );
      } else {
        merged[k] = v;
      }
    }
  }
  return merged;
}

/**
 * 浅层优先、深层递归的对象合并（数组与原始值直接覆盖）。
 * @param {Record<string, unknown>} a
 * @param {unknown} b
 */
function deepMerge(a, b) {
  if (isPlainObject(b)) {
    for (const [k, v] of Object.entries(
      /** @type {Record<string, unknown>} */ (b),
    )) {
      if (isPlainObject(v) && isPlainObject(a[k])) {
        a[k] = deepMerge(/** @type {Record<string, unknown>} */ (a[k]), v);
      } else {
        a[k] = v;
      }
    }
    return a;
  }
  return /** @type {Record<string, unknown>} */ (/** @type {unknown} */ (b));
}

/** @param {unknown} v */
function isPlainObject(v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

// ---- 2. 遍历令牌树，收集叶子节点（带 path） ----
/**
 * @typedef {Object} Leaf
 * @property {string[]} path  如 ['sys', 'color', 'bg', 'page']
 * @property {string} type   $type 原始值
 * @property {unknown} value $value 原始值（可能是引用、字符串、数字）
 * @property {string} [description]
 */

/** @param {Record<string, unknown>} node */
function collectLeaves(node) {
  /** @type {Leaf[]} */
  const leaves = [];
  walk(node, []);
  return leaves;

  /**
   * @param {Record<string, unknown>} node
   * @param {string[]} prefix
   */
  function walk(node, prefix) {
    // DTCG 叶子：有 $value 就是 token
    if (typeof node.$value !== 'undefined') {
      leaves.push({
        path: prefix,
        type: String(node.$type ?? ''),
        value: node.$value,
        description:
          typeof node.$description === 'string' ? node.$description : undefined,
      });
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('$')) continue;
      if (isPlainObject(v)) {
        walk(/** @type {Record<string, unknown>} */ (v), [...prefix, k]);
      }
    }
  }
}

// ---- 3. 引用解析：{a.b.c} → 在源树中查到的叶子 ----

/**
 * 在 leaves 中按 path 查找。
 * @param {Leaf[]} leaves
 * @param {string[]} refPath
 */
function findLeafByPath(leaves, refPath) {
  const key = refPath.join('.');
  return leaves.find((l) => l.path.join('.') === key);
}

/**
 * 把引用字符串 {a.b.c} 解析为对应叶子的实际值。
 * 多次引用、嵌套引用都会递归解析。返回 null 表示解析失败。
 * @param {string} value
 * @param {Leaf[]} leaves
 * @param {Set<string>} [seen] 防环
 */
function resolveReference(value, leaves, seen = new Set()) {
  // 形如 "{ref.color.paper}" 的整串引用
  const m = /^\{([^{}]+)\}$/.exec(value.trim());
  if (!m) return null;
  const refPath = m[1].split('.');
  if (seen.has(m[1])) return null; // 循环引用
  seen.add(m[1]);
  const target = findLeafByPath(leaves, refPath);
  if (!target) return null;
  if (
    typeof target.value === 'string' &&
    /^\{[^{}]+\}$/.test(target.value.trim())
  ) {
    return resolveReference(target.value, leaves, seen);
  }
  return target.value;
}

/**
 * 把字符串中所有 {a.b.c} 引用就地替换为解析后的值（用于复合值，如
 * "6px 6px 0 {ref.color.yellow.400}"）。只要任一引用解析失败就返回 null。
 * @param {string} s
 * @param {Leaf[]} leaves
 */
function interpolateRefs(s, leaves) {
  let out = s;
  const refs = s.match(/\{[^{}]+\}/g) ?? [];
  for (const ref of refs) {
    const resolved = resolveReference(ref, leaves);
    if (resolved == null) return null;
    out = out.replace(ref, String(resolved));
  }
  return out;
}

// ---- 4. 值规范化：把字符串解析为 Tokens Studio 期望的形态 ----

const PX_PER_REM = 16;

/**
 * 解析长度字符串为 { value, unit }。仅接受整数 / 小数 + px/rem/无单位数字。
 * 不接受 clamp() / calc() / vw / %。失败返回 null。
 * @param {string} s
 */
function parseDimension(s) {
  const str = s.trim();
  if (/^[-+]?\d+(\.\d+)?$/.test(str)) {
    return { value: parseFloat(str), unit: 'px' }; // 无单位数字按 px 处理（line-height 由 caller 决定）
  }
  const m = /^([-+]?\d+(?:\.\d+)?)(px|rem)$/.exec(str);
  if (!m) return null;
  const num = parseFloat(m[1]);
  if (m[2] === 'rem') return { value: num * PX_PER_REM, unit: 'px' };
  return { value: num, unit: 'px' };
}

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

/**
 * 解析 shadow 字符串为 Tokens Studio 的 boxShadow 对象：
 *   { x, y, blur, spread, color, type }
 * 仅支持单一层（无逗号）。失败返回 null。
 * @param {string} s
 */
function parseShadow(s) {
  const str = s.trim();
  // 多层阴影（含逗号）—— Figma 变量不支持多层，跳过
  if (str.includes(',')) return null;
  // 形如 "6px 6px 0 #000000" / "2px 2px 0 1px #000000"
  // 拆出末尾颜色（#hex 或 rgba(...)）
  const colorMatch = str.match(/(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))$/);
  if (!colorMatch) return null;
  const color = colorMatch[1];
  const rest = str.slice(0, str.length - color.length).trim();
  const parts = rest.split(/\s+/).filter(Boolean);
  const nums = parts.map((p) => parseFloat(p));
  if (nums.some((n) => Number.isNaN(n))) return null;
  const [x = 0, y = 0, blur = 0, spread = 0] = nums;
  return { x, y, blur, spread, color, type: 'dropShadow' };
}

// ---- 5. 分组重组：按类型映射到 Tokens Studio 顶层 group ----

/**
 * 按叶子 path 的第一段 + 类型，决定它落到哪个 Figma group。
 * 保留 tier 语义作为子 group：例如 sys.color.bg.page → color.sys.bg.page。
 * @param {Leaf} leaf
 * @param {Leaf[]} allLeaves
 */
function mapLeafToFigma(leaf, allLeaves) {
  const [tier, ...rest] = leaf.path;
  /** @type {string[]} */
  let groupPath;
  /** @type {unknown} */
  let figmaValue;
  /** @type {string} */
  let figmaType;

  switch (leaf.type) {
    case 'color': {
      const resolved =
        typeof leaf.value === 'string'
          ? interpolateRefs(leaf.value, allLeaves)
          : leaf.value;
      if (typeof resolved !== 'string' || !HEX_RE.test(resolved.trim())) {
        return skip(
          leaf,
          `color 值解析失败或非 hex：${JSON.stringify(leaf.value)}`,
        );
      }
      figmaValue = resolved.trim();
      figmaType = 'color';
      groupPath = ['color', tier, ...rest];
      break;
    }
    case 'dimension': {
      const raw =
        typeof leaf.value === 'string' ? leaf.value : String(leaf.value);
      const resolved = interpolateRefs(raw, allLeaves);
      if (resolved == null) {
        return skip(leaf, `dimension 引用解析失败：${raw}`);
      }
      // ref.space.* → spacing group（Tokens Studio 约定）
      if (tier === 'ref' && rest[0] === 'space') {
        const dim = parseDimension(resolved);
        if (!dim) return skip(leaf, `spacing 值无法解析：${resolved}`);
        figmaValue = dim.value;
        figmaType = 'spacing';
        groupPath = ['spacing', ...rest.slice(1)];
        break;
      }
      // border width
      if (tier === 'sys' && rest[0] === 'border' && rest[1] === 'width') {
        const dim = parseDimension(resolved);
        if (!dim) return skip(leaf, `borderWidth 值无法解析：${resolved}`);
        figmaValue = dim.value;
        figmaType = 'borderWidth';
        groupPath = ['borderWidth'];
        break;
      }
      // radius
      if (tier === 'sys' && rest[0] === 'radius') {
        const dim = parseDimension(resolved);
        if (!dim) return skip(leaf, `borderRadius 值无法解析：${resolved}`);
        figmaValue = dim.value;
        figmaType = 'borderRadius';
        groupPath = ['borderRadius', ...rest.slice(1)];
        break;
      }
      // 其它 dimension（width / font-size / line-height / padding …）→ dimension
      const dim = parseDimension(resolved);
      if (!dim) return skip(leaf, `dimension 值无法解析：${resolved}`);
      figmaValue = dim.value;
      figmaType = 'dimension';
      groupPath = ['dimension', tier, ...rest];
      break;
    }
    case 'shadow': {
      const raw = String(leaf.value);
      const resolved = interpolateRefs(raw, allLeaves);
      if (resolved == null) {
        return skip(leaf, `shadow 引用解析失败：${raw}`);
      }
      const shadow = parseShadow(resolved);
      if (!shadow) {
        return skip(leaf, `shadow 无法映射到单一 Figma effect：${resolved}`);
      }
      figmaValue = shadow;
      figmaType = 'boxShadow';
      groupPath = ['boxShadow', tier, ...rest];
      break;
    }
    default:
      return skip(leaf, `未知 $type：${leaf.type}`);
  }

  return {
    groupPath,
    value: figmaValue,
    type: figmaType,
    description: leaf.description,
  };
}

/** @param {Leaf} leaf @param {string} reason */
function skip(leaf, reason) {
  return { skip: true, path: leaf.path.join('.'), reason };
}

// ---- 6. 写入：把映射后的叶子塞进嵌套对象 ----

/**
 * @param {Record<string, unknown>} root
 * @param {string[]} groupPath
 * @param {{ value: unknown; type: string; description?: string }} token
 */
function setToken(root, groupPath, token) {
  let node = root;
  for (const key of groupPath.slice(0, -1)) {
    if (typeof node[key] !== 'object' || node[key] === null) {
      node[key] = {};
    }
    node = /** @type {Record<string, unknown>} */ (node[key]);
  }
  const last = groupPath[groupPath.length - 1];
  /** @type {Record<string, unknown>} */
  const leaf = { $value: token.value, $type: token.type };
  if (token.description) leaf.$description = token.description;
  node[last] = leaf;
}

// ---- 主流程 ----
async function main() {
  const merged = await loadSourceTokens();
  const leaves = collectLeaves(merged);

  /** @type {Record<string, unknown>} */
  const out = { $schema: 'https://designtokens.org/TR/2025.10/format/' };
  /** @type {{ path: string; reason: string }[]} */
  const skipped = [];

  for (const leaf of leaves) {
    const result = mapLeafToFigma(leaf, leaves);
    if ('skip' in result && result.skip) {
      skipped.push({ path: result.path, reason: result.reason });
      continue;
    }
    if ('groupPath' in result && result.groupPath) {
      setToken(out, result.groupPath, {
        value: result.value,
        type: result.type,
        description: result.description,
      });
    }
  }

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(out, null, 2) + '\n', 'utf8');

  const total = leaves.length;
  const ok = total - skipped.length;
  console.log(
    `✓ Figma tokens 导出：${ok}/${total} 个令牌 → tokens/dist/figma-tokens.json`,
  );
  if (skipped.length) {
    console.log(`\n⚠ 跳过 ${skipped.length} 个令牌（Figma 无法表达）：`);
    for (const s of skipped) {
      console.log(`   - ${s.path}：${s.reason}`);
    }
  }
}

main().catch((err) => {
  console.error('✗ Figma tokens 导出失败：', err);
  process.exit(1);
});
