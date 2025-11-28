import { z } from 'zod';

/**
 * Helper to transform empty strings to undefined for optional fields
 */
const optionalString = z
  .string()
  .optional()
  .transform((val) => (val === '' ? undefined : val));

/**
 * Helper for optional email fields that may be empty strings
 */
const optionalEmail = z
  .string()
  .optional()
  .transform((val) => (val === '' ? undefined : val))
  .pipe(z.string().email().optional());

/**
 * Helper for optional URL fields that may be empty strings
 */
const optionalUrl = z
  .string()
  .optional()
  .transform((val) => (val === '' ? undefined : val))
  .pipe(z.string().url().optional());

/**
 * Pharmacy object schema
 */
export const PharmacySchema = z.object({
  _id: z.string(), // MongoDB ObjectId
  publicado: z.boolean(),
  nombre: z.string(),
  direccion: z.string(),
  telefono: z.string(),
  email: optionalEmail,
  whatsapp: optionalString,
  facebook: optionalString,
  instagram: optionalString,
  twitter: optionalString,
  loc: z.tuple([z.number(), z.number()]), // [latitude, longitude]
  portada: optionalUrl,
  descripcion: optionalString,
});

/**
 * API response schema from /api/turno endpoint
 */
export const ShiftResponseSchema = z.object({
  turnoAhoraId: z.number(), // Current shift ID (YYYYMMDD format)
  tActual: z.string(), // Server timestamp
  ahora: z.string(), // Current UTC time
  horaLocal: z.number().min(0).max(23), // Local hour (0-23)
  minutoLocal: z.number().min(0).max(59), // Local minute (0-59)
  deTurnoAhora: z.array(PharmacySchema), // Pharmacies currently on duty
  deTurnoProximo: z.array(PharmacySchema), // Pharmacies on next shift
});

/**
 * TypeScript types inferred from Zod schemas
 */
export type Pharmacy = z.infer<typeof PharmacySchema>;
export type ShiftResponse = z.infer<typeof ShiftResponseSchema>;
