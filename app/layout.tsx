import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";
import { SITE } from "@/lib/constants";
import NewsletterForm from "@/components/Newsletter";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "IWM Location – Location de nacelles élévatrices en Suisse", template: "%s | IWM Location" },
  description: "Location de nacelles élévatrices 6m, 8m, 10m et 12m à Porrentruy. Dès CHF 30/jour, dépannage 24/24.",
  openGraph: { title: "IWM Location", description: "Location de nacelles élévatrices en Suisse romande.", type: "website", locale: "fr_CH" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  telephone: SITE.phone,
  email: SITE.email,
  url: SITE.url,
  address: { "@type": "PostalAddress", streetAddress: "Chemin des Grandes-Vies 19", addressLocality: "Porrentruy", addressCountry: "CH" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="fr">
      <body>
        <header className="site">
          <div className="container">
            <Link href="/"><strong>IWM Location</strong></Link>
            <nav aria-label="Navigation principale">
              <Link href="/models">Modèles</Link><Link href="/pricing">Tarifs</Link><Link href="/booking">Réserver</Link>
              <Link href="/faq">FAQ</Link><Link href="/about">À propos</Link><Link href="/contact">Contact</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site">
          <div className="container">
            <p>{SITE.name} – {SITE.address} – <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a> – <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            <p>Dépannage 24/24. <Link href="/terms">CGV</Link> · <Link href="/privacy">Confidentialité</Link></p>
            <NewsletterForm />
          </div>
        </footer>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {ga && /^G-[A-Z0-9]+$/.test(ga) && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`}</Script>
          </>
        )}
      </body>
    </html>
  );
}
