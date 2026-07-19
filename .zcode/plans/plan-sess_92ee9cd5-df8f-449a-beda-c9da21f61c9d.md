## Nav 组件构建方案

### 目标
在 `/design-system/components` 新建展示页，展示水平主导航的默认态 / 激活态 / hover 态。同时把 nav 样式从 Header 内联提取到全局，实现 DRY。

### 文件改动（5 个）

#### 1. 新增 `src/styles/components.css` 全局 nav 样式
把 Header.astro 里的 `.nav` / `.nav__link` 样式（含 hover、active、移动端响应式）迁移到 `components.css` 的 components 层，作为全局可复用类。包含：
- `.nav`（flex 容器）
- `.nav__link`（默认态）
- `.nav__link:hover/:focus-visible`（黄底+黑边+小阴影）
- `.nav__link[aria-current='page']`（激活态：黄底+黑边+大阴影）
- `.nav__link[aria-disabled='true']`（新增禁用态：半透明、cursor:not-allowed、移除 hover）

#### 2. 重构 `src/components/site/Header.astro`
- 删除内联的 `.nav` / `.nav__link` / `.nav__link:hover` / `.nav__link[aria-current]` / 移动端 nav 相关样式
- Header 内的 `<nav class="nav">` 结构保持不变（已经是 `.nav` 类名，自动应用全局样式）
- Header 自有的 `.site-header` / `.header-primary` / `.brand` / `.header-actions` 等样式保留不动

#### 3. 新增 `src/components/design-system/Nav.astro` 独立组件
可复用的纯导航组件，供展示页和未来其他场景使用。
```ts
interface Props {
  items: { label: string; href: string; active?: boolean; disabled?: boolean }[];
  ariaLabel?: string;
}
```
- 渲染 `<nav class="nav" aria-label={ariaLabel}>` + `.nav__link` 列表
- 根据 `active` 设置 `aria-current="page"`，根据 `disabled` 设置 `aria-disabled="true"`
- 无 scoped 样式（完全依赖全局 `.nav` 类）

#### 4. 新增 `src/pages/design-system/components.astro` 展示页
结构（参考 tokens.astro 的展示模式）：
- 返回链接 ← Design System
- 页头：eyebrow "SchemaX UI" + h1 "Components" + 描述
- Nav 组件展示区，3 个演示卡片：
  1. **默认态**：4 个导航项全部默认
  2. **激活态**：第 2 项 active（黄底徽章）
  3. **hover 态**：固定演示（用 CSS 类强制保持 hover 样式，配文字说明「鼠标悬停时」）
- 每个演示：标题 + 简短说明 + 实际渲染的 Nav 组件
- 末尾 API 说明：列出 `.nav` / `.nav__link` 的使用方式和状态

#### 5. 更新 `src/pages/design-system/index.astro`
Components 卡片从 `Planned` 改为 `Live`，添加 `href: '/design-system/components'`。

### 关键实现点

**hover 态展示的技巧**：hover 是交互态，无法静态展示。用两种方式结合：
- 主用：配文字说明「鼠标悬停时表现为黄底」，让用户在真实 Nav 上 hover 体验
- 辅助：在演示区额外渲染一个「永远保持 hover 样式」的样例（加 `.nav__link--demo-hover` 类强制 hover 视觉），明确告诉读者这就是 hover 的样子

**样式提取的兼容性**：Header 当前用 `<nav class="nav">`，提取到全局后类名不变，Header 渲染结果完全一致，无破坏性改动。

**disabled 态新增**：虽然用户没选禁用态展示，但全局 `.nav__link[aria-disabled='true']` 样式会一并加上（低成本，未来可用），展示页不演示它。

### 验证
- `pnpm tokens:build` 不受影响（未动 token）
- `pnpm lint` 通过（Stylelint 检查新增的 CSS）
- dev server：`/design-system/components` 返回 200，三个状态演示正确渲染
- `/` 首页 Header 视觉无变化（验证重构没破坏）

### 不做的事
- 不做侧边栏导航、面包屑（用户明确只要水平主导航）
- 不重构 Header 的 brand / actions 部分
- 不动 token 源
- 不加客户端 JS（Nav 是纯静态 Astro 组件）