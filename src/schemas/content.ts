// 内容集合的共享 Zod schema（单一真相来源）。
//
// 本文件**不**导入 `astro:content`（虚拟模块，仅 Astro 构建期可用），
// 以便 `scripts/validate-content.ts`（tsx 直跑）也能复用同一套 schema。
// 跨集合引用通过注入的 `ref` 构造器实现：
//   - content.config.ts 注入 `reference`（Astro 解析引用）
//   - validate-content.ts 注入 `() => z.string()`（把引用当作纯字符串校验）
import { z } from 'astro/zod';

/** slug 规则：英文小写 + 连字符，不含日期 / 随机串（规范 §10）。 */
export const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const slugSchema = z.string().regex(slugRegex);

/** 跨集合引用构造器：给定集合名，返回一个 Zod 类型。 */
export type RefBuilder = (collection: string) => z.ZodType;
/** 图片字段构造器（来自 Astro 的 SchemaContext.image）。 */
export type ImageField = () => z.ZodType;

export interface CommonFieldOptions {
  ref: RefBuilder;
  /** 仅在 Astro 构建期由 SchemaContext 提供；独立校验时省略（cover 当作字符串）。 */
  image?: ImageField;
}

/** 所有主要内容共享的公共字段（规范 §8.1）。 */
export function commonFields({ ref, image }: CommonFieldOptions) {
  return {
    title: z.string().min(1).max(100),
    description: z.string().min(10).max(220),
    slug: slugSchema,
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    cover: image ? image().optional() : z.string().optional(),
    coverAlt: z.string().optional(),
    topics: z.array(ref('topics')).default([]),
  } as const;
}

/** topics 集合（file() 加载，数组每项含 id，id 即 entry id）。 */
export function topicSchema() {
  return z.object({
    id: z.string(),
    label: z.string(),
    description: z.string().optional(),
  });
}

/** Blog 文章（规范 §8.2）。 */
export function postFields(opts: CommonFieldOptions) {
  return z.object({
    ...commonFields(opts),
    canonical: z.url().optional(),
    noindex: z.boolean().default(false),
    relatedProjects: z.array(opts.ref('projects')).default([]),
  });
}

/** 课程（规范 §8.3）。注意 status / type / level 用各自枚举。 */
export function courseFields(opts: CommonFieldOptions) {
  return z.object({
    ...commonFields(opts),
    status: z
      .enum(['planning', 'writing', 'active', 'completed', 'archived'])
      .default('planning'),
    type: z.enum(['guide', 'workshop', 'handbook', 'series']),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    objectives: z.array(z.string()).min(1),
    prerequisites: z.array(z.string()).default([]),
    estimatedHours: z.number().positive().optional(),
  });
}

/** 课程章节（规范 §8.4）。 */
export function lessonFields(opts: CommonFieldOptions) {
  return z.object({
    ...commonFields(opts),
    course: opts.ref('courses'),
    order: z.number().int().positive(),
    durationMinutes: z.number().int().positive().optional(),
    objectives: z.array(z.string()).default([]),
    lessonType: z
      .enum(['lesson', 'practice', 'project', 'review'])
      .default('lesson'),
    /**
     * 课程篇章：基础篇（先建立心智）/ 进阶篇（DOM、布局深水区等）。
     * 侧栏与课程目录按此分组；order 仍为全课排序。
     */
    part: z.enum(['basics', 'advanced']).default('basics'),
    /**
     * 可选大标题 Hero（设计稿级课时页）。
     * 有值时用 LessonHero 替代默认 lhead；无值时走传统标题区。
     * presentation=board 时 Hero 作为白板封面页。
     */
    hero: z
      .object({
        line1: z.string().min(1),
        /** 第二行前缀；可省略，仅 line1 + badge 时使用 */
        line2: z.string().optional(),
        badge: z.string().optional(),
        pillFill: z.string().optional(),
        pillOutline: z.string().optional(),
      })
      .optional(),
    /**
     * 课时呈现方式：
     * - scroll：传统纵向滚动（默认）
     * - board：白板翻页——一次只展示一节，顶栏 + 底部分页切换
     */
    presentation: z.enum(['scroll', 'board']).default('scroll'),
  });
}

/** 作品 / 项目（规范 §8.5）。 */
export function projectFields(opts: CommonFieldOptions) {
  return z.object({
    ...commonFields(opts),
    status: z
      .enum(['active', 'maintained', 'experimental', 'paused', 'archived'])
      .default('active'),
    repository: z.url().optional(),
    demo: z.url().optional(),
    stack: z.array(z.string()).default([]),
    startedAt: z.coerce.date().optional(),
    relatedPosts: z.array(opts.ref('posts')).default([]),
  });
}
