

## Plan — Sous-site PROHIIT (account.prohiit.fr)

### Charte graphique (extraite du site principal)

Couleurs principales :
- **Rouge PROHIIT** : `hsl(0, 72%, 35%)` — boutons CTA, accents, titres
- **Gris foncé** : `hsl(215, 15%, 25%)` — header, fond de navigation
- **Gris clair** : `hsl(0, 0%, 95%)` — fond de page
- **Blanc** : `hsl(0, 0%, 100%)` — cartes, conteneurs
- **Texte principal** : `hsl(0, 0%, 15%)` — corps de texte
- **Texte secondaire** : `hsl(0, 0%, 45%)` — sous-titres, descriptions

Typographie : titres en gras majuscules (font-weight bold, uppercase), corps en police sans-serif standard (Inter via Google Fonts).

Le logo PROHIIT sera copié dans `public/images/prohiit-logo.png` et affiché dans le header.

---

### Structure des fichiers à créer/modifier

| Fichier | Rôle |
|---|---|
| `src/data/abonnements.md` | Données produits au format Markdown structuré |
| `src/config/widget.ts` | Clés publiques du widget Bodylink |
| `src/lib/parseAbonnements.ts` | Parser Markdown → objets TypeScript |
| `src/pages/Index.tsx` | Page abonnements (recherche, filtres, grille/liste) |
| `src/pages/Inscription.tsx` | Page widget Bodylink |
| `src/components/Header.tsx` | Header avec logo PROHIIT + navigation |
| `src/components/AbonnementCard.tsx` | Carte produit (vue grille) |
| `src/components/AbonnementListItem.tsx` | Ligne produit (vue liste) |
| `src/components/SearchAndFilters.tsx` | Barre de recherche + filtres catégorie |
| `src/index.css` | Variables CSS mises à jour selon la charte |
| `src/App.tsx` | Routes `/` et `/inscription` |
| `public/images/prohiit-logo.png` | Logo copié depuis upload |

---

### Page Abonnements (`/`)

- Header sombre avec logo PROHIIT + liens Abonnements / Inscription
- Barre de recherche texte pleine largeur
- Filtres par catégorie (boutons/chips) : Engagement 12 mois, Sans engagement, A la carte, Offres spéciales
- Toggle vue grille (défaut desktop) / liste (défaut mobile)
- Cartes avec : image carrée (placeholder gris si absente), nom, prix en rouge, description tronquée, bouton "Commander" rouge
- Bouton Commander → `/inscription?token=xxx` (même onglet)
- 15 fiches produits converties depuis le CSV

### Page Inscription (`/inscription`)

- Même header
- Lecture du paramètre `token` depuis `useSearchParams()`
- Chargement dynamique du script Bodylink dans `<head>` via `useEffect`
- Conteneur `<div id="bodylink-widget" class="bodylink-widget">`
- Message d'attente pendant le chargement du widget

### Détails techniques

- Le fichier `abonnements.md` utilisera un format structuré avec des sections `## Nom` et des métadonnées en front-matter style (collection, prix, image, cta) pour chaque fiche
- Le parser extraira ces données en objets typés `Abonnement[]`
- Les CTA du CSV seront transformés : `prohiit.fr/inscription.html?token=xxx` → `/inscription?token=xxx`
- Responsive : grille 3 colonnes desktop, 2 tablette, 1 mobile (liste)
- Pas de base de données, tout est statique

