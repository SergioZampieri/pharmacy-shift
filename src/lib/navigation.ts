/**
 * Mobile navigation utilities for deep linking to map apps
 * No API key required - uses URL schemes
 */

/**
 * Opens navigation to a pharmacy location in the user's preferred map app
 * Works on both mobile and desktop without requiring any API keys
 *
 * @param latitude - Destination latitude
 * @param longitude - Destination longitude
 * @param pharmacyName - Optional pharmacy name for better UX
 */
export function openNavigation(latitude: number, longitude: number, pharmacyName?: string): void {
  // Construct Google Maps URL (works on all platforms)
  // Format: https://www.google.com/maps/dir/?api=1&destination=lat,lon
  const destination = `${latitude},${longitude}`;
  const label = pharmacyName ? `&destination_place_id=${encodeURIComponent(pharmacyName)}` : '';
  const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}${label}`;

  // Open in new tab/window
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Constructs a Google Maps search URL for a pharmacy
 * Useful for showing the pharmacy location without navigation
 *
 * @param latitude - Pharmacy latitude
 * @param longitude - Pharmacy longitude
 * @param pharmacyName - Optional pharmacy name
 * @returns Google Maps URL
 */
export function getMapViewUrl(latitude: number, longitude: number, pharmacyName?: string): string {
  const query = pharmacyName ? encodeURIComponent(pharmacyName) : `${latitude},${longitude}`;
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Checks if the device likely supports native map apps
 * Useful for showing/hiding navigation buttons on desktop
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
