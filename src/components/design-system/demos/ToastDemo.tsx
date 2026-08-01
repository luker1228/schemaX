import ToastsIsland from '../ToastsIsland';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};

export default function ToastDemo(props: ReactProps) {
// Toast 演示 —— 通知触发（nb-demobox 包 island）。
  return (
    <>
<div className="nb-demobox">
  <ToastsIsland />
</div>
    </>
  );
}
