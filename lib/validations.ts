import { z } from "zod";

const phone = z
  .string()
  .trim()
  .regex(/^[+\d][\d\s().-]{7,19}$/, "Numéro de téléphone invalide");

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Nom requis").max(100),
  email: z.string().trim().email("E-mail invalide").max(200),
  phone: phone.optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message trop court (10 caractères min.)").max(3000),
  website: z.string().max(0).optional(), // honeypot
});
export type ContactInput = z.infer<typeof contactSchema>;

export const estimateSchema = z.object({
  model: z.enum(["6m", "8m", "10m", "12m"]),
  days: z.coerce.number().int().min(1).max(365),
});

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date requise");

export const bookingStep1 = z
  .object({
    model: z.enum(["6m", "8m", "10m", "12m"]),
    startDate: isoDate,
    endDate: isoDate,
  })
  .refine((d) => d.endDate >= d.startDate, { path: ["endDate"], message: "La fin doit suivre le début" });

export const bookingStep2 = z
  .object({
    delivery: z.enum(["pickup", "delivery"]),
    postalCode: z.string().trim().optional(),
    siteAddress: z.string().trim().optional(),
  })
  .superRefine((d, ctx) => {
    if (d.delivery === "delivery") {
      if (!/^\d{4}$/.test(d.postalCode ?? ""))
        ctx.addIssue({ code: "custom", path: ["postalCode"], message: "NPA à 4 chiffres requis" });
      if (!d.siteAddress || d.siteAddress.length < 5)
        ctx.addIssue({ code: "custom", path: ["siteAddress"], message: "Adresse du chantier requise" });
    }
  });

export const bookingStep3 = z.object({
  customerType: z.enum(["individual", "company"]),
  company: z.string().trim().max(150).optional(),
  name: z.string().trim().min(2, "Nom requis").max(100),
  email: z.string().trim().email("E-mail invalide"),
  phone,
  notes: z.string().trim().max(2000).optional(),
});

export const bookingStep4 = z.object({
  signature: z.string().trim().min(2, "Tapez votre nom complet pour signer"),
  accept: z.literal(true, { errorMap: () => ({ message: "Vous devez accepter les conditions" }) }),
});

export const bookingSchema = z.intersection(
  z.intersection(bookingStep1, bookingStep2),
  z.intersection(bookingStep3, bookingStep4),
);
export type BookingInput = z.infer<typeof bookingSchema>;
