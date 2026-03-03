import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/atoms/AnimatedSection';
import Heading from '@/components/atoms/Heading';
import EventCard from '@/components/molecules/EventCard';
import Button from '@/components/atoms/Button';

const eventKeys = ['culinary', 'entertainment', 'technical', 'scenography'] as const;

export default function EvenementsPage() {
  const t = useTranslations('events');
  const tNav = useTranslations('nav');

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
          {eventKeys.map((evt, i) => (
            <EventCard
              key={evt}
              icon={evt}
              name={t(`${evt}.name`)}
              description={t(`${evt}.description`)}
              index={i}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <AnimatedSection>
            <Button href="/contact" variant="secondary" size="lg">
              {tNav('planVisit')}
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
