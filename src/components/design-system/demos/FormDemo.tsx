
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};

export default function FormDemo(props: ReactProps) {
// Form 演示 —— neubrutalism 表单控件全家桶（对齐 neubrutalism.com Form Elements）。
// 全局 .field / .check / .toggle（components.css）+ nb-demobox / nb-formgrid / nb-checkrow（nb.css）。
// 不再需要组件本体或 Demo 封装——原生元素 + 全局类即可。
  return (
    <>
<div className="nb-demobox">
  <div className="nb-formgrid">
    <div className="nb-stack">
      <label className="field__label" htmlFor="f-text">Text Input</label>
      <input
        className="field"
        id="f-text"
        type="text"
        placeholder="Type something bold..."
      />
    </div>

    <div className="nb-stack">
      <label className="field__label" htmlFor="f-email">Email Input</label>
      <input
        className="field"
        id="f-email"
        type="email"
        placeholder="you@schemax.dev"
      />
    </div>

    <div className="nb-stack">
      <label className="field__label" htmlFor="f-select">Select</label>
      <select className="field" id="f-select">
        <option value="">Choose a shadow size...</option>
        <option>Small (3px 3px 0 0)</option>
        <option>Medium (5px 5px 0 0)</option>
        <option>Large (8px 8px 0 0)</option>
        <option>Extra Large (12px 12px 0 0)</option>
      </select>
    </div>

    <div className="nb-stack">
      <label className="field__label" htmlFor="f-area">Textarea</label>
      <textarea
        className="field"
        id="f-area"
        placeholder="Describe your design system..."
      ></textarea>
    </div>

    <div className="nb-stack">
      <span className="field__label">Checkboxes</span>
      <div className="nb-stack">
        <label className="nb-checkrow">
          <input className="check" type="checkbox" checked />
          <span>Thick borders</span>
        </label>
        <label className="nb-checkrow">
          <input className="check" type="checkbox" checked />
          <span>Hard shadows</span>
        </label>
        <label className="nb-checkrow">
          <input className="check" type="checkbox" />
          <span>Border radius (no!)</span>
        </label>
      </div>
    </div>

    <div className="nb-stack">
      <span className="field__label">Radio Buttons</span>
      <div className="nb-stack">
        <label className="nb-checkrow">
          <input className="check" type="radio" name="f-radio" checked />
          <span>Bold</span>
        </label>
        <label className="nb-checkrow">
          <input className="check" type="radio" name="f-radio" />
          <span>Bolder</span>
        </label>
        <label className="nb-checkrow">
          <input className="check" type="radio" name="f-radio" />
          <span>Boldest</span>
        </label>
      </div>
    </div>

    <div className="nb-stack">
      <span className="field__label">Toggle Switches</span>
      <div className="nb-stack">
        <label className="nb-checkrow">
          <input className="toggle" type="checkbox" checked />
          <span className="toggle-track"><span className="toggle-thumb"></span></span>
          <span>Dark mode</span>
        </label>
        <label className="nb-checkrow">
          <input className="toggle" type="checkbox" />
          <span className="toggle-track"><span className="toggle-thumb"></span></span>
          <span>Gradients (please no)</span>
        </label>
      </div>
    </div>
  </div>
</div>
    </>
  );
}
