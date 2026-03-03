import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import FloatingCTA from '@/components/organisms/FloatingCTA';
import PageLoader from '@/components/organisms/PageLoader';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'fr' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <PageLoader />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingCTA />
    </NextIntlClientProvider>
  );
}
