'use client';

import { useCallback, useMemo } from 'react';
import Map, { ViewStateChangeEvent } from 'react-map-gl/maplibre';

import { usePharmacyShifts } from '@/hooks/use-pharmacy-shifts';
import { useTheme } from '@/hooks/use-theme';
import { useFilterStore, useMapStore } from '@/stores';
import { PharmacyMarker } from './pharmacy-marker';

import 'maplibre-gl/dist/maplibre-gl.css';

/**
 * PharmacyMap component
 * Renders an interactive map using MapLibre GL with Zustand state management
 */
export function PharmacyMap() {
  const { center, zoom, setCenter, setZoom, selectPharmacy } = useMapStore();
  const { filter, searchQuery } = useFilterStore();
  const { data } = usePharmacyShifts();
  const { theme } = useTheme();

  const handleMove = useCallback(
    (evt: ViewStateChangeEvent) => {
      setCenter([evt.viewState.latitude, evt.viewState.longitude]);
      setZoom(evt.viewState.zoom);
    },
    [setCenter, setZoom]
  );

  const handleMapClick = useCallback(() => {
    selectPharmacy(null);
  }, [selectPharmacy]);

  // Filter pharmacies based on filter state and search query
  const { currentPharmacies, nextPharmacies } = useMemo(() => {
    if (!data) return { currentPharmacies: [], nextPharmacies: [] };

    const filterBySearch = (pharmacies: typeof data.deTurnoAhora) => {
      if (!searchQuery) return pharmacies;
      const query = searchQuery.toLowerCase();
      return pharmacies.filter(
        (p) => p.nombre.toLowerCase().includes(query) || p.direccion.toLowerCase().includes(query)
      );
    };

    const current = filterBySearch(data.deTurnoAhora);
    const next = filterBySearch(data.deTurnoProximo);

    switch (filter) {
      case 'current':
        return { currentPharmacies: current, nextPharmacies: [] };
      case 'next':
        return { currentPharmacies: [], nextPharmacies: next };
      case 'all':
      default:
        return { currentPharmacies: current, nextPharmacies: next };
    }
  }, [data, filter, searchQuery]);

  return (
    <Map
      initialViewState={{
        latitude: center[0],
        longitude: center[1],
        zoom: zoom,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={`https://tiles.openfreemap.org/styles/${theme === 'dark' ? 'dark' : 'positron'}`}
      onMove={handleMove}
      onClick={handleMapClick}
    >
      {currentPharmacies.map((pharmacy) => (
        <PharmacyMarker key={pharmacy._id} pharmacy={pharmacy} isCurrentShift={true} />
      ))}
      {nextPharmacies.map((pharmacy) => (
        <PharmacyMarker key={pharmacy._id} pharmacy={pharmacy} isCurrentShift={false} />
      ))}
    </Map>
  );
}
