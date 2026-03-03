'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

interface LuxuryImageHoverProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  label?: string;
}

export default function LuxuryImageHover({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  label = 'Découvrir',
}: LuxuryImageHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div ref={containerRef} className={`relative overflow-hidden group ${className}`}>
      {/* Parallax image */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: prefersReducedMotion ? 0 : y,
          height: '120%',
          top: '-10%',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes={sizes}
          priority={priority}
        />
      </motion.div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-[1]" />

      {/* Hover label */}
      <div className="absolute inset-0 flex items-center justify-center z-[2]">
        <span className="text-[12px] uppercase tracking-[2px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
          {label}
        </span>
      </div>
    </div>
  );
}
