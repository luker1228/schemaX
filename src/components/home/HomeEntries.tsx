import GeoMark from '../design-system/GeoMark';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .entries__head-copy {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-2);\n  }\n\n  .entries__sub {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-text-muted);\n  }\n\n  .entries__grid {\n    display: grid;\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    gap: var(--sx-ref-space-6);\n  }\n\n  .entry {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-3);\n    min-height: 13.5rem;\n    padding: 1.25rem;\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-bg-surface);\n    box-shadow: 6px 6px 0 var(--sx-entry-shadow);\n    text-decoration: none;\n    color: inherit;\n    transition:\n      transform 0.1s ease,\n      box-shadow 0.1s ease;\n  }\n\n  .entry:hover {\n    transform: translate(-2px, -2px);\n    box-shadow: 9px 9px 0 var(--sx-entry-shadow);\n  }\n\n  .entry:focus-visible {\n    outline: var(--sx-sys-border-width) solid var(--sx-sys-color-action-primary);\n    outline-offset: 2px;\n  }\n\n  /* icon 容器：黄底黑边方块 + 硬影，凸显手绘 icon（贴纸印泥戳） */\n  .entry__icon {\n    display: flex;\n    width: 5rem;\n    height: 5rem;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-entry-icon-bg, var(--sx-sys-color-accent));\n    box-shadow: var(--sx-sys-shadow-sm);\n  }\n\n  .entry__label {\n    margin-top: auto;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-2xl);\n    font-weight: 800;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .entry__desc {\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.55;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  @media (max-width: 64rem) {\n    .entries__grid {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n  }\n\n  @media (max-width: 36rem) {\n    .entries__grid {\n      grid-template-columns: 1fr;\n    }\n  }\n";
export default function HomeEntries(props: ReactProps) {

// 四入口：几何线条 icon + neubrutalism 撞色贴纸堆（icon 容器四撞色 + 撞色硬影）
const entries = [
  {
    label: 'Courses',
    href: '/courses',
    desc: '体系化课程、章节与练习。从骨架到装修，一步可复现。',
    icon: 'icon-course' as const,
    iconBg: 'var(--sx-sys-color-accent)' /* 黄 */,
    shadow: 'var(--sx-sys-color-action-primary)' /* 蓝硬影 */,
  },
  {
    label: 'Blog',
    href: '/blog',
    desc: '技术文章与工程笔记。为搜索读者写的可执行结构。',
    icon: 'icon-blog' as const,
    iconBg: 'var(--sx-sys-color-coral)' /* 珊瑚粉 */,
    shadow: 'var(--sx-sys-color-border)' /* 黑硬影 */,
  },
  {
    label: 'Projects',
    href: '/projects',
    desc: '开源仓库、产品实验与工程作品。',
    icon: 'icon-code' as const,
    iconBg: 'var(--sx-sys-color-sky)' /* 天蓝 */,
    shadow: 'var(--sx-sys-color-accent)' /* 黄硬影 */,
  },
  {
    label: 'Design System',
    href: '/design-system',
    desc: 'Token、组件与内容规范——SchemaX 的活契约。',
    icon: 'icon-db' as const,
    iconBg: 'var(--sx-sys-color-pop-green)' /* 柔绿 */,
    shadow: 'var(--sx-sys-color-border)' /* 黑硬影 */,
  },
];
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<section className="entries home-section" aria-labelledby="entries-title">
  <div className="entries__inner home-section__inner">
    <header className="home-head">
      <div className="entries__head-copy">
        <h2 className="home-head__title" id="entries-title">从这里走进 SchemaX</h2>
        <p className="entries__sub">四条路径 · 同一套结构</p>
      </div>
      <GeoMark kind="star" size="sm" />
    </header>

    <div className="entries__grid">
      {
        entries.map((e) => (
          <a
            className="entry"
            href={e.href} style={styleValue(`--sx-entry-shadow: ${e.shadow}; --sx-entry-icon-bg: ${e.iconBg}`)}
          >
            <span className="entry__icon">
              <GeoMark kind={e.icon} size="lg" />
            </span>
            <span className="entry__label">{e.label}</span>
            <span className="entry__desc">{e.desc}</span>
          </a>
        ))
      }
    </div>
  </div>
</section>
    </>
  );
}
