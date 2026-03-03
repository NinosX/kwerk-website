'use client';

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [done, setDone] = useState(false);

  // Once animation completes, render a plain div (no transform = no text blur)
  if (done) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={v}
      transition={{ delay }}
      onAnimationComplete={() => setDone(true)}
      className={className}
    >
      {children}
    </motion.div>
  );
}
