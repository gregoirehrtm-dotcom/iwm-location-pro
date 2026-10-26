import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IWM Location",
  description: "Location de nacelles élévatrices",
  robots: "noindex, nofollow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
