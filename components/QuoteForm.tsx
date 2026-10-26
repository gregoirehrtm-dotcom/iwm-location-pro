"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { npaInfo, placeLabel } from "@/lib/delivery";
import { QUOTE_EVENT, type QuotePrefill } from "@/lib/events";
import { meters, plural } from "@/lib/format";
import { getModel, models } from "@/lib/models";
import {
  accessOptions,
  daysBetween,
  formatDate,
  groundOptions,
  quoteSummary,
  validateStep,
  type QuoteErrors,
  type QuoteRequest,
} from "@/lib/quote";
import { site, whatsappUrl } from "@/lib/site";
import CopyButton from "./CopyButton";
import Icon from "./Icon";

type Step = 1 | 2 | 3;
type Status = "editing" | "sending" | "sent" | "failed";

const stepTitles = ["Nacelle et dates", "Livraison", "Coordonnées"];

const empty: QuoteRequest = {
  model: "8m",
  startDate: "",
  endDate: "",
  mode: "livraison",
  npa: "",
  address: "",
  access: accessOptions[0],
  ground: groundOptions[0],
  passage: "",
  clientType: "entreprise",
  company: "",
  name: "",
  phone: "",
  email: "",
  message: "",
};

const pad = (n: number) => String(n).padStart(2, "0");
const isoDay = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
function addDays(iso: string, n: number) {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + n);
  return isoDay(d);
}
const reduceMotion = () => {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
};

function Field({
  id,
  label,
  error,
  children,
  hint,
}: {
  id: string;
  label: ReactNode;
  error?: string;
  children: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p className="err" id={`err-${id}`}>
          {error}
        </p>
      )}
      {hint}
    </div>
  );
}

export default function QuoteForm() {
  const [q, setQ] = useState<QuoteRequest>(empty);
  const [step, setStep] = useState<Step>(1);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>("editing");
  const [today, setToday] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const set = <K extends keyof QuoteRequest>(key: K, value: QuoteRequest[K]) => {
    setQ((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // Dates par défaut (demain, pour deux jours), nacelle choisie sur sa page (?modele=12m),
  // préremplissage depuis les boutons « Demander un devis » des autres sections
  useEffect(() => {
    const t = isoDay(new Date());
    const start = addDays(t, 1);
    const fromUrl = new URLSearchParams(window.location.search).get("modele");
    setToday(t);
    setQ((prev) => ({
      ...prev,
      startDate: start,
      endDate: addDays(start, 1),
      model: fromUrl && getModel(fromUrl) ? fromUrl : prev.model,
    }));

    const onQuote = (e: Event) => {
      const { model, npa }: QuotePrefill = (e as CustomEvent<QuotePrefill>).detail ?? {};
      setQ((prev) => ({
        ...prev,
        ...(model && getModel(model) ? { model } : {}),
        ...(npa ? { npa, mode: "livraison" as const } : {}),
      }));
      setErrors({});
      setStatus("editing");
      setStep(1);
      const smooth = !reduceMotion();
      document.getElementById("devis")?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      setTimeout(() => titleRef.current?.focus({ preventScroll: true }), smooth ? 450 : 0);
    };
    window.addEventListener(QUOTE_EVENT, onQuote);
    return () => window.removeEventListener(QUOTE_EVENT, onQuote);
  }, []);

  useEffect(() => {
    if (status === "sent" || status === "failed") doneRef.current?.focus();
  }, [status]);

  const check = (s: Step) => {
    const e = validateStep(s, q, today);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`bk-${first}`)?.focus();
    return !first;
  };

  const next = () => {
    if (!check(step)) return;
    setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (step !== 3) return next();
    if (!check(3)) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(q),
      });
      setStatus(res.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  const invalid = (key: keyof QuoteRequest) =>
    errors[key] ? { "aria-invalid": true as const, "aria-describedby": `err-bk-${key}` } : {};

  const model = getModel(q.model) ?? models[1];
  const npa = npaInfo(q.npa);
  const datesOk = q.startDate && q.endDate && q.endDate >= q.startDate;
  const summary = status === "sent" || status === "failed" ? quoteSummary(q) : "";

  return (
    <section className="section" id="devis" aria-labelledby="t-devis">
      <div className="wrap q-grid">
        <div className="q-side">
          <h2 className="h2" id="t-devis" tabIndex={-1} ref={titleRef}>
            Demander un devis
          </h2>
          <p className="lead">Trois étapes. Réponse sous 24&nbsp;h, sans engagement.</p>
          <ul className="checks">
            <li>
              <Icon name="check" />
              <span>Devis détaillé, livraison comprise</span>
            </li>
            <li>
              <Icon name="check" />
              <span>Annulation gratuite jusqu’à 24&nbsp;h avant</span>
            </li>
          </ul>
        </div>
        <div className="form-box">
          {status === "sent" || status === "failed" ? (
            <div className="done">
              <h3 ref={doneRef} tabIndex={-1}>
                {status === "sent" ? "Demande envoyée" : "L’envoi n’a pas abouti"}
              </h3>
              <p className="muted">
                {status === "sent"
                  ? "Merci. Nous vous répondons sous 24\u00a0h avec un devis détaillé. Vous pouvez aussi nous l’envoyer sur WhatsApp."
                  : `Votre demande est prête ci-dessous. Envoyez-la sur WhatsApp, ou copiez-la dans un e-mail à ${site.email}.`}
              </p>
              <textarea className="input done-text" ref={textRef} readOnly value={summary} aria-label="Récapitulatif de la demande" />
              <div className="row">
                <a
                  className={`btn ${status === "sent" ? "btn-line" : "btn-primary"}`}
                  href={whatsappUrl(summary)}
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="wa" />
                  Envoyer sur WhatsApp
                </a>
                <CopyButton text={summary} label="Copier la demande" className="btn btn-line" fallback={() => textRef.current} />
                {status === "failed" ? (
                  <button className="link" type="button" onClick={() => setStatus("editing")}>
                    Modifier et réessayer
                  </button>
                ) : (
                  <button
                    className="link"
                    type="button"
                    onClick={() => {
                      setQ((prev) => ({ ...empty, startDate: prev.startDate, endDate: prev.endDate }));
                      setStep(1);
                      setStatus("editing");
                    }}
                  >
                    Nouvelle demande
                  </button>
                )}
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={submit}>
              <ol className="prog" aria-label="Progression">
                {stepTitles.map((title, i) => (
                  <li
                    key={title}
                    className={i + 1 === step ? "cur" : i + 1 < step ? "done" : undefined}
                    aria-current={i + 1 === step ? "step" : undefined}
                  >
                    {i + 1}. {title}
                  </li>
                ))}
              </ol>

              <fieldset hidden={step !== 1}>
                <legend>Nacelle et dates</legend>
                <div className="opts" role="radiogroup" aria-label="Nacelle">
                  {models.map((m) => (
                    <label className="opt" key={m.slug}>
                      <input type="radio" name="bk-model" value={m.slug} checked={q.model === m.slug} onChange={() => set("model", m.slug)} />
                      <span className="opt-card">
                        <strong>{m.name}</strong>
                        <span>jusqu’à {meters(m.workingHeight)}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <div className="two">
                  <Field id="bk-startDate" label="Début" error={errors.startDate}>
                    <input
                      className="input"
                      type="date"
                      id="bk-startDate"
                      min={today || undefined}
                      value={q.startDate}
                      onChange={(e) => {
                        const start = e.target.value;
                        setQ((prev) => ({ ...prev, startDate: start, endDate: prev.endDate < start ? start : prev.endDate }));
                        setErrors((prev) => ({ ...prev, startDate: undefined, endDate: undefined }));
                      }}
                      {...invalid("startDate")}
                    />
                  </Field>
                  <Field id="bk-endDate" label="Fin" error={errors.endDate}>
                    <input
                      className="input"
                      type="date"
                      id="bk-endDate"
                      min={q.startDate || today || undefined}
                      value={q.endDate}
                      onChange={(e) => set("endDate", e.target.value)}
                      {...invalid("endDate")}
                    />
                  </Field>
                </div>
                <p className="sum" aria-live="polite">
                  {datesOk ? (
                    <>
                      <strong>{plural(daysBetween(q.startDate, q.endDate), "jour")}</strong>, du {formatDate(q.startDate)} au{" "}
                      {formatDate(q.endDate)}, {model.name}.
                    </>
                  ) : (
                    "Choisissez vos dates."
                  )}
                </p>
              </fieldset>

              <fieldset hidden={step !== 2}>
                <legend>Livraison</legend>
                <div className="opts" role="radiogroup" aria-label="Livraison ou retrait">
                  <label className="opt">
                    <input type="radio" name="bk-mode" value="livraison" checked={q.mode === "livraison"} onChange={() => set("mode", "livraison")} />
                    <span className="opt-card">
                      <strong>Livraison sur chantier</strong>
                      <span>au forfait selon la zone</span>
                    </span>
                  </label>
                  <label className="opt">
                    <input type="radio" name="bk-mode" value="retrait" checked={q.mode === "retrait"} onChange={() => set("mode", "retrait")} />
                    <span className="opt-card">
                      <strong>Retrait au dépôt</strong>
                      <span>gratuit, à Porrentruy</span>
                    </span>
                  </label>
                </div>
                {q.mode === "livraison" ? (
                  <div className="two">
                    <Field
                      id="bk-npa"
                      label="NPA du chantier"
                      error={errors.npa}
                      hint={npa.ok && <p className="hint">{`${npa.zone.delay} à ${placeLabel(npa)} (indicatif).`}</p>}
                    >
                      <input
                        className="input"
                        id="bk-npa"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        maxLength={4}
                        placeholder="2800"
                        value={q.npa}
                        onChange={(e) => set("npa", e.target.value.replace(/\D/g, "").slice(0, 4))}
                        {...invalid("npa")}
                      />
                    </Field>
                    <Field id="bk-address" label="Adresse du chantier" error={errors.address}>
                      <input
                        className="input"
                        id="bk-address"
                        autoComplete="street-address"
                        placeholder="Rue et numéro"
                        value={q.address}
                        onChange={(e) => set("address", e.target.value)}
                        {...invalid("address")}
                      />
                    </Field>
                    <Field id="bk-access" label="Accès">
                      <select className="input" id="bk-access" value={q.access} onChange={(e) => set("access", e.target.value)}>
                        {accessOptions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field id="bk-ground" label="Type de sol">
                      <select className="input" id="bk-ground" value={q.ground} onChange={(e) => set("ground", e.target.value)}>
                        {groundOptions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      id="bk-passage"
                      label={
                        <>
                          Passage le plus étroit, en cm <span className="muted">(facultatif)</span>
                        </>
                      }
                    >
                      <input
                        className="input"
                        id="bk-passage"
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="90"
                        value={q.passage}
                        onChange={(e) => set("passage", e.target.value.replace(/\D/g, "").slice(0, 4))}
                      />
                    </Field>
                  </div>
                ) : (
                  <p className="sum">
                    <strong>Dépôt IWM Location</strong>, {site.street}, {site.postalCode} {site.city}. {site.hours}.
                  </p>
                )}
              </fieldset>

              <fieldset hidden={step !== 3}>
                <legend>Vos coordonnées</legend>
                <div className="opts" role="radiogroup" aria-label="Vous êtes">
                  <label className="opt">
                    <input type="radio" name="bk-type" value="entreprise" checked={q.clientType === "entreprise"} onChange={() => set("clientType", "entreprise")} />
                    <span className="opt-card">
                      <strong>Entreprise</strong>
                      <span>facture à l’entreprise</span>
                    </span>
                  </label>
                  <label className="opt">
                    <input type="radio" name="bk-type" value="particulier" checked={q.clientType === "particulier"} onChange={() => set("clientType", "particulier")} />
                    <span className="opt-card">
                      <strong>Particulier</strong>
                      <span>travaux privés</span>
                    </span>
                  </label>
                </div>
                <div className="two">
                  {q.clientType === "entreprise" && (
                    <Field id="bk-company" label="Entreprise" error={errors.company}>
                      <input className="input" id="bk-company" autoComplete="organization" value={q.company} onChange={(e) => set("company", e.target.value)} {...invalid("company")} />
                    </Field>
                  )}
                  <Field id="bk-name" label="Nom et prénom" error={errors.name}>
                    <input className="input" id="bk-name" autoComplete="name" value={q.name} onChange={(e) => set("name", e.target.value)} {...invalid("name")} />
                  </Field>
                  <Field id="bk-phone" label="Téléphone" error={errors.phone}>
                    <input className="input" id="bk-phone" type="tel" autoComplete="tel" placeholder="079 123 45 67" value={q.phone} onChange={(e) => set("phone", e.target.value)} {...invalid("phone")} />
                  </Field>
                  <Field id="bk-email" label="E-mail" error={errors.email}>
                    <input className="input" id="bk-email" type="email" autoComplete="email" value={q.email} onChange={(e) => set("email", e.target.value)} {...invalid("email")} />
                  </Field>
                </div>
                <Field
                  id="bk-message"
                  label={
                    <>
                      Message <span className="muted">(facultatif)</span>
                    </>
                  }
                >
                  <textarea
                    className="input"
                    id="bk-message"
                    maxLength={5000}
                    placeholder="Nature des travaux, horaires, questions"
                    value={q.message}
                    onChange={(e) => set("message", e.target.value)}
                  />
                </Field>
              </fieldset>

              <div className="q-nav">
                {step > 1 && (
                  <button className="btn btn-line" type="button" onClick={() => setStep((s) => (s - 1) as Step)}>
                    Retour
                  </button>
                )}
                <span className="sp" />
                {step < 3 ? (
                  <button className="btn btn-primary" type="button" onClick={next}>
                    Continuer
                  </button>
                ) : (
                  <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
