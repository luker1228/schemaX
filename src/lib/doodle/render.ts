/**
 * Rough.js Drawable → 可序列化 SVG 路径信息。
 * 纯函数、无 DOM，Astro SSR / 构建脚本 / 测试均可调用。
 */
import rough from 'roughjs/bundled/rough.esm.js';
import type { Drawable, Options, PathInfo } from 'roughjs/bin/core';
import type { Point } from 'roughjs/bin/geometry';

/** 稳定默认 seed 空间，避免全站涂鸦在每次构建跳变过大；mark 可覆盖 */
export const DOODLE_SEED_BASE = 0x5c4e_4d41; // "SCMA" 趣味常量

let _gen: ReturnType<typeof rough.generator> | null = null;

export function getGenerator() {
  if (!_gen) _gen = rough.generator();
  return _gen;
}

export function newSeed(): number {
  return rough.newSeed();
}

/** 把多个 Drawable 展平为 PathInfo[] */
export function drawableToPaths(...drawables: Drawable[]): PathInfo[] {
  const g = getGenerator();
  return drawables.flatMap((d) => g.toPaths(d));
}

export interface SvgMark {
  viewBox: string;
  width: number;
  height: number;
  paths: PathInfo[];
  /** 可选：保留给调试 / 文档 */
  label?: string;
}

export function makeMark(
  width: number,
  height: number,
  paths: PathInfo[],
  label?: string,
): SvgMark {
  return {
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
    paths,
    label,
  };
}

/* —— 原语封装（返回 Drawable，便于 compose） —— */

export function roughLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  options?: Options,
): Drawable {
  return getGenerator().line(x1, y1, x2, y2, options);
}

export function roughRect(
  x: number,
  y: number,
  w: number,
  h: number,
  options?: Options,
): Drawable {
  return getGenerator().rectangle(x, y, w, h, options);
}

export function roughEllipse(
  x: number,
  y: number,
  w: number,
  h: number,
  options?: Options,
): Drawable {
  return getGenerator().ellipse(x, y, w, h, options);
}

export function roughCircle(
  x: number,
  y: number,
  diameter: number,
  options?: Options,
): Drawable {
  return getGenerator().circle(x, y, diameter, options);
}

export function roughPolygon(points: Point[], options?: Options): Drawable {
  return getGenerator().polygon(points, options);
}

export function roughCurve(points: Point[], options?: Options): Drawable {
  return getGenerator().curve(points, options);
}

export function roughLinearPath(points: Point[], options?: Options): Drawable {
  return getGenerator().linearPath(points, options);
}

export function roughPath(d: string, options?: Options): Drawable {
  return getGenerator().path(d, options);
}

export function roughArc(
  x: number,
  y: number,
  w: number,
  h: number,
  start: number,
  stop: number,
  closed = false,
  options?: Options,
): Drawable {
  return getGenerator().arc(x, y, w, h, start, stop, closed, options);
}

/** 从种子派生子种子（同一 mark 内多图形保持相关但不完全相同） */
export function childSeed(seed: number, salt: number): number {
  // 简单 LCG 步进，保证确定性
  return (Math.imul(seed ^ salt, 1664525) + 1013904223) >>> 0;
}
