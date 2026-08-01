import ModalIsland from '../ModalIsland';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};

export default function ModalDemo(props: ReactProps) {
// Modal 演示 —— neubrutalism 对话框（遮罩 + 3px 黑边 + shadow-xl 重硬影）。
// 左 code-block（grammar + copy），右 live demo（点按钮触发，body 固定 client:load）。

const code = `<span class="sel">.modal__overlay</span> {
  <span class="prop">position</span>: <span class="val">fixed</span>;
  <span class="prop">background</span>: <span class="val">color-mix(in srgb, var(--sx-sys-color-border) 55%, transparent)</span>;
}
<span class="sel">.modal__panel</span> {
  <span class="prop">border</span>: <span class="val">3px solid var(--sx-sys-color-border)</span>;
  <span class="prop">box-shadow</span>: <span class="val">var(--sx-sys-shadow-xl)</span>;
  <span class="prop">border-radius</span>: <span class="val">0</span>;
}

<span class="com">/* 关闭：点遮罩 / ✕ / ESC；Tab 在面板内循环 */</span>`;
  return (
    <>
<div className="nb-grid2">
  <div className="nb-codewrap">
    <span className="nb-codelabel">CSS</span>
    <pre className="nb-codeblock"><button className="nb-copy" type="button" data-copy="">Copy</button><code dangerouslySetInnerHTML={{ __html: code }} /></pre>
  </div>
  <div className="nb-demobox">
    <div className="nb-stack">
      <ModalIsland />
    </div>
  </div>
</div>
    </>
  );
}
