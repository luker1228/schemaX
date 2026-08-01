import type { CollectionEntry } from 'astro:content';
import GeoMark from '../design-system/GeoMark';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .projects__inner {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-6);\n  }\n\n  .project-card {\n    display: flex;\n    align-items: stretch;\n    gap: var(--sx-ref-space-8);\n    padding: var(--sx-ref-space-8);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-bg-surface);\n    box-shadow: var(--sx-sys-shadow-md);\n    text-decoration: none;\n    color: inherit;\n    transition:\n      transform 0.1s ease,\n      box-shadow 0.1s ease;\n  }\n\n  .project-card:hover {\n    transform: translate(-2px, -2px);\n    box-shadow: 9px 9px 0 var(--sx-sys-color-border);\n  }\n\n  .project-card:focus-visible {\n    outline: var(--sx-sys-border-width) solid var(--sx-sys-color-action-primary);\n    outline-offset: 2px;\n  }\n\n  /* 大卡内的侧栏：纸色分区（无 border / shadow，非嵌套卡），承载 status + doodle + meta。\n     侧栏背景取纸色，与卡面 surface 形成微妙层次；gap 与 copy 分区。 */\n  .project-card__side {\n    position: relative;\n    flex: 0 0 15rem;\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-4);\n    padding: var(--sx-ref-space-5);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-bg-page);\n    min-height: 12rem;\n  }\n\n  .project-card__status {\n    align-self: flex-start;\n    padding: 0.3rem 0.55rem;\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-sky);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    box-shadow: var(--sx-sys-shadow-sm);\n    transform: rotate(var(--sx-sys-rotate-sticker));\n  }\n\n  .project-card__doodles {\n    display: flex;\n    align-items: center;\n    gap: var(--sx-ref-space-3);\n  }\n\n  .project-card__meta {\n    margin: auto 0 0;\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-2);\n  }\n\n  .project-card__meta-row {\n    display: flex;\n    justify-content: space-between;\n    gap: var(--sx-ref-space-3);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-xs);\n  }\n\n  .project-card__meta-row dt {\n    color: var(--sx-sys-color-text-muted);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n  }\n\n  .project-card__meta-row dd {\n    margin: 0;\n    color: var(--sx-sys-color-text-primary);\n    font-weight: 700;\n  }\n\n  .project-card__copy {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-3);\n    min-width: 0;\n    justify-content: center;\n  }\n\n  .project-card__head {\n    display: flex;\n    align-items: baseline;\n    flex-wrap: wrap;\n    gap: var(--sx-ref-space-3);\n  }\n\n  .project-card__name {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-md);\n    font-weight: 800;\n    line-height: 1.05;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .project-card__demo {\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    color: var(--sx-sys-color-action-primary);\n  }\n\n  .project-card__desc {\n    margin: 0;\n    font-size: var(--sx-sys-font-size-reading);\n    line-height: 1.55;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  .project-card__highlights {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-2);\n  }\n\n  .project-card__highlight {\n    display: flex;\n    align-items: baseline;\n    gap: var(--sx-ref-space-2);\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.5;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  .project-card__highlight-mark {\n    color: var(--sx-sys-color-accent);\n    font-weight: 700;\n  }\n\n  .project-card__tags {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--sx-ref-space-2);\n  }\n\n  .project-card__tag {\n    padding: 0.3rem 0.55rem;\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-bg-page);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    box-shadow: var(--sx-sys-shadow-sm);\n    transform: rotate(var(--sx-sys-rotate-sticker));\n  }\n\n  .project-card__tag:nth-child(even) {\n    transform: rotate(calc(var(--sx-sys-rotate-sticker) * -1));\n  }\n\n  .project-archive {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: var(--sx-ref-space-6);\n  }\n\n  .feature-card {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-3);\n    padding: var(--sx-ref-space-6);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    box-shadow: var(--sx-sys-shadow-md);\n  }\n\n  .feature-card--lab {\n    background: var(--sx-sys-color-bg-surface);\n  }\n\n  .feature-card--stack {\n    background: var(--sx-sys-color-bg-surface);\n  }\n\n  .feature-card__eyebrow {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.35rem;\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n  }\n\n  .feature-card__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-2xl);\n    font-weight: 800;\n    line-height: 1.1;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .feature-card__desc {\n    margin: 0;\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.5;\n    color: var(--sx-sys-color-text-muted);\n  }\n\n  .feature-card__desc--ink {\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  .feature-card__flow {\n    display: flex;\n    gap: var(--sx-ref-space-2);\n    margin-top: auto;\n  }\n\n  .flow-chip {\n    flex: 1;\n    padding: 0.55rem 0.4rem;\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-flow-bg);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    text-align: center;\n    box-shadow: var(--sx-sys-shadow-sm);\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .feature-card__list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .stack-item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 0.55rem 0;\n    border-bottom: var(--sx-sys-border-width) dashed\n      color-mix(in srgb, var(--sx-sys-color-border) 50%, transparent);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n  }\n\n  .stack-item:last-child {\n    border-bottom: 0;\n  }\n\n  .stack-item__mark {\n    color: var(--sx-sys-color-action-primary);\n    font-weight: 700;\n  }\n\n  @media (max-width: 48rem) {\n    .project-card {\n      flex-direction: column;\n    }\n\n    .project-card__side {\n      flex-basis: auto;\n      width: 100%;\n    }\n\n    .project-archive {\n      grid-template-columns: 1fr;\n    }\n  }\n";
export default function HomeProjects(props: ReactProps) {

interface Props {
  /** featured 项目（大卡）。无则省略大卡，仅展示双特性小卡。 */
  project?: CollectionEntry<'projects'>;
}
const { project } = props as Props;

const statusLabel = project?.data.status.toUpperCase();
const year = project?.data.startedAt
  ? new Date(project.data.startedAt).getFullYear()
  : null;
let demoDomain: string | null = null;
if (project?.data.demo) {
  try {
    demoDomain = new URL(project.data.demo).host.replace(/^www\./, '');
  } catch {
    demoDomain = null;
  }
}
// featured 项目（SchemaX 本站）的核心能力——作 highlights 固定展示
const highlights = [
  '内容集合由 Schema 校验——错误无法构建',
  '设计 Token 由 DTCG 源自动生成',
  '静态优先 · 零 JS 渲染（Astro Islands）',
];

const labFlow = [
  { label: 'SCHEMA', bg: 'var(--sx-sys-color-coral)' },
  { label: 'SLUG', bg: 'var(--sx-sys-color-accent)' },
  { label: 'REDIRECT', bg: 'var(--sx-sys-color-sky)' },
];
const stackList = [
  'expressive code → static highlighting',
  'pagefind → dist-only indexing',
  'style dictionary → generated tokens',
];
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<section className="projects home-section" aria-labelledby="projects-title">
  <div className="projects__inner home-section__inner">
    <header className="home-head">
      <h2 className="home-head__title" id="projects-title">代表作品</h2>
      <a className="home-head__link" href="/projects">Explore projects →</a>
    </header>

    {
      project && (
        <a className="project-card" href={`/projects/${project.id}`}>
          <div className="project-card__side">
            {statusLabel && (
              <span className="project-card__status">{statusLabel} / V1</span>
            )}
            <div className="project-card__doodles" aria-hidden="true">
              <GeoMark kind="icon-code" size="lg" />
              <GeoMark kind="brace" size="md" />
            </div>
            <dl className="project-card__meta">
              {year && (
                <div className="project-card__meta-row">
                  <dt>Built</dt>
                  <dd>{year}</dd>
                </div>
              )}
              <div className="project-card__meta-row">
                <dt>Stack</dt>
                <dd>{project.data.stack.length}</dd>
              </div>
            </dl>
          </div>
          <div className="project-card__copy">
            <div className="project-card__head">
              <h3 className="project-card__name">{project.data.title}</h3>
              {demoDomain && (
                <span className="project-card__demo">{demoDomain}</span>
              )}
            </div>
            <p className="project-card__desc">{project.data.description}</p>
            <ul className="project-card__highlights">
              {highlights.map((h) => (
                <li className="project-card__highlight">
                  <span className="project-card__highlight-mark" aria-hidden="true">✦</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            {project.data.stack.length > 0 && (
              <div className="project-card__tags">
                {project.data.stack.map((s) => (
                  <span className="project-card__tag">{s}</span>
                ))}
              </div>
            )}
          </div>
        </a>
      )
    }

    <div className="project-archive">
      <div className="feature-card feature-card--lab">
        <span className="feature-card__eyebrow">
          <GeoMark kind="icon-db" size="sm" />
          System lab
        </span>
        <h3 className="feature-card__title">
          Content Collections / Redirect Governance
        </h3>
        <p className="feature-card__desc feature-card__desc--ink">
          围绕 posts、courses、lessons、projects、topics
          五个集合组织内容，并用永久 id 与 slug 分离治理 URL。
        </p>
        <div className="feature-card__flow">
          {labFlow.map((f) => (
            <span className="flow-chip" style={styleValue(`--sx-flow-bg: ${f.bg}`)}>
              {f.label}
            </span>
          ))}
        </div>
      </div>

      <div className="feature-card feature-card--stack">
        <span className="feature-card__eyebrow">
          <GeoMark kind="icon-code" size="sm" />
          Toolchain
        </span>
        <h3 className="feature-card__title">Build Chain / Search / Code Blocks</h3>
        <p className="feature-card__desc">
          Expressive Code、Pagefind 与生成式 token
          桥接共同承担阅读体验、检索与界面一致性。
        </p>
        <ul className="feature-card__list">
          {stackList.map((item) => (
            <li className="stack-item">
              <span className="stack-item__text">{item}</span>
              <span className="stack-item__mark" aria-hidden="true">
                +
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
