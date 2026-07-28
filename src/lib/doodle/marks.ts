/**
 * 命名涂鸦 mark 目录 —— SchemaX 涂鸦设计系统的「组件层」。
 * 全部经 RoughGenerator 生成，seed 固定 → SSR/构建可复现。
 */
import type { Options } from 'roughjs/bin/core';
import type { Point } from 'roughjs/bin/geometry';
import { doodlePresets, roughOptions } from './presets';
import {
  DOODLE_SEED_BASE,
  childSeed,
  drawableToPaths,
  makeMark,
  roughCircle,
  roughCurve,
  roughEllipse,
  roughLine,
  roughLinearPath,
  roughPath,
  roughPolygon,
  roughRect,
  type SvgMark,
} from './render';

export type DoodleMarkKind =
  | 'wave'
  | 'pencil'
  | 'dash'
  | 'star'
  | 'spark'
  | 'arrow'
  | 'brace'
  | 'icon-code'
  | 'icon-db'
  | 'icon-course'
  | 'icon-blog'
  | 'icon-base'
  | 'icon-palette'
  | 'icon-component'
  | 'icon-pattern'
  | 'icon-github'
  | 'frame'
  | 'underline';

export type DoodleSize = 'sm' | 'md' | 'lg';

const sizePx: Record<DoodleSize, number> = {
  sm: 28,
  md: 40,
  lg: 56,
};

/** 每个 kind 固定盐值，保证跨构建路径稳定 */
const KIND_SALT: Record<DoodleMarkKind, number> = {
  wave: 11,
  pencil: 22,
  dash: 33,
  star: 44,
  spark: 55,
  arrow: 66,
  brace: 77,
  'icon-code': 88,
  'icon-db': 99,
  'icon-course': 111,
  'icon-blog': 122,
  'icon-base': 155,
  'icon-palette': 166,
  'icon-component': 177,
  'icon-pattern': 188,
  'icon-github': 199,
  frame: 133,
  underline: 144,
};

export interface GetMarkOptions {
  size?: DoodleSize;
  /** 覆盖默认种子（一般不需要） */
  seed?: number;
  /** 规则类 mark（wave/pencil/dash）的水平跨度 */
  span?: number;
}

function seedFor(kind: DoodleMarkKind, override?: number): number {
  if (override !== undefined) return override;
  return childSeed(DOODLE_SEED_BASE, KIND_SALT[kind]);
}

function withSeed(base: Options, seed: number, salt = 0): Options {
  return { ...base, seed: childSeed(seed, salt) };
}

/* —— 规则 / 装饰 —— */

function markWave(seed: number, span: number): SvgMark {
  const h = 20;
  const pts: Point[] = [];
  const steps = 16;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * span;
    const y = h / 2 + Math.sin(t * Math.PI * 4) * 5;
    pts.push([x, y]);
  }
  const opt = withSeed(doodlePresets.inkLine(), seed);
  opt.strokeWidth = 1.6;
  return makeMark(span, h, drawableToPaths(roughCurve(pts, opt)), 'wave');
}

function markPencil(seed: number, span: number): SvgMark {
  const h = 12;
  const pts: Point[] = [];
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * span;
    const y = h / 2 + Math.sin(t * Math.PI * 6) * 2.2 + Math.sin(t * 17) * 0.6;
    pts.push([x, y]);
  }
  const opt = withSeed(doodlePresets.pencil(), seed);
  return makeMark(span, h, drawableToPaths(roughCurve(pts, opt)), 'pencil');
}

function markDash(seed: number, span: number): SvgMark {
  const h = 8;
  const opt = withSeed(doodlePresets.inkLine(), seed);
  opt.strokeWidth = 1.4;
  opt.strokeLineDash = [10, 8];
  opt.disableMultiStroke = true;
  return makeMark(
    span,
    h,
    drawableToPaths(roughLine(0, h / 2, span, h / 2, opt)),
    'dash',
  );
}

function markUnderline(seed: number, span: number): SvgMark {
  const h = 10;
  const opt = withSeed(
    roughOptions({ tier: 'loose', stroke: 'action', strokeWidth: 2 }),
    seed,
  );
  const pts: Point[] = [
    [2, h * 0.55],
    [span * 0.35, h * 0.7],
    [span * 0.7, h * 0.4],
    [span - 2, h * 0.6],
  ];
  return makeMark(span, h, drawableToPaths(roughCurve(pts, opt)), 'underline');
}

function markStar(seed: number, size: number): SvgMark {
  const cx = size / 2;
  const cy = size / 2;
  const outer = size * 0.42;
  const inner = size * 0.18;
  const pts: Point[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 2) * -1 + (i * Math.PI) / 4;
    const r = i % 2 === 0 ? outer : inner;
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  const fill = withSeed(doodlePresets.yellowStamp(), seed, 1);
  return makeMark(size, size, drawableToPaths(roughPolygon(pts, fill)), 'star');
}

function markSpark(seed: number, size: number): SvgMark {
  const cx = size / 2;
  const cy = size / 2;
  const outer = size * 0.4;
  const inner = size * 0.12;
  const pts: Point[] = [];
  for (let i = 0; i < 8; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 4;
    const r = i % 2 === 0 ? outer : inner;
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  const opt = withSeed(doodlePresets.blueStroke(), seed);
  opt.fill = undefined;
  opt.fillStyle = undefined;
  return makeMark(size, size, drawableToPaths(roughPolygon(pts, opt)), 'spark');
}

function markArrow(seed: number, size: number): SvgMark {
  // 经典手绘 →：近似水平箭身 + 开口箭头（两线汇于尖端）。
  // 旧版用折线 shaft + 未对齐 tip，易读成乱线；此处端点固定、roughness 偏低。
  const pad = Math.max(2.5, size * 0.06);
  const w = Math.round(size * 1.65);
  const h = Math.round(size * 0.78);
  const cy = h / 2;
  const tipX = w - pad;
  const tipY = cy;
  // 箭身止于箭头内侧，略伸入，避免断口
  const shaftEndX = tipX - size * 0.2;
  // 箭头两翼后沿
  const wingX = tipX - size * 0.4;
  const wingHalf = size * 0.26;

  const shaftOpt = withSeed(
    roughOptions({
      tier: 'tight',
      stroke: 'ink',
      strokeWidth: Math.max(1.7, size * 0.045),
      override: {
        disableMultiStroke: true,
        preserveVertices: true,
        maxRandomnessOffset: 1.1,
      },
    }),
    seed,
    1,
  );
  const headOpt = withSeed(
    roughOptions({
      tier: 'tight',
      stroke: 'ink',
      strokeWidth: Math.max(1.7, size * 0.045),
      override: {
        disableMultiStroke: true,
        preserveVertices: true,
        maxRandomnessOffset: 0.9,
        bowing: 0.5,
      },
    }),
    seed,
    2,
  );

  const shaft = roughLine(pad, cy, shaftEndX, cy, shaftOpt);
  // 上翼 / 下翼各自指向同一 tip，保证可读的箭头形
  const wingUp = roughLine(wingX, cy - wingHalf, tipX, tipY, headOpt);
  const wingDown = roughLine(
    wingX,
    cy + wingHalf,
    tipX,
    tipY,
    withSeed(
      roughOptions({
        tier: 'tight',
        stroke: 'ink',
        strokeWidth: Math.max(1.7, size * 0.045),
        override: {
          disableMultiStroke: true,
          preserveVertices: true,
          maxRandomnessOffset: 0.9,
          bowing: 0.5,
        },
      }),
      seed,
      3,
    ),
  );

  return makeMark(w, h, drawableToPaths(shaft, wingUp, wingDown), 'arrow');
}

/**
 * SchemaX 品牌花括号 mark（与 Header brand-logo__mark / schemax-mark 同轮廓）。
 * 坐标空间固定 144×144，外层 width/height 缩放到 size。
 */
const BRAND_BRACE_PATH =
  'M52 26H44C39.5817 26 36 29.5817 36 34V51.6914L58 72L36 92.3076V110C36 114.418 39.5817 118 44 118H52V136H34C25.1634 136 18 128.837 18 120V90C18 85.5817 14.4183 82 10 82H3V62H10C14.4183 62 18 58.4183 18 54V24C18 15.1634 25.1634 8 34 8H52V26ZM110 8C118.837 8 126 15.1634 126 24V54C126 58.4183 129.582 62 134 62H141V82H134C129.582 82 126 85.5817 126 90V120C126 128.837 118.837 136 110 136H92V118H100C104.418 118 108 114.418 108 110V92.3076L86 72L108 51.6914V34C108 29.5817 104.418 26 100 26H92V8H110Z';

function markBrace(seed: number, size: number): SvgMark {
  // 紧粗糙度 + 关 multi-stroke：保持品牌可读轮廓，仅带轻微手绘边
  const opt = withSeed(
    roughOptions({
      tier: 'tight',
      stroke: 'ink',
      fill: 'ink',
      fillRecipe: 'solid',
      strokeWidth: 1.25,
      override: {
        disableMultiStroke: true,
        disableMultiStrokeFill: true,
        preserveVertices: true,
        maxRandomnessOffset: 1.2,
        roughness: 0.75,
        bowing: 0.45,
        fillShapeRoughnessGain: 0.6,
      },
    }),
    seed,
    1,
  );

  const mark = makeMark(
    144,
    144,
    drawableToPaths(roughPath(BRAND_BRACE_PATH, opt)),
    'brace',
  );
  // 外框像素尺寸仍跟 size 档位走；viewBox 固定品牌坐标
  mark.width = size;
  mark.height = size;
  return mark;
}

function markFrame(seed: number, size: number): SvgMark {
  const pad = size * 0.08;
  const opt = withSeed(doodlePresets.inkLine(), seed);
  opt.strokeWidth = 1.6;
  return makeMark(
    size,
    size,
    drawableToPaths(
      roughRect(pad, pad, size - pad * 2, size - pad * 2, opt),
    ),
    'frame',
  );
}

/* —— 图标（手绘线稿 + 局部填色） —— */

function markIconCode(seed: number, size: number): SvgMark {
  const p = size * 0.12;
  const frame = roughRect(
    p,
    p * 1.2,
    size - p * 2,
    size - p * 2.4,
    withSeed(doodlePresets.iconOutline(), seed, 1),
  );
  const left = roughLinearPath(
    [
      [size * 0.38, size * 0.36],
      [size * 0.26, size * 0.5],
      [size * 0.38, size * 0.64],
    ],
    withSeed(doodlePresets.inkLine(), seed, 2),
  );
  const right = roughLinearPath(
    [
      [size * 0.62, size * 0.36],
      [size * 0.74, size * 0.5],
      [size * 0.62, size * 0.64],
    ],
    withSeed(doodlePresets.inkLine(), seed, 3),
  );
  const slash = roughLine(
    size * 0.56,
    size * 0.32,
    size * 0.44,
    size * 0.68,
    withSeed(doodlePresets.blueStroke(), seed, 4),
  );
  return makeMark(
    size,
    size,
    drawableToPaths(frame, left, right, slash),
    'icon-code',
  );
}

function markIconDb(seed: number, size: number): SvgMark {
  const cx = size / 2;
  const top = roughEllipse(
    cx,
    size * 0.28,
    size * 0.62,
    size * 0.22,
    withSeed(doodlePresets.yellowStamp(), seed, 1),
  );
  const body = roughPath(
    `M${size * 0.19} ${size * 0.28} V ${size * 0.72} C ${size * 0.19} ${size * 0.86}, ${size * 0.35} ${size * 0.9}, ${cx} ${size * 0.9} C ${size * 0.65} ${size * 0.9}, ${size * 0.81} ${size * 0.86}, ${size * 0.81} ${size * 0.72} V ${size * 0.28}`,
    withSeed(doodlePresets.iconOutline(), seed, 2),
  );
  const mid = roughEllipse(
    cx,
    size * 0.5,
    size * 0.62,
    size * 0.18,
    withSeed(
      roughOptions({
        tier: 'tight',
        stroke: 'ink',
        strokeWidth: 1.4,
        override: { disableMultiStroke: true },
      }),
      seed,
      3,
    ),
  );
  return makeMark(size, size, drawableToPaths(top, body, mid), 'icon-db');
}

function markIconCourse(seed: number, size: number): SvgMark {
  const book = roughPath(
    `M${size * 0.16} ${size * 0.3} L ${size * 0.5} ${size * 0.16} L ${size * 0.84} ${size * 0.3} L ${size * 0.84} ${size * 0.72} L ${size * 0.5} ${size * 0.86} L ${size * 0.16} ${size * 0.72} Z`,
    withSeed(
      roughOptions({
        tier: 'tight',
        stroke: 'ink',
        fill: 'paper',
        fillRecipe: 'solid',
        strokeWidth: 1.7,
      }),
      seed,
      1,
    ),
  );
  const spine = roughLine(
    size * 0.5,
    size * 0.16,
    size * 0.5,
    size * 0.86,
    withSeed(doodlePresets.inkLine(), seed, 2),
  );
  const line1 = roughLine(
    size * 0.24,
    size * 0.4,
    size * 0.4,
    size * 0.4,
    withSeed(doodlePresets.blueStroke(), seed, 3),
  );
  const line2 = roughLine(
    size * 0.24,
    size * 0.52,
    size * 0.38,
    size * 0.52,
    withSeed(doodlePresets.inkLine(), seed, 4),
  );
  const badge = roughCircle(
    size * 0.76,
    size * 0.72,
    size * 0.18,
    withSeed(doodlePresets.yellowStamp(), seed, 5),
  );
  return makeMark(
    size,
    size,
    drawableToPaths(book, spine, line1, line2, badge),
    'icon-course',
  );
}

function markIconBlog(seed: number, size: number): SvgMark {
  const page = roughPath(
    `M${size * 0.22} ${size * 0.16} H ${size * 0.62} L ${size * 0.78} ${size * 0.3} V ${size * 0.84} H ${size * 0.22} Z`,
    withSeed(
      roughOptions({
        tier: 'tight',
        stroke: 'ink',
        fill: 'surface',
        fillRecipe: 'solid',
        strokeWidth: 1.7,
      }),
      seed,
      1,
    ),
  );
  const fold = roughLinearPath(
    [
      [size * 0.62, size * 0.16],
      [size * 0.62, size * 0.3],
      [size * 0.78, size * 0.3],
    ],
    withSeed(doodlePresets.inkLine(), seed, 2),
  );
  const l1 = roughLine(
    size * 0.32,
    size * 0.46,
    size * 0.66,
    size * 0.46,
    withSeed(doodlePresets.inkLine(), seed, 3),
  );
  const l2 = roughLine(
    size * 0.32,
    size * 0.58,
    size * 0.62,
    size * 0.58,
    withSeed(doodlePresets.inkLine(), seed, 4),
  );
  const l3 = roughLine(
    size * 0.32,
    size * 0.7,
    size * 0.54,
    size * 0.7,
    withSeed(doodlePresets.blueStroke(), seed, 5),
  );
  const tag = roughRect(
    size * 0.32,
    size * 0.28,
    size * 0.18,
    size * 0.08,
    withSeed(doodlePresets.yellowStamp(), seed, 6),
  );
  return makeMark(
    size,
    size,
    drawableToPaths(page, fold, l1, l2, l3, tag),
    'icon-blog',
  );
}

/** Foundations：分层底座（基座 → 中层 → 顶层），像地基 / base */
function markIconBase(seed: number, size: number): SvgMark {
  const tight = (salt: number, fill?: 'accent' | 'paper' | 'surface') =>
    withSeed(
      roughOptions({
        tier: 'tight',
        stroke: 'ink',
        fill,
        fillRecipe: fill ? 'solid' : 'none',
        strokeWidth: 1.65,
        override: {
          disableMultiStroke: true,
          preserveVertices: true,
          maxRandomnessOffset: 1,
          roughness: 0.85,
        },
      }),
      seed,
      salt,
    );

  // 底层最宽基座
  const base = roughRect(
    size * 0.12,
    size * 0.68,
    size * 0.76,
    size * 0.16,
    tight(1, 'paper'),
  );
  // 中层
  const mid = roughRect(
    size * 0.22,
    size * 0.46,
    size * 0.56,
    size * 0.18,
    tight(2, 'surface'),
  );
  // 顶层：墨块（在黄媒体条上仍可读）
  const top = roughRect(
    size * 0.32,
    size * 0.2,
    size * 0.36,
    size * 0.2,
    withSeed(
      roughOptions({
        tier: 'tight',
        stroke: 'ink',
        fill: 'ink',
        fillRecipe: 'solid',
        strokeWidth: 1.55,
        override: {
          disableMultiStroke: true,
          preserveVertices: true,
          maxRandomnessOffset: 1,
          roughness: 0.85,
        },
      }),
      seed,
      3,
    ),
  );
  // 侧支撑线，强化「结构」
  const postL = roughLine(
    size * 0.28,
    size * 0.66,
    size * 0.34,
    size * 0.4,
    withSeed(doodlePresets.inkLine(), seed, 4),
  );
  const postR = roughLine(
    size * 0.72,
    size * 0.66,
    size * 0.66,
    size * 0.4,
    withSeed(doodlePresets.inkLine(), seed, 5),
  );

  return makeMark(
    size,
    size,
    drawableToPaths(base, mid, top, postL, postR),
    'icon-base',
  );
}

/** Tokens：调色板 + 色点（黄 / 蓝 / 墨） */
function markIconPalette(seed: number, size: number): SvgMark {
  const outline = withSeed(
    roughOptions({
      tier: 'tight',
      stroke: 'ink',
      fill: 'surface',
      fillRecipe: 'solid',
      strokeWidth: 1.7,
      override: {
        disableMultiStroke: true,
        preserveVertices: true,
        roughness: 0.9,
      },
    }),
    seed,
    1,
  );

  // 调色板主体（略扁椭圆）+ 拇指孔
  const body = roughEllipse(
    size * 0.48,
    size * 0.52,
    size * 0.72,
    size * 0.58,
    outline,
  );
  const hole = roughCircle(
    size * 0.28,
    size * 0.58,
    size * 0.16,
    withSeed(
      roughOptions({
        tier: 'tight',
        stroke: 'ink',
        fill: 'paper',
        fillRecipe: 'solid',
        strokeWidth: 1.4,
        override: { disableMultiStroke: true, roughness: 0.8 },
      }),
      seed,
      2,
    ),
  );

  const swatch = (
    cx: number,
    cy: number,
    d: number,
    fill: 'accent' | 'action' | 'ink' | 'danger',
    salt: number,
  ) =>
    roughCircle(
      cx,
      cy,
      d,
      withSeed(
        roughOptions({
          tier: 'tight',
          stroke: 'ink',
          fill,
          fillRecipe: 'solid',
          strokeWidth: 1.2,
          override: { disableMultiStroke: true, roughness: 0.7 },
        }),
        seed,
        salt,
      ),
    );

  const y = swatch(size * 0.55, size * 0.32, size * 0.14, 'accent', 3);
  const b = swatch(size * 0.72, size * 0.46, size * 0.13, 'action', 4);
  const k = swatch(size * 0.62, size * 0.66, size * 0.12, 'ink', 5);

  return makeMark(
    size,
    size,
    drawableToPaths(body, hole, y, b, k),
    'icon-palette',
  );
}

/** Components：中心卡片 + 四向连接点（组件节点） */
function markIconComponent(seed: number, size: number): SvgMark {
  const node = (x: number, y: number, salt: number, fill?: 'accent') =>
    roughRect(
      x,
      y,
      size * 0.12,
      size * 0.12,
      withSeed(
        roughOptions({
          tier: 'tight',
          stroke: 'ink',
          fill: fill ?? 'surface',
          fillRecipe: 'solid',
          strokeWidth: 1.4,
          override: {
            disableMultiStroke: true,
            preserveVertices: true,
            roughness: 0.75,
          },
        }),
        seed,
        salt,
      ),
    );

  const core = roughRect(
    size * 0.28,
    size * 0.28,
    size * 0.44,
    size * 0.44,
    withSeed(
      roughOptions({
        tier: 'tight',
        stroke: 'ink',
        fill: 'paper',
        fillRecipe: 'solid',
        strokeWidth: 1.75,
        override: {
          disableMultiStroke: true,
          preserveVertices: true,
          roughness: 0.85,
        },
      }),
      seed,
      1,
    ),
  );

  // 四向端口
  const n = node(size * 0.44, size * 0.1, 2, 'accent');
  const e = node(size * 0.78, size * 0.44, 3);
  const s = node(size * 0.44, size * 0.78, 4);
  const w = node(size * 0.1, size * 0.44, 5);

  // 端口到核心的短连线
  const links = drawableToPaths(
    roughLine(
      size * 0.5,
      size * 0.22,
      size * 0.5,
      size * 0.28,
      withSeed(doodlePresets.inkLine(), seed, 6),
    ),
    roughLine(
      size * 0.78,
      size * 0.5,
      size * 0.72,
      size * 0.5,
      withSeed(doodlePresets.inkLine(), seed, 7),
    ),
    roughLine(
      size * 0.5,
      size * 0.78,
      size * 0.5,
      size * 0.72,
      withSeed(doodlePresets.inkLine(), seed, 8),
    ),
    roughLine(
      size * 0.22,
      size * 0.5,
      size * 0.28,
      size * 0.5,
      withSeed(doodlePresets.inkLine(), seed, 9),
    ),
  );

  // 核心内「控件」横条
  const bar = roughRect(
    size * 0.36,
    size * 0.44,
    size * 0.28,
    size * 0.1,
    withSeed(doodlePresets.yellowStamp(), seed, 10),
  );

  return makeMark(
    size,
    size,
    [
      ...drawableToPaths(core, n, e, s, w, bar),
      ...links,
    ],
    'icon-component',
  );
}

/**
 * GitHub Mark（Octocat 剪影）—— 官方 mark 路径 + Rough 手绘边。
 * 坐标空间 24×24（Octicons mark-github），外层缩放到 size。
 */
const GITHUB_MARK_PATH =
  'M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.302 3.016 1.128A10.49 10.49 0 0 1 12 6.114c.935 0 1.871.124 2.75.371 2.094-1.43 3.016-1.128 3.016-1.128.605 1.513.221 2.64.11 2.915.701.77 1.128 1.747 1.128 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.016 0 .289.206.632.756.522A10.962 10.962 0 0 0 23 12c0-6.077-4.922-11-11-11Z';

function markIconGithub(seed: number, size: number): SvgMark {
  const opt = withSeed(
    roughOptions({
      tier: 'tight',
      stroke: 'ink',
      fill: 'ink',
      fillRecipe: 'solid',
      strokeWidth: 0.9,
      override: {
        disableMultiStroke: true,
        disableMultiStrokeFill: true,
        preserveVertices: true,
        maxRandomnessOffset: 0.55,
        roughness: 0.7,
        bowing: 0.4,
        fillShapeRoughnessGain: 0.55,
      },
    }),
    seed,
    1,
  );

  const mark = makeMark(
    24,
    24,
    drawableToPaths(roughPath(GITHUB_MARK_PATH, opt)),
    'icon-github',
  );
  mark.width = size;
  mark.height = size;
  return mark;
}

/** Patterns：线框布局块（组合模式 / 版式） */
function markIconPattern(seed: number, size: number): SvgMark {
  const block = (
    x: number,
    y: number,
    w: number,
    h: number,
    salt: number,
    fill?: 'accent' | 'surface' | 'paper',
  ) =>
    roughRect(
      x,
      y,
      w,
      h,
      withSeed(
        roughOptions({
          tier: 'tight',
          stroke: 'ink',
          fill,
          fillRecipe: fill ? 'solid' : 'none',
          strokeWidth: 1.5,
          override: {
            disableMultiStroke: true,
            preserveVertices: true,
            roughness: 0.85,
          },
        }),
        seed,
        salt,
      ),
    );

  // 外框
  const frame = block(
    size * 0.12,
    size * 0.14,
    size * 0.76,
    size * 0.72,
    1,
    'paper',
  );
  // 顶栏
  const header = block(
    size * 0.18,
    size * 0.2,
    size * 0.64,
    size * 0.12,
    2,
    'accent',
  );
  // 左主区 + 右栏
  const main = block(
    size * 0.18,
    size * 0.38,
    size * 0.38,
    size * 0.4,
    3,
    'surface',
  );
  const side = block(
    size * 0.6,
    size * 0.38,
    size * 0.22,
    size * 0.4,
    4,
    'surface',
  );

  return makeMark(
    size,
    size,
    drawableToPaths(frame, header, main, side),
    'icon-pattern',
  );
}

/** 获取命名 mark 的 SVG 描述（SSR 安全、确定性） */
export function getMark(
  kind: DoodleMarkKind,
  options: GetMarkOptions = {},
): SvgMark {
  const size = sizePx[options.size ?? 'md'];
  const seed = seedFor(kind, options.seed);
  const span = options.span ?? 800;

  switch (kind) {
    case 'wave':
      return markWave(seed, span);
    case 'pencil':
      return markPencil(seed, span);
    case 'dash':
      return markDash(seed, span);
    case 'underline':
      return markUnderline(seed, span);
    case 'star':
      return markStar(seed, size);
    case 'spark':
      return markSpark(seed, size);
    case 'arrow':
      return markArrow(seed, size);
    case 'brace':
      return markBrace(seed, size);
    case 'frame':
      return markFrame(seed, size);
    case 'icon-code':
      return markIconCode(seed, size);
    case 'icon-db':
      return markIconDb(seed, size);
    case 'icon-course':
      return markIconCourse(seed, size);
    case 'icon-blog':
      return markIconBlog(seed, size);
    case 'icon-base':
      return markIconBase(seed, size);
    case 'icon-palette':
      return markIconPalette(seed, size);
    case 'icon-component':
      return markIconComponent(seed, size);
    case 'icon-pattern':
      return markIconPattern(seed, size);
    case 'icon-github':
      return markIconGithub(seed, size);
    default: {
      const _exhaustive: never = kind;
      throw new Error(`Unknown doodle mark: ${_exhaustive}`);
    }
  }
}

export const doodleMarkKinds: DoodleMarkKind[] = [
  'wave',
  'pencil',
  'dash',
  'underline',
  'star',
  'spark',
  'arrow',
  'brace',
  'frame',
  'icon-code',
  'icon-db',
  'icon-course',
  'icon-blog',
  'icon-base',
  'icon-palette',
  'icon-component',
  'icon-pattern',
  'icon-github',
];
