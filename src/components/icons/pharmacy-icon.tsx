export type PharmacyIconType = 'current' | 'next';

interface PharmacyIconProps {
  /** Type of pharmacy marker icon to display */
  type: PharmacyIconType;
  /** Size of the icon in pixels */
  size?: number;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * PharmacyIcon component
 * Renders custom SVG icons for different pharmacy marker types
 * Replace the placeholder SVGs below with your custom designs
 */
export function PharmacyIcon({ type, size = 24, className = '' }: PharmacyIconProps) {
  const baseClasses = className;

  switch (type) {
    case 'current':
      // Green pharmacy cross for current shift
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={baseClasses}
        >
          <g stroke="#22C55E" strokeWidth="1.5">
            <path d="M13.9 18h-3.8a.6.6 0 0 1-.6-.6v-2.3a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 1-.6-.6v-3.8a.6.6 0 0 1 .6-.6h2.3a.6.6 0 0 0 .6-.6V6.6a.6.6 0 0 1 .6-.6h3.8a.6.6 0 0 1 .6.6v2.3a.6.6 0 0 0 .6.6h2.3a.6.6 0 0 1 .6.6v3.8a.6.6 0 0 1-.6.6h-2.3a.6.6 0 0 0-.6.6v2.3a.6.6 0 0 1-.6.6Z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"
            />
          </g>
        </svg>
      );

    case 'next':
      // Grey pharmacy cross for next shift
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={baseClasses}
        >
          <g stroke="#6B7280" strokeWidth="1.5">
            <path d="M13.9 18h-3.8a.6.6 0 0 1-.6-.6v-2.3a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 1-.6-.6v-3.8a.6.6 0 0 1 .6-.6h2.3a.6.6 0 0 0 .6-.6V6.6a.6.6 0 0 1 .6-.6h3.8a.6.6 0 0 1 .6.6v2.3a.6.6 0 0 0 .6.6h2.3a.6.6 0 0 1 .6.6v3.8a.6.6 0 0 1-.6.6h-2.3a.6.6 0 0 0-.6.6v2.3a.6.6 0 0 1-.6.6Z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"
            />
          </g>
        </svg>
      );

    default:
      return null;
  }
}
