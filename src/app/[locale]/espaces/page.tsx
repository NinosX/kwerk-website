import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/atoms/AnimatedSection';
import Heading from '@/components/atoms/Heading';
import Button from '@/components/atoms/Button';

const spaceTypes = [
  {
    id: 'executive',
    capacity: '2-20',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    id: 'suites',
    capacity: '20-50',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    id: 'floors',
    capacity: '50-200+',
    icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  },
] as const;

export default function EspacesPage() {
  const t = useTranslations('spaces');
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {spaceTypes.map((space) => (
            <AnimatedSection key={space.id}>
              <div className="p-10 bg-surface border border-border rounded-sm h-full flex flex-col hover:border-secondary transition-colors duration-300">
                <div className="w-14 h-14 flex items-center justify-center bg-bg-alt rounded-full mb-6">
                  <svg
                    className="w-7 h-7 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={space.icon}
                    />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl font-bold text-primary mb-2">
                  {t(`${space.id}.name`)}
                </h2>
                <p className="text-secondary text-sm font-medium mb-4">
                  {space.capacity} postes
                </p>
                <p className="text-text-light text-sm leading-relaxed flex-1">
                  {t(`${space.id}.description`)}
                </p>
                <div className="mt-8">
                  <Button href="/contact" variant="outline" size="sm">
                    {tNav('planVisit')}
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}
