
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .layer-pair {\n    --sx-lp-row-pad-y: 0.4rem;\n    --sx-lp-indent: 1rem;\n    --sx-lp-gap: 1rem;\n    /* 选中 / 悬停联动：橙红（danger），不用 accent 黄 */\n    --sx-lp-select: var(--sx-sys-color-danger);\n\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-lp-gap);\n    width: 100%;\n    /* 外层不再包一整块：双栏各自成卡 */\n    border: none;\n    background: transparent;\n    box-shadow: none;\n  }\n\n  .layer-pair__panels {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n    align-items: stretch;\n    gap: var(--sx-lp-gap);\n    min-width: 0;\n  }\n\n  /* ── 共用顶栏：等高、同墨底 ── */\n  .layer-pair__panel-bar {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    min-height: 2.25rem;\n    padding: 0.5rem 0.875rem;\n    box-sizing: border-box;\n    background: var(--sx-sys-color-border);\n    border-bottom: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n  .layer-pair__panel-label {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-accent);\n  }\n  .layer-pair__fname {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    letter-spacing: 0.04em;\n    color: var(--sx-sys-color-bg-surface);\n  }\n  .layer-pair__lang {\n    margin-left: auto;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-accent);\n    opacity: 0.9;\n  }\n\n  /* ── 左：图层面板（独立卡） ── */\n  .layer-pair__figma {\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    background: var(--sx-sys-color-bg-surface);\n    box-shadow: none;\n    overflow: hidden;\n  }\n  .layer-pair__layers {\n    display: flex;\n    flex-direction: column;\n    flex: 1 1 auto;\n    gap: 0.125rem;\n    padding: 0.625rem 0.5rem 0.75rem;\n  }\n  .layer-pair__layer {\n    display: flex;\n    align-items: center;\n    gap: 0.35rem;\n    padding: var(--sx-lp-row-pad-y) 0.45rem;\n    padding-left: calc(0.45rem + var(--sx-layer-depth, 0) * var(--sx-lp-indent));\n    border-radius: 2px;\n    font-family: var(--sx-sys-font-family-body);\n    font-size: var(--sx-sys-font-size-md);\n    font-weight: 500;\n    line-height: 1.25;\n    color: var(--sx-sys-color-text-primary);\n    cursor: default;\n    transition: background 0.12s ease;\n  }\n  .layer-pair__caret {\n    flex-shrink: 0;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 0.75rem;\n    height: 0.75rem;\n    color: var(--sx-sys-color-text-muted);\n  }\n  .layer-pair__caret-svg {\n    display: block;\n    width: 8px;\n    height: 8px;\n  }\n  .layer-pair__ic {\n    flex-shrink: 0;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 1rem;\n    height: 1rem;\n    color: var(--sx-sys-color-text-muted);\n  }\n  .layer-pair__layer--d1 .layer-pair__ic,\n  .layer-pair__layer--d2 .layer-pair__ic {\n    color: var(--sx-sys-color-text-soft);\n  }\n  .layer-pair__svg {\n    display: block;\n    width: 14px;\n    height: 14px;\n  }\n  .layer-pair__name {\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  /* ── 右：代码（独立卡）—— 纯白底 ── */\n  .layer-pair__code {\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    background: var(--sx-sys-color-bg-surface);\n    box-shadow: none;\n    overflow: hidden;\n  }\n  .layer-pair__dots {\n    display: inline-flex;\n    gap: 0.3rem;\n    flex-shrink: 0;\n  }\n  .layer-pair__dot {\n    display: inline-block;\n    width: 0.5rem;\n    height: 0.5rem;\n    border-radius: 50%;\n  }\n  .layer-pair__dot--red {\n    background: var(--sx-sys-color-danger);\n  }\n  .layer-pair__dot--yellow {\n    background: var(--sx-sys-color-accent);\n  }\n  .layer-pair__dot--green {\n    background: var(--sx-sys-color-success);\n  }\n  .layer-pair__pre {\n    margin: 0;\n    padding: 0.75rem 0.5rem 0.875rem;\n    flex: 1 1 auto;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-md);\n    line-height: 1.7;\n    color: var(--sx-sys-color-text-primary);\n    overflow-x: auto;\n    /* normal：折叠 map 行间空白节点；缩进靠 --sx-code-depth */\n    white-space: normal;\n    border: none;\n    background: transparent;\n  }\n  .layer-pair__pre:focus {\n    outline: none;\n  }\n  .layer-pair__pre:focus-visible {\n    box-shadow: inset 0 0 0 2px var(--sx-sys-color-action-primary);\n  }\n  .layer-pair__cline {\n    display: block;\n    padding: 0.08rem 0.4rem;\n    padding-left: calc(0.4rem + var(--sx-code-depth, 0) * 1.1rem);\n    margin: 0;\n    border-radius: 2px;\n    transition: background 0.12s ease;\n  }\n  .layer-pair__ctag {\n    color: var(--sx-sys-color-action-primary);\n    font-weight: 700;\n  }\n  .layer-pair__cattr {\n    color: var(--sx-sys-color-text-soft);\n    font-weight: 600;\n  }\n  .layer-pair__cstr {\n    color: var(--sx-sys-color-success);\n    font-weight: 600;\n  }\n\n  /* ── 左右联动 ── */\n  .layer-pair:has([data-key='card']:hover) [data-key='card'],\n  .layer-pair:has([data-key='header']:hover) [data-key='header'],\n  .layer-pair:has([data-key='title']:hover) [data-key='title'],\n  .layer-pair:has([data-key='desc']:hover) [data-key='desc'],\n  .layer-pair:has([data-key='btn']:hover) [data-key='btn'] {\n    background: color-mix(in srgb, var(--sx-lp-select) 42%, transparent);\n  }\n\n  /* ── 底注：与上方面板同宽拆成两卡 ── */\n  .layer-pair__caption {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: var(--sx-lp-gap);\n    background: transparent;\n  }\n  .layer-pair__cap {\n    padding: 1rem 1.125rem 1.125rem;\n    min-width: 0;\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    background: var(--sx-sys-color-bg-page);\n    box-shadow: none;\n  }\n  .layer-pair__cap-k {\n    display: flex;\n    align-items: center;\n    gap: 0.4rem;\n    margin-bottom: 0.45rem;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    letter-spacing: 0.05em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-text-primary);\n  }\n  .layer-pair__cap-mark {\n    display: inline-block;\n    width: 0.5rem;\n    height: 0.5rem;\n    flex-shrink: 0;\n    background: var(--sx-sys-color-accent);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n  .layer-pair__cap p {\n    margin: 0;\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.55;\n    color: var(--sx-sys-color-text-soft);\n  }\n  .layer-pair__cap strong {\n    color: var(--sx-sys-color-text-primary);\n    font-weight: 700;\n  }\n  .layer-pair__cap :global(code) {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: 0.8125em;\n    font-weight: 700;\n    padding: 0.05em 0.3em;\n    color: var(--sx-sys-color-text-primary);\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n\n   @media (max-width: 45rem) {\n    .layer-pair__panels,\n    .layer-pair__caption {\n      grid-template-columns: 1fr;\n    }\n  }\n";
export default function LayerPair(props: ReactProps) {
// LayerPair —— 视觉图层树 ↔ HTML 标签树 并排对照
// 左：图层面板 mock（▾ + # / T + 缩进）
// 右：代码窗口（语法着色 + 同 data-key 高亮）
// 下：双视角说明
// 零 JS：:has([data-key]:hover) 左右联动
interface Props {
  id?: string;
  layersTitle?: string;
  fileName?: string;
}
const {
  id = 'htmlPair',
  layersTitle = '图层 · LAYERS',
  fileName = 'card.html',
} = props;

type LayerKind = 'frame' | 'text';

type LayerRow = {
  key: string;
  depth: 0 | 1 | 2;
  kind: LayerKind;
  label: string;
  /** 有子层 → 展开三角；叶子留空位对齐 */
  expanded?: boolean;
};

const layers: LayerRow[] = [
  { key: 'card', depth: 0, kind: 'frame', label: 'Card', expanded: true },
  { key: 'header', depth: 1, kind: 'frame', label: 'Header', expanded: true },
  { key: 'title', depth: 2, kind: 'text', label: 'Title' },
  { key: 'desc', depth: 2, kind: 'text', label: 'Description' },
  { key: 'btn', depth: 1, kind: 'frame', label: 'Button' },
];

type CodePart = { kind: 'tag' | 'attr' | 'str' | 'text'; text: string };

type CodeLine = {
  key: string;
  /** 嵌套深度，用 padding 表达缩进（避免 pre 内空格节点被模板空白弄乱） */
  depth: 0 | 1 | 2;
  parts: CodePart[];
};

const codeLines: CodeLine[] = [
  {
    key: 'card',
    depth: 0,
    parts: [
      { kind: 'tag', text: '<div' },
      { kind: 'text', text: ' ' },
      { kind: 'attr', text: 'class' },
      { kind: 'text', text: '=' },
      { kind: 'str', text: '"card"' },
      { kind: 'tag', text: '>' },
    ],
  },
  {
    key: 'header',
    depth: 1,
    parts: [
      { kind: 'tag', text: '<div' },
      { kind: 'text', text: ' ' },
      { kind: 'attr', text: 'class' },
      { kind: 'text', text: '=' },
      { kind: 'str', text: '"header"' },
      { kind: 'tag', text: '>' },
    ],
  },
  {
    key: 'title',
    depth: 2,
    parts: [
      { kind: 'tag', text: '<h3>' },
      { kind: 'text', text: '标题' },
      { kind: 'tag', text: '</h3>' },
    ],
  },
  {
    key: 'desc',
    depth: 2,
    parts: [
      { kind: 'tag', text: '<p>' },
      { kind: 'text', text: '一段描述…' },
      { kind: 'tag', text: '</p>' },
    ],
  },
  {
    key: 'header',
    depth: 1,
    parts: [{ kind: 'tag', text: '</div>' }],
  },
  {
    key: 'btn',
    depth: 1,
    parts: [
      { kind: 'tag', text: '<button>' },
      { kind: 'text', text: '了解更多' },
      { kind: 'tag', text: '</button>' },
    ],
  },
  {
    key: 'card',
    depth: 0,
    parts: [{ kind: 'tag', text: '</div>' }],
  },
];

const partClass: Record<CodePart['kind'], string | null> = {
  tag: 'layer-pair__ctag',
  attr: 'layer-pair__cattr',
  str: 'layer-pair__cstr',
  text: null,
};
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<div className="layer-pair" id={id}>
  <div className="layer-pair__panels">
    {/* —— 左：图层面板 —— */}
    <section className="layer-pair__figma" aria-label="图层树">
      <header className="layer-pair__panel-bar">
        <span className="layer-pair__panel-label">{layersTitle}</span>
      </header>
      <div className="layer-pair__layers" role="tree" aria-label="图层列表">
        {
          layers.map((row) => (
            <div
              className={['layer-pair__layer', `layer-pair__layer--d${row.depth}`].join(' ')}
              data-key={row.key}
              role="treeitem"
              aria-expanded={row.expanded ? 'true' : undefined} style={styleValue(`--sx-layer-depth: ${row.depth}`)}
            >
              <span
                className={['layer-pair__caret', row.expanded && 'layer-pair__caret--open'].filter(Boolean).join(' ')}
                aria-hidden="true"
              >
                {
                  row.expanded ? (
                    <svg
                      className="layer-pair__caret-svg"
                      viewBox="0 0 8 8"
                      width="8"
                      height="8"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M1.2 2.4 L4 5.6 L6.8 2.4 Z" />
                    </svg>
                  ) : null
                }
              </span>
              <span
                className={[
                  'layer-pair__ic',
                  row.kind === 'frame' ? 'layer-pair__ic--frame' : 'layer-pair__ic--text',
                ].filter(Boolean).join(' ')}
                aria-hidden="true"
                title={row.kind === 'frame' ? 'Frame' : 'Text'}
              >
                {
                  row.kind === 'frame' ? (
                    <svg
                      className="layer-pair__svg"
                      viewBox="0 0 16 16"
                      width="14"
                      height="14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5.5 1.5v13M10.5 1.5v13M1.5 5.5h13M1.5 10.5h13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="layer-pair__svg"
                      viewBox="0 0 16 16"
                      width="14"
                      height="14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3.25 3.5h9.5M8 3.5v9"
                        stroke="currentColor"
                        strokeWidth="1.65"
                        strokeLinecap="square"
                      />
                    </svg>
                  )
                }
              </span>
              <span className="layer-pair__name">{row.label}</span>
            </div>
          ))
        }
      </div>
    </section>

    {/* —— 右：代码窗口 —— */}
    <section className="layer-pair__code" aria-label="对应 HTML">
      <header className="layer-pair__panel-bar layer-pair__panel-bar--code">
        <span className="layer-pair__dots" aria-hidden="true">
          <span className="layer-pair__dot layer-pair__dot--red"></span>
          <span className="layer-pair__dot layer-pair__dot--yellow"></span>
          <span className="layer-pair__dot layer-pair__dot--green"></span>
        </span>
        <span className="layer-pair__fname">{fileName}</span>
        <span className="layer-pair__lang">html</span>
      </header>
      {/*
        行内不换行：pre + white-space:pre 时，模板缩进空白会变成真字符。
        缩进改由 --sx-code-depth + padding-left 承担。
      */}
      <pre className="layer-pair__pre" tabIndex={0}>{
        codeLines.map((line) => (
          <span
            className="layer-pair__cline"
            data-key={line.key} style={styleValue(`--sx-code-depth: ${line.depth}`)}
          >{line.parts.map((p) =>
              partClass[p.kind] ? (
                <span className={partClass[p.kind]!}>{p.text}</span>
              ) : (
                p.text
              ),
            )}</span>
        ))
      }</pre>
    </section>
  </div>

  {/* —— 底注 —— */}
  <div className="layer-pair__caption">
    <div className="layer-pair__cap">
      <div className="layer-pair__cap-k">
        <span className="layer-pair__cap-mark" aria-hidden="true"></span>
        视觉视角
      </div>
      <p>
        一棵<strong>图层树</strong>。框套框，每个图层有名字、有层级、有缩进。
      </p>
    </div>
    <div className="layer-pair__cap">
      <div className="layer-pair__cap-k">
        <span className="layer-pair__cap-mark" aria-hidden="true"></span>
        代码视角
      </div>
      <p>
        一棵<strong>标签树</strong>。<code>&lt;div&gt;</code> 套 <code>&lt;div&gt;</code>，每个标签有名字、有层级、有缩进——一模一样的事。
      </p>
    </div>
  </div>
</div>
    </>
  );
}
