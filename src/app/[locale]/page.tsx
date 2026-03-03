import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HeroSection from '@/components/organisms/HeroSection';
import AnimatedSection from '@/components/atoms/AnimatedSection';
import Heading from '@/components/atoms/Heading';
import Button from '@/components/atoms/Button';
import ServiceCard from '@/components/molecules/ServiceCard';
import { locations } from '@/data/locations';
import { brand } from '@/theme';
import { generatePageMetadata, organizationJsonLd } from '@/lib/metadata';
import { formatNumber } from '@/lib/utils';

const heroSlides = [
  '/images/content/Escalier_SHO_1.jpg',
  '/images/content/ROOFTOP_MESSINE(4).jpg',
  '/images/content/bureau_header.png',
  '/images/content/Sport_Mes_1.jpg',
  '/images/content/Rooftop_Sho_IA_1.png',
  '/images/content/Lobby_Mes_1.jpg',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return generatePageMetadata({
    title: t('title'),
    description: t('description'),
    locale,
  });
}

export default function HomePage() {
  const t = useTranslations();

  const services = ['dana', 'barista', 'sport', 'wellness'] as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd()),
        }}
      />

      {/* Hero with slideshow */}
      <HeroSection showCta height="full" images={heroSlides} />

      {/* Brand statement */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="zoomIn">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 mx-auto mb-8 opacity-30">
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h2 className="text-[15px] uppercase tracking-[2.5px] font-medium text-primary mb-6">
              L&apos;exceptionnel au quotidien
            </h2>
            <p className="text-[15px] leading-[1.7] text-primary/80 max-w-xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Locations - alternating layout like kwerk.fr */}
      <section className="pb-20">
        {locations.map((loc, i) => {
          const isReversed = i % 2 !== 0;
          return (
            <div
              key={loc.slug}
              className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch max-w-[94vw] mx-auto mb-20 gap-10 lg:gap-16`}
            >
              {/* Image */}
              <AnimatedSection
                animation={isReversed ? 'fadeLeft' : 'fadeRight'}
                className="flex-1 max-w-[1000px]"
              >
                <Link href={`/adresses/${loc.slug}`} className="block group">
                  <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                    <Image
                      src={loc.heroImage}
                      alt={loc.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </Link>
              </AnimatedSection>

              {/* Text */}
              <AnimatedSection
                animation={isReversed ? 'fadeRight' : 'fadeLeft'}
                className="flex-[0.7] min-w-[280px] flex flex-col justify-center px-4 md:px-0"
              >
                <p className="text-[11px] uppercase tracking-[2px] text-primary/50 mb-3">
                  {t(`locations.${loc.slug}.address`)}, {loc.zipCode} Paris
                </p>
                <h3 className="text-[18px] uppercase tracking-[2.2px] text-primary font-normal leading-[40px] mb-4">
                  {t(`locations.${loc.slug}.name`)}
                </h3>
                <p className="text-[15px] leading-[1.6] text-primary/80 mb-4">
                  {t(`locations.${loc.slug}.description`)}
                </p>
                <p className="text-[13px] text-primary/50 mb-6">
                  {formatNumber(loc.surface)} m&sup2;
                </p>
                <div>
                  <Link
                    href={`/adresses/${loc.slug}`}
                    className="inline-flex items-center text-[12px] uppercase tracking-[1.6px] bg-primary text-white px-6 py-3 hover:bg-white hover:text-primary border border-primary transition-all duration-300"
                  >
                    {t('locations.discover')}
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          );
        })}
      </section>

      {/* Second statement */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="zoomIn">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[15px] uppercase tracking-[2.5px] font-medium text-primary mb-4">
              {t('spaces.title')}
            </h2>
            <p className="text-[15px] leading-[1.7] text-primary/80">
              {t('spaces.subtitle')}
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Services - alternating with images */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
        <div className="max-w-[94vw] mx-auto space-y-24">
          {/* Dana */}
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-20">
            <AnimatedSection animation="fadeRight" className="flex-1">
              <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                <Image
                  src="/images/content/Dana_1.jpg"
                  alt="Restaurant Dana"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeLeft" className="flex-[0.7] min-w-[280px]">
              <p className="text-[11px] uppercase tracking-[2px] text-primary/40 mb-2">
                Le Dana
              </p>
              <h3 className="text-[17px] uppercase tracking-[2px] text-primary mb-4">
                {t('services.dana.name')}
              </h3>
              <p className="text-[14px] leading-[1.6] text-primary/70">
                {t('services.dana.description')}
              </p>
            </AnimatedSection>
          </div>

          {/* Sport & Wellness */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 lg:gap-20">
            <AnimatedSection animation="fadeLeft" className="flex-1">
              <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                <Image
                  src="/images/content/Sport_Sho_1.jpg"
                  alt="Sport & Wellness"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeRight" className="flex-[0.7] min-w-[280px]">
              <p className="text-[11px] uppercase tracking-[2px] text-primary/40 mb-2">
                Sport & Wellness
              </p>
              <h3 className="text-[17px] uppercase tracking-[2px] text-primary mb-4">
                {t('services.sport.name')}
              </h3>
              <p className="text-[14px] leading-[1.6] text-primary/70">
                {t('services.sport.description')}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Infinite scroll photo strip */}
      <section className="py-20 overflow-hidden">
        <AnimatedSection animation="fadeUp">
          <div className="relative">
            <div className="flex gap-6 animate-scroll">
              {[
                '/images/content/Dana_1.jpg',
                '/images/content/Sport_Sho_1.jpg',
                '/images/content/Rooftop_Sho_IA_1.png',
                '/images/content/BARISTA_MESSINE(2).jpg',
                '/images/content/ESPACE_WELLNESS_MESSINE(5).jpg',
                '/images/content/Rooftop_Madeleine_IA_1.png',
                '/images/content/SALLE_DE_REUNION_MESSINE(10).jpg',
                '/images/content/SHO_privatifs.png',
                // Duplicated for seamless loop
                '/images/content/Dana_1.jpg',
                '/images/content/Sport_Sho_1.jpg',
                '/images/content/Rooftop_Sho_IA_1.png',
                '/images/content/BARISTA_MESSINE(2).jpg',
                '/images/content/ESPACE_WELLNESS_MESSINE(5).jpg',
                '/images/content/Rooftop_Madeleine_IA_1.png',
                '/images/content/SALLE_DE_REUNION_MESSINE(10).jpg',
                '/images/content/SHO_privatifs.png',
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative w-[350px] md:w-[480px] h-[250px] md:h-[320px] shrink-0 overflow-hidden"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="480px"
                  />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-primary text-center">
        <AnimatedSection animation="zoomIn">
          <p className="text-secondary/80 text-[11px] uppercase tracking-[3px] mb-6 font-light">
            {brand.name}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
            {t('hero.subtitle')}
          </h2>
          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex text-[12px] uppercase tracking-[1.5px] text-white border border-white/50 px-8 py-4 hover:bg-white hover:text-primary transition-all duration-500"
            >
              {t('nav.planVisit')}
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-10 text-white/40 text-[12px] tracking-wider">
            <span>{brand.contact.phone}</span>
            <span>{brand.contact.email}</span>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
