import ContrastCheckerIsland from '../ContrastCheckerIsland';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};

export default function ContrastCheckerDemo(props: ReactProps) {
// ContrastChecker 演示 —— WCAG 对比度检查器（双 hex 输入 + 比值 + AA/AAA 判定）。
// 左 code-block（阈值公式），右 live demo（输入实时计算）。

const code = `<span class="com">// WCAG 对比度阈值</span>
<span class="prop">AA</span>   normal <span class="val">≥ 4.5</span>   large <span class="val">≥ 3.0</span>
<span class="prop">AAA</span>  normal <span class="val">≥ 7.0</span>   large <span class="val">≥ 4.5</span>

<span class="com">// ratio = (L_lighter + 0.05) / (L_darker + 0.05)</span>`;
  return (
    <>
<div className="nb-grid2">
  <div className="nb-codewrap">
    <span className="nb-codelabel">WCAG</span>
    <pre className="nb-codeblock"><button className="nb-copy" type="button" data-copy="">Copy</button><code dangerouslySetInnerHTML={{ __html: code }} /></pre>
  </div>
  <div className="nb-demobox">
    <ContrastCheckerIsland />
  </div>
</div>
    </>
  );
}
