'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr';
    router.replace(pathname, { locale: newLocale });
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
