
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .lhero {\n    display: flex;\n    flex-flow: row wrap;\n    gap: 1.5rem 2.5rem;\n    justify-content: space-between;\n    align-items: flex-end;\n    width: 100%;\n    /* 与 .lesson-body 同宽，吃满主区（scroll 模式）；board 封面由\n       .lboard__slide--cover .lhero（特异性更高）覆盖为 52rem，不受影响 */\n    max-width: none;\n    margin-inline: auto;\n    padding: 1.75rem 0;\n    box-sizing: border-box;\n    border-bottom: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n\n  .lhero__title {\n    display: flex;\n    flex-direction: column;\n    gap: 0.2em;\n    margin: 0;\n    flex: 1 1 14rem;\n    min-width: 0;\n    max-width: 38rem;\n    font-family: var(--sx-sys-font-family-display);\n    font-weight: 800;\n    line-height: 1.05;\n    letter-spacing: -0.03em;\n    color: var(--sx-sys-color-text-primary);\n    text-wrap: balance;\n  }\n\n  .lhero__line1,\n  .lhero__line2-pre {\n    font-size: var(--sx-sys-font-display-lg);\n  }\n\n  .lhero__line2 {\n    display: flex;\n    flex-flow: row wrap;\n    align-items: center;\n    gap: 0.12em 0.2em;\n  }\n\n  /* 黄底贴纸：黑边 + 硬影，课时签名点 */\n  .lhero__badge {\n    display: inline-block;\n    padding: 0.08em 0.28em 0.1em;\n    background: var(--sx-sys-color-accent);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    box-shadow: var(--sx-sys-shadow-sm);\n    font-size: var(--sx-sys-font-display-lg);\n    font-weight: 800;\n    line-height: 1.05;\n    letter-spacing: -0.03em;\n    color: var(--sx-sys-color-text-primary);\n    vertical-align: middle;\n  }\n\n  .lhero__meta {\n    display: flex;\n    flex-direction: column;\n    gap: 0.625rem;\n    align-items: flex-end;\n    flex: 0 1 auto;\n    min-width: 0;\n    padding-block-end: 0.2rem;\n  }\n\n  .lhero__pills {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n    align-items: flex-end;\n  }\n\n  .lhero__pill {\n    display: inline-block;\n    max-width: 100%;\n    padding: 0.4rem 0.75rem;\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-radius: 999px;\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    letter-spacing: 0.04em;\n    line-height: 1.3;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .lhero__pill--fill {\n    background: var(--sx-sys-color-accent);\n    color: var(--sx-sys-color-text-primary);\n    box-shadow: var(--sx-sys-shadow-sm);\n  }\n\n  .lhero__pill--outline {\n    background: var(--sx-sys-color-bg-surface);\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .lhero__time {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 500;\n    letter-spacing: 0.03em;\n    color: var(--sx-sys-color-text-soft);\n    white-space: nowrap;\n  }\n\n   @media (max-width: 45rem) {\n    .lhero {\n      flex-direction: column;\n      align-items: flex-start;\n      gap: 1.25rem;\n      padding: 1.5rem 0;\n    }\n    .lhero__title {\n      max-width: none;\n    }\n    .lhero__meta,\n    .lhero__pills {\n      align-items: flex-start;\n      width: 100%;\n    }\n    .lhero__pill {\n      white-space: normal;\n    }\n  }\n";
export default function LessonHero(props: ReactProps) {
// LessonHero —— 课时页大标题区
// 双行 display 标题（第二行可嵌黄底徽章贴纸）+ 右侧 meta pills + 阅读时长。
// 零 JS。视觉：编辑式左标题 / 右 meta；黄徽章带硬边硬影；底部分隔接正文。

interface Props {
  /** 第一行大标题，如 "Html可以看做" */
  line1: string;
  /** 第二行前缀文字，如 "怎么翻成"；可省略 */
  line2?: string;
  /** 高亮徽章文字，如 "Markdown"；不传则无徽章 */
  badge?: string;
  /** 实心黄 pill 文案，如 "MARKDOWN 对照 · COMPARE" */
  pillFill?: string;
  /** 描边白 pill 文案，如 "HTML 第一课 · 语法对照" */
  pillOutline?: string;
  /** 阅读时长文案，如 "阅读时长 ≈ 12 分钟" */
  readTime?: string;
}

const { line1, line2, badge, pillFill, pillOutline, readTime } = props;
const hasLine2Row = Boolean(line2) || Boolean(badge);
const hasMeta = Boolean(pillFill || pillOutline || readTime);
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<header className="lhero">
  <h1 className="lhero__title">
    <span className="lhero__line1">{line1}</span>
    {
      hasLine2Row && (
        <span className="lhero__line2">
          {line2 ? <span className="lhero__line2-pre">{line2}</span> : null}
          {badge ? <span className="lhero__badge">{badge}</span> : null}
        </span>
      )
    }
  </h1>

  {
    hasMeta && (
      <div className="lhero__meta">
        {(pillFill || pillOutline) && (
          <div className="lhero__pills">
            {pillFill && (
              <span className="lhero__pill lhero__pill--fill">{pillFill}</span>
            )}
            {pillOutline && (
              <span className="lhero__pill lhero__pill--outline">{pillOutline}</span>
            )}
          </div>
        )}
        {readTime && <span className="lhero__time">{readTime}</span>}
      </div>
    )
  }
</header>
    </>
  );
}
