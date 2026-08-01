import GeoMark from '../design-system/GeoMark';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = `
  .projects__inner {
    display: flex;
    flex-direction: column;
    gap: var(--sx-ref-space-6);
  }

  .project-card {
    display: flex;
    align-items: stretch;
    gap: var(--sx-ref-space-8);
    padding: var(--sx-ref-space-8);
    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);
    border-radius: var(--sx-sys-radius-sm);
    background: var(--sx-sys-color-bg-surface);
    box-shadow: var(--sx-sys-shadow-md);
    text-decoration: none;
    color: inherit;
    transition:
      transform 0.1s ease,
      box-shadow 0.1s ease;
  }

  .project-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 9px 9px 0 var(--sx-sys-color-border);
  }

  .project-card:focus-visible {
    outline: var(--sx-sys-border-width) solid var(--sx-sys-color-action-primary);
    outline-offset: 2px;
  }

  /* hero 卡侧栏：黄撞色块（贴纸印泥戳），承载 status + doodle + meta。 */
  .project-card__side {
    position: relative;
    flex: 0 0 15rem;
    display: flex;
    flex-direction: column;
    gap: var(--sx-ref-space-4);
    padding: var(--sx-ref-space-5);
    border-radius: var(--sx-sys-radius-sm);
    background: var(--sx-sys-color-accent);
    min-height: 12rem;
  }

  .project-card__status {
    align-self: flex-start;
    padding: 0.3rem 0.55rem;
    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);
    border-radius: var(--sx-sys-radius-sm);
    background: var(--sx-sys-color-border);
    color: var(--sx-sys-color-bg-surface);
    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;
    font-size: var(--sx-sys-font-size-xs);
    font-weight: 700;
    letter-spacing: 0.06em;
    box-shadow: var(--sx-sys-shadow-sm);
    transform: rotate(var(--sx-sys-rotate-sticker));
  }

  .project-card__doodles {
    display: flex;
    align-items: center;
    gap: var(--sx-ref-space-3);
  }

  .project-card__meta {
    margin: auto 0 0;
    display: flex;
    flex-direction: column;
    gap: var(--sx-ref-space-2);
  }

  .project-card__meta-row {
    display: flex;
    justify-content: space-between;
    gap: var(--sx-ref-space-3);
    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;
    font-size: var(--sx-sys-font-size-xs);
  }

  .project-card__meta-row dt {
    color: var(--sx-sys-color-text-muted);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .project-card__meta-row dd {
    margin: 0;
    color: var(--sx-sys-color-text-primary);
    font-weight: 700;
  }

  .project-card__copy {
    display: flex;
    flex-direction: column;
    gap: var(--sx-ref-space-3);
    min-width: 0;
    justify-content: center;
  }

  .project-card__head {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: var(--sx-ref-space-3);
  }

  .project-card__name {
    margin: 0;
    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;
    font-size: var(--sx-sys-font-display-md);
    font-weight: 800;
    line-height: 1.05;
    color: var(--sx-sys-color-text-primary);
  }

  .project-card__demo {
    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;
    font-size: var(--sx-sys-font-size-sm);
    font-weight: 700;
    color: var(--sx-sys-color-action-primary);
  }

  .project-card__desc {
    margin: 0;
    font-size: var(--sx-sys-font-size-reading);
    line-height: 1.55;
    color: var(--sx-sys-color-text-soft);
  }

  .project-card__highlights {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--sx-ref-space-2);
  }

  .project-card__highlight {
    display: flex;
    align-items: baseline;
    gap: var(--sx-ref-space-2);
    font-size: var(--sx-sys-font-size-base);
    line-height: 1.5;
    color: var(--sx-sys-color-text-soft);
  }

  .project-card__highlight-mark {
    color: var(--sx-sys-color-accent);
    font-weight: 700;
  }

  .project-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sx-ref-space-2);
  }

  .project-card__tag {
    padding: 0.3rem 0.55rem;
    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);
    border-radius: var(--sx-sys-radius-sm);
    background: var(--sx-sys-color-bg-page);
    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;
    font-size: var(--sx-sys-font-size-sm);
    font-weight: 700;
    box-shadow: var(--sx-sys-shadow-sm);
    transform: rotate(var(--sx-sys-rotate-sticker));
  }

  .project-card__tag:nth-child(even) {
    transform: rotate(calc(var(--sx-sys-rotate-sticker) * -1));
  }

  /* 三特性卡：整卡撞色贴纸块（GQL sky / ACL pop-green / CLI orange），背景由 inline --sx-clash 注入。 */
  .project-archive {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: var(--sx-ref-space-6);
  }

  .feature-card {
    display: flex;
    flex-direction: column;
    gap: var(--sx-ref-space-3);
    padding: var(--sx-ref-space-6);
    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);
    border-radius: var(--sx-sys-radius-sm);
    background: var(--sx-clash, var(--sx-sys-color-bg-surface));
    box-shadow: var(--sx-sys-shadow-md);
  }

  .feature-card--lab {
    background: var(--sx-clash, var(--sx-sys-color-bg-surface));
  }

  .feature-card--stack {
    background: var(--sx-sys-color-bg-surface);
  }

  .feature-card__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;
    font-size: var(--sx-sys-font-size-xs);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--sx-sys-color-text-primary);
  }

  .feature-card__title {
    margin: 0;
    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;
    font-size: var(--sx-sys-font-size-2xl);
    font-weight: 800;
    line-height: 1.1;
    color: var(--sx-sys-color-text-primary);
  }

  .feature-card__desc {
    margin: 0;
    font-size: var(--sx-sys-font-size-base);
    line-height: 1.5;
    color: var(--sx-sys-color-text-primary);
  }

  .feature-card__desc--ink {
    color: var(--sx-sys-color-text-primary);
  }

  .feature-card__flow {
    display: flex;
    gap: var(--sx-ref-space-2);
    margin-top: auto;
  }

  /* 撞色卡上的关键词 chip：白底黑字（撞色底上的清晰对比块） */
  .flow-chip {
    flex: 1;
    padding: 0.55rem 0.4rem;
    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);
    border-radius: var(--sx-sys-radius-sm);
    background: var(--sx-sys-color-bg-surface);
    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;
    font-size: var(--sx-sys-font-size-xs);
    font-weight: 700;
    text-align: center;
    box-shadow: var(--sx-sys-shadow-sm);
    color: var(--sx-sys-color-text-primary);
  }

  .feature-card__list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
  }

  .stack-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.55rem 0;
    border-bottom: var(--sx-sys-border-width) dashed
      color-mix(in srgb, var(--sx-sys-color-border) 50%, transparent);
    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;
    font-size: var(--sx-sys-font-size-sm);
  }

  .stack-item:last-child {
    border-bottom: 0;
  }

  .stack-item__mark {
    color: var(--sx-sys-color-action-primary);
    font-weight: 700;
  }

  @media (max-width: 48rem) {
    .project-card {
      flex-direction: column;
    }

    .project-card__side {
      flex-basis: auto;
      width: 100%;
    }

    .project-archive {
      grid-template-columns: 1fr;
    }
  }
`;

// ModelCraft 三大能力柱：GQL / ACL / CLI（整卡撞色贴纸块）
const pillars = [
  {
    eyebrow: 'GQL',
    icon: 'icon-graphql',
    clash: 'var(--sx-sys-color-sky)',
    title: 'GraphQL 统一接口',
    desc: '将数据库能力标准化为可调用接口，方便 AI 和应用统一接入。',
    flow: ['QUERY', 'WRITE', 'SCHEMA'],
  },
  {
    eyebrow: 'ACL',
    icon: 'icon-shield',
    clash: 'var(--sx-sys-color-pop-green)',
    title: 'RBAC 细粒度授权',
    desc: '角色、权限包与字段级策略，让数据访问边界清晰可控。',
    flow: ['ROLE', 'POLICY', 'FIELD'],
  },
  {
    eyebrow: 'CLI',
    icon: 'icon-code',
    clash: 'var(--sx-sys-color-orange)',
    title: 'CLI 可编排调用',
    desc: '适合 AI Agent 和自动化任务，通过命令行安全地查询和操作数据。',
    flow: ['PIPE', 'AGENT', 'AUDIT'],
  },
];

// ModelCraft hero 卡片的产品标签
const heroTags = ['AI Native', 'GraphQL', 'RBAC', 'CLI'];

export default function HomeProjects(_props: ReactProps) {
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
              <div
                className="feature-card feature-card--lab"
                style={styleValue(`--sx-clash: ${p.clash}`)}
              >
                <span className="feature-card__eyebrow">
                  <GeoMark kind={p.icon} size="sm" />
                  {p.eyebrow}
                </span>
                <h3 className="feature-card__title">{p.title}</h3>
                <p className="feature-card__desc feature-card__desc--ink">{p.desc}</p>
                <div className="feature-card__flow">
                  {p.flow.map((f) => (
                    <span className="flow-chip">{f}</span>
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
