import { site } from "@/lib/site";
import Icon from "./Icon";

const questions = [
  {
    q: "Quelle hauteur pouvez-vous atteindre ?",
    a: "De 5,80\u00a0m à 12\u00a0m de hauteur de travail selon le modèle. Nous vérifions avec vous l’espace disponible et la résistance du sol.",
  },
  {
    q: "Quels documents faut-il fournir ?",
    a: "Une pièce d’identité et une attestation d’assurance RC. Pour les entreprises, un extrait du registre du commerce ou le numéro IDE. Le contrat se signe en ligne.",
  },
  { q: "Puis-je prolonger la location ?", a: "Oui. Prévenez-nous avant la date de retour : nous adaptons le contrat et la facture." },
  {
    q: "Faut-il une formation ?",
    a: "Oui. La Suva demande que les utilisateurs soient formés à la catégorie de nacelle et instruits sur le modèle. Une prise en main est offerte à chaque livraison.",
  },
  {
    q: "Intérieur ou extérieur ?",
    a: "Nos nacelles sont électriques, silencieuses et sans émission. Pour l’extérieur, indiquez-nous le terrain et l’exposition au vent : nous vous conseillons le bon modèle.",
  },
  {
    q: "Comment le prix est-il calculé ?",
    a: "Selon le modèle, la durée et la livraison, avec une remise de 10\u00a0% dès 8 jours et de 20\u00a0% dès 29 jours. Vous recevez un devis détaillé sous 24\u00a0h.",
  },
  {
    q: "Que se passe-t-il en cas de panne ?",
    a: "Notre ligne de dépannage répond 24\u00a0h/24, 7\u00a0j/7. Nous intervenons sous 24\u00a0h ou remplaçons la nacelle.",
  },
  { q: "Puis-je annuler ?", a: "Gratuitement jusqu’à 24\u00a0h avant le départ. Au-delà, seul le transport déjà engagé est facturé." },
];

// Espace insécable avant le point d'interrogation
const nbsp = (s: string) => s.replace(/ \?/g, "\u00a0?");

export default function Faq() {
  return (
    <section className="section alt" id="faq" aria-labelledby="t-faq">
      <div className="wrap faq-grid">
        <div className="head">
          <h2 className="h2" id="t-faq">Questions fréquentes</h2>
          <p className="lead">
            Autre question&nbsp;? Appelez le{" "}
            <a className="link num" href={site.phoneHref}>
              {site.phone}
            </a>
            .
          </p>
        </div>
        <div className="faq">
          {questions.map(({ q, a }) => (
            <details key={q}>
              <summary>
                {nbsp(q)}
                <Icon name="chevron" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
