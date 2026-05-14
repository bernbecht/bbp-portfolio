import { getAllSlugs, getPostBySlug } from '@/lib/project-posts';
import { resolveSiteUrl } from '@/lib/site-url';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = resolveSiteUrl();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const projectPostEntries: MetadataRoute.Sitemap = getAllSlugs().map((slug) => {
    const post = getPostBySlug(slug);
    const lastModified = post ? new Date(post.date) : new Date();
    return {
      url: `${baseUrl}/projects/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    };
  });

  return [...staticEntries, ...projectPostEntries];
}
