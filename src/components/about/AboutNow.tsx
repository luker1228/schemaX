import { nowCards, accentToken } from '../../data/about';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .now {\n    background: var(--sx-sys-color-terminal-bg);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    padding-block: clamp(2.5rem, 5vw, 3.5rem);\n    padding-inline: clamp(1.5rem, 5vw, 4.5rem);\n  }\n\n  .now__inner {\n    max-width: 80rem;\n    margin-inline: auto;\n    display: flex;\n    flex-direction: column;\n    gap: 1.75rem;\n  }\n\n  /* —— Head —— */\n  .now__head {\n    display: flex;\n    align-items: flex-end;\n    justify-content: space-between;\n    gap: 1.5rem;\n  }\n\n  .now__title-col {\n    display: flex;\n    flex-direction: column;\n    gap: 0.625rem;\n  }\n\n  .now__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-md);\n    font-weight: 800;\n    line-height: 1.05;\n    letter-spacing: -0.02em;\n    color: var(--sx-sys-color-terminal-text);\n  }\n\n  .now__sub {\n    margin: 0;\n    max-width: 28.75rem;\n    font-family: var(--sx-sys-font-family-body), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-lg);\n    line-height: 1.5;\n    color: var(--sx-sys-color-terminal-muted);\n  }\n\n  .now__prompt {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.625rem;\n    padding: 0.625rem 0.875rem;\n    background: var(--sx-sys-color-terminal-elevated);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-terminal-border);\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-base);\n  }\n\n  .now__prompt-dollar {\n    font-weight: 800;\n    color: var(--sx-sys-color-mint);\n  }\n\n  .now__prompt-cmd {\n    font-weight: 700;\n    color: var(--sx-sys-color-terminal-text);\n  }\n\n  /* —— Grid —— */\n  .now__grid {\n    display: grid;\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    gap: 1.25rem;\n  }\n\n  .now-card {\n    display: flex;\n    flex-direction: column;\n    gap: 0.875rem;\n    padding: 1.375rem;\n    background: var(--sx-sys-color-terminal-surface);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-terminal-border);\n  }\n\n  .now-card__status {\n    display: flex;\n    align-items: center;\n    gap: 0.625rem;\n  }\n\n  .now-card__dot {\n    width: 0.75rem;\n    height: 0.75rem;\n    background: var(--sx-accent, var(--sx-sys-color-accent));\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n\n  .now-card__label {\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 800;\n    letter-spacing: 0.05em;\n    color: var(--sx-accent, var(--sx-sys-color-accent));\n  }\n\n  .now-card__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-xl);\n    font-weight: 800;\n    line-height: 1.15;\n    color: var(--sx-sys-color-terminal-text);\n  }\n\n  .now-card__desc {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-body), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.5;\n    color: var(--sx-sys-color-terminal-muted);\n  }\n\n   @media (max-width: 64rem) {\n    .now__grid {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n  }\n\n   @media (max-width: 36rem) {\n    .now__grid {\n      grid-template-columns: 1fr;\n    }\n\n    .now__prompt {\n      display: none;\n    }\n  }\n";
export default function AboutNow(props: ReactProps) {

  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<section className="now">
  <div className="now__inner">
    <div className="now__head">
      <div className="now__title-col">
        <h2 className="now__title">此刻在做什么</h2>
        <p className="now__sub">
          一个持续更新的状态快照，记录我此刻正在构建、书写与探索的事情。
        </p>
      </div>

      <div className="now__prompt" aria-hidden="true">
        <span className="now__prompt-dollar">$</span>
        <span className="now__prompt-cmd">luke --status=now</span>
      </div>
    </div>

    <div className="now__grid">
      {nowCards.map((card) => (
        <article className="now-card">
          <div className="now-card__status">
            <span
              className="now-card__dot" style={styleValue(`--sx-accent: ${accentToken[card.accent]}`)}
            ></span>
            <span
              className="now-card__label" style={styleValue(`--sx-accent: ${accentToken[card.accent]}`)}
            >
              {card.status}
            </span>
          </div>
          <h3 className="now-card__title">{card.title}</h3>
          <p className="now-card__desc">{card.desc}</p>
        </article>
      ))}
    </div>
  </div>
</section>
    </>
  );
}
