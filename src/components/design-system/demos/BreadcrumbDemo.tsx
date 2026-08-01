import Breadcrumb from '../Breadcrumb';
import type { BreadcrumbItem } from '../Breadcrumb';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};

export default function BreadcrumbDemo(props: ReactProps) {
// Breadcrumb 演示 —— 左 code-block，右 live demo（浅层 / 深层路径）。

const D = '#breadcrumb-demo';
const simpleItems: BreadcrumbItem[] = [
  { label: 'Home', href: D },
  { label: 'Design System', href: D },
  { label: 'Components' },
];
const deepItems: BreadcrumbItem[] = [
  { label: 'Home', href: D },
  { label: 'Courses', href: D },
  { label: 'Astro 实战', href: D },
  { label: '内容集合', href: D },
  { label: '定义 Schema' },
];

const crumbCode = `<span class="sel">.crumb__pill</span> {
  <span class="prop">border</span>: <span class="val">3px solid var(--sx-sys-color-border)</span>;
  <span class="prop">box-shadow</span>: <span class="val">var(--sx-sys-shadow-sm)</span>;
}
<span class="sel">.crumb__link</span> {
  <span class="prop">opacity</span>: <span class="val">0.6</span>;
}
<span class="sel">.crumb__link:hover</span> {
  <span class="prop">color</span>: <span class="val">var(--sx-sys-color-text-primary)</span>;
}

<span class="com">/* 最后一项 = 当前页（黄底常驻，不可点 span） */</span>
<span class="sel">.crumb__current</span> {
  <span class="prop">color</span>: <span class="val">var(--sx-sys-color-text-primary)</span>;
}`;
  return (
    <>
<div className="nb-grid2">
  <div className="nb-codewrap">
    <span className="nb-codelabel">CSS</span>
    <pre className="nb-codeblock"><button className="nb-copy" type="button" data-copy="">Copy</button><code dangerouslySetInnerHTML={{ __html: crumbCode }} /></pre>
  </div>
  <div className="nb-demobox">
    <div className="nb-stack">
      <Breadcrumb items={simpleItems} />
      <Breadcrumb items={deepItems} />
    </div>
  </div>
</div>
    </>
  );
}
