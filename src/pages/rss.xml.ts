import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';

export async function GET(context: APIContext) {
  const posts = (
    await getCollection('posts', ({ data }) => data.status === 'published')
  ).sort(
    (a, b) =>
      (b.data.publishedAt?.getTime() ?? 0) -
      (a.data.publishedAt?.getTime() ?? 0),
  );

  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.publishedAt,
      link: `/blog/${p.id}/`,
    })),
  });
}
