import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section className="section bg-surface" aria-labelledby="temoignages">
      <div className="container-x">
        <h2 id="temoignages">Ils nous font confiance</h2>
        <p className="mt-2 text-sm text-muted">Exemples de contenu, à remplacer par de vrais avis clients avant la mise en ligne.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="card">
              <blockquote>« {t.quote} »</blockquote>
              <figcaption className="mt-4 text-sm text-muted">{t.author}, {t.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
