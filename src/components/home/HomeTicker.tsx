
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .ticker-band {\n    border-block: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    background: var(--sx-sys-color-action-primary);\n    color: var(--sx-sys-color-bg-surface);\n    overflow: hidden;\n  }\n\n  .ticker-band__track {\n    display: flex;\n    width: max-content;\n    padding-block: var(--sx-ref-space-3);\n    white-space: nowrap;\n    animation: sx-ticker-scroll 34s linear infinite;\n  }\n\n  .ticker-band__item {\n    display: inline-flex;\n    align-items: center;\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-base);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n  }\n\n  /* 几何方块分隔符（构成主义）：纯 CSS 黄色实心小方块，取代手绘斜线 */\n  .ticker-band__item::after {\n    content: '';\n    display: inline-block;\n    width: 0.6rem;\n    height: 0.6rem;\n    margin-inline: var(--sx-ref-space-6);\n    vertical-align: middle;\n    background: var(--sx-sys-color-accent);\n  }\n\n  @keyframes sx-ticker-scroll {\n    to {\n      transform: translateX(-50%);\n    }\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    .ticker-band__track {\n      animation: none;\n    }\n  }\n";
export default function HomeTicker(props: ReactProps) {
// 跑马灯：滚动展示四条构建原则。蓝底白字硬边——一张横贴的蓝色标语贴纸，
// 作 hero 之后的过场。无限循环靠 track 内两组重复内容 + translateX(-50%)；
// reduced-motion 下停帧（item 仍可读）。aria-hidden：内容与 manifesto 重复，避免屏读冗余。
const items = [
  'Structure before automation',
  'Contract before integration',
  'Constraints enable reliability',
  'Small schemas, large systems',
];
const loop = [...items, ...items];
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<div className="ticker-band" aria-hidden="true">
  <div className="ticker-band__track">
    {loop.map((t) => (
      <span className="ticker-band__item">{t}</span>
    ))}
  </div>
</div>
    </>
  );
}
