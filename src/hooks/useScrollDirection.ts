'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const update = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Only update scrollY state when crossing meaningful thresholds
    // (avoids re-renders on every single pixel)
    const prevBucket = Math.floor(lastScrollY.current / 50);
    const currBucket = Math.floor(currentScrollY / 50);
    if (prevBucket !== currBucket) {
      setScrollY(currentScrollY);
    }

    if (Math.abs(currentScrollY - lastScrollY.current) > 8) {
      const newDir = currentScrollY > lastScrollY.current ? 'down' : 'up';
      setScrollDirection((prev) => (prev !== newDir ? newDir : prev));
      lastScrollY.current = currentScrollY;
    }

    ticking.current = false;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [update]);

  return { scrollDirection, scrollY };
}
