import Nav from '../Nav';
import type { NavItem } from '../Nav';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};

export default function NavDemo(props: ReactProps) {
// Navigation 演示 —— 左 code-block（.nav__link grammar + copy），右 live demo。
// 一个导航混合默认 / 当前 / 禁用三种状态（一行，丰富），不拆 3 行。

const D = 'javascript:void(0)';
const items: NavItem[] = [
  { label: '课程', href: D },
  { label: '博客', href: D, active: true },
  { label: '作品', href: D },
  { label: '设计系统', href: D },
  { label: '关于', href: D, disabled: true },
  { label: '日志', href: D },
];

const navCode = `<span class="sel">.nav__link</span> {
  <span class="prop">font-family</span>: <span class="val">var(--sx-sys-font-family-mono-system)</span>;
  <span class="prop">text-transform</span>: <span class="val">uppercase</span>;
  <span class="prop">padding</span>: <span class="val">0.5rem 0.8rem</span>;
  <span class="prop">background</span>: <span class="val">transparent</span>;
}

<span class="com">/* hover 与当前页都切黄底 */</span>
<span class="sel">.nav__link:hover</span>,
<span class="sel">.nav__link[aria-current='page']</span> {
  <span class="prop">background</span>: <span class="val">var(--sx-sys-color-accent)</span>;
}

<span class="com">/* 禁用：半透明不可点 */</span>
<span class="sel">.nav__link[aria-disabled='true']</span> {
  <span class="prop">opacity</span>: <span class="val">0.4</span>;
}`;
  return (
    <>
<div className="nb-grid2">
  <div className="nb-codewrap">
    <span className="nb-codelabel">CSS</span>
    <pre className="nb-codeblock"><button className="nb-copy" type="button" data-copy="">Copy</button><code dangerouslySetInnerHTML={{ __html: navCode }} /></pre>
  </div>

  <div className="nb-demobox">
    <Nav items={items} ariaLabel="Demo" />
  </div>
</div>
    </>
  );
}
