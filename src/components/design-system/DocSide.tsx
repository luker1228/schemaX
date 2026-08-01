
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  /* —— 容器：纵向堆叠各组（浮动由外层 .sx-doc-side-slot 负责） —— */\n  .doc-side {\n    display: flex;\n    flex-direction: column;\n    gap: 1.25rem;\n    width: 100%;\n    box-sizing: border-box;\n  }\n\n  .sr-only {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    margin: -1px;\n    overflow: hidden;\n    clip: rect(0, 0, 0, 0);\n    white-space: nowrap;\n    border: 0;\n  }\n\n  /* 视觉隐藏 checkbox，仍可被 label 切换、键盘可达 */\n  .doc-side__check {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    margin: -1px;\n    overflow: hidden;\n    clip: rect(0, 0, 0, 0);\n    white-space: nowrap;\n    border: 0;\n  }\n\n  .doc-side__chrome {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.5rem;\n    min-height: 1.75rem;\n  }\n  .doc-side__chrome-title {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-text-soft);\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .doc-side__toggle {\n    flex: 0 0 auto;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0.25rem 0.5rem;\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    background: var(--sx-sys-color-bg-surface);\n    color: var(--sx-sys-color-text-primary);\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    letter-spacing: 0.04em;\n    line-height: 1.2;\n    cursor: pointer;\n    user-select: none;\n    box-shadow: var(--sx-sys-shadow-sm);\n  }\n  .doc-side__toggle:hover {\n    background: var(--sx-sys-color-accent);\n  }\n  .doc-side__toggle:active {\n    transform: translate(1px, 1px);\n    box-shadow: none;\n  }\n  .doc-side__check:focus-visible + .doc-side__chrome .doc-side__toggle {\n    outline: 2px solid var(--sx-sys-color-action-primary);\n    outline-offset: 2px;\n  }\n\n  /* checked = 展开：显示「收起」；未选中 = 收起：显示「目录」 */\n  .doc-side__check:checked ~ .doc-side__chrome .doc-side__toggle-show {\n    display: none;\n  }\n  .doc-side__body {\n    display: flex;\n    flex-direction: column;\n    gap: 1.875rem;\n  }\n\n  .doc-side__check:not(:checked) ~ .doc-side__chrome .doc-side__toggle-hide {\n    display: none;\n  }\n  .doc-side__check:not(:checked) ~ .doc-side__body {\n    display: none;\n  }\n  .doc-side__check:not(:checked) ~ .doc-side__chrome .doc-side__chrome-title {\n    display: none;\n  }\n  /* 收起时 chrome 只留把手，居中竖条感 */\n  .doc-side__check:not(:checked) ~ .doc-side__chrome {\n    justify-content: center;\n  }\n  .doc-side__check:not(:checked) ~ .doc-side__chrome .doc-side__toggle {\n    writing-mode: vertical-rl;\n    text-orientation: mixed;\n    letter-spacing: 0.12em;\n    padding: 0.625rem 0.375rem;\n    min-height: 4.5rem;\n  }\n  .doc-side__group {\n    display: flex;\n    flex-direction: column;\n    gap: 0.875rem;\n  }\n\n  /* —— 分组标题：小色块 + 大写 mono 小字 —— */\n  .doc-side__eyebrow {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    letter-spacing: 0.09em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-text-soft);\n  }\n  .doc-side__mark {\n    width: 0.5rem;\n    height: 0.5rem;\n    background: var(--sx-sys-color-accent);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    flex: 0 0 auto;\n  }\n\n  /* —— 链接列表 —— */\n  .doc-side__nav {\n    display: flex;\n    flex-direction: column;\n    gap: 0.375rem;\n  }\n  .doc-side__link {\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n    padding: 0.25rem 0.125rem;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-md);\n    font-weight: 600;\n    text-decoration: none;\n    color: var(--sx-sys-color-text-soft);\n    transition: color 120ms ease;\n  }\n  /* 指示条（::before）：默认细灰横条；current 时加宽变 accent */\n  .doc-side__link::before {\n    content: '';\n    width: 0.5rem;\n    height: 2px;\n    background: var(--sx-sys-color-text-soft);\n    border-radius: 1px;\n    flex: 0 0 auto;\n    transition:\n      width 120ms ease,\n      background-color 120ms ease;\n  }\n  .doc-side__link:hover {\n    color: var(--sx-sys-color-text-primary);\n  }\n  .doc-side__link:hover::before {\n    background: var(--sx-sys-color-text-primary);\n  }\n\n  /* —— 当前页：指示条加宽 + label 变 accent badge —— */\n  .doc-side__link[aria-current='page'] {\n    color: var(--sx-sys-color-text-primary);\n  }\n  .doc-side__link[aria-current='page']::before {\n    width: 0.75rem;\n    height: 4px;\n    background: var(--sx-sys-color-accent);\n  }\n  .doc-side__link[aria-current='page'] .doc-side__label {\n    display: inline-block;\n    padding: 2px 8px;\n    background: var(--sx-sys-color-accent);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-radius: 3px;\n    font-weight: 800;\n  }\n\n  /* —— planned：灰显、不可点 —— */\n  .doc-side__link.is-planned {\n    opacity: 0.45;\n    cursor: not-allowed;\n  }\n";
export interface DocSideItem {
  label: string;
  href?: string;
  current?: boolean;
  planned?: boolean;
}

export interface DocSideGroup {
  title: string;
  ariaLabel?: string;
  items: DocSideItem[];
}

export default function DocSide(props: ReactProps) {
// DocSide 组件 —— SchemaX UI
// 文档 / 设计系统左侧边栏：可多组导航，每组有 eyebrow 标题 + 链接列表。
//
// 状态（通过 item 字段，非类名驱动）：
//   - current  → aria-current="page"，指示条加宽 + label 黄底徽章
//   - planned  → 灰显不可点（span + aria-disabled）
//   - 默认     → 可点链接，hover 加深
//
// 可收起：原生 checkbox + CSS :has（零 JS）。收起后侧栏只留「目录」把手，
// 主区由 .sx-doc-layout:has(...) 扩宽（见 layout.css）。
//
// 浮动（sticky）不在本组件内实现：必须由页面布局提供「全高槽位」
// （.sx-doc-side-slot，见 layout.css），在槽上设 sticky。组件只管内容高度。

interface DocSideItemInternal {
  /** 显示文本 */
  label: string;
  /** 链接地址。planned 项可不传 */
  href?: string;
  /** 是否为当前页 */
  current?: boolean;
  /** 是否为计划中（灰显、不可点） */
  planned?: boolean;
}

interface DocSideGroupInternal {
  /** 分组标题（eyebrow 文案） */
  title: string;
  /** 分组 nav 的 aria-label，默认用 title */
  ariaLabel?: string;
  /** 该组链接项 */
  items: DocSideItem[];
}

interface Props {
  /** 导航分组列表 */
  groups: DocSideGroup[];
  /** 整个 aside 的 aria-label */
  label?: string;
  /** 是否可收起（默认 true）。Demo 多实例可关，避免布局跳动 */
  collapsible?: boolean;
}

const { groups, label = '文档目录', collapsible = true } = props as { groups: DocSideGroup[]; label?: string; collapsible?: boolean };
// 同页多实例（设计系统 Demo）时需唯一 id
const collapseId = `doc-side-${crypto.randomUUID().slice(0, 8)}`;
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<aside className={['doc-side', collapsible && 'doc-side--collapsible'].filter(Boolean).join(' ')} aria-label={label}>
  {
    collapsible ? (
      <input
        type="checkbox"
        id={collapseId}
        className="doc-side__check"
        checked
        aria-controls={`${collapseId}-body`}
      />
    ) : null
  }

  {
    collapsible ? (
      <div className="doc-side__chrome">
        <span className="doc-side__chrome-title">{label}</span>
        <label
          htmlFor={collapseId}
          className="doc-side__toggle"
          title="收起或展开目录"
        >
          <span className="doc-side__toggle-hide" aria-hidden="true">
            收起
          </span>
          <span className="doc-side__toggle-show" aria-hidden="true">
            目录
          </span>
          <span className="sr-only">收起或展开侧栏目录</span>
        </label>
      </div>
    ) : null
  }

  <div
    className="doc-side__body"
    id={collapsible ? `${collapseId}-body` : undefined}
  >
    {
      groups.map((group) => (
        <nav className="doc-side__group" aria-label={group.ariaLabel ?? group.title}>
          <p className="doc-side__eyebrow">
            <span className="doc-side__mark" aria-hidden="true" />
            {group.title}
          </p>
          <div className="doc-side__nav">
            {group.items.map((item) => {
              if (item.planned) {
                return (
                  <span className="doc-side__link is-planned" aria-disabled="true">
                    <span className="doc-side__label">{item.label}</span>
                  </span>
                );
              }
              return (
                <a
                  className="doc-side__link"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <span className="doc-side__label">{item.label}</span>
                </a>
              );
            })}
          </div>
        </nav>
      ))
    }
  </div>
</aside>
    </>
  );
}
