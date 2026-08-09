import { contactCta } from '../../data/about';
import Button from '../design-system/Button';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps {
  [key: string]: any;
  children?: ReactNode;
}
const styleValue = (
  value: string | CSSProperties | undefined,
): CSSProperties | undefined => {
  if (!value || typeof value !== 'string')
    return value as CSSProperties | undefined;
  return Object.fromEntries(
    value
      .split(';')
      .filter(Boolean)
      .map((part) => {
        const [key, val] = part.split(':');
        return [
          key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()),
          val?.trim() ?? '',
        ];
      }),
  );
};
const css =
  '\n  .contact {\n    background: var(--sx-sys-color-bg-page);\n    padding-block: clamp(2.5rem, 5vw, 3.5rem) clamp(3rem, 5vw, 4rem);\n    padding-inline: clamp(1.5rem, 5vw, 4.5rem);\n  }\n\n  .contact__inner {\n    max-width: 80rem;\n    margin-inline: auto;\n  }\n\n  /* —— CTA 卡片：8px 黄色硬阴影 —— */\n  .contact__card {\n    display: flex;\n    flex-direction: column;\n    gap: 1.375rem;\n    padding: clamp(1.75rem, 4vw, 2.75rem) clamp(1.5rem, 4vw, 3rem);\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-md);\n    box-shadow: 9px 9px 0 var(--sx-sys-color-accent);\n  }\n\n  .contact__eyebrow-row {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.625rem;\n  }\n\n  .contact__eyebrow-mark {\n    width: 1.375rem;\n    height: 0.5rem;\n    background: var(--sx-sys-color-border);\n  }\n\n  .contact__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-md);\n    font-weight: 800;\n    line-height: 1.05;\n    letter-spacing: -0.02em;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .contact__sub {\n    margin: 0;\n    max-width: 48rem;\n    font-family: var(--sx-sys-font-family-body), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-reading);\n    line-height: 1.6;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  /* —— 按钮 —— */\n  .contact__actions {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.875rem;\n  }\n\n  .contact__btn {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.625rem;\n    padding: 0.875rem 1.125rem;\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-md);\n    box-shadow: var(--sx-sys-shadow-lg);\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-base);\n    font-weight: 800;\n    color: var(--sx-sys-color-text-primary);\n    text-decoration: none;\n    transition:\n      transform 120ms ease,\n      box-shadow 120ms ease;\n  }\n\n  .contact__btn:hover {\n    transform: translate(2px, 2px);\n    box-shadow: none;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .contact__btn--primary {\n    background: var(--sx-sys-color-accent);\n  }\n\n  .contact__btn-icon {\n    font-size: var(--sx-sys-font-size-lg);\n    font-weight: 800;\n  }\n\n  /* —— 底部 Meta —— */\n  .contact__meta {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.75rem;\n    padding-top: 1.25rem;\n    border-top: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n  }\n\n  .contact__meta-item {\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 800;\n    letter-spacing: 0.0375em;\n    color: var(--sx-sys-color-text-soft);\n  }\n';
export default function AboutContact(props: ReactProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="contact">
        <div className="contact__inner">
          <div className="contact__card">
            <div className="contact__eyebrow-row">
              <span className="contact__eyebrow-mark"></span>
            </div>

            <h2 className="contact__title">{contactCta.title}</h2>
            <p className="contact__sub">{contactCta.sub}</p>

            <div className="contact__actions">
              <a
                className="contact__btn contact__btn--primary"
                href={`mailto:${contactCta.email}`}
              >
                <span className="contact__btn-icon" aria-hidden="true">
                  ✉
                </span>
                <span className="contact__btn-label">{contactCta.email}</span>
              </a>
              <Button
                variant="primary"
                size="sm"
                className="btn--press-on-interaction"
                href={contactCta.github}
                target="_blank"
                rel="me noopener"
              >
                GitHub →
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="btn--press-on-interaction"
                href={contactCta.rss}
              >
                RSS
              </Button>
            </div>

            <div className="contact__meta">
              <span className="contact__meta-item">
                {contactCta.meta.response}
              </span>
              <span className="contact__meta-item">
                {contactCta.meta.location}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
