import { milestones } from '../../data/about';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .journey {\n    background: var(--sx-sys-color-bg-page);\n    padding-block: clamp(2.5rem, 5vw, 3.5rem);\n    padding-inline: clamp(1.5rem, 5vw, 4.5rem);\n  }\n\n  .journey__inner {\n    max-width: 80rem;\n    margin-inline: auto;\n    display: flex;\n    flex-direction: column;\n    gap: 1.875rem;\n  }\n\n  .journey__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-md);\n    font-weight: 800;\n    line-height: 1.05;\n    letter-spacing: -0.02em;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .journey__timeline {\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-md);\n    box-shadow: 6px 6px 0 var(--sx-sys-color-border);\n  }\n\n  .milestone {\n    display: flex;\n    align-items: center;\n    gap: 2rem;\n    padding: 1.75rem;\n    border-bottom: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n  }\n\n  .milestone:last-child {\n    border-bottom: none;\n  }\n\n  .milestone__year-col {\n    flex: 0 0 12.5rem;\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n\n  .milestone__year {\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-3xl);\n    font-weight: 800;\n    line-height: 1;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .milestone__tag {\n    align-self: flex-start;\n    padding: 0.25rem 0.5rem;\n    background: var(--sx-sys-color-accent);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    letter-spacing: 0.0375em;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .milestone__copy {\n    flex: 1 1 0;\n    display: flex;\n    flex-direction: column;\n    gap: 0.375rem;\n    min-width: 0;\n  }\n\n  .milestone__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-2xl);\n    font-weight: 800;\n    line-height: 1.15;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .milestone__desc {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-body), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-lg);\n    line-height: 1.5;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n   @media (max-width: 36rem) {\n    .milestone {\n      flex-direction: column;\n      align-items: flex-start;\n      gap: 0.75rem;\n    }\n\n    .milestone__year-col {\n      flex-basis: auto;\n    }\n  }\n";
export default function AboutJourney(props: ReactProps) {

  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<section className="journey">
  <div className="journey__inner">
    <div className="journey__head">
      <h2 className="journey__title">个人履历</h2>
    </div>

    <div className="journey__timeline">
      {milestones.map((m) => (
        <div className="milestone">
          <div className="milestone__year-col">
            <span className="milestone__year">{m.year}</span>
            <span className="milestone__tag">{m.tag}</span>
          </div>
          <div className="milestone__copy">
            <h3 className="milestone__title">{m.title}</h3>
            <p className="milestone__desc">{m.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </>
  );
}
