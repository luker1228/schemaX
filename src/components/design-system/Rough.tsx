import {
  drawableToPaths,
  makeMark,
  roughCircle,
  roughEllipse,
  roughLine,
  roughPolygon,
  roughRect,
  roughOptions,
  type DoodleColor,
  type FillRecipe,
  type RoughnessTier,
} from '../../lib/doodle';
import type { Point } from 'roughjs/bin/geometry';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .sx-rough {\n    display: block;\n    overflow: visible;\n    flex-shrink: 0;\n  }\n";
export default function Rough(props: ReactProps) {
type Shape = 'rect' | 'circle' | 'ellipse' | 'line' | 'polygon';

interface Props {
  shape: Shape;
  /** 画布宽（默认随 shape） */
  width?: number;
  /** 画布高 */
  height?: number;
  /** circle 直径简写 */
  size?: number;
  tier?: RoughnessTier;
  stroke?: DoodleColor;
  fill?: DoodleColor;
  fillRecipe?: FillRecipe;
  strokeWidth?: number;
  seed?: number;
  /** polygon 顶点，相对 viewBox */
  points?: Point[];
  class?: string;
  label?: string;
}

const {
  shape,
  width: widthProp,
  height: heightProp,
  size = 48,
  tier = 'sketch',
  stroke = 'ink',
  fill,
  fillRecipe,
  strokeWidth = 1.5,
  seed = 7,
  points,
  class: className = '',
  label,
} = props as Props;

const pad = 4;
const opt = roughOptions({ tier, stroke, fill, fillRecipe, strokeWidth, seed });

let markWidth = widthProp ?? size;
let markHeight = heightProp ?? size;
let paths;

if (shape === 'rect') {
  const w = widthProp ?? size;
  const h = heightProp ?? size * 0.7;
  markWidth = w + pad * 2;
  markHeight = h + pad * 2;
  paths = drawableToPaths(roughRect(pad, pad, w, h, opt));
} else if (shape === 'circle') {
  const d = size;
  markWidth = d + pad * 2;
  markHeight = d + pad * 2;
  paths = drawableToPaths(roughCircle(markWidth / 2, markHeight / 2, d, opt));
} else if (shape === 'ellipse') {
  const w = widthProp ?? size;
  const h = heightProp ?? size * 0.55;
  markWidth = w + pad * 2;
  markHeight = h + pad * 2;
  paths = drawableToPaths(
    roughEllipse(markWidth / 2, markHeight / 2, w, h, opt),
  );
} else if (shape === 'line') {
  const w = widthProp ?? size * 2;
  markWidth = w + pad * 2;
  markHeight = pad * 4;
  paths = drawableToPaths(
    roughLine(pad, markHeight / 2, markWidth - pad, markHeight / 2, opt),
  );
} else {
  const pts =
    points ??
    ([
      [pad + 4, markHeight - pad],
      [markWidth / 2, pad],
      [markWidth - pad - 4, markHeight - pad],
    ] as Point[]);
  markWidth = widthProp ?? size;
  markHeight = heightProp ?? size;
  paths = drawableToPaths(roughPolygon(pts, opt));
}

const mark = makeMark(markWidth, markHeight, paths, shape);
const decorative = !label;
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<svg
  className={['sx-rough', className].filter(Boolean).join(' ')}
  viewBox={mark.viewBox}
  width={mark.width}
  height={mark.height}
  role={decorative ? 'presentation' : 'img'}
  aria-hidden={decorative ? 'true' : undefined}
  aria-label={label}
  focusable="false"
>
  {
    mark.paths.map((p) => (
      <path
        d={p.d}
        stroke={p.stroke}
        strokeWidth={p.strokeWidth}
        fill={p.fill && p.fill !== 'none' ? p.fill : 'none'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ))
  }
</svg>
    </>
  );
}
