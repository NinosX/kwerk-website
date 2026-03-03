'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr';

    // Remove the current locale prefix from pathname
    let newPath = pathname;
    if (locale === 'en') {
      newPath = pathname.replace(/^\/en/, '') || '/';
    }

    // Add the new locale prefix if not default (fr)
    if (newLocale === 'en') {
      newPath = `/en${newPath === '/' ? '' : newPath}`;
    }

    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className={`text-sm font-medium tracking-wide hover:text-secondary transition-colors ${className}`}
      aria-label={locale === 'fr' ? 'Switch to English' : 'Passer en francais'}
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  );
}
