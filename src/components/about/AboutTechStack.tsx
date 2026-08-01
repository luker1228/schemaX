import { stackRows, accentToken, type Accent } from '../../data/about';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .stack {\n    background: var(--sx-sys-color-bg-page);\n    padding-block: clamp(2.5rem, 5vw, 4rem) clamp(3rem, 5vw, 4.5rem);\n    padding-inline: clamp(1.5rem, 5vw, 4.5rem);\n  }\n\n  .stack__inner {\n    max-width: 80rem;\n    margin-inline: auto;\n    display: flex;\n    flex-direction: column;\n    gap: 2rem;\n  }\n\n  .stack__head {\n    display: flex;\n    align-items: flex-end;\n  }\n\n  .stack__head-left {\n    display: flex;\n    flex-direction: column;\n    gap: 0.875rem;\n  }\n\n  .stack__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-md);\n    font-weight: 900;\n    line-height: 1.05;\n    letter-spacing: -0.02em;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .stack__sub {\n    margin: 0;\n    max-width: 38.75rem;\n    font-family: var(--sx-sys-font-family-body), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-reading);\n    line-height: 1.55;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  .stack__matrix {\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-md);\n    box-shadow: 6px 6px 0 var(--sx-sys-color-border);\n    padding-block: 0.625rem;\n    padding-inline: 1.75rem;\n  }\n\n  .stack__row {\n    display: flex;\n    align-items: center;\n    gap: 1.5rem;\n    padding-block: 1.125rem;\n    border-bottom: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n\n  .stack__row:last-child {\n    border-bottom: none;\n  }\n\n  .stack__category {\n    flex: 0 0 12.5rem;\n    padding: 0.5625rem 0.875rem;\n    background: var(--sx-accent, var(--sx-sys-color-accent));\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-radius: 2px;\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-md);\n    font-weight: 800;\n    letter-spacing: 0.0375em;\n    color: var(--sx-label, var(--sx-sys-color-text-primary));\n  }\n\n  .stack__chips {\n    flex: 1 1 0;\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.625rem;\n  }\n\n  .stack__chip {\n    display: inline-flex;\n    align-items: center;\n    padding: 0.4375rem 0.75rem;\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-md);\n    box-shadow: var(--sx-sys-shadow-sm);\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-md);\n    font-weight: 700;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n   @media (max-width: 36rem) {\n    .stack__row {\n      flex-direction: column;\n      align-items: flex-start;\n      gap: 0.875rem;\n    }\n\n    .stack__category {\n      flex-basis: auto;\n    }\n  }\n";
export default function AboutTechStack(props: ReactProps) {

// action(蓝) 底配白字，其余底配黑字。
const labelColor = (accent: Accent) =>
  accent === 'action'
    ? 'var(--sx-sys-color-bg-page)'
    : 'var(--sx-sys-color-text-primary)';
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<section className="stack">
  <div className="stack__inner">
    <div className="stack__head">
      <div className="stack__head-left">
        <h2 className="stack__title">我的技术栈</h2>
        <p className="stack__sub">
          每天在用的工具与语言。偏爱静态优先、契约驱动、可复现的链路。
        </p>
      </div>
    </div>

    <div className="stack__matrix">
      {stackRows.map((row) => (
        <div className="stack__row">
          <span
            className="stack__category" style={styleValue(`--sx-accent: ${accentToken[row.accent]}; --sx-label: ${labelColor(row.accent)}`)}
          >
            {row.label}
          </span>
          <div className="stack__chips">
            {row.items.map((item) => (
              <span className="stack__chip">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </>
  );
}
