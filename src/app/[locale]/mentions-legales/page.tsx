import { useTranslations } from 'next-intl';
import { brand } from '@/theme';
import AnimatedSection from '@/components/atoms/AnimatedSection';

export default function MentionsLegalesPage() {
  const t = useTranslations('legal');

  return (
    <>
      <div className="h-20" />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <AnimatedSection>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-12">
            {t('title')}
          </h1>

          <div className="space-y-10">
            <section>
              <h2 className="font-heading text-xl font-bold text-primary mb-4">
                {t('editor')}
              </h2>
              <div className="text-text-light text-sm leading-relaxed space-y-1">
                <p>
                  <strong>{brand.legal.companyName}</strong>
                </p>
                <p>Societe par Actions Simplifiee (SAS)</p>
                <p>RCS Paris {brand.legal.rcs}</p>
                <p>Siege social : {brand.legal.address}</p>
                <p>Directeur de la publication : {brand.legal.director}</p>
                <p>
                  Email :{' '}
                  <a
                    href={`mailto:${brand.contact.email}`}
                    className="text-secondary hover:underline"
                  >
                    {brand.contact.email}
                  </a>
                </p>
                <p>
                  Telephone :{' '}
                  <a
                    href={`tel:${brand.contact.phone.replace(/\s/g, '')}`}
                    className="text-secondary hover:underline"
                  >
                    {brand.contact.phone}
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-primary mb-4">
                {t('hosting')}
              </h2>
              <div className="text-text-light text-sm leading-relaxed space-y-1">
                <p>
                  <strong>Vercel Inc.</strong>
                </p>
                <p>340 S Lemon Ave #4133</p>
                <p>Walnut, CA 91789, USA</p>
                <p>
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:underline"
                  >
                    vercel.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-primary mb-4">
                {t('credits')}
              </h2>
              <div className="text-text-light text-sm leading-relaxed space-y-1">
                <p>Conception et developpement : {brand.legal.companyName}</p>
                <p>Photographies : &copy; {brand.legal.companyName}</p>
              </div>
            </section>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
