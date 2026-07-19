// Astro Content Collections 配置（Content Layer，规范 §9）。
// Schema 复用 src/schemas/content.ts，在此注入 Astro 的 reference 与 image。
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import {
  postFields,
  courseFields,
  lessonFields,
  projectFields,
  topicSchema,
} from './schemas/content';

const opts = { ref: reference };

const topics = defineCollection({
  loader: file('src/data/topics.json'),
  schema: topicSchema(),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => postFields({ ...opts, image }),
});

const courses = defineCollection({
  loader: glob({ base: './src/content/courses', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => courseFields({ ...opts, image }),
});

const lessons = defineCollection({
  loader: glob({ base: './src/content/lessons', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => lessonFields({ ...opts, image }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => projectFields({ ...opts, image }),
});

export const collections = { topics, posts, courses, lessons, projects };
