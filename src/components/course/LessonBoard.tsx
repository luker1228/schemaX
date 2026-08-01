import LessonHero from './LessonHero';
import { useEffect, useRef } from 'react';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined) => {
  if (!value || typeof value !== 'string') return value;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  /* 逻辑根：包住方框 + 框外分页 */\n  .lboard-root {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    gap: 0;\n    outline: none;\n  }\n\n  .lboard-root:focus-visible {\n    outline: 2px solid var(--sx-sys-color-action);\n    outline-offset: 3px;\n  }\n\n  /* 内容方框：1px 黑边 + 2px 圆角（分页器在框外） */\n  .lboard {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    /* 有底高，短页才能在框内垂直居中；过高会显空 */\n    min-height: min(60vh, 36rem);\n    max-height: none;\n    box-sizing: border-box;\n    background: var(--sx-sys-color-bg-page);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-radius: 2px;\n    box-shadow: none;\n    overflow: visible;\n    padding: 1rem 1.25rem 1.25rem;\n  }\n\n  /*\n   * Topbar：元信息层，不抢正文重心\n   * 无硬影 / 无黄底 pill / 无黑底号牌 —— 小字号 + 软色 + 透明底\n   */\n  .lboard__topbar {\n    display: flex;\n    flex-flow: row wrap;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.5rem 0.75rem;\n    flex-shrink: 0;\n    padding: 0 0 0.5rem;\n    margin: 0 0 0.25rem;\n    background: transparent;\n    border-bottom: none;\n    position: relative;\n    z-index: 5;\n  }\n\n  /* 节切换菜单（原生 details，零 React） */\n  .lboard__sec {\n    position: relative;\n    max-width: min(100%, 22rem);\n  }\n\n  .lboard__sec > summary {\n    list-style: none;\n  }\n\n  .lboard__sec > summary::-webkit-details-marker {\n    display: none;\n  }\n\n  .lboard__chip {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.4rem;\n    padding: 0.15rem 0.1rem;\n    background: transparent;\n    border: none;\n    border-radius: 2px;\n    box-shadow: none;\n    cursor: pointer;\n    user-select: none;\n    color: var(--sx-sys-color-text-soft);\n    transition: color 120ms ease;\n  }\n\n  .lboard__chip:hover {\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .lboard__chip:focus-visible {\n    outline: 2px solid var(--sx-sys-color-action);\n    outline-offset: 2px;\n  }\n\n  .lboard__sec[open] .lboard__chip {\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .lboard__sec-chevron {\n    width: 0.75rem;\n    height: 0.75rem;\n    flex-shrink: 0;\n    opacity: 0.55;\n    transition:\n      transform 120ms ease,\n      opacity 120ms ease;\n  }\n\n  .lboard__chip:hover .lboard__sec-chevron,\n  .lboard__sec[open] .lboard__sec-chevron {\n    opacity: 0.9;\n  }\n\n  .lboard__sec[open] .lboard__sec-chevron {\n    transform: rotate(180deg);\n  }\n\n  .lboard__num {\n    display: inline-block;\n    padding: 0;\n    background: transparent;\n    color: inherit;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 600;\n    letter-spacing: 0.04em;\n    border: none;\n    white-space: nowrap;\n    line-height: 1.3;\n    opacity: 0.75;\n  }\n\n  .lboard__sec[open] .lboard__num {\n    opacity: 0.9;\n  }\n\n  .lboard__section {\n    font-family: var(--sx-sys-font-family-body);\n    font-size: var(--sx-sys-font-size-md);\n    font-weight: 500;\n    line-height: 1.3;\n    color: inherit;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    min-width: 0;\n  }\n\n  /* 页码：纯等宽软字，无黄 pill */\n  .lboard__page {\n    display: inline-block;\n    padding: 0;\n    background: transparent;\n    border: none;\n    border-radius: 0;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 600;\n    color: var(--sx-sys-color-text-soft);\n    white-space: nowrap;\n    line-height: 1.3;\n    letter-spacing: 0.03em;\n    opacity: 0.85;\n  }\n\n  .lboard__sec-panel {\n    position: absolute;\n    top: calc(100% + 0.35rem);\n    left: 0;\n    z-index: 20;\n    min-width: min(16rem, 85vw);\n    max-width: min(22rem, 92vw);\n    max-height: min(18rem, 45vh);\n    overflow: auto;\n    padding: 0.4rem;\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-radius: 2px;\n    box-shadow: var(--sx-sys-shadow-sm);\n    scrollbar-width: thin;\n  }\n\n  .lboard__sec-hint {\n    margin: 0;\n    padding: 0.25rem 0.5rem 0.4rem;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  .lboard__sec-list {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n  }\n\n  /* 动态节点：:global */\n  .lboard__sec-list :global(.lboard__sec-item) {\n    margin: 0;\n    padding: 0;\n  }\n\n  .lboard__sec-list :global(.lboard__sec-btn) {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.625rem;\n    width: 100%;\n    margin: 0;\n    padding: 0.5rem 0.6rem;\n    border: var(--sx-sys-border-width) solid transparent;\n    background: transparent;\n    color: var(--sx-sys-color-text-primary);\n    cursor: pointer;\n    font: inherit;\n    text-align: left;\n    box-sizing: border-box;\n  }\n\n  .lboard__sec-list :global(.lboard__sec-btn:hover) {\n    background: var(--sx-sys-color-bg-page);\n    border-color: var(--sx-sys-color-border);\n  }\n\n  .lboard__sec-list :global(.lboard__sec-btn:focus-visible) {\n    outline: 2px solid var(--sx-sys-color-action);\n    outline-offset: 1px;\n  }\n\n  .lboard__sec-list :global(.lboard__sec-btn[data-active='true']) {\n    background: var(--sx-sys-color-accent);\n    border-color: var(--sx-sys-color-border);\n    box-shadow: var(--sx-sys-shadow-sm);\n  }\n\n  .lboard__sec-list :global(.lboard__sec-btn-num) {\n    flex-shrink: 0;\n    min-width: 3.25rem;\n    padding: 0.2rem 0.4rem;\n    background: var(--sx-sys-color-border);\n    color: var(--sx-sys-color-accent);\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    letter-spacing: 0.04em;\n    text-align: center;\n    line-height: 1.3;\n  }\n\n  .lboard__sec-list :global(.lboard__sec-btn[data-active='true'] .lboard__sec-btn-num) {\n    background: var(--sx-sys-color-border);\n  }\n\n  .lboard__sec-list :global(.lboard__sec-btn-label) {\n    flex: 1 1 auto;\n    min-width: 0;\n    font-family: var(--sx-sys-font-family-display);\n    font-size: var(--sx-sys-font-size-base);\n    font-weight: 700;\n    line-height: 1.25;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .lboard__sec-list :global(.lboard__sec-btn-page) {\n    flex-shrink: 0;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    color: var(--sx-sys-color-text-soft);\n    opacity: 0.85;\n  }\n\n  /* —— Stage：吃满方框剩余高度，便于短页垂直居中 —— */\n  .lboard__stage {\n    flex: 1 1 auto;\n    min-height: 0;\n    overflow: visible;\n    display: flex;\n    flex-direction: column;\n    padding: 0.5rem 0 0.75rem;\n    box-sizing: border-box;\n  }\n\n  /* 封面 / 步骤：非 active 隐藏（JS 也会设 hidden） */\n  .lboard-root :global([data-lboard-slide]:not([data-active='true'])) {\n    display: none !important;\n  }\n\n  /*\n   * 活跃页：在舞台内垂直居中（短页）；内容过长时方框随内容长高。\n   * 横向宽度仍由 aside / stack / rail 决定。\n   */\n  .lboard-root :global([data-lboard-slide][data-active='true']) {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    width: 100%;\n    max-width: min(72rem, 100%);\n    margin-inline: auto;\n    flex: 1 1 auto;\n    justify-content: center;\n    min-height: 100%;\n    box-sizing: border-box;\n    padding-block: 0.5rem;\n  }\n\n  /* 纯文页（无 StepSplit / 对照 / 交互 / 表格 / reference）：收 measure + 水平居中。\n   * 表格(.doc-props/.doc-table-scroll) 与 reference 变体需要宽度，排除以免被挤窄。 */\n  .lboard-root\n    :global(\n      [data-lboard-slide][data-active='true']:not(.step--reference, :has(\n            .step-split,\n            .cmp,\n            .layer-pair,\n            .props-pair,\n            .doc-playground,\n            .shop-nerve,\n            .doc-props,\n            .doc-table-scroll\n          ))) {\n    max-width: min(40rem, 100%);\n    margin-inline: auto;\n  }\n\n  /* 旁注小图页 */\n  .lboard-root\n    :global(\n      [data-lboard-slide][data-active='true']:has(.step-split--aside):not(\n          :has(.cmp, .layer-pair, .props-pair, .doc-playground)\n        )\n    ) {\n    max-width: min(56rem, 100%);\n  }\n\n  /* 对照 / 宽舞台：尽量吃满 */\n  .lboard-root\n    :global(\n      [data-lboard-slide][data-active='true']:has(\n          .step-split--stack,\n          .step-split--fill,\n          .step-split--rail,\n          .cmp,\n          .layer-pair,\n          .props-pair,\n          .doc-playground\n        )\n    ) {\n    max-width: min(72rem, 100%);\n  }\n\n  .lboard-root\n    :global([data-lboard-slide].lboard__slide--cover[data-active='true']) {\n    justify-content: center;\n    min-height: 100%;\n    max-width: min(52rem, 100%);\n    padding-block: 0;\n  }\n\n  /* 白板模式：StepCard 顶栏交给 board topbar，隐藏 step__head */\n  .lboard-root :global(.step__head) {\n    display: none;\n  }\n\n  .lboard-root :global(.step__body) {\n    display: flex;\n    flex-direction: column;\n    gap: 1.125rem;\n    width: 100%;\n    min-width: 0;\n  }\n\n  /* 纯文块：跟 slide 同宽（slide 已限 40rem） */\n  .lboard-root :global(.step__body > .sec-head),\n  .lboard-root :global(.step__body > .doc-note),\n  .lboard-root :global(.step__body > .doc-code),\n  .lboard-root :global(.step__body > p) {\n    max-width: 100%;\n  }\n\n  .lboard-root :global(.step__body > .cmp),\n  .lboard-root :global(.step__body > .layer-pair),\n  .lboard-root :global(.step__body > .props-pair),\n  .lboard-root :global(.step__body > .doc-playground),\n  .lboard-root :global(.step__body > .step-split) {\n    max-width: none;\n    width: 100%;\n  }\n\n  /* 封面页：Hero 居中、去掉底部分隔（板内已独立） */\n  .lboard__slide--cover {\n    align-items: center;\n  }\n\n  .lboard__slide--cover :global(.lhero) {\n    border-bottom: none;\n    width: 100%;\n    max-width: 52rem;\n    margin: 0;\n    padding: clamp(2rem, 6vw, 4.5rem) clamp(1rem, 4vw, 4rem)\n      clamp(1.5rem, 4vw, 3rem);\n    justify-content: center;\n    align-items: center;\n    gap: 1.75rem 2rem;\n  }\n\n  .lboard__slide--cover :global(.lhero__title) {\n    flex: 1 1 auto;\n    max-width: none;\n  }\n\n  .lboard__slide--cover :global(.lhero__meta) {\n    align-items: center;\n  }\n\n  .lboard__slide--cover :global(.lhero__pills) {\n    align-items: center;\n  }\n\n  .lboard__body {\n    display: contents;\n  }\n\n  /*\n   * Pager：在 .lboard 方框外、下方居中\n   * 无白底硬边框硬影；软色小字 + 细圆点\n   */\n  .lboard__pager {\n    position: relative;\n    z-index: 2;\n    display: flex;\n    flex-flow: row nowrap;\n    align-items: center;\n    justify-content: center;\n    gap: 0.75rem 1.25rem;\n    width: fit-content;\n    max-width: 100%;\n    margin: 1rem auto 0;\n    padding: 0.35rem 0;\n    box-sizing: border-box;\n    background: transparent;\n    border: none;\n    border-radius: 0;\n    box-shadow: none;\n    overflow: visible;\n  }\n\n  .lboard__nav {\n    display: inline-flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.4rem;\n    flex: 0 1 auto;\n    min-width: 0;\n    padding: 0.2rem 0.15rem;\n    margin: 0;\n    border: none;\n    background: transparent;\n    color: var(--sx-sys-color-text-soft);\n    cursor: pointer;\n    font: inherit;\n    transition: color 120ms ease;\n  }\n\n  .lboard__nav:disabled {\n    cursor: default;\n    opacity: 0.4;\n  }\n\n  .lboard__nav:focus-visible {\n    outline: 2px solid var(--sx-sys-color-action);\n    outline-offset: 2px;\n  }\n\n  .lboard__nav:not(:disabled):hover {\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .lboard__nav--prev {\n    justify-content: flex-start;\n    border-right: none;\n  }\n\n  .lboard__nav--next {\n    justify-content: flex-end;\n    border-left: none;\n  }\n\n  .lboard__nav-pair {\n    display: inline-flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.35rem;\n    min-width: 0;\n  }\n\n  .lboard__nav-text {\n    display: flex;\n    flex-direction: column;\n    gap: 0;\n    align-items: flex-start;\n    min-width: 0;\n  }\n\n  .lboard__nav-text--end {\n    align-items: flex-end;\n  }\n\n  .lboard__nav-eyebrow {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 600;\n    color: inherit;\n    line-height: 1.2;\n    opacity: 0.75;\n  }\n\n  .lboard__nav-title {\n    font-family: var(--sx-sys-font-family-body);\n    font-size: var(--sx-sys-font-size-md);\n    font-weight: 500;\n    line-height: 1.25;\n    color: inherit;\n    max-width: 6.5rem;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .lboard__nav-end {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 600;\n    color: var(--sx-sys-color-text-soft);\n    white-space: nowrap;\n    opacity: 0.7;\n  }\n\n  .lboard__arrow {\n    width: 0.95rem;\n    height: 0.95rem;\n    flex-shrink: 0;\n    opacity: 0.7;\n  }\n\n  .lboard__nav:not(:disabled):hover .lboard__arrow {\n    opacity: 1;\n  }\n\n  .lboard__pager-center {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    flex: 0 1 auto;\n    min-width: 0;\n    max-width: 12rem;\n    padding: 0.15rem 0.25rem;\n    box-sizing: border-box;\n  }\n\n  .lboard__dots {\n    display: flex;\n    flex-flow: row wrap;\n    align-items: center;\n    justify-content: center;\n    gap: 0.3rem;\n    max-width: 11rem;\n    max-height: 2rem;\n    overflow: auto;\n    padding: 0;\n    scrollbar-width: thin;\n  }\n\n  /* 圆点：更小、默认空心感，当前页才略实 */\n  .lboard__dots :global(.lboard__dot) {\n    width: 6px;\n    height: 6px;\n    padding: 0;\n    margin: 0;\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    background: transparent;\n    cursor: pointer;\n    border-radius: 0;\n    flex-shrink: 0;\n    opacity: 0.55;\n    transition:\n      width 120ms ease,\n      height 120ms ease,\n      background-color 120ms ease,\n      opacity 120ms ease;\n  }\n\n  .lboard__dots :global(.lboard__dot:hover) {\n    opacity: 0.9;\n  }\n\n  .lboard__dots :global(.lboard__dot[data-active='true']) {\n    width: 8px;\n    height: 8px;\n    background: var(--sx-sys-color-border);\n    opacity: 1;\n  }\n\n  .lboard__dots :global(.lboard__dot:focus-visible) {\n    outline: 2px solid var(--sx-sys-color-action);\n    outline-offset: 2px;\n  }\n\n   @media (max-width: 45rem) {\n    .lboard {\n      min-height: min(52vh, 28rem);\n      max-height: none;\n      padding: 0.75rem 0.85rem 1rem;\n    }\n\n    .lboard__topbar {\n      padding: 0.15rem 0 0.65rem;\n    }\n\n    .lboard__sec {\n      max-width: calc(100% - 4.5rem);\n      min-width: 0;\n    }\n\n    .lboard__chip {\n      max-width: 100%;\n      min-width: 0;\n    }\n\n    .lboard__section {\n      white-space: nowrap;\n    }\n\n    .lboard__sec-panel {\n      left: 0;\n      right: auto;\n    }\n\n    .lboard__stage {\n      padding: 0.25rem 0 1rem;\n    }\n\n    .lboard__pager {\n      width: 100%;\n      max-width: 100%;\n      gap: 0.5rem;\n      margin-top: 1.25rem;\n    }\n\n    .lboard__pager-center {\n      min-width: 0;\n      max-width: 40%;\n      padding: 0.1rem;\n    }\n\n    .lboard__nav {\n      padding: 0.15rem;\n    }\n\n    .lboard__nav-title {\n      max-width: 4rem;\n    }\n\n    .lboard__nav-eyebrow {\n      display: none;\n    }\n\n    .lboard__dots {\n      max-width: 100%;\n      max-height: 1.5rem;\n    }\n\n    .lboard__slide--cover :global(.lhero) {\n      flex-direction: column;\n      align-items: flex-start;\n      padding: 1.5rem 0;\n    }\n\n    .lboard__slide--cover :global(.lhero__meta),\n    .lboard__slide--cover :global(.lhero__pills) {\n      align-items: flex-start;\n    }\n  }\n\n  /* ============================================================\n   * Stepper 模式（[data-mode='stepper']）\n   * 页面滚 + sticky chrome：概念单元该多高就多高，超出视口由页面滚动；\n   * topbar 顶吸、pager 底吸，进度常驻。board 模式不命中以下任何规则。\n   * ============================================================ */\n\n  /* Stage：不再吃满剩余高度，随内容长；给短单元一个底，pager 不至于贴 topbar */\n  .lboard-root[data-mode='stepper'] .lboard__stage {\n    flex: 0 0 auto;\n    min-height: min(50vh, 30rem);\n  }\n\n  /* 活跃概念页：撤掉一屏约束，顶对齐（board 是 center + min-height:100%）。\n   * 排除封面（封面仍居中）。max-width 的 :has() 自适应规则继续生效。 */\n  .lboard-root[data-mode='stepper']\n    :global(\n      [data-lboard-slide][data-active='true']:not(.lboard__slide--cover)\n    ) {\n    justify-content: flex-start;\n    min-height: 0;\n    flex: 0 0 auto;\n    padding-block: 0.5rem;\n  }\n\n  /* Topbar 顶吸（app-frame 感）；bg-page 与 .lboard 同色，content 滚过时不透。\n   * 顶吸基线复用 DocSide 同一 token（吸在 site Header 之下） */\n  .lboard-root[data-mode='stepper'] .lboard__topbar {\n    position: sticky;\n    top: var(--sx-doc-side-top, 6.05rem);\n    background: var(--sx-sys-color-bg-page);\n    padding-block: 0.4rem 0.5rem;\n    margin-block: 0 0.5rem;\n    z-index: 5;\n  }\n\n  /* Pager 底吸：长单元滚动时「下一概念」常驻视野 */\n  .lboard-root[data-mode='stepper'] .lboard__pager {\n    position: sticky;\n    bottom: 0;\n    background: var(--sx-sys-color-bg-page);\n    margin-top: 0.75rem;\n    padding-block: 0.5rem 0.4rem;\n    z-index: 5;\n  }\n\n  /* 窄屏：pager 退成顶吸在 topbar 下，避免键盘弹起遮挡；stage 让出空间 */\n   @media (max-width: 45rem) {\n    .lboard-root[data-mode='stepper'] .lboard__pager {\n      position: sticky;\n      bottom: auto;\n      top: calc(var(--sx-doc-side-top, 6.05rem) + 2.2rem);\n      margin-top: 0.5rem;\n    }\n\n    .lboard-root[data-mode='stepper'] .lboard__stage {\n      padding-block-start: 2.5rem;\n    }\n  }\n";
export default function LessonBoard(props: ReactProps) {
// LessonBoard —— 课时白板（presentation: board）
// 结构：.lboard-root（逻辑根）
//   · .lboard（有边框的内容方框：topbar + stage）
//   · .lboard__pager（方框外、下方居中）
// 末页 next → 下一章（若有）。


interface Cover {
  line1: string;
  line2?: string;
  badge?: string;
  pillFill?: string;
  pillOutline?: string;
}

interface ChapterLink {
  title: string;
  href: string;
}

interface Props {
  /** 封面 Hero；有值时作为第 1 页 */
  cover?: Cover;
  /** 封面顶栏标签，默认「封面 · 开篇」 */
  coverLabel?: string;
  /** 阅读时长（仅封面展示） */
  readTime?: string;
  /** 本课最后一页后的下一章 */
  nextChapter?: ChapterLink | null;
  /**
   * 渲染模式：
   * - board（默认）：一屏约束 + 垂直居中（老行为）
   * - stepper：概念单元内可滚动 + sticky chrome + 切单元滚到顶（Khan / Codecademy 风）
   */
  mode?: 'board' | 'stepper';
}

const {
  cover,
  coverLabel = '封面 · 开篇',
  readTime,
  nextChapter = null,
  mode = 'board',
} = props;
const hasCover = Boolean(cover);
const { children } = props;
const rootRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const root = rootRef.current;
  if (!root) return;

  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-lboard-slide]')).map((el) => ({
    el,
    num: el.dataset.num ?? '',
    label: el.dataset.label ?? '',
    id: el.id || el.dataset.num?.toLowerCase() || '',
  }));
  if (!slides.length) return;

  const query = <T extends HTMLElement>(selector: string) => root.querySelector<T>(selector);
  const numEl = query<HTMLElement>('[data-lboard-num]');
  const sectionEl = query<HTMLElement>('[data-lboard-section]');
  const pageEl = query<HTMLElement>('[data-lboard-page]');
  const dotsEl = query<HTMLElement>('[data-lboard-dots]');
  const secMenu = query<HTMLDetailsElement>('[data-lboard-sec]');
  const secList = query<HTMLElement>('[data-lboard-sec-list]');
  const prevBtn = query<HTMLButtonElement>('[data-lboard-prev]');
  const nextBtn = query<HTMLButtonElement>('[data-lboard-next]');
  const prevEnd = query<HTMLElement>('[data-lboard-prev-end]');
  const prevPair = query<HTMLElement>('[data-lboard-prev-pair]');
  const prevTitle = query<HTMLElement>('[data-lboard-prev-title]');
  const nextEnd = query<HTMLElement>('[data-lboard-next-end]');
  const nextPair = query<HTMLElement>('[data-lboard-next-pair]');
  const nextTitle = query<HTMLElement>('[data-lboard-next-title]');
  const nextEyebrow = query<HTMLElement>('[data-lboard-next-eyebrow]');
  const chapterHref = nextChapter?.href?.trim() ?? '';
  const chapterTitle = nextChapter?.title?.trim() ?? '';
  let index = 0;

  const go = (next: number, options: { pushHash?: boolean; scroll?: boolean } = {}) => {
    index = Math.max(0, Math.min(slides.length - 1, next));
    const current = slides[index];
    if (!current) return;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.el.dataset.active = active ? 'true' : 'false';
      slide.el.hidden = !active;
      slide.el.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    if (numEl) numEl.textContent = current.num || '—';
    if (sectionEl) sectionEl.textContent = current.label;
    if (pageEl) pageEl.textContent = `${index + 1} / ${slides.length}`;
    dotsEl?.querySelectorAll<HTMLElement>('[data-lboard-dot]').forEach((dot) => {
      const active = Number(dot.dataset.lboardDot) === index;
      dot.dataset.active = active ? 'true' : 'false';
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
      dot.tabIndex = active ? 0 : -1;
    });
    secList?.querySelectorAll<HTMLElement>('[data-lboard-sec-idx]').forEach((button) => {
      const active = Number(button.dataset.lboardSecIdx) === index;
      button.dataset.active = active ? 'true' : 'false';
      button.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    const atStart = index === 0;
    const atEnd = index === slides.length - 1;
    if (prevBtn) prevBtn.disabled = atStart;
    if (prevEnd) prevEnd.hidden = !atStart;
    if (prevPair) prevPair.hidden = atStart;
    if (!atStart && prevTitle) prevTitle.textContent = slides[index - 1]?.label ?? '';
    const chapterMode = atEnd && Boolean(chapterHref);
    if (nextBtn) {
      nextBtn.disabled = atEnd && !chapterMode;
      nextBtn.dataset.mode = chapterMode ? 'chapter' : 'section';
    }
    if (nextEnd) nextEnd.hidden = !(atEnd && !chapterMode);
    if (nextPair) nextPair.hidden = atEnd && !chapterMode;
    if (nextEyebrow) nextEyebrow.textContent = chapterMode ? '下一章' : '下一节';
    if (nextTitle) nextTitle.textContent = chapterMode ? chapterTitle : (atEnd ? '' : slides[index + 1]?.label ?? '');
    if (options.pushHash !== false && current.id) {
      const url = new URL(window.location.href);
      url.hash = current.id;
      history.replaceState(null, '', url);
    }
    if (mode === 'stepper' && options.scroll !== false) {
      requestAnimationFrame(() => current.el.scrollIntoView({ block: 'start', behavior: 'auto' }));
    }
  };

  if (dotsEl) {
    dotsEl.replaceChildren(...slides.map((slide, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'lboard__dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `第 ${i + 1} 页 · ${slide.label}`);
      dot.dataset.lboardDot = String(i);
      dot.addEventListener('click', () => go(i));
      return dot;
    }));
  }
  if (secList) {
    secList.replaceChildren(...slides.map((slide, i) => {
      const li = document.createElement('li');
      li.className = 'lboard__sec-item';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'lboard__sec-btn';
      button.dataset.lboardSecIdx = String(i);
      button.setAttribute('role', 'option');
      button.innerHTML = '<span class="lboard__sec-btn-num"></span><span class="lboard__sec-btn-label"></span><span class="lboard__sec-btn-page"></span>';
      (button.querySelector('.lboard__sec-btn-num') as HTMLElement).textContent = slide.num || String(i + 1);
      (button.querySelector('.lboard__sec-btn-label') as HTMLElement).textContent = slide.label || `第 ${i + 1} 页`;
      (button.querySelector('.lboard__sec-btn-page') as HTMLElement).textContent = String(i + 1);
      button.addEventListener('click', () => { go(i); if (secMenu) secMenu.open = false; });
      li.appendChild(button);
      return li;
    }));
  }
  const onDocumentClick = (event: MouseEvent) => {
    if (secMenu?.open && event.target instanceof Node && !secMenu.contains(event.target)) secMenu.open = false;
  };
  const next = () => {
    if (index >= slides.length - 1 && chapterHref) window.location.href = chapterHref;
    else go(index + 1);
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && secMenu?.open) { secMenu.open = false; return; }
    const target = event.target as HTMLElement | null;
    if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); next(); }
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); go(index - 1); }
    if (event.key === 'Home') { event.preventDefault(); go(0); }
    if (event.key === 'End') { event.preventDefault(); go(slides.length - 1); }
  };
  prevBtn?.addEventListener('click', () => go(index - 1));
  nextBtn?.addEventListener('click', next);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onKey);
  root.dataset.ready = 'true';
  root.tabIndex = 0;
  const hash = window.location.hash.replace(/^#/, '');
  const start = hash ? Math.max(0, slides.findIndex((slide) => slide.id === hash)) : 0;
  go(start, { pushHash: Boolean(hash), scroll: Boolean(hash) });
  return () => {
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onKey);
  };
}, [mode, nextChapter]);
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<div
  ref={rootRef}
  className="lboard-root"
  data-lboard
  data-mode={mode}
  data-has-cover={hasCover ? 'true' : 'false'}
  data-next-chapter-href={nextChapter?.href ?? ''}
  data-next-chapter-title={nextChapter?.title ?? ''}
>
  <div className="lboard">
    <header className="lboard__topbar">
      {/* 节切换：点 chip 展开目录，选中即跳转 */}
      <details className="lboard__sec" data-lboard-sec>
        <summary className="lboard__chip" data-lboard-sec-trigger>
          <span className="lboard__num" data-lboard-num aria-hidden="true">
            {hasCover ? 'START' : '—'}
          </span>
          <span className="lboard__section" data-lboard-section>
            {hasCover ? coverLabel : '…'}
          </span>
          <svg
            className="lboard__sec-chevron"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></path>
          </svg>
        </summary>
        <div className="lboard__sec-panel" role="listbox" aria-label="本课章节">
          <p className="lboard__sec-hint">跳转到</p>
          <ul className="lboard__sec-list" data-lboard-sec-list></ul>
        </div>
      </details>
      <span className="lboard__page" data-lboard-page aria-live="polite">1 / 1</span>
    </header>

    <div className="lboard__stage" data-lboard-stage>
      {
        cover ? (
          <section
            className="lboard__slide lboard__slide--cover"
            data-lboard-slide
            data-num="START"
            data-label={coverLabel}
            data-active="true"
            id="cover"
          >
            <LessonHero
              line1={cover.line1}
              line2={cover.line2}
              badge={cover.badge}
              pillFill={cover.pillFill}
              pillOutline={cover.pillOutline}
              readTime={readTime}
            />
          </section>
        ) : null
      }
      <div className="lboard__body" data-lboard-body data-pagefind-body>
        {children}
      </div>
    </div>
  </div>

  {/* 分页器在内容方框外 */}
  <nav className="lboard__pager" aria-label="章节导航" data-lboard-pager>
    <button
      type="button"
      className="lboard__nav lboard__nav--prev"
      data-lboard-prev
      disabled
    >
      <span className="lboard__nav-end" data-lboard-prev-end>已是第一页</span>
      <span className="lboard__nav-pair" data-lboard-prev-pair hidden>
        <svg
          className="lboard__arrow"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M19 12H5m6-6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
        </svg>
        <span className="lboard__nav-text">
          <span className="lboard__nav-eyebrow">上一节</span>
          <span className="lboard__nav-title" data-lboard-prev-title></span>
        </span>
      </span>
    </button>

    <div className="lboard__pager-center">
      <div
        className="lboard__dots"
        data-lboard-dots
        role="tablist"
        aria-label="页码"
      >
      </div>
    </div>

    <button type="button" className="lboard__nav lboard__nav--next" data-lboard-next>
      <span className="lboard__nav-pair" data-lboard-next-pair>
        <span className="lboard__nav-text lboard__nav-text--end">
          <span className="lboard__nav-eyebrow" data-lboard-next-eyebrow>下一节</span>
          <span className="lboard__nav-title" data-lboard-next-title></span>
        </span>
        <svg
          className="lboard__arrow"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 12h14m-6-6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
        </svg>
      </span>
      <span className="lboard__nav-end" data-lboard-next-end hidden>已是最后一页</span>
    </button>
  </nav>
</div>
    </>
  );
}
