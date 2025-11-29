import { NextResponse } from 'next/server';

import { ShiftResponseSchema } from '@/lib/schemas/pharmacy';

const EXTERNAL_API_URL = 'https://farmaciasdeturnotandil.com.ar/api/turno';

/**
 * GET /api/turno
 *
 * Proxy endpoint for fetching pharmacy shift data from external API.
 * This avoids CORS issues by making the request from the server instead of the browser.
 */
export async function GET() {
  try {
    const response = await fetch(EXTERNAL_API_URL, {
      // Disable Next.js cache to always get fresh data
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `External API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Validate the response with Zod
    const validated = ShiftResponseSchema.parse(data);

    return NextResponse.json(validated);
  } catch (error) {
    console.error('Error fetching pharmacy shifts:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch pharmacy shifts',
      },
      { status: 500 }
    );
  }
}
