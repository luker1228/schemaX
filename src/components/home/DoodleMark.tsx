import Doodle from '../design-system/Doodle';
import type { DoodleMarkKind, DoodleSize } from '../../lib/doodle';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};

export default function DoodleMark(props: ReactProps) {
/**
 * 首页涂鸦入口 —— 薄封装设计系统 <Doodle>。
 * 保留 kind/size API，底层已切换为 Rough.js 涂鸦系统。
 */

interface Props {
  kind: DoodleMarkKind;
  class?: string;
  size?: DoodleSize;
  span?: number;
  seed?: number;
}

const {
  kind,
  class: className = '',
  size = 'md',
  span,
  seed,
} = props;

const animated =
  kind === 'star' || kind === 'spark'
    ? ('star' as const)
    : kind === 'wave' || kind === 'pencil'
      ? ('wobble' as const)
      : kind === 'brace'
        ? ('float' as const)
        : false;
  return (
    <>
<Doodle
  kind={kind}
  size={size}
  span={span}
  seed={seed}
  className={className}
  animated={animated}
/>
    </>
  );
}
