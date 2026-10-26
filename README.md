# iwm-location-pro
IWM Location - Professional Aerial Work Platform Rental Website. Modern, responsive, conversion-optimized design system.

## Développement
```
npm install && npm run dev
npm test        # tests du barème et utilitaires
npm run build
```
Copier `.env.example` vers `.env.local` (SMTP, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_SITE_URL`). Sans SMTP, les formulaires répondent OK mais aucun email n'est envoyé.

## Déploiement Vercel
Importer le dépôt dans Vercel, renseigner les variables de `.env.example`, déployer, puis ajouter le domaine personnalisé.

## À valider avant lancement
Capacités/largeurs des modèles, témoignages, CGV/confidentialité (relecture juridique), tarifs 10m/12m (sur devis), photos réelles à placer dans `public/images/products/` (SVG illustratifs actuellement).
