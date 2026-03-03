'use client';

import { motion, type Variants } from 'framer-motion';
import { fadeInUp, fadeRight, fadeLeft, zoomIn } from '@/lib/animations';
import type { ReactNode } from 'react';

type AnimationType = 'fadeUp' | 'fadeRight' | 'fadeLeft' | 'zoomIn';

const animationMap: Record<AnimationType, Variants> = {
  fadeUp: fadeInUp,
  fadeRight: fadeRight,
  fadeLeft: fadeLeft,
  zoomIn: zoomIn,
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  variants?: Variants;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className,
  animation = 'fadeUp',
  variants,
  delay = 0,
}: AnimatedSectionProps) {
  const v = variants || animationMap[animation];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={v}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
