import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/atoms/AnimatedSection';
import LuxuryImageHover from '@/components/atoms/LuxuryImageHover';
import HeroSection from '@/components/organisms/HeroSection';

const spaceTypes = [
  { id: 'executive', image: '/images/content/Bureaux_Hsm_1.png' },
  { id: 'suites', image: '/images/content/Suite_SHO_2.png' },
  { id: 'floors', image: '/images/content/SHO_privatifs.png' },
] as const;

export default function EspacesPage() {
  const t = useTranslations('spaces');
  const tNav = useTranslations('nav');

  return (
    <>
      <HeroSection
        image="/images/content/bureau_header.png"
        height="full"
        clean
      />

      {/* Intro statement */}
      <section className="py-40 px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="zoomIn">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-[15px] uppercase tracking-[2.5px] font-medium text-primary mb-6">
              {t('title')}
            </h1>
            <p className="text-[15px] leading-[1.7] text-primary/80">
              {t('subtitle')}
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Space types - alternating layout like kwerk.fr */}
      {spaceTypes.map((space, i) => {
        const isReversed = i % 2 !== 0;
        return (
          <section key={space.id} className="pb-32">
            <div
              className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch max-w-[94vw] mx-auto gap-12 lg:gap-24`}
            >
              {/* Image */}
              <AnimatedSection
                animation={isReversed ? 'fadeLeft' : 'fadeRight'}
                className="flex-1"
              >
                <LuxuryImageHover
                  src={space.image}
                  alt={t(`${space.id}.name`)}
                  className="h-[450px] md:h-[600px]"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              </AnimatedSection>

              {/* Text */}
              <AnimatedSection
                animation={isReversed ? 'fadeRight' : 'fadeLeft'}
                className="flex-[0.7] min-w-[280px] flex flex-col justify-center px-4 md:px-0"
              >
                <p className="text-[11px] uppercase tracking-[2px] text-primary/40 mb-4">
                  {t(`${space.id}.label`)}
                </p>
                <h2 className="text-[18px] uppercase tracking-[2.2px] text-primary font-normal leading-[40px] mb-4">
                  {t(`${space.id}.name`)}
                </h2>
                <p className="text-[13px] text-secondary mb-6">
                  {t(`${space.id}.capacity`)}
                </p>
                <p className="text-[14px] leading-[1.7] text-primary/70 mb-8">
                  {t(`${space.id}.description`)}
                </p>
                <div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-[12px] uppercase tracking-[1.6px] bg-primary text-white px-6 py-3 hover:bg-white hover:text-primary border border-primary transition-all duration-300"
                  >
                    {tNav('planVisit')}
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>
        );
      })}

      {/* CTA section */}
      <section className="py-36 px-4 sm:px-6 lg:px-8 bg-primary text-center">
        <AnimatedSection animation="zoomIn">
          <h2 className="text-[15px] uppercase tracking-[2.5px] text-white/60 mb-6">
            {t('title')}
          </h2>
          <p className="font-heading text-2xl md:text-3xl text-white max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex text-[12px] uppercase tracking-[1.5px] text-white border border-white/50 px-8 py-4 hover:bg-white hover:text-primary transition-all duration-500"
            >
              {tNav('planVisit')}
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
