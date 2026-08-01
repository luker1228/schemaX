
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  /* 三联卡内 badge 间距 */\n  :global(.nb-carddemo .badge) {\n    margin-top: var(--sx-ref-space-2);\n  }\n";
export default function CardDemo(props: ReactProps) {
// Card 演示 —— 对齐 neubrutalism.com Canonical Card：
// 代码块限宽独占一行（无右侧 demo），下方 Card Variations 三联。
const cardCode = `<span class="sel">.card</span> {
  <span class="prop">border</span>: <span class="val">3px solid var(--sx-sys-color-border)</span>;
  <span class="prop">background</span>: <span class="val">var(--sx-sys-color-bg-surface)</span>;
  <span class="prop">box-shadow</span>: <span class="val">var(--sx-sys-shadow-md)</span>;
  <span class="prop">padding</span>: <span class="val">var(--sx-comp-card-padding)</span>;
  <span class="prop">transition</span>: <span class="val">transform 0.15s, box-shadow 0.15s</span>;
}

<span class="sel">.card--interactive:hover</span> {
  <span class="prop">transform</span>: <span class="val">translate(-2px, -2px)</span>;
  <span class="prop">box-shadow</span>: <span class="val">var(--sx-sys-shadow-lg)</span>;
}

<span class="com">/* 变体级 token：边框与珊瑚色偏移影 */</span>
<span class="prop">box-shadow</span>: <span class="val">var(--sx-comp-card-colored-shadow)</span>;`;
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<div className="nb-codewrap nb-codewrap--narrow">
  <span className="nb-codelabel">CSS</span>
  <pre className="nb-codeblock"><button className="nb-copy" type="button" data-copy="">Copy</button><code dangerouslySetInnerHTML={{ __html: cardCode }} /></pre>
</div>

<h3 className="nb-subtitle">卡片变体 Card Variations</h3>

<div className="nb-cardgrid">
  <div className="nb-carddemo nb-carddemo--standard">
    <h5>Standard Card</h5>
    <p>黑边 + 黑影。百搭主力，任何背景上都成立。</p>
    <span className="badge">Default</span>
  </div>
  <div className="nb-carddemo nb-carddemo--colored">
    <h5>Colored Shadow</h5>
    <p>同色边框 + 撞色偏移影，保留结构的同时加点个性。</p>
    <span className="badge badge--danger">Accent</span>
  </div>
  <div className="nb-carddemo nb-carddemo--filled">
    <h5>Filled Card</h5>
    <p>满色底 + 黑框黑影把能量框住。适合 CTA。</p>
    <span className="badge badge--accent">Highlight</span>
  </div>
</div>
    </>
  );
}
