import type { CollectionEntry } from 'astro:content';
import GeoMark from '../design-system/GeoMark';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .latest-card {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-4);\n    padding: var(--sx-ref-space-8);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-bg-surface);\n    box-shadow: var(--sx-sys-shadow-md);\n    text-decoration: none;\n    color: inherit;\n    transition:\n      transform 0.1s ease,\n      box-shadow 0.1s ease;\n  }\n\n  .latest-card:hover {\n    transform: translate(-2px, -2px);\n    box-shadow: 9px 9px 0 var(--sx-sys-color-border);\n  }\n\n  .latest-card:focus-visible {\n    outline: var(--sx-sys-border-width) solid var(--sx-sys-color-action-primary);\n    outline-offset: 2px;\n  }\n\n  .latest-card__meta {\n    display: flex;\n    align-items: center;\n    gap: var(--sx-ref-space-3);\n    flex-wrap: wrap;\n  }\n\n  .post-badge {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.35rem;\n    padding: 0.3rem 0.55rem;\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-coral);\n    color: var(--sx-sys-color-text-primary);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    letter-spacing: 0.05em;\n    box-shadow: var(--sx-sys-shadow-sm);\n    transform: rotate(var(--sx-sys-rotate-sticker));\n  }\n\n  .latest-card__date {\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    color: var(--sx-sys-color-text-muted);\n  }\n\n  .latest-card__star {\n    margin-left: auto;\n  }\n\n  .latest-card__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-md);\n    font-weight: 800;\n    line-height: 1.08;\n    letter-spacing: -0.02em;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .latest-card__desc {\n    margin: 0;\n    max-width: 62ch;\n    font-size: var(--sx-sys-font-size-reading);\n    line-height: 1.6;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  .latest-card__cta {\n    display: inline-flex;\n    align-items: center;\n    gap: var(--sx-ref-space-2);\n    margin-top: var(--sx-ref-space-2);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-md);\n    font-weight: 700;\n    color: var(--sx-sys-color-action-primary);\n  }\n\n  /* 裸 editorial 索引：不套卡、行间无分割线，靠留白与 hover 反应区分条目。\n     head 用 muted 文字而非黄底——黄只留 hero/closing，且 Never-Dark 禁暗色填充。 */\n  .archive {\n    margin-top: var(--sx-ref-space-8);\n    display: flex;\n    flex-direction: column;\n  }\n\n  .archive__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 0 0.5rem var(--sx-ref-space-3);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    letter-spacing: 0.05em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-text-muted);\n  }\n\n  .archive__row {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--sx-ref-space-4);\n    padding: var(--sx-ref-space-4) 0.5rem;\n    text-decoration: none;\n    color: inherit;\n    transition: background-color 120ms ease;\n  }\n\n  .archive__row:hover {\n    background: var(--sx-sys-color-bg-surface);\n  }\n\n  .archive__row:focus-visible {\n    outline: var(--sx-sys-border-width) solid var(--sx-sys-color-action-primary);\n    outline-offset: 2px;\n  }\n\n  .archive__copy {\n    display: flex;\n    flex-direction: column;\n    gap: 0.35rem;\n    min-width: 0;\n  }\n\n  .archive__index {\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    color: var(--sx-sys-color-text-muted);\n  }\n\n  .archive__title {\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-xl);\n    font-weight: 800;\n    line-height: 1.2;\n  }\n\n  .archive__desc {\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.5;\n    color: var(--sx-sys-color-text-muted);\n  }\n\n  .archive__action {\n    flex-shrink: 0;\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    color: var(--sx-sys-color-action-primary);\n  }\n";
export default function HomeLatestPosts(props: ReactProps) {

interface Props {
  /** 已按发布时间倒序的已发布文章（取前 N 篇：第 1 篇大卡，其余归档行）。 */
  posts: CollectionEntry<'posts'>[];
}
const { posts } = props as Props;

const [latest, ...archive] = posts;

const topicRef = latest?.data.topics[0] as { id: string } | undefined;
const latestTopicLabel = topicRef?.id ?? null;

const formatDate = (d?: Date) =>
  d
    ? `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
        d.getDate(),
      ).padStart(2, '0')}`
    : '';

const latestDate = formatDate(latest?.data.publishedAt);
const latestMeta = [latestDate, latestTopicLabel].filter(Boolean).join(' / ');
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
{
  latest && (
    <section className="latest home-section" aria-labelledby="latest-title">
      <div className="latest__inner home-section__inner">
        <header className="home-head">
          <h2 className="home-head__title" id="latest-title">
            最新文章
          </h2>
          <a className="home-head__link" href="/blog">
            Read the blog →
          </a>
        </header>

        <a className="latest-card" href={`/blog/${latest.id}`}>
          <div className="latest-card__meta">
            <span className="post-badge">
              <GeoMark kind="icon-blog" size="sm" />
              POST
            </span>
            {latestMeta && (
              <span className="latest-card__date">{latestMeta}</span>
            )}
            <GeoMark kind="star" size="sm" className="latest-card__star" />
          </div>
          <h3 className="latest-card__title">{latest.data.title}</h3>
          <p className="latest-card__desc">{latest.data.description}</p>
          <span className="latest-card__cta">
            继续阅读
            <GeoMark kind="arrow" size="sm" />
          </span>
        </a>

        {archive.length > 0 && (
          <div className="archive">
            <div className="archive__head">
              <span>Article index</span>
              <span>{String(archive.length).padStart(2, '0')} more</span>
            </div>
            {archive.map((p, i) => (
              <a className="archive__row" href={`/blog/${p.id}`}>
                <div className="archive__copy">
                  <span className="archive__index">
                    [{String(i + 2).padStart(2, '0')}]
                  </span>
                  <span className="archive__title">{p.data.title}</span>
                  <span className="archive__desc">{p.data.description}</span>
                </div>
                <span className="archive__action">Read →</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
    </>
  );
}
