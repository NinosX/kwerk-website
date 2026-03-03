import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/atoms/AnimatedSection';
import Heading from '@/components/atoms/Heading';
import ServiceCard from '@/components/molecules/ServiceCard';

const serviceKeys = ['dana', 'barista', 'sport', 'wellness'] as const;

export default function ServicesPage() {
  const t = useTranslations('services');

  return (
    <>
      <div className="h-20" />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimatedSection>
          <Heading as="h1" subtitle={t('subtitle')}>
            {t('title')}
          </Heading>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {serviceKeys.map((svc, i) => (
            <ServiceCard
              key={svc}
              icon={svc}
              name={t(`${svc}.name`)}
              description={t(`${svc}.description`)}
              index={i}
            />
          ))}
        </div>
      </section>
    </>
  );
}
