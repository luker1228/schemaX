/**
 * SchemaX 涂鸦设计系统 —— Rough.js 预设。
 * stroke/fill 使用 CSS 变量字符串，运行时/SSR SVG 均走 token，不硬编码品牌色。
 */
import type { Options } from 'roughjs/bin/core';

/** 语义色角色（映射到 --sx-sys-*） */
export type DoodleColor =
  | 'ink'
  | 'soft'
  | 'muted'
  | 'accent'
  | 'action'
  | 'paper'
  | 'surface'
  | 'danger'
  | 'success';

export const doodleColorVar: Record<DoodleColor, string> = {
  ink: 'var(--sx-sys-color-border)',
  soft: 'var(--sx-sys-color-text-soft)',
  muted: 'var(--sx-sys-color-text-muted)',
  accent: 'var(--sx-sys-color-accent)',
  action: 'var(--sx-sys-color-action-primary)',
  paper: 'var(--sx-sys-color-bg-page)',
  surface: 'var(--sx-sys-color-bg-surface)',
  danger: 'var(--sx-sys-color-danger)',
  success: 'var(--sx-sys-color-success)',
};

/** 手绘强度档位 —— 全站涂鸦的 roughness 词汇表 */
export type RoughnessTier = 'tight' | 'sketch' | 'loose' | 'wild';

export const roughnessTier: Record<RoughnessTier, Pick<Options, 'roughness' | 'bowing'>> = {
  /** 接近干净线，仅轻微手感（UI 图标轮廓） */
  tight: { roughness: 0.7, bowing: 0.6 },
  /** 默认涂鸦：页边批注、分割线 */
  sketch: { roughness: 1.35, bowing: 1 },
  /** 更松的铅笔感 */
  loose: { roughness: 1.85, bowing: 1.35 },
  /** 强调装饰、大面积填充时的野性 */
  wild: { roughness: 2.4, bowing: 1.6 },
};

export type FillRecipe = 'none' | 'solid' | 'hachure' | 'cross-hatch' | 'zigzag' | 'dots';

const fillStyleMap: Record<Exclude<FillRecipe, 'none'>, NonNullable<Options['fillStyle']>> = {
  solid: 'solid',
  hachure: 'hachure',
  'cross-hatch': 'cross-hatch',
  zigzag: 'zigzag',
  dots: 'dots',
};

export interface RoughPresetInput {
  tier?: RoughnessTier;
  stroke?: DoodleColor;
  fill?: DoodleColor;
  fillRecipe?: FillRecipe;
  strokeWidth?: number;
  seed?: number;
  /** 覆盖任意 Rough Options（高级） */
  override?: Options;
}

/** 拼装一份可交给 RoughGenerator 的 Options */
export function roughOptions(input: RoughPresetInput = {}): Options {
  const {
    tier = 'sketch',
    stroke = 'ink',
    fill,
    fillRecipe = fill ? 'solid' : 'none',
    strokeWidth = 1.5,
    seed,
    override,
  } = input;

  const base: Options = {
    ...roughnessTier[tier],
    stroke: doodleColorVar[stroke],
    strokeWidth,
    disableMultiStroke: tier === 'tight',
    preserveVertices: false,
  };

  if (seed !== undefined) base.seed = seed;

  if (fill && fillRecipe !== 'none') {
    base.fill = doodleColorVar[fill];
    base.fillStyle = fillStyleMap[fillRecipe];
    if (fillRecipe === 'hachure' || fillRecipe === 'cross-hatch') {
      base.hachureGap = 3.5;
      base.hachureAngle = -38;
      base.fillWeight = Math.max(0.6, strokeWidth * 0.45);
    }
    if (fillRecipe === 'dots') {
      base.hachureGap = 5;
    }
  }

  return { ...base, ...override };
}

/** 命名预设：组件与 mark 优先引用这些，而不是散落 magic numbers */
export const doodlePresets = {
  /** 黑墨单线 */
  inkLine: (): Options => roughOptions({ tier: 'sketch', stroke: 'ink', strokeWidth: 1.5 }),
  /** 更轻的铅笔线 */
  pencil: (): Options =>
    roughOptions({
      tier: 'loose',
      stroke: 'ink',
      strokeWidth: 1.15,
      override: { disableMultiStroke: true },
    }),
  /** 黄马克笔填充戳 */
  yellowStamp: (): Options =>
    roughOptions({
      tier: 'tight',
      stroke: 'ink',
      fill: 'accent',
      fillRecipe: 'solid',
      strokeWidth: 1.6,
    }),
  /** 蓝强调描边 */
  blueStroke: (): Options =>
    roughOptions({ tier: 'sketch', stroke: 'action', strokeWidth: 1.75 }),
  /** 黄斜线影线填充 */
  yellowHachure: (): Options =>
    roughOptions({
      tier: 'sketch',
      stroke: 'ink',
      fill: 'accent',
      fillRecipe: 'hachure',
      strokeWidth: 1.35,
    }),
  /** 图标轮廓（偏紧） */
  iconOutline: (): Options =>
    roughOptions({ tier: 'tight', stroke: 'ink', strokeWidth: 1.7 }),
} as const;
