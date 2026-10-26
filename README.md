# iwm-location-pro

Site privé d'**IWM Location** (location de nacelles élévatrices), protégé par Basic Auth.
Next.js 15, React 19, TypeScript, Tailwind CSS, Zod.

## Démarrage local

Prérequis : Node.js 18.18 ou plus récent (20 ou 22 LTS recommandé).

```bash
npm install
cp .env.example .env.local   # puis renseignez le mot de passe dans .env.local
npm run dev                  # http://localhost:3000
```

Version de production en local : `npm run build && npm start`.

## Protection par mot de passe (Basic Auth)

`middleware.ts` protège toutes les pages et l'API à partir des variables `BASIC_AUTH_USER` et `BASIC_AUTH_PASSWORD`.

> ⚠️ Si l'une des deux variables est absente, le site est **public**.
> Ce dépôt est public : le vrai mot de passe se met uniquement dans `.env.local` (ignoré par git) et dans les variables d'environnement Vercel, jamais dans un fichier commité.

## Déploiement sur Vercel

1. [vercel.com](https://vercel.com) → **Add New… → Project** → importer `gregoirehrtm-dotcom/iwm-location-pro` (Next.js est détecté automatiquement, aucun réglage de build à changer).
2. **Settings → Environment Variables** : ajouter `BASIC_AUTH_USER` et `BASIC_AUTH_PASSWORD` en cochant **Production** et **Preview**.
3. Déployer. Une variable ajoutée ou modifiée ne s'applique qu'aux nouveaux déploiements : **Deployments → ⋯ → Redeploy**.

La branche `main` est déployée en production ; chaque autre branche obtient une URL de preview.

## Structure

| Fichier | Rôle |
| --- | --- |
| `app/page.tsx` | Accueil : modèles, estimateur de prix, demande de devis |
| `app/[model]/page.tsx` | Fiche d'un modèle (`/6m`, `/8m`, `/10m`, `/12m`) |
| `app/api/contact/route.ts` | Reçoit le formulaire et le valide avec Zod |
| `components/` | Header, Footer, Hero, ModelCard, PriceEstimator, ContactForm |
| `lib/models.ts` | Modèles et tarifs |
| `middleware.ts` | Basic Auth |

## Reste à faire

- Le formulaire n'envoie pas d'e-mail : les demandes sont seulement écrites dans les logs du serveur.
- Renseigner le numéro de téléphone dans `components/Footer.tsx`.
