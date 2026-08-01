import GeoMark from '../design-system/GeoMark';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .manifesto__intro {\n    display: grid;\n    grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.6fr);\n    gap: var(--sx-ref-space-8);\n    align-items: end;\n    margin-bottom: var(--sx-ref-space-8);\n  }\n\n  .manifesto__intro-copy {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-3);\n  }\n\n  .manifesto__kicker {\n    display: inline-flex;\n    align-items: center;\n    gap: var(--sx-ref-space-2);\n    margin: 0;\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-text-muted);\n  }\n\n  .manifesto__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-md);\n    font-weight: 800;\n    line-height: 1.08;\n    letter-spacing: -0.02em;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .manifesto__sketch {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--sx-ref-space-4);\n    min-height: 5rem;\n  }\n\n  .manifesto__list {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: var(--sx-sys-border-width-strong);\n    background: var(--sx-sys-color-border);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n  }\n\n  .principle {\n    display: grid;\n    grid-template-columns: auto minmax(0, 1fr);\n    gap: var(--sx-ref-space-4);\n    padding: var(--sx-ref-space-6);\n    background: var(--sx-sys-color-bg-surface);\n    color: var(--sx-sys-color-text-primary);\n    margin: 0;\n  }\n\n  /* 四撞色矩阵（neubrutalism）：浅撞色一律黑字（对比度 ≥3:1），区分靠背景填充。 */\n  .principle--white {\n    background: var(--sx-sys-color-bg-surface);\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .principle--coral {\n    background: var(--sx-sys-color-coral);\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .principle--pop-green {\n    background: var(--sx-sys-color-pop-green);\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .principle--yellow {\n    background: var(--sx-sys-color-accent);\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .principle__index {\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    opacity: 0.55;\n  }\n\n  .principle__body {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-2);\n    min-width: 0;\n  }\n\n  .principle__cn {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-xl);\n    font-weight: 800;\n    line-height: 1.15;\n    color: inherit;\n  }\n\n  .principle__en {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    letter-spacing: 0.03em;\n    opacity: 0.7;\n  }\n\n  .principle__text {\n    margin: var(--sx-ref-space-1) 0 0;\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.55;\n    opacity: 0.85;\n  }\n\n  @media (max-width: 48rem) {\n    .manifesto__intro {\n      grid-template-columns: 1fr;\n    }\n\n    .manifesto__sketch {\n      justify-content: flex-start;\n    }\n\n    .manifesto__list {\n      grid-template-columns: 1fr;\n    }\n  }\n";
export default function HomeManifesto(props: ReactProps) {

// 四原则墙：每条原则一张硬边贴纸卡，四色各一——
// 蓝底白字 / 白底黑字 / 白底蓝字 / 黄底黑字。
// 文字色继承卡色，靠 opacity 分层（标题纯色、编号/英文/正文弱化）。
const principles = [
  {
    en: 'Structure before automation',
    cn: '先结构，后自动化',
    body: '先把意图、字段、边界和约束描述清楚，再让工具与 Agent 执行。',
    tone: 'coral' as const,
  },
  {
    en: 'Contract before integration',
    cn: '先契约，后集成',
    body: 'API、组件、内容和工具调用都先建立可验证契约，再进入系统连接。',
    tone: 'white' as const,
  },
  {
    en: 'Constraints enable reliability',
    cn: '约束带来可靠性',
    body: '合理约束不是限制能力，而是让执行结果可以检查、复现和维护。',
    tone: 'pop-green' as const,
  },
  {
    en: 'Small schemas, large systems',
    cn: '小 Schema，大系统',
    body: '用可组合的小契约组织复杂度，而不是一次写完整个世界。',
    tone: 'yellow' as const,
  },
];
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<section className="manifesto home-section" aria-labelledby="manifesto-title">
  <div className="manifesto__inner home-section__inner">
    <header className="manifesto__intro">
      <div className="manifesto__intro-copy">
        <p className="manifesto__kicker">
          <GeoMark kind="spark" size="sm" />
          <span>构建原则 · MANIFESTO</span>
        </p>
        <h2 className="manifesto__title" id="manifesto-title">
          结构先于自动化，<br />契约先于集成。
        </h2>
      </div>
      <div className="manifesto__sketch" aria-hidden="true">
        <GeoMark kind="brace" size="lg" />
        <GeoMark kind="star" size="md" className="manifesto__sketch-star" />
      </div>
    </header>

    <ol className="manifesto__list">
      {
        principles.map((p, i) => (
          <li className={['principle', `principle--${p.tone}`].join(' ')}>
            <span className="principle__index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="principle__body">
              <h3 className="principle__cn">{p.cn}</h3>
              <p className="principle__en">{p.en}</p>
              <p className="principle__text">{p.body}</p>
            </div>
          </li>
        ))
      }
    </ol>
  </div>
</section>
    </>
  );
}
