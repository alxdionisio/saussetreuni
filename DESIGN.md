# DESIGN - Sausset Réuni 2026

Direction : **Éditorial civique**. Mise en page alignée à gauche, hiérarchie typographique
forte, teal côtier comme couleur engagée, accent chaud (sable/terracotta) parcimonieux.

## Color strategy: Committed + accent ≤ 10%

Le teal porte l'identité ; le sable/terracotta réveille les CTA et l'emphase ; neutres
tintés vers le teal (jamais de `#fff` / `#000` purs). Exprimé en OKLCH.

| Rôle | Token | Valeur |
|---|---|---|
| Teal profond (encre de marque, bandes) | `--color-dark` | `oklch(34% 0.046 205)` |
| Teal | `--color-primary` | `oklch(56% 0.072 200)` |
| Teal clair | `--color-primary-light` | `oklch(66% 0.074 198)` |
| Accent chaud (CTA, filets, focus) | `--accent` | `oklch(64% 0.135 47)` |
| Papier (fond) | `--paper` | `oklch(98.5% 0.006 90)` |
| Papier alt (bande) | `--paper-alt` | `oklch(96.4% 0.009 95)` |
| Encre (texte) | `--ink` | `oklch(26% 0.02 220)` |
| Encre douce | `--ink-soft` | `oklch(45% 0.016 220)` |

## Theme: light (papier chaud)

Site civique consulté en journée par une audience large dont beaucoup de seniors :
fond papier chaud, encre sombre, contraste élevé. Le sombre est réservé aux bandes
d'accent (hero, valeurs) pour le rythme.

## Typography

- `--font-display` **Fraunces** (serif old-style, optical sizing) : titres de section.
  Caractère éditorial chaleureux, distinct du défaut Playfair/Lora « IA ».
- `--font-heading` **Montserrat** : marque/hero, navigation.
- `--font-body` **Source Sans 3** : corps, max 68ch.
- Contraste d'échelle ≥ 1.25 entre niveaux. On retire le `!important` qui forçait
  Montserrat sur les h2 et masquait la police d'affichage.

## Layout

- Alignement à gauche par défaut (`SectionTitle align="left"`). Centrage réservé aux
  bandes pleine largeur quand c'est justifié.
- Rayons resserrés (4-10px) plutôt que 16-20px (moins « bulle »).
- Espacement rythmé, pas uniforme. Colonnes de lecture bornées.

## Elevation

Ombres teintées teal, basses et larges : `--shadow-sm/md/lg`. Pas d'ombres noires dures.

## Motion

Ease-out exponentiel (`--ease-out`). Subtil. `prefers-reduced-motion` respecté.

## Bans enforced

Pas de filet latéral coloré (`border-left` accent), pas de glassmorphism par défaut,
pas de pastille qui pulse, pas de texte en dégradé, pas de tout-centré, pas d'emoji-icône.
