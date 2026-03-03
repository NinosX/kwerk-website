'use client';

import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: string;
  name: string;
  description: string;
  index: number;
}

const icons: Record<string, string> = {
  dana: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  barista:
    'M8 16H6a2 2 0 01-2-2V6h16v8a2 2 0 01-2 2h-2m-4 0v4m-4 0h8',
  sport:
    'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  wellness:
    'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
};

export default function ServiceCard({
  icon,
  name,
  description,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group p-8 bg-surface border border-border rounded-sm hover:border-secondary transition-all duration-300"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-bg-alt rounded-full mb-6 group-hover:bg-secondary/10 transition-colors">
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
            d={icons[icon] || icons.dana}
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
