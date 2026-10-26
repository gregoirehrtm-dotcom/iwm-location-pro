"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { MODELS } from "@/lib/constants";
import { bookingSchema, type BookingInput } from "@/lib/validations";
import { daysBetween, estimate, formatCHF } from "@/lib/utils";
import type { ModelSlug } from "@/lib/types";

const STEP_TITLES = ["Nacelle et dates", "Livraison", "Coordonnées", "Récapitulatif et signature"];
const STEP_FIELDS: (keyof BookingInput)[][] = [
  ["model", "startDate", "endDate"],
  ["delivery", "postalCode", "siteAddress"],
  ["customerType", "company", "name", "email", "phone", "notes"],
  ["signature", "accept"],
];
const MAX_FILE = 5 * 1024 * 1024;

export default function BookingForm() {
  const params = useSearchParams();
  const initialModel = MODELS.find((m) => m.slug === params.get("model"))?.slug ?? "6m";
  const initialDays = Math.min(365, Math.max(1, Number(params.get("days")) || 1));
  const today = format(new Date(), "yyyy-MM-dd");

  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const { register, handleSubmit, trigger, watch, formState: { errors, isSubmitting } } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      model: initialModel as ModelSlug,
      startDate: today,
      endDate: format(addDays(new Date(), initialDays - 1), "yyyy-MM-dd"),
      delivery: "pickup",
      customerType: "individual",
    },
  });
  const v = watch();
  const days = daysBetween(v.startDate, v.endDate);
  const est = estimate(v.model, days);
  const model = MODELS.find((m) => m.slug === v.model)!;

  const next = async () => {
    if (await trigger(STEP_FIELDS[step])) setStep(step + 1);
  };

  const onFiles = (list: FileList | null) => {
    const arr = Array.from(list ?? []).slice(0, 4);
    if (arr.some((f) => f.size > MAX_FILE)) return setFileError("Chaque fichier doit faire 5 Mo au maximum.");
    setFileError("");
    setFiles(arr);
  };

  const onSubmit = async (data: BookingInput) => {
    setStatus("idle");
    const fd = new FormData();
    fd.append("data", JSON.stringify(data));
    files.forEach((f) => fd.append("documents", f));
    try {
      const res = await fetch("/api/booking", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok")
    return (
      <div className="card" role="status">
        <h2>Demande envoyée</h2>
        <p className="mt-2">Merci. Vous recevez votre devis exact sous 24 h, sans engagement.</p>
      </div>
    );

  const err = (name: keyof BookingInput) =>
    errors[name] ? <p className="error" role="alert">{String(errors[name]?.message)}</p> : null;

  return (
    <form onSubmit={(e) => (step < 3 ? (e.preventDefault(), next()) : handleSubmit(onSubmit)(e))} noValidate className="card">
      <ol className="mb-6 grid grid-cols-4 gap-2" aria-label="Étapes">
        {STEP_TITLES.map((t, i) => (
          <li key={t} aria-current={i === step ? "step" : undefined}
            className={`border-t-4 pt-2 text-xs sm:text-sm ${i <= step ? "border-primary font-semibold" : "border-line text-muted"}`}>
            <span className="hidden sm:inline">{i + 1}. </span>{t}
          </li>
        ))}
      </ol>
      <h2 className="mb-4 !text-2xl">{step + 1}. {STEP_TITLES[step]}</h2>

      <div hidden={step !== 0} className="space-y-4">
        <fieldset>
          <legend className="label">Nacelle</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {MODELS.map((m) => (
              <label key={m.slug} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-sm border p-3 ${v.model === m.slug ? "border-primary bg-primary/5" : "border-line"}`}>
                <input type="radio" value={m.slug} {...register("model")} />
                <span><strong>{m.name}</strong><br /><span className="text-sm text-muted">{m.pricePerDay ? `dès CHF ${m.pricePerDay}.–/jour` : "sur devis"}</span></span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="b-start" className="label">Début de la location</label>
            <input id="b-start" type="date" min={today} className="field" aria-invalid={!!errors.startDate} {...register("startDate")} />
            {err("startDate")}
          </div>
          <div>
            <label htmlFor="b-end" className="label">Fin de la location</label>
            <input id="b-end" type="date" min={v.startDate} className="field" aria-invalid={!!errors.endDate} {...register("endDate")} />
            {err("endDate")}
          </div>
        </div>
        <p aria-live="polite" className="rounded-sm bg-surface p-3">
          {days} jour{days > 1 ? "s" : ""} · {est.onQuote ? "sur devis" : `à partir de ${est.total !== null ? formatCHF(est.total) : "—"}`}
        </p>
      </div>

      <div hidden={step !== 1} className="space-y-4">
        <fieldset>
          <legend className="label">Mode de réception</legend>
          <label className="flex min-h-14 items-center gap-3 rounded-sm border border-line p-3">
            <input type="radio" value="pickup" {...register("delivery")} /> Retrait gratuit au dépôt de Porrentruy
          </label>
          <label className="mt-2 flex min-h-14 items-center gap-3 rounded-sm border border-line p-3">
            <input type="radio" value="delivery" {...register("delivery")} /> Livraison sur chantier (forfait selon la zone, indiqué dans le devis)
          </label>
        </fieldset>
        {v.delivery === "delivery" && (
          <>
            <div>
              <label htmlFor="b-npa" className="label">NPA</label>
              <input id="b-npa" inputMode="numeric" maxLength={4} className="field" aria-invalid={!!errors.postalCode} {...register("postalCode")} />
              {err("postalCode")}
            </div>
            <div>
              <label htmlFor="b-addr" className="label">Adresse du chantier</label>
              <input id="b-addr" className="field" aria-invalid={!!errors.siteAddress} {...register("siteAddress")} />
              {err("siteAddress")}
            </div>
          </>
        )}
      </div>

      <div hidden={step !== 2} className="space-y-4">
        <div>
          <label htmlFor="b-type" className="label">Vous êtes</label>
          <select id="b-type" className="field" {...register("customerType")}>
            <option value="individual">Un particulier</option>
            <option value="company">Une entreprise</option>
          </select>
        </div>
        {v.customerType === "company" && (
          <div>
            <label htmlFor="b-company" className="label">Entreprise</label>
            <input id="b-company" className="field" {...register("company")} />
          </div>
        )}
        <div>
          <label htmlFor="b-name" className="label">Nom complet</label>
          <input id="b-name" className="field" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
          {err("name")}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="b-email" className="label">E-mail</label>
            <input id="b-email" type="email" className="field" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
            {err("email")}
          </div>
          <div>
            <label htmlFor="b-phone" className="label">Téléphone</label>
            <input id="b-phone" type="tel" className="field" autoComplete="tel" aria-invalid={!!errors.phone} {...register("phone")} />
            {err("phone")}
          </div>
        </div>
        <div>
          <label htmlFor="b-notes" className="label">Remarques (accès, sol, travaux)</label>
          <textarea id="b-notes" rows={3} className="field" {...register("notes")} />
        </div>
        <div>
          <label htmlFor="b-docs" className="label">Documents : pièce d’identité, attestation RC, extrait du registre du commerce</label>
          <input id="b-docs" type="file" multiple accept="image/*,application/pdf" className="field" onChange={(e) => onFiles(e.target.files)} />
          <p className="text-sm text-muted">4 fichiers max, 5 Mo chacun. Vous pouvez aussi les envoyer plus tard.</p>
          {fileError && <p className="error" role="alert">{fileError}</p>}
        </div>
      </div>

      <div hidden={step !== 3} className="space-y-4">
        <dl className="grid grid-cols-2 gap-2 rounded-sm bg-surface p-4">
          <dt className="text-muted">Nacelle</dt><dd className="font-semibold">{model.name}</dd>
          <dt className="text-muted">Période</dt><dd className="font-semibold">{v.startDate} → {v.endDate} ({days} j)</dd>
          <dt className="text-muted">Réception</dt><dd className="font-semibold">{v.delivery === "delivery" ? `Livraison ${v.postalCode ?? ""}` : "Retrait au dépôt"}</dd>
          <dt className="text-muted">Estimation</dt><dd className="font-semibold">{est.onQuote ? "sur devis" : est.total !== null ? `à partir de ${formatCHF(est.total)}` : "—"}</dd>
        </dl>
        <div>
          <label htmlFor="b-sig" className="label">Signature électronique : tapez votre nom complet</label>
          <input id="b-sig" className="field" aria-invalid={!!errors.signature} {...register("signature")} />
          {err("signature")}
        </div>
        <label className="flex items-start gap-3">
          <input type="checkbox" className="mt-1 h-5 w-5" {...register("accept")} />
          <span>J’ai lu et j’accepte les <a className="underline" href="/terms" target="_blank">conditions générales</a> et la <a className="underline" href="/privacy" target="_blank">politique de confidentialité</a>.</span>
        </label>
        {err("accept")}
        {status === "error" && <p className="error" role="alert">Envoi impossible. Appelez-nous au 076 361 66 14.</p>}
      </div>

      <div className="mt-6 flex justify-between gap-3">
        {step > 0 ? <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>Retour</button> : <span />}
        {step < 3 ? (
          <button type="button" className="btn btn-primary" onClick={next}>Continuer</button>
        ) : (
          <button className="btn btn-accent" disabled={isSubmitting}>{isSubmitting ? "Envoi…" : "Signer et envoyer"}</button>
        )}
      </div>
    </form>
  );
}
