import type { Metadata } from 'next';
import { brand } from '@/theme';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kwerk.fr';

export function generatePageMetadata({
  title,
  description,
  path = '',
  locale = 'fr',
}: {
  title: string;
  description: string;
  path?: string;
  locale?: string;
}): Metadata {
  const prefix = locale === 'fr' ? '' : `/${locale}`;
  const url = `${BASE_URL}${prefix}${path}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${brand.name}`,
      description,
      url,
      siteName: brand.name,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}${brand.ogImage}`,
          width: 1200,
          height: 630,
          alt: brand.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${brand.name}`,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        fr: `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
      },
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: BASE_URL,
    logo: `${BASE_URL}${brand.logo}`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: brand.contact.phone,
      email: brand.contact.email,
      contactType: 'customer service',
      availableLanguage: ['French', 'English'],
    },
    sameAs: [brand.contact.instagram, brand.contact.linkedin],
  };
}

export function localBusinessJsonLd(location: {
  name: string;
  address: string;
  zipCode: string;
  city: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${brand.name} ${location.name}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      postalCode: location.zipCode,
      addressLocality: location.city,
      addressCountry: 'FR',
    },
    telephone: brand.contact.phone,
    email: brand.contact.email,
    url: BASE_URL,
  };
}
