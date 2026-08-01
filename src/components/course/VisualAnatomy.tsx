
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .va {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    width: 100%;\n  }\n\n  .va__panels {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n    align-items: stretch;\n    gap: 1rem;\n    min-width: 0;\n  }\n\n  /* ── 共用顶栏:墨底黄字,与 LayerPair 同构 ── */\n  .va__panel {\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n  }\n  .va__bar {\n    display: flex;\n    align-items: center;\n    min-height: 2.25rem;\n    padding: 0.5rem 0.875rem;\n    box-sizing: border-box;\n    background: var(--sx-sys-color-border);\n    border-bottom: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n  .va__bar-label {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-accent);\n  }\n\n  /* ── 舞台:白底 + 居中卡片 ── */\n  .va__stage {\n    display: flex;\n    justify-content: center;\n    align-items: flex-start;\n    padding: 1.5rem 1.25rem;\n    box-sizing: border-box;\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-top: none;\n    flex: 1 1 auto;\n  }\n\n  /* ── 卡片共用骨架:左右同宽、同结构高度,严格对应 ── */\n  .va__card {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    gap: 0.625rem;\n    width: 100%;\n    max-width: 17rem;\n    box-sizing: border-box;\n    padding: 0.875rem;\n  }\n\n  /* ── 左:真实装修态 ── */\n  .va__card:not(.va__card--wire) {\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    box-shadow: var(--sx-sys-shadow-md);\n  }\n  .va__img {\n    width: 100%;\n    height: 5rem;\n    background: var(--sx-sys-color-accent);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0.25rem;\n    box-sizing: border-box;\n  }\n  .va__img-svg {\n    width: 100%;\n    height: 100%;\n    display: block;\n  }\n  /* 咖啡杯:Neo-brutalist 线条风 —— 黄底 + 白杯 + 棕咖啡 + 黑轮廓 */\n  .va__cup-body {\n    fill: var(--sx-sys-color-bg-surface);\n    stroke: var(--sx-sys-color-border);\n    stroke-width: 3;\n    stroke-linejoin: round;\n  }\n  .va__cup-handle {\n    fill: none;\n    stroke: var(--sx-sys-color-border);\n    stroke-width: 3;\n    stroke-linecap: round;\n  }\n  .va__cup-coffee {\n    fill: var(--sx-sys-color-text-soft);\n    stroke: var(--sx-sys-color-border);\n    stroke-width: 2;\n  }\n  .va__cup-steam {\n    fill: none;\n    stroke: var(--sx-sys-color-border);\n    stroke-width: 3;\n    stroke-linecap: round;\n  }\n  .va__badge {\n    align-self: flex-start;\n    padding: 0.15rem 0.6rem;\n    background: var(--sx-sys-color-accent);\n    color: var(--sx-sys-color-text-primary);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-radius: 9999px;\n    font-family: var(--sx-sys-font-family-body);\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    line-height: 1.4;\n  }\n  .va__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display);\n    font-size: var(--sx-sys-font-size-reading);\n    font-weight: 700;\n    line-height: 1.25;\n    color: var(--sx-sys-color-text-primary);\n  }\n  .va__meta {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.5rem;\n    min-height: 2rem;\n  }\n  .va__price {\n    font-family: var(--sx-sys-font-family-display);\n    font-size: var(--sx-sys-font-size-reading);\n    font-weight: 800;\n    color: var(--sx-sys-color-text-primary);\n  }\n  .va__btn {\n    display: inline-block;\n    padding: 0.3rem 0.85rem;\n    background: var(--sx-sys-color-accent);\n    color: var(--sx-sys-color-text-primary);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-radius: 2px;\n    box-shadow: var(--sx-sys-shadow-sm);\n    font-family: var(--sx-sys-font-family-body);\n    font-size: var(--sx-sys-font-size-md);\n    font-weight: 700;\n    line-height: 1.4;\n  }\n\n  /* ── 右:骨架(去装修)── 全虚线、无填充色(图形位除外) ── */\n  .va__card--wire {\n    background: transparent;\n    border: var(--sx-sys-border-width-strong) dashed var(--sx-sys-color-border);\n    box-shadow: none;\n  }\n  .va__wire {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border: var(--sx-sys-border-width-strong) dashed var(--sx-sys-color-border);\n    box-sizing: border-box;\n  }\n  .va__wire--img {\n    height: 5rem;\n    /* 唯一带填充:代表「图形」是块色/图,不是空白轮廓 */\n    background: color-mix(\n      in srgb,\n      var(--sx-sys-color-border) 10%,\n      var(--sx-sys-color-bg-surface)\n    );\n  }\n  .va__wire--pill {\n    align-self: flex-start;\n    min-height: 1.5rem;\n    padding: 0.15rem 0.6rem;\n    border-radius: 9999px;\n  }\n  .va__wire--line {\n    min-height: 1.5rem;\n  }\n  .va__wire--price,\n  .va__wire--btn {\n    min-height: 2rem;\n  }\n  .va__wire--price {\n    flex: 0 0 3rem;\n  }\n  .va__wire--btn {\n    flex: 0 0 5.5rem;\n    border-radius: 2px;\n  }\n  /* 骨架的 meta 行也是一层「框」:外框里套两个字位,呼应「框套框」 */\n  .va__card--wire .va__meta {\n    border: var(--sx-sys-border-width-strong) dashed var(--sx-sys-color-border);\n    padding: 0.45rem;\n  }\n\n  /* ── 标注小标签 ── */\n  .va__tag {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 700;\n    letter-spacing: 0.04em;\n    color: var(--sx-sys-color-text-muted);\n  }\n  /* 「框」角标:贴在外卡左上角,带底色让它压在虚线上可读 */\n  .va__tag--corner {\n    position: absolute;\n    top: -0.625rem;\n    left: 0.625rem;\n    padding: 0.05rem 0.4rem;\n    background: var(--sx-sys-color-bg-page);\n    color: var(--sx-sys-color-text-primary);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n\n  /* ── 底注 ── */\n  .va__caption {\n    padding: 0.875rem 1.125rem;\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    background: var(--sx-sys-color-bg-page);\n  }\n  .va__caption p {\n    margin: 0;\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.65;\n    color: var(--sx-sys-color-text-soft);\n  }\n  .va__caption strong {\n    color: var(--sx-sys-color-text-primary);\n    font-weight: 700;\n  }\n\n   @media (max-width: 45rem) {\n    .va__panels {\n      grid-template-columns: 1fr;\n    }\n  }\n";
export default function VisualAnatomy(props: ReactProps) {
// VisualAnatomy —— 视觉解剖双联
// 左:一张真实卡片(带颜色/字体/圆角/阴影 = 「装修」态)
// 右:同一张卡剥掉装修后的「骨架」——全虚线描边,暴露出三类零件:
//    框(包住区域的轮廓) · 文字 · 图形。
// 教学示意件,同类于 LayerPair(手画 mock,零 JS)。
// 目的:把「网页剥到底只剩框·字·图形,三样拼万物」一眼立住。
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<div className="va">
  <div className="va__panels">
    {/* —— 左:真实(有装修) —— */}
    <section className="va__panel" aria-label="真实卡片">
      <header className="va__bar">
        <span className="va__bar-label">真实 · 有装修</span>
      </header>
      <div className="va__stage">
        <div className="va__card">
          <div className="va__img" aria-hidden="true">
            <svg
              className="va__img-svg"
              viewBox="0 0 120 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path className="va__cup-steam" d="M42 27 Q 36 19 42 11"></path>
              <path className="va__cup-steam" d="M60 27 Q 66 19 60 11"></path>
              <path className="va__cup-body" d="M30 30 L80 30 L74 80 L36 80 Z"></path>
              <path className="va__cup-handle" d="M80 40 C 98 40 98 70 80 70"></path>
              <ellipse className="va__cup-coffee" cx="55" cy="40" rx="23" ry="5"></ellipse>
            </svg>
          </div>
          <span className="va__badge">今日特价</span>
          <h3 className="va__title">手冲咖啡 · 单品</h3>
          <div className="va__meta">
            <span className="va__price">¥28</span>
            <span className="va__btn">立即购买</span>
          </div>
        </div>
      </div>
    </section>

    {/* —— 右:骨架(去装修) —— */}
    <section className="va__panel" aria-label="骨架拆解">
      <header className="va__bar va__bar--ghost">
        <span className="va__bar-label">骨架 · 去装修</span>
      </header>
      <div className="va__stage">
        <div className="va__card va__card--wire">
          <span className="va__tag va__tag--corner">框</span>
          <div className="va__wire va__wire--img">
            <span className="va__tag">图形</span>
          </div>
          <div className="va__wire va__wire--pill">
            <span className="va__tag">字</span>
          </div>
          <div className="va__wire va__wire--line">
            <span className="va__tag">字</span>
          </div>
          <div className="va__meta">
            <div className="va__wire va__wire--price">
              <span className="va__tag">字</span>
            </div>
            <div className="va__wire va__wire--btn">
              <span className="va__tag">字</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  {/* —— 底注 —— */}
  <div className="va__caption">
    <p>
      右边只是把左边的<strong>颜色、字体、圆角、阴影</strong>全剥掉,只留描边轮廓。
      骨架暴露出三类零件:<strong>框</strong>(包住一组东西的轮廓)、<strong>文字</strong>、<strong>图形</strong>——
      网页上的一切,都是这三样的排列组合。
    </p>
  </div>
</div>
    </>
  );
}
