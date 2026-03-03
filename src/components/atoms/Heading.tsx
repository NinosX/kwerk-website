import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  children: ReactNode;
  className?: string;
  subtitle?: string;
}

const tagStyles = {
  h1: 'text-4xl md:text-5xl lg:text-6xl',
  h2: 'text-3xl md:text-4xl lg:text-5xl',
  h3: 'text-2xl md:text-3xl',
  h4: 'text-xl md:text-2xl',
};

export default function Heading({
  as: Tag = 'h2',
  children,
  className,
  subtitle,
}: HeadingProps) {
  return (
    <div className="text-center mb-12">
      <Tag
        className={cn(
          'font-heading font-bold text-primary leading-tight',
          tagStyles[Tag],
          className,
        )}
      >
        {children}
      </Tag>
      {subtitle && (
        <p className="mt-4 text-lg text-text-light max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
