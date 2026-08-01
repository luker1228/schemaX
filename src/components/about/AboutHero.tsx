import { aboutHero, accentToken } from '../../data/about';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .hero {\n    position: relative;\n    background: var(--sx-sys-color-bg-page);\n    padding-block: clamp(2.75rem, 6vw, 3.5rem);\n    padding-inline: clamp(1.5rem, 5vw, 4.5rem);\n    min-height: clamp(24rem, 50vh, 30rem);\n    overflow: hidden;\n  }\n\n  /* —— 装饰图标：四角散落（设计稿 graphql/python/docker/k8s） —— */\n  .hero__deco {\n    position: absolute;\n    pointer-events: none;\n    object-fit: contain;\n    z-index: 0;\n  }\n\n  /* 四角散落（对照设计稿 graphql/python/docker/k8s 的绝对坐标，转百分比） */\n  .hero__deco--graphql {\n    top: 20%;\n    left: 8%;\n    width: 4.25rem;\n    height: 4.5rem;\n  }\n\n  .hero__deco--python {\n    top: 30%;\n    right: 8%;\n    width: 4.25rem;\n    height: 4.25rem;\n  }\n\n  .hero__deco--docker {\n    bottom: 18%;\n    left: 12%;\n    width: 3.75rem;\n    height: 3rem;\n  }\n\n  .hero__deco--k8s {\n    bottom: 18%;\n    right: 14%;\n    width: 3.5rem;\n    height: 3.5625rem;\n  }\n\n  /* —— 内容 —— */\n  .hero__inner {\n    position: relative;\n    z-index: 1;\n    max-width: 80rem;\n    margin-inline: auto;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 1.25rem;\n    text-align: left;\n  }\n\n  .hero__crumb {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.5rem;\n    padding: 0.5rem 0.75rem;\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-md);\n    box-shadow: var(--sx-sys-shadow-sm);\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-md);\n    font-weight: 700;\n  }\n\n  .hero__crumb-item {\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .hero__crumb-item--muted,\n  .hero__crumb-sep {\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  .hero__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-lg);\n    font-weight: 700;\n    line-height: 1.02;\n    letter-spacing: -0.02em;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .hero__principles {\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 0.75rem;\n    margin-block: 0.25rem;\n  }\n\n  .hero__principle {\n    display: inline-flex;\n    align-items: center;\n    padding: 0.5625rem 0.8125rem;\n    background: var(--sx-accent, var(--sx-sys-color-bg-surface));\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-md);\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 800;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .hero__intro {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-body), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-sm);\n    font-weight: 600;\n    line-height: 1.25;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .hero__copy {\n    margin: 0;\n    max-width: 35rem;\n    font-family: var(--sx-sys-font-family-body), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-reading);\n    line-height: 1.6;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  @media (max-width: 48rem) {\n    .hero {\n      min-height: auto;\n    }\n\n    .hero__deco {\n      display: none;\n    }\n  }\n";
export default function AboutHero(props: ReactProps) {

  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<section className="hero">
  <img
    className="hero__deco hero__deco--graphql"
    src="/images/icons/graphql.svg"
    alt=""
    aria-hidden="true"
  />
  <img
    className="hero__deco hero__deco--python"
    src="/images/icons/python.svg"
    alt=""
    aria-hidden="true"
  />
  <img
    className="hero__deco hero__deco--docker"
    src="/images/icons/docker.svg"
    alt=""
    aria-hidden="true"
  />
  <img
    className="hero__deco hero__deco--k8s"
    src="/images/icons/k8s-official.svg"
    alt=""
    aria-hidden="true"
  />

  <div className="hero__inner">
    <nav className="hero__crumb" aria-label="Breadcrumb">
      <span className="hero__crumb-item hero__crumb-item--muted">Home</span>
      <span className="hero__crumb-sep">/</span>
      <span className="hero__crumb-item" aria-current="page">关于我</span>
    </nav>

    <h1 className="hero__title">{aboutHero.title}</h1>

    <div className="hero__principles">
      {aboutHero.principles.map((p) => (
        <span
          className="hero__principle" style={styleValue(`--sx-accent: ${accentToken[p.accent]}`)}
        >
          {p.label}
        </span>
      ))}
    </div>

    <p className="hero__intro">{aboutHero.intro}</p>
    <p className="hero__copy">{aboutHero.copy}</p>
  </div>
</section>
    </>
  );
}
