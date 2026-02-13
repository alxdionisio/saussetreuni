# Déploiement — GitHub Pages

Ce projet se déploie automatiquement sur **GitHub Pages** à chaque push sur la branche `main`.

## Pipeline Git

1. **Dépôt local** : le projet est un dépôt Git avec `origin` → `https://github.com/alxdionisio/saussetreuni.git`
2. **Branche** : `main`
3. **Workflow** : `.github/workflows/deploy-pages.yml`  
   - Déclenché sur **push** sur `main` ou manuellement (Actions → Deploy on GitHub Pages → Run workflow)
   - Étapes : checkout → `npm ci` → `npm run build` → copie `index.html` → `404.html` (SPA) → déploiement Pages

## Premier push

Si le dépôt GitHub est **vide** :

```bash
git push -u origin main
```

Si le dépôt contient déjà des fichiers (ex. README créé sur GitHub) :

```bash
git pull origin main --rebase
git push -u origin main
```

En cas de conflit ou si GitHub a créé une branche `master`, tu peux forcer (à utiliser seulement si tu es sûr que tout le code à garder est en local) :

```bash
git push -u origin main --force
```

## Configuration sur GitHub

### 1. Activer GitHub Pages

- **Settings** → **Pages**
- **Source** : **GitHub Actions** (pas “Deploy from a branch”)
- Aucune autre action : le workflow déploie tout seul.

### 2. URL du site (variable optionnelle)

Pour que le sitemap et les métadonnées SEO utilisent la bonne URL en production :

- **Settings** → **Secrets and variables** → **Actions**
- **Variables** → **New repository variable**
  - Name : `VITE_SITE_URL`
  - Value : `https://ton-domaine.com` (ex. `https://sausset-reuni.fr` ou `https://alxdionisio.github.io/saussetreuni`)

Si tu ne la définis pas, le build utilise par défaut `https://sausset-reuni.fr`.

### 3. Domaine personnalisé (optionnel)

Si tu utilises un nom de domaine (ex. sausset-reuni.fr) :

- **Settings** → **Pages** → **Custom domain**
- Saisir le domaine et suivre les instructions (CNAME, DNS).
- Cocher **Enforce HTTPS** une fois le DNS propagé.

## Commandes utiles au quotidien

```bash
# Voir le statut
git status

# Ajouter les changements et committer
git add .
git commit -m "Description des changements"

# Envoyer sur GitHub (déclenche le déploiement)
git push
```

## Vérifier le déploiement

- **Actions** : onglet **Actions** du dépôt → workflow “Deploy on GitHub Pages” → vert = déploiement réussi.
- **URL du site** :  
  - Sans domaine personnalisé : `https://alxdionisio.github.io/saussetreuni`  
  - Avec domaine personnalisé : l’URL configurée (ex. `https://sausset-reuni.fr`).
