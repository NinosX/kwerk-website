import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/atoms/AnimatedSection';
import LuxuryImageHover from '@/components/atoms/LuxuryImageHover';
import HeroSection from '@/components/organisms/HeroSection';

const services = [
  { id: 'dana', image: '/images/caroussel_service/dana.png' },
  { id: 'barista', image: '/images/galerie/saint-honore/LOBBY_SHO_LOUNGE.jpg' },
  { id: 'sport', image: '/images/galerie/saint-honore/SportSho1.jpg' },
  { id: 'wellness', image: '/images/messine/ESPACE_WELLNESS_MESSINE_5.jpg' },
] as const;

export default function ServicesPage() {
  const t = useTranslations('services');
  const tNav = useTranslations('nav');

  return (
    <>
      {/* Hero */}
      <HeroSection
        image="/images/galerie/messine/SportMes1.jpg"
        height="full"
        clean
      />

      {/* Service sections - alternating like kwerk.fr */}
      {services.map((svc, i) => {
        const isReversed = i % 2 !== 0;
        return (
          <section key={svc.id} className="py-12">
            <div
              className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch w-[94vw] mx-auto gap-20 lg:gap-28`}
            >
              {/* Image */}
              <AnimatedSection
                animation={isReversed ? 'fadeLeft' : 'fadeRight'}
                className="flex-1"
              >
                <LuxuryImageHover
                  src={svc.image}
                  alt={t(`${svc.id}.name`)}
                  className="h-[450px] md:h-[600px] rounded-[3px]"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              </AnimatedSection>

              {/* Text */}
              <AnimatedSection
                animation={isReversed ? 'fadeRight' : 'fadeLeft'}
                className="flex-[0.7] min-w-[280px] flex flex-col justify-center"
              >
                <p className="text-[11px] uppercase tracking-[2.1px] text-[#666] mb-4">
                  {t(`${svc.id}.label`)}
                </p>
                <h2 className="text-[19px] uppercase tracking-[2.2px] text-primary font-normal leading-[40px] mb-6">
                  {t(`${svc.id}.name`)}
                </h2>
                <p className="text-[14px] leading-[1.6] text-primary/80">
                  {t(`${svc.id}.description`)}
                </p>
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
