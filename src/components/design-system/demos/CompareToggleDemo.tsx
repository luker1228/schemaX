import CompareToggleIsland from '../CompareToggleIsland';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};

export default function CompareToggleDemo(props: ReactProps) {
// CompareToggle 演示 —— Standard SaaS ↔ Neubrutalist 同内容切换。
// 左 code-block（三属性对照），右 live demo（toggle 切换看气质反转）。

const code = `<span class="com">/* 同一张卡片，只改三个属性 */</span>
<span class="prop">border-radius</span>  <span class="val">12px</span>            → <span class="val">0</span>
<span class="prop">box-shadow</span>     <span class="val">0 4px 12px rgba()</span> → <span class="val">5px 5px 0 #000</span>
<span class="prop">border</span>         <span class="val">1px solid #d4d4d8</span> → <span class="val">3px solid #000</span>`;
  return (
    <>
<div className="nb-grid2">
  <div className="nb-codewrap">
    <span className="nb-codelabel">DIFF</span>
    <pre className="nb-codeblock"><button className="nb-copy" type="button" data-copy="">Copy</button><code dangerouslySetInnerHTML={{ __html: code }} /></pre>
  </div>
  <div className="nb-demobox">
    <CompareToggleIsland />
  </div>
</div>
    </>
  );
}
