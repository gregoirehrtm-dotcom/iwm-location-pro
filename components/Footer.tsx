import { site, whatsappUrl } from "@/lib/site";
import CopyButton from "./CopyButton";
import DepotStatus from "./DepotStatus";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="footer" id="contact" aria-labelledby="t-contact">
      <div className="wrap">
        <div className="head">
          <h2 className="h2" id="t-contact">Contact</h2>
        </div>
        <div className="f-grid">
          <div className="box">
            <h3><Icon name="phone" />Téléphone</h3>
            <a className="big" href={site.phoneHref}>{site.phone}</a>
            <div><CopyButton text={site.phone} /></div>
          </div>
          <div className="box">
            <h3><Icon name="wa" />WhatsApp</h3>
            <a className="big" href={whatsappUrl()} target="_blank" rel="noopener">Écrire sur WhatsApp</a>
            <p>Envoyez une photo du chantier, nous vous conseillons.</p>
          </div>
          <div className="box">
            <h3><Icon name="mail" />E-mail</h3>
            <span className="big" style={{ fontSize: "1.02rem" }}>{site.email}</span>
            <div><CopyButton text={site.email} /></div>
          </div>
          <div className="box">
            <h3><Icon name="depot" />Dépôt</h3>
            <p style={{ color: "var(--ink)" }}>
              {site.street}
              <br />
              {site.postalCode} {site.city}
            </p>
            <p className="num">{site.hoursShort}</p>
            <DepotStatus />
          </div>
          <div className="box">
            <h3><Icon name="wrench" />Dépannage</h3>
            <p className="big">24&nbsp;h/24, 7&nbsp;j/7</p>
            <p>Intervention sous 24&nbsp;h, ou nacelle remplacée.</p>
          </div>
        </div>
        <div className="legal">
          <span>
            © {new Date().getFullYear()} {site.name}, {site.legalName}, IDE {site.ide}
          </span>
          <span>Mentions légales, confidentialité et conditions de location : pages en préparation</span>
        </div>
      </div>
    </footer>
  );
}
