"use client";

import { useState, type FormEvent } from "react";
import { machines } from "@/lib/machines";
import { quoteSchema } from "@/lib/quote-schema";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "success" | "error";

export default function QuoteForm({ defaultMachine }: { defaultMachine?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      ...Object.fromEntries(fd.entries()),
      delivery: fd.get("delivery") === "on",
      operator: fd.get("operator") === "on",
    };

    const parsed = quoteSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        fieldErrors[key] ??= issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center" role="status">
        <p className="text-xl font-bold text-green-800">Demande envoyée !</p>
        <p className="mt-2 text-green-700">Nous vous recontactons sous 2 heures ouvrées avec votre devis.</p>
        <button type="button" className="btn-secondary mt-6" onClick={() => setStatus("idle")}>
          Nouvelle demande
        </button>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
      <Field label="Nom *" name="name" error={errors.name} autoComplete="name" />
      <Field label="Société" name="company" error={errors.company} autoComplete="organization" />
      <Field label="E-mail *" name="email" type="email" error={errors.email} autoComplete="email" />
      <Field label="Téléphone *" name="phone" type="tel" error={errors.phone} autoComplete="tel" />

      <div className="sm:col-span-2">
        <label htmlFor="machine" className="label">Machine *</label>
        <select id="machine" name="machine" defaultValue={defaultMachine ?? ""} className="input" aria-invalid={!!errors.machine}>
          <option value="" disabled>Choisissez une nacelle</option>
          {machines.map((m) => (
            <option key={m.slug} value={m.slug}>
              {m.name} — {m.dailyPrice} € HT/jour
            </option>
          ))}
        </select>
        <ErrorText message={errors.machine} />
      </div>

      <Field label="Date de début *" name="startDate" type="date" min={today} error={errors.startDate} />
      <Field label="Date de fin *" name="endDate" type="date" min={today} error={errors.endDate} />
      <div className="sm:col-span-2">
        <Field label="Ville du chantier *" name="location" error={errors.location} autoComplete="address-level2" />
      </div>

      <fieldset className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:gap-8">
        <legend className="sr-only">Options</legend>
        <label className="flex items-center gap-2 text-sm text-ink-800">
          <input type="checkbox" name="delivery" className="h-4 w-4 accent-brand-500" /> Livraison sur chantier
        </label>
        <label className="flex items-center gap-2 text-sm text-ink-800">
          <input type="checkbox" name="operator" className="h-4 w-4 accent-brand-500" /> Avec opérateur
        </label>
      </fieldset>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="label">Précisions sur votre chantier</label>
        <textarea id="message" name="message" rows={4} className="input" />
        <ErrorText message={errors.message} />
      </div>

      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? "Envoi en cours…" : "Recevoir mon devis gratuit"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            Une erreur est survenue. Réessayez ou appelez-nous directement.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  ...rest
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  min?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      <input id={name} name={name} type={type} className="input" aria-invalid={!!error} {...rest} />
      <ErrorText message={error} />
    </div>
  );
}

function ErrorText({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-sm text-red-600">{message}</p> : null;
}
