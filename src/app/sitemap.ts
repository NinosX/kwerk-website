import type { MetadataRoute } from 'next';
import { locations } from '@/data/locations';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kwerk.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/espaces',
    '/services',
    '/evenements',
    '/galerie',
    '/contact',
    '/cgu',
    '/mentions-legales',
  ];

  const locales = ['fr', 'en'];

  const pages: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      const prefix = locale === 'fr' ? '' : `/${locale}`;
      pages.push({
        url: `${BASE_URL}${prefix}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: {
            fr: `${BASE_URL}${page}`,
            en: `${BASE_URL}/en${page}`,
          },
        },
      });
    }
  }

  // Location pages
  for (const location of locations) {
    for (const locale of locales) {
      const prefix = locale === 'fr' ? '' : `/${locale}`;
      pages.push({
        url: `${BASE_URL}${prefix}/adresses/${location.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
        alternates: {
          languages: {
            fr: `${BASE_URL}/adresses/${location.slug}`,
            en: `${BASE_URL}/en/adresses/${location.slug}`,
          },
        },
      });
    }
  }

  return pages;
}
