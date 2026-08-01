
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  /* ── 容器：左右等宽 + 中间箭头（设计稿 gap 20px） ── */\n  .cmp {\n    display: flex;\n    flex-direction: row;\n    align-items: stretch;\n    gap: 1.25rem;\n    width: 100%;\n    max-width: 100%;\n  }\n\n  /* ── 窗口：米色底 + 1px 黑边；完整 reset 防 .sx-article figure 渗入 ── */\n  .win {\n    flex: 1 1 0;\n    min-width: 0;\n    margin: 0;\n    padding: 0;\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-radius: 0;\n    box-shadow: none;\n    background: var(--sx-sys-color-beige);\n    overflow: hidden;\n    display: flex;\n    flex-direction: column;\n  }\n\n  /* ── 标题栏：颜色完全由根节点 CSS 变量控制 ── */\n  .win__bar {\n    display: flex;\n    align-items: center;\n    gap: 0.55rem;\n    margin: 0;\n    padding: 0.5rem 0.75rem;\n    border: none;\n    border-bottom: var(--sx-cmp-bar-border-bottom);\n    background: var(--sx-cmp-bar-bg);\n    text-align: left;\n    opacity: 1;\n    font-size: inherit;\n    line-height: 1;\n  }\n  .win__dots {\n    display: inline-flex;\n    gap: 0.3rem;\n    flex-shrink: 0;\n  }\n  .win__dot {\n    display: inline-block;\n    width: 0.5rem;\n    height: 0.5rem;\n    border-radius: 50%;\n    box-sizing: border-box;\n    border: var(--sx-cmp-dot-border);\n  }\n  .win__dot--red {\n    background: var(--sx-sys-color-danger);\n  }\n  .win__dot--yellow {\n    background: var(--sx-sys-color-accent);\n  }\n  .win__dot--green {\n    background: var(--sx-sys-color-success);\n  }\n  .win__file {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    white-space: nowrap;\n    color: var(--sx-cmp-bar-fg);\n    opacity: var(--sx-cmp-bar-fg-opacity);\n  }\n\n  /* ── 代码区：米色延续，等宽；两侧样式完全一致 ── */\n  .win__code {\n    margin: 0;\n    padding: 0.875rem;\n    flex: 1 1 auto;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-md);\n    line-height: 1.7;\n    background: transparent;\n    color: var(--sx-sys-color-text-primary);\n    overflow-x: auto;\n    white-space: pre;\n    border: none;\n    border-radius: 0;\n    box-shadow: none;\n  }\n  .win__code code {\n    font-family: inherit;\n    font-size: inherit;\n    background: transparent;\n    border: none;\n    box-shadow: none;\n    padding: 0;\n    color: inherit;\n  }\n\n  /* ── 中间箭头：黑底黄 chevron 徽章 ── */\n  .cmp__arrow {\n    flex: 0 0 auto;\n    width: 2.75rem;\n    aspect-ratio: 1;\n    align-self: center;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: var(--sx-sys-color-border);\n    border: 6px solid var(--sx-sys-color-border);\n    color: var(--sx-sys-color-accent);\n    box-sizing: border-box;\n  }\n  .cmp__arrow svg {\n    width: 1.5rem;\n    height: 1.5rem;\n    display: block;\n  }\n\n  /* ── 窄屏：上下堆叠，箭头旋转 90° ── */\n   @media (max-width: 36rem) {\n    .cmp {\n      flex-direction: column;\n    }\n    .cmp__arrow {\n      transform: rotate(90deg);\n      width: 2.5rem;\n      border-width: 5px;\n    }\n  }\n";
export default function CodeCompare(props: ReactProps) {
// CodeCompare 组件 —— SchemaX UI
// 代码转换对比展示块：左侧「源」窗口 + 中间双箭头徽章 + 右侧「目标」窗口。
// 用于教程/文档中展示从一种格式转换为另一种格式的过程（如 Markdown → HTML）。
//
// 两个窗口同构：顶栏（红黄绿点 + 文件名）+ 米色代码区。
// 顶栏主题由 bar 控制（CSS 变量驱动，避免 scoped 后代选择器失效）：
//   dark  —— 黑顶栏 + 白字（默认，课程主视觉）
//   light —— 米色顶栏 + 墨字
// 代码内容可通过 props（source / target）或命名 slot 传入；slot 优先。
//
// 设计语言：1px 黑边、米色窗体、黑色箭头徽章 + 黄色双 chevron。
// 注意：本组件使用 figure/figcaption/pre，必须在样式中完整 reset，
// 避免 .sx-article 的正文 figure 规则渗入（padding / 阴影 / 居中等）。

type CodeCompareBar = 'dark' | 'light';

interface Props {
  /** 左侧窗口标题（源文件名） */
  from?: string;
  /** 右侧窗口标题（目标文件名） */
  to?: string;
  /** 左侧源代码内容（字符串）。若同时传入 source 命名 slot，则 slot 优先 */
  source?: string;
  /** 右侧目标代码内容（字符串）。若同时传入 target 命名 slot，则 slot 优先 */
  target?: string;
  /** 顶栏主题：dark = 黑底白字（默认）；light = 米色底墨字 */
  bar?: CodeCompareBar;
}

const { from = 'INPUT', to = 'OUTPUT', source, target, bar = 'dark' } = props;

// 顶栏色板：在根节点设 CSS 变量，子元素直接消费，不依赖 .cmp--bar-* 后代选择器。
// light：米色底 + 墨字（与代码区同色系，底部分隔线区分顶栏）
// dark：黑底白字
const barVars =
  bar === 'light'
    ? {
        '--sx-cmp-bar-bg': 'var(--sx-sys-color-beige)',
        '--sx-cmp-bar-fg': 'var(--sx-sys-color-text-primary)',
        '--sx-cmp-bar-fg-opacity': '0.75',
        '--sx-cmp-bar-border-bottom':
          'var(--sx-sys-border-width) solid var(--sx-sys-color-border)',
        '--sx-cmp-dot-border': 'var(--sx-sys-border-width) solid var(--sx-sys-color-border)',
      }
    : {
        '--sx-cmp-bar-bg': 'var(--sx-sys-color-border)',
        '--sx-cmp-bar-fg': 'var(--sx-sys-color-bg-surface)',
        '--sx-cmp-bar-fg-opacity': '1',
        '--sx-cmp-bar-border-bottom': 'none',
        '--sx-cmp-dot-border': 'none',
      };
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<div className={['cmp', `cmp--bar-${bar}`].join(' ')} style={barVars as CSSProperties}>
  <figure className="win">
    <figcaption className="win__bar">
      <span className="win__dots" aria-hidden="true">
        <span className="win__dot win__dot--red"></span>
        <span className="win__dot win__dot--yellow"></span>
        <span className="win__dot win__dot--green"></span>
      </span>
      <span className="win__file">{from}</span>
    </figcaption>
    <pre className="win__code"><code>{source}</code></pre>
  </figure>

  <div className="cmp__arrow" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>

  <figure className="win">
    <figcaption className="win__bar">
      <span className="win__dots" aria-hidden="true">
        <span className="win__dot win__dot--red"></span>
        <span className="win__dot win__dot--yellow"></span>
        <span className="win__dot win__dot--green"></span>
      </span>
      <span className="win__file">{to}</span>
    </figcaption>
    <pre className="win__code"><code>{target}</code></pre>
  </figure>
</div>
    </>
  );
}
