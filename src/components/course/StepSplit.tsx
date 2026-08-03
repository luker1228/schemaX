
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  /*\n   * 拓扑约定（≥900px）：\n   *   aside  3fr | 2fr（文 : 图 6:4）\n   *   rail   13–17rem | 1fr\n   *   stack  1fr（上下）\n   *   fill   1fr（上下，figure 更疏）\n   *   auto   默认 aside，再用 :has() 升格\n   */\n\n  .step-split {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr);\n    gap: 1.25rem;\n    align-items: start;\n    width: 100%;\n    min-width: 0;\n  }\n\n  .step-split__copy {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n    min-width: 0;\n  }\n\n  .step-split__copy > :global(p + p) {\n    margin-block-start: 0;\n  }\n\n  .step-split__copy > :global(.sec-head + *) {\n    margin-block-start: 0;\n  }\n\n  .step-split__copy > :global(p) {\n    max-width: 42rem;\n  }\n\n  .step-split__figure {\n    display: flex;\n    flex-direction: column;\n    gap: 0.875rem;\n    min-width: 0;\n    width: 100%;\n  }\n\n  .step-split__figure > :global(*) {\n    max-width: 100%;\n  }\n\n  .step-split__figure > :global(.cmp),\n  .step-split__figure > :global(.doc-code),\n  .step-split__figure > :global(.doc-playground),\n  .step-split__figure > :global(.layer-pair),\n  .step-split__figure > :global(.props-pair) {\n    width: 100%;\n  }\n\n  /* —— stack / fill：上下结构（小屏也是） —— */\n  .step-split--stack,\n  .step-split--fill {\n    gap: 1.125rem;\n  }\n\n  .step-split--stack .step-split__copy,\n  .step-split--fill .step-split__copy {\n    gap: 0.625rem;\n    max-width: 48rem;\n  }\n\n  .step-split--fill .step-split__figure {\n    gap: 1rem;\n  }\n\n  /* —— auto：小屏一律纵排；大屏按内容升格 —— */\n   @media (min-width: 64rem) {\n    /* 默认 / aside / auto 基线：左文右小图 */\n    .step-split--aside,\n    .step-split--auto {\n      grid-template-columns: minmax(0, 3fr) minmax(20rem, 2fr);\n      gap: 1.5rem 1.75rem;\n    }\n\n    /* rail：讲解窄轨 + 示意吃剩余 */\n    .step-split--rail {\n      grid-template-columns: minmax(13rem, 17rem) minmax(0, 1fr);\n      gap: 1.5rem;\n    }\n\n    .step-split--rail .step-split__copy > :global(p) {\n      max-width: none;\n    }\n\n    /* stack / fill 保持全宽单列 */\n    .step-split--stack,\n    .step-split--fill {\n      grid-template-columns: minmax(0, 1fr);\n    }\n\n    .step-split--fill .step-split__copy {\n      max-width: 40rem;\n    }\n\n    /*\n     * auto 升格规则（只读 figure 子树，作者可不写 layout）：\n     * 1) 双窗对照 / 图层对 → stack（需要整行横宽）\n     * 2) 交互岛 / LIVE 舞台 → rail（示意主导）\n     * 3) 其余保持 aside\n     */\n    .step-split--auto:has(\n      .step-split__figure :is(.cmp, .layer-pair, .props-pair)\n    ) {\n      grid-template-columns: minmax(0, 1fr);\n      gap: 1.125rem;\n    }\n\n    .step-split--auto:has(\n      .step-split__figure :is(.cmp, .layer-pair, .props-pair)\n    )\n      .step-split__copy {\n      max-width: 48rem;\n      gap: 0.625rem;\n    }\n\n    .step-split--auto:has(\n      .step-split__figure\n        :is(\n          .doc-playground,\n          .shop-nerve,\n          .card.shop-nerve,\n          [class*='Drill'],\n          [class*='Quiz']\n        )\n    ):not(\n      :has(.step-split__figure :is(.cmp, .layer-pair, .props-pair))\n    ) {\n      grid-template-columns: minmax(13rem, 17rem) minmax(0, 1fr);\n      gap: 1.5rem;\n    }\n\n    .step-split--auto:has(\n      .step-split__figure\n        :is(\n          .doc-playground,\n          .shop-nerve,\n          .card.shop-nerve,\n          [class*='Drill'],\n          [class*='Quiz']\n        )\n    ):not(\n      :has(.step-split__figure :is(.cmp, .layer-pair, .props-pair))\n    )\n      .step-split__copy\n      > :global(p) {\n      max-width: none;\n    }\n  }\n\n  /*\n   * centered 修饰：讲解块水平居中（用于 stack 下「上文 + 居中交互」，\n   * 如练习题：讲解居中与下方 quiz 卡片对齐）。显式传入 class 才生效，\n   * 不影响其它 stack 页面。\n   */\n  .step-split--centered .step-split__copy {\n    align-items: center;\n    text-align: center;\n    margin-inline: auto;\n  }\n  .step-split--centered :global(.sec-head__title) {\n    align-items: center;\n  }\n";
export default function StepSplit(props: ReactProps) {
// StepSplit —— 课时「讲解 + 1～2 示意」三档布局（扫课统一）
//
// layout（请显式写上，少用 auto）:
//   aside —— 左文 · 右小图（单 Preview / 单 Card）
//   rail  —— 左窄讲解 · 右大舞台（交互岛 / 宽 Demo / 练习）
//   stack —— 上短文 · 下全宽（CodeCompare / LayerPair / 多 Preview）
//   auto  —— 按 figure 内容推断（兜底）
//   fill  —— 少用；讲解顶带 + figure 尽量满宽
//
// 兼容：wide → rail；stack 布尔 → stack
//
//   <StepSplit layout="aside">
//     <SectionHead ... />
//     <p>...</p>
//     <Preview slot="figure" />
//   </StepSplit>

type StepSplitLayout = 'auto' | 'aside' | 'rail' | 'stack' | 'fill';

interface Props {
  /**
   * 布局模式。默认 auto：根据 figure 内是否出现
   * CodeCompare / LayerPair / Playground 等自动切换。
   */
  layout?: StepSplitLayout;
  /** @deprecated 用 layout="rail" */
  wide?: boolean;
  /** @deprecated 用 layout="stack"；布尔 true 时等价 stack */
  stack?: boolean;
  class?: string;
}

const {
  layout: layoutProp = 'auto',
  wide = false,
  stack: stackBool = false,
  class: className,
  figure,
} = props;

/** 解析最终 layout：显式 stack/wide 布尔优先于 layout 字符串（兼容旧 MDX） */
const layout: StepSplitLayout = stackBool
  ? 'stack'
  : wide
    ? 'rail'
    : layoutProp;

const layoutClass = `step-split--${layout}`;
const { children } = props;
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<div
  className={['step-split', layoutClass, className].filter(Boolean).join(' ')}
  data-layout={layout}
>
  <div className="step-split__copy">
    {children}
  </div>
  <div className="step-split__figure">
    {figure}
  </div>
</div>
    </>
  );
}
