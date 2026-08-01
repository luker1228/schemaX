import { site } from '../../config/site';

export interface SeoProps {
  title: string;
  description: string;
  type?: 'website' | 'article' | 'profile' | 'course' | 'software';
  canonical: string;
  publishedAt?: Date;
  noindex?: boolean;
}

export default function Seo({
  title,
  description,
  type = 'website',
  canonical,
  publishedAt,
  noindex = false,
}: SeoProps) {
  const fullTitle = title === site.name ? `${site.name} — ${site.tagline}` : `${title} — ${site.name}`;
  const jsonLd: Record<string, unknown> = type === 'article'
    ? { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: title, description, datePublished: publishedAt?.toISOString(), author: { '@type': 'Person', name: site.author.name }, mainEntityOfPage: canonical }
    : type === 'course'
      ? { '@context': 'https://schema.org', '@type': 'Course', name: title, description, provider: { '@type': 'Person', name: site.author.name } }
      : type === 'software'
        ? { '@context': 'https://schema.org', '@type': 'SoftwareSourceCode', name: title, description, author: { '@type': 'Person', name: site.author.name } }
        : type === 'profile'
          ? { '@context': 'https://schema.org', '@type': 'Person', name: site.author.name, jobTitle: site.author.role, url: site.url }
          : { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url };

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
