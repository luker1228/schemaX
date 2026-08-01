import Badge from '../Badge';
import type { BadgeVariant } from '../Badge';
export default function BadgeDemo() {
// Badge 演示 —— 左 code-block（.badge grammar + copy），右 live demo（5 变体）；
// 砍掉 Props 表 / 用法卡 / 折叠说明。

const variants: { name: string; value: BadgeVariant }[] = [
  { name: 'Default', value: 'default' },
  { name: 'Accent', value: 'accent' },
  { name: 'Action', value: 'action' },
  { name: 'Danger', value: 'danger' },
  { name: 'Success', value: 'success' },
];

const badgeCode = `<span class="sel">.badge</span> {
  <span class="prop">border</span>: <span class="val">3px solid var(--sx-sys-color-border)</span>;
  <span class="prop">background</span>: <span class="val">var(--sx-sys-color-bg-surface)</span>;
  <span class="prop">box-shadow</span>: <span class="val">var(--sx-sys-shadow-sm)</span>;
  <span class="prop">text-transform</span>: <span class="val">uppercase</span>;
}

<span class="sel">.badge--accent</span>  { <span class="prop">background</span>: <span class="val">var(--sx-sys-color-accent)</span>; }
<span class="sel">.badge--success</span> { <span class="prop">background</span>: <span class="val">var(--sx-sys-color-success)</span>; }`;
  return (
    <div className="nb-grid2">
  <div className="nb-codewrap">
    <span className="nb-codelabel">CSS</span>
    <pre className="nb-codeblock"><button className="nb-copy" type="button" data-copy="">Copy</button><code dangerouslySetInnerHTML={{ __html: badgeCode }} /></pre>
  </div>
  <div className="nb-demobox">
    <div className="nb-row">
      {variants.map((v) => <Badge variant={v.value}>{v.name}</Badge>)}
    </div>
  </div>
</div>
  );
}
