import { useLocale, useTranslations } from 'next-intl';
import { brand } from '@/theme';
import Logo from '@/components/atoms/Logo';
import Link from 'next/link';
import { locations } from '@/data/locations';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tLoc = useTranslations('locations');
  const locale = useLocale();
  const prefix = locale === 'en' ? '/en' : '';

  const quickLinks = [
    { href: `${prefix}/espaces`, label: tNav('spaces') },
    { href: `${prefix}/services`, label: tNav('services') },
    { href: `${prefix}/evenements`, label: tNav('events') },
    { href: `${prefix}/galerie`, label: tNav('gallery') },
    { href: `${prefix}/contact`, label: tNav('contact') },
  ];

  return (
    <footer className="bg-primary text-text-inverse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Logo inverted className="mb-4 inline-block" />
            <p className="text-text-inverse/70 text-sm leading-relaxed mt-4">
              {t('description')}
            </p>
            <div className="mt-6 space-y-2 text-sm text-text-inverse/70">
              <p>{brand.contact.phone}</p>
              <p>{brand.contact.email}</p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-inverse/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Addresses */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">
              {t('ourAddresses')}
            </h4>
            <ul className="space-y-3">
              {locations.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`${prefix}/adresses/${loc.slug}`}
                    className="text-sm text-text-inverse/70 hover:text-secondary transition-colors"
                  >
                    {tLoc(`${loc.slug}.name`)}
                    <span className="block text-xs text-text-inverse/50">
                      {loc.address}, {loc.zipCode} {loc.city}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">
              {t('followUs')}
            </h4>
            <div className="flex gap-4">
              <a
                href={brand.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-inverse/70 hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={brand.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-inverse/70 hover:text-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-text-inverse/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-inverse/50">
            &copy; {new Date().getFullYear()} {brand.legal.companyName}.{' '}
            {t('rights')}
          </p>
          <div className="flex gap-6">
            <Link
              href={`${prefix}/cgu`}
              className="text-xs text-text-inverse/50 hover:text-secondary transition-colors"
            >
              {t('cgu')}
            </Link>
            <Link
              href={`${prefix}/mentions-legales`}
              className="text-xs text-text-inverse/50 hover:text-secondary transition-colors"
            >
              {t('legalNotice')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
