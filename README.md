# IWM Location – site de location de nacelles

Site Next.js 15 (App Router), TypeScript, Tailwind CSS 4, React Hook Form + Zod, date-fns, Lucide.

## Démarrage

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build && npm start
```

## Structure

- `app/` pages (accueil, modèles, tarifs, réservation, FAQ, contact, à propos, CGL, confidentialité), routes API (`/api/estimate`, `/api/contact`, `/api/booking`, `/api/models`, `/api/datasheet/[model]`), `sitemap`, `robots`
- `components/` composants UI (Header, Hero, ProductCard, PriceEstimator, BookingForm, FAQSection, ContactForm…)
- `lib/` `constants.ts` (société, modèles, FAQ), `utils.ts` (calcul de prix indicatif), `validations.ts` (schémas Zod), `mail.ts`

## Variables d’environnement

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, sitemap) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Envoi des e-mails (sans `SMTP_HOST`, les messages sont affichés dans la console serveur) |
| `MAIL_FROM`, `MAIL_TO` | Expéditeur / destinataire (par défaut `nacelles@iwm-location.ch`) |

## À compléter avant la mise en ligne

- Photos produits : déposer dans `public/images/products/` et les passer à `ProductGallery` (`photos`). Sans photos, un schéma à l’échelle est affiché.
- Capacités et largeurs « à confirmer » des modèles 8, 10 et 12 m (`lib/constants.ts`).
- Barème dégressif (`estimate` dans `lib/utils.ts` : -10 % dès le jour 8, -20 % dès le jour 29) : valeurs indicatives à valider.
- Témoignages d’exemple, CGL et politique de confidentialité complètes.

## Déploiement

Compatible Vercel : importer le dépôt, renseigner les variables ci-dessus, déployer.
