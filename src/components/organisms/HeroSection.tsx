'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
}: HeroSectionProps) {
  const t = useTranslations('hero');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Slideshow logic
  const slideImages = images || (image ? [image] : []);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slideImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slideImages.length]);

  const heroTitle = title || t('title');
  const heroSubtitle = subtitle || t('subtitle');

  const heightClasses = {
    full: 'h-screen',
    large: 'h-[80vh]',
    medium: 'h-[60vh]',
  };

  return (
    <section ref={ref} className={`relative ${heightClasses[height]} overflow-hidden`}>
      {/* Background with parallax + slideshow */}
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
            style={
              slideImages[currentSlide]
                ? {
                    backgroundImage: `url(${slideImages[currentSlide]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : { backgroundColor: 'var(--color-primary)' }
            }
          />
        </AnimatePresence>
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-10" />
        )}
      </motion.div>

      {/* Content */}
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

        {/* Scroll indicator */}
        {height === 'full' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="w-[1px] h-12 bg-white/30"
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
