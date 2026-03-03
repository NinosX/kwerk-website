'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { Location } from '@/types';
import { formatNumber } from '@/lib/utils';

interface LocationCardProps {
  location: Location;
  index: number;
}

export default function LocationCard({ location, index }: LocationCardProps) {
  const t = useTranslations('locations');
  const locale = useLocale();
  const prefix = locale === 'en' ? '/en' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={`${prefix}/adresses/${location.slug}`}
        className="group block relative overflow-hidden rounded-sm bg-surface"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={location.heroImage}
            alt={location.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-heading text-2xl font-bold text-white mb-1">
              {t(`${location.slug}.name`)}
            </h3>
            <p className="text-white/80 text-sm">
              {t(`${location.slug}.address`)} &mdash;{' '}
              {formatNumber(location.surface)} {t('surface')}
            </p>
          </div>
        </div>
        <div className="p-5">
          <p className="text-text-light text-sm line-clamp-2">
            {t(`${location.slug}.description`)}
          </p>
          <span className="inline-flex items-center mt-3 text-secondary text-sm font-medium group-hover:gap-2 transition-all">
            {t('discover')}
            <svg
              className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
