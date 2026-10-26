import { z } from "zod";

const text = (max: number) => z.string().trim().min(1).max(max);
const phone = z.string().trim().regex(/^[+0-9 ()./-]{7,20}$/, "Numéro invalide");
const modelId = z.enum(["6m", "8m", "10m", "12m"]);

export const estimateSchema = z.object({ model: modelId, days: z.coerce.number().int().min(1).max(365) });

export const contactSchema = z.object({
  name: text(100),
  email: z.string().trim().email().max(150),
  phone: phone.optional().or(z.literal("")),
  message: text(2000),
});

export const bookingSchema = z.object({
  model: modelId,
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  deliveryMode: z.enum(["delivery", "pickup"]),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  postalCode: z.string().trim().max(10).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  name: text(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(150),
  phone,
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  signature: text(100),
  acceptTerms: z.literal(true),
}).refine((d) => d.endDate >= d.startDate, { path: ["endDate"], message: "La date de fin doit suivre la date de début" })
  .refine((d) => d.deliveryMode === "pickup" || (!!d.address && !!d.city && !!d.postalCode), { path: ["address"], message: "Adresse de livraison requise" });

export type ContactInput = z.infer<typeof contactSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
