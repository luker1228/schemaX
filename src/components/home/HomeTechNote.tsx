import GeoMark from '../design-system/GeoMark';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .tech {\n    padding-block-end: clamp(3rem, 7vw, 5rem);\n  }\n\n  /* 黄底黑字大卡——重构：从蓝底左右双栏改成黄底纵向，pipeline 作主视觉 */\n  .tech__card {\n    padding: var(--sx-ref-space-8);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-accent);\n    box-shadow: var(--sx-sys-shadow-lg);\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .tech__head {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-3);\n    max-width: 46rem;\n    margin-bottom: var(--sx-ref-space-8);\n  }\n\n  .tech__eyebrow {\n    display: inline-flex;\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-text-primary);\n    opacity: 0.7;\n  }\n\n  .tech__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-sm);\n    font-weight: 800;\n    line-height: 1.12;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .tech__body {\n    margin: 0;\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.6;\n    color: var(--sx-sys-color-text-primary);\n    opacity: 0.8;\n  }\n\n  .tech__flow {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    display: grid;\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    gap: var(--sx-ref-space-2);\n  }\n\n  .flow-item {\n    display: flex;\n    align-items: center;\n    gap: var(--sx-ref-space-2);\n    min-width: 0;\n  }\n\n  /* 白底墨字色块：墨边框住（贴纸色块），在黄卡上靠色差 + 边框区分 */\n  .flow-step {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-2);\n    padding: var(--sx-ref-space-4);\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-bg-surface);\n    color: var(--sx-sys-color-text-primary);\n    min-width: 0;\n    box-shadow: var(--sx-sys-shadow-sm);\n  }\n\n  /* 大编号用 action 蓝——黄卡上蓝编号 pop，蓝黄对比 */\n  .flow-step__num {\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-2xl);\n    font-weight: 800;\n    line-height: 1;\n    color: var(--sx-sys-color-action-primary);\n  }\n\n  .flow-step__name {\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    color: var(--sx-sys-color-text-muted);\n  }\n\n  .flow-step__detail {\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .flow-arrow {\n    display: flex;\n    align-items: center;\n    flex: 0 0 auto;\n  }\n\n  @media (max-width: 64rem) {\n    .tech__flow {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n  }\n\n  @media (max-width: 36rem) {\n    .tech__flow {\n      grid-template-columns: 1fr;\n    }\n\n    .flow-arrow {\n      display: none;\n    }\n  }\n";
export default function HomeTechNote(props: ReactProps) {

// Tech Note：构建链路（固定事实）。重构为黄底黑字大卡——纵向布局，pipeline 为主视觉。
// 原来的 bullets 与 pipeline 合并为一条四步流程（编号 + 步骤 + 工具命令）。
const pipeline = [
  { num: '01', step: 'TOKENS', detail: 'Style Dictionary → CSS + TS' },
  { num: '02', step: 'CONTENT', detail: 'Zod · schema gate' },
  { num: '03', step: 'ASTRO', detail: 'static compile' },
  { num: '04', step: 'SEARCH', detail: 'pagefind over dist' },
];
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<section className="tech home-section" aria-labelledby="tech-title">
  <div className="tech__inner home-section__inner">
    <div className="tech__card">
      <div className="tech__head">
        <span className="tech__eyebrow">Technical notes</span>
        <h2 className="tech__title" id="tech-title">
          构建顺序本身就是产品质量的一部分。
        </h2>
        <p className="tech__body">
          令牌、内容、类型、静态构建与搜索索引串成一条不可随意打乱的链路；GitHub
          数据只在构建期写入缓存，不在运行时请求。
        </p>
      </div>

      <ol className="tech__flow">
        {
          pipeline.map((p, i) => (
            <li className="flow-item">
              <div className="flow-step">
                <span className="flow-step__num">{p.num}</span>
                <span className="flow-step__name">{p.step}</span>
                <span className="flow-step__detail">{p.detail}</span>
              </div>
              {i < pipeline.length - 1 && (
                <span className="flow-arrow" aria-hidden="true">
                  <GeoMark kind="arrow" size="sm" />
                </span>
              )}
            </li>
          ))
        }
      </ol>
    </div>
  </div>
</section>
    </>
  );
}
