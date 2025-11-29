'use client';

import { Marker } from 'react-map-gl/maplibre';

import { PharmacyIcon } from '@/components/icons';
import { useMapStore } from '@/stores';

import type { PharmacyIconType } from '@/components/icons';
import type { Pharmacy } from '@/lib/schemas/pharmacy';

interface PharmacyMarkerProps {
  pharmacy: Pharmacy;
  /** Whether this pharmacy is on current shift (vs next shift) */
  isCurrentShift: boolean;
}

/**
 * PharmacyMarker component
 * Renders a map marker for a pharmacy with shift-based styling
 */
export function PharmacyMarker({ pharmacy, isCurrentShift }: PharmacyMarkerProps) {
  const { selectedPharmacy, selectPharmacy } = useMapStore();

  const isSelected = selectedPharmacy?._id === pharmacy._id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling to map
    selectPharmacy(pharmacy);
  };

  // Determine icon type based on shift status
  const iconType: PharmacyIconType = isCurrentShift ? 'current' : 'next';

  return (
    <Marker latitude={pharmacy.loc[0]} longitude={pharmacy.loc[1]} anchor="bottom">
      <div
        className={`cursor-pointer transition-all duration-200 ease-in-out ${isSelected ? 'drop-shadow-md' : ''}`}
        title={pharmacy.nombre}
        onClick={handleClick}
      >
        <PharmacyIcon type={iconType} size={isSelected ? 32 : 24} />
      </div>
    </Marker>
  );
}
