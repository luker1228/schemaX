// 设计系统组件清单（数据驱动 /design-system/components 展示页）。
// 每个组件对应：
//   1. 组件本体 src/components/design-system/<Pascal>.tsx
//   2. 演示文件 src/components/design-system/demos/<Pascal>Demo.tsx
//   3. 本文件中的一条记录
// 用 pnpm gen:component <Name> 一键生成上述全部文件与本记录。
// 例外：交互型组件（Playground / Toasts 等 React island）不走脚手架——
// 交互组件同样使用 .tsx，并按需在 Astro 页面中添加 client:*。

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
  {
    name: 'Button',
    title: 'Button',
    description: '主要、次要、幽灵、强调变体。',
    status: 'live',
  },
  {
    name: 'Card',
    title: '卡片',
    description:
      '内容容器。维度：圆角 / 边框 / 阴影 / 交互（链接 vs 静态容器）。',
    status: 'live',
  },
  {
    name: 'Badge',
    title: '徽章',
    description:
      '状态标记，含 default / accent / action / danger / success 五个变体，按内容状态语义映射颜色。',
    status: 'live',
  },
  {
    name: 'Breadcrumb',
    title: 'Breadcrumb',
    description:
      '层级路径导航，等宽字体 + / 分隔符，最后一项为当前页（不可点）。',
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
    name: 'FeatureCard',
    title: 'FeatureCard',
    description:
      '撞色 icon 方块 + 标题 + 描述 + 撞色偏移硬影（贴纸堆）。与首页 Entry 同款。',
    status: 'live',
  },
  {
    name: 'StaticCard',
    title: 'StaticCard',
    description:
      '满色底静态展示卡 · 不可点 · 无 hover。纯展示用，与可点 FeatureCard 是两个独立组件。',
    status: 'live',
  },
  {
    name: 'CodeCompare',
    title: '代码转换对比',
    description:
      '双窗口代码转换展示块。左侧源 + 中间双箭头 + 右侧目标；bar 控制顶栏深浅（dark/light），用于展示 Markdown→HTML 等格式转换。',
    status: 'live',
  },
  {
    name: 'DocSide',
    title: '文档侧栏',
    description:
      '文档左侧边栏导航。多组 eyebrow + 链接列表；支持当前页高亮与 planned 灰显，数据驱动、零 JS。',
    status: 'live',
  },
  {
    name: 'Playground',
    title: '调参台',
    description:
      '拖动滑块实时感受 neubrutalism grammar——边框 / 硬影 / 圆角 / 底色。React island。',
    status: 'live',
  },
  {
    name: 'Form',
    title: '表单控件',
    description:
      'input / select / textarea / checkbox / radio / toggle——全部 neubrutalism 化：黑框硬影零圆角，focus 蓝色 outline。',
    status: 'live',
  },
  {
    name: 'Toast',
    title: '通知',
    description:
      'success / error / warning / info 四种 toast，点击触发、3 秒自动消失，assertive / polite 双语义。React island。',
    status: 'live',
  },
  // —— 以下为计划中组件，用 gen:component 脚手架生成后改为 live ——
  {
    name: 'Tag',
    title: '标签',
    description: '等宽字体的轻量标记。',
    status: 'planned',
  },
  {
    name: 'Callout',
    title: '提示框',
    description: '引用 / 警告 / 想法等内容提示。',
    status: 'planned',
  },
  {
    name: 'SectionDivider',
    title: '分割线',
    description: '平面黑条结构分隔线——neubrutalism 语法，承接被替换的涂鸦分割线。零 JS 静态组件。',
    status: 'live',
  },
  {
    name: 'Modal',
    title: '对话框',
    description:
      '遮罩 + 居中面板：3px 黑边 + shadow-xl 重硬影。点遮罩 / ✕ / ESC 关闭，focus trap + scroll lock。React island。',
    status: 'live',
  },
  {
    name: 'ContrastChecker',
    title: '对比度检查器',
    description:
      '双 hex 输入 → WCAG 对比度比值 + AA/AAA（normal/large）pass/fail + 实时文本预览。React island。',
    status: 'live',
  },
  {
    name: 'CompareToggle',
    title: '风格对照切换',
    description:
      'Standard SaaS ↔ Neubrutalist 同内容切换：同一张卡片只改边框 / 圆角 / 阴影三属性，气质反转。React island。',
    status: 'live',
  },

];
