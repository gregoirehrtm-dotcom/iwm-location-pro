# IWM Location

Site web Next.js 15 (TypeScript, Tailwind) de location de nacelles élévatrices (6 m, 8 m, 10 m, 12 m), protégé par Basic Auth pour l'aperçu privé.

## Installation locale

```bash
npm install
cp .env.example .env.local
npm run dev      # http://localhost:3000
npm run build
npm test
```

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `BASIC_AUTH_USER` / `BASIC_AUTH_PASSWORD` | Identifiants Basic Auth (défaut : `admin` / `IWMLocation2026!` — **à changer en production**) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Serveur SMTP. Sans `SMTP_HOST`, les emails sont journalisés dans la console |
| `MAIL_FROM`, `MAIL_TO` | Expéditeur / destinataire des demandes |
| `NEXT_PUBLIC_SITE_URL` | URL publique (sitemap, métadonnées) |

## Déploiement Vercel

1. Importer le dépôt GitHub sur [vercel.com/new](https://vercel.com/new) (framework Next.js détecté).
2. Renseigner les variables d'environnement ci-dessus (définir un mot de passe Basic Auth propre).
3. Déployer ; chaque push sur `main` redéploie automatiquement.
4. Pour rendre le site public : supprimer `middleware.ts` (ou la partie Basic Auth) et retirer `robots: noindex` dans `app/layout.tsx`.

## Checklist avant lancement

- [ ] Remplacer téléphone/adresse/email dans `lib/constants.ts`
- [ ] Changer le mot de passe Basic Auth
- [ ] Configurer le SMTP et tester contact + réservation
- [ ] Remplacer les images SVG de `public/images/products/` par de vraies photos
- [ ] Relire CGV et politique de confidentialité
- [ ] Retirer Basic Auth et `noindex` au lancement public
