# iwm-location-pro

Site web d'**IWM Location**, entreprise de location de nacelles élévatrices. Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS et Zod.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
npm run lint
```

## Pages

| Route | Contenu |
| --- | --- |
| `/` | Accueil : hero, avantages, nacelles phares, étapes, appel à l'action |
| `/catalogue` | Catalogue filtrable par catégorie et hauteur (`?categorie=ciseaux`…) |
| `/catalogue/[slug]` | Fiche machine : caractéristiques, tarifs, machines similaires |
| `/devis` | Formulaire de devis (`?machine=<slug>` présélectionne la machine) |
| `/contact`, `/a-propos`, `/mentions-legales` | Pages institutionnelles |
| `/api/devis` | `POST` : valide la demande de devis avec Zod |
| `/sitemap.xml`, `/robots.txt` | SEO |

## Structure

```
app/          pages, layout, route API, sitemap/robots
components/   Header, Footer, MachineCard, CatalogueGrid, QuoteForm, MachineIllustration
lib/          site.ts (coordonnées), machines.ts (catalogue), quote-schema.ts (validation Zod)
```

## À personnaliser avant la mise en ligne

- **`lib/site.ts`** : téléphone, e-mail, adresse, horaires et URL du site (valeurs d'exemple actuellement).
- **`lib/machines.ts`** : modèles, caractéristiques et tarifs réels.
- **`app/api/devis/route.ts`** : la demande est validée puis seulement journalisée ; branchez un service d'e-mail (Resend, SMTP…) ou un CRM à l'emplacement du `TODO`.
- **`app/mentions-legales/page.tsx`** : SIRET, forme juridique, hébergeur.
- **`components/MachineIllustration.tsx`** : illustrations vectorielles provisoires, à remplacer par de vraies photos (`next/image`).
