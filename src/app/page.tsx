'use client';

import { PharmacyIcon } from '@/components/icons';
import { PharmacyMap } from '@/components/map';
import { PharmacyDetailCard } from '@/components/pharmacy';
import { ThemeToggle } from '@/components/ui';
import { usePharmacyShifts, useShiftCountdown } from '@/hooks/use-pharmacy-shifts';
import { useTheme } from '@/hooks/use-theme';
import { useMapStore } from '@/stores';

export default function Home() {
  const { data, isLoading, error, isFetching } = usePharmacyShifts();
  const countdown = useShiftCountdown();
  const { selectedPharmacy, selectPharmacy } = useMapStore();

  // Apply theme
  useTheme();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-lg text-gray-700 dark:text-gray-300">Loading pharmacy shifts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-lg font-semibold text-red-600 dark:text-red-400">Error loading pharmacy shifts</div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{error.message}</div>
        </div>
      </div>
    );
  }

  // Determine if selected pharmacy is on current shift
  const isSelectedOnCurrentShift = selectedPharmacy
    ? (data?.deTurnoAhora.some((p) => p._id === selectedPharmacy._id) ?? false)
    : false;

  return (
    <>
      <div className="flex h-full flex-col">
        {/* Header */}
        <header className="z-20 border-b border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-center justify-between gap-4">
            <h1 className="m-0 text-2xl font-semibold text-gray-900 dark:text-gray-100">Pharmacy Shifts - Tandil</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {isFetching && <span>Refreshing...</span>}
                {!isFetching && (
                  <span>
                    Next shift: {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
                  </span>
                )}
              </div>
              <ThemeToggle />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <PharmacyIcon type="current" size={16} />
              Current shift:{' '}
              <strong className="text-gray-900 dark:text-gray-100">{data?.deTurnoAhora.length || 0}</strong> pharmacies
            </div>
            <div className="flex items-center gap-1">
              <PharmacyIcon type="next" size={16} />
              Next shift:{' '}
              <strong className="text-gray-900 dark:text-gray-100">{data?.deTurnoProximo.length || 0}</strong>{' '}
              pharmacies
            </div>
          </div>
        </header>

        {/* Map Container */}
        <div className="relative flex-1">
          <PharmacyMap />
        </div>
      </div>

      {/* Pharmacy Detail Modal - rendered at root level */}
      {selectedPharmacy && (
        <PharmacyDetailCard
          pharmacy={selectedPharmacy}
          isCurrentShift={isSelectedOnCurrentShift}
          countdown={countdown}
          onClose={() => selectPharmacy(null)}
        />
      )}
    </>
  );
}
