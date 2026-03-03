'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [scrollY, setScrollY] = useState(0);
  const anchorY = useRef(0);
  const currentDir = useRef<'up' | 'down'>('up');
  const ticking = useRef(false);

  const update = useCallback(() => {
    const y = window.scrollY;
    setScrollY(y);

    const distance = y - anchorY.current;

    // Only switch direction after sustained scroll of 60px
    if (currentDir.current === 'up' && distance > 60) {
      currentDir.current = 'down';
      anchorY.current = y;
      setScrollDirection('down');
    } else if (currentDir.current === 'down' && distance < -60) {
      currentDir.current = 'up';
      anchorY.current = y;
      setScrollDirection('up');
    }

    // Keep anchor fresh: if user keeps scrolling same direction,
    // move anchor forward so reversal needs a full 60px
    if (currentDir.current === 'down' && distance > 0) {
      anchorY.current = y;
    } else if (currentDir.current === 'up' && distance < 0) {
      anchorY.current = y;
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
