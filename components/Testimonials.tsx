import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section className="section">
      <h2 className="text-center">Ils nous font confiance</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="card">
            <blockquote className="text-slate-700">« {t.text} »</blockquote>
            <figcaption className="mt-4 text-sm"><strong>{t.name}</strong><br />{t.company}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
