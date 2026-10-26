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

## Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `BASIC_AUTH_USER`, `BASIC_AUTH_PASSWORD` | Identifiants demandés par le navigateur pour accéder au site |
| `RESEND_API_KEY` | Clé API [Resend](https://resend.com) pour envoyer les demandes de devis par e-mail (facultatif) |
| `CONTACT_EMAIL_TO` | Adresse qui reçoit les demandes de devis (facultatif) |
| `CONTACT_EMAIL_FROM` | Expéditeur des e-mails (facultatif, `onboarding@resend.dev` par défaut) |

En local, elles se mettent dans `.env.local` ; sur Vercel, dans **Settings → Environment Variables**.

> ⚠️ Ce dépôt est public : le vrai mot de passe et la clé Resend ne doivent jamais être commités.

## Protection par mot de passe (Basic Auth)

`middleware.ts` protège toutes les pages et l'API.
Si `BASIC_AUTH_USER` ou `BASIC_AUTH_PASSWORD` manque, le site répond **503** en production (Vercel, `npm start`) au lieu de devenir public ; en développement (`npm run dev`), il reste accessible sans mot de passe.

## Demandes de devis par e-mail

Sans `RESEND_API_KEY` et `CONTACT_EMAIL_TO`, les demandes sont seulement écrites dans les logs du serveur. Pour les recevoir par e-mail :

1. Créez un compte [Resend](https://resend.com) avec l'adresse qui doit recevoir les demandes.
2. **API Keys → Create API Key**, puis copiez la clé (`re_…`).
3. Renseignez `RESEND_API_KEY` et `CONTACT_EMAIL_TO` (cette même adresse), puis redéployez.

Avec l'expéditeur par défaut `onboarding@resend.dev`, Resend n'envoie qu'à l'adresse du compte. Pour envoyer depuis votre domaine (par ex. `devis@iwm-location.ch`) ou vers une autre adresse, vérifiez le domaine dans **Resend → Domains**, puis renseignez `CONTACT_EMAIL_FROM`.

La réponse à l'e-mail reçu part directement vers le client (en-tête Reply-To).

## Déploiement sur Vercel

1. [vercel.com](https://vercel.com) → **Add New… → Project** → importer `gregoirehrtm-dotcom/iwm-location-pro` (Next.js est détecté automatiquement, aucun réglage de build à changer).
2. **Settings → Environment Variables** : ajouter les variables ci-dessus en cochant **Production** et **Preview**.
3. Déployer. Une variable ajoutée ou modifiée ne s'applique qu'aux nouveaux déploiements : **Deployments → ⋯ → Redeploy**.

La branche `main` est déployée en production ; chaque autre branche obtient une URL de preview.

## Structure

| Fichier | Rôle |
| --- | --- |
| `app/page.tsx` | Accueil : modèles, estimateur de prix, demande de devis |
| `app/[model]/page.tsx` | Fiche d'un modèle (`/6m`, `/8m`, `/10m`, `/12m`) |
| `app/api/contact/route.ts` | Reçoit le formulaire et le valide avec Zod |
| `lib/email.ts` | Envoi de la demande par e-mail via Resend |
| `lib/models.ts` | Modèles et tarifs |
| `components/` | Header, Footer, Hero, ModelCard, PriceEstimator, ContactForm |
| `middleware.ts` | Basic Auth |

## Reste à faire

- Renseigner le numéro de téléphone dans `components/Footer.tsx`.
