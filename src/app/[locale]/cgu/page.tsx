import { useTranslations } from 'next-intl';
import { brand } from '@/theme';
import AnimatedSection from '@/components/atoms/AnimatedSection';

export default function CGUPage() {
  const t = useTranslations('cgu');

  return (
    <>
      <div className="h-20" />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <AnimatedSection>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
            {t('title')}
          </h1>
          <p className="text-text-light text-sm mb-12">
            {t('lastUpdated')}: 01/01/2025
          </p>

          <div className="prose prose-sm max-w-none text-text-main space-y-8">
            <section>
              <h2 className="font-heading text-xl font-bold text-primary">
                1. Objet
              </h2>
              <p className="text-text-light leading-relaxed">
                Les presentes Conditions Generales d&apos;Utilisation (CGU)
                regissent l&apos;utilisation du site internet {brand.name}
                exploite par {brand.legal.companyName}, societe par actions
                simplifiee immatriculee au RCS de Paris sous le numero{' '}
                {brand.legal.rcs}.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-primary">
                2. Acces au site
              </h2>
              <p className="text-text-light leading-relaxed">
                Le site est accessible gratuitement a tout utilisateur disposant
                d&apos;un acces a Internet. Tous les couts relatifs a
                l&apos;acces au site, que ce soient les frais materiels,
                logiciels ou d&apos;acces a Internet, sont exclusivement a la
                charge de l&apos;utilisateur.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-primary">
                3. Propriete intellectuelle
              </h2>
              <p className="text-text-light leading-relaxed">
                L&apos;ensemble des contenus presents sur le site (textes,
                images, logos, icones, sons, logiciels) sont proteges par les
                lois francaises et internationales relatives a la propriete
                intellectuelle. Toute reproduction, representation,
                modification, publication, ou adaptation de tout ou partie des
                elements du site est interdite sans autorisation ecrite
                prealable.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-primary">
                4. Donnees personnelles
              </h2>
              <p className="text-text-light leading-relaxed">
                Les informations collectees via le formulaire de contact sont
                destinees exclusivement a {brand.legal.companyName} et ne seront
                en aucun cas cedees a des tiers. Conformement au RGPD, vous
                disposez d&apos;un droit d&apos;acces, de rectification et de
                suppression de vos donnees en contactant{' '}
                {brand.contact.email}.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-primary">
                5. Cookies
              </h2>
              <p className="text-text-light leading-relaxed">
                Le site peut utiliser des cookies a des fins de mesure
                d&apos;audience et d&apos;amelioration de l&apos;experience
                utilisateur. L&apos;utilisateur peut configurer son navigateur
                pour refuser les cookies.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-primary">
                6. Limitation de responsabilite
              </h2>
              <p className="text-text-light leading-relaxed">
                {brand.legal.companyName} ne saurait etre tenue responsable des
                dommages directs ou indirects causes au materiel de
                l&apos;utilisateur lors de l&apos;acces au site. Le site est
                fourni &quot;en l&apos;etat&quot; sans garantie d&apos;aucune
                sorte.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-primary">
                7. Droit applicable
              </h2>
              <p className="text-text-light leading-relaxed">
                Les presentes CGU sont regies par le droit francais. Tout litige
                relatif a leur interpretation et/ou execution releve des
                tribunaux competents de Paris.
              </p>
            </section>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
