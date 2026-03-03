import { brand } from '@/theme';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export default function Logo({ className, inverted }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <span
        className={`font-heading text-2xl tracking-[0.2em] font-bold ${
          inverted ? 'text-text-inverse' : 'text-primary'
        }`}
      >
        {brand.name}
      </span>
    </Link>
  );
}
