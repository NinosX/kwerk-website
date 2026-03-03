import type { BrandTokens } from '@/types';

export type { BrandTokens };

export function getBrandTokens(brand: string): BrandTokens {
  switch (brand) {
    case 'prana':
      return require('./prana').default;
    default:
      return require('./kwerk').default;
  }
}
