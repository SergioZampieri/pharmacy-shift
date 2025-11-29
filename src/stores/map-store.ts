import { create } from 'zustand';

import type { Pharmacy } from '@/lib/schemas/pharmacy';

/**
 * Map state interface
 */
interface MapState {
  /** Currently selected pharmacy (shown in detail view) */
  selectedPharmacy: Pharmacy | null;
  /** Map center coordinates [latitude, longitude] */
  center: [number, number];
  /** Map zoom level */
  zoom: number;
  /** Actions */
  selectPharmacy: (pharmacy: Pharmacy | null) => void;
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
  /** Reset map to default position */
  resetMap: () => void;
}

/**
 * Default map configuration
 * Centered on Tandil, Argentina
 */
const DEFAULT_CENTER: [number, number] = [-37.3217, -59.1332];
const DEFAULT_ZOOM = 13;

/**
 * Zustand store for map state
 * Manages selected pharmacy, map center, and zoom level
 */
export const useMapStore = create<MapState>((set) => ({
  selectedPharmacy: null,
  center: DEFAULT_CENTER,
  zoom: DEFAULT_ZOOM,

  selectPharmacy: (pharmacy) =>
    set({
      selectedPharmacy: pharmacy,
      // Center map on selected pharmacy if provided
      ...(pharmacy && {
        center: [pharmacy.loc[0], pharmacy.loc[1]],
        zoom: 15, // Zoom in when selecting a pharmacy
      }),
    }),

  setCenter: (center) => set({ center }),

  setZoom: (zoom) => set({ zoom }),

  resetMap: () =>
    set({
      selectedPharmacy: null,
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    }),
}));
