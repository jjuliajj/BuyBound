import { MetadataRoute } from 'next';
import { getBooks } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.logicnode.ink';
  const currentDate = new Date().toISOString().split('T')[0];

  // Static pages
  const staticRoutes = [
    '',
    '/collections',
    '/genres',
    '/authors',
    '/about',
    '/terms',
    '/privacy',
    '/refund',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic book product pages
  try {
    const books = await getBooks();
    const bookRoutes = books.map((book) => ({
      url: `${baseUrl}/products/${book.id}`,
      lastModified: book.created_at ? new Date(book.created_at).toISOString().split('T')[0] : currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    return [...staticRoutes, ...bookRoutes];
  } catch (error) {
    console.error("Failed to generate dynamic book sitemap:", error);
    return staticRoutes;
  }
}
