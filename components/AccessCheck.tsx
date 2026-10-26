"use client";

import { useId, useState } from "react";
import type { Model } from "@/lib/models";

const digits = (v: string) => v.replace(/\D/g, "").slice(0, 4);

// La machine passe avec une marge de 2 cm de chaque côté de la mesure
function fit(passage: number, machine: number | null, what: string, folded = "") {
  if (machine == null) return { ok: null, text: `${what} de la machine à confirmer : appelez-nous.` };
  const needed = Math.round(machine * 100) + 2;
  return passage >= needed
    ? { ok: true, text: `${what} : elle passe (${Math.round(machine * 100)} cm${folded}, marge de 2 cm).` }
    : { ok: false, text: `${what} : il manque ${needed - passage} cm.` };
}

/** Passe-t-elle par votre accès ? Compare la largeur et la hauteur repliée au passage le plus étroit. */
export default function AccessCheck({ model: m }: { model: Model }) {
  const id = useId();
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const results = [
    width && fit(parseInt(width, 10), m.width, "Largeur"),
    height && fit(parseInt(height, 10), m.stowedHeight, "Hauteur", " repliée"),
  ].filter((r) => r) as { ok: boolean | null; text: string }[];

  return (
    <div className="pass">
      <h3>Passe-t-elle par votre accès&nbsp;?</h3>
      <div className="two">
        <div className="field">
          <label htmlFor={`${id}-w`}>Largeur du passage (cm)</label>
          <input className="input" id={`${id}-w`} inputMode="numeric" maxLength={4} placeholder="90" value={width} onChange={(e) => setWidth(digits(e.target.value))} />
        </div>
        <div className="field">
          <label htmlFor={`${id}-h`}>Hauteur du passage (cm)</label>
          <input className="input" id={`${id}-h`} inputMode="numeric" maxLength={4} placeholder="200" value={height} onChange={(e) => setHeight(digits(e.target.value))} />
        </div>
      </div>
      <div className="pass-out" aria-live="polite">
        {results.length === 0 ? (
          <span className="muted">Mesurez le passage le plus étroit jusqu’à la zone de travail.</span>
        ) : (
          results.map((r) => (
            <span key={r.text} className={r.ok === true ? "y" : r.ok === false ? "n" : undefined}>
              {r.text}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
