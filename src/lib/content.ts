// 内容相关的共享工具。
// 注意：Astro 构建期会把 getStaticPaths 提取到独立模块作用域，
// 同文件 frontmatter 里的顶层 const 无法在其中访问；
// 因此这类需要在 getStaticPaths 中使用的工具必须放在独立模块并 import。

/**
 * 把课程引用字段归一化为 id 字符串。
 * Content Layer 中 reference 字段的运行期值可能是 id 字符串或 { id } 对象，统一处理。
 */
export function courseIdOf(c: unknown): string {
  return typeof c === 'string' ? c : ((c as { id?: string })?.id ?? '');
}
