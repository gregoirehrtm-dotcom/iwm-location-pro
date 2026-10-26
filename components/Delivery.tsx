"use client";

import { useState, type FormEvent } from "react";
import { npaInfo, placeLabel, zones, type NpaInfo } from "@/lib/delivery";
import { openQuote } from "@/lib/events";
import { site } from "@/lib/site";
import Icon from "./Icon";

// Rayons des cercles de zones autour de Porrentruy, de la zone 1 à la zone 4
const rings = [34, 68, 104, 140];

export default function Delivery() {
  const [npa, setNpa] = useState("");
  const [info, setInfo] = useState<NpaInfo | null>(null);
  const active = info?.ok ? info.zone.id : null;

  const check = (value: string, showError: boolean) => {
    const result = npaInfo(value);
    if (result.ok || showError) setInfo(result);
  };

  return (
    <section className="section alt" id="livraison" aria-labelledby="t-livraison">
      <div className="wrap">
        <div className="head">
          <h2 className="h2" id="t-livraison">Livraison et retrait</h2>
          <p className="lead">
            Livraison sur chantier dans toute la Suisse, au forfait selon la zone. Ou retrait gratuit au dépôt de
            Porrentruy.
          </p>
        </div>
        <div className="dl-grid">
          <div className="dl-left">
            <form
              className="field"
              noValidate
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                check(npa, true);
              }}
            >
              <label htmlFor="dl-npa">NPA du chantier</label>
              <div className="npa-row">
                <input
                  className="input"
                  id="dl-npa"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={4}
                  placeholder="2800"
                  value={npa}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setNpa(value);
                    if (value.length === 4) check(value, false);
                  }}
                />
                <button className="btn btn-primary" type="submit">
                  Vérifier
                </button>
              </div>
            </form>
            <div className={`result${info?.ok ? " ok" : ""}`} aria-live="polite">
              {info == null ? (
                <span className="muted">Entrez un NPA pour voir le délai de livraison.</span>
              ) : info.ok ? (
                <span className="res">
                  <Icon name="truck" />
                  <span>
                    <strong>{info.zone.delay}</strong> à {placeLabel(info)}.{" "}
                    <button className="link" type="button" onClick={() => openQuote({ npa: String(info.npa) })}>
                      Demander un devis
                    </button>
                  </span>
                </span>
              ) : (
                <span className="err">Entrez un NPA suisse à 4 chiffres, par exemple 2800.</span>
              )}
            </div>
            <div className="box">
              <h3>Dépôt de Porrentruy</h3>
              <p>
                {site.street}, {site.postalCode} {site.city}. Rampes de chargement sur place.
              </p>
              <p className="num">{site.hours}</p>
              <a
                className="link"
                href="https://www.google.com/maps/dir/?api=1&destination=Chemin+des+Grandes-Vies+19,+2900+Porrentruy"
                target="_blank"
                rel="noopener"
                style={{ justifySelf: "start" }}
              >
                Itinéraire
              </a>
            </div>
          </div>
          <figure className="sheet zones">
            <svg viewBox="0 0 300 300" role="img" aria-label="Zones de livraison autour de Porrentruy">
              {zones
                .map((z, i) => (
                  <circle key={z.id} className={`ring${active === z.id ? " on" : ""}`} cx="150" cy="150" r={rings[i]} />
                ))
                .reverse()}
              <circle className="ring-c" cx="150" cy="150" r="4" />
              <text className="ring-t" x="150" y="138" textAnchor="middle">Porrentruy</text>
              {[172, 103, 68, 32].map((y, i) => (
                <text key={y} className="ring-t" x="150" y={y} textAnchor="middle">
                  {i + 1}
                </text>
              ))}
            </svg>
            <ul className="legend">
              {zones.map((z, i) => (
                <li key={z.id} className={active === z.id ? "on" : undefined}>
                  <b>{i + 1}</b>
                  <span>
                    <strong>{z.name}</strong>
                    <span>{z.short}</span>
                  </span>
                </li>
              ))}
            </ul>
            <figcaption>Délais indicatifs, confirmés avec le devis.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
