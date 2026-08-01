import SectionDivider from '../SectionDivider';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .sd-stack {\n    gap: var(--sx-ref-space-4);\n  }\n  .sd-row {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .sd-tag {\n    font-family: var(--sx-sys-font-family-mono);\n    font-size: var(--sx-sys-font-size-xs);\n    opacity: 0.6;\n  }\n";
export default function SectionDividerDemo(props: ReactProps) {
// SectionDivider 演示 —— 平面黑条分割线（neubrutalism section divider）。
// 承接被替换的涂鸦分割线：分割线职责已从 Rough.js 绘制层划归组件底层。
// 左 code-block（grammar + copy），右 live demo（三档 thickness + 撞色）。

const code = `<span class="sel">.sectiondivider</span> {
  <span class="prop">height</span>: <span class="val">var(--sx-sd-weight)</span>;
  <span class="prop">background</span>: <span class="val">var(--sx-sd-color)</span>;
  <span class="prop">border</span>: <span class="val">0</span>;
}

<span class="com">/* weight → border token */</span>
<span class="prop">thin</span>     <span class="val">var(--sx-sys-border-width)</span>         <span class="com">2px</span>
<span class="prop">default</span>  <span class="val">var(--sx-sys-border-width-strong)</span>  <span class="com">3px</span>
<span class="prop">thick</span>    <span class="val">calc(...strong × 2)</span>              <span class="com">6px</span>`;
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<div className="nb-grid2">
  <div className="nb-codewrap">
    <span className="nb-codelabel">CSS</span>
    <pre className="nb-codeblock"><button className="nb-copy" type="button" data-copy="">Copy</button><code dangerouslySetInnerHTML={{ __html: code }} /></pre>
  </div>
  <div className="nb-demobox">
    <div className="nb-stack sd-stack">
      <div className="sd-row"><span className="sd-tag">thin · 2px</span><SectionDivider weight="thin" /></div>
      <div className="sd-row"><span className="sd-tag">default · 3px</span><SectionDivider /></div>
      <div className="sd-row"><span className="sd-tag">thick · 6px</span><SectionDivider weight="thick" /></div>
      <div className="sd-row">
        <span className="sd-tag">撞色 · accent</span>
        <SectionDivider weight="thick" color="var(--sx-sys-color-accent)" />
      </div>
    </div>
  </div>
</div>
    </>
  );
}
