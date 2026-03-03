import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/atoms/AnimatedSection';
import Heading from '@/components/atoms/Heading';
import GalleryGrid from '@/components/organisms/GalleryGrid';

export default function GaleriePage() {
  const t = useTranslations('gallery');

  return (
    <>
      <div className="h-20" />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimatedSection>
          <Heading as="h1" subtitle={t('subtitle')}>
            {t('title')}
          </Heading>
        </AnimatedSection>
        <GalleryGrid />
      </section>
    </>
  );
}
