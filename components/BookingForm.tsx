"use client";
import { useMemo, useState } from "react";
import { MODELS } from "@/lib/constants";
import { estimatePrice, formatCHF } from "@/lib/utils";
import { bookingSchema } from "@/lib/validations";

type Data = Record<string, string | boolean>;
const steps = ["Modèle & dates", "Livraison", "Contact & documents", "Récapitulatif"];

export default function BookingForm({ initialModel }: { initialModel?: string }) {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>({ model: initialModel ?? "6m", startDate: "", endDate: "", deliveryMode: "delivery", address: "", postalCode: "", city: "", name: "", company: "", email: "", phone: "", notes: "", signature: "", acceptTerms: false });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok">("idle");
  const set = (k: string, v: string | boolean) => setD((p) => ({ ...p, [k]: v }));
  const str = (k: string) => String(d[k] ?? "");

  const days = useMemo(() => {
    const n = Math.round((Date.parse(str("endDate")) - Date.parse(str("startDate"))) / 86_400_000) + 1;
    return Number.isFinite(n) && n >= 1 ? n : 0;
  }, [d.startDate, d.endDate]); // eslint-disable-line react-hooks/exhaustive-deps
  const est = days ? estimatePrice(str("model"), days) : null;

  function validateStep(): string {
    if (step === 0 && (!days || !str("startDate"))) return "Choisissez des dates valides.";
    if (step === 1 && str("deliveryMode") === "delivery" && (!str("address") || !str("postalCode") || !str("city"))) return "Adresse de livraison requise.";
    if (step === 2 && (!str("name") || !/^\S+@\S+\.\S+$/.test(str("email")) || str("phone").length < 7)) return "Nom, email et téléphone valides requis.";
    if (step === 2 && file && (file.size > 5 * 1024 * 1024 || !["application/pdf", "image/jpeg", "image/png"].includes(file.type))) return "Document : PDF/JPG/PNG, 5 Mo max.";
    return "";
  }
  function next() { const e = validateStep(); setError(e); if (!e) setStep(step + 1); }

  async function submit() {
    const parsed = bookingSchema.safeParse(d);
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Formulaire invalide");
    setStatus("sending"); setError("");
    const fd = new FormData();
    Object.entries(d).forEach(([k, v]) => fd.append(k, String(v)));
    if (file) fd.append("document", file);
    try {
      const res = await fetch("/api/booking", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setStatus("ok");
    } catch { setStatus("idle"); setError("Envoi impossible. Veuillez réessayer."); }
  }

  if (status === "ok") return <div className="card text-center" role="status"><h2>Merci !</h2><p className="mt-2">Votre demande a bien été envoyée. Nous vous confirmons la réservation sous 24 h.</p></div>;

  return (
    <div className="card">
      <ol className="mb-6 flex gap-2 text-xs sm:text-sm">
        {steps.map((s, i) => <li key={s} className={`flex-1 rounded px-2 py-1 text-center ${i === step ? "bg-primary text-white" : i < step ? "bg-success/20" : "bg-slate-100"}`}>{i + 1}. {s}</li>)}
      </ol>
      <div className="space-y-4">
        {step === 0 && (<>
          <div><label className="label" htmlFor="b-model">Modèle</label>
            <select id="b-model" className="input" value={str("model")} onChange={(e) => set("model", e.target.value)}>{MODELS.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}</select></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label" htmlFor="b-start">Début</label><input id="b-start" type="date" className="input" value={str("startDate")} onChange={(e) => set("startDate", e.target.value)} /></div>
            <div><label className="label" htmlFor="b-end">Fin</label><input id="b-end" type="date" min={str("startDate")} className="input" value={str("endDate")} onChange={(e) => set("endDate", e.target.value)} /></div>
          </div>
          {est && <p className="rounded bg-primary-light p-3">{days} jour(s) – {est.onQuote ? "sur devis" : formatCHF(est.total!)}</p>}
        </>)}
        {step === 1 && (<>
          <div className="flex gap-4">
            {[["delivery", "Livraison"], ["pickup", "Retrait au dépôt"]].map(([v, l]) => (
              <label key={v} className="flex items-center gap-2"><input type="radio" name="mode" checked={str("deliveryMode") === v} onChange={() => set("deliveryMode", v)} />{l}</label>
            ))}
          </div>
          {str("deliveryMode") === "delivery" && (<>
            <div><label className="label" htmlFor="b-addr">Adresse</label><input id="b-addr" className="input" value={str("address")} onChange={(e) => set("address", e.target.value)} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="label" htmlFor="b-zip">NPA</label><input id="b-zip" className="input" value={str("postalCode")} onChange={(e) => set("postalCode", e.target.value)} /></div>
              <div><label className="label" htmlFor="b-city">Ville</label><input id="b-city" className="input" value={str("city")} onChange={(e) => set("city", e.target.value)} /></div>
            </div>
          </>)}
        </>)}
        {step === 2 && (<>
          <div><label className="label" htmlFor="b-name">Nom</label><input id="b-name" className="input" value={str("name")} onChange={(e) => set("name", e.target.value)} /></div>
          <div><label className="label" htmlFor="b-co">Entreprise (optionnel)</label><input id="b-co" className="input" value={str("company")} onChange={(e) => set("company", e.target.value)} /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label" htmlFor="b-email">Email</label><input id="b-email" type="email" className="input" value={str("email")} onChange={(e) => set("email", e.target.value)} /></div>
            <div><label className="label" htmlFor="b-phone">Téléphone</label><input id="b-phone" type="tel" className="input" value={str("phone")} onChange={(e) => set("phone", e.target.value)} /></div>
          </div>
          <div><label className="label" htmlFor="b-doc">Pièce d&apos;identité / registre du commerce (PDF, JPG, PNG – 5 Mo)</label><input id="b-doc" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></div>
          <div><label className="label" htmlFor="b-notes">Remarques</label><textarea id="b-notes" rows={3} className="input h-auto py-3" value={str("notes")} onChange={(e) => set("notes", e.target.value)} /></div>
        </>)}
        {step === 3 && (<>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt>Modèle</dt><dd>{MODELS.find((m) => m.id === str("model"))?.name}</dd>
            <dt>Période</dt><dd>{str("startDate")} → {str("endDate")} ({days} j)</dd>
            <dt>Estimation</dt><dd>{est ? (est.onQuote ? "Sur devis" : formatCHF(est.total!)) : "-"}</dd>
            <dt>Livraison</dt><dd>{str("deliveryMode") === "pickup" ? "Retrait au dépôt" : `${str("address")}, ${str("postalCode")} ${str("city")}`}</dd>
            <dt>Contact</dt><dd>{str("name")} – {str("email")}</dd>
          </dl>
          <div><label className="label" htmlFor="b-sig">Signature (nom complet)</label><input id="b-sig" className="input" value={str("signature")} onChange={(e) => set("signature", e.target.value)} /></div>
          <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={d.acceptTerms === true} onChange={(e) => set("acceptTerms", e.target.checked)} />J&apos;accepte les conditions générales de location.</label>
        </>)}
      </div>
      {error && <p role="alert" className="mt-4 text-red-600">{error}</p>}
      <div className="mt-6 flex justify-between gap-4">
        <button type="button" className="btn-outline" disabled={step === 0} onClick={() => { setError(""); setStep(step - 1); }}>Retour</button>
        {step < 3 ? <button type="button" className="btn-primary" onClick={next}>Suivant</button>
          : <button type="button" className="btn-accent" disabled={status === "sending"} onClick={submit}>{status === "sending" ? "Envoi…" : "Envoyer la réservation"}</button>}
      </div>
    </div>
  );
}
