import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { IconSprite } from "@/components/Icon";
import "./globals.css";

// Archivo variable, avec l'axe de largeur pour les libellés resserrés
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });

export const metadata: Metadata = {
  title: "Location nacelle ciseaux Porrentruy, Jura | IWM Location",
  description:
    "Location de nacelles ciseaux électriques neuves de 5,80 à 12 m à Porrentruy, dans le Jura. Devis sous 24 h, dépannage 24 h/24, livraison dans toute la Suisse.",
  robots: "noindex, nofollow",
  openGraph: {
    type: "website",
    locale: "fr_CH",
    title: "Location nacelle ciseaux Porrentruy, Jura | IWM Location",
    description: "Nacelles électriques neuves de 5,80 à 12 m. Devis sous 24 h, dépannage 24 h/24, livraison dans toute la Suisse.",
  },
};

export const viewport: Viewport = {
  themeColor: "#171A1F",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={archivo.variable}>
      <body>
        <IconSprite />
        {children}
      </body>
    </html>
  );
}
