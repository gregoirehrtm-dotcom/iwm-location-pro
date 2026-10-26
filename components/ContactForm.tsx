"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="c-name" className="label">Nom</label>
        <input id="c-name" className="field" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-e" : undefined} {...register("name")} />
        {errors.name && <p id="c-name-e" className="error" role="alert">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="c-email" className="label">E-mail</label>
        <input id="c-email" type="email" className="field" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-e" : undefined} {...register("email")} />
        {errors.email && <p id="c-email-e" className="error" role="alert">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="c-phone" className="label">Téléphone (facultatif)</label>
        <input id="c-phone" type="tel" className="field" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "c-phone-e" : undefined} {...register("phone")} />
        {errors.phone && <p id="c-phone-e" className="error" role="alert">{errors.phone.message}</p>}
      </div>
      <div>
        <label htmlFor="c-msg" className="label">Votre chantier</label>
        <textarea id="c-msg" rows={5} className="field" aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-msg-e" : undefined} {...register("message")} />
        {errors.message && <p id="c-msg-e" className="error" role="alert">{errors.message.message}</p>}
      </div>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("website")} />
      <button className="btn btn-primary w-full sm:w-auto" disabled={isSubmitting}>{isSubmitting ? "Envoi…" : "Envoyer"}</button>
      <div aria-live="polite">
        {status === "ok" && <p className="font-semibold text-success-dark">Merci, nous vous répondons sous 24 h.</p>}
        {status === "error" && <p className="error">Envoi impossible. Appelez-nous au 076 361 66 14.</p>}
      </div>
    </form>
  );
}
