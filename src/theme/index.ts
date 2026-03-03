import type { BrandTokens } from '@/types';
import kwerk from './kwerk';
import prana from './prana';

const brands: Record<string, BrandTokens> = {
  kwerk,
  prana,
};

const brandKey = process.env.NEXT_PUBLIC_BRAND || 'kwerk';

export const brand: BrandTokens = brands[brandKey] || kwerk;

export function getBrand(): BrandTokens {
  return brand;
}
