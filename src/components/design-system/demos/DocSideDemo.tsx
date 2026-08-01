import DocSide from '../DocSide';
import type { DocSideGroup } from '../DocSide';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .nb-sides {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: var(--sx-ref-space-4);\n  }\n  @media (max-width: 36rem) {\n    .nb-sides {\n      grid-template-columns: 1fr;\n    }\n  }\n  .nb-side {\n    min-width: 0;\n  }\n";
export default function DocSideDemo(props: ReactProps) {
// DocSide 演示 —— 左 code-block，右 live demo（默认 / 当前页+计划中）。
// 多实例传 collapsible={false}，避免各自折叠 chrome 抢视觉、布局跳动。

const VOID = 'javascript:void(0)';

const defaultGroups: DocSideGroup[] = [
  {
    title: '概览',
    items: [
      { label: '设计系统总览', href: VOID },
      { label: 'Foundations', href: VOID },
      { label: 'Tokens', href: VOID },
      { label: 'Components', href: VOID },
    ],
  },
  {
    title: '组件',
    items: [
      { label: 'Nav', href: VOID },
      { label: 'Button', href: VOID },
      { label: 'Card', href: VOID },
    ],
  },
];

const stateGroups: DocSideGroup[] = [
  {
    title: '组件',
    items: [
      { label: 'Nav', href: VOID },
      { label: 'Button', href: VOID, current: true },
      { label: 'Tag', planned: true },
      { label: 'Callout', planned: true },
    ],
  },
];

const sideCode = `<span class="sel">.doc-side__link</span> {
  <span class="prop">font-family</span>: <span class="val">var(--sx-sys-font-family-mono)</span>;
}
<span class="sel">.doc-side__link[aria-current='page']</span> {
  <span class="prop">label</span>: <span class="val">黄底徽章 + 指示条加粗</span>;
}

<span class="com">/* planned：灰显不可点 span */</span>`;
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<div className="nb-grid2">
  <div className="nb-codewrap">
    <span className="nb-codelabel">CSS</span>
    <pre className="nb-codeblock"><button className="nb-copy" type="button" data-copy="">Copy</button><code dangerouslySetInnerHTML={{ __html: sideCode }} /></pre>
  </div>
  <div className="nb-demobox">
    <div className="nb-sides">
      <div className="nb-side">
        <DocSide groups={defaultGroups} label="默认" collapsible={false} />
      </div>
      <div className="nb-side">
        <DocSide groups={stateGroups} label="当前+计划" collapsible={false} />
      </div>
    </div>
  </div>
</div>
    </>
  );
}
