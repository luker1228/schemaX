import GeoMark from '../design-system/GeoMark';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .projects__inner {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-6);\n  }\n\n  .project-card {\n    display: flex;\n    align-items: stretch;\n    gap: var(--sx-ref-space-8);\n    padding: var(--sx-ref-space-8);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-bg-surface);\n    box-shadow: var(--sx-sys-shadow-md);\n    text-decoration: none;\n    color: inherit;\n    transition:\n      transform 0.1s ease,\n      box-shadow 0.1s ease;\n  }\n\n  .project-card:hover {\n    transform: translate(-2px, -2px);\n    box-shadow: 9px 9px 0 var(--sx-sys-color-border);\n  }\n\n  .project-card:focus-visible {\n    outline: var(--sx-sys-border-width) solid var(--sx-sys-color-action-primary);\n    outline-offset: 2px;\n  }\n\n  /* 大卡内的侧栏：纸色分区（无 border / shadow，非嵌套卡），承载 status + doodle + meta。\n     侧栏背景取纸色，与卡面 surface 形成微妙层次；gap 与 copy 分区。 */\n  .project-card__side {\n    position: relative;\n    flex: 0 0 15rem;\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-4);\n    padding: var(--sx-ref-space-5);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-bg-page);\n    min-height: 12rem;\n  }\n\n  .project-card__status {\n    align-self: flex-start;\n    padding: 0.3rem 0.55rem;\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-sky);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    box-shadow: var(--sx-sys-shadow-sm);\n    transform: rotate(var(--sx-sys-rotate-sticker));\n  }\n\n  .project-card__doodles {\n    display: flex;\n    align-items: center;\n    gap: var(--sx-ref-space-3);\n  }\n\n  .project-card__meta {\n    margin: auto 0 0;\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-2);\n  }\n\n  .project-card__meta-row {\n    display: flex;\n    justify-content: space-between;\n    gap: var(--sx-ref-space-3);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-xs);\n  }\n\n  .project-card__meta-row dt {\n    color: var(--sx-sys-color-text-muted);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n  }\n\n  .project-card__meta-row dd {\n    margin: 0;\n    color: var(--sx-sys-color-text-primary);\n    font-weight: 700;\n  }\n\n  .project-card__copy {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-3);\n    min-width: 0;\n    justify-content: center;\n  }\n\n  .project-card__head {\n    display: flex;\n    align-items: baseline;\n    flex-wrap: wrap;\n    gap: var(--sx-ref-space-3);\n  }\n\n  .project-card__name {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-md);\n    font-weight: 800;\n    line-height: 1.05;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .project-card__demo {\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    color: var(--sx-sys-color-action-primary);\n  }\n\n  .project-card__desc {\n    margin: 0;\n    font-size: var(--sx-sys-font-size-reading);\n    line-height: 1.55;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  .project-card__highlights {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-2);\n  }\n\n  .project-card__highlight {\n    display: flex;\n    align-items: baseline;\n    gap: var(--sx-ref-space-2);\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.5;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  .project-card__highlight-mark {\n    color: var(--sx-sys-color-accent);\n    font-weight: 700;\n  }\n\n  .project-card__tags {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--sx-ref-space-2);\n  }\n\n  .project-card__tag {\n    padding: 0.3rem 0.55rem;\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-bg-page);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    box-shadow: var(--sx-sys-shadow-sm);\n    transform: rotate(var(--sx-sys-rotate-sticker));\n  }\n\n  .project-card__tag:nth-child(even) {\n    transform: rotate(calc(var(--sx-sys-rotate-sticker) * -1));\n  }\n\n  .project-archive {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));\n    gap: var(--sx-ref-space-6);\n  }\n\n  .feature-card {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-3);\n    padding: var(--sx-ref-space-6);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    box-shadow: var(--sx-sys-shadow-md);\n  }\n\n  .feature-card--lab {\n    background: var(--sx-sys-color-bg-surface);\n  }\n\n  .feature-card--stack {\n    background: var(--sx-sys-color-bg-surface);\n  }\n\n  .feature-card__eyebrow {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.35rem;\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n  }\n\n  .feature-card__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-2xl);\n    font-weight: 800;\n    line-height: 1.1;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .feature-card__desc {\n    margin: 0;\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.5;\n    color: var(--sx-sys-color-text-muted);\n  }\n\n  .feature-card__desc--ink {\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  .feature-card__flow {\n    display: flex;\n    gap: var(--sx-ref-space-2);\n    margin-top: auto;\n  }\n\n  .flow-chip {\n    flex: 1;\n    padding: 0.55rem 0.4rem;\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-flow-bg);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    text-align: center;\n    box-shadow: var(--sx-sys-shadow-sm);\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .feature-card__list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .stack-item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 0.55rem 0;\n    border-bottom: var(--sx-sys-border-width) dashed\n      color-mix(in srgb, var(--sx-sys-color-border) 50%, transparent);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n  }\n\n  .stack-item:last-child {\n    border-bottom: 0;\n  }\n\n  .stack-item__mark {\n    color: var(--sx-sys-color-action-primary);\n    font-weight: 700;\n  }\n\n  @media (max-width: 48rem) {\n    .project-card {\n      flex-direction: column;\n    }\n\n    .project-card__side {\n      flex-basis: auto;\n      width: 100%;\n    }\n\n    .project-archive {\n      grid-template-columns: 1fr;\n    }\n  }\n";
export default function HomeProjects(_props: ReactProps) {
// ModelCraft 三大能力柱：GQL / ACL / CLI（对应落地页三特性卡）
const pillars = [
  {
    eyebrow: 'GQL',
    icon: 'icon-graphql',
    title: 'GraphQL 统一接口',
    desc: '将数据库能力标准化为可调用接口，方便 AI 和应用统一接入。',
    flow: [
      { label: 'QUERY', bg: 'var(--sx-sys-color-coral)' },
      { label: 'WRITE', bg: 'var(--sx-sys-color-accent)' },
      { label: 'SCHEMA', bg: 'var(--sx-sys-color-sky)' },
    ],
  },
  {
    eyebrow: 'ACL',
    icon: 'icon-shield',
    title: 'RBAC 细粒度授权',
    desc: '角色、权限包与字段级策略，让数据访问边界清晰可控。',
    flow: [
      { label: 'ROLE', bg: 'var(--sx-sys-color-coral)' },
      { label: 'POLICY', bg: 'var(--sx-sys-color-accent)' },
      { label: 'FIELD', bg: 'var(--sx-sys-color-sky)' },
    ],
  },
  {
    eyebrow: 'CLI',
    icon: 'icon-code',
    title: 'CLI 可编排调用',
    desc: '适合 AI Agent 和自动化任务，通过命令行安全地查询和操作数据。',
    flow: [
      { label: 'PIPE', bg: 'var(--sx-sys-color-coral)' },
      { label: 'AGENT', bg: 'var(--sx-sys-color-accent)' },
      { label: 'AUDIT', bg: 'var(--sx-sys-color-sky)' },
    ],
  },
];

// ModelCraft hero 卡片的产品标签
const heroTags = ['AI Native', 'GraphQL', 'RBAC', 'CLI'];
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="projects home-section" aria-labelledby="projects-title">
        <div className="projects__inner home-section__inner">
          <header className="home-head">
            <h2 className="home-head__title" id="projects-title">代表作品</h2>
            <a className="home-head__link" href="/projects">Explore projects →</a>
          </header>

          <a
            className="project-card"
            href="https://modelcraft.schemax.site"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="project-card__side">
              <span className="project-card__status">ACTIVE / V1</span>
              <div className="project-card__doodles" aria-hidden="true">
                <GeoMark kind="icon-db" size="lg" />
                <GeoMark kind="brace" size="md" />
              </div>
              <dl className="project-card__meta">
                <div className="project-card__meta-row">
                  <dt>Built</dt>
                  <dd>2026</dd>
                </div>
                <div className="project-card__meta-row">
                  <dt>Stack</dt>
                  <dd>4</dd>
                </div>
              </dl>
            </div>
            <div className="project-card__copy">
              <div className="project-card__head">
                <h3 className="project-card__name">ModelCraft</h3>
                <span className="project-card__demo">modelcraft.schemax.site</span>
              </div>
              <p className="project-card__desc">
                面向 AI 的数据访问底座。ModelCraft 把数据库能力封装成 AI 可调用的 GraphQL 和 CLI 接口，让自然语言驱动的查询与操作都保持安全、可控、可审计。
              </p>
              <div className="project-card__tags">
                {heroTags.map((t) => (
                  <span className="project-card__tag">{t}</span>
                ))}
              </div>
            </div>
          </a>

          <div className="project-archive">
            {pillars.map((p) => (
              <div className="feature-card feature-card--lab">
                <span className="feature-card__eyebrow">
                  <GeoMark kind={p.icon} size="sm" />
                  {p.eyebrow}
                </span>
                <h3 className="feature-card__title">{p.title}</h3>
                <p className="feature-card__desc feature-card__desc--ink">{p.desc}</p>
                <div className="feature-card__flow">
                  {p.flow.map((f) => (
                    <span className="flow-chip" style={styleValue(`--sx-flow-bg: ${f.bg}`)}>
                      {f.label}
                    </span>
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
