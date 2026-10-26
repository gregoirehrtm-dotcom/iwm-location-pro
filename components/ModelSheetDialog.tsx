"use client";

import { useEffect, useRef, useState } from "react";
import { cardDrawing } from "@/lib/drawing";
import { openQuote, SHEET_EVENT } from "@/lib/events";
import { chf } from "@/lib/format";
import { getModel, platformHeight } from "@/lib/models";
import AccessCheck from "./AccessCheck";
import Icon from "./Icon";
import { Spec } from "./ModelCard";

/** Fiche technique en fenêtre, ouverte par les boutons « Fiche technique » de l'accueil */
export default function ModelSheetDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const m = slug ? getModel(slug) : undefined;

  useEffect(() => {
    const onSheet = (e: Event) => setSlug((e as CustomEvent<string>).detail);
    window.addEventListener(SHEET_EVENT, onSheet);
    return () => window.removeEventListener(SHEET_EVENT, onSheet);
  }, []);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg || !m || dlg.open) return;
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
  }, [m]);

  const close = () => {
    const dlg = ref.current;
    if (!dlg?.open) return;
    if (typeof dlg.close === "function") dlg.close();
    else {
      dlg.removeAttribute("open");
      setSlug(null);
    }
  };

  return (
    <dialog
      ref={ref}
      className="dlg"
      aria-labelledby="dlg-title"
      onClose={() => setSlug(null)}
      onClick={(e) => e.target === ref.current && close()}
    >
      {m && (
        <div className="dlg-in">
          <div className="dlg-head">
            <h2 id="dlg-title">
              <small>IWM</small>
              {m.short}
            </h2>
            <button className="x" type="button" aria-label="Fermer" onClick={close}>
              <Icon name="close" />
            </button>
          </div>
          <div className="dlg-body">
            <div className="sheet">
              <svg className="draw lf" viewBox="0 0 220 300" aria-hidden="true" dangerouslySetInnerHTML={{ __html: cardDrawing(m) }} />
            </div>
            <div className="sheet-info">
              <dl className="specs">
                <Spec label="Hauteur de travail" value={m.workingHeight} unit="m" />
                <Spec label="Hauteur de plancher" value={platformHeight(m)} unit="m" />
                <Spec label="Capacité" value={m.capacity} unit="kg" />
                <Spec label="Largeur" value={m.width} unit="m" />
                <Spec label="Longueur repliée" value={m.length} unit="m" />
                <Spec label="Hauteur repliée" value={m.stowedHeight} unit="m" />
                <div>
                  <dt>Énergie</dt>
                  <dd>Électrique, batterie</dd>
                </div>
                <div>
                  <dt>Prix</dt>
                  <dd>Dès {chf(m.pricePerDay)} / jour</dd>
                </div>
              </dl>
              <AccessCheck model={m} />
              <div className="row">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    close();
                    openQuote({ model: m.slug });
                  }}
                >
                  Demander un devis
                </button>
                <a className="btn btn-line" href={`/${m.slug}`}>
                  Page de la nacelle
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
