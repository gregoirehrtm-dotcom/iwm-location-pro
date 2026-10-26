import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { COMPANY, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${COMPANY.name} – Location de nacelles élévatrices`, template: `%s | ${COMPANY.name}` },
  description: "Location de nacelles élévatrices 6 m, 8 m, 10 m et 12 m en Suisse. Dès CHF 30/jour, rabais progressifs, livraison rapide.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="min-h-[70vh] pb-20 md:pb-0">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
