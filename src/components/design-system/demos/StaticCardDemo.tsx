import StaticCard from '../StaticCard';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};

export default function StaticCardDemo(props: ReactProps) {
// StaticCard 演示 —— 静态展示卡（白底 · 标签撞色 · 不可点 · 无 hover）。
// 与 FeatureCard（交互卡）是两个独立组件。

const code = `<span class="sel">.staticcard</span> {
  <span class="prop">background</span>: <span class="val">var(--sx-sys-color-bg-surface)</span>;
  <span class="prop">border</span>: <span class="val">3px solid var(--sx-sys-color-border)</span>;
}

<span class="com">/* 标签使用撞色 · 无 hover · 纯展示（不可点） */</span>`;
  return (
    <>
<div className="nb-codewrap nb-codewrap--narrow">
  <span className="nb-codelabel">CSS</span>
  <pre className="nb-codeblock"><button className="nb-copy" type="button" data-copy="">Copy</button><code dangerouslySetInnerHTML={{ __html: code }} /></pre>
</div>

<div className="staticcard-grid">
  <StaticCard title={<a href="https://gumroad.com" target="_blank" rel="noopener">Gumroad</a>} description="The poster child. Sahil Lavingia's 2021 10-year rebrand traded the corporate SaaS look for flat candy fills, sharp black outlines, and hard offset shadows. Still unmistakably neubrutalist today." tag="Creator Economy" fill="var(--sx-sys-color-coral)" />
  <StaticCard title={<a href="https://tonyschocolonely.com" target="_blank" rel="noopener">Tony's Chocolonely</a>} description="Proof it scales past tech. Clashing flat color fields, oversized chunky display type, and square-cornered buttons drive a mainstream consumer brand — loud by design, on purpose." tag="Consumer / CPG" fill="var(--sx-sys-color-orange)" />
  <StaticCard title={<a href="https://panda-css.com" target="_blank" rel="noopener">Panda CSS</a>} description={<>CSS-in-JS library with a fully neubrutalist marketing site — <code>4px 4px 0 0 black</code> shadows and <code>3px solid black</code> borders straight from the production stylesheet. Dev tools are a natural home for the style.</>} tag="Dev Tools" fill="var(--sx-sys-color-pop-green)" />
  <StaticCard title={<a href="https://www.neobrutalism.dev/" target="_blank" rel="noopener">neobrutalism.dev</a>} description="The canonical component library (5,000+ GitHub stars). A shadcn/ui-based React + Tailwind system whose own docs site is a textbook reference implementation: grid background, thick borders, hard shadows on every control." tag="Open Source" fill="var(--sx-sys-color-sky)" />
  <StaticCard title={<a href="https://dodonut.com" target="_blank" rel="noopener">Dodonut</a>} description="Design-studio portfolio leaning all the way in: black-bordered nav and buttons with hard offset shadows, flat lime and purple fills, oversized type. Agencies use the style as a craft signal." tag="Agency" fill="var(--sx-sys-color-lavender)" />
  <StaticCard className="staticcard--muted" title={<>Figma <span className="staticcard__caution">Cautionary</span></>} description={<>An early, influential adopter (~2019–2023): heavy black outlines and bold flat color. But its <strong>2024 rebrand deliberately dropped</strong> those outlines — a reminder that even category leaders cycle out of a trend.</>} tag="Moved on" fill="var(--sx-sys-color-bg-surface)" />
</div>
    </>
  );
}
