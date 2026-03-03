import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { locations, getLocationBySlug } from '@/data/locations';
import HeroSection from '@/components/organisms/HeroSection';
import AnimatedSection from '@/components/atoms/AnimatedSection';
import AmenityBadge from '@/components/molecules/AmenityBadge';
import Button from '@/components/atoms/Button';
import { formatNumber } from '@/lib/utils';

export function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  return <LocationContent slug={slug} />;
}

function LocationContent({ slug }: { slug: string }) {
  const location = getLocationBySlug(slug)!;
  const t = useTranslations('locations');

  return (
    <>
      <HeroSection
        title={t(`${slug}.name`)}
        subtitle={t(`${slug}.description`)}
        image={location.heroImage}
        height="large"
        showCta
        ctaText={t('contactCta')}
        ctaHref={`/contact?centre=${slug}`}
      />

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-alt">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-heading font-bold text-secondary">
                  {formatNumber(location.surface)}
                </p>
                <p className="text-sm text-text-light mt-1">{t('surface')}</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-secondary">
                  {location.zipCode}
                </p>
                <p className="text-sm text-text-light mt-1">{location.city}</p>
              </div>
              <div>
                <p className="text-lg font-heading font-bold text-secondary">
                  {t(`${slug}.metro`)}
                </p>
                <p className="text-sm text-text-light mt-1">{t('metro')}</p>
              </div>
              <div>
                <p className="text-lg font-heading font-bold text-secondary">
                  {t(`${slug}.capacity`)}
                </p>
                <p className="text-sm text-text-light mt-1">{t('capacity')}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-8">
            {t('highlights')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {location.highlights.map((hl) => (
              <div
                key={hl}
                className="flex items-center gap-3 p-4 bg-bg-alt rounded-sm"
              >
                <svg
                  className="w-5 h-5 text-secondary shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-text-main">{hl}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Amenities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-alt">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-8">
              {t('amenities')}
            </h2>
            <div className="flex flex-wrap gap-3">
              {location.amenities.map((amenity) => (
                <AmenityBadge key={amenity} label={amenity} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
            {t('gallery')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {location.images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-sm"
              >
                <Image
                  src={img}
                  alt={`${location.name} ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-center">
        <AnimatedSection>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
            {t('contactCta')}
          </h2>
          <Button href={`/contact?centre=${slug}`} variant="secondary" size="lg">
            {t('contactCta')}
          </Button>
        </AnimatedSection>
      </section>
    </>
  );
}
