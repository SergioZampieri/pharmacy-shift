import { ShiftResponse, ShiftResponseSchema } from '@/lib/schemas/pharmacy';

/**
 * Fetches current and next pharmacy shift data from our Next.js API route
 * The API route proxies the request to the external API to avoid CORS issues
 * @returns Promise resolving to validated ShiftResponse
 * @throws Error if fetch fails or validation fails
 */
export async function fetchPharmacyShifts(): Promise<ShiftResponse> {
  const response = await fetch('/api/turno', {
    cache: 'no-store', // Disable cache for real-time data
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch pharmacy shifts: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  // Validate response with Zod schema
  const validated = ShiftResponseSchema.parse(data);

  return validated;
}
