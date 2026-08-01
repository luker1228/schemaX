import {
  getMark,
  type DoodleMarkKind,
  type DoodleSize,
} from '../../lib/doodle';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .sx-doodle {\n    display: block;\n    flex-shrink: 0;\n    overflow: visible;\n    color: var(--sx-sys-color-border);\n  }\n\n  .sx-doodle--rule {\n    width: 100%;\n    height: 1.25rem;\n  }\n\n  .sx-doodle--wave {\n    height: 1.25rem;\n  }\n\n  .sx-doodle--pencil {\n    height: 0.75rem;\n  }\n\n  .sx-doodle--dash,\n  .sx-doodle--underline {\n    height: 0.55rem;\n  }\n\n  .sx-doodle--mark {\n    max-width: 100%;\n  }\n\n  .sx-doodle--raster {\n    object-fit: contain;\n  }\n";
export default function Doodle(props: ReactProps) {
interface Props {
  kind: DoodleMarkKind;
  size?: DoodleSize;
  /** 规则类 mark 水平跨度（viewBox 宽） */
  span?: number;
  /** 覆盖确定性种子 */
  seed?: number;
  class?: string;
  /** 挂上 home/涂鸦动效类（闪星、抖线等）—— 仅装饰 */
  animated?: boolean | 'star' | 'wobble' | 'float' | 'arrow';
  /** 无障碍：装饰默认 hidden；若有语义请传 label */
  label?: string;
}

const {
  kind,
  size = 'md',
  span,
  seed,
  class: className = '',
  animated = false,
  label,
} = props as Props;

const rasterIconByKind: Partial<Record<DoodleMarkKind, string>> = {
  'icon-code': '/images/schemax-icon-code.png',
  'icon-db': '/images/schemax-icon-tokens.png',
  'icon-course': '/images/schemax-icon-course.png',
  'icon-blog': '/images/schemax-icon-blog.png',
};
const rasterIcon = rasterIconByKind[kind];
const rasterSizePx: Record<DoodleSize, number> = { sm: 28, md: 40, lg: 56 };
const mark = rasterIcon ? null : getMark(kind, { size, span, seed });

const isRule = kind === 'wave' || kind === 'pencil' || kind === 'dash' || kind === 'underline';

const animClass =
  animated === true
    ? kind === 'star' || kind === 'spark'
      ? 'doodle-star'
      : kind === 'arrow'
        ? ''
        : kind === 'wave' || kind === 'pencil'
          ? 'doodle-wobble'
          : 'doodle-float'
    : animated === 'star'
      ? 'doodle-star'
      : animated === 'wobble'
        ? 'doodle-wobble'
        : animated === 'float'
          ? 'doodle-float'
          : animated === 'arrow'
            ? ''
            : '';

const classes = [
  'sx-doodle',
  isRule ? 'sx-doodle--rule' : 'sx-doodle--mark',
  `sx-doodle--${kind}`,
  rasterIcon ? 'sx-doodle--raster' : '',
  `sx-doodle--${size}`,
  animClass,
  className,
]
  .filter(Boolean)
  .join(' ');

const decorative = !label;
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
{rasterIcon ? (
  <img
    className={classes}
    src={rasterIcon}
    width={rasterSizePx[size]}
    height={rasterSizePx[size]}
    alt={label ?? ''}
    role={decorative ? 'presentation' : undefined}
    aria-hidden={decorative ? 'true' : undefined}
  />
) : (
  <svg
    className={classes}
    viewBox={mark?.viewBox}
    width={isRule ? undefined : mark?.width}
    height={isRule ? undefined : mark?.height}
    preserveAspectRatio={isRule ? 'none' : 'xMidYMid meet'}
    role={decorative ? 'presentation' : 'img'}
    aria-hidden={decorative ? 'true' : undefined}
    aria-label={label}
    focusable="false"
  >
    {
      mark?.paths.map((p) => (
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
)}
    </>
  );
}
