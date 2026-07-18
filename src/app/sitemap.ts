import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://karvinpower.com';

  const blogUrls = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  const mainPages = [
    '',
    '/about',
    '/products',
    '/industries',
    '/services',
    '/blog',
    '/careers',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...mainPages, ...blogUrls];
}

