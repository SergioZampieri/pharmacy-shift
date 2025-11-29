'use client';

import { FacebookIcon, InstagramIcon, TwitterIcon } from '@/components/icons';
import { getShiftBadgeText } from '@/lib/format-time';
import { openNavigation } from '@/lib/navigation';

import type { Pharmacy } from '@/lib/schemas/pharmacy';

interface PharmacyDetailCardProps {
  pharmacy: Pharmacy;
  isCurrentShift: boolean;
  countdown: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  onClose?: () => void;
}

/**
 * PharmacyDetailCard component
 * Displays detailed information about a selected pharmacy
 */
export function PharmacyDetailCard({ pharmacy, isCurrentShift, countdown, onClose }: PharmacyDetailCardProps) {
  const handleNavigate = () => {
    openNavigation(pharmacy.loc[0], pharmacy.loc[1], pharmacy.nombre);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          backdropFilter: 'blur(4px)',
        }}
        onClick={handleBackdropClick}
      />

      {/* Modal card */}
      <div className="fixed top-1/2 left-1/2 z-9999 max-h-[80vh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="m-0 text-xl font-semibold text-gray-900 dark:text-gray-100">{pharmacy.nombre}</h3>
              <span
                className={`rounded px-2 py-1 text-xs font-bold text-white ${
                  isCurrentShift ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-500 dark:bg-gray-600'
                }`}
              >
                {getShiftBadgeText(isCurrentShift, countdown.hours, countdown.minutes)}
              </span>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="cursor-pointer border-none bg-transparent p-1 text-2xl leading-none text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              title="Close"
            >
              ×
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2 text-gray-900 dark:text-gray-100">
          <div>
            <strong>Address:</strong> {pharmacy.direccion}
          </div>
          <div>
            <strong>Phone:</strong>{' '}
            <a href={`tel:${pharmacy.telefono}`} className="text-blue-600 hover:underline dark:text-blue-400">
              {pharmacy.telefono}
            </a>
          </div>

          {pharmacy.whatsapp && (
            <div>
              <strong>WhatsApp:</strong>{' '}
              <a
                href={`https://wa.me/${pharmacy.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline dark:text-green-400"
              >
                {pharmacy.whatsapp}
              </a>
            </div>
          )}

          {pharmacy.email && (
            <div>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${pharmacy.email}`} className="text-blue-600 hover:underline dark:text-blue-400">
                {pharmacy.email}
              </a>
            </div>
          )}

          {pharmacy.descripcion && (
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">{pharmacy.descripcion}</div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleNavigate}
            className="flex-1 cursor-pointer rounded-xl border-none bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Navigate
          </button>

          {(pharmacy.facebook || pharmacy.instagram || pharmacy.twitter) && (
            <div className="flex gap-2">
              {pharmacy.facebook && (
                <a
                  href={`https://facebook.com/${pharmacy.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-12 w-12 overflow-hidden rounded-lg no-underline transition-opacity hover:opacity-80"
                  title="Facebook"
                >
                  <FacebookIcon className="h-12 w-12" />
                </a>
              )}
              {pharmacy.instagram && (
                <a
                  href={`https://instagram.com/${pharmacy.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-12 w-12 overflow-hidden rounded-lg no-underline transition-opacity hover:opacity-80"
                  title="Instagram"
                >
                  <InstagramIcon className="h-12 w-12" />
                </a>
              )}
              {pharmacy.twitter && (
                <a
                  href={`https://twitter.com/${pharmacy.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-12 w-12 overflow-hidden rounded-lg no-underline transition-opacity hover:opacity-80"
                  title="Twitter"
                >
                  <TwitterIcon className="h-12 w-12" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
