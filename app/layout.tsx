import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IWM Location",
  description: "Location de nacelles élévatrices",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="mx-auto max-w-4xl p-6">{children}</body>
    </html>
  );
}
