'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import Button from '@/components/atoms/Button';

export default function FloatingCTA() {
  const t = useTranslations('nav');
  const { scrollY } = useScrollDirection();

  return (
    <AnimatePresence>
      {scrollY > 600 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-40 lg:bottom-8 lg:right-8"
        >
          <Button href="/contact" variant="secondary" size="md" className="shadow-lg">
            {t('planVisit')}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
