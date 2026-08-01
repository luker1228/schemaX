
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .props-pair {\n    --sx-pp-gap: 1rem;\n    --sx-pp-select: var(--sx-sys-color-danger);\n\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-pp-gap);\n    width: 100%;\n    border: none;\n    background: transparent;\n    box-shadow: none;\n  }\n\n  .props-pair__panels {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n    align-items: stretch;\n    gap: var(--sx-pp-gap);\n    min-width: 0;\n  }\n\n  /* ── 共用顶栏 ── */\n  .props-pair__panel-bar {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    min-height: 2.25rem;\n    padding: 0.5rem 0.875rem;\n    box-sizing: border-box;\n    background: var(--sx-sys-color-border);\n    border-bottom: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n  .props-pair__panel-label {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-accent);\n  }\n  .props-pair__fname {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    letter-spacing: 0.04em;\n    color: var(--sx-sys-color-bg-surface);\n  }\n  .props-pair__lang {\n    margin-left: auto;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-accent);\n    opacity: 0.9;\n  }\n\n  /* ── 左：属性面板 ── */\n  .props-pair__figma {\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    background: var(--sx-sys-color-bg-surface);\n    overflow: hidden;\n  }\n  .props-pair__props {\n    display: flex;\n    flex-direction: column;\n    flex: 1 1 auto;\n    gap: 0.875rem;\n    padding: 0.75rem 0.625rem 0.875rem;\n  }\n  .props-pair__section {\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n  }\n  .props-pair__section-title {\n    padding: 0 0.35rem 0.35rem;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-text-muted);\n  }\n  .props-pair__row {\n    display: flex;\n    align-items: center;\n    gap: 0.45rem;\n    min-height: 1.875rem;\n    padding: 0.3rem 0.45rem;\n    border-radius: 2px;\n    cursor: default;\n    transition: background 0.12s ease;\n  }\n  .props-pair__prefix {\n    flex-shrink: 0;\n    width: 1.25rem;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    line-height: 1;\n    text-align: center;\n    color: var(--sx-sys-color-text-soft);\n  }\n  .props-pair__input {\n    flex: 0 0 auto;\n    min-width: 2.5rem;\n    padding: 0.2rem 0.4rem;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    line-height: 1.2;\n    color: var(--sx-sys-color-text-primary);\n    background: var(--sx-sys-color-bg-page);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n  .props-pair__chip {\n    flex-shrink: 0;\n    width: 0.875rem;\n    height: 0.875rem;\n    border-radius: 2px;\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n  .props-pair__chip--bordered {\n    /* 深色字色色块在浅底上仍可辨 */\n    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--sx-sys-color-bg-surface) 40%, transparent);\n  }\n  .props-pair__hex {\n    flex: 0 0 auto;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    letter-spacing: 0.02em;\n    color: var(--sx-sys-color-text-primary);\n  }\n  .props-pair__hint {\n    margin-left: auto;\n    font-family: var(--sx-sys-font-family-body);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 500;\n    color: var(--sx-sys-color-text-muted);\n    white-space: nowrap;\n  }\n\n  /* ── 右：代码 ── */\n  .props-pair__code {\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    background: var(--sx-sys-color-bg-surface);\n    overflow: hidden;\n  }\n  .props-pair__dots {\n    display: inline-flex;\n    gap: 0.3rem;\n    flex-shrink: 0;\n  }\n  .props-pair__dot {\n    display: inline-block;\n    width: 0.5rem;\n    height: 0.5rem;\n    border-radius: 50%;\n  }\n  .props-pair__dot--red {\n    background: var(--sx-sys-color-danger);\n  }\n  .props-pair__dot--yellow {\n    background: var(--sx-sys-color-accent);\n  }\n  .props-pair__dot--green {\n    background: var(--sx-sys-color-success);\n  }\n  .props-pair__pre {\n    margin: 0;\n    padding: 0.75rem 0.5rem 0.875rem;\n    flex: 1 1 auto;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-md);\n    line-height: 1.7;\n    color: var(--sx-sys-color-text-primary);\n    overflow-x: auto;\n    white-space: normal;\n    border: none;\n    background: transparent;\n  }\n  .props-pair__pre:focus {\n    outline: none;\n  }\n  .props-pair__pre:focus-visible {\n    box-shadow: inset 0 0 0 2px var(--sx-sys-color-action-primary);\n  }\n  .props-pair__cline {\n    display: block;\n    padding: 0.08rem 0.4rem;\n    padding-left: calc(0.4rem + 1.1rem);\n    margin: 0;\n    border-radius: 2px;\n    transition: background 0.12s ease;\n  }\n  .props-pair__cline--shell {\n    padding-left: 0.4rem;\n  }\n  .props-pair__csel {\n    color: var(--sx-sys-color-action-primary);\n    font-weight: 700;\n  }\n  .props-pair__ckey {\n    color: var(--sx-sys-color-text-soft);\n    font-weight: 600;\n  }\n  .props-pair__cnum {\n    color: var(--sx-sys-color-danger);\n    font-weight: 700;\n  }\n  .props-pair__cstr {\n    color: var(--sx-sys-color-success);\n    font-weight: 600;\n  }\n\n  /* ── 左右联动 ── */\n  .props-pair:has([data-key='padding']:hover) [data-key='padding'],\n  .props-pair:has([data-key='radius']:hover) [data-key='radius'],\n  .props-pair:has([data-key='bg']:hover) [data-key='bg'],\n  .props-pair:has([data-key='font-size']:hover) [data-key='font-size'],\n  .props-pair:has([data-key='color']:hover) [data-key='color'] {\n    background: color-mix(in srgb, var(--sx-pp-select) 42%, transparent);\n  }\n\n  /* ── 底注 ── */\n  .props-pair__caption {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: var(--sx-pp-gap);\n    background: transparent;\n  }\n  .props-pair__cap {\n    padding: 1rem 1.125rem 1.125rem;\n    min-width: 0;\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    background: var(--sx-sys-color-bg-page);\n  }\n  .props-pair__cap-k {\n    display: flex;\n    align-items: center;\n    gap: 0.4rem;\n    margin-bottom: 0.45rem;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    letter-spacing: 0.05em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-text-primary);\n  }\n  .props-pair__cap-mark {\n    display: inline-block;\n    width: 0.5rem;\n    height: 0.5rem;\n    flex-shrink: 0;\n    background: var(--sx-sys-color-accent);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n  .props-pair__cap p {\n    margin: 0;\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.55;\n    color: var(--sx-sys-color-text-soft);\n  }\n  .props-pair__cap strong {\n    color: var(--sx-sys-color-text-primary);\n    font-weight: 700;\n  }\n  .props-pair__cap :global(code) {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: 0.8125em;\n    font-weight: 700;\n    padding: 0.05em 0.3em;\n    color: var(--sx-sys-color-text-primary);\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n\n   @media (max-width: 45rem) {\n    .props-pair__panels,\n    .props-pair__caption {\n      grid-template-columns: 1fr;\n    }\n  }\n";
export default function PropsPair(props: ReactProps) {
// PropsPair —— Figma 属性面板 ↔ CSS 声明 并排对照
// 左：Design 属性 mock（Layout / Fill / Text + data-key）
// 右：代码窗口（语法着色 + 同 data-key 高亮）
// 下：双视角说明
// 零 JS：:has([data-key]:hover) 左右联动
interface Props {
  id?: string;
  propsTitle?: string;
  fileName?: string;
}
const {
  id = 'cssPair',
  propsTitle = 'Design · 属性',
  fileName = 'style.css',
} = props;

type PropKind = 'number' | 'color';

type PropRow = {
  key: string;
  kind: PropKind;
  prefix?: string;
  value: string;
  hint: string;
  /** 色块用 token（仅 color 行） */
  chipVar?: string;
  /** 色块是否需要描边（浅色字色时） */
  chipBorder?: boolean;
};

type PropSection = {
  title: string;
  rows: PropRow[];
};

const sections: PropSection[] = [
  {
    title: 'Layout · 布局',
    rows: [
      { key: 'padding', kind: 'number', prefix: 'P', value: '20', hint: '内边距' },
      { key: 'radius', kind: 'number', prefix: '⌒', value: '8', hint: '圆角' },
    ],
  },
  {
    title: 'Fill · 填充',
    rows: [
      {
        key: 'bg',
        kind: 'color',
        value: 'FFDC58',
        hint: '100%',
        chipVar: 'var(--sx-sys-color-accent)',
      },
    ],
  },
  {
    title: 'Text · 文字',
    rows: [
      { key: 'font-size', kind: 'number', prefix: 'Aa', value: '14', hint: '字号' },
      {
        key: 'color',
        kind: 'color',
        value: '000000',
        hint: '字色',
        chipVar: 'var(--sx-sys-color-text-primary)',
        chipBorder: true,
      },
    ],
  },
];

type CodePart =
  | { kind: 'sel'; text: string }
  | { kind: 'plain'; text: string }
  | { kind: 'key'; text: string }
  | { kind: 'num'; text: string }
  | { kind: 'str'; text: string };

type CodeLine =
  | { type: 'open'; parts: CodePart[] }
  | { type: 'close' }
  | { type: 'decl'; key: string; parts: CodePart[] };

// 声明顺序与左侧属性面板一致：Layout → Fill → Text
const codeLines: CodeLine[] = [
  {
    type: 'open',
    parts: [
      { kind: 'sel', text: '.button' },
      { kind: 'plain', text: ' {' },
    ],
  },
  {
    type: 'decl',
    key: 'padding',
    parts: [
      { kind: 'key', text: 'padding' },
      { kind: 'plain', text: ': ' },
      { kind: 'num', text: '20' },
      { kind: 'str', text: 'px' },
      { kind: 'plain', text: ';' },
    ],
  },
  {
    type: 'decl',
    key: 'radius',
    parts: [
      { kind: 'key', text: 'border-radius' },
      { kind: 'plain', text: ': ' },
      { kind: 'num', text: '8' },
      { kind: 'str', text: 'px' },
      { kind: 'plain', text: ';' },
    ],
  },
  {
    type: 'decl',
    key: 'bg',
    parts: [
      { kind: 'key', text: 'background' },
      { kind: 'plain', text: ': ' },
      { kind: 'str', text: '#FFDC58' },
      { kind: 'plain', text: ';' },
    ],
  },
  {
    type: 'decl',
    key: 'font-size',
    parts: [
      { kind: 'key', text: 'font-size' },
      { kind: 'plain', text: ': ' },
      { kind: 'num', text: '14' },
      { kind: 'str', text: 'px' },
      { kind: 'plain', text: ';' },
    ],
  },
  {
    type: 'decl',
    key: 'color',
    parts: [
      { kind: 'key', text: 'color' },
      { kind: 'plain', text: ': ' },
      { kind: 'str', text: '#000000' },
      { kind: 'plain', text: ';' },
    ],
  },
  { type: 'close' },
];

const partClass: Record<CodePart['kind'], string | null> = {
  sel: 'props-pair__csel',
  plain: null,
  key: 'props-pair__ckey',
  num: 'props-pair__cnum',
  str: 'props-pair__cstr',
};
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<div className="props-pair" id={id}>
  <div className="props-pair__panels">
    {/* —— 左：Figma 属性面板 —— */}
    <section className="props-pair__figma" aria-label="Figma 属性面板">
      <header className="props-pair__panel-bar">
        <span className="props-pair__panel-label">{propsTitle}</span>
      </header>
      <div className="props-pair__props">
        {
          sections.map((section) => (
            <div className="props-pair__section">
              <div className="props-pair__section-title">{section.title}</div>
              {section.rows.map((row) => (
                <div className="props-pair__row" data-key={row.key}>
                  {row.kind === 'number' ? (
                    <>
                      <span className="props-pair__prefix" aria-hidden="true">
                        {row.prefix}
                      </span>
                      <span className="props-pair__input">{row.value}</span>
                      <span className="props-pair__hint">{row.hint}</span>
                    </>
                  ) : (
                    <>
                      <span
                        className={[
                          'props-pair__chip',
                          row.chipBorder && 'props-pair__chip--bordered',
                        ].filter(Boolean).join(' ')} style={styleValue(row.chipVar ? `background: ${row.chipVar}` : undefined)}
                        aria-hidden="true"
                      />
                      <span className="props-pair__hex">{row.value}</span>
                      <span className="props-pair__hint">{row.hint}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))
        }
      </div>
    </section>

    {/* —— 右：CSS 代码窗口 —— */}
    <section className="props-pair__code" aria-label="对应 CSS">
      <header className="props-pair__panel-bar props-pair__panel-bar--code">
        <span className="props-pair__dots" aria-hidden="true">
          <span className="props-pair__dot props-pair__dot--red"></span>
          <span className="props-pair__dot props-pair__dot--yellow"></span>
          <span className="props-pair__dot props-pair__dot--green"></span>
        </span>
        <span className="props-pair__fname">{fileName}</span>
        <span className="props-pair__lang">css</span>
      </header>
      <pre className="props-pair__pre" tabIndex={0}>{
        codeLines.map((line) => {
          if (line.type === 'open') {
            return (
              <span className="props-pair__cline props-pair__cline--shell">
                {line.parts.map((p) =>
                  partClass[p.kind] ? (
                    <span className={partClass[p.kind]!}>{p.text}</span>
                  ) : (
                    p.text
                  ),
                )}
              </span>
            );
          }
          if (line.type === 'close') {
            return <span className="props-pair__cline props-pair__cline--shell">{'}'}</span>;
          }
          return (
            <span className="props-pair__cline" data-key={line.key}>
              {line.parts.map((p) =>
                partClass[p.kind] ? (
                  <span className={partClass[p.kind]!}>{p.text}</span>
                ) : (
                  p.text
                ),
              )}
            </span>
          );
        })
      }</pre>
    </section>
  </div>

  {/* —— 底注 —— */}
  <div className="props-pair__caption">
    <div className="props-pair__cap">
      <div className="props-pair__cap-k">
        <span className="props-pair__cap-mark" aria-hidden="true"></span>
        Figma 视角
      </div>
      <p>
        选中一个图层，<strong>右侧属性面板</strong>就是它「长什么样」的全部信息。
      </p>
    </div>
    <div className="props-pair__cap">
      <div className="props-pair__cap-k">
        <span className="props-pair__cap-mark" aria-hidden="true"></span>
        代码视角
      </div>
      <p>
        一组 <code>属性: 值</code>。属性名几乎跟 Figma 一样：
        <code>padding</code> = 内边距、<code>border-radius</code> = 圆角。
      </p>
    </div>
  </div>
</div>
    </>
  );
}
