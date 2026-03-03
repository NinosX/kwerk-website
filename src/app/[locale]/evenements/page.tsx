import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/atoms/AnimatedSection';

export default function EvenementsPage() {
  const t = useTranslations('events');
  const tNav = useTranslations('nav');

  const categories = ['scenography', 'technical', 'entertainment'] as const;

  return (
    <>
      {/* Hero video */}
      <section className="relative h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/KWERK_VDEF_16.9.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* Intro statement */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="zoomIn">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[15px] leading-[1.7] text-primary/80">
              {t('subtitle')}
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Image grid - 3 columns */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <AnimatedSection animation="fadeUp">
          <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              <Image
                src="/images/galerie/saint-honore/SHO_8EME.jpeg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              <Image
                src="/images/event/Terrasse_MAD.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              <Image
                src="/images/galerie/saint-honore/Traiteur.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Experience section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="zoomIn">
          <div className="max-w-[640px] mx-auto">
            <h2 className="text-[18px] uppercase tracking-[2px] font-medium text-primary mb-6">
              {t('experienceTitle')}
            </h2>
            <p className="text-[14px] leading-[1.7] text-primary/70">
              {t('experienceDescription')}
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Details section - images left, text right */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row gap-16 lg:gap-24">
          {/* Images grid */}
          <AnimatedSection animation="fadeRight" className="flex-1">
            <div className="grid grid-cols-2 gap-5">
              <div className="relative h-[300px] md:h-[400px] overflow-hidden col-span-2">
                <Image
                  src="/images/galerie/saint-honore/Event_SHO_Lobby.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative h-[200px] md:h-[280px] overflow-hidden">
                <Image
                  src="/images/event/Winter_Party_1.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-[200px] md:h-[280px] overflow-hidden">
                <Image
                  src="/images/galerie/saint-honore/Traiteur_2.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Text + categories */}
          <AnimatedSection animation="fadeLeft" className="flex-1 flex flex-col justify-center">
            <h3 className="text-[16px] uppercase tracking-[2px] font-bold text-primary mb-5">
              {t('detailTitle')}
            </h3>
            <p className="text-[14px] leading-[1.7] text-primary/70 mb-10">
              {t('detailDescription')}
            </p>

            <div className="space-y-8">
              {categories.map((cat) => (
                <div key={cat}>
                  <h4 className="text-[13px] uppercase tracking-[1.5px] text-primary/80 pb-3 border-b border-[#ccc] mb-4">
                    {t(`${cat}.name`)}
                  </h4>
                  <ul className="space-y-2">
                    {t(`${cat}.items`).split('|').map((item, i) => (
                      <li
                        key={i}
                        className="text-[13px] leading-[1.6] text-primary/60 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-secondary/50"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-primary text-center">
        <AnimatedSection animation="zoomIn">
          <h2 className="text-[15px] uppercase tracking-[2.5px] text-white/60 mb-6">
            {t('title')}
          </h2>
          <p className="font-heading text-2xl md:text-3xl text-white max-w-2xl mx-auto leading-relaxed">
            {t('experienceTitle')}
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
