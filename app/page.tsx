import Link from "next/link";
import { MODELS, TESTIMONIALS } from "@/lib/constants";
import Estimator from "@/components/Estimator";

export default function Home() {
  return (
    <>
      <section className="hero"><div className="container">
        <h1>Location de nacelles élévatrices en Suisse romande</h1>
        <p>Dès CHF 30/jour – retrait gratuit au dépôt – dépannage 24/24.</p>
        <Link className="btn" href="/booking">Réserver maintenant</Link>
      </div></section>
      <div className="container">
        <h2>Nos modèles</h2>
        <div className="grid">
          {MODELS.map((m) => (
            <Link key={m.slug} href={`/models/${m.slug}`} className="card" style={{ textDecoration: "none", color: "inherit" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.images[0]} alt={m.name} width={800} height={600} loading="lazy" />
              <h3>{m.name}</h3><p>{m.description}</p>
              <strong>{m.dailyRate ? `CHF ${m.dailyRate}/jour` : "Sur devis"}</strong>
            </Link>
          ))}
        </div>
        <h2>Calculez votre tarif</h2>
        <Estimator />
        <h2>Ils nous font confiance</h2>
        <div className="grid">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card" style={{ margin: 0 }}>
              <blockquote style={{ margin: 0 }}>« {t.text} »</blockquote>
              <figcaption><strong>{t.name}</strong><br />{t.company}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </>
  );
}
