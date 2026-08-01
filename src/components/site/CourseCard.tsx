import type { CollectionEntry } from 'astro:content';
import Doodle from '../design-system/Doodle';
import type { DoodleMarkKind } from '../../lib/doodle';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  /*\n   * 空间命题（layout thesis）\n   * - 主路径：标题 → 描述（进入由整卡 hover 浮起承担，单一入口）\n   * - 身份（印章）与文案分列：proximity 上标签绑定，但不与标题抢 squint 权重\n   * - 组内紧（meta/title/desc gap-2～3）；描述 flex 推底，卡片等高\n   */\n  .coursecard {\n    --sx-sys-shadow-color: var(--sx-sys-color-border);\n\n    display: grid;\n    grid-template-columns: auto minmax(0, 1fr);\n    gap: 0 var(--sx-ref-space-6);\n    align-items: stretch;\n    height: 100%;\n    min-width: 0;\n    box-sizing: border-box;\n    padding: var(--sx-ref-space-6);\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    box-shadow: var(--sx-sys-shadow-sm);\n    text-decoration: none;\n    color: inherit;\n    transition:\n      transform 120ms ease,\n      box-shadow 120ms ease;\n  }\n\n  .coursecard:hover {\n    transform: translate(-3px, -3px);\n    box-shadow: var(--sx-sys-shadow-md);\n  }\n\n  .coursecard:focus-visible {\n    outline: var(--sx-sys-border-width) solid var(--sx-sys-color-action-primary);\n    outline-offset: 2px;\n  }\n\n  /* —— 身份列 —— */\n  .coursecard__identity {\n    display: flex;\n    align-items: flex-start;\n  }\n\n  .coursecard__stamp {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 4rem;\n    height: 4rem;\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n\n    /* 重置回黑：抵消卡片根上覆盖的撞色 shadow-color，stamp 保持黑色小硬影 */\n    --sx-sys-shadow-color: var(--sx-sys-color-border);\n\n    box-shadow: var(--sx-sys-shadow-sm);\n  }\n\n  .coursecard__stamp :global(.sx-doodle) {\n    width: 2.5rem;\n    height: 2.5rem;\n  }\n\n  /* —— 文案栈：纵向节奏 —— */\n  .coursecard__main {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-2);\n    min-width: 0;\n    min-height: 100%;\n  }\n\n  /* 元信息一行：紧贴标题上方（eyebrow 角色） */\n  .coursecard__meta-row {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: var(--sx-ref-space-2);\n  }\n\n  .coursecard__type,\n  .coursecard__level,\n  .coursecard__status {\n    display: inline-flex;\n    align-items: center;\n    padding: 0.2rem 0.45rem;\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    letter-spacing: 0.04em;\n    text-transform: uppercase;\n    line-height: 1.2;\n  }\n\n  .coursecard__type {\n    background: var(--sx-sys-color-accent);\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .coursecard__level {\n    background: transparent;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  .coursecard__status {\n    background: var(--sx-sys-color-beige);\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  /* 主元素：标题 */\n  .coursecard__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-2xl);\n    font-weight: 800;\n    line-height: 1.18;\n    letter-spacing: -0.02em;\n    color: var(--sx-sys-color-text-primary);\n    /* 标题上方略紧：与 meta 同属「标题组」 */\n  }\n\n  /* 次元素：描述限 2 行，压密度、让脚注常可见 */\n  .coursecard__desc {\n    margin: 0;\n    flex: 1 1 auto;\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.5;\n    color: var(--sx-sys-color-text-soft);\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: 2;\n    overflow: hidden;\n  }\n\n  /* 极窄：印章缩到顶行与 meta 同行，避免竖向浪费 */\n  @media (max-width: 36rem) {\n    .coursecard {\n      grid-template-columns: auto minmax(0, 1fr);\n      gap: 0 var(--sx-ref-space-4);\n      padding: var(--sx-ref-space-4);\n    }\n\n    .coursecard__stamp {\n      width: 3rem;\n      height: 3rem;\n    }\n\n    .coursecard__stamp :global(.sx-doodle) {\n      width: 1.85rem;\n      height: 1.85rem;\n    }\n\n    .coursecard__title {\n      font-size: var(--sx-sys-font-size-xl);\n    }\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    .coursecard {\n      transition: none;\n    }\n\n    .coursecard:hover {\n      transform: none;\n    }\n  }\n";
export default function CourseCard(props: ReactProps) {
/**
 * 课程列表卡 —— layout 承重：
 * 阅读序：Title（主）→ Description（次）→ Meta（辅）
 * 结构：横排「身份印章 | 文案栈」；窄屏印章缩顶左、文案仍纵向。
 * 入口：整张卡为 <a>，hover 浮起 = 唯一入口（无内嵌 CTA / 脚注）。
 */

interface Props {
  course: CollectionEntry<'courses'>;
}
const { course } = props as Props;
const { title, description, level, type, status } = course.data;

const doodleByType: Record<string, DoodleMarkKind> = {
  handbook: 'icon-course',
  guide: 'icon-base',
  workshop: 'icon-component',
  series: 'icon-pattern',
};
const doodle = doodleByType[type] ?? 'icon-course';

const stampByType: Record<string, string> = {
  handbook: 'var(--sx-sys-color-accent)',
  guide: 'var(--sx-sys-color-bg-page)',
  workshop: 'var(--sx-sys-color-bg-page)',
  series: 'var(--sx-sys-color-beige)',
};
const stampBg = stampByType[type] ?? 'var(--sx-sys-color-accent)';

const shadowByType: Record<string, string> = {
  handbook: 'var(--sx-sys-color-accent)',
  guide: 'var(--sx-sys-color-action-primary)',
  workshop: 'var(--sx-sys-color-border)',
  series: 'var(--sx-sys-color-border)',
};
const shadowColor = shadowByType[type] ?? 'var(--sx-sys-color-border)';

const levelLabel: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const typeLabel: Record<string, string> = {
  handbook: 'Handbook',
  guide: 'Guide',
  workshop: 'Workshop',
  series: 'Series',
};

const statusLabel: Record<string, string> = {
  planning: 'Planning',
  writing: 'Writing',
  active: 'Active',
  completed: 'Completed',
};

const isActive = status === 'active' || status === 'completed';
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<a
  className="coursecard"
  href={`/courses/${course.id}`} style={styleValue(`--sx-sys-shadow-color: ${shadowColor}`)}
>
  {/* 身份列：涂鸦印章 ——  squint 下的「这是哪类课」锚点 */}
  <div className="coursecard__identity" aria-hidden="true">
    <div className="coursecard__stamp" style={styleValue(`background:${stampBg}`)}>
      <Doodle kind={doodle} size="md" />
    </div>
  </div>

  {/* 文案列：标签 → 标题 → 描述 → 脚注（主阅读路径） */}
  <div className="coursecard__main">
    <div className="coursecard__meta-row">
      <span className="coursecard__type">{typeLabel[type] ?? type}</span>
      <span className="coursecard__level">{levelLabel[level] ?? level}</span>
      {
        !isActive && (
          <span className="coursecard__status">
            {statusLabel[status] ?? status}
          </span>
        )
      }
    </div>

    <h3 className="coursecard__title">{title}</h3>
    <p className="coursecard__desc">{description}</p>
  </div>
</a>
    </>
  );
}
