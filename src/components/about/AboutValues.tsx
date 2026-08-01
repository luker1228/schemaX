import { principleValues, accentToken } from '../../data/about';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .values {\n    background: var(--sx-sys-color-bg-surface);\n    padding-block: clamp(2.5rem, 5vw, 3.5rem);\n    padding-inline: clamp(1.5rem, 5vw, 4.5rem);\n  }\n\n  .values__inner {\n    max-width: 80rem;\n    margin-inline: auto;\n    display: flex;\n    flex-direction: column;\n    gap: 1.75rem;\n  }\n\n  .values__head {\n    display: flex;\n    align-items: flex-end;\n  }\n\n  .values__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-md);\n    font-weight: 800;\n    line-height: 1.05;\n    letter-spacing: -0.02em;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .values__grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 1.5rem;\n  }\n\n  .value-card {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n    min-height: 15.5rem;\n    padding: 1.75rem;\n    background: var(--sx-accent, var(--sx-sys-color-accent));\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    box-shadow: var(--sx-sys-shadow-lg);\n  }\n\n  .value-card__num {\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-base);\n    font-weight: 800;\n    letter-spacing: 0.0625em;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .value-card__cn {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-3xl);\n    font-weight: 800;\n    line-height: 1.1;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .value-card__en {\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-md);\n    font-weight: 700;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .value-card__body {\n    margin: auto 0 0;\n    font-family: var(--sx-sys-font-family-body), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-lg);\n    line-height: 1.5;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n   @media (max-width: 36rem) {\n    .values__grid {\n      grid-template-columns: 1fr;\n    }\n  }\n";
export default function AboutValues(props: ReactProps) {

  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<section className="values">
  <div className="values__inner">
    <div className="values__head">
      <h2 className="values__title">个人追求</h2>
    </div>

    <div className="values__grid">
      {principleValues.map((p) => (
        <article
          className="value-card" style={styleValue(`--sx-accent: ${accentToken[p.accent]}`)}
        >
          <span className="value-card__num">{p.num}</span>
          <h3 className="value-card__cn">{p.cn}</h3>
          <span className="value-card__en">{p.en}</span>
          <p className="value-card__body">{p.body}</p>
        </article>
      ))}
    </div>
  </div>
</section>
    </>
  );
}
