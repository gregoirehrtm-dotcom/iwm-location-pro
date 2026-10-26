import { cardDrawing } from "@/lib/drawing";
import { chf, meters } from "@/lib/format";
import { platformHeight, type Model } from "@/lib/models";
import { QuoteButton, SheetButton } from "./ActionButtons";

export function Spec({ label, value, unit }: { label: string; value: number | null; unit: "m" | "kg" }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>
        {value == null ? (
          <span className="tbc">à confirmer</span>
        ) : unit === "m" ? (
          meters(value)
        ) : (
          `${value}\u00a0${unit}`
        )}
      </dd>
    </div>
  );
}

export default function ModelCard({ model: m }: { model: Model }) {
  return (
    <article className="card">
      <div className="sheet">
        <svg className="draw lf" viewBox="0 0 220 300" aria-hidden="true" dangerouslySetInnerHTML={{ __html: cardDrawing(m) }} />
      </div>
      <div className="card-body">
        <div className="card-title">
          <h3>
            <small>IWM</small>
            {m.short}
          </h3>
          {m.tag && <span className="tag">{m.tag}</span>}
        </div>
        <dl className="specs">
          <Spec label="Hauteur de travail" value={m.workingHeight} unit="m" />
          <Spec label="Hauteur de plancher" value={platformHeight(m)} unit="m" />
          <Spec label="Capacité" value={m.capacity} unit="kg" />
          <Spec label="Largeur" value={m.width} unit="m" />
        </dl>
        <p className="price">
          <span>Dès</span>
          <span>
            <strong>{chf(m.pricePerDay)}</strong> / jour
          </span>
        </p>
        <div className="row">
          <QuoteButton model={m.slug} className="btn btn-line btn-sm">
            Demander un devis
          </QuoteButton>
          <SheetButton model={m.slug} className="link">
            Fiche technique
          </SheetButton>
        </div>
      </div>
    </article>
  );
}
