import { site, whatsappUrl } from "@/lib/site";
import Icon from "./Icon";

/** Actions toujours visibles sur téléphone */
export default function MobileBar({ quoteHref = "#devis" }: { quoteHref?: string }) {
  return (
    <>
      <div className="end" aria-hidden="true" />
      <div className="mbar" role="group" aria-label="Actions rapides">
        <a className="btn btn-line" href={site.phoneHref}>
          <Icon name="phone" />
          Appeler
        </a>
        <a className="btn btn-line" href={whatsappUrl()} target="_blank" rel="noopener">
          <Icon name="wa" />
          WhatsApp
        </a>
        <a className="btn btn-primary" href={quoteHref}>
          Devis
        </a>
      </div>
    </>
  );
}
