
import type { ReactNode, CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  /* —— 三段式条：白底 + 2px 黑边 + 圆角 + 硬阴影 —— */\n  /* 父容器 .sx-doc-main 是 flex column，默认 align-items:stretch 会把横向撑满，\n     用 align-self + 明确 width 控制宽度。 */\n  .docs-nav {\n    display: flex;\n    align-items: stretch;\n    align-self: center;\n    width: 75%;\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-md);\n    box-shadow: var(--sx-sys-shadow-sm);\n  }\n  .docs-nav__slot {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    padding: 0.6875rem 1rem;\n    text-decoration: none;\n    color: var(--sx-sys-color-text-primary);\n    transition: background-color 120ms ease;\n    min-width: 0;\n  }\n  .docs-nav__slot--prev,\n  .docs-nav__slot--next {\n    flex: 1 1 0;\n  }\n  .docs-nav__slot--prev {\n    justify-content: flex-start;\n    border-right: var(--sx-sys-border-width-strong) solid\n      var(--sx-sys-color-border);\n  }\n  .docs-nav__slot--next {\n    justify-content: flex-end;\n    border-left: var(--sx-sys-border-width-strong) solid\n      var(--sx-sys-color-border);\n  }\n  .docs-nav__slot--center {\n    flex: 0 0 auto;\n    justify-content: center;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-md);\n    font-weight: 700;\n  }\n  a.docs-nav__slot:hover {\n    background: var(--sx-sys-color-bg-page);\n  }\n\n  .docs-nav__title {\n    font-family: var(--sx-sys-font-family-display);\n    font-size: var(--sx-sys-font-size-base);\n    font-weight: 700;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .docs-nav__arrow {\n    width: 1rem;\n    height: 1rem;\n    flex: 0 0 auto;\n  }\n\n  .docs-nav__index-icon {\n    width: 0.875rem;\n    height: 0.875rem;\n    flex: 0 0 auto;\n  }\n\n  /* placeholder：首/末项时 prev/next 为空的占位。\n     完全塌缩不占空间，让有内容的一端完整展开。 */\n  .docs-nav__slot--placeholder {\n    flex: 0 0 0;\n    padding: 0;\n    pointer-events: none;\n  }\n  .docs-nav__slot--placeholder.docs-nav__slot--prev {\n    border-right: none;\n  }\n  .docs-nav__slot--placeholder.docs-nav__slot--next {\n    border-left: none;\n  }\n\n   @media (max-width: 36rem) {\n    .docs-nav__title {\n      display: none;\n    }\n    .docs-nav__slot {\n      padding: 0.875rem;\n    }\n  }\n";
export default function DocPager(props: ReactProps) {
// DocPager —— 文档/课时顶部三段式横向导航条：prev / 中心目录 / next。
// 数据驱动、零 JS。prev/next 为 null（首/末项）时渲染空占位，保持三段布局对称。
// 设计系统组件页与课程课时页共用本组件。

interface DocPagerLink {
  /** 展示标题 */
  title: string;
  /** 跳转地址 */
  href: string;
}

interface Props {
  prev: DocPagerLink | null;
  next: DocPagerLink | null;
  /** 中间「目录」按钮链接 */
  centerHref: string;
  /** 中间按钮文案，默认「目录」 */
  centerLabel?: string;
  /** nav 的 aria-label */
  label?: string;
}

const {
  prev,
  next,
  centerHref,
  centerLabel = '目录',
  label = '前后导航',
} = props;
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<nav className="docs-nav" aria-label={label}>
  {
    prev ? (
      <a
        className="docs-nav__slot docs-nav__slot--prev"
        href={prev.href}
        rel="prev"
      >
        <ArrowLeft className="docs-nav__arrow" aria-hidden="true" />
        <span className="docs-nav__title">{prev.title}</span>
      </a>
    ) : (
      <span
        className="docs-nav__slot docs-nav__slot--prev docs-nav__slot--placeholder"
        aria-hidden="true"
      />
    )
  }

  <a className="docs-nav__slot docs-nav__slot--center" href={centerHref}>
    <LayoutGrid className="docs-nav__index-icon" aria-hidden="true" />
    {centerLabel}
  </a>

  {
    next ? (
      <a
        className="docs-nav__slot docs-nav__slot--next"
        href={next.href}
        rel="next"
      >
        <span className="docs-nav__title">{next.title}</span>
        <ArrowRight className="docs-nav__arrow" aria-hidden="true" />
      </a>
    ) : (
      <span
        className="docs-nav__slot docs-nav__slot--next docs-nav__slot--placeholder"
        aria-hidden="true"
      />
    )
  }
</nav>
    </>
  );
}
