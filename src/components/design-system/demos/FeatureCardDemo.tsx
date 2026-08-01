import FeatureCard from '../FeatureCard';
import GeoMark from '../GeoMark';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .nb-fccards {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: var(--sx-ref-space-6);\n  }\n  @media (max-width: 36rem) {\n    .nb-fccards {\n      grid-template-columns: 1fr;\n    }\n  }\n";
export default function FeatureCardDemo(props: ReactProps) {
// FeatureCard 演示 —— 交互介绍卡（白底 · 可点 · hover 抬起）。
// 对齐首页 Entry：撞色 icon 方块 + 标题 + 描述 + 撞色偏移硬影。
// 静态展示卡见 StaticCard（独立组件）。

const D = 'javascript:void(0)';

const cardCode = `<span class="sel">.featurecard</span> {
  <span class="prop">border</span>: <span class="val">3px solid var(--sx-sys-color-border)</span>;
  <span class="prop">box-shadow</span>: <span class="val">var(--sx-sys-shadow-md)</span>;
}
<span class="sel">a.featurecard:hover</span> {
  <span class="prop">transform</span>: <span class="val">translate(-2px, -2px)</span>;
  <span class="prop">box-shadow</span>: <span class="val">var(--sx-sys-shadow-lg)</span>;
}

<span class="com">/* 撞色机制：局部覆盖 shadow-color，偏移走 3/5/8 ramp token */</span>
<span class="prop">--sx-fc-icon-bg</span>: <span class="val">var(--sx-sys-color-accent)</span>;
<span class="prop">--sx-sys-shadow-color</span>: <span class="val">var(--sx-sys-color-action-primary)</span>;`;
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<div className="nb-codewrap nb-codewrap--narrow">
  <span className="nb-codelabel">CSS</span>
  <pre className="nb-codeblock"><button className="nb-copy" type="button" data-copy="">Copy</button><code dangerouslySetInnerHTML={{ __html: cardCode }} /></pre>
</div>

<div className="nb-fccards">
  <FeatureCard
    title="Courses"
    description="体系化课程、章节与练习。"
    href={D}
    iconBg="var(--sx-sys-color-accent)"
    shadowColor="var(--sx-sys-color-action-primary)">
    <GeoMark kind="icon-course" size="lg" />
  </FeatureCard>
  <FeatureCard
    title="Blog"
    description="技术文章与工程笔记。"
    href={D}
    iconBg="var(--sx-sys-color-coral)"
    shadowColor="var(--sx-sys-color-border)">
    <GeoMark kind="icon-blog" size="lg" />
  </FeatureCard>
  <FeatureCard
    title="Projects"
    description="开源仓库与工程作品。"
    href={D}
    iconBg="var(--sx-sys-color-sky)"
    shadowColor="var(--sx-sys-color-accent)">
    <GeoMark kind="icon-code" size="lg" />
  </FeatureCard>
  <FeatureCard
    title="Design System"
    description="Token、组件与内容规范。"
    href={D}
    iconBg="var(--sx-sys-color-pop-green)"
    shadowColor="var(--sx-sys-color-border)">
    <GeoMark kind="icon-db" size="lg" />
  </FeatureCard>
</div>
    </>
  );
}
