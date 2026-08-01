import PlaygroundIsland from '../PlaygroundIsland';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};

export default function PlaygroundDemo(props: ReactProps) {
// Playground 演示 —— 实时调参台（nb-playground 自带外壳，直接挂 island）。
  return (
    <>
<PlaygroundIsland />
    </>
  );
}
