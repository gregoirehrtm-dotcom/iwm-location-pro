import { models } from "@/lib/models";
import ModelCard from "./ModelCard";

export default function Fleet() {
  return (
    <section className="section" id="nacelles" aria-labelledby="t-nacelles">
      <div className="wrap">
        <div className="head">
          <h2 className="h2" id="t-nacelles">Nos nacelles</h2>
          <p className="lead">
            Quatre modèles électriques de 2026, silencieux et sans émission, pour l’intérieur comme l’extérieur.
            Dessinés à la même échelle.
          </p>
        </div>
        <div className="fleet">
          {models.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
        </div>
        <p className="note">
          Hauteur de travail : hauteur de plancher plus 2 m, la hauteur qu’atteint une personne debout sur la
          plateforme.
        </p>
      </div>
    </section>
  );
}
