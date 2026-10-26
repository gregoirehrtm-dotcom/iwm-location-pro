# iwm-location-pro

Site privé d'**IWM Location** (location de nacelles ciseaux électriques à Porrentruy), protégé par Basic Auth.
Next.js 15, React 19, TypeScript, Tailwind CSS, Zod.

Direction artistique : fiche technique sombre, accent orange `#EE7A2F`, police Archivo, nacelles dessinées à l'échelle
sur une trame de plan.

## Démarrage local

Prérequis : Node.js 18.18 ou plus récent (20 ou 22 LTS recommandé).

```bash
npm install
cp .env.example .env.local   # puis renseignez le mot de passe dans .env.local
npm run dev                  # http://localhost:3000
```

Version de production en local : `npm run build && npm start`.

## Pages et sections

| Route | Contenu |
| --- | --- |
| `/` | Accueil : choix de la nacelle par la hauteur, flotte, tarifs, services, livraison par NPA, étapes, questions, demande de devis en 3 étapes, contact |
| `/6m`, `/8m`, `/10m`, `/12m` | Fiche d'une nacelle : dessin coté, caractéristiques, « passe-t-elle par votre accès ? », devis |
| `/api/contact` | Reçoit la demande de devis, la valide (Zod) et l'envoie par e-mail |

Sur l'accueil, « Fiche technique » ouvre la fiche dans une fenêtre ; « Demander un devis » préremplit le formulaire.
Si l'envoi échoue, le client peut transmettre sa demande sur WhatsApp ou la copier dans un e-mail.

## Où modifier le contenu

| Fichier | Contenu |
| --- | --- |
| `lib/site.ts` | Coordonnées : téléphone, WhatsApp, e-mail, adresse et horaires du dépôt, IDE |
| `lib/models.ts` | Nacelles : hauteurs, capacité, dimensions, prix par jour (`null` = « à confirmer ») |
| `lib/pricing.ts` | Remises selon la durée (10 % dès 8 jours, 20 % dès 29 jours) |
| `lib/delivery.ts` | Zones et délais de livraison par NPA |
| `components/Services.tsx`, `components/Faq.tsx` | Services inclus, conditions, questions fréquentes |

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

1. [vercel.com](https://vercel.com) → **Add New… → Project** → importer `gregoirehrtm-dotcom/iwm-location-pro`.
2. **Settings → Environment Variables** : ajouter les variables ci-dessus en cochant **Production** et **Preview**.
3. Déployer. Une variable ajoutée ou modifiée ne s'applique qu'aux nouveaux déploiements : **Deployments → ⋯ → Redeploy**.

La branche `main` est déployée en production ; chaque autre branche obtient une URL de preview.
`vercel.json` impose le preset Next.js, même si le projet Vercel a été créé avec un autre réglage.

## À compléter

- Capacité, largeur et dimensions repliées des nacelles 8, 10 et 12 m (`lib/models.ts`, affichées « à confirmer »).
- Prix par jour à confirmer (`lib/models.ts`).
- Pages mentions légales, confidentialité et conditions de location.
