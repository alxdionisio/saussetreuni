/** Base path du site (ex: /saussetreuni ou '' pour domaine à la racine). Utiliser pour les ancres et liens absolus. */
export const BASE_PATH = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || ''

/**
 * URL canonique du site (sans slash final).
 * En production, définir VITE_SITE_URL dans .env (ex: https://saussetreuni.fr).
 */
export const SITE_URL =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL
    ? import.meta.env.VITE_SITE_URL.replace(/\/$/, '')
    : 'https://saussetreuni.fr'

export const SITE_NAME = 'Sausset Réuni 2026'
/** Image absolue pour partage social (Open Graph, Twitter). */
export const OG_IMAGE = `${SITE_URL}/logo_sausset%20reuni.png`
export const DEFAULT_DESCRIPTION =
  'Liste citoyenne Sausset Réuni 2026 — Maxime Marchand et son équipe pour les élections municipales de Sausset-les-Pins (15 et 22 mars 2026).'

/**
 * Titres et descriptions par chemin (SEO et partage social).
 * Titres : 50–60 caractères, avec mots-clés (Sausset-les-Pins, élections municipales 2026, Maxime Marchand).
 * Descriptions : 150–160 caractères, appel à l’action ou résumé clair.
 */
export const ROUTE_META = {
  '/': {
    title: 'Sausset Réuni 2026 — Maxime Marchand | Élections municipales Sausset-les-Pins',
    description:
      'Liste Sausset Réuni pour les élections municipales 2026 à Sausset-les-Pins. Maxime Marchand et son équipe : programme, liste des colistiers, calendrier et contact.',
  },
  '/programme': {
    title: 'Programme municipal 2026 — Sausset Réuni | Grandes lignes',
    description:
      'Programme de la liste Sausset Réuni pour Sausset-les-Pins 2026 : sécurité, cadre de vie, jeunesse, aînés, culture, sport. En construction avec les habitants.',
  },
  '/programme/projections': {
    title: 'Programme, les projections | Sausset Réuni 2026',
    description:
      'Découvrez la Salle des arts en avant/après et en vidéo. Les projets qui transforment Sausset-les-Pins.',
  },
  '/liste': {
    title: 'La liste Sausset Réuni 2026 — Colistiers | Maxime Marchand',
    description:
      'Découvrez les colistiers et colistières de Sausset Réuni 2026. Une équipe engagée pour Sausset-les-Pins, menée par Maxime Marchand.',
  },
  '/comite-soutien': {
    title: 'Rejoindre le comité de soutien — Sausset Réuni 2026',
    description:
      'Soutenez Maxime Marchand et la liste Sausset Réuni pour les élections municipales de Sausset-les-Pins. Inscrivez-vous au comité de soutien.',
  },
  '/calendrier': {
    title: 'Calendrier campagne 2026 — Événements Sausset Réuni',
    description:
      'Agenda de la campagne Sausset Réuni : rencontres de quartier, réunions, meeting, élections municipales 15 et 22 mars 2026 à Sausset-les-Pins.',
  },
  '/contact': {
    title: 'Contact — Sausset Réuni 2026 | Écrivez-nous',
    description:
      'Contactez l\'équipe Sausset Réuni 2026. Permanence à Sausset-les-Pins, formulaire de contact. Une question sur le programme ou la liste ?',
  },
  '/mentions-legales': {
    title: 'Mentions légales — Sausset Réuni 2026',
    description:
      'Mentions légales du site de campagne Sausset Réuni 2026. Éditeur, hébergement, propriété intellectuelle.',
  },
  '/politique-confidentialite': {
    title: 'Politique de confidentialité — Sausset Réuni 2026',
    description:
      'Politique de confidentialité et protection des données personnelles (RGPD) du site Sausset Réuni 2026.',
  },
}
