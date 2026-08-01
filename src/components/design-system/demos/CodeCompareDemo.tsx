import CodeCompare from '../CodeCompare';

const cmpCode = `<span class="sel">.cmp</span> {
  <span class="prop">display</span>: <span class="val">flex</span>;
  <span class="prop">gap</span>: <span class="val">1.25rem</span>;
}
<span class="sel">.win</span> {
  <span class="prop">border</span>: <span class="val">2px solid var(--sx-sys-color-border)</span>;
  <span class="prop">background</span>: <span class="val">var(--sx-sys-color-beige)</span>;
}

<span class="com">/* 中间黑底黄箭头连接源 ↔ 目标 */</span>`;

export default function CodeCompareDemo() {
  return (
    <>
      <div className="nb-demobox">
        <CodeCompare from="MARKDOWN.MD" to="INDEX.HTML" bar="dark" source={'# 标题\n## 副标题\n- 项目一\n- 项目二'} target={'<h1>标题</h1>\n<h2>副标题</h2>\n<ul>\n  <li>项目一</li>\n  <li>项目二</li>\n</ul>'} />
      </div>
      <div className="nb-demobox">
        <CodeCompare from="MARKDOWN.MD" to="INDEX.HTML" bar="light" source={'**粗体** _斜体_ `code`'} target={'<strong>粗体</strong>\n<em>斜体</em>\n<code>code</code>'} />
      </div>
      <div className="nb-codewrap">
        <span className="nb-codelabel">CSS</span>
        <pre className="nb-codeblock"><code dangerouslySetInnerHTML={{ __html: cmpCode }} /></pre>
      </div>
    </>
  );
}
