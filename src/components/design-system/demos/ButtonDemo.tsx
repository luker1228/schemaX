import Button from '../Button';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .button-demo__code {\n    max-width: none;\n  }\n\n  .button-demo__live {\n    margin-block-start: var(--sx-ref-space-8);\n  }\n\n  .button-demo__live :global(.nb-row) {\n    gap: var(--sx-ref-space-4);\n  }\n";
export default function ButtonDemo(props: ReactProps) {
// Button 演示 —— 对齐 neubrutalism.com Canonical Button：
// 先完整展示 CSS，再单独展示 Live Demo，避免代码与按钮被压成两个窄栏。

// code-block 内容（手写高亮 span：sel/prop/val/com）。set:html 注入。
const btnCode = `<span class="sel">.btn</span> {
  <span class="prop">border</span>: <span class="val">3px solid var(--sx-sys-color-border)</span>;
  <span class="prop">border-radius</span>: <span class="val">0</span>;
  <span class="prop">background</span>: <span class="val">var(--sx-sys-color-accent)</span>;
  <span class="prop">color</span>: <span class="val">var(--sx-sys-color-text-primary)</span>;
  <span class="prop">box-shadow</span>: <span class="val">var(--sx-sys-shadow-md)</span>;
  <span class="prop">font-weight</span>: <span class="val">700</span>;
  <span class="prop">padding</span>: <span class="val">12px 24px</span>;
  <span class="prop">cursor</span>: <span class="val">pointer</span>;
  <span class="prop">transition</span>: <span class="val">transform 0.1s, box-shadow 0.1s</span>;
}

<span class="sel">.btn:hover</span> {
  <span class="prop">transform</span>: <span class="val">translate(-2px, -2px)</span>;
  <span class="prop">box-shadow</span>: <span class="val">var(--sx-sys-shadow-lg)</span>;
}

<span class="sel">.btn:active</span> {
  <span class="prop">transform</span>: <span class="val">translate(3px, 3px)</span>;
  <span class="prop">box-shadow</span>: <span class="val">none</span>;
}

<span class="com">/* focus 永远别忘了 */</span>
<span class="sel">.btn:focus-visible</span> {
  <span class="prop">outline</span>: <span class="val">3px solid var(--sx-sys-color-sky)</span>;
  <span class="prop">outline-offset</span>: <span class="val">3px</span>;
}`;
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<div className="nb-codewrap button-demo__code">
  <span className="nb-codelabel">CSS</span>
  <pre className="nb-codeblock"><button className="nb-copy" type="button" data-copy="">Copy</button><code dangerouslySetInnerHTML={{ __html: btnCode }} /></pre>
</div>

<div className="nb-demobox button-demo__live">
  <span className="nb-demolabel">Live Demo</span>
  <p className="nb-lead">Hover and click these:</p>
  <div className="nb-row">
    <Button variant="outline">Default</Button>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Inverted</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
</div>
    </>
  );
}
