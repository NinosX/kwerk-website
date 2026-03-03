'use client';

import { motion } from 'framer-motion';

interface EventCardProps {
  icon: string;
  name: string;
  description: string;
  index: number;
}

const icons: Record<string, string> = {
  culinary:
    'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  entertainment:
    'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
  technical:
    'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  scenography:
    'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
};

export default function EventCard({
  icon,
  name,
  description,
  index,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="p-8 bg-surface border border-border rounded-sm hover:border-secondary transition-all duration-300"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-bg-alt rounded-full mb-6">
        <svg
          className="w-6 h-6 text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d={icons[icon] || icons.culinary}
          />
        </svg>
      </div>
      <h3 className="font-heading text-xl font-bold text-primary mb-3">
        {name}
      </h3>
      <p className="text-text-light text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
