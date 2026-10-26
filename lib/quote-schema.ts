import { z } from "zod";
import { machines } from "./machines";

const machineSlugs = machines.map((m) => m.slug) as [string, ...string[]];
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

export const quoteSchema = z
  .object({
    name: z.string().trim().min(2, "Indiquez votre nom"),
    company: z.string().trim().max(120).optional().or(z.literal("")),
    email: z.string().trim().email("Adresse e-mail invalide"),
    phone: z
      .string()
      .trim()
      .regex(/^[+0-9 .()-]{10,20}$/, "Numéro de téléphone invalide"),
    machine: z.enum(machineSlugs, { errorMap: () => ({ message: "Choisissez une machine" }) }),
    startDate: z.string().regex(isoDate, "Date de début requise"),
    endDate: z.string().regex(isoDate, "Date de fin requise"),
    location: z.string().trim().min(2, "Indiquez la ville du chantier"),
    delivery: z.boolean().default(false),
    operator: z.boolean().default(false),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
  })
  .refine((d) => d.endDate >= d.startDate, {
    message: "La date de fin doit être après la date de début",
    path: ["endDate"],
  });

export type QuoteInput = z.infer<typeof quoteSchema>;
