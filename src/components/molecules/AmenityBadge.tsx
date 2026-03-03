interface AmenityBadgeProps {
  label: string;
}

export default function AmenityBadge({ label }: AmenityBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-alt text-text-light text-sm rounded-sm">
      <svg
        className="w-3.5 h-3.5 text-secondary"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      {label}
    </span>
  );
}
