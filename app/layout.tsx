import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Location de nacelles élévatrices`,
    template: `%s | ${site.name}`,
  },
  description:
    "Location de nacelles ciseaux, articulées, télescopiques, araignées et camions nacelles. Livraison sur chantier, avec ou sans opérateur. Devis gratuit en 2 h.",
  openGraph: { type: "website", locale: "fr_FR", siteName: site.name },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
