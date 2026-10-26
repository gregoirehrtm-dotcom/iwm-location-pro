import Icon, { type IconName } from "./Icon";

const included: { icon: IconName; title: string; text: string }[] = [
  { icon: "shield", title: "Contrôle avant chaque départ", text: "Chaque machine part vérifiée, avec son dossier de contrôle." },
  { icon: "file", title: "Assurance dommages", text: "Incluse, avec une franchise limitée indiquée au contrat." },
  { icon: "user", title: "Prise en main", text: "Offerte à la livraison, avec une check-list et un kit EPI." },
  { icon: "wrench", title: "Dépannage 24\u00a0h/24", text: "Intervention sous 24\u00a0h, ou nacelle remplacée." },
  { icon: "cycle", title: "Maintenance préventive", text: "Sur votre chantier pour les longues locations." },
  { icon: "cal", title: "Durée flexible", text: "De 1 jour à 12 mois, modifiable sans pénalité." },
];

const conditions = [
  "Annulation gratuite jusqu’à 24\u00a0h avant le départ",
  "Remise de 10\u00a0% dès 8 jours, de 20\u00a0% dès 29 jours",
  "Contrat signé en ligne",
  "Pièce d’identité et attestation d’assurance RC ; extrait du registre du commerce pour les entreprises",
];

export default function Services() {
  return (
    <section className="section" id="services" aria-labelledby="t-services">
      <div className="wrap">
        <div className="head">
          <h2 className="h2" id="t-services">Tout est compris dans la location</h2>
          <p className="lead">
            IWM Location fait partie d’IWM Industrial Welding Maintenance Sàrl. Nos techniciens suivent chaque nacelle,
            du contrôle au dépannage.
          </p>
        </div>
        <ul className="incl">
          {included.map((s) => (
            <li key={s.title}>
              <Icon name={s.icon} />
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="cond">
          <div>
            <h3>Conditions</h3>
            <ul className="checks">
              {conditions.map((c) => (
                <li key={c}>
                  <Icon name="check" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="box suva">
            <h3>Sécurité</h3>
            <p>
              La Suva demande que les utilisateurs de nacelles soient formés à la catégorie d’appareil et instruits sur
              le modèle utilisé. Besoin d’une formation&nbsp;? Indiquez-le dans votre demande.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
