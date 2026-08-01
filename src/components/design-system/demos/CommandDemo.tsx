import Command from '../Command';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};

export default function CommandDemo(props: ReactProps) {
// Command 演示 —— 左 code-block（.term grammar），右 live demo（light / dark）。

const example = `$ npx astro dev --host

  ↳ Local    http://127.0.0.1:4321
  ↳ Network  http://192.168.1.5:4321`;

const termCode = `<span class="sel">.term</span> {
  <span class="prop">border</span>: <span class="val">3px solid var(--sx-sys-color-border)</span>;
  <span class="prop">box-shadow</span>: <span class="val">var(--sx-comp-term-shadow)</span>;
}
<span class="sel">.term__screen</span> {
  <span class="prop">font-family</span>: <span class="val">var(--sx-sys-font-family-mono-system)</span>;
  <span class="prop">overflow-x</span>: <span class="val">auto</span>;
}

<span class="com">/* light：浅屏黑字（默认）/ dark：黑屏浅字 */</span>`;
  return (
    <>
<div className="nb-grid2">
  <div className="nb-codewrap">
    <span className="nb-codelabel">CSS</span>
    <pre className="nb-codeblock"><button className="nb-copy" type="button" data-copy="">Copy</button><code dangerouslySetInnerHTML={{ __html: termCode }} /></pre>
  </div>
  <div className="nb-demobox">
    <div className="nb-stack">
      <Command title="bash"><code>{example}</code></Command>
      <Command theme="dark" title="output.log"><code>{example}</code></Command>
    </div>
  </div>
</div>
    </>
  );
}
