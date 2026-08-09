import type { CollectionEntry } from 'astro:content';
import type { CSSProperties } from 'react';
import Card from '../design-system/Card';

interface Props {
  course: CollectionEntry<'courses'>;
}

/* type → 撞色 pill（浅撞色一律配黑字，与 PostCard topic 同语系） */
const TYPE_COLOR: Record<string, string> = {
  handbook: 'var(--sx-sys-color-accent)',
  guide: 'var(--sx-sys-color-sky)',
  workshop: 'var(--sx-sys-color-coral)',
  series: 'var(--sx-sys-color-pop-green)',
};

const TYPE_LABEL: Record<string, string> = {
  handbook: 'Handbook',
  guide: 'Guide',
  workshop: 'Workshop',
  series: 'Series',
};

const LEVEL_LABEL: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const STATUS_LABEL: Record<string, string> = {
  planning: 'Planning',
  writing: 'Writing',
  active: 'Active',
  completed: 'Completed',
};

const css = `
  .coursecard { display: flex; flex-direction: column; gap: var(--sx-ref-space-3); height: 100%; }
  .coursecard__type {
    align-self: flex-start;
    padding: 0.25rem 0.55rem;
    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);
    background: var(--sx-coursecard-type, var(--sx-sys-color-accent));
    color: var(--sx-sys-color-text-primary);
    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;
    font-size: var(--sx-sys-font-size-xs);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    box-shadow: var(--sx-sys-shadow-sm);
    transform: rotate(var(--sx-sys-rotate-sticker));
  }
  .coursecard__title {
    margin: 0;
    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;
    font-size: var(--sx-sys-font-size-xl);
    font-weight: 800;
    line-height: 1.2;
    color: var(--sx-sys-color-text-primary);
  }
  .coursecard__desc {
    margin: 0;
    flex: 1;
    font-size: var(--sx-sys-font-size-base);
    line-height: 1.55;
    color: var(--sx-sys-color-text-soft);
  }
  .coursecard__meta {
    margin: 0;
    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;
    font-size: var(--sx-sys-font-size-sm);
    color: var(--sx-sys-color-text-muted);
  }
`;

export default function CourseCard({ course }: Props) {
  const { title, description, level, type, status, estimatedHours } = course.data;
  const typeLabel = TYPE_LABEL[type] ?? type;
  const typeColor = TYPE_COLOR[type] ?? 'var(--sx-sys-color-accent)';
  const levelLabel = LEVEL_LABEL[level] ?? level;
  const showStatus = status !== 'active' && status !== 'completed';
  const statusLabel = showStatus ? (STATUS_LABEL[status] ?? status) : null;

  const metaParts = [
    levelLabel,
    estimatedHours != null ? `${estimatedHours}h` : null,
    statusLabel,
  ].filter(Boolean);

  const typeStyle = { background: typeColor } as CSSProperties;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Card href={`/courses/${course.id}`} className="coursecard" interactive>
        <span className="coursecard__type" style={typeStyle}>
          {typeLabel}
        </span>
        <h3 className="coursecard__title">{title}</h3>
        <p className="coursecard__desc">{description}</p>
        {metaParts.length > 0 && (
          <p className="coursecard__meta">{metaParts.join(' · ')}</p>
        )}
      </Card>
    </>
  );
}
