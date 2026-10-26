"use client";

import { useState } from "react";
import { openQuote } from "@/lib/events";
import { chf, plural } from "@/lib/format";
import { getModel, models } from "@/lib/models";
import { estimate, rateTiers } from "@/lib/pricing";

const MAX_DAYS = 365;
const durations = [
  { days: 1, label: "1 jour" },
  { days: 7, label: "1 semaine" },
  { days: 14, label: "2 semaines" },
  { days: 30, label: "1 mois" },
];

export default function PriceEstimator() {
  const [slug, setSlug] = useState(models[0].slug);
  // Texte saisi, pour pouvoir vider le champ en tapant ; la durée retenue reste entre 1 et 365 jours
  const [daysText, setDaysText] = useState("1");
  const days = Math.min(MAX_DAYS, Math.max(1, parseInt(daysText, 10) || 1));
  const model = getModel(slug) ?? models[0];
  const { subtotal, rate, discount, total } = estimate(model.pricePerDay, days);
  const setDays = (n: number) => setDaysText(String(Math.min(MAX_DAYS, Math.max(1, n))));

  return (
    <section className="section alt" id="tarifs" aria-labelledby="t-tarifs">
      <div className="wrap">
        <div className="head">
          <h2 className="h2" id="t-tarifs">Tarifs</h2>
          <p className="lead">
            Prix par jour, hors livraison. Remise de 10&nbsp;% dès 8 jours de location, et de 20&nbsp;% dès 29 jours.
          </p>
        </div>
        <div className="est-grid">
          <div className="est-controls">
            <fieldset>
              <legend>Nacelle</legend>
              <div className="opts">
                {models.map((m) => (
                  <label className="opt" key={m.slug}>
                    <input type="radio" name="est-model" value={m.slug} checked={slug === m.slug} onChange={() => setSlug(m.slug)} />
                    <span className="opt-card">
                      <strong>{m.name}</strong>
                      <span>{chf(m.pricePerDay)} / jour</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor="est-days">Durée de location</label>
              <div className="stepper">
                <button className="step-btn" type="button" aria-label="Un jour de moins" onClick={() => setDays(days - 1)}>
                  −
                </button>
                <input
                  className="input"
                  id="est-days"
                  inputMode="numeric"
                  maxLength={3}
                  value={daysText}
                  onChange={(e) => setDaysText(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  onBlur={() => setDays(days)}
                />
                <button className="step-btn" type="button" aria-label="Un jour de plus" onClick={() => setDays(days + 1)}>
                  +
                </button>
                <span className="unit">{days > 1 ? "jours" : "jour"}</span>
              </div>
              <div className="presets" role="group" aria-label="Durées courantes">
                {durations.map((d) => (
                  <button key={d.days} type="button" className="chip" aria-pressed={days === d.days} onClick={() => setDays(d.days)}>
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            <ul className="rates" aria-label="Remises selon la durée">
              {rateTiers.map((t) => (
                <li key={t.from} className={rate === t.rate ? "on" : undefined}>
                  <span>{t.label}</span>
                  <strong>{t.rate ? `−${t.rate * 100}\u00a0%` : "Prix plein"}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className="sheet receipt" aria-live="polite">
            <p className="label">Estimation</p>
            <dl className="lines">
              <div>
                <dt>
                  {model.name} × {plural(days, "jour")}
                </dt>
                <dd>{chf(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="minus">
                  <dt>Remise {rate * 100}&nbsp;%</dt>
                  <dd>−{chf(discount)}</dd>
                </div>
              )}
            </dl>
            <p className="total">
              <span>Total estimé</span>
              <span className="readout">{chf(total)}</span>
            </p>
            <p className="hint">Hors livraison. Le devis détaillé, livraison comprise, vous parvient sous 24&nbsp;h.</p>
            <button className="btn btn-primary" type="button" onClick={() => openQuote({ model: model.slug })}>
              Demander un devis pour cette nacelle
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
