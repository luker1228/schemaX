// 设计系统组件清单（数据驱动 /design-system/components 展示页）。
// 每个组件对应：
//   1. 组件本体 src/components/design-system/<Pascal>.astro
//   2. 演示文件 src/components/design-system/demos/<Pascal>Demo.astro
//   3. 本文件中的一条记录
// 用 pnpm gen:component <Name> 一键生成上述全部文件与本记录。

export interface ComponentEntry {
  /** PascalCase 名称，如 'Nav' / 'Button'。同时用作文件名与 import 标识 */
  name: string;
  /** 展示用中文标题，如 'Navigation' / '按钮' */
  title: string;
  /** 一句话描述 */
  description: string;
  /** 状态：planned（计划中，未实现）/ live（已实现，渲染演示） */
  status: 'planned' | 'live';
}

export const componentsRegistry: ComponentEntry[] = [
  {
    name: 'Nav',
    title: 'Navigation',
    description:
      '水平主导航。等宽字体、大写、紧凑间距。状态通过属性切换，非通过类名。',
    status: 'live',
  },
  // —— 以下为计划中组件，用 gen:component 脚手架生成后改为 live ——
  { name: 'Card', title: '卡片', description: '内容容器。维度：圆角 / 边框 / 阴影 / 交互（链接 vs 静态容器）。', status: 'live' },
  { name: 'Tag', title: '标签', description: '等宽字体的轻量标记。', status: 'planned' },
  { name: 'Badge', title: '徽章', description: '状态标记，含 default / accent / action / danger / success 五个变体，按内容状态语义映射颜色。', status: 'live' },
  { name: 'Callout', title: '提示框', description: '引用 / 警告 / 想法等内容提示。', status: 'planned' },  {
    name: 'Button',
    title: 'Button',
    description: '主要、次要、幽灵、强调变体。',
    status: 'live',
  },
  {
    name: 'Command',
    title: '命令行',
    description:
      '仿终端的命令行展示块。标题栏 + 深色屏幕，行类型覆盖命令 / 输出 / 成功 / 错误 / 注释，可选闪烁光标，零 JS。',
    status: 'live',
  },
  {
    name: 'Breadcrumb',
    title: 'Breadcrumb',
    description: '层级路径导航，等宽字体 + / 分隔符，最后一项为当前页（不可点）。',
    status: 'live',
  },
  {
    name: 'FeatureCard',
    title: 'FeatureCard',
    description: '缩略图+标题+描述+状态徽章的介绍卡片，可链接或静态。',
    status: 'live',
  },

];
