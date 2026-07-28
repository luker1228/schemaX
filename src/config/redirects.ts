// 中央重定向表（规范 §10.4）。
// 已公开的 URL 永不直接删除；旧地址在此映射到新地址。
// 键为旧路径，值为新路径。
export const redirects: Record<string, string> = {
  // 示例：
  // '/blog/old-schema-post': '/blog/schema-connects-ai-and-tools',
  // 课程合并：fe-html-figma 并入 fe-html-structure（以 HTML 为主线重构）
  '/courses/frontend-handbook/fe-html-figma': '/courses/frontend-handbook/fe-html-structure',
  // 课程合并：fe-css-figma 并入 fe-css-basics（合成「CSS 入门」）
  '/courses/frontend-handbook/fe-css-figma': '/courses/frontend-handbook/fe-css-basics',
};
