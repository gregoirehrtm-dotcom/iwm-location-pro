import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: { default: "Location de nacelles ciseaux neuves dès CHF 30.–/jour | IWM Location", template: "%s | IWM Location" },
  description:
    "Location de nacelles ciseaux électriques neuves de 5,80 à 12 m depuis Porrentruy, livraison dans toute la Suisse. Devis sous 24 h, dépannage 24 h/24.",
  openGraph: { type: "website", locale: "fr_CH", siteName: "IWM Location" },
};

export const viewport: Viewport = { themeColor: "#2B5A7B", width: "device-width", initialScale: 1 };

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  telephone: `+41${COMPANY.phoneHref.slice(3)}`,
  email: COMPANY.email,
  url: COMPANY.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address,
    postalCode: COMPANY.postalCode,
    addressLocality: COMPANY.city,
    addressCountry: "CH",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "12:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "13:30", closes: "17:30" },
  ],
  areaServed: "CH",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CH">
      <body>
        <a href="#main" className="skip-link">Aller au contenu</a>
        <Header />
        <main id="main" className="pb-20 lg:pb-0">{children}</main>
        <Footer />
        <StickyCta />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
