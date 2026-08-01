import type { CollectionEntry } from 'astro:content';
import type { CSSProperties } from 'react';
import Card from '../design-system/Card';
import topicsData from '../../data/topics.json';

interface Props { post: CollectionEntry<'posts'> }

/* topic id → 展示 label（来自 topics.json） */
const TOPIC_LABEL: Record<string, string> = Object.fromEntries(
  topicsData.map((t) => [t.id, t.label]),
);
/* topic id → 撞色（贴纸堆：浅撞色一律配黑字）。schema 用 beige（浅奶油，黑框分隔）。 */
const TOPIC_COLOR: Record<string, string> = {
  'ai-agent': 'var(--sx-sys-color-sky)',
  backend: 'var(--sx-sys-color-pop-green)',
  'system-design': 'var(--sx-sys-color-lavender)',
  modelcraft: 'var(--sx-sys-color-coral)',
  reflection: 'var(--sx-sys-color-mint)',
  english: 'var(--sx-sys-color-orange)',
  tooling: 'var(--sx-sys-color-accent)',
  schema: 'var(--sx-sys-color-beige)',
  frontend: 'var(--sx-sys-color-sky)',
};

const css = `
  .postcard { display: flex; flex-direction: column; gap: var(--sx-ref-space-3); height: 100%; }
  .postcard__topic {
    align-self: flex-start;
    padding: 0.25rem 0.55rem;
    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);
    background: var(--sx-postcard-topic, var(--sx-sys-color-accent));
    color: var(--sx-sys-color-text-primary);
    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;
    font-size: var(--sx-sys-font-size-xs);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    box-shadow: var(--sx-sys-shadow-sm);
    transform: rotate(var(--sx-sys-rotate-sticker));
  }
  .postcard__title {
    margin: 0;
    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;
    font-size: var(--sx-sys-font-size-xl);
    font-weight: 800;
    line-height: 1.2;
    color: var(--sx-sys-color-text-primary);
  }
  .postcard__desc {
    margin: 0;
    flex: 1;
    font-size: var(--sx-sys-font-size-base);
    line-height: 1.55;
    color: var(--sx-sys-color-text-soft);
  }
  .postcard__meta {
    margin: 0;
    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;
    font-size: var(--sx-sys-font-size-sm);
    color: var(--sx-sys-color-text-muted);
  }
`;

export default function PostCard({ post }: Props) {
  const { title, description, publishedAt, topics } = post.data;
  const tid = (topics?.[0] as { id: string } | undefined)?.id;
  const topicLabel = tid ? (TOPIC_LABEL[tid] ?? tid) : null;
  const topicColor = tid ? (TOPIC_COLOR[tid] ?? 'var(--sx-sys-color-accent)') : null;
  const date = publishedAt
    ? publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';
  const topicStyle = topicColor ? ({ background: topicColor } as CSSProperties) : undefined;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Card href={`/blog/${post.id}`} className="postcard" interactive>
        {topicLabel && <span className="postcard__topic" style={topicStyle}>{topicLabel}</span>}
        <h3 className="postcard__title">{title}</h3>
        <p className="postcard__desc">{description}</p>
        {date && <time className="postcard__meta">{date}</time>}
      </Card>
    </>
  );
}
