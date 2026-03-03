'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/atoms/Button';
import { brand } from '@/theme';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  image?: string;
  images?: string[];
  showCta?: boolean;
  ctaHref?: string;
  ctaText?: string;
  overlay?: boolean;
  height?: 'full' | 'large' | 'medium';
  /** Pure image hero with no text overlay (like kwerk.fr homepage) */
  clean?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  image,
  images,
  showCta = false,
  ctaHref,
  ctaText,
  overlay = true,
  height = 'full',
  clean = false,
}: HeroSectionProps) {
  const t = useTranslations('hero');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Slideshow: two-layer crossfade (no blank frame)
  const slideImages = images || (image ? [image] : []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (slideImages.length <= 1) return;
    const interval = setInterval(() => {
      setPreviousSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
      setIsTransitioning(true);
      const timeout = setTimeout(() => setIsTransitioning(false), 1000);
      return () => clearTimeout(timeout);
    }, 7000);
    return () => clearInterval(interval);
  }, [slideImages.length, currentSlide]);

  const heroTitle = title || t('title');
  const heroSubtitle = subtitle || t('subtitle');

  const heightClasses = {
    full: 'h-screen',
    large: 'h-[80vh]',
    medium: 'h-[60vh]',
  };

  return (
    <section ref={ref} className={`relative ${heightClasses[height]} overflow-hidden`}>
      {/* Background images - two layers stacked, no gaps */}
      <div className="absolute inset-0">
        {/* Bottom layer (previous or current) */}
        {slideImages.length > 0 && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slideImages[isTransitioning ? previousSlide : currentSlide]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        {/* Top layer (fades in during transition) */}
        {slideImages.length > 1 && (
          <div
            className="absolute inset-0 transition-opacity duration-[800ms] ease-in-out"
            style={{
              backgroundImage: `url(${slideImages[currentSlide]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: isTransitioning ? 1 : (currentSlide === previousSlide ? 1 : 1),
            }}
          />
        )}
        {/* Fallback bg if no images */}
        {slideImages.length === 0 && (
          <div className="absolute inset-0 bg-primary" />
        )}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        )}
      </div>

      {/* Content */}
      {!clean ? (
        <motion.div
          style={{ opacity }}
          className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-secondary/90 text-[11px] uppercase tracking-[4px] mb-8 font-light"
          >
            {brand.name}
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight"
            >
              {heroTitle}
            </motion.h1>
          </div>
          {subtitle && (
            <div className="overflow-hidden">
              <motion.p
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-6 text-[15px] md:text-lg text-white/75 max-w-2xl leading-relaxed font-light"
              >
                {heroSubtitle}
              </motion.p>
            </div>
          )}
          {showCta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12"
            >
              <Button
                href={ctaHref || '/contact'}
                variant="secondary"
                size="lg"
              >
                {ctaText || t('cta')}
              </Button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        /* Clean hero: just the logo centered like kwerk.fr */
        <motion.div
          style={{ opacity }}
          className="relative z-20 flex flex-col items-center justify-center h-full"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center"
          >
            <span className="font-heading text-3xl md:text-4xl tracking-[0.2em] font-bold text-white">
              {brand.name}
            </span>
            <p className="text-[11px] uppercase tracking-[3px] text-white/60 mt-2">
              {brand.tagline}
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Scroll indicator */}
      {height === 'full' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="w-[1px] h-12 bg-white/30"
          />
        </motion.div>
      )}
    </section>
  );
}
