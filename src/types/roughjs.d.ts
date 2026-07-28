/** roughjs ESM bundle 无官方子路径类型；与 bin/rough.d.ts API 对齐的最小声明。 */
declare module 'roughjs/bundled/rough.esm.js' {
  import type { Config, Drawable, Options, PathInfo } from 'roughjs/bin/core';
  import type { Point } from 'roughjs/bin/geometry';

  interface RoughGenerator {
    line(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      options?: Options,
    ): Drawable;
    rectangle(
      x: number,
      y: number,
      width: number,
      height: number,
      options?: Options,
    ): Drawable;
    ellipse(
      x: number,
      y: number,
      width: number,
      height: number,
      options?: Options,
    ): Drawable;
    circle(x: number, y: number, diameter: number, options?: Options): Drawable;
    linearPath(points: Point[], options?: Options): Drawable;
    arc(
      x: number,
      y: number,
      width: number,
      height: number,
      start: number,
      stop: number,
      closed?: boolean,
      options?: Options,
    ): Drawable;
    curve(points: Point[] | Point[][], options?: Options): Drawable;
    polygon(points: Point[], options?: Options): Drawable;
    path(d: string, options?: Options): Drawable;
    toPaths(drawable: Drawable): PathInfo[];
  }

  interface RoughNS {
    generator(config?: Config): RoughGenerator;
    newSeed(): number;
  }

  const rough: RoughNS;
  export default rough;
}
