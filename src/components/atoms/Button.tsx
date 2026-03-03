import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: ReactNode;
}

const variants = {
  primary:
    'bg-primary text-text-inverse hover:bg-primary-light',
  secondary:
    'bg-secondary text-text-inverse hover:bg-secondary-light',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-text-inverse',
  ghost:
    'text-primary hover:bg-bg-alt',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-sm tracking-wide',
    variants[variant],
    sizes[size],
    props.disabled && 'opacity-50 cursor-not-allowed',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
