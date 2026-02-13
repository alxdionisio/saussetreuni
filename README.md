# Sausset Réuni 2026 — Site de Campagne

Site web de campagne pour Maxime Marchand, candidat aux élections municipales de Sausset-les-Pins (Mars 2026).

## Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## Stack technique

- **React 18** — Interface utilisateur
- **Vite** — Build tool ultra-rapide
- **Framer Motion** — Animations fluides
- **CSS Modules** — Styles scopés par composant
- **Google Fonts** — Playfair Display + Source Sans 3

## Structure du projet

```
src/
├── main.jsx               # Point d'entrée
├── App.jsx                # Composant racine
├── index.css              # Styles globaux & tokens
├── components/
│   ├── Navbar.jsx/.css    # Navigation fixe responsive
│   ├── Footer.jsx/.css    # Pied de page
│   ├── FadeIn.jsx         # Animation d'apparition réutilisable
│   └── SectionTitle.jsx/  # Titre de section réutilisable
└── sections/
    ├── Hero.jsx/.css       # Bannière d'accueil
    ├── Bilan.jsx/.css      # Bilan du mandat
    ├── Programme.jsx/.css  # Programme par thème (tabs)
    ├── Candidat.jsx/.css   # Présentation du candidat
    ├── Engagements.jsx/.css # 4 engagements
    ├── Temoignages.jsx/.css # Carousel de témoignages
    └── Contact.jsx/.css    # Formulaire + infos
```

## Personnalisation

- **Couleurs** : Modifier les variables CSS dans `src/index.css`
- **Contenu** : Modifier directement les textes dans chaque composant de section
- **Images** : Remplacer le placeholder dans `Candidat.jsx` par une vraie photo
- **Formulaire** : Connecter le formulaire de contact à un backend (ex: Formspree, Netlify Forms)

## Déploiement

### GitHub Pages + domaine OVH

Le dépôt inclut un pipeline GitHub Actions qui déploie le site sur **GitHub Pages** à chaque push sur la branche `main`.

1. **Activer GitHub Pages**  
   Dans le dépôt : **Settings** → **Pages** → **Build and deployment** :  
   - Source : **GitHub Actions**.

2. **Premier déploiement**  
   Poussez votre code sur `main` (ou déclenchez le workflow **Actions** → **Deploy on GitHub Pages** → **Run workflow**).  
   Le site sera en ligne à l’adresse :  
   `https://<username>.github.io/<nom-du-repo>/`  
   (ou à la racine si le dépôt s’appelle `<username>.github.io`).

3. **Connecter le domaine OVH (ex. sausset-reuni.fr)**  
   - Dans **Settings** → **Pages** → **Custom domain** : indiquez votre domaine (ex. `sausset-reuni.fr` ou `www.sausset-reuni.fr`), puis **Save**.  
   - Cochez **Enforce HTTPS** une fois le DNS propagé.  
   - Chez **OVH** (gestion du nom de domaine) :  
     - Créez une entrée **A** pointant vers les IP de GitHub Pages :  
       `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`  
     - Ou une entrée **CNAME** (souvent pour `www`) vers :  
       `<username>.github.io`  
   - GitHub affichera les enregistrements DNS recommandés ; suivez-les si vous préférez.

4. **Optionnel**  
   Pour changer l’URL utilisée dans le sitemap/SEO : **Settings** → **Secrets and variables** → **Actions** → **Variables** → ajoutez `VITE_SITE_URL` (ex. `https://sausset-reuni.fr`).

Le dossier `dist/` est généré par le workflow ; pour un déploiement manuel local : `npm run build` (contenu prêt pour tout hébergement statique).
